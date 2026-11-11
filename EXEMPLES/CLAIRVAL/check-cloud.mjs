import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {mountCloud} from './dist/cloud-sync.mjs';
const initial={version:1,journey:['vaucombe'],campaign:null};
let row=null,userId='account-a',rpcError=null,readError=null,confirmResult=true,confirmHook=null;
const client={auth:{async getUser(){return {data:{user:{id:userId}},error:null};}},from(){return {select(){return this;},eq(){return this;},async maybeSingle(){return {data:structuredClone(row),error:readError};}};},async rpc(name,args){
 assert.equal(name,'save_clairval');
 if(rpcError)return {error:rpcError};
 if(args.p_expected_version!==(row?.version||0))return {error:{message:'save_conflict'}};
 row={payload:structuredClone(args.p_payload),version:(row?.version||0)+1};
 return {data:structuredClone(row)};
}};
const nodes=new Map();
const node=id=>{if(!nodes.has(id))nodes.set(id,{textContent:'',events:{},addEventListener(n,f){this.events[n]=f;}});return nodes.get(id);};
let local=structuredClone(initial);
const progress={snapshot:()=>structuredClone(local),validate(v){if(v?.version!==1||!Array.isArray(v.journey))throw Error('invalid');return structuredClone(v);},apply(v){local=this.validate(v);},legacy:()=>null};
await mountCloud({client,user:{id:'account-a'},document:{querySelector:node},window:{confirm(){confirmHook?.();return confirmResult;}},progress});
const click=id=>node(id).events.click();
await click('#cloud-save');assert.equal(row.version,1);assert.match(node('#cloud-status').textContent,/vérifiée/);
local.journey.push('forest');await click('#cloud-save');assert.equal(row.version,2);
local=structuredClone(initial);await click('#cloud-load');assert.deepEqual(local.journey,['vaucombe','forest']);
local=structuredClone(initial);confirmResult=false;await click('#cloud-save');assert.equal(row.version,2);
confirmResult=true;confirmHook=()=>{row.version++;};await click('#cloud-save');assert.equal(row.version,3);assert.match(node('#cloud-status').textContent,/entre-temps/);confirmHook=null;
const before=structuredClone(local);readError={message:'network'};await click('#cloud-load');assert.deepEqual(local,before);assert.match(node('#cloud-status').textContent,/conservée/);readError=null;
userId='account-b';await click('#cloud-save');assert.equal(row.version,3);assert.match(node('#cloud-status').textContent,/Session modifiée/);userId='account-a';
row.payload={version:99};await click('#cloud-load');assert.deepEqual(local,before);
row=null;await click('#cloud-load');assert.match(node('#cloud-status').textContent,/Aucune sauvegarde/);

const records=new Map();
let fail=false;
const storage={getItem:k=>records.get(k)??null,setItem(k,v){if(fail&&k.includes('campaign'))throw Error('full');records.set(k,v);},removeItem(k){if(fail&&k.includes('campaign'))throw Error('full');records.delete(k);}};
function open(id){
 const n=()=>({innerHTML:'',focus(){},setAttribute(){},removeAttribute(){},addEventListener(){},close(){},showModal(){}});
 const context=vm.createContext({window:{CLAIRVAL_USER_ID:id,localStorage:storage,addEventListener(){}},document:{querySelector:n,querySelectorAll:()=>[],addEventListener(){}},location:{hash:'#carte'}});
 vm.runInContext(fs.readFileSync(new URL('./dist/clairval.js',import.meta.url),'utf8'),context);
 return context.window.CLAIRVAL_PROGRESS;
}
const a=open('a');a.apply({version:1,journey:['vaucombe','forest'],campaign:null});
assert.equal(open('a').snapshot().journey.length,2);assert.equal(open('b').snapshot().journey.length,1);
assert.throws(()=>a.apply({version:1,journey:['vaucombe','pierrefont'],campaign:null}));
fail=true;assert.throws(()=>a.apply(initial));assert.equal(a.snapshot().journey.length,2);assert.equal(JSON.parse(records.get('clairval.exploration.v1.a')).journey.length,2);fail=false;
records.set('clairval.exploration.v1',JSON.stringify({version:1,journey:['vaucombe','tower']}));
assert.equal(open('b').snapshot().journey.length,1);assert.equal(open('b').legacy().journey[1],'tower');
console.log('Cloud : envoi, récupération, annulation, concurrence, réseau, changement de compte, données invalides, isolation locale, import ancien et retour arrière vérifiés.');
