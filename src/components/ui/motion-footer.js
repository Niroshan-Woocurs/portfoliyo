import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STYLES = `
@keyframes site-footer-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.site-footer {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(ellipse 80% 50% at 50% 0%, rgba(245, 230, 202, 0.08), transparent 55%),
    #0A0A0A;
  color: #fff;
  font-family: "Rubik", sans-serif;
  border-top: 1px solid rgba(245, 230, 202, 0.12);
  padding: 0 0 32px;
}

.site-footer-marquee {
  position: relative;
  z-index: 3;
  overflow: hidden;
  margin: 28px auto 0;
  width: min(1280px, calc(100% - 32px));
  padding: 18px 0;
  border: 1px solid rgba(245, 230, 202, 0.22);
  border-radius: 0;
  background: linear-gradient(
    90deg,
    rgba(245, 230, 202, 0.04) 0%,
    rgba(245, 230, 202, 0.14) 50%,
    rgba(245, 230, 202, 0.04) 100%
  );
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow:
    inset 0 1px 0 rgba(245, 230, 202, 0.12),
    0 18px 40px rgba(0, 0, 0, 0.25);
}

.site-footer-marquee::before,
.site-footer-marquee::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 80px;
  z-index: 2;
  pointer-events: none;
}

.site-footer-marquee::before {
  left: 0;
  background: linear-gradient(90deg, rgba(10, 10, 10, 0.85), transparent);
}

.site-footer-marquee::after {
  right: 0;
  background: linear-gradient(270deg, rgba(10, 10, 10, 0.85), transparent);
}

.site-footer-marquee-track {
  display: flex;
  width: max-content;
  animation: site-footer-marquee 32s linear infinite;
  will-change: transform;
}

.site-footer-marquee:hover .site-footer-marquee-track {
  animation-play-state: paused;
}

.site-footer-marquee-item {
  display: flex;
  align-items: center;
  gap: 36px;
  padding: 0 36px;
  white-space: nowrap;
  color: #F5E6CA;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.26em;
  text-transform: uppercase;
}

.site-footer-marquee-dot {
  color: #E5C396;
  opacity: 0.85;
  font-size: 11px;
}

.site-footer-glow {
  position: absolute;
  left: 50%;
  top: 28%;
  width: min(900px, 80vw);
  height: 320px;
  transform: translateX(-50%);
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(circle, rgba(245, 230, 202, 0.12) 0%, transparent 70%);
  filter: blur(55px);
}

.site-footer-brand {
  position: absolute;
  left: 50%;
  bottom: 6%;
  transform: translateX(-50%);
  width: 100%;
  text-align: center;
  pointer-events: none;
  user-select: none;
  font-family: "Sorts Mill Goudy", serif;
  font-size: clamp(80px, 18vw, 220px);
  line-height: 0.8;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(245, 230, 202, 0.08);
  background: linear-gradient(180deg, rgba(245, 230, 202, 0.13) 0%, transparent 75%);
  -webkit-background-clip: text;
  background-clip: text;
}

.site-footer-wrap {
  position: relative;
  z-index: 2;
  width: min(1180px, calc(100% - 48px));
  margin: 0 auto;
  padding: 72px 0 0;
}

.site-footer-hero {
  text-align: center;
  max-width: 760px;
  margin: 0 auto 48px;
}

.site-footer-eyebrow {
  margin: 0 0 16px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(245, 230, 202, 0.78);
}

.site-footer-title {
  margin: 0 0 16px;
  font-family: "Sorts Mill Goudy", serif;
  font-size: clamp(42px, 7vw, 72px);
  font-weight: 400;
  letter-spacing: -0.03em;
  line-height: 1.05;
  color: #fff;
}

.site-footer-copy {
  margin: 0 auto 30px;
  max-width: 480px;
  font-size: 15px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.58);
}

.site-footer-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.site-footer-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 168px;
  height: 50px;
  padding: 0 28px;
  border: 1px solid #F5E6CA;
  background: #F5E6CA;
  color: #111;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
}

.site-footer-btn:hover {
  background: transparent;
  color: #F5E6CA;
  transform: translateY(-2px);
}

.site-footer-btn-outline {
  background: transparent;
  color: #F5E6CA;
}

.site-footer-btn-outline:hover {
  background: rgba(245, 230, 202, 0.08);
}

.site-footer-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 28px;
  align-items: start;
  margin: 0 0 40px;
  padding: 36px 0 0;
  border-top: 1px solid rgba(245, 230, 202, 0.1);
}

.site-footer-col-title {
  display: block;
  margin: 0 0 16px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #F5E6CA;
}

.site-footer-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 18px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.site-footer-nav a {
  color: rgba(255, 255, 255, 0.55);
  font-size: 14px;
  text-decoration: none;
  transition: color 0.2s ease;
}

.site-footer-nav a:hover {
  color: #F5E6CA;
}

.site-footer-social {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.site-footer-social a {
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(245, 230, 202, 0.22);
  background: rgba(245, 230, 202, 0.04);
  color: #F5E6CA;
  font-size: 15px;
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.site-footer-social a:hover {
  background: rgba(245, 230, 202, 0.12);
  border-color: rgba(245, 230, 202, 0.5);
  transform: translateY(-2px);
}

.site-footer-meta {
  margin: 0;
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  line-height: 1.7;
}

.site-footer-meta a {
  color: rgba(255, 255, 255, 0.72);
  text-decoration: none;
  transition: color 0.2s ease;
}

.site-footer-meta a:hover {
  color: #F5E6CA;
}

.site-footer-bar {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: min(1180px, calc(100% - 48px));
  margin: 0 auto;
  padding-top: 22px;
  border-top: 1px solid rgba(245, 230, 202, 0.1);
}

.site-footer-legal {
  margin: 0;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.38);
  line-height: 1.5;
}

.site-footer-top {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  margin: 0;
  padding: 0;
  border: 1px solid rgba(245, 230, 202, 0.35);
  background: #F5E6CA;
  color: #111;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  -webkit-appearance: none;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease,
    transform 0.2s ease;
}

.site-footer-top:hover {
  background: transparent;
  color: #F5E6CA;
  border-color: #F5E6CA;
  transform: translateY(-2px);
}

.site-footer-top svg {
  width: 18px;
  height: 18px;
  display: block;
}

@media (max-width: 900px) {
  .site-footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .site-footer-brand-col {
    grid-column: 1 / -1;
  }
}

@media (max-width: 640px) {
  .site-footer {
    padding-bottom: 24px;
  }

  .site-footer-marquee {
    width: calc(100% - 24px);
    margin-top: 20px;
    padding: 15px 0;
  }

  .site-footer-marquee::before,
  .site-footer-marquee::after {
    width: 40px;
  }

  .site-footer-marquee-item {
    gap: 22px;
    padding: 0 22px;
    font-size: 11px;
    letter-spacing: 0.16em;
  }

  .site-footer-wrap,
  .site-footer-bar {
    width: calc(100% - 32px);
  }

  .site-footer-wrap {
    padding-top: 56px;
  }

  .site-footer-hero {
    margin-bottom: 36px;
  }

  .site-footer-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .site-footer-btn {
    width: 100%;
  }

  .site-footer-grid {
    grid-template-columns: 1fr;
    gap: 28px;
    margin-bottom: 32px;
  }

  .site-footer-bar {
    align-items: center;
    gap: 14px;
  }

  .site-footer-legal {
    font-size: 10px;
    flex: 1;
    min-width: 0;
  }

  .site-footer-top {
    width: 44px;
    height: 44px;
  }
}
`;

const MarqueeItem = () => (
  <div className="site-footer-marquee-item">
    <span>Full-Stack Development</span>
    <span className="site-footer-marquee-dot">✦</span>
    <span>UI / UX Design</span>
    <span className="site-footer-marquee-dot">✦</span>
    <span>Laravel · MERN · ASP.NET</span>
    <span className="site-footer-marquee-dot">✦</span>
    <span>Cloud &amp; AWS</span>
    <span className="site-footer-marquee-dot">✦</span>
    <span>AI Chatbots</span>
    <span className="site-footer-marquee-dot">✦</span>
    <span>Desktop Systems</span>
    <span className="site-footer-marquee-dot">✦</span>
  </div>
);

export function CinematicFooter() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <footer ref={sectionRef} className="site-footer" id="site-footer">
        <div className="site-footer-marquee" aria-hidden="true">
          <div className="site-footer-marquee-track">
            <MarqueeItem />
            <MarqueeItem />
          </div>
        </div>

        <div className="site-footer-glow" />
        <div className="site-footer-brand" aria-hidden="true">
          N²DEV
        </div>

        <div ref={contentRef} className="site-footer-wrap">
          <div className="site-footer-hero">
            <p className="site-footer-eyebrow">
              Noyal Niroshan · Full-Stack Developer &amp; Software Engineer
            </p>
            <h2 className="site-footer-title">Let&apos;s build something</h2>
            <p className="site-footer-copy">
              Freelance work, collaborations, and full-stack roles — clean
              delivery from idea to product.
            </p>
            <div className="site-footer-actions">
              <a href="/#contact-section" className="site-footer-btn">
                Contact Me
              </a>
              <a
                href="/works"
                className="site-footer-btn site-footer-btn-outline"
              >
                View Projects
              </a>
              <a
                href="assets/images/noyal.pdf"
                download="noyal.pdf"
                target="_blank"
                rel="noreferrer"
                className="site-footer-btn site-footer-btn-outline"
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="site-footer-grid">
            <div className="site-footer-brand-col">
              <span className="site-footer-col-title">Explore</span>
              <ul className="site-footer-nav">
                <li>
                  <a href="/#about-section">About</a>
                </li>
                <li>
                  <a href="/#resume-section">Resume</a>
                </li>
                <li>
                  <a href="/works">Projects</a>
                </li>
                <li>
                  <a href="/#contact-section">Contact</a>
                </li>
              </ul>
            </div>

            <div>
              <span className="site-footer-col-title">Connect</span>
              <div className="site-footer-social">
                <a
                  href="https://github.com/NoyalNiroshan/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <i className="fab fa-github" />
                </a>
                <a
                  href="https://www.linkedin.com/in/noyal-niroshan/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin-in" />
                </a>
                <a
                  href="https://www.facebook.com/share/1BxpwdYGmu/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="mailto:jenijeniston05@gmail.com" aria-label="Email">
                  <i className="fas fa-envelope" />
                </a>
                <a href="tel:+94776401799" aria-label="Phone">
                  <i className="fas fa-phone" />
                </a>
              </div>
            </div>

            <div>
              <span className="site-footer-col-title">Based in</span>
              <p className="site-footer-meta">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=117%2FA+Temple+Road%2C+Jaffna%2C+Sri+Lanka"
                  target="_blank"
                  rel="noreferrer"
                >
                  117 / A Temple Road, Jaffna
                </a>
                <br />
                <a href="mailto:jenijeniston05@gmail.com">
                  jenijeniston05@gmail.com
                </a>
                <br />
                <a href="tel:+94776401799">+94 77 640 1799</a>
              </p>
            </div>
          </div>
        </div>

        <div className="site-footer-bar">
          <p className="site-footer-legal">
            © 2026 Noyal Niroshan (N²Dev). All rights reserved.
          </p>
          <button
            type="button"
            className="site-footer-top"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      </footer>
    </>
  );
}

export default CinematicFooter;
