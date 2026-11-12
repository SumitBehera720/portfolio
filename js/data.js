// Portfolio Data for Sumit Behera
const portfolioData = {
  personal: {
    name: "Sumit Behera",
    brandName: "SUMIT BEHERA",
    handle: "SumitBehera720",
    role: "Full-Stack Developer",
    title: "Full-Stack Developer",
    companyRole: "Associate Developer",
    company: "Qubnix Technology",
    tenure: "May 2026 – Present",
    educationHighlight: "BCA Graduate, Utkal University (Graduated May 2026)",
    location: "Bhubaneswar, Odisha, India",
    email: "beherasumit772@gmail.com",
    avatar: "assets/avatar.png",
    fallbackAvatar: "https://avatars.githubusercontent.com/u/198417596?v=4",
    bio: "Full-Stack Developer working as an Associate Developer at Qubnix Technology (May 2026 – Present), joining directly after graduating with a Bachelor of Computer Applications (BCA) from Utkal University in May 2026. Specializing in enterprise CRM systems, scalable full-stack applications with React, Next.js, Node.js, and modern cloud architecture.",
    status: "Full-Stack Developer • Associate Developer @ Qubnix Technology",
    socials: {
      github: "https://github.com/SumitBehera720",
      linkedin: "https://www.linkedin.com/in/sumit-behera-1869b6347/",
      instagram: "https://instagram.com/mr_sumit_07._",
      email: "mailto:beherasumit772@gmail.com"
    },
    metrics: [
      { label: "E-Commerce Stores Delivered", value: "14+", icon: "shopping-bag", change: "Production" },
      { label: "Shopify Custom Stores", value: "5+", icon: "store", change: "Liquid Themes" },
      { label: "Current Company", value: "Qubnix", icon: "briefcase", change: "May 2026 – Present" },
      { label: "Enterprise CRM Systems", value: "End-to-End", icon: "layers", change: "Full Architecture" }
    ]
  },

  skills: {
    frontend: [
      { name: "React.js", level: 94, tag: "Expert", desc: "Hooks, Context, Redux Toolkit, Virtual DOM, Micro-frontends" },
      { name: "Next.js 14", level: 90, tag: "Advanced", desc: "App Router, SSR, SSG, Server Actions, API routes" },
      { name: "TypeScript", level: 88, tag: "Advanced", desc: "Strict typing, Generics, Interfaces, Type safety" },
      { name: "JavaScript (ES6+)", level: 95, tag: "Expert", desc: "Async/Await, Closures, Event Loop, DOM APIs" },
      { name: "Tailwind CSS", level: 96, tag: "Expert", desc: "Modern design systems, Responsive UI, Flexbox, Grid" },
      { name: "HTML5 & CSS3", level: 96, tag: "Expert", desc: "Semantic tags, Responsive layouts, CSS Keyframe Animations" }
    ],
    backend: [
      { name: "Node.js", level: 92, tag: "Core", desc: "Event-driven runtime, Express server architecture, Streams" },
      { name: "Express.js", level: 92, tag: "Core", desc: "REST APIs, Middleware pipelines, JWT Authentication, Controllers" },
      { name: "REST APIs", level: 94, tag: "Expert", desc: "API design, Postman testing, Webhooks, Token auth" },
      { name: "PHP", level: 82, tag: "Proficient", desc: "Backend scripts, OOP, Custom API endpoints, WordPress" },
      { name: "Python", level: 78, tag: "Proficient", desc: "Backend scripting, Automation, FastAPI/Flask basics" }
    ],
    databases: [
      { name: "MongoDB", level: 92, tag: "Core", desc: "Mongoose ODM, Document models, Aggregation pipelines, Indexing" },
      { name: "MySQL", level: 86, tag: "Advanced", desc: "Relational schema design, Complex joins, Indexing, Transactions" },
      { name: "PostgreSQL", level: 84, tag: "Proficient", desc: "Relational modeling, Constraints, SQL Queries" },
      { name: "Firebase", level: 85, tag: "Advanced", desc: "Firestore, Realtime DB, Firebase Auth, Cloud Storage" }
    ],
    ecommerce: [
      { name: "Shopify Liquid", level: 92, tag: "Expert", desc: "Custom themes, Sections, Blocks, App integrations" },
      { name: "Shopify Store Architecture", level: 92, tag: "Expert", desc: "Checkout customization, Collections, SEO, Speed tuning" },
      { name: "WordPress & WooCommerce", level: 88, tag: "Advanced", desc: "Custom theme creation, Plugin tailoring, Payment gateways" },
      { name: "Payment Gateway APIs", level: 86, tag: "Advanced", desc: "Stripe, Razorpay, COD, Webhook payment sync" }
    ],
    cloudAndTools: [
      { name: "Git & GitHub", level: 95, tag: "Core", desc: "Branching workflows, Pull requests, Merge conflict handling" },
      { name: "Vercel / Netlify / Render", level: 94, tag: "Advanced", desc: "Automated CI/CD deployments, DNS, Environment variables" },
      { name: "Docker", level: 80, tag: "Proficient", desc: "Containerization, Dockerfile, Container orchestration basics" },
      { name: "Postman", level: 92, tag: "Expert", desc: "API testing collections, Mock servers, Environment configs" },
      { name: "Figma & UI Design", level: 88, tag: "Advanced", desc: "Wireframing, UI prototyping, Component libraries" }
    ]
  },

  featuredProjects: [
    {
      id: "realestate",
      title: "Luxury Real Estate Discovery Platform",
      category: "Full-Stack & SaaS",
      badge: "TypeScript / React",
      description: "An ultra-modern, interactive real estate portal offering property showcases, neighborhood exploration, dynamic price filtering, and agent inquiry scheduling.",
      techStack: ["TypeScript", "Next.js", "Tailwind CSS", "Vercel", "Lucide Icons"],
      liveUrl: "https://realestate-tawny-delta.vercel.app",
      githubUrl: "https://github.com/SumitBehera720/realestate",
      featured: true,
      highlights: [
        "Interactive property search with multi-parameter filter criteria",
        "Fluid responsiveness with modern clean aesthetics",
        "Optimized image delivery and dynamic property specification sheets"
      ]
    },
    {
      id: "kashmir-cart",
      title: "Kashmir Cart - Artisan E-Commerce Storefront",
      category: "E-Commerce & Shopify",
      badge: "Flagship E-Commerce",
      description: "Authentic handicraft & heritage product marketplace designed to bring authentic Kashmiri craftsmanship to global buyers with rich storytelling.",
      techStack: ["TypeScript", "React", "Tailwind CSS", "Commerce API", "Vercel"],
      liveUrl: "https://kashmircart-six.vercel.app",
      githubUrl: "https://github.com/SumitBehera720/kashmircart",
      featured: true,
      highlights: [
        "Comprehensive cart management and dynamic currency calculations",
        "Curated artisanal categories (Pashmina, Walnut Wood, Carpets)",
        "Mobile-first checkout UX optimized for conversion"
      ]
    },
    {
      id: "instagram-dm-saas",
      title: "Instagram DM Automation SaaS Platform",
      category: "Full-Stack & SaaS",
      badge: "SaaS Automation",
      description: "Direct-message automation platform for creators and businesses to streamline lead capture, auto-reply triggers, and conversational funnels.",
      techStack: ["TypeScript", "Next.js", "Node.js", "Tailwind CSS", "REST API"],
      liveUrl: "https://instagram-dm-saas-six.vercel.app",
      githubUrl: "https://github.com/SumitBehera720/instagram-dm-saas",
      featured: true,
      highlights: [
        "Automation workflow builder and message sequence scheduler",
        "Real-time analytics tracking response rates and customer engagement",
        "Secure credential storage and webhook message receiver"
      ]
    },
    {
      id: "boutique-vastraa",
      title: "Boutique Vastraa - Ethnic Couture Platform",
      category: "E-Commerce & Shopify",
      badge: "Fashion E-Commerce",
      description: "Luxury apparel and bespoke ethnic wear e-commerce experience featuring editorial lookbooks, size customization guides, and dynamic product catalog.",
      techStack: ["TypeScript", "React", "Tailwind CSS", "Vercel"],
      liveUrl: "https://boutiique-vastraa.vercel.app",
      githubUrl: "https://github.com/SumitBehera720/boutiique-vastraa",
      featured: true,
      highlights: [
        "High-definition zoom and apparel variant selectors",
        "Fluid transitions with magazine-style editorial aesthetic",
        "Integrated wishlist and custom order inquiry pipeline"
      ]
    },
    {
      id: "dev-s-garden",
      title: "Dev's Garden - Fine Dining & Hospitality Portal",
      category: "Web Applications",
      badge: "Hospitality Web",
      description: "A serene, interactive culinary destination website offering interactive dining menus, ambient garden storytelling, and online reservation inquiries.",
      techStack: ["JavaScript", "HTML5", "CSS3 / Modern UI", "Vercel"],
      liveUrl: "https://dev-s-garden.vercel.app",
      githubUrl: "https://github.com/SumitBehera720/dev-s-garden",
      featured: true,
      highlights: [
        "Interactive dietary-categorized menu card with dietary filters",
        "Table reservation inquiry system with date and party size picking",
        "Rich visual gallery capturing the peaceful garden ambiance"
      ]
    },
    {
      id: "cryptoscope-dashboard",
      title: "CryptoScope Pro - Market Analytics & Heatmap",
      category: "Web Applications",
      badge: "FinTech / Data",
      description: "Cryptocurrency market terminal offering real-time candlestick charts, market cap heatmaps, volatility watchlists, sentiment indicators, and CSV export.",
      techStack: ["JavaScript", "Chart.js", "Financial APIs", "CSS Grid", "HTML5"],
      liveUrl: "https://github.com/SumitBehera720/cryptoscope-dashboard",
      githubUrl: "https://github.com/SumitBehera720/cryptoscope-dashboard",
      featured: true,
      highlights: [
        "Multi-timeframe candlestick and price volume technical charts",
        "Interactive crypto sector heatmap with percentage shifts",
        "Local watchlist caching and instantaneous CSV export"
      ]
    },
    {
      id: "hospital-system",
      title: "MediCare Hospital Management Portal",
      category: "Full-Stack & SaaS",
      badge: "Healthcare Tech",
      description: "Clinical operations portal connecting patients and doctors for appointments, digital triage, and doctor availability tracking.",
      techStack: ["JavaScript", "Node.js", "Express", "HTML5/CSS3", "Vercel"],
      liveUrl: "https://hospital-ten-green.vercel.app",
      githubUrl: "https://github.com/SumitBehera720/hospital",
      featured: false,
      highlights: [
        "Doctor directory and appointment booking pipeline",
        "Clean, accessible user interface optimized for all ages",
        "Patient inquiry management and consultation triage"
      ]
    },
    {
      id: "gridpay-platform",
      title: "GridPay - Next-Gen Financial Services UI",
      category: "Web Applications",
      badge: "FinTech UI",
      description: "Digital payments and merchant invoice interface emphasizing quick transfers, virtual card generation, and transaction logs.",
      techStack: ["JavaScript", "Tailwind CSS", "HTML5", "Vercel"],
      liveUrl: "https://gridpay-platform.vercel.app",
      githubUrl: "https://github.com/SumitBehera720/gridpay-platform",
      featured: false,
      highlights: [
        "Clean card designs with masked account numbers",
        "Quick-transfer and split-bill calculators",
        "Real-time expense categorization breakdown"
      ]
    }
  ],

  // Verified Career Timeline
  experience: [
    {
      period: "May 2026 – Present",
      role: "Associate Software Developer",
      title: "Full-Stack Software Developer",
      company: "Qubnix Technology",
      location: "Bhubaneswar, Odisha, India",
      type: "Full-Time",
      badge: "Current Role",
      description: "Transitioned directly into Qubnix Technology immediately after graduating in May 2026. Working as an Associate Software Developer driving core full-stack engineering and custom enterprise applications.",
      achievements: [
        "Architecting full-stack custom CRM software covering responsive React/Next.js interfaces, Node.js/Express REST microservices, database schemas, and role-based access control (RBAC).",
        "Engineering scalable RESTful APIs, securing authentication flows (JWT/OAuth), and integrating third-party services and webhooks.",
        "Handling end-to-end development lifecycles: code debugging, automated component testing, cloud deployments on Vercel/Render, and continuous platform maintenance."
      ]
    },
    {
      period: "2023 – May 2026",
      role: "Bachelor of Computer Applications (BCA)",
      company: "Utkal University",
      location: "Bhubaneswar, Odisha, India",
      type: "Education",
      badge: "Graduated May 2026",
      description: "Completed Bachelor of Computer Applications (BCA) degree with academic excellence, deeply specializing in computer science fundamentals, software engineering, algorithms, and web development.",
      achievements: [
        "Graduated in May 2026, transitioning immediately into full-time software engineering at Qubnix Technology.",
        "Mastered Database Management Systems (DBMS/SQL), Object-Oriented Programming (Java, C++), Data Structures, and Modern Web Architectures.",
        "Built and deployed real-world full-stack web applications and SaaS platforms throughout the curriculum."
      ]
    },
    {
      period: "2021 – 2023",
      role: "Higher Secondary Education (+2)",
      company: "Council of Higher Secondary Education",
      location: "Bhubaneswar, Odisha, India",
      type: "Education",
      badge: "Science & Computing Foundation",
      description: "Completed higher secondary education with a rigorous focus on science, mathematics, and computing fundamentals.",
      achievements: [
        "Solidified mathematical analysis, logical problem-solving, and foundational computer science principles.",
        "Developed initial expertise in web markup, algorithms, and computer applications."
      ]
    }
  ],

  // Structured Basic Details & Narrative for the Dedicated About Me Section
  about: {
    fullName: "Sumit Behera",
    role: "Full-Stack Software Developer",
    company: "Qubnix Technology",
    tenure: "May 2026 – Present",
    degree: "BCA (Bachelor of Computer Applications)",
    university: "Utkal University",
    graduated: "May 2026",
    location: "Bhubaneswar, Odisha, India",
    languages: ["English", "Hindi", "Odia"],
    focus: "Enterprise CRM Systems & Modern Web Applications",
    email: "beherasumit772@gmail.com",
    availability: "Available for High-Impact Software Engineering Roles",
    bioParagraphs: [
      "Hey there! I'm Sumit Behera — a Full-Stack Software Developer & Associate Developer at Qubnix Technology, and a BCA graduate from Utkal University (Graduated May 2026). I have a deep passion for designing and building software that feels effortless, modern, and rock-solid.",
      "Right after graduating in May 2026, I stepped directly into my software engineering role at Qubnix Technology. Here, I architect and build multi-tenant enterprise CRM platforms, high-throughput microservices, and interactive web applications using React, Next.js, Node.js, and MongoDB."
    ],
    quickFacts: [
      { label: "Role", value: "Full-Stack Software Developer", icon: "code-2" },
      { label: "Company", value: "Qubnix Technology (May 2026 – Present)", icon: "building-2" },
      { label: "Degree", value: "BCA • Utkal University (May 2026)", icon: "graduation-cap" },
      { label: "Location", value: "Bhubaneswar, Odisha, India", icon: "map-pin" },
      { label: "Languages", value: "English, Hindi, Odia", icon: "languages" },
      { label: "Status", value: "Active at Qubnix • Open to High-Impact Roles", icon: "sparkles" }
    ],
    pillars: [
      {
        title: "Pixel-Perfect Frontend",
        desc: "Crafting fluid, responsive interfaces using Next.js 14, React 18, and Tailwind CSS with smooth micro-interactions.",
        icon: "layout"
      },
      {
        title: "Resilient Microservices",
        desc: "Designing secure Node.js & Express RESTful APIs with JWT authentication, RBAC, and clean modular controllers.",
        icon: "server"
      },
      {
        title: "Hybrid Data Persistence",
        desc: "Balancing flexible document models in MongoDB with strictly ACID-compliant MySQL schemas for enterprise reliability.",
        icon: "database"
      },
      {
        title: "Automated Cloud CI/CD",
        desc: "Continuous zero-downtime deployment workflows on Vercel Edge networks, Docker containers, and Render cloud.",
        icon: "cloud"
      }
    ]
  }
};
