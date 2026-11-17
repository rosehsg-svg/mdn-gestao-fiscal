'use strict';
// Verificação não destrutiva do ambiente de homologação. Não faz login nem grava dados.
const assert=require('node:assert/strict');
const target=process.env.HOMOLOGATION_URL||'https://mdn-gestao-fiscal-homologacao.onrender.com';
const allowed='https://mdn-gestao-fiscal-homologacao.onrender.com';
if(target!==allowed)throw new Error('Endereço de homologação não autorizado');
async function get(path){
 const response=await fetch(target+path,{signal:AbortSignal.timeout(90000),redirect:'error'});
 assert.equal(response.status,200,path+' deve responder HTTP 200');
 return {response,data:await response.json()};
}
(async()=>{
 const {response:healthResponse,data:health}=await get('/health');
 const {data:config}=await get('/api/config');
 assert.equal(health.ok,true);
 assert.equal(config.realDataAllowed,false,'Nunca liberar dados reais no ambiente de homologação');
 assert.equal(config.version,health.version);
 assert.equal(healthResponse.headers.get('x-content-type-options'),'nosniff');
 assert.equal(healthResponse.headers.get('x-frame-options'),'DENY');
 assert.ok(['demo-only','postgres'].includes(health.storage));
 assert.equal(config.privateAvailable,health.storage==='postgres');
 assert.equal(config.mode,health.storage==='postgres'?'homologacao':'demo');
 const forbidden=['/server.cjs','/domain.cjs','/package.json','/.env','/.git/config','/tests/api.test.cjs'];
 for(const route of forbidden){
  const response=await fetch(target+route,{signal:AbortSignal.timeout(90000),redirect:'manual'});
  assert.ok([403,404].includes(response.status),route+' está acessível: HTTP '+response.status);
 }
 console.log(JSON.stringify({server:'OK',database:health.storage==='postgres'?'CONECTADO':'NAO_CONECTADO',realDataAllowed:false,version:health.version,checked:forbidden.length}));
 if(health.storage!=='postgres')process.exitCode=2;
})().catch(error=>{console.error(error.stack);process.exitCode=1});
