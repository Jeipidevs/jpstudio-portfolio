import { test } from "node:test";
import assert from "node:assert/strict";
import { buildSite } from "./build.mjs";

const agents = [
  {
    slug: "erica-valim",
    name: "Érica Valim",
    role: "Corretora de Imóveis",
    location: "Capão da Canoa/RS",
    whatsapp: "555195903672",
    instagram: null,
    avatar: null,
    creci: null,
  },
];

const hubTemplate = "<h1>Nossa Equipe</h1>{{#each agents}}<a href=\"{{url}}\">{{name}} - {{initials}}</a>{{/each}}";
const agentTemplate = "<h1>{{name}}</h1><p>{{creciLine}}</p><a href=\"{{waLink}}\">WhatsApp</a>{{#each links}}<a href=\"{{url}}\">{{label}}</a>{{/each}}";

test("buildSite gera o HTML do hub com o link do subdomínio de cada corretor", () => {
  const { hubHtml } = buildSite(agents, hubTemplate, agentTemplate, "imobiliariavip.com");
  assert.ok(hubHtml.includes('href="https://erica-valim.imobiliariavip.com/"'));
  assert.ok(hubHtml.includes("Érica Valim - EV"));
});

test("buildSite gera uma página por corretor com slug e conteúdo corretos", () => {
  const { agentPages } = buildSite(agents, hubTemplate, agentTemplate, "imobiliariavip.com");
  assert.equal(agentPages.length, 1);
  assert.equal(agentPages[0].slug, "erica-valim");
  assert.ok(agentPages[0].html.includes("<h1>Érica Valim</h1>"));
  assert.ok(agentPages[0].html.includes("RE/MAX VIP I"));
});
