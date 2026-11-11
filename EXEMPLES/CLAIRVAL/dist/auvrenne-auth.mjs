import {startAuth} from './auth-core.mjs?v=auvrenne-1';
import {mountCloud} from './cloud-sync.mjs?v=auvrenne-1';
import {createJournal} from './auvrenne-app.mjs?v=1';
try{
 const {createClient}=await import('https://esm.sh/@supabase/supabase-js@2.49.8');
 await startAuth({createClient,document,window,loadGame:async({client,user})=>{
  const progress=createJournal({document,window,user,storage:window.localStorage});
  await mountCloud({client,user,document,window,progress});
 }});
}catch{
 document.querySelector('#auth-status').textContent='Impossible de charger le carnet. Vérifie le réseau, puis recharge la page.';
}
