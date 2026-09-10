// Initialize AOS with performance optimizations
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1200,
        easing: 'ease-in-out-sine',
        once: true,
        offset: 50
    });
}

// Navigation transparency and Mobile Menu Toggle
const navSticky = document.querySelector('.nav-sticky');
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

// Back to Top button
const backToTop = document.createElement('div');
backToTop.className = 'back-to-top';
backToTop.innerHTML = '<i class="fas fa-chevron-up" style="color: black !important;"></i>';
document.body.appendChild(backToTop);

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function handleScroll() {
    if (window.scrollY > 50) {
        if (navSticky) navSticky.classList.add('scrolled');
    } else {
        if (navSticky) navSticky.classList.remove('scrolled');
    }

    if (window.scrollY > 500) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);
document.addEventListener('DOMContentLoaded', handleScroll);


if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('is-active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) navLinks.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('is-active');
    });
});

// Smooth scroll function
function scrollToForm() {
    const el = document.getElementById('contato');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// WhatsApp redirect
function openWhatsApp() {
    window.open('https://wa.me/5551985945354?text=Olá!%20Quero%20conhecer%20o%20Mônaco%20Grand%20Marina', '_blank');
}

// Lightbox
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    if (lightbox && lightboxImg) {
        lightbox.classList.add('active');
        lightboxImg.src = src;
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
    }
}

// Phone mask (BR pattern)
const phoneInput = document.getElementById('telefone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        
        if (value.length > 10) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        } else if (value.length > 5) {
            value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
        } else if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
        } else if (value.length > 0) {
            value = value.replace(/^(\d*)/, '($1');
        }
        
        e.target.value = value;
    });
}

// Lead Capture Form
const leadForm = document.getElementById('leadForm');
if (leadForm) {
    leadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const email = document.getElementById('email').value;
        const cidade = document.getElementById('cidade').value;
        
        // Simulating API call
        console.log('Lead capturado:', { nome, telefone, email, cidade });
        
        // Redirect to WhatsApp with info
        const message = `Olá Junior Martins! Tenho interesse no Mônaco Grand Marina.
Nome: ${nome}
WhatsApp: ${telefone}
Email: ${email}
Cidade: ${cidade}`;
        
        window.open(`https://wa.me/5551985945354?text=${encodeURIComponent(message)}`, '_blank');
        
        // Success behavior
        const successMsg = document.getElementById('successMessage');
        const formSubmitBtn = leadForm.querySelector('button[type="submit"]');
        
        if (formSubmitBtn) {
            formSubmitBtn.disabled = true;
            formSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Enviando...';
        }

        setTimeout(() => {
            leadForm.reset();
            if (formSubmitBtn) {
                formSubmitBtn.disabled = false;
                formSubmitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Receber Apresentação Completa';
            }
            if (successMsg) {
                successMsg.classList.remove('hidden');
                successMsg.classList.add('animate-bounce');
                setTimeout(() => {
                    successMsg.classList.add('hidden');
                    successMsg.classList.remove('animate-bounce');
                }, 8000);
            }
        }, 1500);
    });
}

// ROI Chart Animation (Simplified SVG Chart)
function initROIChart() {
    const container = document.getElementById('roi-chart-placeholder');
    if (!container) return;

    container.innerHTML = `
        <svg viewBox="0 0 400 200" style="width: 100%; height: 100%;">
            <line x1="40" y1="20" x2="40" y2="180" stroke="#334155" stroke-width="1" />
            <line x1="40" y1="180" x2="380" y2="180" stroke="#334155" stroke-width="1" />
            
            <rect x="60" y="180" width="40" height="0" fill="#334155">
                <animate attributeName="height" from="0" to="40" dur="1.5s" fill="freeze" />
                <animate attributeName="y" from="180" to="140" dur="1.5s" fill="freeze" />
            </rect>
            <text x="60" y="195" fill="#94a3b8" font-size="10">Residencial</text>

            <rect x="140" y="180" width="40" height="0" fill="#334155">
                <animate attributeName="height" from="0" to="80" dur="1.5s" fill="freeze" />
                <animate attributeName="y" from="180" to="100" dur="1.5s" fill="freeze" />
            </rect>
            <text x="140" y="195" fill="#94a3b8" font-size="10">Condomínio</text>

            <rect x="220" y="180" width="40" height="0" fill="url(#goldGrad)">
                <animate attributeName="height" from="0" to="160" dur="2s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1" />
                <animate attributeName="y" from="180" to="20" dur="2s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1" />
            </rect>
            <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#D4AF37;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#B8941F;stop-opacity:1" />
                </linearGradient>
            </defs>
            <text x="220" y="195" fill="#C5A059" font-size="10" font-weight="bold">GRAND MARINA</text>
            
            <text x="50" y="130" fill="white" font-size="12" opacity="0">
                <animate attributeName="opacity" from="0" to="1" dur="1s" begin="1.5s" fill="freeze" />
                320% ROI Potencial
            </text>
        </svg>
    `;
}

document.addEventListener('DOMContentLoaded', initROIChart);
