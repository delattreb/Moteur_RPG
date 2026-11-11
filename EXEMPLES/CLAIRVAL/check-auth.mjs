import assert from 'node:assert/strict';
import {startAuth} from './dist/auth-core.mjs';
function harness(user=null){
 const nodes=new Map(),listeners={},timers=[];
 let current=user,network=false,loads=0,reloads=0,signups=0;
 function node(id){if(!nodes.has(id))nodes.set(id,{hidden:true,textContent:'',events:{},addEventListener(n,f){this.events[n]=f;},querySelectorAll(){return [];},close(){this.closed=true;}});return nodes.get(id);}
 const form=node('#auth-form');form.elements={email:{value:'user@example.com'},password:{value:'long-password-123'}};
 const auth={
  async getUser(){if(network)throw Error('network');return {data:{user:current},error:current?null:Error('invalid')};},
  async signInWithPassword(){current={email:'user@example.com'};return {data:{session:{}},error:null};},
  async signUp(){signups++;return {data:{session:null},error:null};},
  async signOut(){current=null;listeners.auth('SIGNED_OUT',null);return {error:null};},
  onAuthStateChange(fn){listeners.auth=fn;}
 };
 return {node,form,listeners,timers,auth,setUser:u=>current=u,setNetwork:v=>network=v,get loads(){return loads;},get reloads(){return reloads;},get signups(){return signups;},
  deps:{createClient:()=>({auth}),document:{querySelector:node},window:{setTimeout:fn=>timers.push(fn),addEventListener:(n,fn)=>listeners[n]=fn,location:{reload(){reloads++;}}},loadGame:async()=>{loads++;}}};
}
let h=harness();let gate=await startAuth(h.deps);
assert.equal(h.loads,0);assert.equal(h.node('#clairval-app').hidden,true);
h.listeners.hashchange();assert.equal(h.loads,0);
h.setNetwork(true);await gate.verify();assert.equal(h.loads,0);assert.match(h.node('#auth-status').textContent,/indisponible/);
h.setNetwork(false);h.setUser({email:'user@example.com'});await gate.verify();
assert.equal(h.loads,1);assert.equal(h.node('#clairval-app').hidden,false);assert.equal(h.node('#auth-panel').hidden,true);
await gate.verify();assert.equal(h.loads,1);
h.setUser(null);await gate.verify();assert.equal(h.node('#clairval-app').hidden,true);
await h.form.events.submit({preventDefault(){},submitter:{value:'signup'}});
assert.equal(h.signups,1);assert.equal(h.node('#clairval-app').hidden,true);assert.match(h.node('#auth-status').textContent,/messagerie/);
await h.form.events.submit({preventDefault(){},submitter:{value:'login'}});
assert.equal(h.node('#clairval-app').hidden,false);assert.equal(h.form.elements.password.value,'');
h.listeners.auth('SIGNED_OUT',null);assert.equal(h.node('#clairval-app').hidden,true);
await h.node('#auth-logout').events.click();assert.equal(h.reloads,1);
h=harness({email:'returning@example.com'});await startAuth(h.deps);assert.equal(h.loads,1);
h=harness({email:'valid@example.com'});h.deps.loadGame=async()=>{throw Error('script failed')};await startAuth(h.deps);assert.equal(h.node('#clairval-app').hidden,true);
console.log('Auth : session absente/invalide, liens directs, réseau indisponible, session valide, chargement unique, inscription, connexion, déconnexion et échec du script vérifiés.');
