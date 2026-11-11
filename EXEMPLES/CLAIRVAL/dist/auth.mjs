import {startAuth} from './auth-core.mjs';
try {
 const {createClient}=await import('https://esm.sh/@supabase/supabase-js@2.49.8');
 await startAuth({createClient,document,window,loadGame:()=>new Promise((resolve,reject)=>{
  const script=document.createElement('script');script.src='clairval.js';script.onload=resolve;script.onerror=reject;document.body.append(script);
 })});
} catch {
 document.querySelector('#auth-status').textContent='Impossible de charger la connexion. Vérifiez votre accès Internet et rechargez la page.';
}
