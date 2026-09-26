import { useEffect, useRef, useState } from "react";
import {
  FaLightbulb,
  FaCompass,
  FaCode,
  FaGraduationCap,
  FaSchool,
  FaBookOpen,
  FaQuoteLeft,
  FaRocket,
  FaLaptopCode,
  FaHeart,
} from "react-icons/fa6";
import { FiArrowRight, FiCalendar, FiChevronDown } from "react-icons/fi";
import "./About.css";

function About() {
  const aboutRef = useRef(null);
  const [activeTab, setActiveTab] = useState("story");
  const [expanded, setExpanded] = useState(false);

  const tabs = [
    {
      id: "story",
      label: "My Story",
      icon: <FaLightbulb />,
    },
    {
      id: "philosophy",
      label: "Philosophy",
      icon: <FaCompass />,
    },
    {
      id: "approach",
      label: "Approach",
      icon: <FaCode />,
    },
  ];

  const highlights = [
    {
      icon: <FaLaptopCode />,
      title: "Full Stack Focus",
      desc: "Building end-to-end web apps with modern React and Node ecosystems.",
    },
    {
      icon: <FaRocket />,
      title: "Fast Learner",
      desc: "Constantly exploring cutting-edge tools, libraries, and frameworks.",
    },
    {
      icon: <FaHeart />,
      title: "Passion for UX",
      desc: "Crafting intuitive, accessible, and delightful interactive experiences.",
    },
  ];

  const educationList = [
    {
      id: "01",
      level: "ACADEMIC",
      degree: "Bachelor of Technology",
      field: "Computer Science & Engineering",
      institute: "Punjab Technical University (PTU)",
      year: "2024 — 2028",
      desc: "Pursuing B.Tech in Computer Science & Engineering under PTU, strengthening my skills in programming, web development and modern technologies through continuous learning and practical projects.",
      icon: <FaGraduationCap />,
      badgeColor: "purple",
    },
    {
      id: "02",
      level: "HIGHER SECONDARY",
      degree: "Higher Secondary Education",
      field: "Science / PCM (Physics, Chemistry, Maths)",
      institute: "Senior Secondary School",
      year: "2022 — 2024",
      score: "85%",
      desc: "Developed a strong foundation in mathematics, physics and analytical thinking while building problem-solving skills, curiosity and an interest in technology.",
      icon: <FaSchool />,
      badgeColor: "cyan",
    },
    {
      id: "03",
      level: "SECONDARY",
      degree: "Secondary Education",
      field: "Secondary School Certificate",
      institute: "High School",
      year: "2020 — 2022",
      score: "85%",
      desc: "Built the early foundation of learning, discipline, curiosity and problem-solving while developing a strong interest in technology and continuous learning.",
      icon: <FaBookOpen />,
      badgeColor: "pink",
    },
  ];

  /* Scroll reveal observer */
  useEffect(() => {
    const section = aboutRef.current;
    if (!section) return;

    const revealItems = section.querySelectorAll(".about-reveal-item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setExpanded(false);
  };

  return (
    <section className="about" id="about" ref={aboutRef}>
      {/* Background ambient glow spheres */}
      <div className="about-glow-orb orb-left" />
      <div className="about-glow-orb orb-right" />

      <div className="about-container">
        {/* Header */}
        <div className="about-header reveal-up">
          <span className="about-badge">ABOUT ME</span>
          <h2 className="about-main-title">
            A Journey of <span className="gradient-text">Curiosity & Creation</span>
          </h2>
          <p className="about-subtitle">
            Transforming complex technical concepts into intuitive, scalable,
            and aesthetically pleasing digital experiences.
          </p>
        </div>

        {/* Creative Highlight Pillars */}
        <div className="about-highlights-grid reveal-scale">
          {highlights.map((item, idx) => (
            <div className={`highlight-card delay-${idx + 1}`} key={idx}>
              <div className="highlight-icon-box">{item.icon}</div>
              <h3 className="highlight-title">{item.title}</h3>
              <p className="highlight-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Story / Philosophy / Approach Tabs */}
        <div className="about-tabs-container reveal-up">
          <div className="about-tabs-nav" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`about-tab-btn ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => handleTabChange(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="about-tab-content">
            {/* Story Tab */}
            {activeTab === "story" && (
              <article className="tab-pane animate-fade-in">
                <div className="tab-pane-header">
                  <div className="pane-icon-badge story-color">
                    <FaLightbulb />
                  </div>
                  <div>
                    <span className="pane-tag">THE GENESIS</span>
                    <h3 className="pane-title">
                      It started with pure <span className="highlight-purple">curiosity.</span>
                    </h3>
                  </div>
                </div>

                <div className={`pane-body ${expanded ? "expanded" : ""}`}>
                  <p>
                    When I first stepped into the world of programming, I was fascinated
                    by how lines of logic could turn an abstract thought into interactive,
                    living software. Starting from the ground up, I immersed myself in
                    web standards, algorithms, and full-stack development.
                  </p>
                  <p>
                    Over time, I discovered that building great software goes beyond syntax.
                    It requires deep empathy for user experience, structured thinking,
                    and clean architectural choices. Every project I undertake is an
                    opportunity to refine my craft, explore new paradigms, and engineer
                    delightful digital products.
                  </p>
                  {expanded && (
                    <p className="story-expanded-text">
                      Today, my focus is on building resilient MERN stack applications,
                      optimizing performance, and writing scalable, maintainable code.
                      The curiosity that drove my very first "Hello World" continues to
                      fuel my journey every single day.
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  className={`read-toggle-btn ${expanded ? "is-expanded" : ""}`}
                  onClick={() => setExpanded(!expanded)}
                  aria-expanded={expanded}
                >
                  <span className="btn-label">{expanded ? "Show Less" : "Read Full Story"}</span>
                  <span className="btn-icon-bubble">
                    <FiChevronDown className="arrow" />
                  </span>
                </button>
              </article>
            )}

            {/* Philosophy Tab */}
            {activeTab === "philosophy" && (
              <article className="tab-pane animate-fade-in">
                <div className="tab-pane-header">
                  <div className="pane-icon-badge philosophy-color">
                    <FaCompass />
                  </div>
                  <div>
                    <span className="pane-tag">GUIDING PRINCIPLES</span>
                    <h3 className="pane-title">
                      “Stay curious. <span className="highlight-cyan">Build with purpose.”</span>
                    </h3>
                  </div>
                </div>

                <blockquote className="philosophy-quote">
                  <FaQuoteLeft className="quote-icon" />
                  <span>
                    Great software is not created in a rush; it is thoughtfully designed,
                    iteratively improved, and built with genuine passion for quality.
                  </span>
                </blockquote>

                <div className={`pane-body ${expanded ? "expanded" : ""}`}>
                  <p>
                    I believe that consistency beats intensity. Taking the time to understand
                    the core problem before jumping into code ensures that every feature
                    serves a tangible purpose and delivers true value to users.
                  </p>
                  {expanded && (
                    <p className="story-expanded-text">
                      I treat every mistake as valuable data for growth. Continuous learning,
                      staying humble, and taking pride in craftsmanship are the cornerstones
                      of my engineering philosophy.
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  className={`read-toggle-btn ${expanded ? "is-expanded" : ""}`}
                  onClick={() => setExpanded(!expanded)}
                  aria-expanded={expanded}
                >
                  <span className="btn-label">{expanded ? "Show Less" : "Read Philosophy"}</span>
                  <span className="btn-icon-bubble">
                    <FiChevronDown className="arrow" />
                  </span>
                </button>
              </article>
            )}

            {/* Approach Tab */}
            {activeTab === "approach" && (
              <article className="tab-pane animate-fade-in">
                <div className="tab-pane-header">
                  <div className="pane-icon-badge approach-color">
                    <FaCode />
                  </div>
                  <div>
                    <span className="pane-tag">METHODOLOGY</span>
                    <h3 className="pane-title">
                      Turning ideas into <span className="highlight-purple">meaningful experiences.</span>
                    </h3>
                  </div>
                </div>

                <div className={`pane-body ${expanded ? "expanded" : ""}`}>
                  <p>
                    <strong>1. Understand & Blueprint:</strong> Deep dive into functional
                    requirements, information hierarchy, and UI architecture before writing
                    the first line of code.
                  </p>
                  <p>
                    <strong>2. Build & Iterate:</strong> Develop clean, modular components
                    with responsive layouts, intuitive state management, and optimized asset delivery.
                  </p>
                  {expanded && (
                    <p className="story-expanded-text">
                      <strong>3. Polish & Optimize:</strong> Rigorous testing, micro-interactions,
                      cross-browser verification, and performance profiling to ensure a flawless experience.
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  className={`read-toggle-btn ${expanded ? "is-expanded" : ""}`}
                  onClick={() => setExpanded(!expanded)}
                  aria-expanded={expanded}
                >
                  <span className="btn-label">{expanded ? "Show Less" : "Explore Methodology"}</span>
                  <span className="btn-icon-bubble">
                    <FiChevronDown className="arrow" />
                  </span>
                </button>
              </article>
            )}
          </div>
        </div>

        {/* Academic Roadmap */}
        <div className="education-section reveal-up">
          <div className="education-header">
            <span className="about-badge">ROADMAP</span>
            <h2 className="education-title">
              My Academic <span className="gradient-text">Journey.</span>
            </h2>
            <p className="education-subtitle">
              A journey of learning, growth and continuous improvement.
            </p>
          </div>

          <div className="education-roadmap">
            {/* Connecting Neon Line */}
            <div className="education-line">
              <span className="education-line-glow" />
            </div>

            <div className="education-timeline-list">
              {educationList.map((item, idx) => (
                <div
                  className={`education-item-wrapper card-${item.badgeColor} reveal-left delay-${idx + 1}`}
                  key={item.id}
                >
                  {/* Timeline Milestone Node Icon on the Spine */}
                  <div className="timeline-node">
                    <span className="node-icon">{item.icon}</span>
                  </div>

                  {/* Milestone Card with Year Inside on the Right Side */}
                  <article className="education-box">
                    <div className="education-box-top">
                      <div className="education-top-left">
                        <div className="education-number">{item.id}</div>
                        <span className={`education-status badge-${item.badgeColor}`}>
                          {item.level}
                        </span>
                      </div>

                      {/* Year badge inside the box on right side */}
                      <div className="education-year-pill">
                        <FiCalendar size={13} />
                        <span>{item.year}</span>
                      </div>
                    </div>

                    <h3>{item.degree}</h3>
                    <h4>{item.field}</h4>
                    <p className="education-institute">{item.institute}</p>

                    {item.score && (
                      <div className="education-result">
                        <span className="result-label">PERCENTAGE</span>
                        <span className="result-value">{item.score}</span>
                      </div>
                    )}

                    <p className="education-description">{item.desc}</p>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;