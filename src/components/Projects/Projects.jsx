import { useState, useEffect, useRef } from "react";
import {
  FaGithub,
  FaArrowUpRightFromSquare,
  FaCode,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import {
  SiReact,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiVite,
  SiChartdotjs,
} from "react-icons/si";
import "./Projects.css";

function Projects() {
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [manualOffset, setManualOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);
  const pauseTimeoutRef = useRef(null);

  // Section Observer for scroll reveal
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

  // Cleanup pause timeout on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  const getStepWidth = () => {
    if (typeof window !== "undefined" && window.innerWidth <= 640) return 311;
    if (typeof window !== "undefined" && window.innerWidth <= 960) return 388;
    return 438;
  };

  const handleScrollLeft = () => {
    setManualOffset((prev) => prev + getStepWidth());
  };

  const handleScrollRight = () => {
    setManualOffset((prev) => prev - getStepWidth());
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (diff > 45) {
      // Swiped left -> advance right
      handleScrollRight();
    } else if (diff < -45) {
      // Swiped right -> advance left
      handleScrollLeft();
    }

    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 1500);
  };

  // Spotlight mouse effect on individual card hover
  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  // 4 Featured Projects
  const projectsData = [
    {
      id: 1,
      title: "ShortURL — Smart Link Management & Analytics",
      image: "/shorturl.png",
      fit: "contain",
      description:
        "A full-fledged full-stack URL shortening application that allows users to create, manage, and track short URLs with authentication and analytics.",
      techStack: [
        { name: "React", icon: <SiReact /> },
        { name: "Node.js", icon: <FaCode /> },
        { name: "MongoDB", icon: <SiMongodb /> },
        { name: "Express", icon: <SiExpress /> },
        { name: "Tailwind", icon: <SiTailwindcss /> },
      ],
      liveUrl: "https://shorturl-web.vercel.app",
      githubUrl: "https://github.com/rohitsainidev/short-url",
    },
    {
      id: 2,
      title: "TourUp — Explore Uttar Pradesh Tourism",
      image: "/tourup.png",
      fit: "contain",
      description:
        "A responsive tourism website for exploring popular destinations, attractions, and travel information across Uttar Pradesh.",
      techStack: [
        { name: "React", icon: <SiReact /> },
        { name: "Tailwind", icon: <SiTailwindcss /> },
        { name: "Vite", icon: <SiVite /> },
        { name: "Node.js", icon: <FaCode /> },
      ],
      liveUrl: "https://tourup-web.vercel.app/",
      githubUrl: "https://github.com/rohitsainidev/TourUP",
    },
    {
      id: 3,
      title: "CryptoVault — Web3 Market & Analytics",
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
      githubUrl: "https://github.com/rohitsainidev/crypto-vault-dashboard",
    },
    {
      id: 4,
      title: "Nebula — Creative Interactive Portfolio",
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
      githubUrl: "https://github.com/rohitsainidev/nebula-portfolio",
    },
  ];

  const renderProjectCard = (project, uniqueKey) => (
    <article
      key={uniqueKey}
      className="projects-sec-card"
      onMouseMove={handleCardMouseMove}
    >
      {/* Project Image Frame */}
      <div className="projects-sec-mockup-frame">
        <div className="projects-sec-img-wrap">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className={`projects-sec-img ${
              project.fit === "contain" ? "fit-contain" : ""
            }`}
          />
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
  );

  return (
    <section
      className={`projects-sec-container ${
        isSectionVisible ? "projects-sec-visible" : ""
      }`}
      id="projects"
      ref={sectionRef}
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
            interactive frontend experiences running live.
          </p>
        </div>

        {/* Continuous Running Showcase with Left/Right Buttons */}
        <div
          className={`projects-sec-marquee-container ${
            isPaused ? "is-paused" : ""
          }`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Desktop Left Arrow Button */}
          <button
            type="button"
            className="projects-nav-btn projects-nav-prev desktop-nav-btn"
            onClick={handleScrollLeft}
            aria-label="Scroll projects left"
          >
            <FaChevronLeft size={16} />
          </button>

          {/* Desktop Right Arrow Button */}
          <button
            type="button"
            className="projects-nav-btn projects-nav-next desktop-nav-btn"
            onClick={handleScrollRight}
            aria-label="Scroll projects right"
          >
            <FaChevronRight size={16} />
          </button>

          {/* Viewport with infinite hardware-accelerated GPU stream */}
          <div
            className="projects-sec-marquee-viewport"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="projects-sec-marquee-track"
              style={{
                transform: `translate3d(calc(-16.6666% + ${manualOffset}px), 0, 0)`,
              }}
            >
              {/* 6 identical groups for seamless infinite loop with negative & positive buffer */}
              {[1, 2, 3, 4, 5, 6].map((groupNum) => (
                <div
                  key={`group-${groupNum}`}
                  className="projects-marquee-group"
                  aria-hidden={groupNum > 1 ? "true" : undefined}
                >
                  {projectsData.map((project, idx) =>
                    renderProjectCard(
                      project,
                      `g${groupNum}-${project.id}-${idx}`
                    )
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Bar */}
          <div className="projects-mobile-nav">
            <button
              type="button"
              className="projects-mobile-nav-btn"
              onClick={handleScrollLeft}
              aria-label="Scroll projects left"
            >
              <FaChevronLeft size={15} />
            </button>
            <span className="projects-mobile-swipe-hint">
              Swipe or tap arrows
            </span>
            <button
              type="button"
              className="projects-mobile-nav-btn"
              onClick={handleScrollRight}
              aria-label="Scroll projects right"
            >
              <FaChevronRight size={15} />
            </button>
          </div>
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
              href="https://github.com/rohitsainidev"
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