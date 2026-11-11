export async function startAuth({createClient, document, window, loadGame}) {
 const client=createClient('https://rtfcqbzqoledtteirzer.supabase.co','sb_publishable_C_pcI1fZTrWSHayZmFsImg_IlxOo7Qt');
 const panel=document.querySelector('#auth-panel'), app=document.querySelector('#clairval-app'), status=document.querySelector('#auth-status'), form=document.querySelector('#auth-form');
 let loaded=false, generation=0;
 const message=text=>{status.textContent=text;};
 function lock(){app.hidden=true;panel.hidden=false;document.querySelector('#detail')?.close();}
 async function verify(){
  const revision=++generation;
  lock(); message('Vérification de la connexion…');
  try {
   const {data,error}=await client.auth.getUser();
   if(revision!==generation)return;
   if(error||!data.user){message('Connectez-vous pour ouvrir votre carnet.');return;}
   if(!loaded){await loadGame();loaded=true;}
   if(revision!==generation)return;
   panel.hidden=true;app.hidden=false;
   document.querySelector('#account-email').textContent=data.user.email||'Compte connecté';
   message('');
  }catch{if(revision===generation){lock();message('Connexion indisponible. Vérifiez le réseau puis réessayez.');}}
 }
 function busy(value){form.querySelectorAll('button,input').forEach(el=>el.disabled=value);}
 form.addEventListener('submit',async event=>{
  event.preventDefault();busy(true);message('Connexion en cours…');
  try {
   const email=form.elements.email.value.trim(),password=form.elements.password.value;
   const signup=event.submitter?.value==='signup';
   const result=signup?await client.auth.signUp({email,password}):await client.auth.signInWithPassword({email,password});
   if(result.error){message(signup?'Inscription impossible. Vérifiez votre adresse et utilisez un mot de passe d’au moins 12 caractères.':'Connexion refusée. Vérifiez votre e-mail et votre mot de passe.');return;}
   form.elements.password.value='';
   if(signup&&!result.data.session){message('Vérifiez votre messagerie pour confirmer votre inscription, puis connectez-vous ici.');return;}
   await verify();
  }catch{message('Le service est inaccessible. Réessayez dans quelques instants.');}
  finally{busy(false);}
 });
 document.querySelector('#auth-retry').addEventListener('click',verify);
 document.querySelector('#auth-logout').addEventListener('click',async()=>{
  ++generation;lock();message('Déconnexion en cours…');
  try{
   const {error}=await client.auth.signOut({scope:'local'});
   if(error){message('Déconnexion impossible. Réessayez.');return;}
   window.location.reload();
  }catch{message('Déconnexion impossible. Vérifiez le réseau et réessayez.');}
 });
 client.auth.onAuthStateChange((event,session)=>{
  // Do not await another Auth call inside this callback.
  if(event==='SIGNED_OUT'||!session){++generation;lock();message('Connectez-vous pour ouvrir votre carnet.');}
  else window.setTimeout(verify,0);
 });
 window.addEventListener('hashchange',()=>{if(app.hidden)lock();});
 window.addEventListener('pageshow',()=>{if(loaded)verify();});
 await verify();
 return {verify};
}
