import {places} from './auvrenne-data.mjs';
const placeIds=new Set(places.map(p=>p.id));
const missions=new Set(['proposed','accepted','completed','declined']);
const exact=(v,keys)=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===keys.length&&keys.every(k=>Object.hasOwn(v,k));
const validDay=n=>Number.isSafeInteger(n)&&n>=1&&n<=100000;
const fail=()=>{throw Error('Sauvegarde d’Auvrenne invalide. Aucune donnée remplacée.');};
export const initialState=()=>({version:2,world:'auvrenne',journey:[],campaign:null,notes:'',bookmarks:[]});
export function validateState(v){
 if(!exact(v,['version','world','journey','campaign','notes','bookmarks'])||![1,2].includes(v.version)||v.world!=='auvrenne'||typeof v.notes!=='string'||v.notes.length>12000||!Array.isArray(v.bookmarks)||v.bookmarks.length>placeIds.size||new Set(v.bookmarks).size!==v.bookmarks.length||v.bookmarks.some(id=>!placeIds.has(id))||!Array.isArray(v.journey))fail();
 if(v.campaign===null){if(v.journey.length)fail();return {...initialState(),notes:v.notes,bookmarks:[...v.bookmarks]};}
 const c=v.campaign;
 if(v.version!==2||!exact(c,['day','sessions','mission','log'])||!validDay(c.day)||!Number.isSafeInteger(c.sessions)||!missions.has(c.mission)||!Array.isArray(c.log)||c.log.length>1000||c.sessions!==c.log.length)fail();
 const journey=['valcroix'];let day=1,mission='proposed';
 for(const entry of c.log){
  if(!exact(entry,['day','place','summary','mission'])||!validDay(entry.day)||entry.day<day||!placeIds.has(entry.place)||typeof entry.summary!=='string'||!entry.summary.trim()||entry.summary.length>4000||!missions.has(entry.mission)||(entry.mission==='completed'&&!['accepted','completed'].includes(mission)))fail();
  day=entry.day;mission=entry.mission;
  if(journey.at(-1)!==entry.place)journey.push(entry.place);
 }
 if(c.day!==day||c.mission!==mission||JSON.stringify(journey)!==JSON.stringify(v.journey))fail();
 return {version:2,world:'auvrenne',journey,campaign:{day,sessions:c.log.length,mission,log:c.log.map(x=>({...x}))},notes:v.notes,bookmarks:[...v.bookmarks]};
}
export function prepareCampaign(value){
 const next=validateState(value);
 if(next.campaign)return next;
 return {...next,journey:['valcroix'],campaign:{day:1,sessions:0,mission:'proposed',log:[]}};
}
export function recordSession(value,{day,place,summary,mission}){
 const next=validateState(value);
 if(!next.campaign)throw Error('Initialise le départ avant de consigner une séance.');
 next.campaign.log.push({day,place,summary:typeof summary==='string'?summary.trim():summary,mission});
 next.campaign.sessions=next.campaign.log.length;next.campaign.day=day;next.campaign.mission=mission;
 if(next.journey.at(-1)!==place)next.journey.push(place);
 return validateState(next);
}
