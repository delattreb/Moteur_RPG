import {initialState,validateState} from './auvrenne-campaign.mjs';
export {initialState,validateState};
export function createProgress({storage,userId,onChange=()=>{}}){
 const key='auvrenne.journal.v1.'+userId;
 let state=initialState(),warning='';
 try{const raw=storage.getItem(key);if(raw)state=validateState(JSON.parse(raw));}catch{warning='La copie locale est illisible ou inaccessible. Elle n’a pas été effacée.';}
 function snapshot(){return structuredClone(state);}
 function commit(value){
  const next=validateState(value),encoded=JSON.stringify(next),previous=storage.getItem(key);
  try{storage.setItem(key,encoded);if(storage.getItem(key)!==encoded)throw Error('readback');}
  catch{try{if(previous===null)storage.removeItem(key);else storage.setItem(key,previous);}catch{}throw Error('Enregistrement local impossible. Le carnet affiché est conservé.');}
  state=next;return snapshot();
 }
 return {
  snapshot,validate:validateState,warning,
  apply(value){commit(value);onChange('restore');},
  update(value){commit(value);onChange('edit');},
  isEmpty(value){return value.campaign===null&&value.notes===''&&value.bookmarks.length===0;},
  describe:value=>value.campaign?'Auvrenne, jour '+value.campaign.day+', '+value.campaign.sessions+' séance(s) consignée(s)': 'carnet préparatoire d’Auvrenne',
  legacy:()=>null,supportsLegacy:false,
  cloudConfig:{table:'auvrenne_saves',rpc:'save_auvrenne'},
  syncKey:'auvrenne.sync.'+userId
 };
}

