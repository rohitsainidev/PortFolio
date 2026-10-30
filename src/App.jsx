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

  // Ultra-Fast High-Performance Smooth Scrolling (Mobile Touch + Desktop)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.65, // Brisk & snappy completion, no sluggish drag
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Snappy exponential curve
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 2.2, // Ultra-fast desktop scroll distance per wheel flick
      syncTouch: true, // Enables ultra-fast acceleration on mobile & touchscreens
      syncTouchLerp: 0.16, // Instant touch velocity response, zero lag behind finger
      touchMultiplier: 2.5, // Ultra-fast mobile touch swipe glide (2.5x distance)
      touchInertiaExponent: 1.25, // Powerful, smooth glide on finger release
      infinite: false,
    });

    window.lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Ultra-Fast Smooth Anchor Navigation for menu links
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
            lenis.scrollTo(targetEl, { offset, duration: 0.65 });
          }
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      delete window.lenis;
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
