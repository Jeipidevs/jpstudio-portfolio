const PORTFOLIO_DATA = [
  // =========================================================================
  // 🔥 DESTAQUES: PRINCIPAIS SISTEMAS DISPONÍVEIS & SAAS HOMOLOGADOS
  // =========================================================================
  {
    id: 'saas-cobrancazap',
    category: 'saas',
    featured: true,
    title: 'CobrançaZap OS',
    subtitle: 'Régua de Cobrança Automática Pix no WhatsApp',
    desc: 'Recuperação inteligente de inadimplência via WhatsApp oficial. Disparos preventivos com código copia-e-cola, split de pagamento e dashboard em tempo real.',
    screenshot: '/screenshots/saas_cobrancazap.png',
    stack: ['Next.js 16', 'Tailwind v4', 'Evolution API', 'Asaas / MP'],
    monetization: 'SaaS Recorrente: R$ 97 a R$ 297/mês',
    status: '⚡ Arquitetura White Label',
    previewUrl: '/showcase/cobrancazap.html',
    isLive: false,
    type: 'desktop'
  },
  {
    id: 'saas-careflow',
    category: 'saas',
    featured: true,
    title: 'CareFlow CRM (Life Endo OS)',
    subtitle: 'Prontuário Médico, Funil Clínico & IA Diagnóstica',
    desc: 'Sistema clínico completo para clínicas e consultórios. Funil Kanban por procedimento, histórico do paciente, prontuário eletrônico multimodal e agendamento humanizado.',
    screenshot: '/screenshots/saas_careflow.png',
    stack: ['Next.js 16', 'React 19', 'Supabase', 'Claude AI', 'WhatsApp'],
    monetization: 'Saúde B2B: R$ 350 a R$ 800/mês por clínica',
    status: '✨ Case Entregue / B2B',
    previewUrl: '/showcase/careflow.html',
    isLive: false,
    type: 'desktop'
  },
  {
    id: 'saas-clinicspace',
    category: 'saas',
    featured: true,
    title: 'ClinicSpace OS (Laços de Afeto)',
    subtitle: 'Locação & Reserva Inteligente de Consultórios por Hora',
    desc: 'Plataforma para gestão de coworking de saúde e locação de consultórios. Calendário visual em tempo real com grade horária por sala e teleconsulta LiveKit.',
    screenshot: '/screenshots/saas_clinicspace.png',
    stack: ['Next.js 16', 'React 19', 'Supabase', 'LiveKit WebRTC'],
    monetization: 'Coworking Clínico: R$ 400/mês + taxa de reserva',
    status: '✨ Case Entregue / B2B',
    previewUrl: '/showcase/clinicspace.html',
    isLive: false,
    type: 'desktop'
  },
  {
    id: 'saas-ekoz',
    category: 'saas',
    featured: true,
    title: 'Ekoz Community OS',
    subtitle: 'Ecossistema Executivo LMS, Cursos & Network Interativo',
    desc: 'Plataforma de alta fidelidade para comunidades e infoprodutores. Área de membros premium, transmissão ao vivo, chat em tempo real e marketplace integrado.',
    screenshot: '/screenshots/saas_ekoz.png',
    stack: ['React 19', 'Vite 8', 'Express', 'Prisma', 'Socket.io', 'LiveKit'],
    monetization: 'Comunidades & Infoprodutos: R$ 297 a R$ 997/mês',
    status: '⚡ Plataforma White Label',
    previewUrl: '/showcase/ekoz.html',
    isLive: false,
    type: 'desktop'
  },
  {
    id: 'saas-imobflow',
    category: 'saas',
    featured: true,
    title: 'ImobFlow CRM (VIP-OS)',
    subtitle: 'CRM Imobiliário de Alta Performance & Gamificação',
    desc: 'Plataforma em produção na RE/MAX VIP para imobiliárias de luxo. Funil Kanban, geolocalização com mapas interativos, roleta de distribuição de leads e comissões.',
    screenshot: '/screenshots/saas_imobflow.png',
    stack: ['Next.js', 'React 18', 'Supabase', 'Leaflet Maps'],
    monetization: 'B2B Imobiliário: R$ 497 a R$ 1.500/mês',
    status: '🟢 No Ar (Produção Oficial)',
    previewUrl: '/preview-imobflow.html',
    isLive: true,
    liveUrl: 'https://crm.imobiliariavip.com',
    type: 'desktop'
  },
  {
    id: 'calc-ecobrisa',
    category: 'calculadoras',
    featured: true,
    title: 'Calculadora do Custo do Calor (Ecobrisa)',
    subtitle: 'Lead Magnet de Engenharia Térmica & Eficiência Industrial',
    desc: 'Simula em 30 segundos o prejuízo acumulado por estresse térmico em galpões fabris, riscos de autuação da NR-15 e calcula o ROI dos climatizadores.',
    screenshot: '/screenshots/calc_ecobrisa.png',
    stack: ['Next.js 16', 'React 19', 'Tailwind v4', 'Engenharia Térmica'],
    monetization: 'Gerador de Leads B2B Industriais de Alto Valor',
    status: '⚙️ Solução de Engenharia B2B',
    previewUrl: '/showcase/ecobrisa.html',
    isLive: false,
    type: 'desktop'
  },
  {
    id: 'saas-recrutaia',
    category: 'saas',
    featured: true,
    title: 'RecrutaIA OS',
    subtitle: 'Agente Autônomo de Recrutamento & RH com IA',
    desc: 'Inteligência Artificial que entrevista candidatos 24/7 no WhatsApp, aplica testes de fit cultural, analisa respostas com Claude Sonnet e agenda no Google Calendar.',
    screenshot: '/screenshots/saas_recrutaia.png',
    stack: ['FastAPI', 'Claude Sonnet 3.5', 'PydanticAI', 'Meta Cloud'],
    monetization: 'HR Tech: R$ 297/mês ou R$ 49 por vaga fechada',
    status: '🤖 Agente IA Autônomo',
    previewUrl: '/preview-recrutaia.html',
    isLive: false,
    type: 'desktop'
  },

  // =========================================================================
  // 🔗 ACERVO BIOLINKS PRO
  // =========================================================================
  {
    id: 'bio-jpstudio',
    category: 'biolinks',
    title: 'JPStudio Oficial (bio.jpstudio.tech)',
    subtitle: 'Marketing Estratégico, Automações & Sistemas',
    desc: 'Página oficial de alta conversão da JPStudio com carregamento instantâneo, prova social, diagnóstico de 20 min e chamada direta para WhatsApp.',
    screenshot: '/screenshots/bio_jpstudio.png',
    stack: ['HTML5', 'CSS3', 'Nginx Docker', 'Fast-Bundle'],
    monetization: 'Autoridade & Captação High-Ticket',
    status: '🟢 No Ar (Produção Oficial)',
    previewUrl: '/preview/bio/jpstudio',
    isLive: true,
    liveUrl: 'https://bio.jpstudio.tech',
    type: 'mobile'
  },
  {
    id: 'bio-henrique',
    category: 'biolinks',
    title: 'Henrique Orsato',
    subtitle: 'Massoterapeuta Oficial da FGBT em Capão da Canoa',
    desc: 'Página pessoal com agendamento direto pelo WhatsApp, depoimentos, certificados e apresentação de massoterapia esportiva e liberação miofascial.',
    screenshot: '/screenshots/bio_henrique.png',
    stack: ['HTML5', 'Playfair Display', 'Design Premium'],
    monetization: 'Assinatura: R$ 19,90/mês ou R$ 97/ano',
    status: '🟢 No Ar (Produção Oficial)',
    previewUrl: '/preview/bio/henrique',
    isLive: true,
    liveUrl: 'https://henrique.jpstudio.tech',
    type: 'mobile'
  },
  {
    id: 'bio-roberto',
    category: 'biolinks',
    title: 'Roberto da Rosa',
    subtitle: 'Tatuador Especialista em Realismo & Black & Grey',
    desc: 'BioLink visual com portfólio autoral, avaliações do Google, localização do estúdio em Capão da Canoa e agendamento de conversa no WhatsApp.',
    screenshot: '/screenshots/bio_roberto.png',
    stack: ['HTML5', 'Dark Luxury', 'Micro-Interações'],
    monetization: 'Assinatura: R$ 19,90/mês ou R$ 97/ano',
    status: '🟢 No Ar (Produção Oficial)',
    previewUrl: '/preview/bio/roberto',
    isLive: true,
    liveUrl: 'https://roberto.jpstudio.tech',
    type: 'mobile'
  },
  {
    id: 'bio-josi',
    category: 'biolinks',
    title: 'Josi Menezes (RE/MAX VIP)',
    subtitle: 'Corretora de Imóveis no Litoral Norte/RS',
    desc: 'Página pessoal com carteira de imóveis exclusivos, botão direto para o WhatsApp e selo de credibilidade RE/MAX VIP.',
    screenshot: '/screenshots/bio_josi.png',
    stack: ['HTML5', 'CSS Modern', 'WhatsApp Lead Tracker'],
    monetization: 'Assinatura: R$ 19,90/mês ou R$ 97/ano',
    status: '🟢 No Ar (Produção Oficial)',
    previewUrl: '/preview/bio/josi',
    isLive: true,
    liveUrl: 'https://josi.imobiliariavip.com',
    type: 'mobile'
  },
  {
    id: 'bio-cozy',
    category: 'biolinks',
    title: 'Cozy Home Xangri-lá',
    subtitle: 'Cama, Mesa, Banho & Décor de Luxo',
    desc: 'Mini-site elegante com curadoria de marcas selecionadas, localização no Google Maps e atendimento exclusivo via WhatsApp.',
    screenshot: '/screenshots/bio_cozy.png',
    stack: ['HTML5', 'Cormorant Garamond', 'SEO Local'],
    monetization: 'Setup de R$ 297 + R$ 19,90/mês',
    status: '🟢 No Ar (Produção Oficial)',
    previewUrl: '/preview/bio/cozy',
    isLive: true,
    liveUrl: 'https://cozyhome.jpstudio.tech',
    type: 'mobile'
  },
  {
    id: 'bio-vanessa',
    category: 'biolinks',
    title: 'Vanessa de Melos',
    subtitle: 'Corretora RE/MAX VIP — Zona Nova',
    desc: 'Apresentação refinada com destaque para apartamentos mobiliados perto do mar em Capão da Canoa e atendimento rápido.',
    screenshot: '/screenshots/bio_vanessa.png',
    stack: ['HTML5', 'Manrope', 'Fraunces', 'SEO'],
    monetization: 'Assinatura: R$ 19,90/mês',
    status: '🟢 No Ar (Produção Oficial)',
    previewUrl: '/preview/bio/vanessa',
    isLive: true,
    liveUrl: 'https://vanessa.imobiliariavip.com',
    type: 'mobile'
  },
  {
    id: 'bio-vilagramado',
    category: 'biolinks',
    title: 'Vila Gramado',
    subtitle: 'Cabanas na Serra Gaúcha & Turismo',
    desc: 'Mini-site de hospitalidade e cabanas de luxo com hidromassagem privativa e vista para o lago em Gramado/RS.',
    screenshot: '/screenshots/bio_vilagramado.png',
    stack: ['HTML5', 'Poppins', 'Experiências'],
    monetization: 'Setup de R$ 350 + R$ 29/mês',
    status: '📁 Acervo de Produção JPStudio',
    previewUrl: '/preview/bio/vilagramado',
    isLive: false,
    type: 'mobile'
  },
  {
    id: 'bio-remax',
    category: 'biolinks',
    title: 'RE/MAX VIP — Nossa Equipe',
    subtitle: 'Hub Oficial de Corretores & Equipe Comercial',
    desc: 'Template institucional com diretório da equipe de corretores, botão WhatsApp individual e direcionamento rápido.',
    screenshot: '/screenshots/bio_remax.png',
    stack: ['HTML5', 'Montserrat', 'Inter', 'JSON Data'],
    monetization: 'Licença Corporativa: R$ 97/ano por corretor',
    status: '📁 Acervo de Produção JPStudio',
    previewUrl: '/preview/bio/remax',
    isLive: false,
    type: 'mobile'
  },

  // =========================================================================
  // 🎨 PORTFÓLIO DE LANDING PAGES
  // =========================================================================
  {
    id: 'lp-monaco',
    category: 'landingpages',
    title: 'Mônaco Grand Marina',
    subtitle: 'Condomínio Náutico de Alto Padrão (Lagoa dos Quadros)',
    desc: 'Landing Page imersiva de alto impacto para lançamento imobiliário de luxo com vídeo aéreo, galeria e agendamento de visita.',
    screenshot: '/screenshots/lp_monaco.png',
    stack: ['HTML5', 'Tailwind CSS', 'Animações Suaves'],
    monetization: 'Serviço High-Ticket: R$ 2.500 a R$ 4.500',
    status: '🟢 No Ar (Produção Oficial)',
    previewUrl: '/preview/lp/monaco',
    isLive: true,
    liveUrl: 'https://monaco.imobiliariavip.com',
    type: 'desktop'
  },
  {
    id: 'lp-guia-litoral',
    category: 'landingpages',
    title: 'Guia Imobiliário do Litoral',
    subtitle: 'Portal de Conteúdo & Inteligência de Mercado',
    desc: 'Guia completo com artigos jurídicos, dados de valorização do m² e radar de corretores em Capão da Canoa e Xangri-lá.',
    screenshot: '/screenshots/lp_guia_litoral.png',
    stack: ['HTML5', 'CSS Modular', 'JavaScript'],
    monetization: 'Portal de Mídia & Venda de Anúncios',
    status: '📁 Case & Acervo JPStudio',
    previewUrl: '/preview/lp/guia-litoral',
    isLive: false,
    type: 'desktop'
  },
  {
    id: 'lp-site-marco',
    category: 'landingpages',
    title: 'Marco Allys Luxury Real Estate',
    subtitle: 'Site de Autoridade Pessoal de Corretor de Luxo',
    desc: 'Site institucional completo com histórico profissional, carteira de imóveis de milhões e formulário qualificado.',
    screenshot: '/screenshots/lp_site_marco.png',
    stack: ['HTML5', 'CSS Dark Luxury'],
    monetization: 'Desenvolvimento: R$ 1.800 a R$ 3.000',
    status: '📁 Case & Acervo JPStudio',
    previewUrl: '/preview/lp/site-marco',
    isLive: false,
    type: 'desktop'
  },
  {
    id: 'lp-proposta-lacos',
    category: 'landingpages',
    title: 'Proposta Comercial Laços de Afeto',
    subtitle: 'Apresentação Comercial Digital Interativa (JPStudio)',
    desc: 'Pitch digital interativo para venda de serviços de marketing e posicionamento médico com apresentação visual editorial.',
    screenshot: '/screenshots/lp_proposta_lacos.png',
    stack: ['HTML5 Interativo', 'Design Editorial'],
    monetization: 'Modelo Comercial de Fechamento B2B',
    status: '📁 Apresentação Interativa',
    previewUrl: '/preview/lp/proposta-lacos',
    isLive: false,
    type: 'desktop'
  },
  {
    id: 'lp-thairon',
    category: 'landingpages',
    title: 'Thairon Imóveis',
    subtitle: 'Apresentação Comercial & Portfólio Ágil',
    desc: 'Landing page ágil e moderna com catálogo de imóveis à venda e chamada direta para WhatsApp.',
    screenshot: '/screenshots/lp_thairon.png',
    stack: ['HTML5', 'CSS', 'Micro-Interações'],
    monetization: 'Desenvolvimento: R$ 1.200 a R$ 2.000',
    status: '📁 Case & Acervo JPStudio',
    previewUrl: '/preview/lp/thairon',
    isLive: false,
    type: 'desktop'
  },
  {
    id: 'lp-jpstudio-lp',
    category: 'landingpages',
    title: 'JPStudio IA — Pare de Operar, Comece a Escalar',
    subtitle: 'Marketing Estratégico + IA Aplicada',
    desc: 'Landing page clássica de posicionamento da JPStudio com tipografia Instrument Serif, Fraunces e foco em consultoria estratégica.',
    screenshot: '/screenshots/lp_jpstudio.png',
    stack: ['HTML5', 'Instrument Serif', 'Fraunces'],
    monetization: 'Autoridade & Pitch Comercial',
    status: '📁 Case Institucional',
    previewUrl: '/preview/lp/jpstudio',
    isLive: false,
    type: 'desktop'
  },
  {
    id: 'lp-sauna-reds',
    category: 'landingpages',
    title: 'Sauna Reds Club',
    subtitle: 'Landing Page de Entretenimento Noturno',
    desc: 'Design dark sofisticado em Astro com carregamento instantâneo, programação semanal e contato.',
    screenshot: '/screenshots/lp_sauna_reds.png',
    stack: ['Astro', 'Tailwind', 'Performance 100'],
    monetization: 'Desenvolvimento: R$ 1.500 a R$ 2.500',
    status: '📁 Case & Acervo JPStudio',
    previewUrl: '/preview/lp/sauna-reds',
    isLive: false,
    type: 'desktop'
  },

  // =========================================================================
  // 🧮 CALCULADORAS & MICRO-SAAS
  // =========================================================================
  {
    id: 'calc-proporcional',
    category: 'calculadoras',
    title: 'Calculadora de Aluguel Proporcional',
    subtitle: 'Micro-SaaS Utilitário para Imobiliárias & Proprietários',
    desc: 'Calcula fração de dias de aluguel, condomínio, IPTU e caução em 2 segundos com exportação de comprovante detalhado.',
    screenshot: '/screenshots/calc_proporcional.png',
    stack: ['HTML5', 'JavaScript Puro', 'CSS Moderno'],
    monetization: 'Order Bump perfeito: R$ 19,90 no checkout',
    status: '🧮 Utilitário Interativo',
    previewUrl: '/preview/calc/proporcional/',
    isLive: false,
    type: 'mobile'
  }
];

let allItems = [...PORTFOLIO_DATA];
let currentFilter = 'todos';

async function loadWorkflows() {
  try {
    const res = await fetch('/api/workflows');
    const workflows = await res.json();
    
    const categoryNames = {
      '01-cobranca-e-financeiro': 'Cobrança & Finanças',
      '02-central-de-leads-e-marketing': 'Marketing & Leads',
      '03-mentor-vip-e-gestao-de-equipe': 'Gestão de Equipe & CRM',
      '04-imobiliario-e-rpa': 'Imobiliário & RPA Forense',
      '05-recrutamento-e-rh': 'Recrutamento & RH',
      '06-transacionais-e-seguranca': 'Segurança & 2FA',
      '07-ecommerce-e-dropshipping': 'E-commerce Autônomo'
    };

    workflows.forEach(wf => {
      let trigger = 'Webhook';
      let logic = 'AI / Script';
      let action = 'WhatsApp';

      if (wf.name.includes('Facebook')) { trigger = 'Meta Ads'; logic = 'Parser Lead'; action = 'Notifica Corretor'; }
      if (wf.name.includes('Agenda')) { trigger = 'Cron 08h'; logic = 'Consulta CRM'; action = 'WhatsApp Corretor'; }
      if (wf.name.includes('Certidões')) { trigger = 'API / CPF'; logic = 'Robô Browserless'; action = 'PDF Gotenberg'; }
      if (wf.name.includes('Medusa')) { trigger = 'Order Placed'; logic = 'Markup USD'; action = 'Fornecedor'; }
      if (wf.name.includes('AutoCobra') || wf.name.includes('cobranca')) { trigger = 'Gateway Pix'; logic = 'Régua Vencimento'; action = 'Evolution API'; }

      allItems.push({
        id: 'wf-' + wf.id,
        category: 'n8n',
        title: wf.name,
        subtitle: categoryNames[wf.category] || wf.category,
        desc: `Fluxo de automação com ${wf.nodeCount} nós interligados. Execução assíncrona tolerante a falhas.`,
        workflowNodes: { trigger, logic, action },
        stack: ['n8n v2.37', 'Webhooks', 'Evolution API / Meta'],
        monetization: 'Template JSON: R$ 27 a R$ 97 | Setup: R$ 997+',
        status: wf.active ? '⚡ Automação n8n Homologada' : '📦 Template JSON Validado',
        isWorkflow: true,
        fileName: wf.fileName
      });
    });

    updateCounters();
    renderGrid();
  } catch (err) {
    console.warn('Workflows could not be loaded dynamically:', err);
    updateCounters();
    renderGrid();
  }
}

function updateCounters() {
  document.getElementById('count-all').textContent = allItems.length;
  document.getElementById('count-saas').textContent = allItems.filter(i => i.category === 'saas').length;
  document.getElementById('count-n8n').textContent = allItems.filter(i => i.category === 'n8n').length;
  document.getElementById('count-biolinks').textContent = allItems.filter(i => i.category === 'biolinks').length;
  document.getElementById('count-lp').textContent = allItems.filter(i => i.category === 'landingpages').length;
  document.getElementById('count-calc').textContent = allItems.filter(i => i.category === 'calculadoras').length;
}

function renderGrid(filter = currentFilter, searchTerm = '') {
  const grid = document.getElementById('portfolio-grid');
  grid.innerHTML = '';

  let filtered = allItems;
  if (filter !== 'todos') {
    filtered = filtered.filter(item => item.category === filter);
  }

  if (searchTerm.trim() !== '') {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(item => 
      item.title.toLowerCase().includes(term) ||
      item.subtitle.toLowerCase().includes(term) ||
      item.desc.toLowerCase().includes(term) ||
      item.stack.some(s => s.toLowerCase().includes(term))
    );
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px; color: var(--text-muted);">
        <h3>Nenhum ativo encontrado para essa busca.</h3>
        <p>Tente outro termo ou troque de categoria.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card' + (item.featured ? ' card-featured' : '');

    const catBadgeClass = {
      'saas': 'badge-saas',
      'n8n': 'badge-n8n',
      'biolinks': 'badge-biolink',
      'landingpages': 'badge-lp',
      'calculadoras': 'badge-calc'
    }[item.category] || 'badge-saas';

    const catLabel = {
      'saas': 'SaaS Core',
      'n8n': 'Workflow n8n',
      'biolinks': 'BioLink Pro',
      'landingpages': 'Landing Page',
      'calculadoras': 'Micro-SaaS'
    }[item.category] || item.category;

    let mediaHtml = '';
    if (item.isWorkflow) {
      mediaHtml = `
        <div class="workflow-card-media">
          <div class="workflow-node-chain">
            <span class="node-box trigger">⚡ ${item.workflowNodes.trigger}</span>
            <span class="node-arrow">➔</span>
            <span class="node-box logic">⚙️ ${item.workflowNodes.logic}</span>
            <span class="node-arrow">➔</span>
            <span class="node-box action">📱 ${item.workflowNodes.action}</span>
          </div>
          <span style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">
            📄 ${item.fileName}
          </span>
        </div>
      `;
    } else {
      const isMobile = item.type === 'mobile';
      mediaHtml = `
        <div class="card-media ${isMobile ? 'mobile-frame' : ''}">
          <img src="${item.screenshot}" alt="${item.title}" loading="lazy" onerror="this.src='/screenshots/lp_jpstudio.png'" />
        </div>
      `;
    }

    // Honest Status & Action Buttons
    const isLive = Boolean(item.isLive && item.liveUrl);
    let actionsHtml = '';

    if (item.isWorkflow) {
      const waMsg = encodeURIComponent(`Olá João! Vi a automação n8n "${item.title}" no seu portfólio (portifolio.jpstudio.tech) e gostaria de integrá-la na minha operação.`);
      actionsHtml = `
        <button class="btn btn-primary" onclick="openWorkflowModal('${item.id}')">
          ⚡ Ver Detalhes
        </button>
        <a href="https://wa.me/5551998196232?text=${waMsg}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
          💬 Adquirir Fluxo
        </a>
      `;
    } else if (isLive) {
      actionsHtml = `
        <button class="btn btn-primary" onclick="openPreview('${item.title}', '${item.previewUrl || item.liveUrl}', '${item.type}')">
          👁️ Preview Rápido
        </button>
        <a href="${item.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="border-color: rgba(0, 230, 118, 0.4); color: #00e676;">
          ↗️ Acessar Site Oficial
        </a>
      `;
    } else {
      const isCalc = item.category === 'calculadoras';
      const previewText = isCalc ? '🧮 Usar Calculadora' : '👁️ Ver Demonstração';
      const ctaText = item.category === 'saas' ? '💬 Solicitar Licença' : (isCalc ? '💬 Solicitar Ferramenta' : '💬 Contratar Esse Modelo');
      const waMsg = encodeURIComponent(`Olá João! Vi o ativo "${item.title}" no seu portfólio (portifolio.jpstudio.tech) e gostaria de solicitar uma demonstração comercial/licença.`);

      actionsHtml = `
        <button class="btn btn-primary" onclick="openPreview('${item.title}', '${item.previewUrl}', '${item.type}')">
          ${previewText}
        </button>
        <a href="https://wa.me/5551998196232?text=${waMsg}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
          ${ctaText}
        </a>
      `;
    }

    card.innerHTML = `
      <div class="card-header">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="card-category-badge ${catBadgeClass}">${catLabel}</span>
          ${item.featured ? '<span class="badge-featured">⭐ DESTAQUE</span>' : ''}
        </div>
        <div class="card-status">
          <span class="status-dot-active"></span>
          <span>${item.status}</span>
        </div>
      </div>
      ${mediaHtml}
      <div class="card-content">
        <h3 class="card-title">${item.title}</h3>
        <p style="font-size: 0.82rem; color: var(--accent-green); margin-bottom: 8px; font-weight: 600;">${item.subtitle}</p>
        <p class="card-desc">${item.desc}</p>
        <div class="card-tags">
          ${item.stack.map(s => `<span class="tag">${s}</span>`).join('')}
        </div>
        <div class="card-monetization">
          💰 <strong>Comercial:</strong> ${item.monetization}
        </div>
        <div class="card-actions">
          ${actionsHtml}
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.getAttribute('data-filter');
    const term = document.getElementById('search-input').value;
    renderGrid(currentFilter, term);
  });
});

document.getElementById('search-input').addEventListener('input', (e) => {
  renderGrid(currentFilter, e.target.value);
});

window.openPreview = function(title, url, type) {
  const modal = document.getElementById('preview-modal');
  const iframe = document.getElementById('preview-iframe');
  const modalTitle = document.getElementById('modal-title-text');
  
  modalTitle.textContent = title;
  iframe.src = url;
  
  if (type === 'mobile') {
    iframe.classList.add('mobile-view');
    document.getElementById('toggle-mobile').classList.add('active');
    document.getElementById('toggle-desktop').classList.remove('active');
  } else {
    iframe.classList.remove('mobile-view');
    document.getElementById('toggle-desktop').classList.add('active');
    document.getElementById('toggle-mobile').classList.remove('active');
  }
  
  modal.classList.add('active');
};

window.openWorkflowModal = function(id) {
  const item = allItems.find(i => i.id === id);
  if (!item) return;

  const modal = document.getElementById('preview-modal');
  const iframe = document.getElementById('preview-iframe');
  const modalTitle = document.getElementById('modal-title-text');
  
  modalTitle.textContent = item.title + ' (Automação n8n)';
  
  const waLink = `https://wa.me/5551998196232?text=${encodeURIComponent(`Olá João! Gostaria de conversar sobre a implantação do fluxo n8n: ${item.title}`)}`;
  
  iframe.srcdoc = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0b0f19; color: #e2e8f0; padding: 40px; margin: 0; line-height: 1.6; }
        .box { max-width: 650px; margin: 0 auto; background: #131b2e; border: 1px solid #1e293b; border-radius: 12px; padding: 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .badge { background: #00e67620; color: #00e676; padding: 4px 10px; border-radius: 99px; font-size: 12px; font-weight: bold; border: 1px solid #00e67640; }
        h2 { margin: 16px 0 8px 0; color: #f8fafc; font-size: 1.5rem; }
        p.sub { color: #94a3b8; font-size: 0.95rem; margin-bottom: 24px; }
        .chain { background: #090d16; border: 1px dashed #334155; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 24px; }
        .node { display: inline-block; padding: 8px 14px; border-radius: 6px; font-size: 13px; font-weight: 600; margin: 4px; }
        .trigger { background: #3b82f625; color: #60a5fa; border: 1px solid #3b82f640; }
        .logic { background: #eab30825; color: #facc15; border: 1px solid #eab30840; }
        .action { background: #10b98125; color: #34d399; border: 1px solid #10b98140; }
        .btn { display: block; text-align: center; background: #00e676; color: #05140b; text-decoration: none; padding: 14px; border-radius: 8px; font-weight: bold; font-size: 15px; margin-top: 24px; }
        .btn:hover { background: #00c853; }
      </style>
    </head>
    <body>
      <div class="box">
        <span class="badge">ESTEIRA DE AUTOMAÇÃO HOMOLOGADA</span>
        <h2>${item.title}</h2>
        <p class="sub">${item.subtitle} • Arquivo: <code>${item.fileName}</code></p>
        <div class="chain">
          <div class="node trigger">⚡ Gatilho: ${item.workflowNodes.trigger}</div>
          <span style="color: #64748b; font-size: 16px;">➔</span>
          <div class="node logic">⚙️ Lógica: ${item.workflowNodes.logic}</div>
          <span style="color: #64748b; font-size: 16px;">➔</span>
          <div class="node action">📱 Ação: ${item.workflowNodes.action}</div>
        </div>
        <p style="font-size: 0.9rem; color: #94a3b8;">
          Este fluxo é executado de ponta a ponta na infraestrutura de alta tolerância a falhas da JPStudio, garantindo disparos de mensagens, reconciliação financeira e inteligência de atendimento sem intervenção manual.
        </p>
        <a href="${waLink}" target="_blank" class="btn">💬 Falar com João no WhatsApp para Integrar Este Fluxo</a>
      </div>
    </body>
    </html>
  `;

  iframe.classList.remove('mobile-view');
  document.getElementById('toggle-desktop').classList.add('active');
  document.getElementById('toggle-mobile').classList.remove('active');
  modal.classList.add('active');
};

window.closePreview = function() {
  const modal = document.getElementById('preview-modal');
  const iframe = document.getElementById('preview-iframe');
  modal.classList.remove('active');
  iframe.src = 'about:blank';
  iframe.removeAttribute('srcdoc');
};

document.getElementById('toggle-desktop').addEventListener('click', () => {
  const iframe = document.getElementById('preview-iframe');
  iframe.classList.remove('mobile-view');
  document.getElementById('toggle-desktop').classList.add('active');
  document.getElementById('toggle-mobile').classList.remove('active');
});

document.getElementById('toggle-mobile').addEventListener('click', () => {
  const iframe = document.getElementById('preview-iframe');
  iframe.classList.add('mobile-view');
  document.getElementById('toggle-mobile').classList.add('active');
  document.getElementById('toggle-desktop').classList.remove('active');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePreview();
});

loadWorkflows();
