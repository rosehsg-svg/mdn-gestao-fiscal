# MDN Gestão Fiscal — versão 0.6.0

Aplicativo de homologação. Demonstração pública: https://mdn-gestao-fiscal-demo.onrender.com

## Identidade preservada
Cabeçalho com logotipo original prateado, paleta fria, nove módulos na ordem aprovada, pendências contábeis e Visão Gerencial separada. O PNG original está versionado em assets/logo-mdn.png; origem, dimensões e SHA256 constam de assets/logo-provenance.json. Nenhum redesenho ou recoloração.

## Fluxos implementados
- Empresas, contratantes e fornecedores; edição e arquivamento protegido de cadastros.
- Contratos e aditivos por vigência, mantendo valores dos faturamentos anteriores.
- Faturamento interno com retenções informadas, título líquido a receber e partidas automáticas.
- Contas a pagar/receber, baixas parciais, estornos e conciliação manual com referência.
- Diário, balancete, Livro Caixa CSV, DRE e balanço gerenciais; fechamento e reabertura de competência.
- Documentos vinculados, certidões com prazos, auditoria e relatórios exportáveis.
- Filtros de empresa/competência, pesquisa nas tabelas e navegação móvel.

## Demonstração pública
Somente dados fictícios. Persistência local v6, sem sincronização entre aparelhos. Toda alteração preserva o estado anterior no histórico local; a capacidade depende do navegador. A base v2 anterior não é alterada.
Anexos privados e credenciais não são aceitos na demonstração. Nova base vazia e recarga de exemplos preservam o estado anterior.

## Backend privado implementado
Node.js 24 + PostgreSQL; TLS com validação de certificado; consultas parametrizadas e transações; controle de concorrência por revisão; histórico de estados anteriores.
Senhas scrypt com salt individual, cookies HttpOnly/Secure/SameSite=Strict, sessões de 8 horas, validação de origem/CSRF, limites de login e desativação de usuários.
Perfis: admin, gestor, financeiro, contador, leitor. Autorização no servidor e isolamento por workspace.
Anexos autenticados PDF/PNG/JPEG até 2 MB, verificação de assinatura, SHA256 e versões preservadas. Backup administrativo exporta estado, revisões e anexos, sem hashes de senha nem tokens.

A publicação estática existente não executa esse backend. Sem DATABASE_URL, a API bloqueia a área privada. Não existem usuários nem senhas padrão.

### Configuração de homologação privada
Configurar DATABASE_URL com TLS, APP_ORIGIN com a origem HTTPS exata, NODE_ENV=production e BOOTSTRAP_TOKEN como segredo de pelo menos 32 bytes aleatórios. Não inserir esses valores em arquivos públicos.
Gerar a chave de ativação com um gerador criptográfico; o administrador define sua própria senha no primeiro acesso protegido pela chave. A ativação inicial só pode ocorrer uma vez.
A configuração mantém realDataAllowed=false. Antes de qualquer dado real: definir hospedagem durável, backup externo e restauração, revisão de segurança e homologação.

## Testes
`npm ci --ignore-scripts`
`npm test`
`npx playwright install --with-deps chromium webkit`
`npm run test:browser`
`node tests/private-browser.cjs` (requer PostgreSQL de teste)
`npm run test:published` (apenas demonstração pública autorizada)

O CI cria PostgreSQL descartável. TEST_DATABASE_URL deve apontar exclusivamente para localhost/mdn_test; testes que limpam tabelas recusam outros destinos.
Jornadas de navegador: desktop Chromium, iPhone WebKit e Android Chromium. São simulações, não testes em aparelhos físicos.
Os resultados efetivos estão em GitHub Actions; o relatório de entrega registra a execução aprovada e a publicação verificada.

## Hospedagem e restrições
Nenhum serviço pago foi contratado. O PostgreSQL gratuito de homologação criado no Render é temporário e expira em 17/12/2026 às 00:01 UTC (16/12 às 21:01 de Brasília). Não há dados empresariais reais nele.
O plano e o espaço livre da conta HostGator ainda precisam de verificação autenticada. A documentação da HostGator indica PHP/MySQL em hospedagem compartilhada; Node.js/PostgreSQL requerem VPS/dedicado. Uma versão PHP/MySQL exigiria adaptação do backend e novos testes; o layout pode ser mantido.

## Pendências
NFS-e oficial, e-CAC, assinatura/certificado A1/A3, integrações bancárias, apuração tributária homologada, emissão oficial de certidões, backups externos automáticos e restauração operacional.
Retenções são informadas pelo usuário; os relatórios são provisórios e não constituem demonstrações contábeis oficiais.
Nenhuma declaração, nota oficial, guia, pagamento ou operação financeira externa é executada pelo app.

## Preservação
O arquivo CONTINUIDADE_WORK_2026-11-16.md original foi preservado. O HTML anterior foi copiado integralmente para historico/interface-v5-pre-backend-20261116.html. Todos os commits, rascunhos e arquivos históricos anteriores permanecem disponíveis. Não usar force push nem reescrever o histórico.
