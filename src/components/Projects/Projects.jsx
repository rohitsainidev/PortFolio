import { useState, useEffect, useRef } from "react";
import {
  FaGithub,
  FaArrowUpRightFromSquare,
  FaLayerGroup,
  FaCode,
} from "react-icons/fa6";
import {
  SiReact,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiSocketdotio,
  SiRedux,
  SiStripe,
  SiChartdotjs,
  SiVite,
} from "react-icons/si";
import { FiLayers, FiGlobe, FiLayout } from "react-icons/fi";
import "./Projects.css";

function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = useRef(null);

  // Section Observer
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true);
          observer.unobserve(section);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Spotlight Mouse Move Effect on Project Cards
  const handleMouseMove = (e) => {
    const cards = document.querySelectorAll(".projects-sec-card");
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  };

  // 4 Featured Projects: 2 Full-Stack & 2 Frontend
  const projectsData = [
    {
      id: 1,
      title: "DevPulse — Live Developer Community",
      category: "fullstack",
      badge: "FULL STACK",
      watermark: "01",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop&q=80",
      description:
        "A full-fledged collaborative developer platform featuring real-time room messaging, code snippet sharing with syntax highlighting, and JWT authentication.",
      techStack: [
        { name: "React", icon: <SiReact /> },
        { name: "Node.js", icon: <FaCode /> },
        { name: "MongoDB", icon: <SiMongodb /> },
        { name: "Express", icon: <SiExpress /> },
        { name: "Socket.io", icon: <SiSocketdotio /> },
      ],
      liveUrl: "https://devpulse-demo.vercel.app",
      githubUrl: "https://github.com/rohit/devpulse-community",
    },
    {
      id: 2,
      title: "LuxeShop — Modern E-Commerce Marketplace",
      category: "fullstack",
      badge: "FULL STACK",
      watermark: "02",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=80",
      description:
        "Full-stack shopping platform with secure Stripe payments, live cart state management, product filtering, user auth, and an intuitive admin dashboard.",
      techStack: [
        { name: "React", icon: <SiReact /> },
        { name: "Node.js", icon: <FaCode /> },
        { name: "MongoDB", icon: <SiMongodb /> },
        { name: "Redux", icon: <SiRedux /> },
        { name: "Stripe", icon: <SiStripe /> },
      ],
      liveUrl: "https://luxeshop-demo.vercel.app",
      githubUrl: "https://github.com/rohit/luxeshop-ecommerce",
    },
    {
      id: 3,
      title: "CryptoVault — Web3 Market & Analytics",
      category: "frontend",
      badge: "FRONTEND",
      watermark: "03",
      image:
        "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=900&auto=format&fit=crop&q=80",
      description:
        "High-performance cryptocurrency dashboard with interactive TradingView price charts, portfolio tracking calculator, and real-time market data via CoinGecko API.",
      techStack: [
        { name: "React", icon: <SiReact /> },
        { name: "Tailwind", icon: <SiTailwindcss /> },
        { name: "Chart.js", icon: <SiChartdotjs /> },
        { name: "REST API", icon: <FaCode /> },
      ],
      liveUrl: "https://cryptovault-demo.vercel.app",
      githubUrl: "https://github.com/rohit/crypto-vault-dashboard",
    },
    {
      id: 4,
      title: "Nebula — Creative Interactive Portfolio",
      category: "frontend",
      badge: "FRONTEND",
      watermark: "04",
      image:
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&auto=format&fit=crop&q=80",
      description:
        "A hyper-smooth, responsive personal portfolio website with custom glassmorphic aesthetics, fluid micro-interactions, dark mode elegance, and clean architecture.",
      techStack: [
        { name: "React", icon: <SiReact /> },
        { name: "Vite", icon: <SiVite /> },
        { name: "Vanilla CSS", icon: <FaCode /> },
      ],
      liveUrl: "https://nebula-portfolio-demo.vercel.app",
      githubUrl: "https://github.com/rohit/nebula-portfolio",
    },
  ];

  // Filter Logic
  const filteredProjects =
    activeFilter === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  // Filter Tabs
  const filterTabs = [
    {
      key: "all",
      label: "All Projects",
      icon: <FiLayers size={14} />,
      count: projectsData.length,
    },
    {
      key: "fullstack",
      label: "Full-Stack",
      icon: <FiGlobe size={14} />,
      count: projectsData.filter((p) => p.category === "fullstack").length,
    },
    {
      key: "frontend",
      label: "Frontend",
      icon: <FiLayout size={14} />,
      count: projectsData.filter((p) => p.category === "frontend").length,
    },
  ];

  return (
    <section
      className={`projects-sec-container ${
        isSectionVisible ? "projects-sec-visible" : ""
      }`}
      id="projects"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
    >
      {/* Background Ambient Glows */}
      <div className="projects-sec-glow-left" aria-hidden="true" />
      <div className="projects-sec-glow-right" aria-hidden="true" />

      <div className="projects-inner-wrapper">
        {/* Header */}
        <div className="projects-sec-header reveal-up">
          <span className="projects-sec-badge">PORTFOLIO</span>
          <h2 className="projects-sec-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="projects-sec-desc">
            A showcase of production-ready full-stack web applications and
            interactive frontend experiences.
          </p>

          {/* Filter Pills */}
          <div className="projects-sec-filters">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={`projects-sec-filter-btn ${
                  activeFilter === tab.key ? "active" : ""
                }`}
                onClick={() => setActiveFilter(tab.key)}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <small>{tab.count}</small>
              </button>
            ))}
          </div>
        </div>

        {/* 2x2 Balanced Projects Grid */}
        <div className="projects-sec-grid">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="projects-sec-card"
            >
              {/* Card Watermark */}
              <div className="projects-sec-watermark" aria-hidden="true">
                {project.watermark}
              </div>

              {/* Card Top Meta */}
              <div className="projects-sec-card-header">
                <div className="projects-sec-category-pill">
                  <FaLayerGroup size={12} />
                  <span>{project.badge}</span>
                </div>
              </div>

              {/* Project Image Frame */}
              <div className="projects-sec-mockup-frame">
                <div className="projects-sec-img-wrap">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                  />
                  <div className="projects-sec-img-overlay">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="projects-sec-preview-btn"
                    >
                      <span>Live Preview</span>
                      <FaArrowUpRightFromSquare size={12} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="projects-sec-card-body">
                <h3 className="projects-sec-card-title">{project.title}</h3>
                <p className="projects-sec-card-desc">{project.description}</p>

                {/* Tech Stack Chips */}
                <div className="projects-sec-tech-stack">
                  {project.techStack.map((tech) => (
                    <span key={tech.name} className="projects-sec-tech-tag">
                      {tech.icon}
                      <span>{tech.name}</span>
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="projects-sec-actions">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="projects-sec-btn-primary"
                  >
                    <span>Live Demo</span>
                    <FaArrowUpRightFromSquare size={12} />
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="projects-sec-btn-secondary"
                    aria-label="View Source Code on GitHub"
                  >
                    <FaGithub size={15} />
                    <span>Code</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom GitHub CTA */}
        <div className="projects-sec-bottom-cta reveal-up">
          <div className="projects-sec-cta-box">
            <div className="projects-sec-cta-text">
              <h4>Want to explore more repositories?</h4>
              <p>
                Check out all my open-source projects, algorithms, and practical
                codebases on GitHub.
              </p>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="projects-sec-cta-btn"
            >
              <FaGithub size={18} />
              <span>Explore GitHub Profile</span>
              <FaArrowUpRightFromSquare size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;