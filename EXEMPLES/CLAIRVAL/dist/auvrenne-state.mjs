import {places} from './auvrenne-data.mjs';
const keys=['version','world','journey','campaign','notes','bookmarks'];
export const initialState=()=>({version:1,world:'auvrenne',journey:[],campaign:null,notes:'',bookmarks:[]});
export function validateState(value){
 if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).length!==keys.length||!keys.every(k=>Object.hasOwn(value,k))||value.version!==1||value.world!=='auvrenne'||!Array.isArray(value.journey)||value.journey.length!==0||value.campaign!==null||typeof value.notes!=='string'||value.notes.length>12000||!Array.isArray(value.bookmarks)||value.bookmarks.length>places.length||new Set(value.bookmarks).size!==value.bookmarks.length||value.bookmarks.some(id=>!places.some(p=>p.id===id)))throw Error('Ce fichier n’est pas un carnet préparatoire d’Auvrenne valide.');
 return {version:1,world:'auvrenne',journey:[],campaign:null,notes:value.notes,bookmarks:[...value.bookmarks]};
}
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
  isEmpty(value){return value.notes===''&&value.bookmarks.length===0;},
  describe:value=>'carnet d’Auvrenne, '+value.bookmarks.length+' repère(s) favori(s)',
  legacy:()=>null,supportsLegacy:false,
  cloudConfig:{table:'auvrenne_saves',rpc:'save_auvrenne'},
  syncKey:'auvrenne.sync.'+userId
 };
}
