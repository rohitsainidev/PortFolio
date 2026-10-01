import { useState, useRef } from "react";
import {
  MapPin,
  Building2,
  GraduationCap,
  ChevronDown,
  Calendar,
} from "lucide-react";
import { FaLaptopCode } from "react-icons/fa6";
import "./Experience.css";

const experiencesData = [
  {
    id: "techsunware",
    role: "Web Development Intern",
    company: "Techsunware Private Limited",
    companyIcon: Building2,
    location: "Remote",
    type: "Internship",
    summary:
      "Contributed to frontend web development by building responsive interfaces and modular React.js components for client-facing applications.",
    keyPoints: [
      {
        title: "Frontend Engineering",
        desc: "Built responsive, accessible web interfaces using React.js, modern JavaScript, and HTML5/CSS3.",
      },
      {
        title: "Reusable Components",
        desc: "Engineered modular UI components optimized across mobile, tablet, and desktop viewports.",
      },
      {
        title: "Cross-Browser Quality",
        desc: "Enhanced website visual hierarchy and ensured seamless cross-browser compatibility.",
      },
      {
        title: "Agile Collaboration",
        desc: "Collaborated in sprint cycles to implement frontend features and resolve UI/UX issues.",
      },
    ],
  },
  {
    id: "fullstack-developer",
    role: "Full-Stack & Software Developer",
    company: "Self-Learning",
    companyIcon: GraduationCap,
    period: "Jul 2024 - Present",
    type: "Projects & Practical",
    summary:
      "Built responsive web applications using React.js, Next.js, Node.js, JavaScript, and MongoDB. Focused on both frontend and backend integration, creating full-stack solutions and improving UI/UX design skills.",
    keyPoints: [
      {
        title: "Full-Stack Architecture",
        desc: "Built end-to-end applications connecting Next.js/React frontends with Node.js and Express backend services.",
      },
      {
        title: "Database & APIs",
        desc: "Designed database schemas with MongoDB, structured RESTful APIs, and handled secure authentication flows.",
      },
      {
        title: "Modern JavaScript & State",
        desc: "Implemented modern ES6+ JavaScript, modular component patterns, and scalable state management.",
      },
      {
        title: "UI/UX & Performance",
        desc: "Crafted clean, accessible interfaces with responsive layouts and optimized render speeds.",
      },
    ],
  },
];

function ExperienceCard({ experience }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const CompanyIcon = experience.companyIcon || Building2;
  const hasKeyPoints = experience.keyPoints && experience.keyPoints.length > 0;
  const visiblePoints = hasKeyPoints
    ? isExpanded
      ? experience.keyPoints
      : experience.keyPoints.slice(0, 2)
    : [];

  return (
    <article className="exp-card exp-card-featured">
      {/* Card Header */}
      <div className="exp-card-header">
        <div className="exp-company-group">
          <div>
            <div className="exp-role-row">
              <h3 className="exp-role-title">{experience.role}</h3>
            </div>
            <div className="exp-company-name-row">
              <CompanyIcon size={15} className="exp-icon-muted" />
              <span className="exp-company-name">{experience.company}</span>
            </div>
          </div>
        </div>

        {/* Meta Details: Location, Period, Type */}
        <div className="exp-meta-row">
          {experience.location && (
            <span className="exp-meta-item location-item">
              <MapPin size={13} className="exp-meta-icon icon-location" />
              <span>{experience.location}</span>
            </span>
          )}
          {experience.period && (
            <span className="exp-meta-item period-item">
              <Calendar size={13} className="exp-meta-icon icon-period" />
              <span>{experience.period}</span>
            </span>
          )}
          {experience.type && (
            <span className="exp-meta-item type-item">
              <FaLaptopCode size={13} className="exp-meta-icon icon-type" />
              <span>{experience.type}</span>
            </span>
          )}
        </div>
      </div>

      {/* Summary Intro */}
      <p className="exp-summary-text">{experience.summary}</p>

      {/* Key Bullet Points */}
      {hasKeyPoints && (
        <div className="exp-points-container">
          <ul className="exp-points-list">
            {visiblePoints.map((point, pIdx) => (
              <li key={pIdx} className="exp-point-item reveal-fade-in">
                <span className="point-bullet" />
                <div className="point-text">
                  <strong className="point-title">{point.title}:</strong>{" "}
                  <span>{point.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Read More / Show Less Toggle Button */}
      {hasKeyPoints && experience.keyPoints.length > 2 && (
        <button
          type="button"
          className={`exp-read-more-btn ${isExpanded ? "is-expanded" : ""}`}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
        >
          <span className="btn-label">
            {isExpanded ? "Show Less" : "Read More (Key Highlights)"}
          </span>
          <ChevronDown size={15} className="arrow" />
        </button>
      )}
    </article>
  );
}

function Experience() {
  const sectionRef = useRef(null);

  return (
    <section className="experience-sec" id="experience" ref={sectionRef}>
      {/* Background ambient lighting */}
      <div className="exp-glow exp-glow-1" aria-hidden="true" />
      <div className="exp-glow exp-glow-2" aria-hidden="true" />

      <div className="exp-container">
        {/* Section Header */}
        <div className="exp-header reveal-up">
          <span className="exp-badge">CAREER & PRACTICAL EXPOSURE</span>
          <h2 className="exp-title">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="exp-subtitle">
            Hands-on professional engineering experience, developing responsive web
            applications and reusable frontend digital experiences.
          </p>
        </div>

        {/* Experience Cards Wrapper */}
        <div className="exp-cards-wrapper reveal-up delay-1">
          {experiencesData.map((exp, idx) => (
            <ExperienceCard key={exp.id || idx} experience={exp} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;


