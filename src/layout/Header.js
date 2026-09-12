import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Header = () => {
  const router = useRouter();

  const closeMenu = () => {
    const menu = document.querySelector(".menu-btn");
    const overlay = document.querySelector(".menu-full-overlay");
    if (menu) {
      menu.classList.remove("active");
      menu.classList.remove("no-touch");
    }
    document.body.classList.remove("no-scroll");
    if (overlay) {
      overlay.classList.remove("is-open", "has-scroll", "animate-active", "visible");
    }
  };

  const openMenu = (event) => {
    if (event && event.preventDefault) event.preventDefault();
    const menu = document.querySelector(".menu-btn");
    const overlay = document.querySelector(".menu-full-overlay");

    if (menu && menu.classList.contains("active")) {
      closeMenu();
    } else {
      if (menu) menu.classList.add("active", "no-touch");
      document.body.classList.add("no-scroll");
      if (overlay) overlay.classList.add("is-open", "visible");
      setTimeout(function () {
        if (overlay) overlay.classList.add("has-scroll", "animate-active");
        if (menu) menu.classList.remove("no-touch");
      }, 300);
    }
  };

  const handleNavClick = (e, sectionId) => {
    closeMenu();
    if (!sectionId) return;

    if (window.location.pathname === "/" || window.location.pathname === "") {
      e.preventDefault();
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerOffset = 60;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
          if (window.history && window.history.pushState) {
            window.history.pushState(null, "", "#" + sectionId);
          }
        }
      }, 150);
    } else {
      e.preventDefault();
      router.push("/#" + sectionId);
    }
  };

  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash && (window.location.pathname === "/" || window.location.pathname === "")) {
        const targetId = hash.replace("#", "");
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            const headerOffset = 60;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }, 300);
      }
    };

    handleHashScroll();
    router.events.on("routeChangeComplete", handleHashScroll);
    return () => {
      router.events.off("routeChangeComplete", handleHashScroll);
    };
  }, [router]);

  useEffect(() => {
    const handleRouteChange = () => {
      closeMenu();
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  const [day, setDay] = useState(false);
  useEffect(() => {
    if (day) {
      localStorage.setItem("ober-mood", "day");
      document
        .querySelector("body")
        .classList.add("home", "page", "light-skin");
    } else {
      localStorage.setItem("ober-mood", "night");
      document
        .querySelector("body")
        .classList.remove("light-skin");
      document
        .querySelector("body")
        .classList.add("home", "page");
    }
  }, [day]);

  return (
    <header className="header">
      <div className="header__builder">
        <div className="row">
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            {/* logo hidden as requested */}
            <div className="logo" style={{ display: "none" }} />
          </div>
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 align-right">
            {/* menu btn */}
            <a
              href="#"
              className="menu-btn"
              onClick={(e) => openMenu(e)}
            >
              <span />
            </a>
          </div>
        </div>
      </div>
      {/* Menu Full Overlay */}
      <div className="menu-full-overlay" style={{ minHeight: "100vh" }}>
        <div className="menu-full-container">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-10 offset-1">
                {/* menu full */}
                <div className="menu-full">
                  <ul className="menu-full">
                    <li className="menu-item">
                      <Link href="/">
                        <a onClick={() => closeMenu()}>
                          Home
                        </a>
                      </Link>
                    </li>
                    <li className="menu-item">
                      <a
                        href="/#about-section"
                        onClick={(e) => handleNavClick(e, "about-section")}
                      >
                        About
                      </a>
                    </li>
                    <li className="menu-item">
                      <a
                        href="/#resume-section"
                        onClick={(e) => handleNavClick(e, "resume-section")}
                      >
                        Resume
                      </a>
                    </li>
                    <li className="menu-item">
                      <Link href="/works">
                        <a onClick={() => closeMenu()}>
                          Works
                        </a>
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link href="/graphic-design">
                        <a onClick={() => closeMenu()}>
                          Graphic Design
                        </a>
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link href="/events">
                        <a onClick={() => closeMenu()}>
                          Events &amp; Summits
                        </a>
                      </Link>
                    </li>

                    <li className="menu-item">
                      <a
                        href="/#contact-section"
                        onClick={(e) => handleNavClick(e, "contact-section")}
                      >
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* social */}
        <div className="menu-social-links">
          <a
            href="https://github.com/NoyalNiroshan/"
            target="_blank"
            rel="noreferrer"
            title="GitHub"
          >
            <i className="fab fa-github" />
          </a>
          <a
            href="https://www.linkedin.com/in/noyal-niroshan/"
            target="_blank"
            rel="noreferrer"
            title="LinkedIn"
          >
            <i className="fab fa-linkedin-in" />
          </a>
          <a
            href="https://www.facebook.com/share/1BxpwdYGmu/?mibextid=wwXIfr"
            target="_blank"
            rel="noreferrer"
            title="Facebook"
          >
            <i className="fab fa-facebook-f" />
          </a>
          <a
            href="mailto:jenijeniston05@gmail.com"
            title="Email"
          >
            <i className="fas fa-envelope" />
          </a>
          <a
            href="tel:+94776401799"
            title="Phone"
          >
            <i className="fas fa-phone" />
          </a>
        </div>
      </div>
    </header>
  );
};
export default Header;
