export const stable=value=>JSON.stringify(value,(_key,item)=>item&&typeof item==='object'&&!Array.isArray(item)?Object.fromEntries(Object.keys(item).sort().map(key=>[key,item[key]])):item);
const fingerprint=async value=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(stable(value))))).map(b=>b.toString(16).padStart(2,'0')).join('');
export function createAutoSync({store,progress,cache,notify,hash=fingerprint}){
 let baseline=null,paused=false,held=false,stopped=false,running=null,requested=false,changes=0,pending=false;
 try{const saved=cache.read();if(Number.isInteger(saved?.version)&&saved.version>0&&/^[a-f0-9]{64}$/.test(saved.hash))baseline=saved;}catch{}
 const tell=(state,text)=>{if(!stopped)notify(state,text);};
 function conflict(){paused=true;tell('conflict','Deux progressions différentes sont présentes. Synchronisation suspendue : choisissez Sauvegarder en ligne pour conserver cet appareil, ou Récupérer ma sauvegarde pour utiliser la copie en ligne.');}
 async function remember(row){
  const next={version:row.version,hash:await hash(progress.validate(row.payload))};
  if(stopped)return;
  baseline=next;paused=false;
  try{cache.write(next);}catch{tell('warning','Sauvegarde en ligne vérifiée, mais le suivi local ne peut pas être conservé. Gardez votre export JSON.');}
 }
 async function step(){
  const sequence=changes,snapshot=progress.validate(progress.snapshot()),localHash=await hash(snapshot);
  tell('syncing','Synchronisation automatique en cours…');
  const remote=await store.read();
  if(stopped)return;
  if(sequence!==changes||stable(snapshot)!==stable(progress.snapshot())){requested=true;return;}
  const remoteHash=remote?await hash(progress.validate(remote.payload)):null;
  if(stopped)return;
  if(remote&&remoteHash===localHash){await remember(remote);if(sequence!==changes){pending=true;requested=true;return;}pending=false;tell('synced','Synchronisation automatique vérifiée · version '+remote.version+'.');return;}
  if(remote&&baseline&&remote.version<baseline.version){conflict();return;}
  const empty=!snapshot.campaign&&snapshot.journey.length===1&&snapshot.journey[0]==='vaucombe';
  const pull=remote&&(baseline?localHash===baseline.hash:empty);
  if(pull){
   await store.owner();
   if(stopped)return;
   if(sequence!==changes||stable(snapshot)!==stable(progress.snapshot())){requested=true;return;}
   progress.apply(progress.validate(remote.payload));await remember(remote);if(sequence!==changes){pending=true;requested=true;return;}pending=false;
   tell('synced','Progression récupérée automatiquement · version '+remote.version+'.');return;
  }
  const push=!remote&&!baseline||remote&&baseline&&remoteHash===baseline.hash;
  if(!push){conflict();return;}
  const saved=await store.write(snapshot,remote?.version||0);
  if(stopped)return;
  // Retain an accepted write's fingerprint if its read-back fails.
  await remember(saved);
  const checked=await store.read();
  if(stopped)return;
  if(!checked||checked.version!==saved.version||await hash(progress.validate(checked.payload))!==await hash(snapshot)){conflict();return;}
  if(sequence!==changes||stable(snapshot)!==stable(progress.snapshot())){requested=true;pending=true;return;}
  pending=false;tell('synced','Sauvegarde automatique en ligne vérifiée · version '+saved.version+'.');
 }
 function sync(){
  if(stopped||held||paused)return Promise.resolve();
  requested=true;
  if(running)return running;
  running=(async()=>{
   while(requested&&!stopped&&!held&&!paused){
    requested=false;
    try{await step();}catch(error){
     requested=false;pending=true;
     if(String(error.message).includes('save_conflict'))conflict();
     else tell('offline','Synchronisation indisponible. Progression locale conservée ; nouvelle tentative au retour du réseau ou avec Sauvegarder en ligne.');
     break;
    }
   }
  })().finally(()=>{running=null;});
  return running;
 }
 return {
  sync,
  changed(){changes++;pending=true;if(!paused)tell('pending','Progression conservée localement · sauvegarde automatique à venir…');},
  hold(value){held=value;},
  idle(){return running||Promise.resolve();},
  async accept(row){await remember(row);pending=false;},
  stop(){stopped=true;requested=false;},
  hasPending(){return !stopped&&pending;},
  isPaused(){return paused;}
 };
}
