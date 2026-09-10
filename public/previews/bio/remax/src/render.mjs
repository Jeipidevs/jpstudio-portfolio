export function render(template, data) {
  let out = template.replace(
    /\{\{#each (\w+)\}\}([\s\S]*?)\{\{\/each\}\}/g,
    (_match, key, block) => (data[key] || []).map((item) => render(block, item)).join("")
  );
  out = out.replace(/\{\{(\w+)\}\}/g, (_match, key) => (data[key] ?? ""));
  return out;
}
