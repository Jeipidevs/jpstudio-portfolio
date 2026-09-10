# Calculadora de Aluguel Proporcional

Ferramenta web de **arquivo único** que calcula o valor proporcional do aluguel do primeiro mês, com base na data de entrada do inquilino e na data de pagamento. Uso imobiliário real (RE/MAX VIP I — Litoral Norte/RS): o valor resultante vai para o **contrato de locação**.

> ⚙️ **Zero dependência · offline · sem coleta de dados.** Um único `index.html` (HTML + CSS + JS inline), sem framework, sem build, sem chamada de rede. Abre instantâneo no celular do corretor em campo.

---

## ✨ Características

- **Arquivo único** (`index.html`) — HTML, CSS e JavaScript inline
- **Zero dependência** — sem framework, CDN, npm ou fonte externa (usa `system-ui`)
- **Funciona offline** e abre instantâneo no mobile
- **Privacidade total** — sem analytics, sem formulário, sem cookie, sem requisição de rede
- **Mobile-first** — tema escuro, `viewport-fit=cover`, `100dvh`, área de toque ≥ 44px
- **Copiar resumo** — botão que copia o cálculo formatado para colar no WhatsApp/contrato

---

## 🧮 Como funciona

**Entradas:** valor mensal do aluguel · data de entrada do inquilino · data do pagamento (vencimento) · base de cálculo da diária.

**Fórmula:**
```
diária = valor mensal ÷ base
dias   = data de pagamento − data de entrada   (entrada inclusive, pagamento exclusive)
total  = diária × dias
```

**Base de cálculo** (toggle):
| Modo | Base | Quando usar |
|---|---|---|
| **Dias do mês** (padrão) | dias reais do mês de entrada (28/29/30/31) | diária proporcional ao mês real |
| **Mês comercial** | 30 dias fixos | quando o contrato define mês comercial |

**Saída:** valor proporcional a pagar + detalhamento (dias ocupados, valor da diária, período, base de cálculo).

---

## 🚀 Uso

```bash
# Abrir direto (local, offline)
start index.html

# Servir em container Docker
docker build -t calculadora-proporcional .
docker run -p 8080:80 calculadora-proporcional   # http://localhost:8080
```

---

## 📁 Estrutura

```
calculadora-de-proporcional/
├─ index.html        # A ferramenta (HTML + CSS + JS inline)
├─ Dockerfile        # Publicação em container Nginx
├─ .gitignore
├─ CLAUDE.md         # Lei local do projeto (arquitetura, regras, tema)
├─ changelog.md      # Histórico — obrigatório em toda mudança de fórmula
└─ agents.md · context.md · rules.md · structure.md · handoff.md · mcp.md   # scaffold de docs
```

---

## ⚠️ Manutenção — regra crítica

A fórmula de proporcionalidade produz um valor que **vai para contrato de locação**. Qualquer alteração na regra de cálculo:

1. Exige **confirmação explícita** do dono antes de aplicar.
2. Deve ser registrada no [`changelog.md`](./changelog.md).
3. Precisa passar pelos **casos de borda**: entrada no dia 1, entrada no último dia do mês, meses de 28/29/30/31 dias, virada de ano, data de pagamento anterior à de entrada.

Restrições de arquitetura (detalhes em [`CLAUDE.md`](./CLAUDE.md)): **não** introduzir bundler, framework, CDN, dependência npm, fonte externa ou qualquer coleta de dado — o arquivo único offline é a arquitetura, não uma limitação.
