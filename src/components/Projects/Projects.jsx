import { useState } from "react";
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
} from "react-icons/si";
import "./Projects.css";
import ProjectAccessModal from "./ProjectAccessModal";

function Projects() {
  const [activeModalProject, setActiveModalProject] = useState(null);

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
      title: "Campus360",
      category: "Campus ERP Platform",
      image: "/campus360.png",
      description:
        "All-in-one unified ERP platform for colleges and universities to streamline student attendance, online fee payments, examinations, assignments, and campus administration.",
      techStack: [
        { name: "React", icon: <SiReact className="tech-icon-react" /> },
        { name: "Tailwind", icon: <SiTailwindcss className="tech-icon-tailwind" /> },
        { name: "Node.js", icon: <FaCode className="tech-icon-node" /> },
        { name: "MongoDB", icon: <SiMongodb className="tech-icon-mongo" /> },
        { name: "Express", icon: <SiExpress className="tech-icon-express" /> },
      ],
      liveUrl: "https://campus360-manage.vercel.app/",
      githubUrl: "https://github.com/rohitsainidev/campus360",
    },
  ];

  const renderProjectCard = (project) => (
    <article
      key={project.id}
      className="projects-sec-card"
    >
      {/* Mockup Frame with inner padding */}
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noreferrer"
        className="projects-sec-mockup-frame"
        aria-label={`View live preview of ${project.title}`}
        onClick={(e) => {
          e.preventDefault();
          setActiveModalProject({
            ...project,
            targetUrl: project.liveUrl,
            targetType: "live",
          });
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
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
          <button
            type="button"
            className="projects-clean-btn live-btn"
            onClick={() =>
              setActiveModalProject({
                ...project,
                targetUrl: project.liveUrl,
                targetType: "live",
              })
            }
            aria-label={`Launch preview for ${project.title}`}
          >
            <span>Live Preview</span>
            <FaArrowUpRightFromSquare size={12} />
          </button>
          <button
            type="button"
            className="projects-clean-btn code-btn"
            onClick={() =>
              setActiveModalProject({
                ...project,
                targetUrl: project.githubUrl,
                targetType: "code",
              })
            }
            aria-label={`View GitHub repository for ${project.title}`}
          >
            <FaGithub size={14} />
            <span>Code</span>
          </button>
        </div>
      </div>
    </article>
  );

  return (
    <section className="projects-sec-container projects-sec-visible" id="projects">
      {/* Background Ambient Glows */}
      <div className="projects-sec-glow-left" aria-hidden="true" />
      <div className="projects-sec-glow-right" aria-hidden="true" />

      <div className="projects-inner-wrapper">
        {/* Header */}
        <div className="projects-sec-header reveal-up">
          <span className="projects-sec-badge">PROJECTS</span>
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

      {/* Luxury Developer Access Modal */}
      <ProjectAccessModal
        project={activeModalProject}
        isOpen={Boolean(activeModalProject)}
        onClose={() => setActiveModalProject(null)}
        onLaunch={(url) => window.open(url, "_blank", "noopener,noreferrer")}
      />
    </section>
  );
}

export default Projects;