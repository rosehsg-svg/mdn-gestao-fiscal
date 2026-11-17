# Homologação da publicação estática — MDN Gestão Fiscal

## Decisão vigente
O repositório GitHub e a demonstração Render permanecem públicos **temporariamente por decisão da responsável**, até a conclusão dos testes. Nunca usar dados reais ou confidenciais na demonstração. Não excluir versões ou modificar o design aprovado.

## Risco identificado
O serviço estático Render `srv-dbtnpurl550s738q4300` foi consultado e informou `publishPath: "."` e `buildCommand: "echo 'Static site ready'"`. Essa configuração publica a raiz do repositório e pode expor arquivos internos, como `server.cjs`, testes e configurações. Não considerar a demonstração homologada enquanto esse risco não for eliminado.

## Correção preparada no código
- `npm run build:static` cria `dist/` com lista explícita: `index.html`, `styles.css`, `app.js`, `domain.js`, `assets/logo-mdn.png` e `robots.txt` quando presente.
- `tests/build-static.test.cjs` verifica o conteúdo exato e as referências do HTML.
- `tests/published.cjs` verifica, na URL publicada, que caminhos internos retornam 403 ou 404.

## Ação de configuração ainda pendente
No painel do serviço Render, ajustar **Build Command** para `npm run build:static` e **Publish Directory** para `dist`. Em seguida executar uma implantação e confirmar, por testes HTTP, que os arquivos internos não são servidos. Não considerar a proteção efetiva antes dessa verificação.

## Testes que faltam confirmar
- `npm test` completo, inclusive PostgreSQL de teste, testes de segurança HTTP e pacote estático.
- `npm run test:browser` em Chromium desktop, WebKit iPhone e Chromium Android.
- `node tests/private-browser.cjs` com banco de teste isolado.
- `npm run test:published` somente após corrigir a publicação do Render.

## Preservação
Não remover nem sobrescrever versões anteriores. Manter os nove módulos, a Visão Gerencial separada, o logotipo prateado e a paleta fria. A privacidade do GitHub será alterada somente após a homologação, conforme orientação expressa.
