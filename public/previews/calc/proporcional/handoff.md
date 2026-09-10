# handoff.md — Calculadora de Aluguel Proporcional

## Última Sessão
- **Data:** YYYY-MM-DD
- **Objetivo:**
- **Tipo de mudança:** [ fórmula | UI | acessibilidade | publicação ]

## Invariantes preservadas?
- [ ] Continua sendo **um único** `index.html`
- [ ] Nenhuma dependência externa adicionada (npm, CDN, fonte)
- [ ] Nenhuma chamada de rede, analytics ou cookie
- [ ] Abre e funciona **offline**

## Se a fórmula mudou
- Descrição da mudança:
- Confirmada com o usuário? [ sim | **não — bloqueante** ]
- Registrada no `changelog.md`? [ sim | pendente ]

### Casos de borda verificados
- [ ] Entrada no dia 1 → valor cheio
- [ ] Entrada no último dia do mês → 1 dia
- [ ] Fevereiro 28 dias · [ ] Fevereiro 29 dias
- [ ] Mês de 30 dias · [ ] Mês de 31 dias
- [ ] Pagamento anterior à entrada → erro tratado
- [ ] Virada de ano

## Publicação
- `docker build` + `run` local? [ ok | falha | n/a ]
- Publicado? [ não | sim — URL: ]

## Próximos passos
- [ ]

## Bloqueios
-
