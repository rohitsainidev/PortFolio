import { useState, useEffect, useRef } from "react";
import {
  FaGithub,
  FaArrowUpRightFromSquare,
  FaCode,
} from "react-icons/fa6";
import {
  SiReact,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiVite,
  SiJavascript,
  SiHtml5,
  SiCss,
} from "react-icons/si";
import "./Projects.css";

function Projects() {
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = useRef(null);

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

  // Spotlight mouse effect on individual card hover
  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  // 3 Featured Projects
  const projectsData = [
    {
      id: 1,
      title: "ShortURL",
      category: "Full-Stack Web App",
      image: "/shorturl.png",
      description:
        "Full-stack URL shortening web application offering custom links, secure authentication, and comprehensive real-time click analytics.",
      techStack: [
        { name: "React", icon: <SiReact className="tech-icon-react" /> },
        { name: "Node.js", icon: <FaCode className="tech-icon-node" /> },
        { name: "MongoDB", icon: <SiMongodb className="tech-icon-mongo" /> },
        { name: "Express", icon: <SiExpress className="tech-icon-express" /> },
        { name: "Tailwind", icon: <SiTailwindcss className="tech-icon-tailwind" /> },
      ],
      liveUrl: "https://shorturl-web.vercel.app",
      githubUrl: "https://github.com/rohitsainidev/short-url",
    },
    {
      id: 2,
      title: "Uttar Pradesh Unveiled",
      category: "Travel & Tourism",
      image: "/tourup.png",
      description:
        "Responsive tourism platform for exploring popular destinations, cultural heritage, and curated travel experiences across Uttar Pradesh.",
      techStack: [
        { name: "React", icon: <SiReact className="tech-icon-react" /> },
        { name: "Tailwind", icon: <SiTailwindcss className="tech-icon-tailwind" /> },
        { name: "Vite", icon: <SiVite className="tech-icon-vite" /> },
        { name: "Node.js", icon: <FaCode className="tech-icon-node" /> },
      ],
      liveUrl: "https://tourup-web.vercel.app/",
      githubUrl: "https://github.com/rohitsainidev/TourUP",
    },
    {
      id: 3,
      title: "ZYRIVO",
      category: "E-Commerce Platform",
      image: "/zyrivo.png",
      description:
        "Full-stack e-commerce platform offering intuitive product discovery, cart management, secure authentication, and a responsive checkout experience.",
      techStack: [
        { name: "React", icon: <SiReact className="tech-icon-react" /> },
        { name: "Node.js", icon: <FaCode className="tech-icon-node" /> },
        { name: "MongoDB", icon: <SiMongodb className="tech-icon-mongo" /> },
        { name: "Express", icon: <SiExpress className="tech-icon-express" /> },
        { name: "Tailwind", icon: <SiTailwindcss className="tech-icon-tailwind" /> },
      ],
      liveUrl: "https://zyrivo.vercel.app/",
      githubUrl: "https://github.com/rohitsainidev/zyrivo",
    },
    {
      id: 4,
      title: "Tic Tac Toe",
      category: "Interactive Web Game",
      image: "/tictactoe.png",
      description:
        "Interactive neon-styled web game featuring 2-player local match, smart bot opponent, custom sound effects, and live score tracking.",
      techStack: [
        { name: "JavaScript", icon: <SiJavascript className="tech-icon-js" /> },
        { name: "HTML5", icon: <SiHtml5 className="tech-icon-html" /> },
        { name: "CSS3", icon: <SiCss className="tech-icon-css3" /> },
        { name: "Web Audio", icon: <FaCode className="tech-icon-api" /> },
      ],
      liveUrl: "https://tictactoe-webb.vercel.app/",
      githubUrl: "https://github.com/rohitsainidev/tictactoe-web",
    },
  ];

  const renderProjectCard = (project) => (
    <article
      key={project.id}
      className="projects-sec-card"
      onMouseMove={handleCardMouseMove}
    >
      {/* Mockup Frame with inner padding */}
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noreferrer"
        className="projects-sec-mockup-frame"
        aria-label={`View live preview of ${project.title}`}
      >
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="projects-sec-img"
        />
      </a>

      {/* Content Body (Left Aligned matching Reference) */}
      <div className="projects-sec-card-body">
        {/* Title */}
        <h3 className="projects-sec-card-title">{project.title}</h3>

        {/* Description */}
        <p className="projects-sec-card-desc">{project.description}</p>

        {/* Tech Stack - Clean without outer box */}
        <div className="projects-sec-tech-row">
          {project.techStack.map((tech) => (
            <span key={tech.name} className="projects-sec-tech-item">
              <span className="tech-item-icon">{tech.icon}</span>
              <span className="tech-item-name">{tech.name}</span>
            </span>
          ))}
        </div>

        {/* Clean & Centered Action Buttons */}
        <div className="projects-sec-links-row">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="projects-clean-btn live-btn"
          >
            <span>Live Preview</span>
            <FaArrowUpRightFromSquare size={12} />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="projects-clean-btn code-btn"
          >
            <FaGithub size={14} />
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

        {/* 3 Featured Projects Grid */}
        <div className="projects-grid">
          {projectsData.map((project) => renderProjectCard(project))}
        </div>
      </div>
    </section>
  );
}

export default Projects;