// ═══════════════════════════════════════
//   madebyparth.me — portfolio script
// ═══════════════════════════════════════

// — TYPEWRITER EFFECT —
const roles = [
  'SENIOR AI/ML ENGINEER',
  'FULL-STACK AI DEVELOPER',
  'LLM & RAG SPECIALIST',
  'COMPUTER VISION ENGINEER',
  'PRODUCTION AI SYSTEMS BUILDER',
];

let roleIdx = 0;
let charIdx = 0;
let deleting = false;

function typeWriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const current = roles[roleIdx];

  if (deleting) {
    el.textContent = current.substring(0, charIdx - 1);
    charIdx--;
  } else {
    el.textContent = current.substring(0, charIdx + 1);
    charIdx++;
  }

  if (!deleting && charIdx === current.length) {
    setTimeout(() => { deleting = true; }, 2200);
  } else if (deleting && charIdx === 0) {
    deleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
  }

  setTimeout(typeWriter, deleting ? 45 : 90);
}

// — NAV SCROLL EFFECT —
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// — MOBILE MENU —
function initMobileMenu() {
  const btn   = document.getElementById('menu-btn');
  const menu  = document.getElementById('mobile-menu');
  const links = document.querySelectorAll('.mobile-link');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
    });
  });
}

// — SMOOTH SCROLL — (backup for older browsers)
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// — SCROLL-IN ANIMATIONS —
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.5s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.project-card, .skill-group, .contact-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

// — PLACEHOLDER LAUNCH BUTTONS — (show tooltip until live URL added)
function initPlaceholderBtns() {
  document.querySelectorAll('[data-placeholder]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const tip = document.createElement('div');
      tip.textContent = '> DEPLOYMENT IN PROGRESS...';
      tip.style.cssText = `
        position:fixed; bottom:24px; left:50%; transform:translateX(-50%);
        background:#12121a; border:1px solid #00ff88; color:#00ff88;
        font-family:'Share Tech Mono',monospace; font-size:.7rem;
        letter-spacing:.15em; padding:10px 20px; z-index:9998;
        clip-path:polygon(0 6px,6px 0,calc(100% - 6px) 0,100% 6px,100% calc(100% - 6px),calc(100% - 6px) 100%,6px 100%,0 calc(100% - 6px));
      `;
      document.body.appendChild(tip);
      setTimeout(() => tip.remove(), 2400);
    });
  });
}

// — TERMINAL CURSOR — keep blinking in terminal body
function initTerminalCursor() {
  // Already handled via CSS .cursor-blink animation
}

// — BOOT —
document.addEventListener('DOMContentLoaded', () => {
  typeWriter();
  initNav();
  initMobileMenu();
  initSmoothScroll();
  initScrollReveal();
  initPlaceholderBtns();
});
