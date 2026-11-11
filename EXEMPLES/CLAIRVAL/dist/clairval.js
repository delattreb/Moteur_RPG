'use strict';
const ART=window.CLAIRVAL_ART||'assets/medieval-art.webp';
const e=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cells={village:[0,0],book:[1,0],map:[2,0],castle:[3,0],ysilde:[0,1],garin:[1,1],perrin:[2,1],forest:[3,1],letter:[0,2],bag:[1,2],tower:[2,2],objects:[3,2]};
const itemCrops={potion:[535,875,150,200],key:[365,945,155,130],scroll:[1250,920,190,150],coins:[1190,967,200,117]};
function art(key,label=''){
 const [x,y]=cells[key]||cells.book;
 const box=itemCrops[key]?itemCrops[key].join(' '):`${x*362} ${y*362} 362 362`;
 return `<svg class="art" viewBox="${box}" preserveAspectRatio="xMidYMid slice" ${label?`role="img" aria-label="${e(label)}"`:'aria-hidden="true"'}><image href="${ART}" width="1448" height="1086"/></svg>`;
}
const people=[
 {id:'ysilde',name:'Ysilde',role:'Herboriste',place:'Vaucombe',bond:'Une aide discrète',description:'Dans son échoppe au bord des remparts, Ysilde prépare des remèdes, fait sécher des plantes et écoute les nouvelles qui traversent le bourg. Elle connaît les chemins qui longent le Bois des Brumes.',last:'Elle vous a reçu à son échoppe et indiqué les premières précautions à prendre avant de quitter la route.',quote:'« La forêt ne se traverse pas en regardant seulement devant soi. »'},
 {id:'garin',name:'Garin',role:'Capitaine du guet',place:'La porte de Vaucombe',bond:'Une confiance à gagner',description:'Garin commande le guet de Vaucombe. Peu porté sur les rumeurs, il préfère un fait précis à une longue histoire. Ces derniers jours, les rondes se sont allongées autour des portes.',last:'Vous l’avez rencontré à la porte du bourg. Il vous a demandé de lui rapporter tout fait inhabituel observé sur la route.',quote:'« Si tu as vu quelque chose, dis-moi quoi. Le reste attendra. »'},
 {id:'perrin',name:'Perrin',role:'Messager',place:'La place du marché',bond:'Une rencontre inattendue',description:'Perrin porte les messages entre les bourgs de Clairval. Il est arrivé à Vaucombe peu avant la fermeture des portes, une sacoche poussiéreuse en bandoulière et une lettre sans sceau à remettre.',last:'Sur la place du marché, il vous a confié une lettre étrange, sans signature, puis repris son souffle.',quote:'« On m’a dit de la remettre à quelqu’un qui accepterait de la lire. »'}
];
const locations=[
 {id:'vaucombe',name:'Vaucombe',short:'Vaucombe',art:'village',tag:'Bourg de Clairval',visited:true,x:36,y:48,description:'Un bourg prospère au cœur de Clairval. Les maisons à colombages se serrent autour de la place du marché, sous la protection d’un château posé sur les hauteurs.',detail:'Au crépuscule, les étals se replient et les lanternes s’allument. Ysilde tient son échoppe près des remparts ; Garin veille à la porte du bourg.'},
 {id:'forest',name:'Le Bois des Brumes',short:'Le Bois des Brumes',art:'forest',tag:'Une forêt ancienne aux mystères tenaces',visited:true,x:15,y:57,description:'Une forêt ancienne où les sentiers disparaissent parfois sous la mousse et les nappes de brume. À la lisière se dresse une pierre gravée.',detail:'Vous avez atteint la lisière. Le sous-bois profond reste à découvrir ; les récits entendus à Vaucombe ne suffisent pas à en établir les chemins.'},
 {id:'tower',name:'La tour oubliée',short:'La tour oubliée',art:'tower',tag:'Une sentinelle de pierre, tombée dans l’oubli',visited:true,x:65,y:35,description:'Une tour en ruine sur une hauteur herbeuse. Ses murs éventrés dominent les chemins qui serpentent entre la forêt et les premières collines.',detail:'La tour a été aperçue depuis le chemin. Son intérieur n’a pas été exploré.'},
 {id:'valestre',name:'Valestre',short:'Valestre',art:'castle',tag:'Bourg connu par les récits',visited:false,x:19,y:20,description:'Un bourg de l’ouest de Clairval, mentionné par les voyageurs rencontrés à Vaucombe.',detail:'Vous connaissez son nom. Le voyage jusqu’à Valestre reste à entreprendre.'},
 {id:'moulin',name:'Moulin de l’Aronde',short:'Moulin de l’Aronde',art:'village',tag:'Sur les rives de l’Aronde',visited:false,x:48,y:73,description:'Un moulin sur l’Aronde, cité par les marchands de passage.',detail:'Ce lieu est connu de nom. Aucun événement de la démonstration n’y a encore été joué.'},
 {id:'clairiere',name:'La Clairière des Cerfs',short:'La Clairière des Cerfs',art:'forest',tag:'Une halte évoquée par Ysilde',visited:false,x:21,y:82,description:'Ysilde vous a parlé d’une clairière aux abords de la forêt.',detail:'Son nom est consigné dans votre carnet ; ses particularités restent à découvrir.'},
 {id:'pierrefont',name:'Pierrefont',short:'Pierrefont',art:'castle',tag:'À l’aval de Vaucombe',visited:false,x:66,y:84,description:'Un village mentionné par Perrin au cours de votre rencontre.',detail:'Vous n’y avez pas encore voyagé.'}
];
const objects=[
 {id:'potion',name:'Fiole de soin',icon:'⚗',amount:'1 fiole',place:'Dans la besace',description:'Une petite fiole de verre rouge, soigneusement bouchée. Ysilde vous l’a remise pour la route. Son usage demande encore ses indications.',art:'bag'},
 {id:'key',name:'Clé de fer',icon:'⚿',amount:'1 clé',place:'Dans la besace',description:'Une clé ancienne au panneton simple. La serrure à laquelle elle correspond n’a pas encore été identifiée.',art:'objects'},
 {id:'letter',name:'La lettre sans sceau',icon:'✉',amount:'1 document',place:'Dans la besace',description:'Une lettre de parchemin confiée par Perrin. Elle ne porte ni sceau ni signature. Son contenu reste à examiner ensemble au prochain échange.',art:'letter'},
 {id:'coins',name:'Bourse de voyage',icon:'◈',amount:'12 pièces',place:'À la ceinture',description:'Une petite bourse de cuir contenant douze pièces de la monnaie de Clairval. Cette somme appartient uniquement à cet exemple de démonstration.',art:'objects'}
];
const quests=[
 {id:'letter',title:'Une lettre sans sceau',status:'active',label:'En cours',art:'letter',description:'Un messager essoufflé vous remet une lettre étrange, sans sceau ni signature. Son contenu pourrait bien bouleverser l’équilibre de Vaucombe…',next:'Examiner la lettre et décider à qui en parler.',source:'Perrin · place du marché'},
 {id:'tower',title:'La pierre et la brume',status:'possible',label:'Piste à explorer',art:'tower',description:'Depuis le chemin, vous avez aperçu une vieille tour au-dessus de la forêt. Personne ne vous a encore demandé de vous y rendre.',next:'Interroger les habitants sur la tour avant d’envisager l’exploration.',source:'Observation depuis la route'},
 {id:'arrival',title:'Les portes de Clairval',status:'done',label:'Accomplie',art:'village',description:'Vous avez atteint Vaucombe avant la fermeture des portes et rencontré les premiers visages du bourg.',next:'Le carnet conserve le souvenir de votre arrivée.',source:'Jour 12 · Vaucombe'}
];
const menu=[['carnet','Carnet','book'],['carte','Carte','map'],['personnages','Personnages','ysilde'],['quetes','Quêtes','letter'],['inventaire','Inventaire','bag'],['univers','Univers','castle']];
const main=document.querySelector('#content'),dialog=document.querySelector('#detail');
let currentQuestTab='active',campaignQuestTab='active',personQuery='';
const hashPage=()=>{const name=location.hash.slice(1);return menu.some(([id])=>id===name)?name:'carte';};
function show(title,body){
 document.querySelector('#detail-body').innerHTML=`<p class="eyebrow">Une page de votre voyage</p><h2 id="detail-title">${e(title)}</h2>${body}`;
 if(!dialog.open)dialog.showModal();
}
function showPerson(id){if(mapMode==='campaign')return;const person=people.find(x=>x.id===id);if(!person)return;show(person.name,`<div class="npc-detail">${art(person.id,'Portrait de '+person.name)}<div><p class="eyebrow">${e(person.role)} · ${e(person.place)}</p><h3>${e(person.bond)}</h3><p>${e(person.description)}</p><p><em>${e(person.quote)}</em></p></div></div><div class="info-card"><h3>Votre dernière rencontre</h3><p>${e(person.last)}</p></div>`);}
const routes=[['vaucombe','forest'],['vaucombe','tower'],['vaucombe','moulin'],['forest','clairiere'],['forest','valestre'],['moulin','pierrefont']];
const bearings={forest:'Vers la lisière du bois',tower:'Vers les hauteurs',moulin:'Suivre la rive au sud',vaucombe:'Revenir au bourg',clairiere:'Suivre le sentier forestier',valestre:'Prendre la route de l’ouest',pierrefont:'Descendre le cours de l’Aronde'};
const discoveries={forest:'Vous atteignez la lisière : une pierre gravée marque le départ du sentier. Le sous-bois profond demeure inconnu.',tower:'Au pied de la tour, les murs éventrés dominent le chemin. Vous restez dehors : son intérieur attend une décision.',moulin:'La rive vous conduit jusqu’au moulin de l’Aronde. Vous observez sa roue depuis le chemin.',clairiere:'Le sentier débouche dans une clairière bordée de grands arbres. Vous faites halte à son entrée.',valestre:'La route de l’ouest rejoint les premières maisons de Valestre.',pierrefont:'En suivant l’Aronde, vous parvenez aux abords de Pierrefont.'};
const accountSuffix=window.CLAIRVAL_USER_ID?'.'+window.CLAIRVAL_USER_ID:'';
const travelKey='clairval.exploration.v1'+accountSuffix;
let storageMessage='',journey=['vaucombe'];
const adjacent=(a,b)=>routes.some(([x,y])=>(a===x&&b===y)||(a===y&&b===x));
function restoreJourney(){
 try{const raw=window.localStorage.getItem(travelKey);if(!raw)return;
  const saved=JSON.parse(raw);
  if(saved.version!==1||!Array.isArray(saved.journey)||saved.journey.length<1||saved.journey.length>10000||saved.journey[0]!=='vaucombe'||saved.journey.some((id,i)=>!locations.some(p=>p.id===id)||(i>0&&!adjacent(saved.journey[i-1],id))))throw Error('invalid');
  journey=saved.journey;
 }catch{storageMessage='La progression enregistrée est indisponible. Ce parcours reste temporaire jusqu’à un enregistrement réussi.';}
}
restoreJourney();
// Projection publique de campagne : aucun état privé du MJ ne doit être importé ici.
const campaignKey='clairval.campaign.v1'+accountSuffix;
let mapMode='free',campaign=null,campaignMessage='';
const exactKeys=(value,keys)=>value&&typeof value==='object'&&!Array.isArray(value)&&Object.keys(value).length===keys.length&&keys.every(k=>Object.hasOwn(value,k));
const boundedText=(value,max)=>typeof value==='string'&&value.trim().length>0&&value.length<=max;
function validateCampaign(data){
 const keys=['version','campaignId','revision','start','events','moment','objective','pending'];
 if(data?.version>=2)keys.push('quests');
 if(data?.version>=3)keys.push('inventory');
 if(data?.version===4)keys.push('characterState');
 if(!exactKeys(data,keys)||![1,2,3,4].includes(data.version)||!boundedText(data.campaignId,80)||!Number.isSafeInteger(data.revision)||data.revision<1||data.start!=='vaucombe'||!Array.isArray(data.events)||data.events.length>2000||!boundedText(data.moment,160)||!boundedText(data.objective,600)||!boundedText(data.pending,600))throw Error('Format non reconnu. Utilisez le modèle public Clairval, sans données privées.');
 let position=data.start;const ids=new Set();
 for(const event of data.events){
  if(!exactKeys(event,['id','from','to','summary','people'])||!boundedText(event.id,100)||ids.has(event.id)||event.from!==position||!adjacent(position,event.to)||!boundedText(event.summary,1200)||!Array.isArray(event.people)||event.people.length>people.length||new Set(event.people).size!==event.people.length||event.people.some(id=>!people.some(p=>p.id===id)))throw Error('Déplacements incohérents : vérifiez l’ordre, les lieux, les rencontres et les identifiants uniques.');
  ids.add(event.id);position=event.to;
 }
 const result={version:data.version,campaignId:data.campaignId,revision:data.revision,start:data.start,events:data.events.map(event=>({id:event.id,from:event.from,to:event.to,summary:event.summary,people:[...event.people]})),moment:data.moment,objective:data.objective,pending:data.pending};
 if(data.version>=2)result.quests=validateCampaignQuests(data.quests,result);
 if(data.version>=3)result.inventory=validateCampaignInventory(data.inventory);
 if(data.version===4)result.characterState=validateCharacterState(data.characterState);
 return result;
}
function validateCampaignQuests(list,data){
 if(!Array.isArray(list)||list.length>200)throw Error('La liste des missions est absente ou trop volumineuse.');
 const knownPeople=new Set(data.events.flatMap(event=>event.people)),knownPlaces=new Set([data.start,...data.events.map(event=>event.to)]),ids=new Set();
 const texts=value=>Array.isArray(value)&&value.length<=30&&value.every(text=>boundedText(text,1200));
 const optional=value=>typeof value==='string'&&value.length<=1200;
 return list.map(q=>{
  const keys=['id','title','status','origin','objective','stakes','facts','leads','deadline','commitments','people','places','nextDecision','outcome','consequences'];
  if(!exactKeys(q,keys)||!boundedText(q.id,100)||ids.has(q.id)||!boundedText(q.title,160)||!['possible','active','completed','refused','abandoned','failed'].includes(q.status)||!boundedText(q.origin,600)||!boundedText(q.objective,600)||!optional(q.stakes)||!texts(q.facts)||!texts(q.leads)||!optional(q.deadline)||!texts(q.commitments)||!optional(q.nextDecision)||!optional(q.outcome)||!texts(q.consequences))throw Error('Mission invalide : vérifiez ses champs, son statut et son identifiant unique.');
  const refs=(refs,known)=>Array.isArray(refs)&&refs.length<=known.size&&new Set(refs).size===refs.length&&refs.every(id=>known.has(id));
  if(!refs(q.people,knownPeople)||!refs(q.places,knownPlaces))throw Error('Une mission référence un personnage non rencontré ou un lieu non découvert dans la projection.');
  const closed=!['active','possible'].includes(q.status);
  if(q.status==='active'&&q.commitments.length===0)throw Error('Une mission en cours doit préciser l’engagement réellement accepté.');
  if(closed&&(!boundedText(q.outcome,1200)||q.nextDecision!==''))throw Error('Une mission historique doit préciser son issue et ne plus proposer de prochaine décision.');
  if(!closed&&q.outcome!=='')throw Error('Une mission ouverte ne doit pas annoncer une issue accomplie.');
  ids.add(q.id);return Object.fromEntries(keys.map(key=>[key,Array.isArray(q[key])?[...q[key]]:q[key]]));
 });
}
function inventoryBalances(inventory){
 const balances=new Map(inventory.items.map(item=>[item.id,item.openingQuantity]));
 for(const movement of inventory.movements){
  const before=balances.get(movement.itemId);
  if(before===null)continue;
  const after=before+(movement.type==='receive'?movement.quantity:-movement.quantity);
  if(!Number.isSafeInteger(after)||after<0)throw Error('Mouvement impossible : quantité ou solde insuffisant, ou nombre trop élevé.');
  balances.set(movement.itemId,after);
 }
 return balances;
}
function validateCampaignInventory(inventory){
 if(!exactKeys(inventory,['items','movements'])||!Array.isArray(inventory.items)||inventory.items.length>300||!Array.isArray(inventory.movements)||inventory.movements.length>5000)throw Error('Inventaire invalide ou trop volumineux.');
 const items=new Map(),movementIds=new Set();
 const result={items:inventory.items.map(item=>{
  const keys=['id','name','description','kind','unit','openingQuantity','openingSource'];
  if(!exactKeys(item,keys)||!boundedText(item.id,100)||items.has(item.id)||!boundedText(item.name,160)||typeof item.description!=='string'||item.description.length>1200||!['item','currency'].includes(item.kind)||!boundedText(item.unit,80)||!(item.openingQuantity===null||(Number.isSafeInteger(item.openingQuantity)&&item.openingQuantity>=0))||!boundedText(item.openingSource,600))throw Error('Objet invalide : précisez son identité, son unité et la source de sa quantité initiale.');
  items.set(item.id,item);return Object.fromEntries(keys.map(key=>[key,item[key]]));
 }),movements:inventory.movements.map(movement=>{
  const keys=['id','itemId','type','quantity','summary','session','counterparty'];
  const item=items.get(movement?.itemId);
  if(!exactKeys(movement,keys)||!boundedText(movement.id,100)||movementIds.has(movement.id)||!item||!['receive','use','give','lose','spend'].includes(movement.type)||!Number.isSafeInteger(movement.quantity)||movement.quantity<=0||!boundedText(movement.summary,1200)||!boundedText(movement.session,160)||typeof movement.counterparty!=='string'||movement.counterparty.length>160)throw Error('Mouvement invalide : vérifiez son identifiant unique, son objet, sa quantité et son fait d’origine.');
  if((movement.type==='spend'&&item.kind!=='currency')||(movement.type==='use'&&item.kind!=='item'))throw Error('Une dépense concerne une monnaie ; une utilisation consommée concerne un objet.');
  if(movement.type==='give'&&!boundedText(movement.counterparty,160))throw Error('Un transfert doit préciser à qui l’objet ou la monnaie a été remis.');
  movementIds.add(movement.id);return Object.fromEntries(keys.map(key=>[key,movement[key]]));
 })};
 inventoryBalances(result);return result;
}
function characterConditions(state){
 const conditions=new Map();
 for(const event of state.events){
  const previous=conditions.get(event.conditionId);
  if(event.action==='onset'){
   if(previous)throw Error('Un état déjà consigné conserve son identifiant. Une rechute distincte reçoit un nouvel identifiant.');
  }else if(!previous||previous.resolved||previous.kind!==event.kind)throw Error('Évolution incohérente : l’état doit exister, rester actif et conserver sa catégorie.');
  conditions.set(event.conditionId,{...event,resolved:event.action==='resolve'});
 }
 return [...conditions.values()];
}
function validateCharacterState(state){
 if(!exactKeys(state,['events'])||!Array.isArray(state.events)||state.events.length>2000)throw Error('Registre d’état du personnage absent ou trop volumineux.');
 const ids=new Set();
 const result={events:state.events.map(event=>{
  const keys=['id','conditionId','kind','action','title','consequences','recovery','source','session'];
  if(!exactKeys(event,keys)||!boundedText(event.id,100)||ids.has(event.id)||!boundedText(event.conditionId,100)||!['injury','fatigue','effect'].includes(event.kind)||!['onset','update','resolve'].includes(event.action)||!boundedText(event.title,160)||!Array.isArray(event.consequences)||event.consequences.length>20||event.consequences.some(text=>!boundedText(text,600))||typeof event.recovery!=='string'||event.recovery.length>1200||!boundedText(event.source,1200)||!boundedText(event.session,160))throw Error('État invalide : précisez la catégorie, les conséquences connues et le fait d’origine, sans jauge ajoutée.');
  if(event.action==='resolve'&&(event.consequences.length||event.recovery!==''))throw Error('Un état levé ne conserve ni conséquence active ni condition de récupération en attente.');
  ids.add(event.id);return Object.fromEntries(keys.map(key=>[key,Array.isArray(event[key])?[...event[key]]:event[key]]));
 })};
 characterConditions(result);return result;
}
function restoreCampaign(){try{const raw=window.localStorage.getItem(campaignKey);if(raw)campaign=validateCampaign(JSON.parse(raw));}catch{campaignMessage='La carte de campagne enregistrée est illisible ou inaccessible. Réimportez votre dernière mise à jour publique.';}}
restoreCampaign();
const campaignJourney=()=>campaign?[campaign.start,...campaign.events.map(event=>event.to)]:['vaucombe'];
const campaignPeople=()=>campaign?[...new Set(campaign.events.flatMap(event=>event.people))]:[];
function importCampaign(raw){
 try{
  if(typeof raw!=='string'||raw.length>4000000)throw Error('Mise à jour trop volumineuse.');
  const data=validateCampaign(JSON.parse(raw));
  if(campaign){
   if(data.version<campaign.version)throw Error('Conservez le format de campagne et toutes les données déjà intégrées.');
   if(data.campaignId!==campaign.campaignId)throw Error('Cette mise à jour appartient à une autre campagne. La carte actuelle est conservée.');
   if(data.revision===campaign.revision&&JSON.stringify(data)===JSON.stringify(campaign)){campaignMessage='Cette révision est déjà intégrée : aucun événement ajouté deux fois.';return true;}
   if(data.revision<=campaign.revision)throw Error('Révision ancienne ou contradictoire. La carte actuelle est conservée.');
   if(data.events.length<campaign.events.length||campaign.events.some((event,i)=>JSON.stringify(event)!==JSON.stringify(data.events[i])))throw Error('L’historique déjà intégré a changé. La carte actuelle est conservée.');
   for(const old of campaign.quests||[]){
    const next=data.quests.find(q=>q.id===old.id);
    if(!next)throw Error('Une mission déjà connue ne peut pas disparaître : conservez-la dans son statut actuel ou dans l’historique.');
    const transitions={possible:['possible','active','refused','abandoned','failed'],active:['active','completed','abandoned','failed']};
    if(!(transitions[old.status]||[old.status]).includes(next.status))throw Error('Transition de mission incohérente. Une mission clôturée reste dans l’historique.');
   }
   if(campaign.inventory){
    for(const old of campaign.inventory.items){
     const next=data.inventory.items.find(item=>item.id===old.id);
     if(!next||['kind','unit','openingQuantity','openingSource'].some(key=>next[key]!==old[key]))throw Error('Conservez les objets connus, leurs unités et leurs quantités initiales. Les changements de quantité passent par les mouvements.');
    }
    if(data.inventory.movements.length<campaign.inventory.movements.length||campaign.inventory.movements.some((movement,i)=>JSON.stringify(movement)!==JSON.stringify(data.inventory.movements[i])))throw Error('Un mouvement d’inventaire déjà intégré ne peut pas être supprimé, réordonné ou modifié.');
    if(data.inventory.items.some(item=>!campaign.inventory.items.some(old=>old.id===item.id)&&item.openingQuantity!==0))throw Error('Un nouvel objet commence à zéro ; consignez son acquisition dans les mouvements.');
   }
   if(campaign.characterState){
    const old=campaign.characterState.events,next=data.characterState.events;
    if(next.length<old.length||old.some((event,i)=>JSON.stringify(event)!==JSON.stringify(next[i])))throw Error('Conservez l’historique de l’état du personnage. Toute évolution ou récupération s’ajoute comme un nouveau fait confirmé.');
   }
  }
  const encoded=JSON.stringify(data);
  let previous;
  try{previous=window.localStorage.getItem(campaignKey);}catch{throw Error('Stockage du navigateur inaccessible. Aucune mise à jour intégrée ; gardez le JSON pour réessayer.');}
  try{window.localStorage.setItem(campaignKey,encoded);if(window.localStorage.getItem(campaignKey)!==encoded)throw Error('lecture');}
  catch{try{if(previous===null)window.localStorage.removeItem(campaignKey);else window.localStorage.setItem(campaignKey,previous);}catch{}throw Error('Enregistrement non vérifié. La carte affichée reste sur la dernière révision intégrée. Gardez votre mise à jour pour réessayer.');}
  campaign=data;campaignMessage=`Révision ${data.revision} intégrée et relue dans ce navigateur.`;return true;
 }catch(error){campaignMessage=error instanceof SyntaxError?'Le texte n’est pas un JSON valide. La carte actuelle est conservée.':error.message;return false;}
}
function campaignResume(data=campaign){
 if(!data)return '<p>Aucune partie importée. La carte attend les déplacements confirmés de votre session.</p>';
 const here=locations.find(p=>p.id===(data.events.at(-1)?.to||data.start));
 return `<p><b>${e(here.name)}</b> · ${e(data.moment)}</p><p><b>Objectif :</b> ${e(data.objective)}</p><p><b>Décision en attente :</b> ${e(data.pending)}</p>`;
}
function campaignTransferActions(){return `<div class="campaign-transfer-actions">${campaign?'<button class="gold-button" data-campaign-export>Exporter la progression</button>':''}<button class="text-link" data-campaign-import>Restaurer depuis un fichier</button></div>`;}
function campaignPanel(){return `<section class="travel-panel" aria-label="Carte de campagne"><h3>Votre dernière session</h3>${campaignResume()}<p>La carte évolue uniquement après une mise à jour publique des faits joués. Les boutons de voyage sont désactivés dans ce mode.</p><button class="gold-button" data-campaign-import>Mettre à jour après une partie</button>${campaignTransferActions()}<p class="save-status" role="status">${e(campaignMessage||'Aucune synchronisation automatique avec la conversation.')}</p></section>`;}
let importReadSequence=0,importBusy=false,exportObjectUrl=null;
function campaignImportDialog(){
 importReadSequence++;importBusy=false;
 show('Restaurer ou mettre à jour la campagne',`<div class="prose"><p>Choisissez un fichier de progression publique Clairval, ou collez la mise à jour fournie après votre session.</p><p>Le fichier sera lu et présenté avant son intégration. Le parcours libre reste séparé. Ne choisissez jamais une sauvegarde privée du MJ.</p></div><label for="campaign-file">Fichier de progression (.json)</label><input id="campaign-file" type="file" accept=".json,application/json"><div id="campaign-file-preview"></div><label for="campaign-json">Ou coller la mise à jour publique</label><textarea id="campaign-json" rows="10" spellcheck="false" placeholder="Collez ici le JSON public"></textarea><p id="campaign-import-status" role="status"></p><button class="gold-button" data-campaign-apply>Intégrer et reprendre</button>`);
}
function campaignExportPayload(){
 if(!campaign)throw Error('Aucune progression de campagne à exporter.');
 const data=validateCampaign(campaign),text=JSON.stringify(data);
 if(text.length>4000000)throw Error('La progression dépasse la taille acceptée pour une restauration.');
 const slug=data.campaignId.normalize('NFKD').replace(/[^a-zA-Z0-9_-]+/g,'-').replace(/^-+|-+$/g,'').slice(0,48)||'campagne';
 return {text,filename:`clairval-${slug}-r${data.revision}.json`};
}
function exportCampaign(){
 try{
  const payload=campaignExportPayload();
  if(exportObjectUrl)URL.revokeObjectURL(exportObjectUrl);
  exportObjectUrl=URL.createObjectURL(new Blob([payload.text],{type:'application/json;charset=utf-8'}));
  show('Exporter la progression',`<div class="prose"><p>Ce fichier contient la progression publique intégrée : carte, missions, inventaire et état du personnage selon le format enregistré. Le parcours libre et les secrets du MJ ne sont pas inclus.</p>${campaignResume()}<p>Enregistrez le fichier et vérifiez sa présence dans vos téléchargements.</p><p><a class="gold-button" href="${e(exportObjectUrl)}" download="${e(payload.filename)}">Télécharger ${e(payload.filename)}</a></p></div>`);
 }catch(error){show('Export indisponible',`<p>${e(error.message)}</p>`);}
}
async function readCampaignFile(file){
 if(!file)return;
 const token=++importReadSequence;
 const area=document.querySelector('#campaign-json'),status=document.querySelector('#campaign-import-status'),preview=document.querySelector('#campaign-file-preview'),button=document.querySelector('[data-campaign-apply]');
 if(!area||!status||!preview||!button)return;
 area.value='';preview.innerHTML='';status.textContent='Lecture du fichier…';button.disabled=true;importBusy=true;
 try{
  if(!Number.isSafeInteger(file.size)||file.size<0||file.size>16000000)throw Error('Fichier trop volumineux : choisissez un export public Clairval de moins de 16 Mo.');
  const raw=await file.text();
  if(token!==importReadSequence||!dialog.open)return;
  if(typeof raw!=='string'||raw.length>4000000)throw Error('Fichier trop volumineux pour une restauration.');
  const data=validateCampaign(JSON.parse(raw.replace(/^\uFEFF/,'')));
  area.value=JSON.stringify(data);
  preview.innerHTML=`<section class="info-card"><p class="eyebrow">Aperçu du fichier · aucune donnée encore remplacée</p><h3>${e(data.campaignId)} · Révision ${data.revision}</h3>${campaignResume(data)}<p>${data.events.length} déplacement(s) · ${data.quests?.length||0} mission(s) · ${data.inventory?.items.length||0} objet(s) et monnaie(s) · ${data.characterState?.events.length||0} fait(s) d’état.</p></section>`;
  status.textContent='Fichier lu. Vérifiez cet aperçu, puis choisissez « Intégrer et reprendre ».';
 }catch(error){
  if(token!==importReadSequence||!dialog.open)return;
  status.textContent=error instanceof SyntaxError?'Fichier JSON illisible. La progression actuelle est conservée.':error.message;
 }finally{if(token===importReadSequence){importBusy=false;button.disabled=false;}}
}

function campaignCharacterState(){
 const state=campaign?.characterState;
 if(!state)return '<section class="character-state"><h3>État du personnage</h3><p>Aucun état du personnage importé. Le format 4 permet de consigner blessures, fatigue et effets temporaires ; leur absence dans le carnet ne signifie pas que le personnage est rétabli.</p></section>';
 const conditions=characterConditions(state),active=conditions.filter(item=>!item.resolved),resolved=conditions.filter(item=>item.resolved);
 const groups=[['injury','Blessures'],['fatigue','Fatigue'],['effect','Effets temporaires']];
 const card=item=>`<article class="condition-card"><h4>${e(item.title)}</h4>${item.consequences.length?`<ul>${item.consequences.map(text=>`<li>${e(text)}</li>`).join('')}</ul>`:'<p>Aucune conséquence concrète précisée.</p>'}<p><b>Récupération connue :</b> ${e(item.recovery||'Aucune condition établie dans la partie.')}</p><details><summary>Dernier fait confirmé</summary><p>${e(item.source)}</p><small>${e(item.session)}</small></details></article>`;
 const history=state.events.slice(-30).reverse().map(event=>`<li><span class="tag">${{onset:'Apparition consignée',update:'Évolution confirmée',resolve:'État levé'}[event.action]}</span><strong>${e(event.title)}</strong><p>${e(event.source)}</p>${event.consequences.length?`<ul>${event.consequences.map(text=>`<li>${e(text)}</li>`).join('')}</ul>`:''}${event.recovery?`<p>Récupération connue à ce moment : ${e(event.recovery)}</p>`:''}<small>${e(event.session)}</small></li>`).join('');
 return `<section class="character-state" aria-labelledby="character-state-title"><h3 id="character-state-title">État du personnage</h3><p class="lead">Les conséquences actuelles des faits joués, sans jauge ajoutée.</p>${active.length?groups.map(([kind,label])=>{const list=active.filter(item=>item.kind===kind);return list.length?`<section><h4 class="condition-category">${label}</h4>${list.map(card).join('')}</section>`:'';}).join(''):'<p>Aucun état actif consigné. Cette liste ne constitue pas un bilan complet du personnage.</p>'}<details class="condition-history"><summary>Récupérations et effets levés (${resolved.length})</summary>${resolved.length?resolved.map(item=>`<article class="condition-card"><h4>${e(item.title)}</h4><p>${e(item.source)}</p><small>${e(item.session)}</small></article>`).join(''):'<p>Aucune récupération consignée.</p>'}</details><details class="condition-history"><summary>Journal des évolutions (${state.events.length})</summary>${history?`<ol class="inventory-history">${history}</ol>`:'<p>Aucun fait consigné.</p>'}${state.events.length>30?'<p>Les 30 derniers faits sont affichés ; le registre complet est conservé.</p>':''}</details><p class="save-status">Consulter le carnet, recharger la page ou s’absenter ne fait pas évoluer ces états.</p></section>`;
}

function campaignInventoryPage(){
 const inventory=campaign?.inventory;
 if(!inventory)return page('Vos possessions','Inventaire de campagne','Les objets et la monnaie réellement consignés pendant la partie.','<div class="info-card"><p>Aucun inventaire importé. Utilisez le format 3 pour ajouter les possessions connues sans modifier vos déplacements ou vos missions.</p></div><button class="gold-button" data-campaign-import>Mettre à jour après une partie</button>');
 const balances=inventoryBalances(inventory),labels={receive:'Reçu',use:'Consommé',give:'Remis',lose:'Perdu',spend:'Dépensé'};
 const quantity=item=>balances.get(item.id)===null?'Quantité inconnue':`${balances.get(item.id)} ${item.unit}`;
 const cards=inventory.items.map(item=>`<article class="inventory-card"><p class="eyebrow">${item.kind==='currency'?'Monnaie':'Objet'}</p><h3>${e(item.name)}</h3><p class="inventory-quantity">${e(quantity(item))}</p>${balances.get(item.id)===0?'<span class="tag">'+(item.kind==='currency'?'Solde nul':'Plus en possession')+'</span>':''}<p>${e(item.description||'Aucune description supplémentaire consignée.')}</p><details><summary>Origine du décompte</summary><p>${e(item.openingSource)}</p><p>Quantité initiale : ${item.openingQuantity===null?'inconnue':e(item.openingQuantity+' '+item.unit)}</p></details></article>`).join('');
 const history=inventory.movements.slice(-30).reverse().map(movement=>{const item=inventory.items.find(item=>item.id===movement.itemId);return `<li><p><span class="tag">${labels[movement.type]}</span> <strong>${e(item.name)}</strong> · ${e(movement.quantity+' '+item.unit)}${movement.counterparty?' · '+e(movement.counterparty):''}</p><p>${e(movement.summary)}</p><small>${e(movement.session)}</small></li>`;}).join('');
 return page('Vos possessions','Inventaire de campagne','Chaque quantité découle des acquisitions, consommations et transferts réellement joués.',`<div class="inventory-grid campaign-inventory">${cards||'<p class="empty">Aucun objet ni aucune monnaie consigné.</p>'}</div><section class="info-card"><h3>Derniers mouvements</h3>${history?`<ol class="inventory-history">${history}</ol>`:'<p>Aucun mouvement consigné.</p>'}${inventory.movements.length>30?'<p>Les 30 derniers mouvements sont affichés ; le registre complet reste conservé.</p>':''}</section><p class="save-status">Une quantité inconnue reste inconnue, même après un mouvement. Les différentes monnaies ne sont pas converties automatiquement.</p><button class="gold-button" data-campaign-import>Mettre à jour après une partie</button>`);
}

function campaignQuestPage(){
 const labels={possible:'Possibilité',active:'En cours',completed:'Accomplie',refused:'Refusée',abandoned:'Abandonnée',failed:'Échouée'};
 const groups=[['active','En cours'],['possible','Possibilités'],['history','Historique']];
 const all=campaign?.quests||[],list=all.filter(q=>campaignQuestTab==='history'?!['active','possible'].includes(q.status):q.status===campaignQuestTab);
 const field=(title,text)=>`<h4>${title}</h4><p>${e(text||'Non précisé dans la partie.')}</p>`;
 const bullets=(title,items)=>`<h4>${title}</h4>${items.length?`<ul>${items.map(item=>`<li>${e(item)}</li>`).join('')}</ul>`:'<p>Aucun élément consigné.</p>'}`;
 const cards=list.map(q=>`<details class="mission-card"><summary><span class="tag">${labels[q.status]}</span><strong>${e(q.title)}</strong></summary><div class="mission-body">${field('Origine connue',q.origin)}${field('Objectif',q.objective)}${field('Enjeu',q.stakes)}${bullets('Faits acquis',q.facts)}${bullets('Pistes connues',q.leads)}${field('Échéance connue',q.deadline)}${bullets('Engagements acceptés',q.commitments)}<h4>Personnages concernés</h4><p>${q.people.length?q.people.map(id=>`<span class="tag">${e(people.find(p=>p.id===id).name)}</span>`).join(''):'Aucun personnage consigné.'}</p><h4>Lieux découverts concernés</h4><p>${q.places.length?q.places.map(id=>`<button class="text-link" data-place="${e(id)}">${e(locations.find(p=>p.id===id).name)}</button>`).join(' · '):'Aucun lieu consigné.'}</p>${['active','possible'].includes(q.status)?field('Prochaine décision',q.nextDecision):field('Issue confirmée',q.outcome)}${bullets('Conséquences connues',q.consequences)}</div></details>`).join('');
 return page('Les fils de votre campagne','Missions confirmées','Les engagements et pistes réellement consignés pendant la partie.',`${!campaign||campaign.version<2?'<div class="info-card"><p>Aucune donnée de mission importée. Utilisez le format 2 ou 3 pour ajouter les missions connues sans modifier vos déplacements.</p></div>':''}<div class="tabs" aria-label="Filtrer les missions">${groups.map(([id,label])=>`<button data-campaign-tab="${id}" aria-pressed="${campaignQuestTab===id}">${label} (${all.filter(q=>id==='history'?!['active','possible'].includes(q.status):q.status===id).length})</button>`).join('')}</div>${cards||'<p class="empty">Aucune mission consignée dans cette catégorie.</p>'}<p><button class="gold-button" data-campaign-import>Mettre à jour après une partie</button></p>`);
}

mapMode=campaign?'campaign':'free';
const activeJourney=()=>mapMode==='campaign'?campaignJourney():journey;
const currentPlace=()=>activeJourney().at(-1);
const discovered=id=>activeJourney().includes(id);
let freeEncounters='',freeBesace='';
function persistJourney(){try{const raw=JSON.stringify({version:1,journey});window.localStorage.setItem(travelKey,raw);if(window.localStorage.getItem(travelKey)!==raw)throw Error('readback');storageMessage='';}catch{storageMessage='Enregistrement impossible : vos déplacements restent disponibles seulement dans cette page ouverte.';}}
function travelTo(id){if(mapMode!=='free')return;if(!adjacent(currentPlace(),id)||journey.length>=10000)return;journey.push(id);persistJourney();dialog.close();render();showLocation(id);}
function showLocation(id){
 const place=locations.find(x=>x.id===id);if(!place||!discovered(id))return;
 const locals=mapMode==='campaign'?people.filter(p=>campaign?.events.some(event=>event.to===id&&event.people.includes(p.id))):(id==='vaucombe'?people:[]);
 const observations=mapMode==='campaign'?(campaign?.events.filter(event=>event.to===id).map(event=>event.summary).join(' ')||'Point de départ de la projection publique. Aucune observation supplémentaire importée.'):(discoveries[id]||place.detail);
 show(place.name,`<p class="eyebrow" style="margin-top:17px">${currentPlace()===id?'Vous êtes ici':'Lieu découvert'}</p><div class="detail-hero">${art(place.art,place.name)}</div><div class="prose"><p>${mapMode==='free'?e(place.description):'Observations confirmées pendant la partie :'}</p><p>${e(observations)}</p></div><h3>Personnages rencontrés ici</h3>${locals.length?locals.map(p=>`<button class="text-link" data-person="${p.id}">${e(p.name)}</button>`).join(' · '):'<p>Aucune rencontre consignée dans ce parcours.</p>'}<span class="tag">${e(place.tag)}</span>`);
}
function showObject(id){if(mapMode==='campaign')return;const object=objects.find(x=>x.id===id);if(!object)return;show(object.name,`<div class="detail-hero">${art(object.art,'Ambiance de la besace et des objets de voyage')}</div><div class="prose"><p>${e(object.description)}</p></div><span class="tag">${e(object.amount)}</span><span class="tag">${e(object.place)}</span>`);}
function mapPage(){
 const journey=activeJourney();
 const here=locations.find(p=>p.id===currentPlace()),known=locations.filter(p=>discovered(p.id));
 const exits=locations.filter(p=>adjacent(here.id,p.id));
 const travelled=routes.filter(([a,b])=>journey.some((id,i)=>i>0&&((journey[i-1]===a&&id===b)||(journey[i-1]===b&&id===a))));
 const paths=travelled.map(([a,b])=>{const x=locations.find(p=>p.id===a),y=locations.find(p=>p.id===b);return `<line x1="${x.x}" y1="${x.y}" x2="${y.x}" y2="${y.y}"/>`;}).join('');
 const holes=known.map(p=>`<ellipse cx="${p.x}" cy="${p.y}" rx="12" ry="17" fill="black"/>`).join('');
 return `<section class="map-board parchment" aria-labelledby="map-title"><div class="map-heading"><h2 id="map-title">Les terres de Clairval</h2><span class="north" aria-hidden="true">N ↑</span></div><p class="exploration-label">${mapMode==='campaign'?'Carte de campagne · Faits joués importés':'Parcours libre · Démonstration indépendante de votre partie'}</p><div class="tabs" aria-label="Mode de la carte"><button data-map-mode="free" aria-pressed="${mapMode==='free'}">Parcours libre</button><button data-map-mode="campaign" aria-pressed="${mapMode==='campaign'}">Ma campagne</button></div><p class="exploration-label">${mapMode==='campaign'&&campaign?e(campaign.campaignId)+' · Révision '+campaign.revision:''}</p><div class="map-surface">${art('map','Carte peinte de Clairval')}<svg class="exploration-overlay" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><defs><mask id="discovery-mask"><rect width="100" height="100" fill="white"/>${holes}${travelled.map(([a,b])=>{const x=locations.find(p=>p.id===a),y=locations.find(p=>p.id===b);return `<line x1="${x.x}" y1="${x.y}" x2="${y.x}" y2="${y.y}" stroke="black" stroke-width="8"/>`;}).join('')}</mask></defs><rect width="100" height="100" fill="#534b3c" mask="url(#discovery-mask)"/><g class="travelled-paths">${paths}</g></svg>${known.map(p=>`<button class="map-pin ${here.id===p.id?'current-pin':''}" style="left:${p.x}%;top:${p.y}%" data-place="${p.id}" aria-label="${here.id===p.id?'Vous êtes ici : ':''}${e(p.name)}"><span>${e(p.short)}</span></button>`).join('')}</div><div class="map-note"><b>Pointillés : chemins parcourus · ${known.length}/7 lieux découverts</b><button data-info="carte">Comprendre la découverte</button></div>${mapMode==='campaign'?campaignPanel():`<section class="travel-panel" aria-label="Déplacements"><h3>Vous êtes à ${e(here.name)}</h3><p>Choisissez un chemin pour rejoindre le lieu suivant.</p><div class="travel-options">${exits.map(p=>`<button class="gold-button" data-travel="${p.id}">${e(discovered(p.id)?p.name:bearings[p.id])}${discovered(p.id)?'':' · À découvrir'}</button>`).join('')}</div><p class="save-status" role="status">${e(storageMessage||'Progression conservée dans ce navigateur après chaque déplacement.')}</p><button class="text-link" data-reset-travel>Recommencer le parcours</button></section>`}</section><section class="locations" aria-label="Lieux découverts">${known.map(p=>`<button class="location" data-place="${p.id}">${art(p.art,p.name)}<span class="location-copy"><strong>${e(p.name)}</strong><small>${here.id===p.id?'Votre position actuelle':'Déjà découvert'}</small></span></button>`).join('')}</section><section class="travel-log parchment"><h3>${mapMode==='campaign'?'Déplacements confirmés':'Chemins parcourus'}</h3><ol>${journey.slice(-20).map(id=>`<li>${e(locations.find(p=>p.id===id).name)}</li>`).join('')}</ol>${journey.length>20?'<p>Les 20 dernières étapes sont affichées.</p>':''}</section>`;
}
function page(title,kicker,lead,body){return `<section class="content-page parchment"><p class="eyebrow">${kicker}</p><h2>${title}</h2><p class="lead">${lead}</p>${body}</section>`;}
function carnetPage(){return page('Le fil de votre voyage','Carnet · Jour 12','Les chemins parcourus, les visages rencontrés et les promesses que l’on emporte.',`<div class="detail-hero">${art('village','Vaucombe au crépuscule')}</div><div class="prose"><h3>Au crépuscule, à Vaucombe</h3><p>Le pont de pierre résonne sous les derniers pas des marchands. Au-dessus du bourg, les tours du château se découpent sur le ciel. Vous avez gagné la place du marché avant la nuit.</p><p>Ysilde vous a accueilli à son échoppe. Garin a pris le temps d’écouter vos observations. Puis Perrin est arrivé, essoufflé, une lettre à la main.</p></div><div class="info-card"><p class="eyebrow">Votre prochaine étape</p><h3>Une lettre sans sceau</h3><p>${quests[0].description}</p><button class="text-link" data-page="quetes">Retrouver cette quête ›</button></div>`);}
function personCards(){const list=people.filter(p=>(p.name+' '+p.role).toLocaleLowerCase('fr').includes(personQuery.toLocaleLowerCase('fr')));return list.length?`<div class="character-grid">${list.map(p=>`<button class="character-tile" data-person="${p.id}">${art(p.id,p.name+', '+p.role)}<span><strong>${e(p.name)}</strong><small>${e(p.role)}</small><small>${e(p.bond)}</small></span></button>`).join('')}</div>`:'<p class="empty">Aucun personnage ne correspond à votre recherche.</p>';}
function peoplePage(){return page('Les visages de Clairval','Personnages','Ceux qui croisent votre route, et ce que vos rencontres ont laissé.',`<label for="people-search" class="eyebrow">Chercher un nom ou un rôle</label><input class="search" id="people-search" type="search" placeholder="Ysilde, capitaine, messager…" value="${e(personQuery)}"><div id="people-results">${personCards()}</div>`);}
function questPage(){const list=quests.filter(q=>q.status===currentQuestTab);return page('Les fils de l’aventure','Quêtes & pistes','Une histoire se construit aussi dans les engagements que l’on choisit.',`<div class="tabs" aria-label="Filtrer les quêtes">${[['active','En cours'],['possible','Pistes'],['done','Accomplies']].map(([id,label])=>`<button data-tab="${id}" aria-pressed="${currentQuestTab===id}">${label}</button>`).join('')}</div>${list.map(q=>`<article class="quest-detail">${art(q.art,q.title)}<div><p class="eyebrow">${q.label}</p><h3>${q.title}</h3><p>${q.description}</p><span class="tag">${q.source}</span><div class="info-card"><h3>Prochain pas</h3><p>${q.next}</p></div>${q.id==='letter'?'<button class="gold-button" style="margin-top:20px" data-resume>Reprendre l’aventure ›</button>':''}</div></article>`).join('')}`);}
function inventoryPage(){return page('Dans votre besace','Inventaire','Des objets modestes, quelques provisions et une histoire encore pliée dans son parchemin.',`<div class="inventory-grid">${objects.map(o=>`<button class="inventory-card" data-object="${o.id}"><div class="inventory-art">${art(o.id==='letter'?'letter':o.id,o.name)}</div><strong>${o.name}</strong><small>${o.amount} · ${o.place}</small></button>`).join('')}</div>`);}
function universePage(){return page('Un pays entre les rives et les brumes','Univers de Clairval','À chaque détour, un peu plus de ce monde devient le vôtre.',`<div class="detail-hero">${art('castle','Les hauteurs de Clairval')}</div><div class="prose"><h3>Le pays de l’Aronde</h3><p>Clairval est un pays de bourgs marchands, de chemins forestiers et de vieux domaines. L’Aronde relie ses terres habitées. Vaucombe en est l’un des passages les plus fréquentés.</p><h3>La vie sous les remparts</h3><p>Marchands, artisans et voyageurs se croisent sur la place du marché. Le guet surveille les portes ; les nouvelles arrivent par les messagers et les convois.</p><h3>Ce que la brume garde</h3><p>Le Bois des Brumes et les pierres anciennes nourrissent les récits. Votre carnet distingue les lieux découverts des lieux simplement évoqués. Les terres inconnues restent voilées.</p></div><div class="info-card"><p>Clairval est l’univers fictif de cette démonstration. Ses personnages et son histoire forment un exemple indépendant de la campagne précédente.</p></div>`);}
function render(){
 const current=hashPage();
 const pages={carte:mapPage,carnet:carnetPage,personnages:peoplePage,quetes:questPage,inventaire:inventoryPage,univers:universePage};
 if(mapMode==='campaign'&&current!=='carte'){
  if(current==='carnet')main.innerHTML=page('Reprendre la partie','Carnet de campagne','Votre dernière situation confirmée.',`<p class="save-status" role="status">${e(campaignMessage)}</p>`+campaignResume()+campaignTransferActions()+campaignCharacterState()+'<p><button class="gold-button" data-campaign-import>Mettre à jour après une partie</button></p>');
  else if(current==='quetes')main.innerHTML=campaignQuestPage();
  else if(current==='inventaire')main.innerHTML=campaignInventoryPage();
  else if(current==='personnages')main.innerHTML=page('Rencontres confirmées','Carnet de campagne','Personnages consignés dans vos déplacements.',people.filter(p=>campaignPeople().includes(p.id)).map(p=>`<p>${e(p.name)} · ${e(p.role)}</p>`).join('')||'<p>Aucune rencontre importée.</p>');
  else main.innerHTML=page('Rubrique en attente','Campagne','Cette rubrique n’est pas encore reliée aux mises à jour de session.','<p>Consultez la carte ou le carnet pour retrouver les faits confirmés.</p>');
 }else main.innerHTML=pages[current]();
 const encounters=document.querySelector('#encounters');
 if(mapMode==='campaign')encounters.innerHTML=`<h2 class="ribbon">Reprise de campagne</h2><section class="campaign-summary">${campaignResume()}<button class="gold-button" data-campaign-import>Mettre à jour</button></section>`;
 else if(freeEncounters)encounters.innerHTML=freeEncounters;
 document.querySelector('.day').textContent=mapMode==='campaign'?(campaign?.moment||'En attente de session'):'Jour 12 · Crépuscule';
 const besace=document.querySelector('#besace');
 besace.hidden=mapMode==='campaign'&&!campaign?.inventory;
 besace.innerHTML=mapMode==='campaign'?'<span class="besace-title">Vos possessions</span><button class="gold-button" data-page="inventaire">Consulter l’inventaire de campagne</button>':freeBesace;
 document.querySelectorAll('[data-nav]').forEach(button=>{if(button.dataset.nav===current)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');});
 document.title=menu.find(([id])=>id===current)[1]+' · Les Chroniques de Clairval';
}
function init(){
 document.querySelector('#scenery').innerHTML=art('village');
 document.querySelector('#navigation').innerHTML=menu.map(([id,label,key])=>`<button class="menu-tile" data-nav="${id}" data-page="${id}">${art(key)}<span class="menu-label">${label}</span></button>`).join('');
 document.querySelector('#encounters').innerHTML=`<h2 class="ribbon">Vos rencontres</h2>${people.map(p=>`<button class="person-card" data-person="${p.id}" aria-label="Consulter ${p.name}, ${p.role}">${art(p.id)}<span class="person-copy"><strong>${p.name}</strong><small>${p.role}</small></span></button>`).join('')}<section class="quest-preview"><span class="wax" aria-hidden="true">♜</span><h3>Une lettre sans sceau</h3><p>${quests[0].description}</p><button class="gold-button" data-resume>Reprendre l’aventure&nbsp; ›</button></section>`;
 freeEncounters=document.querySelector('#encounters').innerHTML;
 document.querySelector('#besace').innerHTML=`<span class="besace-title">Votre besace</span><div class="besace-items">${objects.map(o=>`<button class="besace-item" data-object="${o.id}" aria-label="Examiner ${o.name}"><span class="besace-icon">${art(o.id==='letter'?'scroll':o.id)}</span><span>${o.name}</span></button>`).join('')}</div>`;
 freeBesace=document.querySelector('#besace').innerHTML;
 render();
}
document.addEventListener('click',event=>{
 const b=event.target.closest('button,[data-page]');if(!b)return;
 if(b.dataset.page){const next=b.dataset.page;if(hashPage()===next)render();else location.hash=next;return;}
 if(b.dataset.person){showPerson(b.dataset.person);return;}
 if(b.dataset.campaignTab&&['active','possible','history'].includes(b.dataset.campaignTab)){campaignQuestTab=b.dataset.campaignTab;render();document.querySelector(`[data-campaign-tab="${campaignQuestTab}"]`).focus();return;}
 if(b.dataset.mapMode){mapMode=b.dataset.mapMode==='campaign'?'campaign':'free';location.hash='carte';dialog.close();render();return;}
 if(b.hasAttribute('data-campaign-import')){campaignImportDialog();return;}
 if(b.hasAttribute('data-campaign-export')){exportCampaign();return;}
 if(b.hasAttribute('data-campaign-apply')){if(importBusy)return;const raw=document.querySelector('#campaign-json').value;if(importCampaign(raw)){mapMode='campaign';dialog.close();location.hash='#carnet';render();}else document.querySelector('#campaign-import-status').textContent=campaignMessage;return;}
 if(mapMode==='campaign'&&b.hasAttribute('data-resume')){show('Reprendre la partie',campaignResume());return;}
 if(mapMode==='campaign'&&b.hasAttribute('data-confirm-reset'))return;
 if(b.dataset.travel){travelTo(b.dataset.travel);return;}
 if(b.hasAttribute('data-reset-travel')){show('Recommencer le parcours','<p>Revenir à Vaucombe et effacer les découvertes de cette démonstration ?</p><button class="gold-button" data-confirm-reset>Recommencer à Vaucombe</button><button class="text-link" data-close>Conserver mon parcours</button>');return;}
 if(b.hasAttribute('data-confirm-reset')){journey=['vaucombe'];persistJourney();dialog.close();render();return;}
 if(b.dataset.place){showLocation(b.dataset.place);return;}
 if(b.dataset.object){showObject(b.dataset.object);return;}
 if(b.dataset.tab){currentQuestTab=b.dataset.tab;render();document.querySelector(`[data-tab="${currentQuestTab}"]`).focus();return;}
 if(b.hasAttribute('data-close')){dialog.close();return;}
 if(b.hasAttribute('data-resume')){show('Une lettre sans sceau',`<div class="detail-hero">${art('letter','Une lettre scellée, illustration du chapitre')}</div><div class="prose"><p>Perrin vous a remis la lettre sur la place du marché. La suite se joue dans notre conversation.</p><p>Pour reprendre ce scénario de démonstration, écrivez :</p><div class="info-card"><p>On reprend Clairval, jour 12 au crépuscule. Perrin vient de me remettre la lettre sans sceau.</p></div><p style="margin-top:18px">Ce site vous permet de consulter le monde, les personnages et votre carnet. Il ne résout pas les scènes à votre place.</p></div>`);return;}
 if(b.dataset.info==='carte')show('La découverte de Clairval','<div class="prose"><p>Choisissez un chemin depuis votre position. Seuls les lieux atteints apparaissent sur la carte ; les pointillés conservent vos trajets. Les fiches rassemblent les observations et rencontres connues.</p><p>Ce parcours libre se conserve dans ce navigateur. Effacer ses données efface aussi cette progression. Il ne modifie pas votre campagne, ses quêtes ou son temps fictif.</p></div>');
 if(b.dataset.info==='site')show('Les Chroniques de Clairval','<div class="prose"><p>Exemple médiéval interactif construit autour de la direction visuelle validée : carte peinte, bois sombre, laiton et parchemin.</p><p>Personnages : Ysilde l’herboriste, Garin le capitaine du guet et Perrin le messager.</p><p>L’édition en ligne utilise une connexion Supabase. L’export autonome reste une démonstration publique hors ligne. Aucune donnée privée de campagne n’est incluse.</p></div>');
});
document.addEventListener('input',event=>{if(event.target.id==='people-search'){personQuery=event.target.value;document.querySelector('#people-results').innerHTML=personCards();}if(event.target.id==='campaign-json'){importReadSequence++;importBusy=false;document.querySelector('[data-campaign-apply]').disabled=false;document.querySelector('#campaign-file-preview').innerHTML='';document.querySelector('#campaign-import-status').textContent='Le texte modifié sera vérifié lors de l’intégration.';}});
document.addEventListener('change',event=>{if(event.target.id==='campaign-file')readCampaignFile(event.target.files?.[0]);});
dialog.addEventListener('close',()=>{importReadSequence++;importBusy=false;});
window.addEventListener('pagehide',()=>{importReadSequence++;importBusy=false;dialog.close();if(exportObjectUrl){URL.revokeObjectURL(exportObjectUrl);exportObjectUrl=null;}});
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
window.addEventListener('hashchange',()=>{render();main.focus({preventScroll:true});});
init();

if(window.CLAIRVAL_USER_ID){
 window.CLAIRVAL_PROGRESS={
  snapshot(){return JSON.parse(JSON.stringify({version:1,journey,campaign}));},
  validate(value){
   if(!value||value.version!==1||!Array.isArray(value.journey)||value.journey.length<1||value.journey.length>10000||value.journey[0]!=='vaucombe'||value.journey.some((id,i)=>!locations.some(p=>p.id===id)||(i>0&&!adjacent(value.journey[i-1],id))))throw Error('Sauvegarde invalide.');
   return {version:1,journey:[...value.journey],campaign:value.campaign===null?null:validateCampaign(value.campaign)};
  },
  apply(value){
   const next=this.validate(value);
   const writes=[[travelKey,JSON.stringify({version:1,journey:next.journey})],[campaignKey,next.campaign?JSON.stringify(next.campaign):null]];
   const previous=writes.map(([key])=>[key,window.localStorage.getItem(key)]);
   try{
    for(const [key,value] of writes){if(value===null)window.localStorage.removeItem(key);else window.localStorage.setItem(key,value);if(window.localStorage.getItem(key)!==value)throw Error('readback');}
   }catch(error){for(const [key,value] of previous){try{if(value===null)window.localStorage.removeItem(key);else window.localStorage.setItem(key,value);}catch{}}throw Error('Stockage local inaccessible. La progression affichée est conservée.');}
   journey=next.journey;campaign=next.campaign;mapMode=campaign?'campaign':'free';campaignMessage='Sauvegarde récupérée et vérifiée dans ce navigateur.';render();
  },
  legacy(){
   const raw=window.localStorage.getItem('clairval.exploration.v1'),saved=window.localStorage.getItem('clairval.campaign.v1');
   if(!raw&&!saved)return null;
   return this.validate({version:1,journey:raw?JSON.parse(raw).journey:['vaucombe'],campaign:saved?JSON.parse(saved):null});
  }
 };
}
