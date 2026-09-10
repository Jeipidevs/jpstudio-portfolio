# structure.md — Calculadora de Aluguel Proporcional

```text
calculadora-de-proporcional/
├── index.html      # ⭐ a aplicação inteira: HTML + CSS (:root com tokens) + JS inline
├── Dockerfile      # publicação como site estático
└── claude.md · readme.md · context.md · rules.md
    agents.md · structure.md · handoff.md · mcp.md · changelog.md
```

## Anatomia do `index.html`
```text
<head>
  meta viewport com viewport-fit=cover · theme-color · description
  <style> :root { --bg --card --card-2 --border --text --muted
                  --accent --accent-2 --success --radius }
          reset · layout · componentes </style>
<body>
  formulário (data de entrada · data de pagamento · valor do aluguel)
  área de resultado
  <script> calcularProporcional() — função pura
           handlers de DOM — camada separada </script>
```

## Regra de navegação
- **Não crie arquivos novos.** A ausência de estrutura é a arquitetura: um único artefato
  que abre offline e instantâneo.
- A única exceção é documentação `.md` e o `Dockerfile`.
