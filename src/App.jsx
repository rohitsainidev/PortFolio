import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Skill from "./components/Skill/Skill";
import Projects from "./components/Projects/Projects";
import Experience from "./components/Experience/Experience";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Preloader from "./components/Preloader/Preloader";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("portfolio-theme-v2") || "light";
  });

  // Sync theme changes with DOM and localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme-v2", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // 100% Pure Native Browser Scrolling & Fast One-Time Scroll Reveal
  useEffect(() => {
    // Smooth anchor navigation for menu links
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        const targetId = anchor.getAttribute("href");
        if (targetId && targetId !== "#") {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);

    // Global Scroll Reveal Observer: Triggers ONCE per element, zero scroll listener lag
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    const observeAll = () => {
      const elements = document.querySelectorAll(
        ".reveal-up, .reveal-left, .reveal-right, .reveal-scale"
      );
      elements.forEach((el) => observer.observe(el));
    };

    observeAll();

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      observer.disconnect();
    };
  }, []);

  const handlePreloaderComplete = () => {
    // Auto-reveal elements currently in the initial viewport
    requestAnimationFrame(() => {
      const elements = document.querySelectorAll(
        ".reveal-up, .reveal-left, .reveal-right, .reveal-scale"
      );
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add("is-revealed");
        }
      });
    });
  };

  return (
    <>
      {/* Professional Entrance Preloader */}
      <Preloader onComplete={handlePreloaderComplete} />

      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Home />
      <About />
      <Skill />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
