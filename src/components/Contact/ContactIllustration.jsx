import React from "react";
import "./ContactIllustration.css";

/**
 * ContactIllustration
 * – Envelope flap opens/closes with smooth animation (letter slides in/out)
 * – Paper airplane flies in a smooth professional loop IN FRONT only
 * – Works in both dark & light themes
 */
function ContactIllustration() {
  return (
    <div
      className="contact-illustration-wrap"
      aria-label="Animated contact mail illustration"
    >
      <div className="illustration-ambient-glow" aria-hidden="true" />

      <svg
        className="contact-mail-svg"
        viewBox="0 0 600 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* ── Filters ── */}
          <filter id="envShadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="16" stdDeviation="20" floodColor="#180a3a" floodOpacity="0.38" />
          </filter>
          <filter id="badgeShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="5" stdDeviation="7" floodColor="#160836" floodOpacity="0.22" />
          </filter>
          <filter id="cardShadow" x="-20%" y="-20%" width="145%" height="150%">
            <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#160836" floodOpacity="0.24" />
          </filter>
          <filter id="planeShadow" x="-90%" y="-90%" width="280%" height="280%">
            <feDropShadow dx="0" dy="18" stdDeviation="15" floodColor="#0f0525" floodOpacity="0.30" />
          </filter>
          <filter id="flapFoldShadow" x="-10%" y="0%" width="120%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#150838" floodOpacity="0.35" />
          </filter>

          {/* ── Clip Paths ── */}
          {/* Clips letter to envelope interior cavity so it never pokes out the bottom */}
          <clipPath id="letterCavityClip">
            <path d="M 140 50 L 460 50 L 460 374 C 460 384 451 392 439 392 L 161 392 C 149 392 140 384 140 374 Z" />
          </clipPath>

          {/* Clips envelope front folds to rounded bottom corners */}
          <clipPath id="envBodyClip">
            <path d="M 145 185 L 455 185 L 455 372 C 455 382 447 390 437 390 L 163 390 C 153 390 145 382 145 372 Z" />
          </clipPath>

          {/* ── Background Gradients ── */}
          <radialGradient id="blobOuterDark" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#4c26a6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#200d52" stopOpacity="0.16" />
          </radialGradient>
          <radialGradient id="blobInnerDark" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#5d2fc7" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#35157d" stopOpacity="0.18" />
          </radialGradient>
          <radialGradient id="blobOuterLight" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#cdc5f7" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#e8e4fb" stopOpacity="0.65" />
          </radialGradient>
          <radialGradient id="blobInnerLight" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#e8e4fb" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#cdc5f7" stopOpacity="0.80" />
          </radialGradient>

          {/* ── Envelope Gradients (Matching reference #624ae4 & #3c21d1) ── */}
          <linearGradient id="flapOpenGrad" x1="300" y1="85" x2="300" y2="185" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#6c53ed" />
            <stop offset="100%" stopColor="#624ae4" />
          </linearGradient>
          <linearGradient id="flapClosedGrad" x1="300" y1="185" x2="300" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#624ae4" />
            <stop offset="100%" stopColor="#553cdb" />
          </linearGradient>
          <linearGradient id="leftFoldGrad" x1="145" y1="185" x2="300" y2="390" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#684fed" />
            <stop offset="100%" stopColor="#624ae4" />
          </linearGradient>
          <linearGradient id="rightFoldGrad" x1="455" y1="185" x2="300" y2="390" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#624ae4" />
            <stop offset="100%" stopColor="#5940e0" />
          </linearGradient>
          {/* ── Airplane & Contrail Gradients ── */}
          <linearGradient id="contrailGrad" x1="100" y1="390" x2="510" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#8b5cf6" stopOpacity="0.10" />
            <stop offset="30%"  stopColor="#a855f7" stopOpacity="0.40" />
            <stop offset="65%"  stopColor="#38bdf8" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="planeWingTopGrad" x1="-60" y1="-22" x2="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <linearGradient id="planeWingBotGrad" x1="-56" y1="21" x2="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
        </defs>

        {/* ══════════════════ 1. BACKGROUND BLOBS ══════════════════ */}
        <ellipse className="blob-outer" cx="300" cy="270" rx="230" ry="215" />
        <ellipse className="blob-inner" cx="290" cy="265" rx="180" ry="170" />

        {/* Floor shadow under envelope */}
        <ellipse className="env-ground-shadow" cx="300" cy="406" rx="142" ry="12" />

        {/* ══════════════════ 2. ENVELOPE GROUP ══════════════════ */}
        <g className="illustration-envelope-group">

          {/* ── A. Envelope Interior Back Wall (inside cavity behind letter) ── */}
          <path
            className="env-cavity-back"
            d="M 145 185 L 455 185 L 455 372 C 455 382 447 390 437 390 L 163 390 C 153 390 145 382 145 372 Z"
            fill="#2c14a8"
            filter="url(#envShadow)"
          />

          {/* ── B. OPEN Flap (triangle pointing UP) ── */}
          {/* Hinge is at Y = 185 */}
          <g className="env-open-flap-group">
            <polygon
              className="open-flap-shape"
              points="145,185 300,85 455,185"
              fill="url(#flapOpenGrad)"
            />
          </g>

          {/* ── C. Letter (nested INSIDE pocket, visible in V-opening) ── */}
          <g className="illustration-letter-wrap" clipPath="url(#letterCavityClip)">
            <g className="illustration-letter">
              {/* White card */}
              <rect
                className="letter-card"
                x="180" y="140" width="240" height="150" rx="10"
              />
              {/* Header pill bar */}
              <rect
                className="letter-line-header"
                x="208" y="158" width="84" height="11" rx="5.5"
              />
              {/* Text lines */}
              <rect
                className="letter-line"
                x="208" y="180" width="184" height="6" rx="3"
              />
              <rect
                className="letter-line"
                x="208" y="196" width="184" height="6" rx="3"
              />
              <rect
                className="letter-line"
                x="208" y="212" width="126" height="6" rx="3"
              />
            </g>
          </g>

          {/* ── D. Envelope Front Pocket (Folds IN FRONT of the letter!) ── */}
          <g clipPath="url(#envBodyClip)">
            {/* Bottom triangular fold pointing UP - reference image deep contrasting fold */}
            <polygon
              className="env-bottom-fold"
              points="145,390 300,270 455,390"
              fill="#3c21d1"
            />
            {/* Left triangular fold */}
            <polygon
              className="env-left-fold"
              points="145,185 300,270 145,390"
              fill="url(#leftFoldGrad)"
            />
            {/* Right triangular fold */}
            <polygon
              className="env-right-fold"
              points="455,185 300,270 455,390"
              fill="url(#rightFoldGrad)"
            />
          </g>

          {/* ── E. CLOSED Flap (triangle pointing DOWN — seals envelope when closed) ── */}
          <g className="env-closed-flap-group" filter="url(#flapFoldShadow)">
            <polygon
              className="closed-flap-shape"
              points="145,185 300,280 455,185"
              fill="url(#flapClosedGrad)"
            />
          </g>

          {/* ── F. @ Badge (Upper-left, overlapping left flap & notch) ── */}
          <g className="illustration-at-badge" filter="url(#badgeShadow)">
            <circle className="at-badge-bg" cx="198" cy="254" r="23" />
            <circle className="at-badge-border" cx="198" cy="254" r="23" />
            <text
              className="at-badge-text"
              x="198" y="262"
              textAnchor="middle"
              fontSize="24"
              fontWeight="700"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
            >@</text>
          </g>

          {/* ── G. ID Card (Lower-right, overlapping right & bottom fold) ── */}
          <g className="illustration-id-card" filter="url(#cardShadow)">
            <rect
              className="id-card-bg"
              x="320" y="296" width="124" height="60" rx="10"
            />
            {/* Avatar icon */}
            <circle className="id-avatar-circle" cx="348" cy="326" r="16" />
            <circle className="id-avatar-head"   cx="348" cy="321" r="6" />
            <path
              className="id-avatar-body"
              d="M 336 337 C 336 331, 341 328, 348 328 C 355 328, 360 331, 360 337 Z"
            />
            {/* Card info bars */}
            <rect className="id-card-primary-bar" x="374" y="312" width="34" height="6" rx="3" />
            <rect className="id-card-bar"         x="374" y="323" width="56" height="4" rx="2" />
            <rect className="id-card-bar"         x="374" y="333" width="56" height="4" rx="2" />
            <rect className="id-card-bar"         x="374" y="343" width="40" height="4" rx="2" />
          </g>
        </g>

        {/* ══════════════════ 3. NATURAL 3D GLIDING PAPER AIRPLANE ══════════════════ */}
        <g className="illustration-plane-rig" filter="url(#planeShadow)">
          {/* Inner glide core: produces natural aerodynamic soaring, lift & flutter */}
          <g className="plane-glide-core">
            {/* Underbelly keel (shadowed fold - creates real 3D depth) */}
            <polygon className="plane-keel" points="0,0  -40,6  -32,0" fill="#94a3b8" />

            {/* Bottom wing (lower shaded wing) */}
            <polygon className="plane-wing-bot" points="0,0  -32,0  -50,18" fill="url(#planeWingBotGrad)" />

            {/* Bottom wing inner fold facet */}
            <polygon className="plane-fold-bot" points="0,0  -40,6  -50,18" fill="#b0c0d4" opacity="0.85" />

            {/* Top wing (main illuminated wing) */}
            <polygon className="plane-wing-top" points="0,0  -56,-19  -36,-2" fill="url(#planeWingTopGrad)" />

            {/* Top wing inner fold facet */}
            <polygon className="plane-fold-top" points="0,0  -36,-2  -32,0" fill="#f1f5fa" />

            {/* Sharp center spine crease */}
            <line className="plane-spine" x1="0" y1="0" x2="-42" y2="0" stroke="#7e95ad" strokeWidth="1.4" strokeLinecap="round" />

            {/* Leading edge reflection highlight */}
            <line className="plane-highlight" x1="0" y1="0" x2="-56" y2="-19" stroke="#ffffff" strokeWidth="1.1" opacity="0.95" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default ContactIllustration;
