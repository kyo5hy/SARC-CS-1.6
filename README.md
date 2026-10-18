# SARC IFC Brusque 2026 — Landing page

Página 100% estática (HTML, CSS e JavaScript puro) para divulgar o torneio e levar o visitante ao formulário de inscrição. Sem backend, sem banco de dados, sem build, sem bibliotecas.

## 1. Abrir localmente
Dê dois cliques em `index.html`.

## 2. O que editar
**Tudo fica em `js/config.js`.** Não é preciso mexer nos outros arquivos.

| O que mudar | Variável |
|---|---|
| Nome, local, data, Instagram, contato | `EVENTO` |
| Contagem regressiva | `EVENTO.dataISO` (ex.: `"2026-11-15T09:00:00-03:00"`; vazio mostra "Em breve") |
| Link do formulário (Google Forms) | `URL_INSCRICAO` |
| Texto do objetivo | `OBJETIVO` |
| Premiação | `PREMIO` |
| **Campeão (coroa 3D)** | `CAMPEAO` — preencha `equipe` e os 3 `jogadores` ao fim do evento; fica na coroa para sempre |
| Etapas do evento | `ETAPAS` |
| Passos para se inscrever | `PASSOS` |
| Regras | `REGRAS` |

Mantenha as aspas e as vírgulas ao editar.

## 3. Publicar no GitHub Pages
1. Crie um repositório no GitHub e envie o conteúdo desta pasta (com `index.html` na raiz).
2. Vá em **Settings → Pages**.
3. Em **Source**, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`.
4. Aguarde alguns minutos e acesse o endereço mostrado.

Para atualizar qualquer informação: edite `js/config.js`, faça commit e aguarde a publicação.

## Observações
- As fontes vêm do Google Fonts. Sem internet, o navegador usa fontes de reserva e a página continua funcionando.
- O diorama 3D do deserto (construções de arenito, caixotes, sítios A e B), o céu, as dunas e a poeira são CSS, SVG e canvas puros, sem imagens nem assets da Valve. É uma cena original inspirada no estilo, não uma cópia de mapa.
- Com "reduzir movimento" ativado no sistema, as animações pesadas são desligadas.
