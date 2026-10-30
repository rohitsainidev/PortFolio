import { useState, useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
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

  // Ultra-Fast High-Performance Scrolling: Native 120Hz Hardware Momentum on Mobile, Lenis on Desktop
  useEffect(() => {
    // Detect mobile touch devices (smartphones, tablets)
    const isMobileDevice =
      typeof window !== "undefined" &&
      (window.innerWidth <= 820 ||
        /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent) ||
        (window.matchMedia && window.matchMedia("(pointer: coarse)").matches));

    let lenis = null;
    let rafId = null;

    if (!isMobileDevice) {
      // Desktop: Ultra-fast responsive smooth wheel scrolling
      lenis = new Lenis({
        duration: 0.7,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 2.0,
        syncTouch: false,
        infinite: false,
      });

      window.lenis = lenis;

      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    }

    // Ultra-Fast Smooth Anchor Navigation for menu links
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        const targetId = anchor.getAttribute("href");
        if (targetId && targetId !== "#") {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            const offset = window.innerWidth <= 768 ? -70 : -80;
            if (lenis && !lenis.isStopped) {
              lenis.scrollTo(targetEl, { offset, duration: 0.65 });
            } else {
              const elementPosition = targetEl.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset + offset;
              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
              });
            }
          }
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick);
      if (lenis) {
        lenis.destroy();
        delete window.lenis;
      }
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
