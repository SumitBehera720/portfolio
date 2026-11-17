// Main Application Controller for Sumit Behera's Portfolio
// Liquid Glass Edition: Geist Typography, Name Typing Zoom Intro & Dark/Light Theme

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Theme Engine (Dark & Light)
  initThemeEngine();

  // 2. Initialize Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 3. Initialize Cinematic Name Typing & Zoom Intro
  initNameTypingIntro();

  // 4. Initialize Storytelling HUD & Scroll Progress
  initStorytellingHUD();
  initScrollProgress();
  initScrollSpyAndDock();
  initScrollReveal();

  // 5. Initialize Components & Liquid Glass Interactions
  initCustomCursor();
  initStatsCounters();
  initSpotlightEffect();
  initCrmArchitectureFlow();
  initSkillsSection();
  initProjectsSection();
  initTimelineSection();
  initModal();
  initContactForm();
  initCopyEmail();
});

// ==========================================================================
// 1. THEME ENGINE: SMOOTH DARK & LIGHT MODE WITH PERSISTENCE
// ==========================================================================
function initThemeEngine() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const html = document.documentElement;

  // Saved user choice -> system preference -> default dark
  const savedTheme = localStorage.getItem('sumit_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'dark');

  if (initialTheme === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isDark = html.classList.toggle('dark');
      localStorage.setItem('sumit_theme', isDark ? 'dark' : 'light');
      
      if (window.SoundFX) window.SoundFX.playClick();
      if (window.lucide) window.lucide.createIcons();
    });
  }
}

// ==========================================================================
// 2. CINEMATIC INTRO: ONLY NAME TYPING & ZOOM ENTRY TO WEBSITE
// ==========================================================================
function initNameTypingIntro() {
  const overlay = document.getElementById('intro-overlay');
  const nameEl = document.getElementById('intro-typed-name');
  if (!overlay || !nameEl) return;

  const targetName = 'Sumit Behera';
  let charIdx = 0;
  let isZoomed = false;

  function triggerZoomEntry() {
    if (isZoomed) return;
    isZoomed = true;
    
    // Zoom expansion transition
    overlay.classList.add('zoom-entry');
    sessionStorage.setItem('sumit_intro_done', 'true');

    if (window.SoundFX) window.SoundFX.playSuccess();

    setTimeout(() => {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }, 850);
  }

  // Click anywhere or press ESC to instantly enter
  overlay.addEventListener('click', triggerZoomEntry);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !isZoomed) {
      triggerZoomEntry();
    }
  });

  // Expose replay intro function globally
  window.replayIntro = function() {
    isZoomed = false;
    overlay.style.display = 'flex';
    overlay.classList.remove('zoom-entry');
    nameEl.textContent = '';
    charIdx = 0;
    typeLetters();
  };

  // Letter by letter typing
  function typeLetters() {
    if (charIdx < targetName.length) {
      nameEl.textContent += targetName.charAt(charIdx);
      charIdx++;
      setTimeout(typeLetters, 95);
    } else {
      // Finished typing: short cinematic pause then zoom entry
      setTimeout(triggerZoomEntry, 380);
    }
  }

  // Fast check: If visitor already saw the intro in the current session, smooth fast bypass
  if (sessionStorage.getItem('sumit_intro_done') === 'true') {
    nameEl.textContent = targetName;
    setTimeout(triggerZoomEntry, 180);
  } else {
    document.body.style.overflow = 'hidden';
    setTimeout(typeLetters, 150);
  }
}

// ==========================================================================
// 3. SCROLL STORYTELLING HUD & ACTIVE CHAPTER OBSERVER
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
// 4. PRECISION CURSOR
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
    if (e.target.closest('a, button, input, textarea, .liquid-glass-card, .project-window, .crm-flow-node, .segmented-btn, .dock-item')) {
      ring.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, input, textarea, .liquid-glass-card, .project-window, .crm-flow-node, .segmented-btn, .dock-item')) {
      ring.classList.remove('cursor-hover');
    }
  });
}

// ==========================================================================
// 5. LIQUID GLASS SPOTLIGHT REFRACTION EFFECT
// ==========================================================================
function initSpotlightEffect() {
  const cards = document.querySelectorAll('.liquid-glass-card, .project-window');
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
// 6. STATS COUNTERS
// ==========================================================================
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

// ==========================================================================
// 7. CRM ARCHITECTURE FLOWCHART
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
          .map(t => `<span class="px-2.5 py-1 text-[11px] font-mono font-semibold rounded-lg liquid-glass-pill text-cyan-400">${t}</span>`)
          .join('');
      }
      if (window.SoundFX) window.SoundFX.playClick();
    });
  });
}

// ==========================================================================
// 8. TECHNICAL ARSENAL (2 CARDS PER ROW ON MOBILE)
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
      card.className = 'liquid-glass-card p-3.5 sm:p-5 group flex flex-col justify-between';
      card.innerHTML = `
        <div class="spotlight-surface"></div>
        <div class="relative z-10 flex flex-col h-full justify-between">
          <div>
            <div class="flex items-center justify-between mb-2 sm:mb-3 gap-1">
              <div class="flex items-center gap-1.5 sm:gap-3 min-w-0">
                <div class="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl liquid-glass-pill flex items-center justify-center text-cyan-400 font-bold font-mono text-[10px] sm:text-sm group-hover:scale-105 transition-transform shrink-0">
                  ${skill.name.slice(0, 2).toUpperCase()}
                </div>
                <div class="min-w-0">
                  <h4 class="font-bold text-xs sm:text-sm tracking-tight font-display truncate">${skill.name}</h4>
                  <span class="text-[9px] sm:text-xs opacity-65 font-mono font-medium block truncate">${skill.tag}</span>
                </div>
              </div>
              <span class="text-[9px] sm:text-xs font-mono font-bold text-cyan-400 liquid-glass-pill px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full shrink-0">${skill.level}%</span>
            </div>
            <p class="text-[10px] sm:text-xs opacity-75 mb-2.5 sm:mb-4 leading-normal sm:leading-relaxed line-clamp-2">${skill.desc}</p>
          </div>
          <div class="w-full bg-white/10 dark:bg-white/5 rounded-full h-1 sm:h-1.5 overflow-hidden mt-auto">
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
// 9. FEATURED PROJECTS (2 CARDS PER ROW ON MOBILE)
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
      card.className = 'project-window flex flex-col justify-between group';
      
      const tagsHtml = pr.techStack
        .map((t) => `<span class="px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[11px] rounded-md sm:rounded-lg liquid-glass-pill font-mono font-medium">${t}</span>`)
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
              <span class="text-[8px] sm:text-[10px] font-mono opacity-65 font-bold uppercase tracking-wider hidden sm:inline">${pr.badge}</span>
            </div>

            <!-- Content Area -->
            <div class="p-3 sm:p-6">
              <div class="flex items-center justify-between mb-1.5 sm:mb-2 gap-1">
                <span class="text-[9px] sm:text-xs font-mono text-cyan-400 font-bold truncate max-w-[90px] sm:max-w-none">${pr.category}</span>
                <span class="text-[9px] sm:text-[11px] font-mono text-emerald-400 liquid-glass-pill px-1.5 py-0.5 rounded font-bold shrink-0">● Active</span>
              </div>
              <h3 class="text-xs sm:text-lg font-bold group-hover:text-cyan-400 transition-colors font-display mb-1 sm:mb-2 line-clamp-2">
                ${pr.title}
              </h3>
              <p class="text-[10px] sm:text-xs opacity-80 mb-2 sm:mb-5 leading-normal sm:leading-relaxed font-normal line-clamp-2 sm:line-clamp-none">
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
            <button class="view-details-btn text-[10px] sm:text-xs font-mono opacity-70 hover:opacity-100 items-center gap-1 transition-opacity font-bold hidden sm:flex shrink-0" data-id="${pr.id}">
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
// 10. TIMELINE SECTION
// ==========================================================================
function initTimelineSection() {
  const container = document.getElementById('timeline-container');
  if (!container || typeof portfolioData === 'undefined') return;

  container.innerHTML = '';
  portfolioData.experience.forEach((exp) => {
    const item = document.createElement('div');
    item.className = 'relative pl-8 md:pl-10 pb-10 last:pb-2 group';

    const achievementsList = exp.achievements
      .map((a) => `<li class="flex items-start gap-2.5 text-xs opacity-85"><i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5"></i> <span>${a}</span></li>`)
      .join('');

    item.innerHTML = `
      <div class="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-cyan-400 border-4 border-slate-900 shadow-md z-10 group-hover:scale-125 transition-transform"></div>
      <div class="absolute left-[6px] top-4 bottom-0 w-[2px] bg-slate-800"></div>

      <div class="liquid-glass-card p-6">
        <div class="spotlight-surface"></div>
        <div class="relative z-10">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono font-bold text-indigo-400 px-3 py-1 rounded-full liquid-glass-pill font-display">
                ${exp.period}
              </span>
              <span class="text-[11px] font-mono font-bold text-emerald-400 liquid-glass-pill px-2 py-0.5 rounded">
                ${exp.badge || 'Verified'}
              </span>
            </div>
            <span class="text-xs font-mono opacity-70 flex items-center gap-1 font-medium">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-cyan-400"></i> ${exp.location}
            </span>
          </div>
          <h3 class="text-lg font-bold mb-0.5 font-display">${exp.role}</h3>
          <h4 class="text-xs font-bold text-cyan-400 mb-3 font-mono">${exp.company} • <span class="opacity-70 font-normal">${exp.type}</span></h4>
          <p class="text-xs opacity-85 mb-4 leading-relaxed font-normal">${exp.description}</p>
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
// 11. MODAL (LIQUID GLASS)
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
    .map((h) => `<li class="flex items-start gap-2 text-xs opacity-85"><i data-lucide="zap" class="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5"></i><span>${h}</span></li>`)
    .join('');

  const techBadges = project.techStack
    .map((t) => `<span class="px-3 py-1 rounded-full liquid-glass-pill text-xs font-mono font-medium">${t}</span>`)
    .join(' ');

  content.innerHTML = `
    <div class="p-6 md:p-8">
      <div class="flex items-center justify-between mb-4">
        <span class="text-xs font-mono uppercase tracking-wider text-cyan-400 liquid-glass-pill px-3 py-1 rounded-full font-bold">
          ${project.badge}
        </span>
        <span class="text-xs opacity-70 font-mono font-medium">${project.category}</span>
      </div>

      <h2 class="text-2xl font-bold mb-2 font-display">${project.title}</h2>
      <p class="text-xs opacity-85 leading-relaxed mb-6 font-normal">${project.description}</p>

      <div class="mb-5">
        <h4 class="text-xs font-mono uppercase tracking-wider opacity-70 mb-3 font-bold">Architectural Highlights</h4>
        <ul class="space-y-2">
          ${highlights}
        </ul>
      </div>

      <div class="mb-7">
        <h4 class="text-xs font-mono uppercase tracking-wider opacity-70 mb-3 font-bold">Technologies Utilized</h4>
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
// 12. CONTACT FORM & COPY ACTIONS
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
// 13. SCROLL SPY & DOCK NAVIGATION
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
      link.classList.remove('text-indigo-400', 'font-bold');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-indigo-400', 'font-bold');
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
