# agents.md — Subagentes para a Calculadora

## 1. Agente de Lógica de Cálculo  *(principal)*
- **Foco:** a função de proporcionalidade — dias ocupados, dias do mês, arredondamento
  monetário.
- **Saída:** função **pura**, sem DOM, acompanhada da tabela de casos de borda verificados.
- **Guardrails:** o resultado vai para contrato. Nenhuma mudança de fórmula sem confirmação
  do usuário e registro no `changelog.md`. Cuidado com fuso horário em datas.

## 2. Agente de UI Mobile
- **Foco:** usabilidade em campo — campos grandes, teclado numérico, feedback imediato,
  contraste no tema escuro.
- **Guardrails:** só as custom properties existentes; nenhuma fonte ou ícone externo.

## 3. Agente de Acessibilidade
- **Foco:** labels, foco visível, contraste, área de toque, leitura por leitor de tela.

## 4. Agente de Publicação
- **Foco:** `Dockerfile` e publicação como link compartilhável no EasyPanel.
- **Guardrails:** confirmar antes de publicar; a ferramenta continua sem coletar dado algum.

## Guardrail comum a todos
Este projeto vive de **não crescer**. Antes de adicionar biblioteca, arquivo ou chamada de
rede, a pergunta é: isso quebra "abre offline, instantâneo, sem coletar nada"? Se sim, não faça.
