import { useEffect, useRef, useState } from "react";
import {
  FaCode,
  FaServer,
  FaWrench,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaBootstrap,
  FaNodeJs,
  FaNetworkWired,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa6";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiVite,
  SiVercel,
  SiPostman,
} from "react-icons/si";
import { FiLayers } from "react-icons/fi";
import "./Skill.css";

// Official Canva Logo
const CanvaIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.62 13.78c-1.02.94-2.32 1.42-3.8 1.42-2.95 0-5.18-2.07-5.18-5.2 0-3.08 2.2-5.2 5.14-5.2 1.44 0 2.7.46 3.68 1.36.26.24.28.64.04.9-.24.26-.64.28-.9.04-.8-.74-1.8-1.12-2.82-1.12-2.3 0-3.96 1.62-3.96 4.02 0 2.45 1.7 4.02 4 4.02 1.14 0 2.14-.38 2.92-1.1.26-.24.66-.22.9.04.24.26.22.66-.02.92z" />
  </svg>
);

// Official VS Code Logo
const VSCodeIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
    <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .32 8.688l3.96 3.308-3.96 3.31a1 1 0 0 0 .007 1.426l1.322 1.202c.369.335.926.357 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.94-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
  </svg>
);

// Official OpenAI / ChatGPT Logo
const OpenAIIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.677l5.815 3.355-2.02 1.168a.076.076 0 0 1-.067 0L4.002 14.07A4.499 4.499 0 0 1 2.34 7.896zm15.985 3.86l-5.839-3.37 2.019-1.162a.076.076 0 0 1 .067 0l4.82 2.782a4.499 4.499 0 0 1-.676 8.105v-5.679a.79.79 0 0 0-.391-.676zm2.036-4.043l-.142-.085-4.779-2.758a.776.776 0 0 0-.785 0L8.809 8.24V5.907a.08.08 0 0 1 .033-.062l4.84-2.793a4.5 4.5 0 0 1 6.679 4.639zM11.08 13.75l-2.748-1.587 2.748-1.586 2.748 1.586-2.748 1.587z" />
  </svg>
);

function Skills() {
  const skillsRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  useEffect(() => {
    const section = skillsRef.current;
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

  const skillCategories = [
    {
      id: "frontend",
      themeClass: "skills-theme-frontend",
      categoryIcon: <FaCode />,
      title: "FRONTEND",
      accent: "#a855f7",
      skills: [
        { name: "HTML5", icon: <FaHtml5 />, color: "#e34f26", type: "Markup", level: 95 },
        { name: "CSS3", icon: <FaCss3Alt />, color: "#1572b6", type: "Styling", level: 90 },
        { name: "JavaScript", icon: <FaJs />, color: "#f7df1e", type: "Programming", level: 88 },
        { name: "React", icon: <FaReact />, color: "#61dafb", type: "UI Library", level: 88 },
        { name: "NextJS", icon: <SiNextdotjs />, color: "#ffffff", type: "React Framework", level: 78 },
        { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#38bdf8", type: "CSS Framework", level: 86 },
        { name: "Bootstrap", icon: <FaBootstrap />, color: "#7952b3", type: "CSS Framework", level: 82 },
        { name: "Canva", icon: <CanvaIcon />, color: "#00c4cc", type: "Design Tool", level: 85 },
      ],
    },
    {
      id: "backend",
      themeClass: "skills-theme-backend",
      categoryIcon: <FaServer />,
      title: "BACKEND",
      accent: "#38bdf8",
      skills: [
        { name: "NodeJS", icon: <FaNodeJs />, color: "#68a063", type: "Runtime", level: 82 },
        { name: "Express", icon: <SiExpress />, color: "#e2e8f0", type: "Backend Framework", level: 80 },
        { name: "MongoDB", icon: <SiMongodb />, color: "#47a248", type: "NoSQL Database", level: 82 },
        { name: "MySQL", icon: <SiMysql />, color: "#00758f", type: "SQL Database", level: 76 },
        { name: "REST API", icon: <FaNetworkWired />, color: "#a855f7", type: "API Architecture", level: 86 },
      ],
    },
    {
      id: "devops",
      themeClass: "skills-theme-devops",
      categoryIcon: <FaWrench />,
      title: "DEVOPS & TOOLS",
      accent: "#ec4899",
      skills: [
        { name: "Git", icon: <FaGitAlt />, color: "#f05032", type: "Version Control", level: 86 },
        { name: "GitHub", icon: <FaGithub />, color: "#ffffff", type: "Code Hosting", level: 88 },
        { name: "Vite", icon: <SiVite />, color: "#646cff", type: "Build Tool", level: 86 },
        { name: "Vercel", icon: <SiVercel />, color: "#ffffff", type: "Cloud Deployment", level: 82 },
        { name: "Postman", icon: <SiPostman />, color: "#ff6c37", type: "API Testing", level: 80 },
        { name: "VS Code", icon: <VSCodeIcon />, color: "#007acc", type: "Code Editor", level: 92 },
        { name: "ChatGPT", icon: <OpenAIIcon />, color: "#10a37f", type: "AI Productivity", level: 90 },
      ],
    },
  ];

  const filteredCategories =
    activeFilter === "all"
      ? skillCategories
      : skillCategories.filter((c) => c.id === activeFilter);

  return (
    <section
      className={`skills-sec-container ${isSectionVisible ? "skills-sec-visible" : ""}`}
      id="skills"
      ref={skillsRef}
    >
      {/* Background Ambient Glows */}
      <div className="skills-sec-glow-left" aria-hidden="true" />
      <div className="skills-sec-glow-right" aria-hidden="true" />

      <div className="skills-inner-wrapper">
        {/* Header */}
        <div className="skills-sec-header reveal-up">
          <span className="skills-sec-badge">SKILLS</span>
          <h2 className="skills-sec-title">
            WHAT I <span className="gradient-text">WORK WITH</span>
          </h2>
          <p className="skills-sec-desc">
            Technologies and tools I use to build modern, responsive, and
            high-performance digital experiences.
          </p>

          {/* Filter Pills */}
          <div className="skills-filter-pills">
            <button
              className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => setActiveFilter("all")}
            >
              <FiLayers size={14} />
              <span>All ({skillCategories.reduce((acc, c) => acc + c.skills.length, 0)})</span>
            </button>
            <button
              className={`filter-btn ${activeFilter === "frontend" ? "active" : ""}`}
              onClick={() => setActiveFilter("frontend")}
            >
              <FaCode size={14} />
              <span>Frontend ({skillCategories.find((c) => c.id === "frontend")?.skills.length})</span>
            </button>
            <button
              className={`filter-btn ${activeFilter === "backend" ? "active" : ""}`}
              onClick={() => setActiveFilter("backend")}
            >
              <FaServer size={14} />
              <span>Backend ({skillCategories.find((c) => c.id === "backend")?.skills.length})</span>
            </button>
            <button
              className={`filter-btn ${activeFilter === "devops" ? "active" : ""}`}
              onClick={() => setActiveFilter("devops")}
            >
              <FaWrench size={14} />
              <span>DevOps &amp; Tools ({skillCategories.find((c) => c.id === "devops")?.skills.length})</span>
            </button>
          </div>
        </div>

        {/* Skills Grid */}
        <div className={`skills-sec-grid filter-${activeFilter}`}>
          {filteredCategories.map((cat) => (
            <article
              key={cat.id}
              className={`skills-sec-card ${cat.themeClass}`}
              style={{
                "--card-accent": cat.accent,
              }}
            >
              {/* Card Top */}
              <div className="skills-sec-card-top">
                <div className="skills-sec-card-icon">{cat.categoryIcon}</div>
                <div className="skills-sec-card-heading">
                  <h3>{cat.title}</h3>
                  <span>{cat.skills.length} TECHNOLOGIES</span>
                </div>
              </div>

              {/* Divider */}
              <div className="skills-sec-divider">
                <span />
              </div>

              {/* Skill Items List */}
              <div className={`skills-sec-list ${activeFilter !== "all" ? "skills-grid-expanded" : ""}`}>
                {cat.skills.map((skill) => (
                  <div className="skills-sec-item" key={skill.name}>
                    <div className="skills-sec-info">
                      <div className="skills-sec-left">
                        <span
                          className="skills-sec-tech-icon"
                          style={{ color: skill.color }}
                        >
                          {skill.icon}
                        </span>
                        <div className="skills-sec-tech-text">
                          <strong>{skill.name}</strong>
                          <small>{skill.type}</small>
                        </div>
                      </div>

                      <span className="skills-sec-percent">{skill.level}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="skills-sec-progress-track">
                      <span
                        className="skills-sec-progress-fill"
                        style={{
                          "--skill-fill-level": `${skill.level}%`,
                          "--skill-color": skill.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;