# rules.md — Calculadora de Aluguel Proporcional

## 1. Arquitetura (invariantes)
- **Arquivo único.** Todo o HTML, CSS e JS ficam em `index.html`. Não criar `app.js`,
  `style.css` nem pasta `src/`.
- **Zero dependência externa.** Sem npm, sem CDN, sem Google Fonts, sem framework.
- **Zero rede.** Nenhum `fetch`, nenhum analytics, nenhum pixel, nenhum cookie.
- Se alguma dessas invariantes precisar mudar, **pare e confirme com o usuário** — muda a
  natureza do projeto.

## 2. Código
- JavaScript em funções pequenas e **puras**: `calcularProporcional(entrada, pagamento, valor)`
  recebe dados e devolve número, sem tocar no DOM. A manipulação de DOM fica separada.
- Nomes semânticos em português, coerentes com o domínio (`valorAluguel`, `diasOcupados`).
- **Datas sem armadilha de fuso.** Trabalhe com componentes de data locais; não use
  `new Date(string)` com formato ambíguo.
- **Cores só pelas custom properties** já definidas no `:root` (`--bg`, `--card`, `--accent`,
  `--success`…). Nenhum HEX literal novo.
- Validação de entrada explícita: campo vazio, data inválida, valor negativo e pagamento
  anterior à entrada precisam de mensagem clara — não de resultado silenciosamente errado.

## 3. Acessibilidade e mobile
- Mobile-first; área de toque mínima de 44px.
- `<label>` associado a cada campo; foco visível; contraste adequado no tema escuro.
- Teclado numérico nos campos de valor (`inputmode="decimal"`).

## 4. Teste obrigatório a cada alteração da fórmula
| Caso | Esperado |
|---|---|
| Entrada dia 1 | valor cheio |
| Entrada no último dia do mês | 1 dia |
| Fevereiro com 28 e com 29 dias | proporção correta |
| Meses de 30 e 31 dias | proporção correta |
| Pagamento anterior à entrada | erro tratado, não resultado |
| Virada de ano | cálculo correto |

## 5. Commits
```
fix(calculo): tratar fevereiro bissexto na proporcao
feat(ui): adicionar copia do resultado para a area de transferencia
chore(a11y): associar labels aos campos
```

## 6. Definition of done
Abre offline · casos de borda conferidos · nenhuma dependência nova · nenhuma chamada de
rede introduzida · alteração de fórmula registrada no `changelog.md`.
