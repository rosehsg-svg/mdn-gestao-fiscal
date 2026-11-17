# MDN Gestão Fiscal — continuidade V6
Referência de trabalho: 16/11/2026 (horário de Brasília).
Versão: 0.6.0. Base testada: 6937f427ada1e5b961798a47eac1eaf33c78e669.
CI aprovado: https://github.com/rosehsg-svg/mdn-gestao-fiscal/actions/runs/43984939575
O CONTINUIDADE_WORK_2026-11-16.md original foi preservado.

## Implementação
Frontend separado em index.html, styles.css, app.js e domain.js; domain.cjs contém as mesmas regras para o backend. Não permitir divergência (o teste compara os arquivos).
Logotipo original incorporado em assets/logo-mdn.png, sem alterações de imagem. Dimensões 1178x512; SHA256 no arquivo de proveniência.
Nove módulos na ordem aprovada e Visão Gerencial fora da grade. Preservar a paleta fria, cabeçalho e navegação móvel.
Fluxos: empresa -> parte -> contrato -> aditivo -> faturamento interno -> título -> baixa/estorno -> diário e relatórios.
Valores em centavos inteiros, retenções informadas, vínculos por empresa, bloqueio de duplicidade, controle de competência e auditoria.
A demo usa localStorage v6 com versões anteriores preservadas. A base v2 não foi alterada.
Fonte antiga preservada em historico/interface-v5-pre-backend-20261116.html, além de todos os arquivos e commits anteriores.

## Backend seguro implementado e testado, ainda não ativado na publicação estática
server.cjs: PostgreSQL, autenticação scrypt, sessões HttpOnly/Secure/SameSite=Strict, CSRF, origem, perfis, isolamento por workspace, revisão concorrente, versões de estado, arquivos privados com SHA256 e versões.
Configurar DATABASE_URL (TLS), APP_ORIGIN, NODE_ENV=production e BOOTSTRAP_TOKEN secreto para habilitar homologação privada. Sem credenciais padrão. Nenhum dado privado é salvo em localStorage.
O backend e os fluxos privados foram testados com PostgreSQL descartável no CI: login, bootstrap, leitor, uploads, downloads e recarga de sessão.
Sem banco configurado, /api/* bloqueia a área privada. realDataAllowed=false permanece explícito.

## Publicação
URL existente: https://mdn-gestao-fiscal-demo.onrender.com
Render estático: srv-dbtnpurl550s738q4300; workspace tea-dblqrmegekts73c5fqtg.
O workflow Testar publicação MDN verifica a URL efetivamente publicada em desktop, iPhone/WebKit e Android; consultar a execução após a implantação.
Não confundir CI de código com validação da publicação. Somente declarar publicada após Render live e teste da URL aprovado.

## HostGator e recursos
Usuária perguntou se há espaço na conta HostGator e se serve para o app. Não foi confirmado plano nem espaço livre: acesso autenticado gratuito ao painel não estava disponível.
Documentação oficial: compartilhado suporta PHP/MySQL, mas Node.js/PostgreSQL requer VPS/dedicado. Avaliar o plano já contratado antes de propor gastos ou adaptar backend. Não alterar WordPress/site institucional nem migrar sem necessidade.
PostgreSQL gratuito vazio de homologação criado no Render: dpg-dbtpilifngtc739rb2l0-a, região virginia, nome mdn-gestao-fiscal-homologacao. Não está conectado ao site estático.
Expira 17/12/2026 00:01 UTC (16/12/2026 21:01 Brasília). Sem dados reais. Não o tratar como armazenamento empresarial permanente.
Nenhum serviço pago contratado, nenhuma operação fiscal/financeira oficial executada.

## Pendências para dados reais
Ativar backend e banco durável na hospedagem escolhida; backups externos e restauração; revisão final de segurança e homologação.
Integrações oficiais NFS-e/e-CAC/bancos/certificado digital/certidões não implementadas. Não simular sucesso de emissão/transmissão.
Retenções não são apuração tributária automática. DRE/BP/Livro Caixa são gerenciais provisórios sobre registros do app; não certificá-los como contabilidade oficial.
Preservar todo o histórico. Não pedir capturas intermediárias nem redesenhar o layout aprovado.
