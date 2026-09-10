import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { buildAgentViewModel } from "../src/agent-view-model.mjs";
import { render } from "../src/render.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DOMAIN = "imobiliariavip.com";

export function buildSite(agents, hubTemplate, agentTemplate, domain) {
  const hubAgents = agents.map((agent) => {
    const vm = buildAgentViewModel(agent);
    return { ...vm, url: `https://${vm.slug}.${domain}/` };
  });

  const hubHtml = render(hubTemplate, { agents: hubAgents });

  const agentPages = agents.map((agent) => {
    const vm = buildAgentViewModel(agent);
    return { slug: vm.slug, html: render(agentTemplate, vm) };
  });

  return { hubHtml, agentPages };
}

function main() {
  const agents = JSON.parse(readFileSync(join(ROOT, "data/equipe.json"), "utf-8"));
  const hubTemplate = readFileSync(join(ROOT, "templates/hub.html"), "utf-8");
  const agentTemplate = readFileSync(join(ROOT, "templates/agent.html"), "utf-8");

  const { hubHtml, agentPages } = buildSite(agents, hubTemplate, agentTemplate, DOMAIN);

  const distDir = join(ROOT, "dist");
  if (!existsSync(distDir)) mkdirSync(distDir, { recursive: true });
  writeFileSync(join(distDir, "index.html"), hubHtml);

  for (const page of agentPages) {
    const pageDir = join(distDir, page.slug);
    if (!existsSync(pageDir)) mkdirSync(pageDir, { recursive: true });
    writeFileSync(join(pageDir, "index.html"), page.html);
  }

  console.log(`Build ok: 1 hub + ${agentPages.length} página(s) de corretor em dist/`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
