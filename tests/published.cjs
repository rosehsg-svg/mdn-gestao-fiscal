'use strict';
const{chromium,webkit,devices}=require('playwright'),{runFlow}=require('./ui-flows.cjs');
(async()=>{const base=process.env.PUBLIC_URL||'https://mdn-gestao-fiscal-demo.onrender.com';if(!/^https:\/\/mdn-gestao-fiscal(?:-demo|-app)?\.onrender\.com\/?$/.test(base))throw new Error('Use somente a demonstração autorizada');
for(let n=0;n<30;n++){try{const r=await fetch(base+'/app.js',{signal:AbortSignal.timeout(30000)});if(r.ok&&(await r.text()).includes('mdn-demo-v6'))break}catch{}if(n===29)throw new Error('Versão v6 ainda não publicada');await new Promise(r=>setTimeout(r,15000))}
// A publicação estática não deve disponibilizar código interno, testes ou metadados do repositório.
for(const sensitive of ['/server.cjs','/domain.cjs','/package.json','/package-lock.json','/tests/api.test.cjs','/.github/workflows/qa-completo.yml','/.git/config']){
 const response=await fetch(base+sensitive,{redirect:'manual',signal:AbortSignal.timeout(30000)});
 if(response.status!==404&&response.status!==403)throw new Error('EXPOSIÇÃO NA DEMONSTRAÇÃO: '+sensitive+' retornou HTTP '+response.status+'. Configure o Render para publicar somente arquivos de interface.');
}
for(const[name,type,device]of [['Publicação Desktop',chromium,{viewport:{width:1440,height:1000}}],['Publicação iPhone WebKit',webkit,devices['iPhone 13']],['Publicação Android',chromium,devices['Pixel 5']]]){const b=await type.launch({headless:true});try{const c=await b.newContext({...device,locale:'pt-BR',timezoneId:'America/Sao_Paulo'});console.log(JSON.stringify({name,url:base,...await runFlow(await c.newPage(),base)}));await c.close()}finally{await b.close()}}})().catch(e=>{console.error(e.stack);process.exitCode=1});
