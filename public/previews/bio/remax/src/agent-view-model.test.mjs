import { test } from "node:test";
import assert from "node:assert/strict";
import { initials, waLink, buildAgentViewModel } from "./agent-view-model.mjs";

test("initials pega a primeira letra do primeiro e do último nome", () => {
  assert.equal(initials("Érica Valim"), "EV");
  assert.equal(initials("Marco Kuchemann"), "MK");
  assert.equal(initials("Cher"), "C");
});

test("waLink monta a URL do wa.me com mensagem pré-preenchida", () => {
  const url = waLink("555195903672", "Érica Valim");
  assert.equal(
    url,
    "https://wa.me/555195903672?text=Ol%C3%A1%2C%20%C3%89rica%20Valim!%20Vim%20pela%20sua%20p%C3%A1gina%20e%20gostaria%20de%20falar%20sobre%20im%C3%B3veis."
  );
});

test("buildAgentViewModel gera campos derivados e omite links sem dado", () => {
  const agent = {
    slug: "erica-valim",
    name: "Érica Valim",
    role: "Corretora de Imóveis",
    location: "Capão da Canoa/RS",
    whatsapp: "555195903672",
    instagram: null,
    avatar: null,
    creci: null,
  };
  const vm = buildAgentViewModel(agent);

  assert.equal(vm.slug, "erica-valim");
  assert.equal(vm.name, "Érica Valim");
  assert.equal(vm.initials, "EV");
  assert.equal(vm.avatarStyle, "");
  assert.equal(vm.waLink, waLink("555195903672", "Érica Valim"));
  assert.deepEqual(vm.links, []);
  assert.equal(vm.creciLine, "RE/MAX VIP I");
});

test("buildAgentViewModel inclui link de Instagram quando presente", () => {
  const agent = {
    slug: "erica-valim",
    name: "Érica Valim",
    role: "Corretora de Imóveis",
    location: "Capão da Canoa/RS",
    whatsapp: "555195903672",
    instagram: "ericavalim.remax",
    avatar: "/assets/img/agents/erica-valim.jpg",
    creci: "12345",
  };
  const vm = buildAgentViewModel(agent);

  assert.deepEqual(vm.links, [
    { icon: "📷", label: "Instagram", url: "https://instagram.com/ericavalim.remax" },
  ]);
  assert.equal(vm.avatarStyle, 'style="background-image:url(/assets/img/agents/erica-valim.jpg)"');
  assert.equal(vm.creciLine, "CRECI 12345 · RE/MAX VIP I");
});
