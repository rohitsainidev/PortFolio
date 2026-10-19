import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  FaLock,
  FaLockOpen,
  FaXmark,
  FaArrowUpRightFromSquare,
  FaUser,
  FaEnvelope,
  FaCircleCheck,
} from "react-icons/fa6";
import "./ProjectAccessModal.css";

export default function ProjectAccessModal({ project, isOpen, onClose, onLaunch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // 'idle' | 'unlocking' | 'granted'
  const [errorMsg, setErrorMsg] = useState("");
  const modalRef = useRef(null);
  const nameInputRef = useRef(null);

  // Focus input and completely freeze background scrolling (HTML, Body, Lenis, and Wheel/Touch)
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      window.lenis?.stop();
      setStatus("idle");
      setErrorMsg("");

      // Complete wheel & touch lock on background
      const preventBackgroundScroll = (e) => {
        if (!modalRef.current || !modalRef.current.contains(e.target)) {
          e.preventDefault();
        }
      };

      window.addEventListener("wheel", preventBackgroundScroll, { passive: false });
      window.addEventListener("touchmove", preventBackgroundScroll, { passive: false });

      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 150);

      return () => {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        window.lenis?.start();
        window.removeEventListener("wheel", preventBackgroundScroll);
        window.removeEventListener("touchmove", preventBackgroundScroll);
      };
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      window.lenis?.start();
      setStatus("idle");
      setErrorMsg("");
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  // Trigger unlock and launch
  const executeLaunch = (leadData = null) => {
    setStatus("unlocking");

    if (leadData) {
      try {
        const stored = JSON.parse(localStorage.getItem("portfolio_leads") || "[]");
        stored.push({
          ...leadData,
          project: project.title,
          targetType: project.targetType || "live",
          timestamp: new Date().toISOString(),
        });
        localStorage.setItem("portfolio_leads", JSON.stringify(stored));
      } catch {
        // Silently handle
      }
    }

    setTimeout(() => {
      setStatus("granted");
      setTimeout(() => {
        const destUrl = project.targetUrl || project.liveUrl;
        onLaunch(destUrl);
        onClose();
      }, 350);
    }, 400);
  };

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("Please enter your name");
      nameInputRef.current?.focus();
      return;
    }
    setErrorMsg("");
    executeLaunch({
      name: name.trim(),
      email: email.trim() || "not_provided",
    });
  };

  // Skip / guest bypass
  const handleGuestBypass = () => {
    executeLaunch({
      name: "Guest Visitor",
      email: "guest@bypass.access",
    });
  };

  return createPortal(
    <div
      className="access-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget && status === "idle") {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="access-modal-title"
    >
      {/* Background ambient lighting */}
      <div className="access-modal-backdrop-glow" />

      <div className="access-modal-dialog" ref={modalRef}>
        {/* Top border accent line */}
        <div className="access-modal-top-accent" />

        {/* Close Button */}
        <button
          className="access-modal-close"
          onClick={onClose}
          aria-label="Close modal"
          disabled={status !== "idle"}
        >
          <FaXmark size={15} />
        </button>

        {/* Modal Header */}
        <div className="access-modal-header">
          <div className="access-modal-badge">
            {status === "idle" ? (
              <>
                <FaLock size={12} className="access-badge-icon" />
                <span>PROJECT ACCESS</span>
              </>
            ) : (
              <>
                <FaLockOpen size={12} className="access-badge-icon unlock" />
                <span>ACCESS GRANTED</span>
              </>
            )}
          </div>

          <h3 id="access-modal-title" className="access-modal-title">
            Unlock{" "}
            <span className="gradient-text">
              {project.profileName || project.title}
            </span>
            {project.targetType === "code" ? " Code" : ""}
          </h3>

          <p className="access-modal-desc">
            {project.targetType === "profile"
              ? `Please enter your name to visit ${project.profileName || project.title}.`
              : project.targetType === "code"
              ? "Please enter your name to view the GitHub repository."
              : "Please enter your name to launch the live preview."}
          </p>
        </div>

        {/* Dynamic Body Content */}
        {status === "idle" ? (
          <form className="access-modal-form" onSubmit={handleSubmit}>
            {/* Input 1: Name */}
            <div className="access-input-group">
              <label htmlFor="access-name" className="access-label">
                Your Name <span className="access-required">*</span>
              </label>
              <div className="access-input-wrapper">
                <FaUser className="access-input-icon" size={13} />
                <input
                  id="access-name"
                  ref={nameInputRef}
                  type="text"
                  className={`access-input ${errorMsg ? "input-has-error" : ""}`}
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errorMsg) setErrorMsg("");
                  }}
                  autoComplete="name"
                />
              </div>
              {errorMsg && <span className="access-error-text">{errorMsg}</span>}
            </div>

            {/* Input 2: Email */}
            <div className="access-input-group">
              <label htmlFor="access-email" className="access-label">
                Email Address <span className="access-optional">(optional)</span>
              </label>
              <div className="access-input-wrapper">
                <FaEnvelope className="access-input-icon" size={13} />
                <input
                  id="access-email"
                  type="email"
                  className="access-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="access-actions-wrap">
              <button type="submit" className="access-submit-btn">
                <span>
                  {project.targetType === "profile"
                    ? `Open ${project.profileName || "Profile"}`
                    : project.targetType === "code"
                    ? "Open GitHub Repository"
                    : "Open Project Preview"}
                </span>
                <FaArrowUpRightFromSquare size={13} />
              </button>

              <button
                type="button"
                className="access-guest-btn"
                onClick={handleGuestBypass}
              >
                <span>Skip & Continue as Guest</span>
                <span className="guest-arrow">→</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="access-unlocking-state">
            <div className="unlock-icon-circle">
              <FaCircleCheck size={28} className="unlock-check-icon" />
            </div>
            <h4 className="unlock-heading">Access Granted</h4>
            <p className="unlock-subtext">
              Opening {project.profileName || project.title}...
            </p>
            <div className="unlock-loader-bar">
              <div className="unlock-loader-fill" />
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
