import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ContactForm from "../src/components/ContactForm";
import Layout from "../src/layout/Layout";

const ProjectIsotop = dynamic(() => import("../src/components/ProjectIsotop"), {
  ssr: false,
});

const GraphicDesignCarousel = dynamic(() => import("../src/components/GraphicDesignCarousel"), {
  ssr: false,
});

const EventsSection = dynamic(() => import("../src/components/EventsSection"), {
  ssr: false,
});

const mainSkills = [
  { name: "Web Development", percent: 95 },
  { name: "Applications Development", percent: 90 },
  { name: "Administration Management", percent: 85 },
  { name: "Graphic Design", percent: 80 },
  { name: "SEO", percent: 80 },
  { name: "Agentic-Based Coding", percent: 85 },
];

const SkillBar = ({ name, percent, index, active }) => {
  const [shown, setShown] = useState(0);
  const filled = Math.round(percent / 10);

  useEffect(() => {
    if (!active) {
      setShown(0);
      return undefined;
    }

    let frame = 0;
    const start = performance.now();
    const duration = 900;
    const delay = index * 140;

    const tick = (now) => {
      const elapsed = now - start - delay;
      if (elapsed < 0) {
        frame = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setShown(Math.round(percent * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, index, percent]);

  return (
    <div
      className={`skills-item${active ? " is-on" : ""}`}
      style={{ "--i": index }}
    >
      <div className="name">{name}</div>
      <div className={`dots dots-${percent}`}>
        <div className="dots-row">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              className={`dot${active && i < filled ? " is-filled" : ""}`}
              key={i}
              style={{ "--d": i }}
            />
          ))}
        </div>
      </div>
      <div className="value">
        <span className="num">{shown}%</span>
      </div>
    </div>
  );
};

const MainSkills = () => {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const start = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setActive(true));
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);

    const fallback = setTimeout(() => {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) start();
    }, 800);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      className={`skills-items main-skills-animated${active ? " is-animated" : ""}`}
      ref={ref}
    >
      <div className="p-title">MAIN SKILLS</div>
      {mainSkills.map((skill, index) => (
        <SkillBar
          key={skill.name}
          name={skill.name}
          percent={skill.percent}
          index={index}
          active={active}
        />
      ))}
    </div>
  );
};

const Index = () => {
  return (
    <Layout>
      <section className="section section-started">
        <div className="container">
          {/* Hero Started */}
          <div className="hero-started">
            <div
              className="slide"
            >
              <img src="assets/images/hero image.jpg" alt="Noyal Niroshan" />
              <span className="circle circle-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="749px"
                  height="375px"
                >
                  <path
                    fillRule="evenodd"
                    fill="#F5E6CA"
                    d="M749.000,0.000 C749.000,206.786 581.459,374.514 374.608,374.514 C167.758,374.514 -0.000,206.786 -0.000,0.000 "
                  />
                </svg>
              </span>
              <span className="circle circle-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="416px"
                  height="209px"
                >
                  <path
                    fillRule="evenodd"
                    fill="#E5C396"
                    d="M-0.000,209.000 C-0.000,94.252 93.051,0.745 207.835,0.745 C322.619,0.745 416.000,94.252 416.000,209.000 "
                  />
                </svg>
              </span>
              <span className="circle circle-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="416px"
                  height="209px"
                >
                  <path
                    fillRule="evenodd"
                    fill="#D4B886"
                    d="M-0.000,209.000 C-0.000,94.252 93.051,0.745 207.835,0.745 C322.619,0.745 416.000,94.252 416.000,209.000 "
                  />
                </svg>
              </span>
              <span className="circle circle-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="121px"
                  height="241px"
                >
                  <path
                    fillRule="evenodd"
                    fill="#C9AD7B"
                    d="M0.000,0.000 C66.624,0.000 120.402,54.096 120.402,120.733 C120.402,187.371 66.624,241.000 0.000,241.000 "
                  />
                </svg>
              </span>
              <span className="circle circle-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="232px"
                  height="117px"
                >
                  <path
                    fillRule="evenodd"
                    fill="rgb(245, 230, 202)"
                    d="M232.000,0.000 C232.000,64.151 180.376,116.580 116.238,116.580 C52.100,116.580 0.000,64.151 0.000,0.000 "
                  />
                </svg>
              </span>
            </div>
            <div className="content">
              <div className="titles">
                <div
                  className="subtitle"
                >
                  FULL STACK DEVELOPER
                </div>
                <h2
                  className="title"
                >
                  <span className="first-name">Noyal</span>
                  <span className="last-name">Niroshan</span>
                </h2>
              </div>
              <div
                className="description"
              >
                <p>
                  Freelance Software Engineer &amp; Web Developer with 2+ years
                  of experience and 50+ real client projects — covering web
                  apps, SEO, graphic design, admin systems, and agentic-based
                  coding.
                </p>
                <div className="social-links">
                  <a target="_blank" rel="noreferrer" href="https://github.com/NoyalNiroshan/" title="GitHub">
                    <i aria-hidden="true" className="fab fa-github" />
                  </a>
                  <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/noyal-niroshan/" title="LinkedIn">
                    <i aria-hidden="true" className="fab fa-linkedin-in" />
                  </a>
                  <a target="_blank" rel="noreferrer" href="https://www.facebook.com/share/1BxpwdYGmu/?mibextid=wwXIfr" title="Facebook">
                    <i aria-hidden="true" className="fab fa-facebook-f" />
                  </a>
                  <a target="_blank" rel="noreferrer" href="mailto:jenijeniston05@gmail.com" title="Email">
                    <i aria-hidden="true" className="fas fa-envelope" />
                  </a>
                  <a href="tel:+94776401799" title="Phone">
                    <i aria-hidden="true" className="fas fa-phone" />
                  </a>
                </div>
              </div>
            </div>
            <div className="info-list">
              <ul>
                <li>
                  Role <strong>Freelance Developer</strong>
                </li>
                <li>
                  Experience <strong>2+ Years</strong>
                </li>
                <li>
                  Projects <strong>50+ Client</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section
        className="section section-bg section-parallax section-parallax-1"
        id="about-section"
      >
        <div className="container">
          {/* Section Heading */}
          <div className="m-titles">
            <h2
              className="m-title"
            >
              About Me
            </h2>
          </div>
          <div className="row row-custom">
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 align-right">
              {/* Section numbers */}
              <div className="numbers-items">
                <div className="numbers-item">
                  <div className="icon">
                    <i aria-hidden="true" className="far fa-check-circle" />
                  </div>
                  <div className="num">10+</div>
                  <div className="title">
                    Full-Stack <br />
                    Web Apps
                  </div>
                </div>
                <div className="numbers-item">
                  <div className="icon">
                    <i aria-hidden="true" className="far fa-smile-beam" />
                  </div>
                  <div className="num">50+</div>
                  <div className="title">
                    Client <br />
                    Deliveries
                  </div>
                </div>
                <div className="numbers-item">
                  <div className="icon">
                    <i aria-hidden="true" className="far fa-gem" />
                  </div>
                  <div className="num">100%</div>
                  <div className="title">
                    Client <br />
                    Satisfaction
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 vertical-line">
              <div className="profile-box">
                <div className="text">
                  <p>
                    I&apos;m <strong>Noyal Niroshan</strong> — a freelance
                    Software Engineer &amp; Web Developer based in Jaffna, Sri
                    Lanka. With <strong>2+ years</strong> of hands-on experience
                    building <strong>10+ production-grade web applications</strong> and
                    delivering <strong>50+ client solutions</strong>, I help brands
                    and businesses launch faster with clean, scalable digital
                    products.
                  </p>
                  <p>
                    My work covers the full stack of delivery:{" "}
                    <strong>web development</strong>,{" "}
                    <strong>applications development</strong>,{" "}
                    <strong>administration &amp; management systems</strong>,{" "}
                    <strong>graphic design</strong>, <strong>SEO</strong>, and{" "}
                    <strong>agentic-based coding</strong>. I use modern AI-assisted
                    and agentic workflows to build, refine, and ship solutions
                    with better speed, quality, and consistency — without
                    compromising on structure or client goals.
                  </p>
                  <p>
                    From concept to deployment, I focus on usable interfaces,
                    search-friendly foundations, reliable backends, and
                    production-ready delivery. Currently available as a{" "}
                    <strong>freelancer</strong> for new builds, redesigns,
                    maintenance, SEO improvements, and long-term technical
                    partnerships.
                  </p>

                  <div className="about-focus">
                    <div className="about-focus-title">What I Work On</div>
                    <div className="about-focus-grid">
                      <div className="about-focus-item">
                        <i className="fas fa-globe" aria-hidden="true" />
                        <span>Web Development</span>
                      </div>
                      <div className="about-focus-item">
                        <i className="fas fa-laptop-code" aria-hidden="true" />
                        <span>Applications Development</span>
                      </div>
                      <div className="about-focus-item">
                        <i className="fas fa-tasks" aria-hidden="true" />
                        <span>Administration Management</span>
                      </div>
                      <div className="about-focus-item">
                        <i className="fas fa-palette" aria-hidden="true" />
                        <span>Graphic Design</span>
                      </div>
                      <div className="about-focus-item">
                        <i className="fas fa-search" aria-hidden="true" />
                        <span>SEO</span>
                      </div>
                      <div className="about-focus-item">
                        <i className="fas fa-robot" aria-hidden="true" />
                        <span>Agentic Coding</span>
                      </div>
                    </div>
                  </div>

                  <a href="#contact-section" className="btn">
                    <span>Contact Me</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="section section-parallax section-parallax-2"
        id="resume-section"
      >
        <div className="container">
          {/* Section Heading */}
          <div className="m-titles">
            <h2
              className="m-title"
            >
              My Resume
            </h2>
          </div>
          <div className="row row-custom">
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"></div>
            <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 vertical-line">
              {/* Description */}
              <div className="text">
                <p>
                  Freelance Software Engineer with <strong>2+ years</strong> of
                  experience and <strong>50+ real client projects</strong>{" "}
                  delivered across web development, applications, admin systems,
                  graphic design, SEO, and agentic-based coding. Strong in Laravel,
                  WordPress, ASP.NET MVC, PHP, and modern JavaScript — focused
                  on clean delivery and long-term client results.
                </p>
              </div>

              {/* Main Skills */}
              <MainSkills />

              {/* All Skills */}
              <div className="resume-skills-block">
                <div className="p-title">SKILLS</div>
                <div className="skill-groups">
                  <div className="skill-group">
                    <div className="skill-group-title">Programming Languages</div>
                    <div className="skill-tags">
                      <span>TypeScript</span>
                      <span>JavaScript (ES6+)</span>
                      <span>PHP 8.2+</span>
                      <span>Python 3.10+</span>
                      <span>C#</span>
                      <span>Java</span>
                    </div>
                  </div>
                  <div className="skill-group">
                    <div className="skill-group-title">Frameworks &amp; Modern Stacks</div>
                    <div className="skill-tags">
                      <span>Next.js 15</span>
                      <span>React 19</span>
                      <span>Laravel 11/12</span>
                      <span>Livewire 3</span>
                      <span>Filament PHP 3</span>
                      <span>MERN Stack</span>
                      <span>Node.js &amp; Express</span>
                      <span>ASP.NET Core 8 MVC</span>
                      <span>.NET 9 WinForms</span>
                      <span>Django 5.2</span>
                      <span>WordPress</span>
                      <span>Tailwind CSS v4</span>
                      <span>Bootstrap 5</span>
                      <span>Vite</span>
                      <span>Prisma ORM</span>
                      <span>EF Core 9</span>
                    </div>
                  </div>
                  <div className="skill-group">
                    <div className="skill-group-title">Databases &amp; Vector Stores</div>
                    <div className="skill-tags">
                      <span>MySQL 8.0</span>
                      <span>SQL Server</span>
                      <span>MongoDB</span>
                      <span>Redis</span>
                      <span>SQLite</span>
                      <span>FAISS Vector DB</span>
                    </div>
                  </div>
                  <div className="skill-group">
                    <div className="skill-group-title">Cloud, Infrastructure &amp; DevOps</div>
                    <div className="skill-tags">
                      <span>AWS (EC2, IAM)</span>
                      <span>Hostinger VPS</span>
                      <span>cPanel</span>
                      <span>DirectAdmin</span>
                      <span>hPanel</span>
                      <span>Netlify &amp; Render</span>
                      <span>Git &amp; GitHub</span>
                    </div>
                  </div>
                  <div className="skill-group">
                    <div className="skill-group-title">AI &amp; Agentic Technologies</div>
                    <div className="skill-tags">
                      <span>Cursor AI</span>
                      <span>Agentic-Based Coding</span>
                      <span>Claude Cowork</span>
                      <span>Groq AI Chatbots</span>
                      <span>Hugging Face Transformers</span>
                      <span>Flan-T5 &amp; MiniLM Embeddings</span>
                      <span>NotebookLLM</span>
                    </div>
                  </div>
                  <div className="skill-group">
                    <div className="skill-group-title">APIs, Auth &amp; Payments</div>
                    <div className="skill-tags">
                      <span>Stripe Payments &amp; Webhooks</span>
                      <span>Firebase Auth</span>
                      <span>Clerk Auth</span>
                      <span>JWT &amp; OAuth 2.0</span>
                      <span>Socket.IO Realtime</span>
                      <span>Spatie RBAC</span>
                      <span>REST APIs</span>
                    </div>
                  </div>
                  <div className="skill-group">
                    <div className="skill-group-title">SEO, Analytics &amp; Visual Design</div>
                    <div className="skill-tags">
                      <span>On-Page SEO</span>
                      <span>Technical SEO</span>
                      <span>Chart.js &amp; Recharts</span>
                      <span>Graphic Design</span>
                      <span>Canva</span>
                    </div>
                  </div>
                  <div className="skill-group">
                    <div className="skill-group-title">Development Tools &amp; IDEs</div>
                    <div className="skill-tags">
                      <span>Antigravity IDE</span>
                      <span>VS Code</span>
                      <span>Visual Studio 2022</span>
                      <span>Postman API Platform</span>
                      <span>XAMPP</span>
                    </div>
                  </div>
                  <div className="skill-group">
                    <div className="skill-group-title">Soft Skills &amp; Professional Attributes</div>
                    <div className="skill-tags">
                      <span>Communication</span>
                      <span>Teamwork</span>
                      <span>Problem Solving</span>
                      <span>Adaptability</span>
                      <span>Time Management</span>
                      <span>Project Ownership</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="p-title">SERVICES</div>
              <div className="services-items resume-services">
                <div className="services-col">
                  <div className="services-item">
                    <div className="icon" aria-hidden="true">
                      <i className="fas fa-globe" />
                    </div>
                    <div className="services-body">
                      <div className="title">Web Development</div>
                      <div className="text">
                        <p>
                          Business websites, landing pages, and CMS builds with
                          WordPress, Laravel, and modern front-end stacks.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="services-col">
                  <div className="services-item">
                    <div className="icon" aria-hidden="true">
                      <i className="fas fa-laptop-code" />
                    </div>
                    <div className="services-body">
                      <div className="title">Applications Development</div>
                      <div className="text">
                        <p>
                          Custom web applications, dashboards, APIs, and product
                          features tailored to real business workflows.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="services-col">
                  <div className="services-item">
                    <div className="icon" aria-hidden="true">
                      <i className="fas fa-tasks" />
                    </div>
                    <div className="services-body">
                      <div className="title">Administration Management</div>
                      <div className="text">
                        <p>
                          Admin panels, operations tools, and content systems that
                          keep teams organised and delivery on track.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="services-col">
                  <div className="services-item">
                    <div className="icon" aria-hidden="true">
                      <i className="fas fa-palette" />
                    </div>
                    <div className="services-body">
                      <div className="title">Graphic Design</div>
                      <div className="text">
                        <p>
                          Visual assets, social creatives, and brand-ready graphics
                          that support product and marketing needs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="services-col">
                  <div className="services-item">
                    <div className="icon" aria-hidden="true">
                      <i className="fas fa-search" />
                    </div>
                    <div className="services-body">
                      <div className="title">SEO</div>
                      <div className="text">
                        <p>
                          Search-friendly structure, on-page optimisation, and
                          technical SEO improvements that help sites get found.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="services-col">
                  <div className="services-item">
                    <div className="icon" aria-hidden="true">
                      <i className="fas fa-robot" />
                    </div>
                    <div className="services-body">
                      <div className="title">Agentic-Based Coding</div>
                      <div className="text">
                        <p>
                          AI-assisted and agentic coding workflows that accelerate
                          building, automation, testing, and iteration.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* History */}
              <div className="resume-history">
                <div className="history-col">
                  <div className="history-items">
                    <div className="p-title">EDUCATION</div>
                    <div className="history-item">
                      <div className="date">2025 – 2026</div>
                      <div className="history-body">
                        <div className="name">
                          BEng (Hons) Software Engineering (Top Up) — First Class
                        </div>
                        <div className="subname">
                          London Metropolitan University / ESOFT Metro Campus, Jaffna
                        </div>
                        <div className="text">
                          <p>
                            Top Performer at London Metropolitan University
                            Graduation 2026. Awarded First Class Honours.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="history-item">
                      <div className="date">2022 – 2025</div>
                      <div className="history-body">
                        <div className="name">
                          HND in Information Technology — Distinction (GPA 3.99)
                        </div>
                        <div className="subname">
                          SLIATE — Advanced Technological Institute, Jaffna
                        </div>
                        <div className="text">
                          <p>
                            Coursework: OOP, Data Structures &amp; Algorithms,
                            DBMS, Software Engineering, Computer Networks,
                            Machine Learning, and Statistics.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="history-item">
                      <div className="date">2020 – 2021</div>
                      <div className="history-body">
                        <div className="name">Diploma in English</div>
                        <div className="subname">
                          British College of Education, Jaffna
                        </div>
                      </div>
                    </div>
                    <div className="history-item">
                      <div className="date">2017 – 2020</div>
                      <div className="history-body">
                        <div className="name">G.C.E. Advanced Level</div>
                        <div className="subname">
                          Nelliady Central College, Jaffna
                        </div>
                        <div className="text">
                          <p>
                            Business Studies (C), Economics (C), Accounting (S),
                            English (B)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="history-items">
                    <div className="p-title">AWARDS</div>
                    <div className="history-item">
                      <div className="date">2026</div>
                      <div className="history-body">
                        <div className="name">Top Performer</div>
                        <div className="subname">London Met / ESOFT Graduation</div>
                        <div className="text">
                          <p>
                            Recognised as Top Performer in BEng (Hons) Software
                            Engineering (Top Up) at London Metropolitan
                            University Graduation 2026.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="history-item">
                      <div className="date">2022 – 2025</div>
                      <div className="history-body">
                        <div className="name">HND Distinction — GPA 3.99</div>
                        <div className="subname">SLIATE</div>
                        <div className="text">
                          <p>
                            Completed Higher National Diploma in Information
                            Technology with Distinction and a 3.99 GPA.
                          </p>
                        </div>
                      </div>
                    </div>
                    <a
                      className="btn resume-cv-btn"
                      href="assets/images/noyal.pdf"
                      download="noyal.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>Download CV</span>
                    </a>
                  </div>
                </div>

                <div className="history-col">
                  <div className="history-items">
                    <div className="p-title">EXPERIENCE</div>
                    <div className="history-item">
                      <div className="date">May 2026 – Present</div>
                      <div className="history-body">
                        <div className="name">Freelance Developer</div>
                        <div className="subname">
                          Web, Apps, Admin Systems, Design &amp; Agentic Dev
                        </div>
                        <div className="text">
                          <p>
                            Delivering freelance projects for clients across web
                            development, applications, administration management,
                            graphic design, and agentic development — from build
                            to deployment and ongoing support.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="history-item">
                      <div className="date">Apr 2025 – Apr 2026</div>
                      <div className="history-body">
                        <div className="name">Junior Web Developer &amp; Branch Admin</div>
                        <div className="subname">
                          Altitude1 (PVT) LTD — Subsidiary of Prime One Global (PVT) LTD
                        </div>
                        <div className="text">
                          <p>
                            Built websites and web applications across multiple
                            niches, independently handled core-level client
                            projects, and contributed to team delivery with
                            strong ownership and professional growth.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="history-item">
                      <div className="date">Aug 2024 – Jan 2025</div>
                      <div className="history-body">
                        <div className="name">Innovay Pvt Ltd</div>
                        <div className="subname">
                          Web Developer Intern — Jaffna, Sri Lanka
                        </div>
                        <div className="text">
                          <p>
                            Developed WordPress and Laravel sites, integrated
                            payment gateways, managed hosting via cPanel, and
                            refined apps from client feedback. Collaborated with
                            digital marketing on content, campaigns, and product
                            imagery for better online presentation.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="clear" />
            </div>
          </div>
        </div>
      </section>
      <section
        className="section section-bg section-parallax section-parallax-5"
        id="works-section"
      >
        <div className="container">
          {/* Section Heading */}
          <div className="m-titles">
            <h2
              className="m-title"
            >
              Projects
            </h2>
          </div>
          <div className="row row-custom">
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"></div>
            <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 vertical-line">
              {/* Description */}
              <div
                className="text"
              >
                <p>
                  A Collection of my favorite projects I&apos;ve designed
                  recently. Feeling great while sharing here.
                </p>
              </div>
            </div>
          </div>
          {/* Works */}
          <ProjectIsotop itemsPerPage={4} />
        </div>
      </section>

      {/* Graphic Design Carousel Section */}
      <GraphicDesignCarousel />

      {/* GITEX Asia 2026 Events Section */}
      <EventsSection />

      <ContactForm />
    </Layout>
  );
};
export default Index;
