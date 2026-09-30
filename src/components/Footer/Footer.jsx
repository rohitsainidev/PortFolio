import { FaGithub, FaLinkedin, FaXTwitter, FaDiscord, FaHeart } from "react-icons/fa6";
import { FiMail, FiMapPin } from "react-icons/fi";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      {/* Top subtle glow line */}
      <div className="footer-top-line">
        <span className="footer-glow-bar" />
      </div>

      <div className="footer-inner">
        {/* Top Section */}
        <div className="footer-top-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <a href="#home" className="footer-logo" aria-label="Rohit Portfolio Home">
              <span className="footer-bracket open-bracket">&lt;</span>
              <span className="footer-logo-name">Rohit</span>
              <span className="footer-slash">/</span>
              <span className="footer-bracket close-bracket">&gt;</span>
            </a>
            <p className="footer-tagline">
              Full-Stack Developer crafting fast, scalable, and visually captivating digital products.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-nav-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Quick Contact Info */}
          <div className="footer-contact-col">
            <h4 className="footer-col-title">Get In Touch</h4>
            <div className="footer-contact-items">
              <a href="mailto:darkbyte225@gmail.com" className="footer-contact-link">
                <FiMail className="footer-contact-icon" />
                <span>darkbyte225@gmail.com</span>
              </a>
              <div className="footer-contact-link non-clickable">
                <FiMapPin className="footer-contact-icon" />
                <span>Uttar Pradesh, India</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="footer-social-col">
            <h4 className="footer-col-title">Connect</h4>
            <p className="footer-social-sub">Follow my work &amp; journey</p>
            <div className="footer-social-icons">
              <a
                href="https://github.com/rohitsainidev"
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="GitHub Profile"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="Twitter Profile"
              >
                <FaXTwitter />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="Discord Community"
              >
                <FaDiscord />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © {currentYear} <strong>Rohit Kumar</strong>. Built with <FaHeart className="heart-icon" /> &amp; precision.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
