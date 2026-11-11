import {startAuth} from './auth-core.mjs';
import {mountCloud} from './cloud-sync.mjs';
try {
 const {createClient}=await import('https://esm.sh/@supabase/supabase-js@2.49.8');
 await startAuth({createClient,document,window,loadGame:async({client,user})=>{
 window.CLAIRVAL_USER_ID=user.id;
 await new Promise((resolve,reject)=>{
  const script=document.createElement('script');script.src='clairval.js';script.onload=resolve;script.onerror=reject;document.body.append(script);
 });
 await mountCloud({client,user,document,window,progress:window.CLAIRVAL_PROGRESS});
 }});
} catch {
 document.querySelector('#auth-status').textContent='Impossible de charger la connexion. Vérifiez votre accès Internet et rechargez la page.';
}
