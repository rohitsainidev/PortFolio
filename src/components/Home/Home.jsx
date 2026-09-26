import { useEffect, useRef, useState } from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { HiOutlineMail } from "react-icons/hi";
import { FiArrowUpRight } from "react-icons/fi";
import "./Home.css";

const roles = [
  "Frontend Developer",
  "Full Stack Developer",
  "MERN Stack Developer",
  "Tech Innovator",
];

function Home() {
  const homeRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing animation
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let speed = isDeleting ? 40 : 90;

    if (!isDeleting && text === currentRole) {
      speed = 1800; // Pause on completed word
    } else if (isDeleting && text === "") {
      speed = 400; // Pause before typing next word
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(currentRole.substring(0, text.length + 1));
        if (text === currentRole) {
          setIsDeleting(true);
        }
      } else {
        setText(currentRole.substring(0, text.length - 1));
        if (text === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex]);

  // Reveal observer
  useEffect(() => {
    const section = homeRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("show");
          observer.unobserve(section);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="home" id="home" ref={homeRef}>
      {/* Background Ambient Glows */}
      <div className="home-ambient-glow glow-top-left" />
      <div className="home-ambient-glow glow-bottom-right" />

      <div className="home-container">
        {/* Left Content */}
        <div className="home-content">
          <p className="home-greeting">Hello, I'm</p>

          <h1 className="home-title">
            Rohit <span className="gradient-text">Kumar</span>
          </h1>

          {/* Typing Role */}
          <h2 className="home-role">
            <span className="role-prefix">I am a </span>
            <span className="typing-role">
              {text}
              <span className="cursor">|</span>
            </span>
          </h2>

          <p className="home-description">
            I craft responsive, modern, and high-performance web applications.
            Specializing in the MERN stack and frontend engineering with clean
            code, modern UI/UX, and scalable architecture.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="home-buttons">
            <a
              href="/Rohit-Kumar-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="primary-btn"
            >
              <span>View Resume</span>
              <FiArrowUpRight className="btn-icon" />
            </a>

            <a href="#projects" className="secondary-btn">
              <span>View Projects</span>
            </a>
          </div>

          {/* Social Quick Links */}
          <div className="home-socials">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="social-pill"
              aria-label="GitHub Profile"
            >
              <FaGithub />
              <span>GitHub</span>
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="social-pill"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedinIn />
              <span>LinkedIn</span>
            </a>

            <a
              href="#contact"
              className="social-pill"
              aria-label="Contact Email"
            >
              <HiOutlineMail />
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* Right Photo & Morphing Blob Showcase */}
        <div className="home-image-wrapper">
          {/* Ambient Radial Lighting */}
          <div className="blob-ambient-glow" />

          {/* Morphing Blob Stage */}
          <div className="morph-blob-stage">
            {/* Primary Glowing Cyan Contour Line */}
            <div className="blob-contour-line primary-cyan" aria-hidden="true" />

            {/* Secondary Purple Contour Accent Line */}
            <div className="blob-contour-line secondary-purple" aria-hidden="true" />

            {/* Inner Liquid Morphing Shape containing Rohit's Photo */}
            <div className="morph-blob-inner">
              <img
                src="/rohit-saini.png"
                alt="Rohit Kumar"
                className="morph-blob-img"
              />
              <div className="blob-lighting-overlay" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;