# MDN Gestão Fiscal — continuidade no ChatGPT Work
Data de referência: 16/11/2026.
## Identificação
Repositório: https://github.com/rosehsg-svg/mdn-gestao-fiscal
Demo: https://mdn-gestao-fiscal-demo.onrender.com
Render service: srv-dbtnpurl550s738q4300; workspace tea-dblqrmegekts73c5fqtg
Commit publicado e confirmado LIVE: aa386bc0a8725e6cfcfbc6ed7a6e9922a736e6d3
Arquivo principal: index.html (~60 KB).
## Diretrizes aprovadas
- App empresarial/contábil, não apresentação ou landing page. Visual clean, paleta fria (azul-acinzentado/prata/branco) com vermelho MDN discreto.
- Referência visual aprovada pela usuária: cabeçalho com logotipo oficial MDN prateado com ECG vermelho sobre branco, nome MDN Gestão Fiscal, seleção empresa/competência, pendências contábeis e grade compacta de 9 módulos; Visão Gerencial separada; navegação inferior em celular.
- NÃO usar o logo quadrado vinho atualmente exibido. Localizar o PNG prateado original no site mdnservicosmedicos.com ou no acervo do projeto e verificar antes de substituir. Preservar proporções.
- Módulos: 01 Empresas e Cadastros; 02 Contratos e Aditivos; 03 Faturamento; 04 Financeiro; 05 Fiscal e Tributário; 06 Contabilidade; 07 Auditoria e Relatórios; 08 Documentos e Anexos; 09 Configurações. Visão Gerencial secundária.
- Prioridade absoluta: funções internas realmente utilizáveis e testadas, não mais telas de fachada. Não solicitar prints frequentes; mostrar somente após estar minimamente operacional e com layout aprovado.
## Situação real
- Última publicação LIVE verificada, porém NÃO houve teste ponta a ponta em navegador: TinyFish indisponível por saldo insuficiente. Não afirmar que está homologado.
- Estado persistido via localStorage do navegador para testes, sem backend, sem autenticação, sem sincronização entre dispositivos e sem armazenamento empresarial seguro.
- Formulários de demonstração: empresas, fornecedores, contratantes, contratos, previsões de notas, contas a pagar/receber, movimentos simplificados, certidões; baixa de títulos; histórico de ações; exclusão de empresa/fornecedor fictícios. A implementação precisa de testes reais.
- Não há NFS-e oficial, e-CAC, certificado digital, conciliação bancária, partidas dobradas, DRE/BP oficiais, Livro Caixa fiscal completo, uploads privados, controle de acesso, nem integração real. Não prometer.
- Demo pública: usar exclusivamente dados fictícios, nunca dados fiscais reais, extratos, contratos sigilosos, senhas ou certificados.
- Priorizar implementação de base de dados privada, autenticação e controles de acesso antes de importar documentos reais; versionamento, logs e backup.
## Próximos passos
1. Testar HTML e JavaScript, navegação em Safari/iPhone, persistência após recarga, CRUD de empresa/fornecedor/cliente/contrato, títulos, notas, auditoria e estados vazios; corrigir erros.
2. Corrigir logo original prateado e refinar cabeçalho sem mudar desenho aprovado; preservar histórico do layout.
3. Construir fluxos conectados: empresa -> contratante/fornecedor -> contrato/aditivo -> previsão de nota -> contas a receber/pagar -> lançamentos -> conciliação -> relatórios; validações, filtros, edição, exclusão e rastreabilidade.
4. Migrar de protótipo estático para app com backend seguro, banco, login, permissões, backups e homologação, antes de trabalhar com dados reais.
5. Testar versão PUBLICADA, não só commit; Render auto-deploy tem falhado: pode exigir trigger_deploy e get_deploy status live.
6. Não transmitir declarações, emitir NFS-e real, alterar regime tributário, pagar guias ou executar ações financeiras sem autorização expressa.
## Preservação
O repositório tem versões anteriores em historico/; nunca sobrescrever versões aprovadas sem backup. Este documento é a passagem de contexto para Work. A usuária deseja o projeto salvo e retomável, sem reconstrução.
