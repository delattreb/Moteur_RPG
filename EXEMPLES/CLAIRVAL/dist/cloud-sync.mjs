const stable=value=>JSON.stringify(value,(_key,item)=>item&&typeof item==='object'&&!Array.isArray(item)?Object.fromEntries(Object.keys(item).sort().map(key=>[key,item[key]])):item);
export function createCloudStore(client,userId){
 async function owner(){const {data,error}=await client.auth.getUser();if(error||data.user?.id!==userId)throw Error('Session modifiée. Reconnectez-vous avant de synchroniser.');}
 return {
  async read(){await owner();const {data,error}=await client.from('clairval_saves').select('payload,version,updated_at').eq('user_id',userId).maybeSingle();if(error)throw error;return data;},
  async write(payload,expectedVersion){await owner();const {data,error}=await client.rpc('save_clairval',{p_payload:payload,p_expected_version:expectedVersion});if(error)throw error;if(!data||!Number.isInteger(data.version))throw Error('Réponse de sauvegarde invalide.');return data;},
  owner
 };
}
export async function mountCloud({client,user,document,window,progress}){
 const store=createCloudStore(client,user.id);
 const status=document.querySelector('#cloud-status');
 const buttons=['#cloud-save','#cloud-load','#cloud-legacy'].map(id=>document.querySelector(id));
 let busy=false;
 async function run(action){
  if(busy)return;busy=true;buttons.forEach(b=>b.disabled=true);status.textContent='Synchronisation en cours…';
  try{await action();}catch(error){status.textContent=String(error.message).includes('save_conflict')?'Une autre sauvegarde a été enregistrée entre-temps. Rien n’a été écrasé. Réessayez après vérification.':'Synchronisation impossible : '+(error.message||'vérifiez le réseau')+' Votre progression locale est conservée.';}
  finally{busy=false;buttons.forEach(b=>b.disabled=false);}
 }
 const describe=p=>p.campaign?'campagne '+p.campaign.campaignId+', révision '+p.campaign.revision:'parcours libre, '+p.journey.length+' étape(s)';
 buttons[0].addEventListener('click',()=>run(async()=>{
  const snapshot=progress.validate(progress.snapshot());
  const remote=await store.read();
  if(remote&&stable(progress.validate(remote.payload))!==stable(snapshot)&&!window.confirm('Remplacer la sauvegarde en ligne ('+describe(progress.validate(remote.payload))+') par celle de cet appareil ('+describe(snapshot)+') ?')){status.textContent='Envoi annulé. Sauvegardes conservées.';return;}
  // The confirmation may have taken time: do not send a snapshot the player has since changed.
  if(JSON.stringify(snapshot)!==JSON.stringify(progress.snapshot()))throw Error('La progression a changé pendant l’envoi. Réessayez.');
  const saved=await store.write(snapshot,remote?.version||0);
  const checked=await store.read();
  if(!checked||checked.version!==saved.version||stable(checked.payload)!==stable(saved.payload))throw Error('La sauvegarde a évolué ou n’a pas pu être relue. Vérifiez avant de quitter cet appareil.');
  status.textContent='Sauvegarde en ligne vérifiée · version '+saved.version+'. Vous pouvez la récupérer sur un autre appareil.';
 }));
 buttons[1].addEventListener('click',()=>run(async()=>{
  const before=JSON.stringify(progress.snapshot()),remote=await store.read();
  if(!remote){status.textContent='Aucune sauvegarde en ligne. Utilisez Sauvegarder en ligne depuis votre premier appareil.';return;}
  const next=progress.validate(remote.payload);
  if(stable(JSON.parse(before))!==stable(next)&&!window.confirm('Récupérer '+describe(next)+' ? La progression de cet appareil sera remplacée. Exportez d’abord votre campagne si vous voulez la conserver.')){status.textContent='Récupération annulée. Progression locale conservée.';return;}
  await store.owner();
  if(before!==JSON.stringify(progress.snapshot()))throw Error('La progression locale a changé. Réessayez.');
  progress.apply(next);status.textContent='Sauvegarde récupérée · version '+remote.version+'.';
 }));
 buttons[2].addEventListener('click',()=>run(async()=>{
  const old=progress.legacy();
  if(!old){status.textContent='Aucune ancienne progression dans ce navigateur.';return;}
  if(!window.confirm('Rattacher l’ancienne progression de ce navigateur à ce compte ? Vérifiez qu’elle vous appartient. La progression actuelle sera remplacée.')){status.textContent='Import annulé.';return;}
  await store.owner();progress.apply(old);status.textContent='Ancienne progression récupérée localement. Cliquez sur Sauvegarder en ligne pour la transférer.';
 }));
 status.textContent='Sauvegarde manuelle : envoyez votre progression avant de changer d’appareil, puis récupérez-la sur le suivant.';
}
