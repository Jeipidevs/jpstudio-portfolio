import { test } from "node:test";
import assert from "node:assert/strict";
import { render } from "./render.mjs";

test("render substitui {{var}} simples", () => {
  const out = render("Olá, {{name}}!", { name: "Ana" });
  assert.equal(out, "Olá, Ana!");
});

test("render deixa string vazia quando a variável não existe", () => {
  const out = render("valor: [{{missing}}]", {});
  assert.equal(out, "valor: []");
});

test("render expande {{#each items}}...{{/each}} para uma lista", () => {
  const template = "<ul>{{#each items}}<li>{{label}}</li>{{/each}}</ul>";
  const out = render(template, { items: [{ label: "A" }, { label: "B" }] });
  assert.equal(out, "<ul><li>A</li><li>B</li></ul>");
});

test("render com lista vazia produz string vazia no bloco each", () => {
  const template = "<ul>{{#each items}}<li>{{label}}</li>{{/each}}</ul>";
  const out = render(template, { items: [] });
  assert.equal(out, "<ul></ul>");
});
