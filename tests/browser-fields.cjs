'use strict';
const {chromium,webkit,devices}=require('playwright');
const {createApp}=require('../server.cjs');
const assert=require('node:assert/strict');
async function check(page,base){
 const failures=[];page.on('pageerror',e=>failures.push(e.message));
 await page.goto(base,{waitUntil:'networkidle'});
 page.on('dialog',d=>d.accept());
 await page.locator('[data-demo="empty"]').click();
 await page.locator('.operating-grid [data-go="companies"]').click();
 const create=page.locator('form[data-command="company_create"]');
 assert.equal(await create.locator('[name="name"]').getAttribute('required'),'');
 assert.equal(await create.locator('[name="regime"]').getAttribute('required'),'');
 await create.locator('button').click();
 assert.equal(await create.locator('[name="name"]').evaluate(e=>e.validity.valueMissing),true);
 await create.locator('[name="name"]').fill('Empresa fictícia QA');
 await create.locator('[name="regime"]').selectOption('A verificar');
 await create.locator('button').click();
 await page.waitForFunction(()=>JSON.parse(localStorage.getItem('mdn-demo-v6')).companies.length===1);
 const p=page.locator('form[data-command="party_create"]');
 for(const [name,kind] of [['Cliente fictício QA','customer'],['Fornecedor fictício QA','supplier'],['Parceiro fictício QA','both']]){
  await p.locator('[name="name"]').fill(name);
  await p.locator('[name="kind"]').selectOption(kind);
  await p.locator('button').click();
  await page.waitForFunction(n=>JSON.parse(localStorage.getItem('mdn-demo-v6')).parties.length===n,kind==='customer'?1:kind==='supplier'?2:3);
 }
 await page.locator('.subnav [data-go="finance"]').click();
 const f=page.locator('form[data-command="title_create"]'),party=f.locator('[name="partyId"]');
 await f.locator('[name="kind"]').selectOption('payable');
 assert.equal(await party.locator('option').filter({hasText:'Cliente fictício QA'}).isDisabled(),true);
 assert.equal(await party.locator('option').filter({hasText:'Fornecedor fictício QA'}).isDisabled(),false);
 await f.locator('[name="kind"]').selectOption('receivable');
 assert.equal(await party.locator('option').filter({hasText:'Cliente fictício QA'}).isDisabled(),false);
 assert.equal(await party.locator('option').filter({hasText:'Fornecedor fictício QA'}).isDisabled(),true);
 await f.locator('[name="kind"]').selectOption('payable');
 await party.selectOption({label:'Fornecedor fictício QA'});
 await f.locator('[name="description"]').fill('Despesa fictícia QA');
 await f.locator('[name="amount"]').fill('12.34');
 await f.locator('[name="date"]').fill('2026-11-01');
 await f.locator('[name="due"]').fill('2026-11-30');
 await f.locator('button').click();
 await page.waitForFunction(()=>JSON.parse(localStorage.getItem('mdn-demo-v6')).titles.length===1);
 await page.reload({waitUntil:'networkidle'});
 const data=await page.evaluate(()=>JSON.parse(localStorage.getItem('mdn-demo-v6')));
 assert.equal(data.titles[0].cents,1234);
 assert.equal(data.titles[0].kind,'payable');
 assert.deepEqual(failures,[]);
 return {companies:data.companies.length,parties:data.parties.length,titles:data.titles.length,consoleErrors:failures};
}
(async()=>{
 const app=await createApp({databaseUrl:'',testing:true});
 await new Promise(r=>app.server.listen(0,'127.0.0.1',r));
 const base='http://127.0.0.1:'+app.server.address().port;
 try{
  for(const [name,browserType,device] of [['Desktop',chromium,{viewport:{width:1440,height:900}}],['iPhone',webkit,devices['iPhone 13']],['Android',chromium,devices['Pixel 5']]]){
   const browser=await browserType.launch({headless:true});
   try{const context=await browser.newContext({...device,locale:'pt-BR',timezoneId:'America/Sao_Paulo'});console.log(JSON.stringify({name,...await check(await context.newPage(),base)}));await context.close()}finally{await browser.close()}
  }
 }finally{await app.close()}
})().catch(e=>{console.error(e.stack);process.exitCode=1});
