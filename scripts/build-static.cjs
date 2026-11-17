'use strict';
// Gera uma pasta pública com lista explícita de arquivos permitidos.
// Não publica servidor, banco de dados, testes, histórico ou configurações.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),out=path.join(root,'dist');
const allowed=['index.html','styles.css','app.js','domain.js','robots.txt','assets/logo-mdn.png'];
fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
for(const rel of allowed){
 const src=path.join(root,rel);
 if(!fs.existsSync(src)){
  if(rel==='assets/logo-mdn.png')throw new Error('Logotipo aprovado ausente: '+rel);
  if(rel==='robots.txt')continue;
  throw new Error('Arquivo obrigatório ausente: '+rel);
 }
 const target=path.join(out,rel);fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(src,target);
}
const actual=[];
function walk(dir,prefix=''){for(const ent of fs.readdirSync(dir,{withFileTypes:true})){const rel=prefix+ent.name;if(ent.isDirectory())walk(path.join(dir,ent.name),rel+'/');else actual.push(rel)}}
walk(out);
for(const file of actual)if(!allowed.includes(file))throw new Error('Arquivo inesperado na publicação: '+file);
console.log('Pacote estático seguro gerado:',actual.join(', '));
