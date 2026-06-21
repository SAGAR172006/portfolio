// Mock data for Sagar Singh's Portfolio
// Easy to modify and extend

export const personalInfo = {
  name: "Sagar Singh",
  title: "Computer Science Engineering Student",
  graduationYear: "Class of 2028",
  bio: "Motivated Computer Science Engineering undergraduate with a strong foundation in full-stack development and algorithmic problem-solving. Passionate about building scalable web applications using the MERN stack and exploring cloud-native technologies. Currently deepening expertise in Data Structures and Algorithms while transitioning into DevOps practices, with a keen interest in system optimization and backend architecture.",
  tagline: "Transforming ideas into elegant code solutions",
  heroImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
};

export const contact = {
  email: "sagarsingh.webdev@gmail.com",
  linkedin: "https://www.linkedin.com/in/sagar-singh-a60884359/",
  github: "https://github.com/SAGAR172006"
};

export const skills = {
  languages: ["Java", "C++", "C", "Python", "JavaScript (ES6+)", "HTML5", "CSS3"],
  frameworks: ["React.js", "Node.js", "Express.js", "Bootstrap"],
  tools: ["Git/GitHub", "Linux (Bash)", "VS Code", "Postman"],
  concepts: ["Data Structures & Algorithms", "RESTful APIs", "OOPs", "MERN Stack", "CI/CD Pipelines", "Cloud Infrastructure (AWS/Azure)"]
};

export const projects = [
  {
    id: 1,
    slug: "focus-flow",
    title: "Focus-Flow",
    subtitle: "Productivity Booster Application",
    description: "A comprehensive full-stack productivity application designed to enhance focus and time management through intelligent workflow optimization. Features include real-time task tracking with drag-and-drop prioritization, a customizable Pomodoro timer with session analytics, and AI-powered productivity insights via Gemini API to help users identify their peak performance patterns and optimize daily routines.",
    technologies: ["JavaScript", "Bootstrap", "MongoDB", "Gemini API", "Google OAuth"],
    image: "/images/Recording 2026-03-09 164556.mp4",
    features: [
      "Google OAuth integration for secure authentication",
      "AI-powered productivity insights using Gemini API",
      "Real-time task management with MongoDB",
      "Responsive Bootstrap UI for cross-device compatibility"
    ],
    githubLink: "https://github.com/SAGAR172006/Focus-Flow_updated/tree/main",
    status: "Mini Project"
  },
  {
    id: 3,
    slug: "weirdos",
    title: "Weirdos",
    subtitle: "Real-Time Social Deduction Party Game",
    description: "A real-time multiplayer social deduction party game — Among Us meets Spyfall. Players join rooms, get secret roles (Normie or Weirdo), give one-word hints, vote, and try to expose the Weirdo. No database, no login — just pick a name, share a code, and play.",
    technologies: ["React 19", "Socket.IO", "FastAPI", "Python", "Tailwind CSS", "Framer Motion", "Radix UI", "CRACO", "Uvicorn"],
    image: "/images/Recording 2026-03-09 155509.mp4",
    features: [
      "Real-time multiplayer via Socket.IO — zero latency room sync across all players",
      "Secret role assignment each round: Normies know the word, Weirdos must bluff",
      "One-word hint rounds with turn-based timers and in-game chat during voting",
      "Voting system with optional anonymous voting to eliminate suspected Weirdos",
      "Weirdo guess mechanic — correctly guess the secret word to win instantly",
      "Neon dark UI with Framer Motion animations and glassmorphism cards",
      "DiceBear Fun Emoji avatars unique per player seed",
      "Massive word bank with difficulty levels and explicit content filter"
    ],
    githubLink: "https://github.com/SAGAR172006/weirdos_sdw_game",
    status: "Hobby"
  },
  {
    id: 2,
    slug: "fleet-flow",
    title: "FleetFlow",
    subtitle: "Modular Fleet & Logistics Management System",
    description: "A full-stack fleet and logistics management web app built with React, Node.js/Express, and Firebase. Features role-based dashboards for fleet managers, dispatchers, safety officers, and finance analysts — managing vehicles, trips, maintenance, expenses, and analytics in real-time.",
    technologies: ["React 18", "Vite 5", "Tailwind CSS", "Node.js", "Express", "Firebase Firestore", "Firebase Admin SDK", "bcrypt", "Axios"],
    image: "/images/01-login.png",

    features: [
      "Role-based dashboards: Fleet Manager, Dispatcher, Safety Officer, Finance Analyst",
      "Real-time vehicle registry with CRUD operations and status tracking",
      "Trip dispatcher with full lifecycle management (on trip → completed/aborted)",
      "Maintenance scheduling with Scheduled, Emergency, and Routine record types",
      "Expense logging per trip with categories: Fuel, Toll, Driver Pay, and more",
      "Driver performance tracking with safety scores and license compliance",
      "Fleet-wide analytics KPIs, trip status breakdowns, and monthly expense charts",
      "bcrypt-secured role-based auth with business key validation"
    ],
    githubLink: "https://github.com/SAGAR172006/fleet-oodo",
    status: "Hackathon"
  },
  {
    id: 4,
    slug: "ecogrid",
    title: "EcoGrid",
    subtitle: "Quantum-Optimized Energy Distribution",
    description: "An interactive smart city analytics platform that integrates a Maps API to visualize geographic energy grid networks. Features a dynamic dashboard comparing traditional vs. quantum-optimized carbon outputs, utilizing the Gemini API to translate raw emission data into actionable, real-world environmental impact scenarios and tangible sustainability forecasts.",
    technologies: ["Python", "Streamlit", "PennyLane (QAOA)", "Maps API (Leaflet/Mapbox)", "Google Gemini API", "Plotly"],
    image: "/images/ecogrid.png",
    features: [
      "Geospatial energy grid visualization via Maps API",
      "Dynamic dashboard comparing traditional vs. quantum-optimized carbon outputs",
      "QAOA routing optimization with multi-qubit state space mapping",
      "Gemini API integration for actionable sustainability forecasts",
      "Quantum computing simulations combined with spatial visualizations",
      "Real-world environmental impact scenario generation"
    ],
    githubLink: "https://github.com/SAGAR172006/quantum-opt",
    status: "Hackathon",
    experience: "Mapped complex geospatial coordinate data into multi-qubit state spaces for QAOA routing optimization. Gained deep experience in combining quantum computing simulations, spatial visualizations, and LLM orchestration to transform abstract scientific data into clear, practical metrics for urban planning."
  },
  {
    id: 5,
    slug: "ami-gcem",
    title: "AMI at GCEM",
    subtitle: "Agentic AI Workflow Platform",
    description: "Built collaboratively alongside three teammates, this agentic AI platform automates the generation of personalized study modules. It leverages n8n workflows to orchestrate complex educational pipelines efficiently.",
    technologies: ["React", "Node.js", "LangChain", "Google AI Studio"],
    image: "/images/ami-gcem.mp4",
    features: [
      "Automated generation of personalized study modules",
      "n8n workflow orchestration for complex educational pipelines",
      "Multi-agent architecture integrating LLMs for workflow automation",
      "Optimized to run reliably on free-tier infrastructure",
      "Open-source library prioritization for cost efficiency"
    ],
    githubLink: "https://github.com/SAGAR172006/gcem-hacks",
    status: "Collaborative",
    experience: "Designed robust multi-agent architectures that integrate LLMs for seamless workflow automation. Prioritized the use of open-source libraries and optimized the infrastructure to operate reliably on free-tier tools without sacrificing performance."
  }
];

export const achievements = [
  {
    id: 1,
    title: "Full-Stack Development",
    description: "Built and deployed production-ready web applications using MERN stack",
    icon: "code"
  },
  {
    id: 2,
    title: "Problem Solving",
    description: "Actively practicing DSA and competitive programming",
    icon: "brain"
  },
  {
    id: 3,
    title: "Cloud & DevOps",
    description: "Learning modern deployment practices and cloud infrastructure",
    icon: "cloud"
  }
  // Add more achievements as you progress
];

export const images = {
  hero: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  coding: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
  workspace: "https://images.pexels.com/photos/574070/pexels-photo-574070.jpeg",
  technology: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa"
};
