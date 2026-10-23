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

  // Fast, Crisp & Snappy Portfolio Smooth Scrolling
  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    let lenis = null;
    let rafId = null;

    const handleNativeScroll = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (progressBarRef.current) {
        const progress =
          scrollableHeight > 0
            ? (window.scrollY / scrollableHeight) * 100
            : 0;
        progressBarRef.current.style.width = `${progress}%`;
      }
    };

    if (!isTouchDevice) {
      // Desktop: Ultra-responsive modern lerp smooth scroll (snappy, fast, buttery)
      lenis = new Lenis({
        lerp: 0.12, // Instant velocity response, no sluggish fixed-duration delay
        wheelMultiplier: 1.45, // Generous, fast distance per wheel flick
        smoothWheel: true,
        syncTouch: false, // NEVER hijack mobile/touch devices
        infinite: false,
      });
      window.lenis = lenis;

      lenis.on("scroll", ({ progress }) => {
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${progress * 100}%`;
        }
      });

      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    } else {
      // Mobile / Touchscreen: 100% Native OS hardware-accelerated touch scroll
      window.addEventListener("scroll", handleNativeScroll, { passive: true });
      handleNativeScroll();
    }

    // Smooth anchor navigation for menu links
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        const targetId = anchor.getAttribute("href");
        if (targetId && targetId !== "#") {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            if (lenis) {
              lenis.scrollTo(targetEl, { offset: -80, duration: 0.8 });
            } else {
              targetEl.scrollIntoView({ behavior: "smooth" });
            }
          }
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);

    // Global Scroll Reveal Observer with dynamic node support
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
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

    // MutationObserver to auto-observe dynamically mounted elements on tab clicks
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleNativeScroll);
      document.removeEventListener("click", handleAnchorClick);
      observer.disconnect();
      mutationObserver.disconnect();
      if (lenis) {
        lenis.destroy();
        delete window.lenis;
      }
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