import { useState, useEffect } from "react";
import "./Preloader.css";

const CRITICAL_IMAGES = [
  "/rohit-saini.png",
  "/tourup.png",
  "/zyrivo.png",
  "/shorturl.png",
  "/tictactoe.png",
  "/favicon.svg",
];

function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Lock scroll during preloading
    document.body.style.overflow = "hidden";

    // Preload critical assets in background
    CRITICAL_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    let current = 0;
    const startTime = performance.now();
    const minDuration = 1350; // silky smooth, professional pacing

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const target = Math.min(100, Math.round((elapsed / minDuration) * 100));

      if (current < target) {
        current += Math.max(1, Math.floor((target - current) * 0.3));
      }

      setProgress(Math.min(100, current));

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsFinished(true);
            document.body.style.overflow = "";
            if (onComplete) onComplete();
          }, 750); // Matches smooth curtain slide-up
        }, 160);
      }
    }, 20);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (isFinished) return null;

  return (
    <div
      className={`preloader-overlay ${isExiting ? "preloader-exit" : ""}`}
      aria-label="Loading Portfolio"
      role="status"
    >
      {/* Dynamic Ambient Background Glow */}
      <div className="preloader-ambient-glow" aria-hidden="true" />

      <div className="preloader-content">
        {/* Precision Progress Ring & Monogram Assembly */}
        <div className="preloader-circle-wrapper">
          <svg className="preloader-progress-ring" viewBox="0 0 100 100">
            <defs>
              {/* Theme-Adaptive Circular Gradient */}
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--preloader-ring-start)" />
                <stop offset="50%" stopColor="var(--preloader-ring-mid)" />
                <stop offset="100%" stopColor="var(--preloader-ring-end)" />
              </linearGradient>

              {/* Theme-Adaptive Monogram Gradient */}
              <linearGradient id="monogramGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--preloader-r-start)" />
                <stop offset="100%" stopColor="var(--preloader-r-end)" />
              </linearGradient>
            </defs>

            {/* Background Track Circle */}
            <circle
              className="preloader-ring-track"
              cx="50"
              cy="50"
              r="44"
            />

            {/* Animated Active Progress Ring */}
            <circle
              className="preloader-ring-indicator"
              cx="50"
              cy="50"
              r="44"
              strokeDasharray={276.46}
              strokeDashoffset={276.46 - (progress / 100) * 276.46}
            />
          </svg>

          {/* Clean Floating Monogram "R" (Zero Box/Border) */}
          <div className="preloader-inner-icon">
            <svg
              className="preloader-r-icon"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 19 16 H 34 C 41 16 45 19.8 45 25.8 C 45 30.8 41.5 34.2 36.5 35.2 L 45 48 H 37.2 L 29.8 36.8 H 26.5 V 48 H 19 Z M 26.5 22.2 V 30.8 H 33.5 C 37 30.8 38.6 29 38.6 26.5 C 38.6 24 37 22.2 33.5 22.2 Z"
                fill="url(#monogramGrad)"
              />
            </svg>
          </div>
        </div>

        {/* Clean Monospace Digital Percentage Counter */}
        <div className="preloader-counter">
          <span className="preloader-percent-num">
            {String(progress).padStart(2, "0")}
          </span>
          <span className="preloader-percent-sym">%</span>
        </div>
      </div>
    </div>
  );
}

export default Preloader;
