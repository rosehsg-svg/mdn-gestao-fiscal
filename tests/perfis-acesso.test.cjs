'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),M=require('../domain.cjs');
test('permissões por perfil: administração, gestão, financeiro, contabilidade e leitura',()=>{
 const allowed={
  admin:['company_create','party_create','title_create','entry_create','period_close','document_create','user_create'],
  gestor:['company_create','party_create','title_create','document_create'],
  financeiro:['title_create','document_create'],
  contador:['entry_create','period_close','document_create'],
  leitor:[]
 };
 const actions=['company_create','party_create','title_create','entry_create','period_close','document_create','user_create'];
 for(const role of M.roles){
  for(const action of actions){
   assert.equal(M.can(role,action),allowed[role].includes(action),role+' / '+action);
  }
 }
 let state=M.blank();
 state=M.apply(state,{type:'company_create',payload:{name:'Empresa fictícia',regime:'A verificar'}},{role:'admin',name:'QA fictício'});
 const companyId=state.companies[0].id;
 for(const role of ['financeiro','contador','leitor']){
  const before=JSON.stringify(state);
  assert.throws(()=>M.apply(state,{type:'company_create',companyId,payload:{name:'Não permitido',regime:'A verificar'}},{role,name:'QA fictício'}),role);
  assert.equal(JSON.stringify(state),before,'Operação negada não deve alterar estado');
 }
});
