# CLAUDE.md — Calculadora de Aluguel Proporcional

## 1. O que é
Microferramenta web de **arquivo único**: calcula o valor proporcional de aluguel a partir
da data de entrada e da data de pagamento. Uso imobiliário (Litoral Norte/RS), sem backend,
sem dependência externa e sem coleta de dado.

## 2. Stack
`index.html` com HTML, CSS e JavaScript **inline**. Sem framework, sem build, sem
`node_modules`. Publicação por container Docker (`Dockerfile` na raiz).

Tema escuro definido em custom properties:
`--bg: #0f1117` · `--card: #181b25` · `--border: #2a2f40` · `--text: #eef0f6` ·
`--muted: #8b93a7` · `--accent: #4f7cff` · `--accent-2: #7c5cff` · `--success: #34d399` ·
`--radius: 16px`.

## 3. Comandos
```bash
# Local — basta abrir o arquivo
start index.html

# Container
docker build -t calculadora-proporcional . && docker run -p 8080:80 calculadora-proporcional
```

## 4. Regras específicas
- **Arquivo único é a arquitetura, não uma limitação.** Não introduza bundler, framework,
  CDN externo ou dependência npm. A ferramenta precisa funcionar offline e abrir instantâneo
  no celular do corretor.
- **Custom properties já existem no `:root`** — use-as. Nenhum HEX literal novo espalhado.
- **Zero coleta de dado.** Não adicione analytics, formulário, cookie ou chamada de rede.
  A calculadora não deve enviar nada para lugar nenhum.
- **A regra de cálculo é a regra do negócio.** Qualquer mudança na fórmula de proporcionalidade
  precisa ser confirmada com o usuário e documentada no `changelog.md` — o resultado vai para
  contrato de locação.
- **Mobile-first e touch-friendly:** uso real é no celular, em campo. Área de toque mínima
  de 44px, `viewport-fit=cover`, `100dvh`.
- **Sem dependência de fonte externa** — a stack usa `'Segoe UI', system-ui, -apple-system,
  sans-serif` justamente para não depender de rede.

## 5. Verificação obrigatória a cada alteração
Casos de borda do cálculo: entrada no dia 1, entrada no último dia do mês, mês de 28/29/30/31
dias, data de pagamento anterior à de entrada, virada de ano.
