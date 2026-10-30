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

  // 100% Pure Native Hardware-Accelerated Scrolling (Zero JS Lag, 120Hz Mobile Momentum)
  useEffect(() => {
    // Smooth Anchor Navigation for menu links
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        const targetId = anchor.getAttribute("href");
        if (targetId && targetId !== "#") {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            const offset = window.innerWidth <= 768 ? -70 : -80;
            const elementPosition = targetEl.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset + offset;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return (
    <>
      {/* Professional Entrance Preloader */}
      <Preloader />

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
