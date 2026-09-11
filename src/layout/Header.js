import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {

  const openMenu = event => {
    event.preventDefault();
    const menu = document.querySelector(".menu-btn");
    if (menu.classList.contains("active")) {
      menu.classList.remove("active");
      menu.classList.add("no-touch");
      document.body.classList.remove("no-scroll");
      document
        .querySelector(".menu-full-overlay")
        .classList.remove("is-open");
      document
        .querySelector(".menu-full-overlay")
        .classList.remove("has-scroll");
      document
        .querySelector(".menu-full-overlay")
        .classList.remove("animate-active");
      setTimeout(function () {
        document
          .querySelector(".menu-full-overlay")
          .classList.remove("visible");
        menu.classList.remove("no-touch");
      }, 1000);
    } else {
      menu.classList.add("active", "no-touch");
      // var height = document.querySelector(window).height();
      // document.querySelector(".menu-full-overlay").css({ height: height });
      document.body.classList.add("no-scroll");
      document
        .querySelector(".menu-full-overlay")
        .classList.add("is-open", "visible");
      setTimeout(function () {
        document
          .querySelector(".menu-full-overlay")
          .classList.add("has-scroll", "animate-active");
        menu.classList.remove("no-touch");
      }, 1000);
    }
  };

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

  const [pageToggle, setPageToggle] = useState(false);

  const linkClick = () => {
    const menu = document.querySelector(".menu-btn");
    if (menu.classList.contains("active")) {
      menu.classList.remove("active");
      menu.classList.add("no-touch");
      document.body.classList.remove("no-scroll");
      document.querySelector(".menu-full-overlay").classList.remove("is-open");
      document
        .querySelector(".menu-full-overlay")
        .classList.remove("has-scroll");
      document
        .querySelector(".menu-full-overlay")
        .classList.remove("animate-active");
      setTimeout(function () {
        document
          .querySelector(".menu-full-overlay")
          .classList.remove("visible");
        menu.classList.remove("no-touch");
      }, 1000);
    } else {
      menu.classList.add("active", "no-touch");
      // var height = document.querySelector(window).height();
      // document.querySelector(".menu-full-overlay").css({ height: height });
      document.body.classList.add("no-scroll");
      document
        .querySelector(".menu-full-overlay")
        .classList.add("is-open", "visible");
      setTimeout(function () {
        document
          .querySelector(".menu-full-overlay")
          .classList.add("has-scroll", "animate-active");
        menu.classList.remove("no-touch");
      }, 1000);
    }
  };

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
            onClick={() => openMenu(event)}
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
                      <a
                        href="/#about-section"
                        onClick={() => linkClick()}
                      >
                        About
                      </a>
                    </li>
                    <li className="menu-item">
                      <a
                        href="/#resume-section"
                        onClick={() => linkClick()}
                      >
                        Resume
                      </a>
                    </li>
                    <li className="menu-item">
                      <Link href="/works">
                        <a onClick={() => linkClick()}>
                          Works
                        </a>
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link href="/graphic-design">
                        <a onClick={() => linkClick()}>
                          Graphic Design
                        </a>
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link href="/events">
                        <a onClick={() => linkClick()}>
                          Events &amp; Summits
                        </a>
                      </Link>
                    </li>

                    <li className="menu-item">
                      <Link href="/blog">
                        <a onClick={() => linkClick()}>
                          Blog
                        </a>
                      </Link>
                    </li>
                    <li className="menu-item">
                      <a
                        href="/#contact-section"
                        onClick={() => linkClick()}
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
