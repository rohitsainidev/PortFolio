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
      title: "Passion for UX/UI",
      desc: "Crafting intuitive, accessible, and delightful UI/UX experiences.",
    },
  ];

  const educationList = [
    {
      id: "01",
      level: "ACADEMIC",
      degree: "Bachelor of Technology",
      field: "Computer Science & Engineering",
      institute: "MIMIT, Malout, Punjab, India",
      university: "IKGPTU — I.K. Gujral Punjab Technical University",
      year: "2024 — 2028",
      scoreType: "CGPA",
      score: "7.5 / 10",
      status: "Currently Pursuing",
      desc: "Pursuing a B.Tech in Computer Science & Engineering under IKGPTU, with a focus on programming, web development, software engineering, and modern technologies through hands-on projects and continuous learning.",
      icon: <FaGraduationCap />,
      badgeColor: "purple",
    },
    {
      id: "02",
      level: "HIGHER SECONDARY",
      degree: "Higher Secondary Education",
      field: "Science / PCM (Physics, Chemistry, Maths)",
      institute: "S.B. Inter College, Bhagatpur, Moradabad, India",
      year: "2021 — 2023",
      scoreType: "PERCENTAGE",
      score: "85%",
      desc: "Completed Higher Secondary education with Physics, Chemistry, and Mathematics, developing a strong foundation in analytical thinking, problem-solving, and technical concepts.",
      icon: <FaSchool />,
      badgeColor: "cyan",
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
                    <div className="education-institute-group">
                      <p className="education-institute-main">{item.institute}</p>
                      {item.university && (
                        <p className="education-university">{item.university}</p>
                      )}
                    </div>

                    {item.score && (
                      <div className="education-result">
                        <span className="result-label">{item.scoreType}:</span>
                        <span className="result-value">{item.score}</span>
                        {item.status && (
                          <span className="result-status">· {item.status}</span>
                        )}
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