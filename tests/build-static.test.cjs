'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
test('pacote de publicação contém somente arquivos públicos aprovados',()=>{
 const root=path.resolve(__dirname,'..'),out=path.join(root,'dist');
 execFileSync(process.execPath,[path.join(root,'scripts/build-static.cjs')],{cwd:root,stdio:'pipe'});
 const expected=['app.js','assets/logo-mdn.png','domain.js','index.html','styles.css'];
 if(fs.existsSync(path.join(root,'robots.txt')))expected.push('robots.txt');
 const actual=[];
 function walk(dir,prefix=''){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const name=prefix+e.name;if(e.isDirectory())walk(path.join(dir,e.name),name+'/');else actual.push(name)}}
 walk(out);assert.deepEqual(actual.sort(),expected.sort());
 const html=fs.readFileSync(path.join(out,'index.html'),'utf8');
 for(const file of ['app.js','domain.js','styles.css','assets/logo-mdn.png'])assert.ok(html.includes('/'+file),'Referência ausente: '+file);
 for(const secret of ['server.cjs','package.json','package-lock.json','.env','.git','tests/','scripts/','.github/'])assert.equal(fs.existsSync(path.join(out,secret)),false,'Arquivo privado publicado: '+secret);
});
