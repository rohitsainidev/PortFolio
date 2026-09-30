import { useState } from "react";
import {
  Home,
  User,
  Code2,
  FolderKanban,
  Mail,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";

import "./Navbar.css";

function GithubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.36 6.84 9.72.5.1.68-.22.68-.49v-1.72c-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.58 2.35 1.12 2.92.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.18 9.18 0 0 1 12 7.16c.85 0 1.7.12 2.5.36 1.9-1.33 2.74-1.05 2.74-1.05.56 1.41.21 2.45.11 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.35 4.81-4.58 5.06.36.32.68.95.68 1.91v2.83c0 .27.18.6.69.49A10.25 10.25 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function Navbar({ theme = "dark", toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      href: "#home",
      icon: Home,
    },
    {
      name: "About",
      href: "#about",
      icon: User,
    },
    {
      name: "Skills",
      href: "#skills",
      icon: Code2,
    },
    {
      name: "Projects",
      href: "#projects",
      icon: FolderKanban,
    },
    {
      name: "Contact",
      href: "#contact",
      icon: Mail,
    },
  ];

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo with colorful code brackets */}
        <a href="#home" className="logo" aria-label="Rohit Portfolio Home">
          <span className="logo-bracket open-bracket">&lt;</span>
          <span className="logo-name">Rohit</span>
          <span className="logo-slash">/</span>
          <span className="logo-bracket close-bracket">&gt;</span>
        </a>

        {/* Navigation */}
        <nav className={`nav-links ${mobileMenuOpen ? "mobile-open" : ""}`}>
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <a
                href={item.href}
                className="nav-item"
                key={item.name}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon size={16} strokeWidth={1.9} />
                <span>{item.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Actions (Theme Switcher + GitHub + Mobile Hamburger) */}
        <div className="navbar-actions">
          {/* Theme Toggle Button */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Switch to White Mode" : "Switch to Dark Mode"
            }
            title={
              theme === "dark" ? "Switch to White Mode" : "Switch to Dark Mode"
            }
          >
            {theme === "dark" ? (
              <Sun size={18} className="theme-toggle-icon sun-icon" />
            ) : (
              <Moon size={18} className="theme-toggle-icon moon-icon" />
            )}
          </button>

          {/* GitHub */}
          <a
            href="https://github.com/rohitsainidev"
            target="_blank"
            rel="noreferrer"
            className="github-btn"
          >
            <GithubIcon />
            <span>GitHub</span>
            <span className="github-arrow">↗</span>
          </a>

          {/* Mobile Toggle */}
          <button
            type="button"
            className={`menu-btn ${mobileMenuOpen ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;