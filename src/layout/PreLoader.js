import { Fragment, useEffect, useState } from "react";

const PreLoader = () => {
  const [shouldShow, setShouldShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [statusText, setStatusText] = useState("Initializing...");

  useEffect(() => {
    // Check if preloader has already been shown in this session
    if (typeof window !== "undefined") {
      const hasShown = sessionStorage.getItem("n2dev_preloader_shown");
      if (hasShown) {
        setShouldShow(false);
        return;
      }
      setShouldShow(true);
    }
  }, []);

  useEffect(() => {
    if (!shouldShow) return;

    let rafId = 0;
    let timeoutId = 0;
    const duration = 1800; // 1.8 second smooth loading animation
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3.5);
      const pct = Math.round(eased * 100);

      setProgress(pct);

      if (pct < 30) {
        setStatusText("INITIALIZING ENVIRONMENT");
      } else if (pct < 65) {
        setStatusText("LOADING PORTFOLIO ASSETS");
      } else if (pct < 95) {
        setStatusText("RENDERING INTERACTIVE CORE");
      } else {
        setStatusText("SYSTEM READY");
      }

      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setLeaving(true);
        if (typeof window !== "undefined") {
          sessionStorage.setItem("n2dev_preloader_shown", "true");
        }
        timeoutId = window.setTimeout(() => {
          const preloader = document.querySelector(".preloader");
          if (preloader) preloader.classList.add("loaded");
        }, 650);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [shouldShow]);

  if (!shouldShow) {
    return null;
  }

  return (
    <Fragment>
      <div
        className={`preloader site-preloader ${leaving ? "is-leaving" : ""}`}
        aria-busy={!leaving}
        aria-live="polite"
      >
        {/* Ambient Glows & Grid overlay */}
        <div className="site-preloader-bg" aria-hidden="true">
          <div className="site-preloader-glow-orb orb-1" />
          <div className="site-preloader-glow-orb orb-2" />
          <div className="site-preloader-grid-overlay" />
        </div>

        {/* Central Aligned Card Container */}
        <div className="site-preloader-content">
          <div className="site-preloader-card">
            {/* Animated Ring & Emblem */}
            <div className="site-preloader-emblem">
              <div className="emblem-ring emblem-ring-outer" />
              <div className="emblem-ring emblem-ring-inner" />
              <div className="emblem-orbit-dot" />

              <div className="emblem-logo-wrap">
                <img
                  src="assets/images/n2dev_logo.jpg"
                  alt="N2Dev Logo"
                  className="emblem-logo-img"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fallback = e.currentTarget.parentElement.querySelector(".emblem-fallback-text");
                    if (fallback) fallback.style.display = "block";
                  }}
                />
                <span className="emblem-fallback-text" style={{ display: "none" }}>
                  N²
                </span>
              </div>
            </div>

            {/* Brand Information */}
            <div className="site-preloader-info">
              <h1 className="site-preloader-title">
                NOYAL <span className="highlight">NIROSHAN</span>
              </h1>
              <div className="site-preloader-subtitle">
                <span className="badge-dot" />
                <span className="subtitle-text">FULL-STACK DEVELOPER &amp; SOFTWARE ENGINEER</span>
              </div>
            </div>

            {/* Dynamic Progress Indicator */}
            <div className="site-preloader-progress-section">
              <div className="progress-header">
                <span className="status-label">{statusText}</span>
                <span className="percentage-number">{String(progress).padStart(2, "0")}%</span>
              </div>

              <div
                className="progress-track"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
              >
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                >
                  <span className="progress-glow-head" />
                </div>
              </div>
            </div>

            {/* Footer Metadata */}
            <div className="site-preloader-footer">
              <span className="footer-tag">PORTFOLIO v2.0</span>
              <span className="footer-divider">•</span>
              <span className="footer-location">SRI LANKA</span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PreLoader;

