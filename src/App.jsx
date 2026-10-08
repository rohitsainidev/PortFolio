import { useState, useEffect, useRef } from "react";
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
  const progressBarRef = useRef(null);
  const [isAppLoaded, setIsAppLoaded] = useState(false);
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

  // Lenis Luxury Smooth Scrolling & Reveal Observer (Desktop + Mobile Touch)
  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll with Mobile Touch Support
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Silky exponential ease
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.05,
      syncTouch: true, // Enables buttery smooth scrolling on mobile & touch devices
      syncTouchLerp: 0.08, // Smooth momentum interpolation for finger touch
      touchMultiplier: 1.35, // Natural, responsive touch scroll speed
      touchInertiaExponent: 1.6, // Soft momentum glide on finger release
      infinite: false,
    });

    window.lenis = lenis;

    // Directly update progress bar on animation frame without triggering React re-renders
    lenis.on("scroll", ({ progress }) => {
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progress * 100}%`;
      }
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // 2. Global Scroll Reveal Observer with dynamic node support
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    const observeAll = () => {
      const elements = document.querySelectorAll(
        ".reveal-up, .reveal-left, .reveal-right, .reveal-scale"
      );
      elements.forEach((el) => observer.observe(el));
    };

    observeAll();

    // 3. Smooth anchor link scrolling with Lenis (Desktop + Mobile)
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        const targetId = anchor.getAttribute("href");
        if (targetId && targetId !== "#") {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            if (lenis.isStopped) {
              lenis.start();
            }
            const offset = window.innerWidth <= 768 ? -70 : -80;
            lenis.scrollTo(targetEl, { offset, duration: 1.15 });
          }
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);

    // MutationObserver to auto-observe dynamically mounted elements on tab clicks
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick);
      observer.disconnect();
      mutationObserver.disconnect();
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  const handlePreloaderComplete = () => {
    setIsAppLoaded(true);
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

      {/* Top Scroll Progress Bar (Zero re-render DOM update) */}
      <div
        ref={progressBarRef}
        className="global-scroll-progress"
        aria-hidden="true"
      />

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