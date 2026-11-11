import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const handlers={};
const nodes=new Map();
function node(id){if(!nodes.has(id))nodes.set(id,{innerHTML:'',open:false,focus(){},setAttribute(){},removeAttribute(){},addEventListener(name,fn){handlers[id+':'+name]=fn;},showModal(){this.open=true;},close(){this.open=false;}});return nodes.get(id);}
const context=vm.createContext({window:{addEventListener(name,fn){handlers['window:'+name]=fn;}},document:{querySelector:node,querySelectorAll(){return [];},addEventListener(name,fn){handlers['document:'+name]=fn;}},location:{hash:''}});
vm.runInContext(fs.readFileSync(path.join(root,'dist/clairval.js'),'utf8'),context);
const html=()=>node('#content').innerHTML;
assert.match(html(),/Les terres de Clairval/);
assert.equal((node('#navigation').innerHTML.match(/class="menu-tile"/g)||[]).length,6);
for(const name of ['Ysilde','Garin','Perrin'])assert.ok(node('#encounters').innerHTML.includes(name));
assert.equal((node('#besace').innerHTML.match(/class="besace-item"/g)||[]).length,4);
for(const page of ['carte','carnet','personnages','quetes','inventaire','univers']){
 context.location.hash='#'+page;handlers['window:hashchange']();
 assert.ok(html().length>200,`Page ${page} vide`);
 assert.ok(!html().includes('undefined'),`Valeur manquante : ${page}`);
}
function click(dataset={},attributes=[]){handlers['document:click']({target:{closest(){return {dataset,hasAttribute(name){return attributes.includes(name);}};}}});}
for(const person of ['ysilde','garin','perrin']){click({person});assert.equal(node('#detail').open,true);assert.match(node('#detail-body').innerHTML,/Portrait de/);click({},['data-close']);assert.equal(node('#detail').open,false);}
for(const place of ['vaucombe','forest','tower','valestre','moulin','clairiere','pierrefont']){click({place});assert.ok(node('#detail-body').innerHTML.length>100);}
for(const object of ['potion','key','letter','coins']){click({object});assert.match(node('#detail-body').innerHTML,/class="tag"/);}
click({},['data-resume']);assert.match(node('#detail-body').innerHTML,/On reprend Clairval/);
context.location.hash='#quetes';
for(const tab of ['active','possible','done']){click({tab});assert.match(html(),/class="quest-detail"/);}
context.location.hash='#personnages';handlers['window:hashchange']();
handlers['document:input']({target:{id:'people-search',value:'herboriste'}});
assert.match(node('#people-results').innerHTML,/Ysilde/);assert.ok(!node('#people-results').innerHTML.includes('Garin'));
handlers['document:input']({target:{id:'people-search',value:'aucun_nom'}});assert.match(node('#people-results').innerHTML,/Aucun personnage/);
assert.match(vm.runInContext("art('ysilde')",context),/viewBox="0 362 362 362"/);
assert.match(vm.runInContext("art('garin')",context),/viewBox="362 362 362 362"/);
assert.match(vm.runInContext("art('perrin')",context),/viewBox="724 362 362 362"/);
const standalone=fs.readFileSync(path.join(root,'Clairval-site-medieval.html'),'utf8');
assert.equal((standalone.match(/data:image\/webp;base64,/g)||[]).length,1);
assert.ok(Buffer.byteLength(standalone)<700_000);
assert.ok(!standalone.includes('<script src='));
assert.ok(!standalone.includes('PERRIN_STATE'));
console.log('Clairval : 6 rubriques, 3 PNJ, 7 lieux, 4 objets, 3 filtres de quête, recherche et reprise vérifiés. Fichier autonome < 700 Ko, sans dépendances externes.');
