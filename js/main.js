// Main Application Controller for Sumit Behera's Creative Portfolio
// UI/UX Pro Max Edition: OLED Dark Theme, Animated Intro & Scroll Storytelling

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Initialize Animated Intro Sequence
  initAnimatedIntro();

  // 3. Initialize Storytelling HUD & Scroll Observers
  initStorytellingHUD();

  // 4. Initialize Core Components
  initCustomCursor();
  initDynamicTyping();
  initLiveClock();
  initStatsCounters();
  initSpotlightEffect();
  initHeroInteractiveHub();
  initCrmArchitectureFlow();
  initBentoInteractions();
  initSkillsSection();
  initProjectsSection();
  initTimelineSection();
  initModal();
  initContactForm();
  initCopyEmail();
  initScrollSpyAndDock();
  initScrollProgress();
  initScrollReveal();
});

// ==========================================================================
// ANIMATED CINEMATIC INTRO SEQUENCE
// ==========================================================================
function initAnimatedIntro() {
  const overlay = document.getElementById('intro-overlay');
  const stepText = document.getElementById('intro-boot-step');
  const progressBar = document.getElementById('intro-progress-bar');
  const skipBtn = document.getElementById('intro-skip-btn');
  if (!overlay) return;

  let isDismissed = false;

  function dismissIntro() {
    if (isDismissed) return;
    isDismissed = true;
    overlay.classList.add('dismissed');
    document.body.style.overflow = '';
    sessionStorage.setItem('sumit_intro_seen', 'true');
    if (window.SoundFX) window.SoundFX.playClick();
  }

  // Expose replay function globally
  window.replayIntro = function() {
    isDismissed = false;
    overlay.classList.remove('dismissed');
    runIntroSequence();
  };

  // Keyboard and click dismissals
  if (skipBtn) {
    skipBtn.addEventListener('click', dismissIntro);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !isDismissed) {
      dismissIntro();
    }
  });

  function runIntroSequence() {
    if (progressBar) progressBar.style.width = '0%';
    if (stepText) stepText.textContent = 'INITIALIZING SUMIT_OS v3.0...';

    const steps = [
      { delay: 100, text: 'INITIALIZING SUMIT_OS v3.0...', progress: '25%' },
      { delay: 450, text: 'VERIFYING ENTITY: SUMIT BEHERA...', progress: '55%' },
      { delay: 850, text: 'MOUNTING ARCHITECTURAL MODULES & CRM...', progress: '85%' },
      { delay: 1250, text: 'MISSION READY // PRODUCTION ONLINE [100%]', progress: '100%' },
      { delay: 1750, action: dismissIntro }
    ];

    steps.forEach((step) => {
      setTimeout(() => {
        if (isDismissed) return;
        if (step.text && stepText) stepText.textContent = step.text;
        if (step.progress && progressBar) progressBar.style.width = step.progress;
        if (step.action) step.action();
      }, step.delay);
    });
  }

  // Fast check: If already visited in same session, show snappy 600ms version
  if (sessionStorage.getItem('sumit_intro_seen') === 'true') {
    if (progressBar) progressBar.style.width = '100%';
    setTimeout(dismissIntro, 500);
  } else {
    runIntroSequence();
  }
}

// ==========================================================================
// SCROLL STORYTELLING HUD & CHAPTER TRACKER
// ==========================================================================
function initStorytellingHUD() {
  const hudText = document.getElementById('hud-chapter-text');
  if (!hudText) return;

  const chapters = [
    { id: 'hero', label: 'CH 01 / 08 • IDENTITY' },
    { id: 'about', label: 'CH 02 / 08 • PHILOSOPHY' },
    { id: 'architecture', label: 'CH 03 / 08 • CRM BLUEPRINT' },
    { id: 'projects', label: 'CH 04 / 08 • SHOWROOM' },
    { id: 'skills', label: 'CH 05 / 08 • ARSENAL' },
    { id: 'terminal', label: 'CH 06 / 08 • TERMINAL' },
    { id: 'journey', label: 'CH 07 / 08 • MILESTONES' },
    { id: 'contact', label: 'CH 08 / 08 • TRANSMISSION' }
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const found = chapters.find((c) => c.id === entry.target.id);
        if (found) {
          hudText.textContent = found.label;
        }
      }
    });
  }, {
    threshold: 0.25,
    rootMargin: '-50px 0px -50px 0px'
  });

  chapters.forEach((c) => {
    const el = document.getElementById(c.id);
    if (el) observer.observe(el);
  });
}

// ==========================================================================
// PRECISION MINIMALIST CURSOR
// ==========================================================================
function initCustomCursor() {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  if (window.matchMedia('(pointer: coarse)').matches) {
    dot.style.display = 'none';
    ring.style.display = 'none';
    return;
  }

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, input, textarea, .spotlight-card, .bento-cell, .segmented-btn, .dock-item, .crm-flow-node')) {
      ring.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, input, textarea, .spotlight-card, .bento-cell, .segmented-btn, .dock-item, .crm-flow-node')) {
      ring.classList.remove('cursor-hover');
    }
  });
}

// Spotlight Effect: Tracks mouse on card surface and lit edge (rAF throttled)
function initSpotlightEffect() {
  const cards = document.querySelectorAll('.spotlight-card, .bento-cell, .project-window');
  cards.forEach((card) => {
    let isTicking = false;
    card.addEventListener('mousemove', (e) => {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
          isTicking = false;
        });
        isTicking = true;
      }
    });
  });
}

// ==========================================================================
// HERO INTERACTIVE SHOWCASE HUB
// ==========================================================================
function initHeroInteractiveHub() {
  const tabBtns = document.querySelectorAll('.hub-tab-btn');
  const displayBox = document.getElementById('hub-display-content');
  if (!displayBox) return;

  const liveProjects = [
    {
      id: 'realestate',
      shortName: 'Real Estate',
      name: 'Real Estate Discovery Engine',
      tagline: 'Next.js 14 • Leaflet Maps • Dynamic Search',
      url: 'https://realestate-tawny-delta.vercel.app',
      desc: 'Interactive property marketplace featuring geolocation-based mapping, dynamic search filters, responsive modal inspections, and sub-second SSR performance.',
      metrics: ['Next.js 14 SSR', 'Leaflet Engine', '100% Mobile Ready'],
      status: 'Live on Vercel'
    },
    {
      id: 'kashmircart',
      shortName: 'Kashmir Cart',
      name: 'Kashmir Cart Artisan Store',
      tagline: 'Full-Stack React & Node.js • Custom Cart • Razorpay',
      url: 'https://kashmircart-six.vercel.app',
      desc: 'High-conversion direct-to-consumer store for authentic Kashmiri handicrafts with real-time reactive cart state, payment processing, and order management.',
      metrics: ['React + Node.js', 'Sub-40ms Cart Sync', '99 Lighthouse'],
      status: 'Live on Vercel'
    },
    {
      id: 'instagram',
      shortName: 'Instagram SaaS',
      name: 'Instagram DM Automation SaaS',
      tagline: 'Cloud Microservice • Webhook Ingestion • Next.js',
      url: 'https://instagram-dm-saas-six.vercel.app',
      desc: 'Cloud-native webhook processing system automating real-time direct message lead capture, qualification pipelines, and CRM contact synchronization.',
      metrics: ['Cloud Webhooks', 'Automated Funnels', 'REST Services'],
      status: 'Live on Vercel'
    },
    {
      id: 'boutique',
      shortName: 'Boutique',
      name: 'Boutique Vastraa Couture',
      tagline: 'Fashion E-Commerce • Responsive Catalog • Quick View',
      url: 'https://boutiique-vastraa.vercel.app',
      desc: 'Luxury ethnic wear e-commerce portal with fluid animations, dynamic multi-attribute product filters, lookbook showcases, and rapid image delivery.',
      metrics: ['Shopify Liquid + React', '98% PageSpeed', 'Instant Search'],
      status: 'Live on Vercel'
    }
  ];

  let activeProjectIndex = 0;

  function renderLiveAppsTab() {
    const proj = liveProjects[activeProjectIndex];
    const chipsHtml = liveProjects.map((p, idx) => `
      <button class="hub-project-chip ${idx === activeProjectIndex ? 'active' : ''}" data-idx="${idx}">
        ${p.shortName}
      </button>
    `).join('');

    displayBox.innerHTML = `
      <div class="space-y-3">
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          ${chipsHtml}
        </div>

        <div>
          <div class="flex items-center justify-between">
            <h4 class="font-display font-bold text-white text-xs sm:text-sm truncate">${proj.name}</h4>
            <span class="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950/70 border border-cyan-500/30 px-2 py-0.5 rounded-full shrink-0">${proj.status}</span>
          </div>
          <p class="text-[10px] font-mono text-cyan-300 mt-0.5">${proj.tagline}</p>
          <p class="text-xs text-slate-300 mt-2 leading-relaxed line-clamp-2">${proj.desc}</p>
        </div>

        <div class="flex flex-wrap gap-1.5 pt-1">
          ${proj.metrics.map(m => `<span class="hub-metric-pill"><i data-lucide="check" class="w-2.5 h-2.5 text-cyan-400"></i>${m}</span>`).join('')}
        </div>
      </div>

      <div class="pt-3 border-t border-white/10 flex items-center justify-between mt-2">
        <span class="text-[10px] font-mono text-slate-400 truncate max-w-[140px] sm:max-w-none">${proj.url.replace('https://', '')}</span>
        <a href="${proj.url}" target="_blank" rel="noopener noreferrer" class="btn-primary text-xs px-3.5 py-1.5 rounded-lg font-bold font-display flex items-center gap-1">
          <span>Launch Demo</span>
          <i data-lucide="external-link" class="w-3 h-3"></i>
        </a>
      </div>
    `;

    displayBox.querySelectorAll('.hub-project-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        activeProjectIndex = parseInt(chip.getAttribute('data-idx'), 10);
        renderLiveAppsTab();
        if (window.SoundFX) window.SoundFX.playClick();
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  function renderTechRadarTab() {
    displayBox.innerHTML = `
      <div class="space-y-3">
        <div class="flex items-center justify-between pb-1 border-b border-white/10">
          <span class="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
            <i data-lucide="cpu" class="w-3.5 h-3.5 text-cyan-400"></i> Full-Stack Proficiency Radar
          </span>
          <span class="text-[10px] font-mono text-emerald-400 font-bold">100% Production Verified</span>
        </div>

        <div class="space-y-2 text-xs font-mono">
          <div class="hub-radar-item">
            <div class="flex justify-between text-[11px]">
              <span class="text-slate-200 font-bold">Full-Stack Frontend (React, Next.js 14, TS)</span>
              <span class="text-cyan-400 font-bold">95%</span>
            </div>
            <div class="hub-radar-bar-bg"><div class="hub-radar-bar-fill" style="width: 95%;"></div></div>
          </div>

          <div class="hub-radar-item">
            <div class="flex justify-between text-[11px]">
              <span class="text-slate-200 font-bold">Backend & APIs (Node.js, Express, REST, JWT)</span>
              <span class="text-cyan-400 font-bold">90%</span>
            </div>
            <div class="hub-radar-bar-bg"><div class="hub-radar-bar-fill" style="width: 90%;"></div></div>
          </div>

          <div class="hub-radar-item">
            <div class="flex justify-between text-[11px]">
              <span class="text-slate-200 font-bold">Databases & Schema (MongoDB, Mongoose, MySQL)</span>
              <span class="text-cyan-400 font-bold">88%</span>
            </div>
            <div class="hub-radar-bar-bg"><div class="hub-radar-bar-fill" style="width: 88%;"></div></div>
          </div>

          <div class="hub-radar-item">
            <div class="flex justify-between text-[11px]">
              <span class="text-slate-200 font-bold">E-Commerce & Shopify (Liquid, Cart, Razorpay)</span>
              <span class="text-cyan-400 font-bold">92%</span>
            </div>
            <div class="hub-radar-bar-bg"><div class="hub-radar-bar-fill" style="width: 92%;"></div></div>
          </div>
        </div>
      </div>

      <div class="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono mt-2">
        <span class="text-slate-400">Need specific stack?</span>
        <a href="#skills" class="text-cyan-400 font-bold hover:underline flex items-center gap-1">
          <span>Explore All 24+ Technologies</span>
          <i data-lucide="arrow-right" class="w-3 h-3"></i>
        </a>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
  }

  function renderQubnixCrmTab() {
    displayBox.innerHTML = `
      <div class="space-y-2.5">
        <div class="flex items-center justify-between pb-1 border-b border-white/10">
          <div>
            <h4 class="font-display font-bold text-white text-xs">Associate Developer @ Qubnix</h4>
            <span class="text-[10px] font-mono text-cyan-400 font-bold">May 2026 – Present • Bhubaneswar</span>
          </div>
          <span class="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-950/70 text-indigo-300 border border-indigo-500/30">
            Active Role
          </span>
        </div>

        <div class="space-y-1.5 text-xs text-slate-300 leading-relaxed font-normal">
          <div class="flex items-start gap-2">
            <i data-lucide="shield-check" class="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5"></i>
            <span><strong class="text-white">Multi-Tenant CRM Architecture:</strong> Granular RBAC, audit logging & enterprise data isolation.</span>
          </div>
          <div class="flex items-start gap-2">
            <i data-lucide="zap" class="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5"></i>
            <span><strong class="text-white">Sub-40ms Microservices:</strong> High-throughput REST API endpoints backed by optimized MongoDB schemas.</span>
          </div>
          <div class="flex items-start gap-2">
            <i data-lucide="shopping-cart" class="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5"></i>
            <span><strong class="text-white">Commercial Delivery:</strong> Shipped 14+ complete web stores and 5+ customized Shopify platforms.</span>
          </div>
        </div>
      </div>

      <div class="pt-2.5 border-t border-white/10 flex items-center justify-between mt-2">
        <a href="#architecture" class="btn-primary text-xs px-3.5 py-1.5 rounded-lg font-bold font-display flex items-center gap-1.5 w-full justify-center">
          <span>View Interactive Architecture Flow</span>
          <i data-lucide="layers" class="w-3.5 h-3.5"></i>
        </a>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
  }

  // Handle Hub Tabs
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.getAttribute('data-tab');

      if (window.SoundFX) window.SoundFX.playClick();

      if (tab === 'live-apps') {
        renderLiveAppsTab();
      } else if (tab === 'tech-radar') {
        renderTechRadarTab();
      } else if (tab === 'qubnix-crm') {
        renderQubnixCrmTab();
      }
    });
  });

  // Default initial render
  renderLiveAppsTab();
}

// ==========================================================================
// INTERACTIVE CRM ARCHITECTURE FLOWCHART
// ==========================================================================
function initCrmArchitectureFlow() {
  const nodes = document.querySelectorAll('.crm-flow-node');
  const detailsTitle = document.getElementById('crm-flow-title');
  const detailsDesc = document.getElementById('crm-flow-desc');
  const detailsTech = document.getElementById('crm-flow-tech');
  if (!nodes.length || !detailsTitle) return;

  const nodeData = {
    ui: {
      title: 'Layer 1: Modular Client Interface (Next.js & React)',
      desc: 'Server-side rendered dashboard interface optimized for high-volume CRM data queries, role-based conditional sidebars, real-time lead tables, customer triage queues, and sub-second load times.',
      tech: ['React 18', 'Next.js 14 App Router', 'Tailwind CSS', 'Lucide React', 'TanStack Table']
    },
    auth: {
      title: 'Layer 2: API Gateway & Role-Based Access (RBAC)',
      desc: 'Centralized security layer managing JWT verification, granular role permissions (Admin, Manager, Staff), IP rate limiting middleware, CORS policies, and audited request verification.',
      tech: ['JWT (JSON Web Tokens)', 'Express Middleware', 'Bcrypt.js', 'Helmet.js', 'Rate Limiter']
    },
    services: {
      title: 'Layer 3: Node.js Microservices Core & Business Logic',
      desc: 'High-throughput Node.js microservices handling customer lifecycle transitions, automated follow-up scheduling, automated invoice generation, and asynchronous webhook dispatching.',
      tech: ['Node.js (LTS)', 'Express.js', 'Async/Await Queues', 'RESTful Controllers', 'Webhooks']
    },
    db: {
      title: 'Layer 4: Multi-Tenant MongoDB & Relational MySQL Cluster',
      desc: 'Hybrid data persistence layer: flexible document schemas for customer activity timelines and lead schemas in MongoDB, paired with strictly ACID-compliant MySQL tables for billing and transaction records.',
      tech: ['MongoDB (Mongoose)', 'MySQL 8.0', 'Compound Indexing', 'Schema Aggregations', 'Data Migrations']
    },
    cloud: {
      title: 'Layer 5: Edge Cloud Delivery & Automated CI/CD Pipelines',
      desc: 'Automated GitHub continuous deployment pipeline deploying frontend assets to Vercel global edge CDN with instant cache invalidation, and backend microservices containerized with Docker on cloud hosts.',
      tech: ['Vercel Edge CDN', 'Docker Container', 'Render / VPS', 'GitHub Actions', 'Zero-Downtime Deployments']
    }
  };

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');
      const key = node.getAttribute('data-node');
      const d = nodeData[key];
      if (d) {
        detailsTitle.textContent = d.title;
        detailsDesc.textContent = d.desc;
        detailsTech.innerHTML = d.tech
          .map(t => `<span class="px-2.5 py-1 text-[11px] font-mono font-semibold rounded-lg bg-slate-800 text-cyan-300 border border-white/10">${t}</span>`)
          .join('');
      }
      if (window.SoundFX) window.SoundFX.playClick();
    });
  });
}

// ==========================================================================
// DYNAMIC TYPING TEXT EFFECT
// ==========================================================================
function initDynamicTyping() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const phrases = [
    'Associate Developer @ Qubnix Technology',
    'Full-Stack Developer (React & Node.js)',
    'Enterprise CRM Systems Architect',
    'BCA Graduate • Utkal University (May 2026)',
    'E-Commerce & Custom Shopify Engineer'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 70;

  function type() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 35;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 75;
    }

    if (!isDeleting && charIndex === current.length) {
      isDeleting = true;
      typeSpeed = 1600;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 350;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

// Live Clock for Bhubaneswar, India
function initLiveClock() {
  const clockEl = document.getElementById('ist-clock');
  if (!clockEl) return;

  function update() {
    try {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      clockEl.textContent = new Intl.DateTimeFormat('en-US', options).format(now) + ' IST';
    } catch (e) {
      clockEl.textContent = 'UTC+5:30 (India)';
    }
  }

  update();
  setInterval(update, 1000);
}

// Stats Counter Animation
function initStatsCounters() {
  const counterEls = document.querySelectorAll('.counter-val');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counterEls.forEach((counter) => {
          const target = parseInt(counter.getAttribute('data-target') || '0', 10);
          const suffix = counter.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 1400;
          const stepTime = 30;
          const steps = duration / stepTime;
          const increment = target / steps;

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              counter.textContent = target + suffix;
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(count) + suffix;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('hero-stats');
  if (statsSection) observer.observe(statsSection);
}

// Bento Tabs
function initBentoInteractions() {
  const crmTabs = document.querySelectorAll('.crm-arch-tab');
  const crmContent = document.getElementById('crm-arch-content');

  const archDetails = {
    frontend: {
      title: 'Next.js & React Dashboard',
      desc: 'Modular component architecture with server-side rendering, role-based navigation, responsive tables, real-time data filtering, and optimized sub-second load times.'
    },
    backend: {
      title: 'Node.js & Express REST Microservices',
      desc: 'JWT authentication, role-based access control (RBAC), rate-limiting middleware, audit logging, and transactional webhook integrations.'
    },
    database: {
      title: 'Multi-Tenant MongoDB & MySQL Schema',
      desc: 'Optimized relational and document schemas, compound indexes for rapid query execution, automated backups, and transactional data integrity.'
    }
  };

  crmTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      crmTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const key = tab.getAttribute('data-layer');
      if (crmContent && archDetails[key]) {
        crmContent.innerHTML = `
          <h5 class="text-sm font-bold text-white mb-1 font-display">${archDetails[key].title}</h5>
          <p class="text-xs text-slate-300 leading-relaxed">${archDetails[key].desc}</p>
        `;
      }
    });
  });
}

// ==========================================================================
// TECHNICAL ARSENAL (SKILLS SECTION - 2 CARDS PER ROW ON MOBILE)
// ==========================================================================
function initSkillsSection() {
  const grid = document.getElementById('skills-grid');
  const tabs = document.querySelectorAll('.skills-tab-btn');
  if (!grid || typeof portfolioData === 'undefined') return;

  function renderSkills(category = 'all') {
    grid.innerHTML = '';
    let skillsList = [];

    if (category === 'all') {
      Object.keys(portfolioData.skills).forEach((key) => {
        skillsList = skillsList.concat(portfolioData.skills[key]);
      });
    } else if (portfolioData.skills[category]) {
      skillsList = portfolioData.skills[category];
    }

    skillsList.forEach((skill) => {
      const card = document.createElement('div');
      card.className = 'spotlight-card p-3 sm:p-5 group bg-slate-900/80 border border-white/10 flex flex-col justify-between';
      card.innerHTML = `
        <div class="spotlight-surface"></div>
        <div class="relative z-10 flex flex-col h-full justify-between">
          <div>
            <div class="flex items-center justify-between mb-2 sm:mb-3 gap-1">
              <div class="flex items-center gap-1.5 sm:gap-3 min-w-0">
                <div class="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-indigo-950/70 border border-indigo-500/30 flex items-center justify-center text-cyan-300 font-bold font-mono text-[10px] sm:text-sm group-hover:scale-105 transition-transform shrink-0">
                  ${skill.name.slice(0, 2).toUpperCase()}
                </div>
                <div class="min-w-0">
                  <h4 class="font-bold text-white text-xs sm:text-sm tracking-tight font-display truncate">${skill.name}</h4>
                  <span class="text-[9px] sm:text-xs text-slate-400 font-mono font-medium block truncate">${skill.tag}</span>
                </div>
              </div>
              <span class="text-[9px] sm:text-xs font-mono font-bold text-cyan-400 bg-cyan-950/70 px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full border border-cyan-500/30 shrink-0">${skill.level}%</span>
            </div>
            <p class="text-[10px] sm:text-xs text-slate-300 mb-2.5 sm:mb-4 leading-normal sm:leading-relaxed line-clamp-2">${skill.desc}</p>
          </div>
          <div class="w-full bg-slate-800 rounded-full h-1 sm:h-1.5 overflow-hidden mt-auto">
            <div class="bg-gradient-to-r from-indigo-500 via-cyan-400 to-purple-500 h-1 sm:h-1.5 rounded-full transition-all duration-1000 ease-out" style="width: ${skill.level}%"></div>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    initSpotlightEffect();
    if (window.lucide) window.lucide.createIcons();
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      renderSkills(tab.getAttribute('data-category'));
    });
  });

  renderSkills('all');
}

// ==========================================================================
// FEATURED PROJECTS SHOWCASE (2 CARDS PER ROW ON MOBILE)
// ==========================================================================
function initProjectsSection() {
  const grid = document.getElementById('projects-grid');
  const tabs = document.querySelectorAll('.project-tab-btn');
  if (!grid || typeof portfolioData === 'undefined') return;

  function renderProjects(filter = 'all') {
    grid.innerHTML = '';
    const projects = portfolioData.featuredProjects.filter((p) => {
      if (filter === 'all') return true;
      if (filter === 'ecommerce') return p.category.includes('E-Commerce') || p.category.includes('Shopify');
      if (filter === 'saas') return p.category.includes('SaaS') || p.category.includes('Full-Stack');
      if (filter === 'apps') return p.category.includes('Web Applications');
      return true;
    });

    projects.forEach((pr) => {
      const card = document.createElement('div');
      card.className = 'project-window flex flex-col justify-between group bg-slate-900/90 border border-white/10';
      
      const tagsHtml = pr.techStack
        .map((t) => `<span class="px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[11px] rounded-md sm:rounded-lg bg-slate-800 text-slate-200 border border-white/10 font-mono font-medium">${t}</span>`)
        .join(' ');

      const liveBtn = pr.liveUrl
        ? `<a href="${pr.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary text-[10px] sm:text-xs px-2 sm:px-3.5 py-1.5 rounded-lg sm:rounded-xl font-semibold flex items-center justify-center gap-1 font-display flex-1 sm:flex-initial">
            <i data-lucide="external-link" class="w-3 h-3 sm:w-3.5 sm:h-3.5"></i> <span>Live</span>
          </a>`
        : '';

      const gitBtn = pr.githubUrl
        ? `<a href="${pr.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-secondary text-[10px] sm:text-xs px-2 sm:px-3.5 py-1.5 rounded-lg sm:rounded-xl font-medium flex items-center justify-center gap-1 font-display flex-1 sm:flex-initial">
            <i data-lucide="github" class="w-3 h-3 sm:w-3.5 sm:h-3.5"></i> <span>Code</span>
          </a>`
        : '';

      card.innerHTML = `
        <div class="relative z-10 flex flex-col h-full justify-between">
          <div>
            <!-- Browser Header Bar -->
            <div class="browser-header px-2 sm:px-4 py-1.5 sm:py-2.5">
              <div class="browser-dots gap-1">
                <span class="browser-dot w-1.5 h-1.5 sm:w-2 sm:h-2 bg-rose-500"></span>
                <span class="browser-dot w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-500"></span>
                <span class="browser-dot w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500"></span>
              </div>
              <div class="browser-address-bar max-w-[85px] sm:max-w-[200px] text-[8px] sm:text-[10px] py-0.5 px-1 sm:px-2">
                <i data-lucide="lock" class="w-2 h-2 text-emerald-400 shrink-0"></i>
                <span class="truncate">${pr.liveUrl ? pr.liveUrl.replace('https://', '') : 'github.com/SumitBehera720'}</span>
              </div>
              <span class="text-[8px] sm:text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider hidden sm:inline">${pr.badge}</span>
            </div>

            <!-- Content Area -->
            <div class="p-3 sm:p-6">
              <div class="flex items-center justify-between mb-1.5 sm:mb-2 gap-1">
                <span class="text-[9px] sm:text-xs font-mono text-cyan-400 font-bold truncate max-w-[90px] sm:max-w-none">${pr.category}</span>
                <span class="text-[9px] sm:text-[11px] font-mono text-emerald-300 bg-emerald-950/70 px-1.5 py-0.5 rounded border border-emerald-500/30 font-bold shrink-0">● Active</span>
              </div>
              <h3 class="text-xs sm:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors font-display mb-1 sm:mb-2 line-clamp-2">
                ${pr.title}
              </h3>
              <p class="text-[10px] sm:text-xs text-slate-300 mb-2 sm:mb-5 leading-normal sm:leading-relaxed font-normal line-clamp-2 sm:line-clamp-none">
                ${pr.description}
              </p>
              <div class="flex flex-wrap gap-1 sm:gap-1.5 mb-2">
                ${tagsHtml}
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="p-2.5 sm:p-6 pt-2 sm:pt-3 border-t border-white/10 mt-auto flex items-center justify-between gap-1.5 sm:gap-3">
            <div class="flex items-center gap-1.5 sm:gap-2 w-full">
              ${liveBtn}
              ${gitBtn}
            </div>
            <button class="view-details-btn text-[10px] sm:text-xs font-mono text-slate-400 hover:text-cyan-400 items-center gap-1 transition-colors font-bold hidden sm:flex shrink-0" data-id="${pr.id}">
              Inspect <i data-lucide="arrow-right" class="w-3 h-3 sm:w-3.5 sm:h-3.5"></i>
            </button>
          </div>
        </div>
      `;

      grid.appendChild(card);
    });

    document.querySelectorAll('.view-details-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const pId = btn.getAttribute('data-id');
        openProjectModal(pId);
      });
    });

    initSpotlightEffect();
    if (window.lucide) window.lucide.createIcons();
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      renderProjects(tab.getAttribute('data-filter'));
    });
  });

  renderProjects('all');
}

// ==========================================================================
// PROFESSIONAL JOURNEY TIMELINE
// ==========================================================================
function initTimelineSection() {
  const container = document.getElementById('timeline-container');
  if (!container || typeof portfolioData === 'undefined') return;

  container.innerHTML = '';
  portfolioData.experience.forEach((exp) => {
    const item = document.createElement('div');
    item.className = 'relative pl-8 md:pl-10 pb-10 last:pb-2 group';

    const achievementsList = exp.achievements
      .map((a) => `<li class="flex items-start gap-2.5 text-xs text-slate-300"><i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5"></i> <span>${a}</span></li>`)
      .join('');

    item.innerHTML = `
      <div class="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-cyan-400 border-4 border-slate-900 shadow-md z-10 group-hover:scale-125 transition-transform"></div>
      <div class="absolute left-[6px] top-4 bottom-0 w-[2px] bg-slate-800"></div>

      <div class="spotlight-card p-6 bg-slate-900/80 border border-white/10">
        <div class="spotlight-surface"></div>
        <div class="relative z-10">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono font-bold text-indigo-300 px-3 py-1 rounded-full bg-indigo-950/70 border border-indigo-500/30 font-display">
                ${exp.period}
              </span>
              <span class="text-[11px] font-mono font-bold text-emerald-300 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-500/30">
                ${exp.badge || 'Verified'}
              </span>
            </div>
            <span class="text-xs font-mono text-slate-400 flex items-center gap-1 font-medium">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-cyan-400"></i> ${exp.location}
            </span>
          </div>
          <h3 class="text-lg font-bold text-white mb-0.5 font-display">${exp.role}</h3>
          <h4 class="text-xs font-bold text-cyan-400 mb-3 font-mono">${exp.company} • <span class="text-slate-400 font-normal">${exp.type}</span></h4>
          <p class="text-xs text-slate-300 mb-4 leading-relaxed font-normal">${exp.description}</p>
          <ul class="space-y-2">
            ${achievementsList}
          </ul>
        </div>
      </div>
    `;

    container.appendChild(item);
  });

  initSpotlightEffect();
  if (window.lucide) window.lucide.createIcons();
}

// ==========================================================================
// PROJECT DETAIL MODAL (DARK MODE)
// ==========================================================================
function initModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close');
  if (!modal || !closeBtn) return;

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

function openProjectModal(projectId) {
  const modal = document.getElementById('project-modal');
  const content = document.getElementById('modal-content');
  if (!modal || !content || typeof portfolioData === 'undefined') return;

  const project = portfolioData.featuredProjects.find((p) => p.id === projectId);
  if (!project) return;

  const highlights = project.highlights
    .map((h) => `<li class="flex items-start gap-2 text-xs text-slate-300"><i data-lucide="zap" class="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5"></i><span>${h}</span></li>`)
    .join('');

  const techBadges = project.techStack
    .map((t) => `<span class="px-3 py-1 rounded-full bg-slate-800 border border-white/10 text-slate-200 text-xs font-mono font-medium">${t}</span>`)
    .join(' ');

  content.innerHTML = `
    <div class="p-6 md:p-8">
      <div class="flex items-center justify-between mb-4">
        <span class="text-xs font-mono uppercase tracking-wider text-cyan-300 bg-cyan-950/70 px-3 py-1 rounded-full border border-cyan-500/30 font-bold">
          ${project.badge}
        </span>
        <span class="text-xs text-slate-400 font-mono font-medium">${project.category}</span>
      </div>

      <h2 class="text-2xl font-bold text-white mb-2 font-display">${project.title}</h2>
      <p class="text-slate-300 text-xs leading-relaxed mb-6 font-normal">${project.description}</p>

      <div class="mb-5">
        <h4 class="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-bold">Architectural Highlights</h4>
        <ul class="space-y-2">
          ${highlights}
        </ul>
      </div>

      <div class="mb-7">
        <h4 class="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-bold">Technologies Utilized</h4>
        <div class="flex flex-wrap gap-2">
          ${techBadges}
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
        ${
          project.liveUrl
            ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary text-xs px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 font-display">
                <i data-lucide="external-link" class="w-4 h-4"></i> Launch Live Application
              </a>`
            : ''
        }
        ${
          project.githubUrl
            ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-secondary text-xs px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 font-display">
                <i data-lucide="github" class="w-4 h-4"></i> View Source Repository
              </a>`
            : ''
        }
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';

  if (window.lucide) window.lucide.createIcons();
}

function closeModal() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
}

// ==========================================================================
// CONTACT FORM & COPY ACTIONS
// ==========================================================================
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const project = document.getElementById('contact-project').value;
    const message = document.getElementById('contact-message').value;

    if (typeof confetti === 'function') {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }

    if (window.SoundFX) {
      window.SoundFX.playSuccess();
    }

    const mailtoSubject = encodeURIComponent(`Project Inquiry: ${project} - From ${name}`);
    const mailtoBody = encodeURIComponent(
      `Hello Sumit,\n\nMy name is ${name} (${email}).\n\nProject Scope & Message:\n${message}\n\nLooking forward to speaking!`
    );

    window.location.href = `mailto:beherasumit772@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    const feedback = document.getElementById('contact-feedback');
    if (feedback) {
      feedback.classList.remove('hidden');
      setTimeout(() => {
        feedback.classList.add('hidden');
      }, 6000);
    }
  });
}

function initCopyEmail() {
  const copyBtns = document.querySelectorAll('.copy-email-btn');
  const toast = document.getElementById('toast');
  const email = 'beherasumit772@gmail.com';

  copyBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(email).then(() => {
        if (window.SoundFX) window.SoundFX.playPop();
        if (toast) {
          toast.classList.remove('translate-y-20', 'opacity-0');
          toast.classList.add('translate-y-0', 'opacity-100');
          setTimeout(() => {
            toast.classList.add('translate-y-20', 'opacity-0');
            toast.classList.remove('translate-y-0', 'opacity-100');
          }, 3000);
        }
      });
    });
  });
}

// ==========================================================================
// SCROLL SPY & DOCK NAVIGATION
// ==========================================================================
function initScrollSpyAndDock() {
  const nav = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const dockItems = document.querySelectorAll('.dock-item');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }

    let current = '';
    sections.forEach((section) => {
      const top = section.offsetTop - 150;
      const height = section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('text-cyan-400', 'font-bold');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-cyan-400', 'font-bold');
      }
    });

    dockItems.forEach((item) => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  }, { passive: true });

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

// Scroll Progress Indicator Bar
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress-bar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${scrolled}%`;
  }, { passive: true });
}

// Scroll Reveal Observer
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  reveals.forEach((el) => observer.observe(el));
}
