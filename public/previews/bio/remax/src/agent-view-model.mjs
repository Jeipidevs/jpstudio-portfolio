export function initials(name) {
  const parts = name.trim().split(/\s+/);
  const getInitial = (str) => str[0].toUpperCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  if (parts.length === 1) return getInitial(parts[0]);
  return getInitial(parts[0]) + getInitial(parts[parts.length - 1]);
}

export function waLink(whatsapp, name) {
  const message = `Olá, ${name}! Vim pela sua página e gostaria de falar sobre imóveis.`;
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
}

export function buildAgentViewModel(agent) {
  const links = [];
  if (agent.instagram) {
    links.push({
      icon: "📷",
      label: "Instagram",
      url: `https://instagram.com/${agent.instagram}`,
    });
  }

  return {
    slug: agent.slug,
    name: agent.name,
    role: agent.role,
    location: agent.location,
    initials: initials(agent.name),
    avatarStyle: agent.avatar ? `style="background-image:url(${agent.avatar})"` : "",
    waLink: waLink(agent.whatsapp, agent.name),
    links,
    creciLine: agent.creci ? `CRECI ${agent.creci} · RE/MAX VIP I` : "RE/MAX VIP I",
  };
}
