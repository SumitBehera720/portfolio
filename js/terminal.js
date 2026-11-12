// Interactive Cyber Terminal (Sumit-CLI)
(function () {
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  const terminalBody = document.querySelector('.terminal-body');

  if (!terminalInput || !terminalOutput) return;

  const history = [];
  let historyIndex = -1;

  const commands = {
    help: () => {
      return `
<span class="term-cyan font-bold">AVAILABLE COMMANDS:</span>
  <span class="term-green">about</span>       - Brief biography, focus areas & background
  <span class="term-green">skills</span>      - Comprehensive tech stack & proficiencies
  <span class="term-green">projects</span>    - Key flagship projects with live production links
  <span class="term-green">stats</span>       - Engineering track record & impact metrics
  <span class="term-green">experience</span>  - Career timeline & enterprise CRM work
  <span class="term-green">contact</span>     - Direct contact info, socials & email
  <span class="term-green">sudo hire</span>   - Unlock instant collaboration / hiring flow
  <span class="term-green">theme</span>       - Switch terminal palette (<span class="term-purple">cyber</span> | <span class="term-purple">matrix</span> | <span class="term-purple">amber</span>)
  <span class="term-green">clear</span>       - Clear current console output
`;
    },

    about: () => {
      const p = portfolioData.personal;
      return `
<span class="term-yellow font-bold">${p.name}</span> - ${p.role} | Associate Developer @ ${p.company}
<span class="term-muted">Tenure:</span> ${p.tenure}
<span class="term-muted">Education:</span> ${p.educationHighlight}
<span class="term-muted">Location:</span> ${p.location}
<span class="term-muted">Status:</span> <span class="term-green">● ${p.status}</span>

${p.bio}
`;
    },

    skills: () => {
      return `
<span class="term-cyan font-bold">CORE TECHNICAL MATRIX:</span>
  <span class="term-purple font-semibold">[Frontend]</span>
    React.js (92%), Next.js (88%), TypeScript (86%), JavaScript ES6+ (94%), Tailwind CSS (95%), HTML5/CSS3 (96%)
  <span class="term-purple font-semibold">[Backend]</span>
    Node.js (90%), Express.js (90%), PHP (82%), Python (78%), RESTful APIs (92%)
  <span class="term-purple font-semibold">[Databases]</span>
    MongoDB (90%), MySQL (85%), PostgreSQL (82%), Firebase (85%), Prisma ORM (80%)
  <span class="term-purple font-semibold">[E-Commerce & CMS]</span>
    Shopify Liquid (90%), Custom Shopify Themes (92%), WordPress / WooCommerce (88%)
  <span class="term-purple font-semibold">[Cloud & Tools]</span>
    Git/GitHub, Docker, Vercel, Netlify, Render, Postman, Figma, Blender 3D
`;
    },

    projects: () => {
      const projects = portfolioData.featuredProjects;
      let out = `<span class="term-cyan font-bold">FLAGSHIP PRODUCTION PROJECTS:</span>\n`;
      projects.slice(0, 6).forEach((pr, i) => {
        out += `  <span class="term-green font-bold">${i + 1}. ${pr.title}</span>\n`;
        out += `     <span class="term-muted">Category:</span> ${pr.category} | <span class="term-muted">Stack:</span> ${pr.techStack.join(', ')}\n`;
        if (pr.liveUrl) {
          out += `     <span class="term-cyan">Live:</span> <a href="${pr.liveUrl}" target="_blank" class="term-link underline">${pr.liveUrl}</a>\n`;
        }
      });
      out += `\n<span class="term-muted">Type <span class="term-green">experience</span> or <span class="term-green">contact</span> to connect directly.</span>`;
      return out;
    },

    repos: () => {
      const repos = portfolioData.allRepositories;
      let out = `<span class="term-cyan font-bold">PUBLIC GITHUB REPOSITORIES (${repos.length} Total):</span>\n`;
      repos.slice(0, 10).forEach((r) => {
        out += `  • <span class="term-green font-semibold">${r.name}</span> [${r.lang || 'N/A'}] - ${r.desc}\n`;
        if (r.live) {
          out += `    └─ <span class="term-cyan">Deploy:</span> <a href="${r.live}" target="_blank" class="term-link">${r.live}</a>\n`;
        }
      });
      out += `\n<span class="term-muted">Visit GitHub profile directly: <a href="https://github.com/SumitBehera720" target="_blank" class="term-link">https://github.com/SumitBehera720</a></span>`;
      return out;
    },

    stats: () => {
      return `
<span class="term-cyan font-bold">ENGINEERING TRACK RECORD:</span>
  ⚡ <span class="term-yellow">14+</span> E-Commerce Websites delivered to real clients
  🛍️ <span class="term-yellow">5+</span> Bespoke Shopify Stores customized & launched
  📦 <span class="term-yellow">36</span> Public GitHub Repositories
  🏢 <span class="term-yellow">1</span> End-to-End Enterprise CRM Platform (Frontend, Backend, DB)
  🌟 <span class="term-yellow">100%</span> Client Delivery & Code Quality Standard
`;
    },

    experience: () => {
      const exp = portfolioData.experience;
      let out = `<span class="term-cyan font-bold">PROFESSIONAL TIMELINE:</span>\n`;
      exp.forEach((e) => {
        out += `  <span class="term-yellow font-bold">[${e.period}]</span> <span class="term-green">${e.role}</span> @ ${e.company}\n`;
        out += `  <span class="term-muted">${e.description}</span>\n`;
        e.achievements.forEach((ach) => {
          out += `    - ${ach}\n`;
        });
        out += `\n`;
      });
      return out;
    },

    contact: () => {
      const s = portfolioData.personal.socials;
      return `
<span class="term-cyan font-bold">CONTACT & SOCIAL NETWORKS:</span>
  📧 Email:     <a href="mailto:beherasumit772@gmail.com" class="term-link">beherasumit772@gmail.com</a>
  💼 LinkedIn:  <a href="${s.linkedin}" target="_blank" class="term-link">${s.linkedin}</a>
  🐙 GitHub:    <a href="${s.github}" target="_blank" class="term-link">${s.github}</a>
  📸 Instagram: <a href="${s.instagram}" target="_blank" class="term-link">${s.instagram}</a>
  📍 Location:  Bhubaneswar, Odisha, India
`;
    },

    'sudo hire': () => {
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      if (window.SoundFX) {
        window.SoundFX.playSuccess();
      }
      setTimeout(() => {
        window.location.href = 'mailto:beherasumit772@gmail.com?subject=Opportunity%20Discussion%20with%20Sumit%20Behera';
      }, 1000);

      return `
<span class="term-green font-bold">ACCESS GRANTED: SUMIT BEHERA AUTHORIZATION UNLOCKED!</span>
🎉 Launching email client to <span class="term-yellow">beherasumit772@gmail.com</span>...
Ready for full-time engineering roles, freelance builds, and contract architectural projects.
`;
    },

    theme: (arg) => {
      const term = document.querySelector('.terminal-card');
      if (!term) return 'Terminal element not found';

      term.classList.remove('theme-cyber', 'theme-matrix', 'theme-amber');
      if (arg === 'matrix') {
        term.classList.add('theme-matrix');
        return '<span class="term-green">Theme switched to Matrix Green.</span>';
      } else if (arg === 'amber') {
        term.classList.add('theme-amber');
        return '<span class="term-yellow">Theme switched to Amber CRT.</span>';
      } else {
        term.classList.add('theme-cyber');
        return '<span class="term-cyan">Theme switched to Cyber Cyan (Default).</span>';
      }
    },

    clear: () => {
      terminalOutput.innerHTML = '';
      return '';
    }
  };

  function appendOutput(content) {
    if (!content) return;
    const entry = document.createElement('div');
    entry.className = 'terminal-entry';
    entry.innerHTML = content;
    terminalOutput.appendChild(entry);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function handleCommand(rawCmd) {
    const cmdTrimmed = rawCmd.trim();
    if (!cmdTrimmed) return;

    // Add to history
    history.push(cmdTrimmed);
    historyIndex = history.length;

    // Echo input
    const echo = document.createElement('div');
    echo.className = 'terminal-echo flex items-center gap-2 mt-2';
    echo.innerHTML = `<span class="term-prompt">sumit@dev:~$</span> <span class="text-white font-mono">${escapeHtml(cmdTrimmed)}</span>`;
    terminalOutput.appendChild(echo);

    const parts = cmdTrimmed.split(' ');
    const baseCmd = parts[0].toLowerCase();
    const subCmd = parts.length > 1 ? parts[1].toLowerCase() : '';
    const fullCmd = `${baseCmd} ${subCmd}`.trim();

    let response = '';

    if (fullCmd === 'sudo hire') {
      response = commands['sudo hire']();
    } else if (baseCmd === 'theme') {
      response = commands.theme(subCmd);
    } else if (commands[baseCmd]) {
      response = commands[baseCmd]();
    } else {
      response = `<span class="term-red">Command not recognized: '${escapeHtml(cmdTrimmed)}'.</span> Type <span class="term-green cursor-pointer" onclick="window.runTerminalCommand('help')">'help'</span> for available commands.`;
    }

    if (response) {
      appendOutput(response);
    }

    terminalInput.value = '';
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Event Listeners
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleCommand(terminalInput.value);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0 && historyIndex > 0) {
        historyIndex--;
        terminalInput.value = history[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex++;
        terminalInput.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        terminalInput.value = '';
      }
    }
  });

  // Focus input when clicking anywhere inside terminal body
  terminalBody.addEventListener('click', () => {
    terminalInput.focus();
  });

  // Expose global helper to run command from click triggers
  window.runTerminalCommand = (cmd) => {
    if (terminalInput) {
      terminalInput.value = cmd;
      handleCommand(cmd);
      const termSection = document.getElementById('terminal');
      if (termSection) {
        termSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Initial welcome message
  setTimeout(() => {
    appendOutput(`
<span class="term-cyan font-bold">Sumit-CLI v2.4 [Initialized]</span>
Type <span class="term-green font-bold cursor-pointer" onclick="window.runTerminalCommand('help')">'help'</span> to explore interactive commands or <span class="term-yellow font-bold cursor-pointer" onclick="window.runTerminalCommand('sudo hire')">'sudo hire'</span> to start collaborating.
`);
  }, 400);
})();

