// ─────────────────────────────────────────────────────────────────────────────
// All site content lives in this file. Update it together with your CV.
// Images are referenced by "slot" names (path under src/assets, no extension);
// drop a file with that name into src/assets and it appears automatically.
// Wrap words in **double asterisks** to make them bold on the page.
// Logos: microsoft, basarsoft, teknofest, metu, esc, googleplay (see components/BrandLogo.jsx).
// ─────────────────────────────────────────────────────────────────────────────

// Public address of the site once deployed (e.g. "https://barisalkan.vercel.app").
// Set it in the .env file as VITE_SITE_URL; the QR code and share button use it.
export const SITE_URL = (import.meta.env.VITE_SITE_URL || "").replace(/\/$/, "");

// null until public/Baris_Alkan_CV.pdf exists (checked at build time in vite.config.js); Resume buttons hide meanwhile.
export const RESUME_URL = import.meta.env.VITE_HAS_CV ? "/Baris_Alkan_CV.pdf" : null;
export const VCARD_URL = "/baris-alkan.vcf";
export const PLAY_URL = "https://play.google.com/store/apps/details?id=con.derbar.quadra";

// Visual extras: set to false to switch one off.
export const effects = {
  cursorTrail: true, // glyph trail that follows the mouse (desktop only)
  matrixRain: true, // binary rain beside the hero (large screens only)
};

export const person = {
  name: "Barış Alkan",
  initials: "BA",
  year: "4th-year",
  role: "Computer Engineering",
  university: "Middle East Technical University",
  campus: "NCC",
  school: "METU NCC",
  status: "Open to internships",
  statusDetail: "AI, computer vision & autonomous systems", // hidden on small phones
  headline: "I build AI and computer-vision software that works in the real world: on UAVs, on-device and on the map.",
  cardTitle: "Computer Vision · AI · Full-Stack",
  email: "alkan.baris@metu.edu.tr",
  linkedin: "https://www.linkedin.com/in/barislkn",
  linkedinHandle: "barislkn",
  github: "https://github.com/barisalkan0",
  githubHandle: "barisalkan0",
  photo: "profile", // src/assets/profile.png, portrait
  photoCutout: "profile-cutout", // src/assets/profile-cutout.png, same photo with the background removed
};

// Numbers on the first screen. The number counts up on load; prefixes and
// suffixes (%, +) are kept. Keep them in sync with the CV.
export const heroStats = [
  { value: "93.31%", label: "CIFAR-10 test accuracy" },
  { value: "2", label: "internships, summer 2026" },
  { value: "40+", label: "students helped as TA" },
  { value: "1", label: "game live on Google Play" },
];

// The three facts a visitor should remember after ten seconds.
export const proofs = [
  { logo: "microsoft", label: "Microsoft Türkiye", detail: "AI Innovators Intern · 2026", href: "#experience" },
  { logo: "teknofest", label: "TEKNOFEST Fighter UAV", detail: "Passed Technical Qualification", href: "#project-teknofest" },
  { logo: "basarsoft", label: "Başarsoft", detail: "Full-Stack GIS Intern · 2026", href: "#experience" },
];

export const aboutTitle = "Real projects, measurable results.";

export const about = [
  "I'm a fourth-year Computer Engineering student at **Middle East Technical University** (Northern Cyprus Campus). I like building software that leaves the classroom and gets used.",
  "In summer 2026 I completed **two back-to-back internships**. At **Microsoft Türkiye's AI Innovators Program** I built a RAG assistant that runs **fully offline** on Microsoft Foundry Local. At **Başarsoft** I built a **full-stack web GIS platform** on .NET 8 and PostGIS, loaded with **8,700+ real places** in Ankara.",
  "On our **TEKNOFEST Fighter UAV** team I develop the **YOLO-based target detection** and decision logic, and the team has **passed the technical qualification** stage. Separately, as a personal project, I trained a residual CNN that lifted CIFAR-10 accuracy from **78.43% to 93.31%**.",
  "I also shipped **Quadra Rotate** to Google Play and helped **40+ students** as a teaching assistant for Data Structures.",
];

// "What I work on" cards. `visual` picks the small illustration drawn on top of each card.
export const focusAreas = [
  {
    visual: "detection",
    title: "Computer Vision",
    icon: "vision",
    logos: [],
    stat: "93.31%",
    statLabel: "CIFAR-10 test accuracy · personal project",
    lines: ["**Residual CNN in PyTorch:** up from 78.43%", "**TEKNOFEST UAV team (separate):** YOLO-based target detection"],
  },
  {
    visual: "chat",
    title: "Applied AI & LLMs",
    logos: ["microsoft"],
    stat: "Offline",
    statLabel: "RAG assistant on Foundry Local",
    lines: ["**Microsoft AI Innovators:** local document Q&A", "Answers only from your files, never guesses"],
  },
  {
    visual: "map",
    title: "Full-Stack & GIS",
    logos: ["basarsoft"],
    stat: "8,700+",
    statLabel: "real places mapped in Ankara",
    lines: ["**.NET 8 · PostGIS · React · OpenLayers**", "OSRM routing and live tracking over SignalR"],
  },
  {
    visual: "tree",
    title: "Systems & Teaching",
    logos: ["metu"],
    stat: "40+",
    statLabel: "students assisted in CNG 213",
    lines: ["**C, memory management, complexity**", "Simulators and AVL-tree indexes in C"],
  },
];

export const hobbies = [
  { icon: "guitar", title: "Guitar", detail: "6 years of playing, including **live stage performances**" },
  { icon: "football", title: "Football", detail: "**Licensed player** in middle school" },
];

export const experience = [
  {
    date: "Aug – Sep 2026",
    logo: "basarsoft",
    role: "Intern · Full-Stack Web GIS",
    org: "Başarsoft",
    detail: "Developed a **full-stack web GIS platform** with .NET 8, PostGIS, GeoServer, React and OpenLayers.",
    points: [
      "Built the REST API with **JWT auth, role-based permissions** and spatial CRUD over PostGIS.",
      "Loaded **8,700+ real places** in Ankara from OpenStreetMap and built a location-analysis tool that ranks the best areas to live by weighted criteria.",
      "Added a transit module with **automatic route generation (OSRM)** and **live vehicle tracking** over SignalR.",
    ],
    tags: ["C#", ".NET 8", "EF Core", "PostGIS", "GeoServer", "SignalR", "React", "OpenLayers"],
    link: { label: "Code", href: "https://github.com/barisalkan0/web-gis-platform" },
  },
  {
    date: "Jul – Aug 2026",
    logo: "microsoft",
    role: "Intern · AI Innovators Internship Program",
    org: "Microsoft Türkiye",
    meta: "Remote · Certificate of Completion",
    detail: "Selected for Microsoft Türkiye's **AI Innovators Internship Program** (Summer 2026).",
    points: [
      "Built a **local RAG assistant** that answers questions from your own documents, running **fully offline** with Microsoft Foundry Local.",
      "Implemented the pipeline end to end: document chunking, embeddings, SQLite storage and relevance search.",
      "Added a guard so the model answers **only from the retrieved documents** and says so when the information is missing.",
    ],
    tags: ["Python", "Foundry Local", "Qwen2.5", "RAG", "Embeddings", "SQLite"],
    link: { label: "Code", href: "https://github.com/barisalkan0/foundry-local-rag-assistant" },
  },
  {
    date: "2026 – Present",
    logo: "teknofest",
    role: "Computer Vision & Autonomy",
    org: "TEKNOFEST Fighter UAV Team",
    href: "#project-teknofest",
    detail:
      "One of **six members** in a multidisciplinary team building an autonomous fighter UAV. Responsible for **YOLO-based object detection** models and vision-based target detection and decision logic. The team **passed the technical qualification** stage.",
    tags: ["YOLO", "Object Detection", "Decision Logic"],
  },
  {
    date: "Sep 2025 – Jan 2026",
    logo: "metu",
    role: "Student Assistant · Data Structures (CNG 213)",
    org: "Middle East Technical University, NCC",
    href: "https://ncc.metu.edu.tr/cng/home",
    detail: "Assisted **40+ students** in lab sessions on C, memory management and algorithmic complexity.",
    tags: ["C", "Data Structures", "Teaching"],
  },
  {
    date: "Jul – Sep 2025",
    logo: "esc",
    role: "Volunteer",
    org: "European Solidarity Corps",
    meta: "Spain · Youthpass certified",
    detail:
      "Short-term project in Spain on **cultural heritage protection**: restoration, environmental protection and cultural promotion with an **international team**.",
    tags: ["International team", "Intercultural communication"],
  },
];

export const featuredProjects = [
  {
    id: "project-quadra",
    title: "Quadra Rotate",
    type: "Mobile Game · Published",
    year: "Nov 2025 – Jan 2026",
    playStore: PLAY_URL, // shows the big "Get it on Google Play" button
    description:
      "A rotation-based puzzle game **live on Google Play**. Built with React functional components and hooks, **playable in 9 languages**, with chain-reaction combos and checkpoint progress. Built together with a teammate.",
    tags: ["React", "JavaScript", "Mobile", "9 languages"],
    image: ["projects/quadra-cover-shot"],
    cover: { kind: "phones", shots: ["projects/quadra/combos", "projects/quadra/rotation", "projects/quadra/languages"] },
    appIcon: "quadra-cover",
    links: [{ label: "Code", href: "https://github.com/barisalkan0/quadra-rotate" }],
    accent: "fuchsia",
  },
  {
    id: "project-teknofest",
    title: "TEKNOFEST Fighter UAV",
    type: "Autonomous UAV · Computer Vision",
    year: "2026 – Present",
    highlight: { label: "Passed Technical Qualification", tone: "amber" },
    description:
      "Autonomous fighter UAV built by a **6-member multidisciplinary team**. I develop the **YOLO-based object detection** models and the vision-based target detection and decision logic.",
    tags: ["YOLO", "Object Detection", "Autonomy"],
    image: ["projects/teknofest-uav", "media/uav-stock"],
    // Detection box drawn over the stock photo only (hidden once your own photo is added).
    overlay: { slot: "media/uav-stock", box: { left: 38.5, top: 24, width: 17.5, height: 23 } },
    badge: "teknofest-logo",
  },
  {
    id: "project-rag",
    title: "Local RAG Assistant",
    type: "Applied AI · Microsoft Foundry Local",
    year: "Jul – Aug 2026",
    highlight: { label: "Microsoft AI Innovators", tone: "sky", logo: "microsoft" },
    description:
      "Answers questions **only from documents on your own machine**, **fully offline**. Qwen3-Embedding with a SQLite vector store, cosine-plus-keyword ranking, and a guard that says “not in the documents” instead of guessing. Ships with a CLI, web UI, tests and evals.",
    tags: ["Python", "RAG", "Qwen2.5", "SQLite"],
    image: ["projects/rag-assistant"],
    cover: { kind: "pipeline", steps: ["Docs", "Chunks", "Embeddings", "Search", "Qwen2.5"] },
    links: [{ label: "Code", href: "https://github.com/barisalkan0/foundry-local-rag-assistant" }],
    accent: "sky",
  },
  {
    id: "project-cifar",
    title: "CIFAR-10 Residual CNN",
    type: "Computer Vision · PyTorch",
    year: "May – Jun 2026",
    description:
      "Residual CNN image classifier in PyTorch that raised CIFAR-10 test accuracy from **78.43% to 93.31%** with data augmentation and batch normalization, trained with **CUDA acceleration** and fully documented on GitHub.",
    tags: ["PyTorch", "CNN", "CUDA", "Computer Vision"],
    image: ["projects/cifar10"],
    cover: { kind: "cifar", value: "93.31%", from: "78.43%", label: "CIFAR-10 test accuracy" },
    links: [{ label: "Code", href: "https://github.com/barisalkan0/cifar10-classifier" }],
    accent: "violet",
  },
];

export const moreProjects = [
  {
    title: "Web GIS Platform",
    icon: "map",
    stack: "C# · .NET 8 · PostGIS · React",
    year: "2026",
    highlight: "**8,700+ places** in Ankara, route generation and **live vehicle tracking**",
    link: "https://github.com/barisalkan0/web-gis-platform",
  },
  {
    title: "PsyCalm",
    icon: "brain",
    stack: "AI assistant",
    year: "2026",
    status: "In progress",
    highlight: "Tracks emotional patterns, graphs progress and **cites reliable sources** in its answers",
  },
  {
    title: "Voiced Calculator",
    icon: "award",
    stack: "Python · Accessibility",
    year: "2021",
    award: "2nd place",
    highlight: "Awarded at the **23 April Tekirdağ Coding Competition**. Speaks results aloud for **visually impaired users**",
  },
  {
    title: "Campus Collab",
    icon: "users",
    stack: "React",
    year: "2025",
    status: "In progress",
    highlight: "One place for **courses, projects, societies and shared tasks**",
  },
  {
    title: "Packet-Switched Network Simulator",
    icon: "network",
    stack: "C · Priority Queue",
    year: "2024",
    highlight: "**Priority-based packet routing** across multiple switchers with an event-driven clock",
  },
  {
    title: "Animal & Patient Indexing",
    icon: "tree",
    stack: "C · AVL Trees",
    year: "2024 – 2025",
    highlight: "**AVL-tree indexes** with sorted traversal, search, ranking and multi-record nodes",
  },
  {
    title: "Dog Shelter Simulation",
    icon: "paw",
    stack: "C · Priority Queue · Linked List",
    year: "2025",
    highlight: "Priority-queue and linked-list ADTs with **throughput statistics**",
  },
];

export const education = {
  school: "Middle East Technical University · NCC",
  degree: "B.Sc. Computer Engineering",
  date: "2022 – Present · 4th year",
  logo: "metu",
};

export const credentials = [
  { title: "Certificate of Completion, AI Innovators Internship", issuer: "Microsoft Türkiye", year: "2026", logo: "microsoft" },
  { title: "Object Oriented Programming Certificate", issuer: "Bilgeİş", year: "2025" },
  { title: "2nd Place, 23 April Tekirdağ Coding Competition", issuer: "High school category", year: "2021" },
];

// Logos shown in the scrolling tech strip (keys map to icons in components/Skills.jsx).
export const techStack = ["Python", "PyTorch", "C", "C++", "C#", ".NET", "JavaScript", "React", "PostgreSQL", "SQLite", "Java", "Git", "Linux"];

export const skillGroups = [
  { title: "Languages", items: ["Python", "C", "C++", "C#", "Java", "JavaScript", "SQL", "Haskell", "MATLAB"] },
  { title: "AI & Vision", items: ["PyTorch", "CUDA", "YOLO", "RAG", "Embeddings", "Foundry Local"] },
  { title: "Web & Data", items: [".NET 8", "EF Core", "React", "PostgreSQL / PostGIS", "GeoServer", "OpenLayers", "SignalR", "SQLite"] },
  { title: "Tools", items: ["Git", "GitHub", "Linux / Unix shell"] },
];

export const spokenLanguages = [
  { name: "Turkish", level: "Native" },
  { name: "English", level: "Professional (B2–C1)" },
  { name: "Spanish", level: "Beginner" },
];
