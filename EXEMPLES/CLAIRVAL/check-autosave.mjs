import assert from 'node:assert/strict';
import {createAutoSync} from './dist/autosave-core.mjs';
const initial={version:1,journey:['vaucombe'],campaign:null};
const travelled={...initial,journey:['vaucombe','forest']};
const further={...initial,journey:['vaucombe','forest','vaucombe','tower']};
function harness({local=initial,remote=null,metadata=null}={}){
 let current=structuredClone(local),row=structuredClone(remote),marker=metadata;
 let writes=0,applies=0,error=null,hook=null,readHook=null,states=[];
 const progress={snapshot:()=>structuredClone(current),validate:v=>{if(!v||v.version!==1||!Array.isArray(v.journey))throw Error('invalid');return structuredClone(v);},apply:v=>{current=structuredClone(v);applies++;}};
 const store={owner:async()=>{},read:async()=>{if(error)throw error;await readHook?.();return structuredClone(row);},write:async(payload,expected)=>{
  await hook?.();
  if(error)throw error;
  if(expected!==(row?.version||0))throw Error('save_conflict');
  writes++;row={payload:structuredClone(payload),version:expected+1};return structuredClone(row);
 }};
 const controller=createAutoSync({store,progress,cache:{read:()=>marker,write:v=>marker=v},notify:(state,text)=>states.push({state,text})});
 return {controller,get local(){return current;},set local(v){current=structuredClone(v);},get row(){return row;},set row(v){row=structuredClone(v);},get writes(){return writes;},get applies(){return applies;},get marker(){return marker;},get states(){return states;},set error(v){error=v;},set hook(v){hook=v;},set readHook(v){readHook=v;}};
}
let h=harness();await h.controller.sync();assert.equal(h.writes,1);assert.equal(h.marker.version,1);assert.equal(h.controller.hasPending(),false);
await h.controller.sync();assert.equal(h.writes,1);
h.local=travelled;h.controller.changed();await h.controller.sync();assert.equal(h.row.version,2);assert.deepEqual(h.row.payload,travelled);
let next=harness({remote:h.row});await next.controller.sync();assert.deepEqual(next.local,travelled);assert.equal(next.applies,1);assert.equal(next.writes,0);
// Local and cloud edits diverge from a shared baseline: neither copy is overwritten.
h.local=further;h.controller.changed();h.row={payload:{...initial,journey:['vaucombe','tower']},version:3};
await h.controller.sync();assert.equal(h.controller.isPaused(),true);assert.deepEqual(h.local,further);assert.equal(h.writes,2);
// A manual choice explicitly resumes automatic operation.
await h.controller.accept({payload:further,version:4});h.row={payload:further,version:4};await h.controller.sync();assert.equal(h.controller.isPaused(),false);
// A remote-only change on an otherwise unchanged local copy is pulled.
h.row={payload:travelled,version:5};await h.controller.sync();assert.deepEqual(h.local,travelled);assert.equal(h.applies,1);
// Reload with unsent local changes and a saved fingerprint sends them.
next=harness({local:further,remote:h.row,metadata:h.marker});await next.controller.sync();assert.deepEqual(next.row.payload,further);assert.equal(next.writes,1);
// Network failure retains local data and retries safely.
next.local=travelled;next.controller.changed();next.error=Error('offline');await next.controller.sync();assert.deepEqual(next.local,travelled);assert.equal(next.controller.hasPending(),true);
next.error=null;await next.controller.sync();assert.deepEqual(next.row.payload,travelled);assert.equal(next.controller.hasPending(),false);
// No baseline and a populated local copy: require a choice.
h=harness({local:further,remote:{payload:travelled,version:2}});await h.controller.sync();assert.equal(h.controller.isPaused(),true);assert.equal(h.writes,0);assert.equal(h.applies,0);
// A competing write between read and save is rejected.
h=harness();await h.controller.sync();h.local=travelled;h.controller.changed();h.hook=()=>{h.row={payload:further,version:2};};
await h.controller.sync();assert.equal(h.controller.isPaused(),true);assert.equal(h.writes,1);assert.deepEqual(h.local,travelled);
// New local changes while a save is in flight are sent in a second pass.
h=harness();let called=false;h.hook=()=>{if(!called){called=true;h.local=travelled;h.controller.changed();}};
await h.controller.sync();assert.equal(h.writes,2);assert.deepEqual(h.row.payload,travelled);
// Stopping during a remote read must not apply remote data or write.
h=harness({remote:{payload:travelled,version:1}});h.readHook=()=>h.controller.stop();await h.controller.sync();assert.equal(h.applies,0);assert.equal(h.writes,0);
// Invalid remote payload is rejected without local mutation.
h=harness({remote:{payload:{version:99},version:1}});await h.controller.sync();assert.deepEqual(h.local,initial);assert.equal(h.applies,0);assert.equal(h.writes,0);
// Holds used by manual controls serialize operations.
h=harness();h.controller.hold(true);await h.controller.sync();assert.equal(h.writes,0);h.controller.hold(false);await h.controller.sync();assert.equal(h.writes,1);
console.log('Autosync : première sauvegarde, récupération, reprise après rechargement, réseau, divergence, concurrence, changements en vol, arrêt de session, données invalides et commandes manuelles vérifiés.');

// Exercise browser event wiring and the actual Supabase store adapter together.
const {mountCloud}=await import('./dist/cloud-sync.mjs');
const handlers={},docHandlers={},nodes=new Map(),timers=new Map(),saved=new Map();let local=structuredClone(initial),remote=null,nextTimer=0,authCallback;
const node=id=>{if(!nodes.has(id))nodes.set(id,{events:{},textContent:'',addEventListener(n,fn){this.events[n]=fn;}});return nodes.get(id);};
const client={auth:{getUser:async()=>({data:{user:{id:'browser-test'}}}),onAuthStateChange(fn){authCallback=fn;}},from(){return {select(){return this;},eq(){return this;},maybeSingle:async()=>({data:structuredClone(remote)})};},rpc:async(_name,args)=>{if((remote?.version||0)!==args.p_expected_version)return {error:{message:'save_conflict'}};remote={payload:structuredClone(args.p_payload),version:(remote?.version||0)+1};return {data:structuredClone(remote)};}};
const browser={localStorage:{getItem:k=>saved.get(k)||null,setItem:(k,v)=>saved.set(k,v)},addEventListener:(n,fn)=>handlers[n]=fn,setTimeout(fn){const id=++nextTimer;timers.set(id,fn);return id;},clearTimeout:id=>timers.delete(id),confirm:()=>true};
const result=await mountCloud({client,user:{id:'browser-test'},window:browser,document:{querySelector:node,visibilityState:'visible',addEventListener:(n,fn)=>docHandlers[n]=fn},progress:{snapshot:()=>structuredClone(local),validate:v=>structuredClone(v),apply:v=>local=structuredClone(v),legacy:()=>null}});
assert.equal(remote.version,1);
local=structuredClone(travelled);handlers['clairval-progress-changed']();assert.equal(result.automatic.hasPending(),true);
await [...timers.values()].at(-1)();assert.deepEqual(remote.payload,travelled);
remote={payload:further,version:3};await handlers.focus();assert.deepEqual(local,further);
remote={payload:travelled,version:4};await docHandlers.visibilitychange();await result.automatic.idle();assert.deepEqual(local,travelled);
authCallback('SIGNED_OUT',null);local=structuredClone(further);handlers['clairval-progress-changed']();await handlers.online();assert.equal(remote.version,4);
console.log('Intégration navigateur simulée : événement de progression, temporisation, retour sur l’onglet, visibilité et déconnexion vérifiés.');
