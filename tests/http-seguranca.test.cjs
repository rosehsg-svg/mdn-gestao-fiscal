'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),{createApp}=require('../server.cjs');
test('segurança HTTP em modo demonstração sem banco',async()=>{
 const app=await createApp({databaseUrl:'',testing:true});
 await new Promise(resolve=>app.server.listen(0,'127.0.0.1',resolve));
 const base='http://127.0.0.1:'+app.server.address().port;
 try{
  const home=await fetch(base+'/');
  assert.equal(home.status,200);
  assert.match(home.headers.get('content-type'),/text\/html/);
  assert.equal(home.headers.get('x-content-type-options'),'nosniff');
  assert.equal(home.headers.get('x-frame-options'),'DENY');
  assert.equal(home.headers.get('cache-control'),'no-store');
  const csp=home.headers.get('content-security-policy');
  for(const policy of ["default-src 'self'","object-src 'none'","frame-ancestors 'none'","base-uri 'none'"])assert.ok(csp.includes(policy),policy);
  const config=await(await fetch(base+'/api/config')).json();
  assert.equal(config.privateAvailable,false);
  assert.equal(config.realDataAllowed,false);
  assert.equal(config.mode,'demo');
  const health=await(await fetch(base+'/health')).json();
  assert.equal(health.storage,'demo-only');
  for(const path of ['/api/state','/api/backup','/api/files','/api/users']){
   assert.equal((await fetch(base+path)).status,503,path);
  }
  for(const path of ['/server.cjs','/domain.cjs','/.env','/package.json','/.git/config','/api/../server.cjs']){
   assert.equal((await fetch(base+path)).status,404,path);
  }
  const mutation=await fetch(base+'/api/command',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({})});
  assert.equal(mutation.status,503);
 }finally{await app.close()}
});
