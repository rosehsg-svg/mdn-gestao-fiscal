'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),M=require('../domain.cjs');
test('QA isolamento multiempresa e validações monetárias e de datas',()=>{
 let s=M.blank();
 const apply=(type,payload,companyId=s.companies[0]?.id)=>{s=M.apply(s,{type,payload,companyId},{role:'admin',name:'QA fictício'});return s};
 apply('company_create',{name:'Empresa A fictícia',regime:'A verificar'});const a=s.companies[0].id;
 apply('company_create',{name:'Empresa B fictícia',regime:'A verificar'});const b=s.companies[1].id;
 apply('party_create',{name:'Cliente A',kind:'customer'},a);
 apply('party_create',{name:'Cliente B',kind:'customer'},b);
 const partyA=s.parties[0].id;
 const reject=(type,payload,companyId)=>{const before=JSON.stringify(s);assert.throws(()=>M.apply(s,{type,payload,companyId},{role:'admin',name:'QA fictício'}));assert.equal(JSON.stringify(s),before,'Rejeição não pode modificar o estado')};
 reject('contract_create',{partyId:partyA,number:'B-1',description:'Teste',amount:'100',start:'2026-01-01',end:'2026-12-31'},b);
 apply('contract_create',{partyId:partyA,number:'A-1',description:'Teste',amount:'100',start:'2026-01-01',end:'2026-12-31'},a);
 const contractA=s.contracts[0].id;
 reject('amendment_create',{contractId:contractA,start:'2026-06-01',end:'2026-12-31',amount:'110',description:'Teste'},b);
 reject('contract_create',{partyId:partyA,number:'A-2',description:'Teste',amount:'100',start:'2026-12-31',end:'2026-01-01'},a);
 reject('invoice_create',{contractId:contractA,period:'2026-11',date:'2026-11-01',due:'2026-11-30',retention:'101'},a);
 reject('title_create',{kind:'receivable',partyId:partyA,description:'Teste',amount:'-1',date:'2026-11-01',due:'2026-11-30'},a);
 reject('title_create',{kind:'receivable',partyId:partyA,description:'Teste',amount:'1',date:'2026-11-30',due:'2026-11-01'},a);
 // Não permitir que um título da empresa A use a parte da empresa B.
 reject('title_create',{kind:'receivable',partyId:s.parties[1].id,description:'Cobrança inválida',amount:'10',date:'2026-11-01',due:'2026-11-30'},a);
 // A empresa B não pode faturar o contrato da empresa A.
 reject('invoice_create',{contractId:contractA,period:'2026-11',date:'2026-11-01',due:'2026-11-30',retention:'0'},b);
 // Datas inválidas e montantes monetários com precisão indevida não podem entrar.
 reject('title_create',{kind:'receivable',partyId:partyA,description:'Data impossível',amount:'1',date:'2026-02-30',due:'2026-11-30'},a);
 reject('title_create',{kind:'receivable',partyId:partyA,description:'Valor fracionado',amount:'1.234',date:'2026-11-01',due:'2026-11-30'},a);
 assert.equal(s.events.length,5);
});
