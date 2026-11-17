# MDN Gestão Fiscal — implantação funcional de homologação com custo mínimo

**Status:** plano técnico preparado; ambiente privado com PostgreSQL ainda NÃO criado ou homologado. Não contratar serviços, cadastrar dados reais ou transmitir operações fiscais.

## Arquitetura escolhida
- Reutilizar o repositório GitHub `rosehsg-svg/mdn-gestao-fiscal`, preservando todas as versões.
- Manter a demonstração estática existente separada do ambiente de homologação.
- Criar futuramente **outro** Render Web Service Node.js, plano gratuito se disponível, com `npm ci --ignore-scripts` e `npm start`, branch `main`, `NODE_ENV=production`. **Não criar antes da autorização expressa.**
- Conectar um PostgreSQL de testes independente, como Neon Free, respeitando as cotas e confirmando os termos atuais antes de cadastrar o banco.
- Definir `DATABASE_URL` apenas no painel privado do Render, jamais em commits, mensagens, prints ou demonstrações.
- Definir `APP_ORIGIN` exatamente como a origem HTTPS do novo Web Service, sem barra final.
- Definir `BOOTSTRAP_TOKEN` como segredo forte, exclusivo e temporário para ativação inicial; remover do ambiente após criar o administrador de testes.
- O servidor requer TLS para conexão PostgreSQL fora de `testing:true` e usa `ssl:{rejectUnauthorized:true}`. Verificar compatibilidade de certificados do provedor antes de ativar.
- Usar usuários e dados exclusivamente fictícios; nenhum documento da MDN real neste ambiente.

## Testes de aceite antes de qualquer uso real
1. `GET /health` precisa indicar `storage:postgres`; `GET /api/config` precisa indicar `privateAvailable:true`, `mode:homologacao` e `realDataAllowed:false`.
2. Cadastro inicial fictício; login, logout, sessão, expiração, CSRF e permissões por papel.
3. Criar e alterar empresas fictícias, contratos, títulos, baixas, documentos, lançamentos, fechamento e reabertura conforme as regras.
4. Reiniciar o Web Service e confirmar que os registros continuam no banco.
5. Confirmar isolamento entre empresas e perfis, logs de auditoria, versões e backup de teste.
6. Testar em Chromium desktop, WebKit iPhone e Chromium Android, inclusive campos e navegação dos nove módulos.
7. Testar arquivos fictícios, limite de tamanho, bloqueio de acesso sem sessão e recuperação após reinício.
8. Conferir que nenhum endpoint público fornece `server.cjs`, `domain.cjs`, `package.json`, arquivos de teste ou segredos.
9. Não usar dados reais até que segurança, backup, retenção, LGPD e homologação sejam aprovados.

## Custos e limites
Meta inicial: **R$ 0 de assinatura**, condicionada à disponibilidade e cotas dos planos gratuitos de Render e PostgreSQL. Não há garantia de disponibilidade contínua, desempenho, backup gerenciado ou adequação para produção fiscal. Banco e servidor podem suspender por inatividade, limites de consumo ou alterações dos planos. Não pressupor custo zero sem confirmar as ofertas no momento da criação.

## Limites da implantação atual
A publicação existente no Render é um **static site** e não executa `server.cjs`. Não confundir com o Web Service funcional a criar. A configuração estática atual ainda requer trocar a publicação da raiz por `dist`, com `npm run build:static`, antes de considerar sua superfície pública protegida.

## Decisões preservadas
- Logotipo prateado MDN e paleta fria; nove módulos na ordem aprovada; Visão Gerencial separada das pendências contábeis.
- Nenhuma mudança de visibilidade GitHub ou exclusão do Render até a conclusão dos testes, conforme orientação da responsável.
- Nenhuma contratação, serviço pago, operação fiscal oficial ou dado confidencial sem autorização.
