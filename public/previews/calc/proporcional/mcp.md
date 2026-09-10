# mcp.md — Calculadora de Aluguel Proporcional

## Servidores relevantes

| Servidor | Uso neste projeto |
|---|---|
| **Filesystem** | editar `index.html` |
| **Playwright / Chrome DevTools** | validar o cálculo na interface e o comportamento no viewport mobile |
| **easypanel-mcp** | publicar como link compartilhável (opcional) |
| **GitHub** | histórico do repositório |

## Diretrizes
- Este projeto **não fala com a rede**. Nenhuma ferramenta deve introduzir chamada externa
  no artefato final.
- A validação mais valiosa aqui é funcional: rodar os casos de borda na própria interface
  com Playwright, não inspecionar o código de novo.
- Confirme com o usuário antes de publicar — mesmo sendo uma ferramenta simples, o resultado
  é usado em contrato.
- Não instale nada. Se uma tarefa parecer exigir dependência, ela provavelmente não pertence
  a este projeto.
