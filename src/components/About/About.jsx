import { useEffect, useRef, useState } from "react";
import {
  FaLightbulb,
  FaCompass,
  FaCode,
  FaGraduationCap,
  FaSchool,
  FaQuoteLeft,
  FaRocket,
  FaLaptopCode,
  FaHeart,
} from "react-icons/fa6";
import {
  FiArrowRight,
  FiCalendar,
  FiChevronDown,
  FiMapPin,
  FiCheckCircle,
  FiAward,
} from "react-icons/fi";
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
      title: "Full-Stack Developer",
      desc: "Architecting scalable, end-to-end web applications with modern React, Node.js, and database ecosystems.",
    },
    {
      icon: <FaRocket />,
      title: "Adaptive & Fast Learner",
      desc: "Quickly mastering cutting-edge tools, modern frameworks, and best practices to build impactful solutions.",
    },
    {
      icon: <FaHeart />,
      title: "Passion for UI/UX",
      desc: "Crafting pixel-perfect, accessible, and delightful digital experiences where modern design meets seamless interactivity.",
    },
  ];

  const educationList = [
    {
      id: "01",
      degree: "Bachelor of Technology — Computer Science & Engineering",
      institute: "MIMIT",
      university: "Punjab Technical University",
      period: "2024 — Present",
      score: "7.5 CGPA",
      desc: "Building strong foundations in computer science principles, Data Structures & Algorithms, full-stack web development, and software engineering.",
      icon: <FaGraduationCap />,
      accent: "purple",
    },
    {
      id: "02",
      degree: "Higher Secondary Education — Science (PCM)",
      institute: "S.B. Inter College",
      university:
        "Moradabad, UP",
      period: "2021 — 2023",
      score: "70.1%",
      desc: "Completed Higher Secondary education majoring in Physics, Chemistry, and Mathematics, developing strong analytical thinking and problem-solving skills.",
      icon: <FaSchool />,
      accent: "cyan",
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
            observer.unobserve(entry.target);
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

        {/* Split Layout: Left User Illustration + Right Highlights */}
        <div className="about-overview-layout reveal-scale">
          {/* Left Column: Transparent Illustration (Free floating, no box/card) */}
          <div className="about-illustration-col">
            <div className="about-illustration-free">
              <div className="about-illustration-glow" />
              <img
                src="/about-developer-transparent.png?v=leaf_plant_fixed_v8"
                alt="Rohit Saini - Full Stack MERN Developer"
                className="about-free-illustration"
                draggable="false"
              />
            </div>
          </div>

          {/* Right Column: Clean Highlights (No boxes, pure icons & typography) */}
          <div className="about-highlights-list">
            {highlights.map((item, idx) => (
              <div className={`about-highlight-item delay-${idx + 1}`} key={idx}>
                <div className="about-highlight-icon-box">{item.icon}</div>
                <div className="about-highlight-content">
                  <h3 className="about-highlight-title">{item.title}</h3>
                  <p className="about-highlight-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
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
                    I build modern, responsive, and user-focused web applications with
                    a strong focus on clean design, functionality, and performance. My
                    interest in web development started with understanding how websites
                    work and grew into a passion for turning ideas into complete digital
                    products.
                  </p>
                  {expanded && (
                    <div className="story-expanded-wrapper animate-expand">
                      <p>
                        I work with technologies including{" "}
                        <strong>React.js, JavaScript, Node.js, Express.js, MongoDB, and MySQL</strong>
                        , and use them to develop practical applications with intuitive
                        interfaces and reliable functionality. Through hands-on projects and
                        development experience, I’ve strengthened my skills in problem-solving,
                        frontend development, backend integration, databases, and user experience.
                      </p>
                      <p>
                        I’m focused on creating web solutions that are{" "}
                        <strong>scalable, maintainable, and easy to use</strong>, while
                        continuously improving my technical skills and staying updated with
                        modern web development practices.
                      </p>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className={`read-toggle-btn ${expanded ? "is-expanded" : ""}`}
                  onClick={() => setExpanded(!expanded)}
                  aria-expanded={expanded}
                >
                  <span className="btn-label">{expanded ? "Show Less" : "Read Full Story"}</span>
                  <FiChevronDown className="arrow" />
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
                    I believe good development is not just about writing code — it’s about
                    solving problems in a <strong>simple, efficient, and thoughtful way</strong>.
                  </p>
                  {expanded && (
                    <div className="story-expanded-wrapper animate-expand">
                      <p>
                        My focus is on writing <strong>clean and maintainable code</strong> while
                        creating interfaces that feel <strong>intuitive and easy to use</strong>.
                        I believe performance, accessibility, responsiveness, and user experience
                        should be considered from the beginning of a project rather than treated
                        as afterthoughts.
                      </p>
                      <p>
                        I also believe that technology is constantly evolving, so{" "}
                        <strong>continuous learning</strong> is an important part of becoming a
                        better developer. I stay curious, explore modern tools, and keep
                        improving through practical projects and real-world challenges.
                      </p>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className={`read-toggle-btn ${expanded ? "is-expanded" : ""}`}
                  onClick={() => setExpanded(!expanded)}
                  aria-expanded={expanded}
                >
                  <span className="btn-label">{expanded ? "Show Less" : "Read Philosophy"}</span>
                  <FiChevronDown className="arrow" />
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
                    I approach every project by first understanding the problem, the users,
                    and the purpose behind the product. Before jumping into development, I
                    like to plan the structure, functionality, and overall user experience.
                  </p>
                  {expanded && (
                    <div className="story-expanded-wrapper animate-expand">
                      <p>
                        My development process generally follows a clear path:
                      </p>
                      <div className="process-flow-container">
                        <span className="process-step">Understand</span>
                        <span className="process-arrow">→</span>
                        <span className="process-step">Plan</span>
                        <span className="process-arrow">→</span>
                        <span className="process-step">Design</span>
                        <span className="process-arrow">→</span>
                        <span className="process-step">Develop</span>
                        <span className="process-arrow">→</span>
                        <span className="process-step">Test</span>
                        <span className="process-arrow">→</span>
                        <span className="process-step">Improve</span>
                      </div>
                      <p>
                        I focus on building <strong>responsive and scalable applications</strong> with
                        a clean structure and a polished user interface. During development, I pay
                        attention to performance, usability, code quality, and maintainability.
                      </p>
                      <p>
                        After completing the core functionality, I test the application, identify
                        areas for improvement, and refine the experience based on practical requirements.
                        My goal is to build products that are not only functional, but also{" "}
                        <strong>reliable, visually polished, and enjoyable to use</strong>.
                      </p>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className={`read-toggle-btn ${expanded ? "is-expanded" : ""}`}
                  onClick={() => setExpanded(!expanded)}
                  aria-expanded={expanded}
                >
                  <span className="btn-label">{expanded ? "Show Less" : "Explore Methodology"}</span>
                  <FiChevronDown className="arrow" />
                </button>
              </article>
            )}
          </div>
        </div>

        {/* Academic Journey (Matches Website Aesthetic) */}
        <div className="education-section reveal-up">
          <div className="education-header">
            <span className="about-badge">ROADMAP</span>
            <h2 className="education-title">
              My Academic <span className="gradient-text">Journey</span>
            </h2>
            <p className="education-subtitle">
              Formal education and engineering foundations that developed my core problem-solving mindset, technical principles, and software development skills.
            </p>
          </div>

          <div className="education-list">
            {educationList.map((item) => (
              <div className={`education-item edu-accent-${item.accent}`} key={item.id}>
                <div className="education-icon-wrap">
                  {item.icon}
                </div>

                <div className="education-body">
                  <div className="education-top-bar">
                    <h3 className="education-degree-text">{item.degree}</h3>
                    <div className="education-meta-text">
                      <span className="edu-time">
                        <FiCalendar size={13} />
                        <span>{item.period}</span>
                      </span>
                      <span className="edu-dot">•</span>
                      <span className="edu-score-val">
                        <FiAward size={13} />
                        <span>{item.score}</span>
                      </span>
                    </div>
                  </div>

                  <p className="education-place">
                    <FiMapPin size={12} className="edu-place-pin" />
                    <span>{item.institute}</span>
                    <span className="edu-separator">—</span>
                    <span>{item.university}</span>
                  </p>

                  <p className="education-desc-text">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;