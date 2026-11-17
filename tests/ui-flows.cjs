'use strict';
const a=require('node:assert/strict');
async function runFlow(page,base){
const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());
await page.goto(base,{waitUntil:'networkidle',timeout:120000});await page.locator('.operating-grid .operating-module').first().waitFor();
a.deepEqual(await page.locator('.operating-grid .operating-copy strong').allTextContents(),['Empresas e Cadastros','Contratos e Aditivos','Faturamento','Financeiro','Fiscal e Tributário','Contabilidade','Auditoria e Relatórios','Documentos e Anexos','Configurações']);
a.equal(await page.locator('.operating-grid .management-tile').count(),0);a.equal(await page.locator('.management-separate .management-tile').count(),1);
const logo=await page.locator('.brand-logo').evaluate(el=>({src:el.src,width:el.naturalWidth,height:el.naturalHeight,fit:getComputedStyle(el).objectFit}));
a.match(logo.src,/logo-mdn|LOGO_FRAME_APROVADO/);a.ok(logo.width>500);a.ok(logo.width/logo.height>2);a.equal(logo.fit,'contain');
await page.locator('[data-demo="empty"]').click();await page.locator('.operating-grid [data-go="companies"]').click();
async function submit(type,data){
const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('mdn-demo-v6')).events.length),f=page.locator('form[data-command="'+type+'"]').last();
for(const[key,value]of Object.entries(data)){const el=f.locator('[name="'+key+'"]'),tag=await el.evaluate(e=>e.tagName.toLowerCase());if(tag==='select')await el.selectOption(value);else if(await el.getAttribute('type')==='checkbox')await el.setChecked(value);else await el.fill(value)}
await f.locator('button').click();await page.waitForFunction(n=>JSON.parse(localStorage.getItem('mdn-demo-v6')).events.length>n,before,{timeout:10000});a.match(await page.locator('#toast').textContent(),/Registro salvo/);a.equal(await page.locator('dialog').evaluate(d=>d.open),false);
}
await submit('company_create',{name:'Empresa Teste Fictícia',regime:'A verificar'});await submit('party_create',{name:'Cliente Teste Fictício',kind:'customer'});await submit('party_create',{name:'Fornecedor Teste Fictício',kind:'supplier'});
await page.locator('#periodChoice').fill('2026-11');await page.locator('#periodChoice').dispatchEvent('change');await page.locator('.subnav [data-go="contracts"]').click();
const partyId=await page.locator('[data-command="contract_create"] [name="partyId"] option').nth(1).getAttribute('value');
await submit('contract_create',{partyId,number:'UI-001',description:'Serviço fictício',amount:'100',start:'2026-01-01',end:'2026-12-31'});
await page.locator('[data-amend]').click();await submit('amendment_create',{start:'2026-11-01',end:'2026-12-31',amount:'120',description:'Reajuste teste'});
await page.locator('[data-invoice]').click();await submit('invoice_create',{period:'2026-11',date:'2026-11-05',due:'2026-11-30',retention:'12',reviewed:true});
await page.locator('.subnav [data-go="finance"]').click();await page.locator('[data-settle]').first().click();await submit('settlement_create',{amount:'40',date:'2026-11-10',reference:'UI-PIX-001'});
await page.locator('[data-reconcile]').click();await submit('settlement_reconcile',{evidence:'Linha do extrato fictício'});
await page.locator('[data-reverse]').click();await submit('settlement_reverse',{date:'2026-11-11',reason:'Correção teste'});
await page.locator('[data-settle]').first().click();await submit('settlement_create',{amount:'108',date:'2026-11-12',reference:'UI-PIX-002'});
const supplierId=await page.locator('[data-command="title_create"] [name="partyId"] option').last().getAttribute('value');
await submit('title_create',{kind:'payable',partyId:supplierId,description:'Despesa teste',amount:'20',date:'2026-11-01',due:'2026-11-15'});
await page.locator('[data-settle]').last().click();await submit('settlement_create',{amount:'20',date:'2026-11-13',reference:'UI-PIX-PAGAR'});
await page.reload({waitUntil:'networkidle'});await page.locator('.operating-grid [data-go="finance"]').click();a.ok((await page.locator('main').textContent()).includes('Liquidado'));
await page.locator('.subnav [data-go="home"]').click();await page.locator('.operating-grid [data-go="fiscal"]').click();await submit('certificate_create',{name:'Certidão fictícia UI',expires:'2026-11-25'});
await page.locator('.subnav [data-go="home"]').click();await page.locator('.operating-grid [data-go="documents"]').click();await submit('document_create',{name:'Documento fictício UI',category:'Contrato',date:'2026-11-16'});a.equal(await page.locator('input[type=file]').count(),0);
await page.locator('.mdn-bottom [data-go="accounting"]').click();await submit('entry_create',{date:'2026-11-01',description:'Capital inicial teste',debit:'1.1.01',credit:'3.1.01',amount:'10'});await submit('period_close',{period:'2026-11'});a.ok((await page.locator('main').textContent()).includes('Competência encerrada'));await submit('period_reopen',{period:'2026-11',reason:'Ajuste teste'});
await page.locator('.subnav [data-go="audit"]').click();const dp=page.waitForEvent('download');await page.locator('[data-export="journal"]').click();a.match((await dp).suggestedFilename(),/MDN_journal_2026-11.csv/);
await page.locator('.subnav [data-go="home"]').click();await page.locator('.management-separate [data-go="management"]').click();a.ok((await page.locator('main').textContent()).includes('Balanço patrimonial gerencial'));
const result=await page.evaluate(()=>{const s=JSON.parse(localStorage.getItem('mdn-demo-v6'));return{invoices:s.invoices.length,gross:s.invoices[0].gross,report:MDN.report(s,s.companies[0].id,'2026-11'),history:JSON.parse(localStorage.getItem('mdn-demo-v6-historico')).length}});
a.equal(result.invoices,1);a.equal(result.gross,12000);for(const key of ['receivable','payable','difference'])a.equal(result.report[key],0);a.equal(result.report.cashIn,10800);a.equal(result.report.cashOut,2000);a.ok(result.history>=15);
await page.locator('.mdn-bottom [data-go="settings"]').click();await page.locator('#roleChoice').selectOption('leitor');await page.locator('.subnav [data-go="companies"]').click();a.ok(await page.locator('[data-command="company_create"] button').isDisabled());
await page.locator('.subnav [data-go="home"]').click();for(const id of ['companies','contracts','invoices','finance','fiscal','accounting','audit','documents','settings']){await page.locator('.operating-grid [data-go="'+id+'"]').click();a.ok(await page.locator('h1').isVisible());a.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'Overflow em '+id);await page.locator('.subnav [data-go="home"]').click()}
a.deepEqual(errors,[]);return{modules:9,history:result.history,balanced:true,mobileOverflow:false,errors}
}
module.exports={runFlow};
