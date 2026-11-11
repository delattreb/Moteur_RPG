import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const dist=path.join(root,'dist');
fs.copyFileSync(path.join(root,'clairval-index.html'),path.join(dist,'index.html'));
// L'export autonome reste une démonstration publique hors ligne, sans Auth.
const html=fs.readFileSync(path.join(root,'clairval-offline-index.html'),'utf8');
const css=fs.readFileSync(path.join(dist,'clairval.css'),'utf8');
const js=fs.readFileSync(path.join(dist,'clairval.js'),'utf8');
new vm.Script(js);
const encoded='data:image/webp;base64,'+fs.readFileSync(path.join(dist,'assets/medieval-art.webp')).toString('base64');
const output=html.replace('<link rel="stylesheet" href="clairval.css">','<style>'+css+'</style>').replace('<script src="clairval.js" defer></script>','').replace('</body>','<script>window.CLAIRVAL_ART='+JSON.stringify(encoded)+';\n'+js.replace(/<\/script/gi,'<\\/script')+'\n</script>\n</body>');
for(const m of output.matchAll(/<script>([\s\S]*?)<\/script>/g))new vm.Script(m[1]);
if(/<script src=|<link rel="stylesheet"/.test(output))throw Error('External resource remains');
fs.writeFileSync(path.join(root,'Clairval-site-medieval.html'),output);
console.log(JSON.stringify({file:'Clairval-site-medieval.html',bytes:Buffer.byteLength(output),embeddedImages:1,externalDependencies:0}));
