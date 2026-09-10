const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 8080;
const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const BIO_MAP = {
  'jpstudio': 'bio-jpstudio-tech',
  'josi': 'josi-menezes-linkinbio',
  'cozy': 'cozy-home-linkinbio',
  'henrique': 'henrique-orsato-linkinbio',
  'roberto': 'roberto-da-rosa-linkinbio',
  'vanessa': 'vanessa-de-melos-linkinbio',
  'vilagramado': 'vilagramado-linkinbio',
  'remax': 'remax-linkinbio'
};

const LP_MAP = {
  'monaco': 'monaco-remax-vip',
  'sauna-reds': 'sauna-reds-LP',
  'proposta-lacos': 'proposta-lacos',
  'site-marco': 'site-marco-remax',
  'thairon': 'thairon-bio',
  'guia-litoral': 'guia-imobiliario-litoral',
  'jpstudio': 'jpstudio-lp'
};

const CALC_MAP = {
  'proporcional': 'calculadora-proporcional',
  'ecobrisa': 'ecobrisa-custo-calor'
};

function serveFile(res, filePath) {
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Arquivo não encontrado: ' + path.basename(filePath));
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Access-Control-Allow-Origin': '*'
    });
    fs.createReadStream(filePath).pipe(res);
  });
}

function getWorkflowsData() {
  const workflowsDir = path.join(ROOT_DIR, 'ACERVO_N8N_WORKFLOWS');
  const result = [];
  if (!fs.existsSync(workflowsDir)) return result;

  const categories = fs.readdirSync(workflowsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  for (const cat of categories) {
    const catPath = path.join(workflowsDir, cat);
    const files = fs.readdirSync(catPath).filter(f => f.endsWith('.json'));
    for (const f of files) {
      const fullPath = path.join(catPath, f);
      try {
        const raw = fs.readFileSync(fullPath, 'utf8');
        const data = JSON.parse(raw);
        result.push({
          id: data.id || f.replace('.json', ''),
          name: data.name || f.replace('.json', ''),
          category: cat,
          fileName: f,
          nodeCount: Array.isArray(data.nodes) ? data.nodes.length : 0,
          active: Boolean(data.active),
          updatedAt: data.updatedAt || null
        });
      } catch (e) {
        // Fallback info if parsing error
        result.push({
          id: f.replace('.json', ''),
          name: f.replace('.json', ''),
          category: cat,
          fileName: f,
          nodeCount: 0,
          active: false
        });
      }
    }
  }
  return result;
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API Endpoints
  if (pathname === '/api/workflows') {
    const staticWfPath = path.join(PUBLIC_DIR, 'data', 'workflows.json');
    if (fs.existsSync(staticWfPath)) {
      serveFile(res, staticWfPath);
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(getWorkflowsData(), null, 2));
    return;
  }

  if (pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      status: 'online',
      domain: 'portfolio.jpstudio.tech',
      time: new Date().toISOString(),
      port: PORT
    }));
    return;
  }

  // Previews de BioLinks: /preview/bio/:slug[/path]
  const bioMatch = pathname.match(/^\/preview\/bio\/([a-zA-Z0-9_-]+)(\/.*)?$/);
  if (bioMatch) {
    const slug = bioMatch[1].toLowerCase();
    if (!bioMatch[2]) {
      res.writeHead(301, { Location: `/preview/bio/${slug}/` });
      res.end();
      return;
    }
    const subPath = (bioMatch[2] && bioMatch[2] !== '/') ? bioMatch[2].replace(/^\//, '') : 'index.html';
    
    // First check bundled public/previews/bio/:slug
    const bundledPath = path.join(PUBLIC_DIR, 'previews', 'bio', slug, subPath);
    if (fs.existsSync(bundledPath)) {
      serveFile(res, bundledPath);
      return;
    }

    const folderName = BIO_MAP[slug];
    if (folderName) {
      const filePath = path.join(ROOT_DIR, 'ACERVO_LINK_IN_BIO', folderName, subPath);
      serveFile(res, filePath);
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('BioLink não encontrado: ' + slug);
    return;
  }

  // Previews de Landing Pages: /preview/lp/:slug[/path]
  const lpMatch = pathname.match(/^\/preview\/lp\/([a-zA-Z0-9_-]+)(\/.*)?$/);
  if (lpMatch) {
    const slug = lpMatch[1].toLowerCase();
    if (!lpMatch[2]) {
      res.writeHead(301, { Location: `/preview/lp/${slug}/` });
      res.end();
      return;
    }
    const subPath = (lpMatch[2] && lpMatch[2] !== '/') ? lpMatch[2].replace(/^\//, '') : 'index.html';

    // First check bundled public/previews/lp/:slug
    const bundledPath = path.join(PUBLIC_DIR, 'previews', 'lp', slug, subPath);
    if (fs.existsSync(bundledPath)) {
      serveFile(res, bundledPath);
      return;
    }

    const folderName = LP_MAP[slug];
    if (folderName) {
      const filePath = path.join(ROOT_DIR, 'ACERVO_LANDING_PAGES', folderName, subPath);
      serveFile(res, filePath);
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Landing Page não encontrada: ' + slug);
    return;
  }

  // Previews de Calculadoras: /preview/calc/:slug[/path]
  const calcMatch = pathname.match(/^\/preview\/calc\/([a-zA-Z0-9_-]+)(\/.*)?$/);
  if (calcMatch) {
    const slug = calcMatch[1].toLowerCase();
    if (slug === 'ecobrisa') {
      res.writeHead(302, { Location: '/showcase/ecobrisa.html' });
      res.end();
      return;
    }
    if (!calcMatch[2]) {
      res.writeHead(301, { Location: `/preview/calc/${slug}/` });
      res.end();
      return;
    }
    const subPath = (calcMatch[2] && calcMatch[2] !== '/') ? calcMatch[2].replace(/^\//, '') : 'index.html';

    // First check bundled public/previews/calc/:slug
    const bundledPath = path.join(PUBLIC_DIR, 'previews', 'calc', slug, subPath);
    if (fs.existsSync(bundledPath)) {
      serveFile(res, bundledPath);
      return;
    }

    const folderName = CALC_MAP[slug];
    if (folderName) {
      const filePath = path.join(ROOT_DIR, 'calculadoras-utilitarios', folderName, subPath);
      serveFile(res, filePath);
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Calculadora não encontrada: ' + slug);
    return;
  }

  // Static files in public directory
  let localPath = pathname === '/' ? 'index.html' : pathname.replace(/^\//, '');
  const publicFilePath = path.join(PUBLIC_DIR, localPath);

  // Fallback to serving public file
  serveFile(res, publicFilePath);
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 PORTFÓLIO HUB JPSTUDIO RODANDO EM: http://localhost:${PORT}`);
  console.log(`✨ Central de Demonstração e Previews Ativos`);
  console.log(`=======================================================`);
});
