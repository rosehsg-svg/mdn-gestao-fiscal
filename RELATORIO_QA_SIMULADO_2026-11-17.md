# MDN Gestão Fiscal — relatório de testes simulados e correções
Data: 2026-11-16/17. Escopo: versão 0.6.0, exclusivamente dados fictícios.
## Testes executados
1. Execução das regras de domínio carregadas diretamente do GitHub em ambiente JavaScript isolado: 27 verificações de fluxo, com 27 aprovações e 0 falhas.
2. Matriz adicional: 20 operações, sendo 8 gravações aceitas e 12 rejeições esperadas, com 20/20 resultados conformes. Rejeições não modificaram o estado.
3. Regressão automatizada adicionada ao repositório em tests/qa-fields.test.cjs: 2 casos agregados (fluxo completo de 22 eventos + rejeições de 12 cenários), executados no ambiente JavaScript isolado: 2/2 aprovados. Inclusão no script npm test.
## Campos e módulos exercitados
- Empresa: razão social, regime tributário e edição.
- Partes: nome, natureza contratante/fornecedor/ambos, contato e edição/arquivamento.
- Contratos: contratante, número, objeto, valor, datas de início/fim.
- Aditivos: contrato, datas, novo valor e justificativa.
- Faturamento: contrato, competência, data, vencimento, retenção, revisão e vínculo automático ao título.
- Financeiro: natureza, parte, descrição, valor, origem, vencimento; baixas, referência, conciliação por evidência, estorno com motivo.
- Contabilidade: data, descrição, conta débito, conta crédito, valor, partidas equilibradas, fechamento/reabertura com motivo.
- Documentos: nome, categoria, data e vínculo.
- Certidões: nome, validade e referência.
- Auditoria: histórico de eventos, permissões, duplicidades e isolamento de estado em rejeições.
## Resultados numéricos do cenário completo
- Faturamento bruto: R$ 1.200,00; retenção: R$ 120,00; líquido: R$ 1.080,00.
- Recebimento líquido: R$ 1.080,00; pagamento de despesa: R$ 50,00.
- Saldo dos títulos: R$ 0,00; diferença do balancete: R$ 0,00.
- 22 eventos de auditoria.
## Correção realizada
- app.js: no formulário de títulos, filtrar partes conforme a natureza (contas a pagar não deve selecionar apenas contratante; contas a receber não deve selecionar apenas fornecedor). A validação do domínio já impedia a gravação inválida, mas a interface permitia escolhas incompatíveis.
- package.json: npm test inclui os novos testes de regressão.
## Limites e pendências
- A execução aqui validou regras e dados simulados em JavaScript isolado. NÃO equivale a executar Playwright real, PostgreSQL, testes HTTP autenticados, upload de anexos ou navegação Safari/iPhone.
- Não foi possível realizar automação de navegador por indisponibilidade de créditos do conector externo. Não afirmar homologação ponta a ponta.
- Testes de backend privado e persistência PostgreSQL dependem de infraestrutura de teste e CI; ainda precisam ser executados e registrados.
- A demonstração pública não deve receber dados reais. Nenhuma operação fiscal/financeira oficial foi executada.
## Arquivos alterados
app.js; tests/qa-fields.test.cjs; package.json; este relatório.
