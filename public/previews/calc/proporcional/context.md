# context.md — Calculadora de Aluguel Proporcional

## 1. Domínio
Locação imobiliária. Quando um inquilino entra no imóvel em um dia que não é o primeiro do
mês, o primeiro aluguel é **proporcional aos dias efetivamente ocupados**. Esse cálculo é
feito manualmente por corretores e administradores — com margem de erro e de discussão.

A ferramenta padroniza a conta: mesma entrada, mesmo resultado, para as duas partes.

## 2. Quem usa
Corretor ou administrador de locação, **no celular, em campo**, geralmente na frente do
cliente. Daí as decisões de projeto: arquivo único, zero dependência de rede, abertura
instantânea, tema escuro e área de toque grande.

## 3. Regras de negócio
- **Entradas:** data de entrada no imóvel, data de pagamento e valor do aluguel cheio.
- **Saída:** valor proporcional devido no primeiro período.
- **O resultado é usado em contrato.** Precisão e reprodutibilidade importam mais do que
  qualquer refinamento visual.
- **Casos de borda que precisam estar corretos:** meses de 28, 29, 30 e 31 dias; entrada no
  dia 1; entrada no último dia; data de pagamento anterior à entrada; virada de ano.

## 4. Decisões de arquitetura (e o porquê)
| Decisão | Motivo |
|---|---|
| Arquivo único, sem build | abre offline, sem servidor, sem instalação |
| Sem CDN e sem fonte externa | funciona sem internet e sem latência |
| Sem analytics ou formulário | a ferramenta não coleta nem transmite dado nenhum |
| Tema escuro com custom properties | legibilidade em campo e manutenção centralizada |
| Docker + nginx | permite publicar como link compartilhável quando necessário |

## 5. Integrações
**Nenhuma, por decisão.** Se surgir necessidade de integração (ex.: puxar o valor do aluguel
de um CRM), isso muda a natureza do projeto e deve ser discutido antes — provavelmente vira
um módulo dentro do CRM, não uma alteração aqui.
