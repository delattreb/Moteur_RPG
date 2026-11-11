import assert from 'node:assert/strict';
import {initialState,validateState,createProgress} from './dist/auvrenne-state.mjs';
import {prepareCampaign,recordSession} from './dist/auvrenne-campaign.mjs';
import {createJournal} from './dist/auvrenne-app.mjs';
import {createCloudStore} from './dist/cloud-sync.mjs';
import {createAutoSync} from './dist/autosave-core.mjs';
import fs from 'node:fs';
const records=new Map();let fail=false;
const storage={getItem:k=>records.get(k)??null,setItem(k,v){if(fail)throw Error('quota');records.set(k,v);},removeItem:k=>records.delete(k)};
const a=createProgress({storage,userId:'a'}),b=createProgress({storage,userId:'b'});
let next=a.snapshot();next.notes='<img src=x onerror=alert(1)>';next.bookmarks=['ormeval'];a.update(next);
assert.equal(b.snapshot().notes,'');assert.equal(createProgress({storage,userId:'a'}).snapshot().notes,next.notes);
assert.throws(()=>a.apply({...initialState(),world:'clairval'}));
assert.throws(()=>a.apply({...initialState(),journey:['valcroix']}));
assert.throws(()=>a.apply({...initialState(),privateNotes:'secret'}));
assert.throws(()=>a.apply({...initialState(),bookmarks:['unknown']}));
assert.throws(()=>a.apply({...initialState(),notes:'x'.repeat(12001)}));
fail=true;assert.throws(()=>a.update(initialState()));assert.equal(a.snapshot().notes,next.notes);fail=false;
const names=[],rpc=[];
const client={auth:{getUser:async()=>({data:{user:{id:'a'}}})},from:name=>{names.push(name);return {select(){return this;},eq(){return this;},maybeSingle:async()=>({data:null})};},rpc:async(name,args)=>{rpc.push(name);return {data:{payload:args.p_payload,version:1}};}};
const store=createCloudStore(client,'a',a.cloudConfig);await store.read();await store.write(initialState(),0);
assert.deepEqual(names,['auvrenne_saves']);assert.deepEqual(rpc,['save_auvrenne']);
const remote={payload:next,version:2};let local=initialState();
const auto=createAutoSync({store:{owner:async()=>{},read:async()=>remote,write:async()=>{throw Error('must not write');}},progress:{snapshot:()=>structuredClone(local),validate:validateState,apply:v=>local=validateState(v),isEmpty:a.isEmpty},cache:{read:()=>null,write(){}},notify(){}});
await auto.sync();assert.equal(local.notes,next.notes);assert.equal(auto.isPaused(),false);
const handlers={},nodes=new Map(),events=[];
const node=id=>{if(!nodes.has(id))nodes.set(id,{innerHTML:'',textContent:'',open:false,style:{},focus(){},showModal(){this.open=true;},close(){this.open=false;}});return nodes.get(id);};
const document={querySelector:node,addEventListener:(name,fn)=>handlers[name]=fn};
const window={location:{hash:'#carnet'},addEventListener:(name,fn)=>handlers['window:'+name]=fn,dispatchEvent:event=>events.push(event.type)};
const p=createJournal({document,window,user:{id:'a'},storage});
assert.match(node('#content').innerHTML,/Le passage/);assert.ok(!node('#content').innerHTML.includes('<img src=x'));
for(const page of ['carte','corbec','rencontres','mission','inventaire','royaume','carnet']){window.location.hash='#'+page;handlers['window:hashchange']();assert.ok(node('#content').innerHTML.length>200);assert.ok(!node('#content').innerHTML.includes('undefined'));}
handlers.input({target:{id:'personal-notes',value:'Question pour Alix'}});
assert.equal(p.snapshot().notes,'Question pour Alix');assert.equal(events.at(-1),'clairval-progress-changed');
const click=dataset=>handlers.click({target:{closest:()=>({dataset,hasAttribute:()=>false})}});
window.location.hash='#carte';handlers['window:hashchange']();click({place:'ordan'});assert.equal(node('#detail').open,true);assert.match(node('#detail-body').innerHTML,/pas connues/);
click({favorite:'ordan'});assert.ok(p.snapshot().bookmarks.includes('ordan'));assert.equal(p.snapshot().journey.length,0);assert.equal(p.snapshot().campaign,null);
for(const name of ['auvrenne-data.mjs','auvrenne-app.mjs']){const text=fs.readFileSync(new URL('./dist/'+name,import.meta.url),'utf8');for(const secret of ['notesPriveesMJ','privateCampaign','initiativesSecretes'])assert.ok(!text.includes(secret));}
const html=fs.readFileSync(new URL('./dist/index.html',import.meta.url),'utf8');
assert.match(html,/Auvrenne/);assert.match(html,/PARTIE NON COMMENCÉE/);assert.match(html,/clairval.html/);
console.log('Auvrenne : pages, notes échappées, favoris, état avant partie, isolation locale/cloud, restauration automatique et absence de secrets vérifiés.');

window.location.hash='#inventaire';handlers['window:hashchange']();
for(const id of ['dagger','bow','mule','pack']){assert.match(node('#content').innerHTML,new RegExp('data-object="'+id+'"'));click({object:id});assert.equal(node('#detail').open,true);assert.match(node('#detail-body').innerHTML,/Objets & équipement/);}
for(const id of ['corbec','alix']){click({person:id});assert.match(node('#detail-body').innerHTML,/Portrait illustré/);}
assert.equal(p.snapshot().journey.length,0);assert.equal(p.snapshot().campaign,null);
assert.match(node('#besace').innerHTML,/Votre besace/);assert.match(node('#encounters').innerHTML,/Alix de la Noue/);
console.log('Présentation chaude : fiches de deux personnages, quatre objets et besace illustrée vérifiées, sans modification de la campagne.');

window.location.hash='#carte';handlers['window:hashchange']();
const mapHtml=node('#content').innerHTML;
assert.equal((mapHtml.match(/class="atlas-marker"/g)||[]).length,8);
assert.match(mapHtml,/class="atlas-sheet" style="width:max\(1000px, 100%\)"/);
for(const id of ['valcroix','lande','ormeval','pont','gue','ordan','rochebrune','mareuil']){
 assert.match(mapHtml,new RegExp('class="atlas-marker"[^>]*data-place="'+id+'"'));
 click({place:id});assert.equal(node('#detail').open,true);
 assert.ok(node('#detail-body').innerHTML.includes('detail-title'));
}
click({zoom:'25'});assert.equal(node('#world-map').style.width,'max(1250px, 125%)');
assert.equal(p.snapshot().journey.length,0);assert.equal(p.snapshot().campaign,null);
console.log('Carte : huit repères ouvrent leurs fiches ; zoom partagé avec le fond ; aucun déplacement créé.');

// Existing v1 preparatory saves migrate without losing personal content.
const old={version:1,world:'auvrenne',campaign:null,journey:[],notes:'Anciennes notes',bookmarks:['ordan']};
assert.equal(validateState(old).version,2);assert.equal(old.version,1);
const prepared=prepareCampaign(old);
assert.deepEqual(prepared.journey,['valcroix']);assert.equal(prepared.campaign.sessions,0);
assert.equal(prepared.notes,old.notes);assert.deepEqual(prepared.bookmarks,old.bookmarks);
assert.deepEqual(prepareCampaign(prepared),prepared);assert.equal(a.isEmpty(prepared),false);
let played=recordSession(prepared,{day:1,place:'valcroix',summary:'Lecture du message.',mission:'proposed'});
played=recordSession(played,{day:2,place:'ormeval',summary:'<img src=x onerror=alert(1)>',mission:'accepted'});
assert.equal(played.campaign.sessions,2);assert.deepEqual(played.journey,['valcroix','ormeval']);
assert.deepEqual(validateState(JSON.parse(JSON.stringify(played))),played);
assert.equal(prepared.campaign.sessions,0);assert.equal(prepared.campaign.log.length,0);
for(const entry of [
 {day:0,place:'valcroix',summary:'Texte',mission:'proposed'},
 {day:1,place:'secret',summary:'Texte',mission:'proposed'},
 {day:1,place:'valcroix',summary:' ',mission:'proposed'},
 {day:1,place:'valcroix',summary:'Texte',mission:'completed'},
 {day:1,place:'valcroix',summary:'x'.repeat(4001),mission:'proposed'}
])assert.throws(()=>recordSession(prepared,entry));
assert.throws(()=>recordSession(played,{day:1,place:'ordan',summary:'Retour dans le temps',mission:'accepted'}));
assert.throws(()=>validateState({...played,journey:['valcroix','ordan']}));
assert.throws(()=>validateState({...played,campaign:{...played.campaign,privateNotes:'secret'}}));
assert.throws(()=>validateState({...played,campaign:{...played.campaign,sessions:99}}));

// A freshly opened device restores a started game instead of overwriting it.
let restored=initialState();
const activeAuto=createAutoSync({store:{owner:async()=>{},read:async()=>({payload:played,version:3}),write:async()=>{throw Error('Unexpected overwrite');}},progress:{snapshot:()=>structuredClone(restored),validate:validateState,apply:v=>restored=validateState(v),isEmpty:a.isEmpty},cache:{read:()=>null,write(){}},notify(){}});
await activeAuto.sync();assert.deepEqual(restored,played);assert.equal(activeAuto.isPaused(),false);

// Initializing through the UI does not manufacture a played session.
handlers.click({target:{closest:()=>({dataset:{},hasAttribute:name=>name==='data-prepare'})}});
assert.equal(p.snapshot().campaign.sessions,0);assert.equal(p.snapshot().notes,'Question pour Alix');
assert.ok(p.snapshot().bookmarks.includes('ordan'));
const beforeClick=JSON.stringify(p.snapshot());click({place:'ordan'});assert.equal(JSON.stringify(p.snapshot()),beforeClick);
for(const [id,value] of Object.entries({'#session-day':'2','#session-place':'ormeval','#session-summary':'<img src=x onerror=alert(1)>','#session-mission':'accepted'}))node(id).value=value;
let prevented=false;handlers.submit({target:{id:'session-form'},preventDefault(){prevented=true;}});
assert.equal(prevented,true);assert.equal(p.snapshot().campaign.sessions,1);
assert.deepEqual(p.snapshot().journey,['valcroix','ormeval']);
window.location.hash='#carnet';handlers['window:hashchange']();
assert.ok(!node('#content').innerHTML.includes('<img src=x'));
assert.match(node('#content').innerHTML,/&lt;img/);
assert.match(node('.day').textContent,/Jour 2/);
window.location.hash='#carte';handlers['window:hashchange']();
assert.match(node('#content').innerHTML,/data-visited="true" data-current="true" data-place="ormeval"/);
click({place:'ormeval'});assert.match(node('#detail-body').innerHTML,/Observations consignées/);
assert.ok(!node('#detail-body').innerHTML.includes('<img src=x'));
const preserved=JSON.stringify(p.snapshot());
node('#session-day').value='1';handlers.submit({target:{id:'session-form'},preventDefault(){}});
assert.equal(JSON.stringify(p.snapshot()),preserved);assert.ok(node('#session-status').textContent);
fail=true;assert.throws(()=>p.update(prepared));fail=false;assert.equal(JSON.stringify(p.snapshot()),preserved);
assert.deepEqual(createProgress({storage,userId:'a'}).snapshot(),p.snapshot());
assert.equal(createProgress({storage,userId:'b'}).snapshot().campaign,null);
console.log('Partie : migration v1, initialisation sans scène, séances, lieux, état mission, HTML échappé, erreurs sans perte, restauration et isolation vérifiés.');

const svg=fs.readFileSync(new URL('./dist/assets/auvrenne-map.svg',import.meta.url),'utf8');
const labelBoxes=[...svg.matchAll(/<g class="settlement-label" data-name="([^"]+)"><rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/g)].map(m=>({name:m[1],x:+m[2],y:+m[3],w:+m[4],h:+m[5]}));
assert.equal(labelBoxes.length,8);assert.match(svg,/Old English Text MT/);
const pins=[[635,789],[835,709],[997,725],[1135,669],[1097,533],[1335,541],[1385,773],[230,365]];
for(const box of labelBoxes){
 // Largest pin footprint: current-position ring, at the minimum 1000px map width.
 for(const [x,y] of pins){const dx=Math.max(box.x-x,0,x-box.x-box.w),dy=Math.max(box.y-y,0,y-box.y-box.h);assert.ok(Math.hypot(dx,dy)>38.4,box.name+' overlaps a pin');}
 for(const other of labelBoxes){if(box===other)continue;assert.ok(box.x+box.w<=other.x||other.x+other.w<=box.x||box.y+box.h<=other.y||other.y+other.h<=box.y,box.name+' overlaps '+other.name);}
}
console.log('Carte : huit cartouches médiévaux, sans chevauchement entre noms ou avec les repères au zoom minimal.');

