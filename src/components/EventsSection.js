import React from "react";
import Link from "next/link";
import { gitexEventData } from "../data/events";

const EventsSection = () => {
  return (
    <section className="section events-section" id="events-section">
      <div className="container">
        {/* Section Heading (Matching Projects & Graphic Design Structure) */}
        <div className="m-titles">
          <h2 className="m-title">Events &amp; Summits</h2>
        </div>

        <div className="row row-custom align-items-center">
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"></div>
          <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 vertical-line">
            <div className="text">
              <p>
                Represented <strong>Prime One Global (PVT) LTD</strong> and <strong>Altitude1 (PVT) LTD</strong> at <strong>GITEX Asia 2026 Singapore</strong> — Asia's Largest &amp; Most Global Tech, AI &amp; Startup Event.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Banner Layout featuring user's photo (1.jpeg) and official badge */}
        <div className="events-home-card">
          <div className="row align-items-center">
            {/* Left Column: User's Primary Representation Photo (1.jpeg) */}
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <div className="event-user-photo-frame">
                <img
                  src="assets/images/events/home/1.jpeg"
                  alt="Noyal Niroshan at GITEX Asia 2026 Singapore"
                  className="event-user-main-img"
                  loading="lazy"
                  decoding="async"
                />
                <div className="photo-emblem-overlay">
                  <img
                    src="assets/images/events/home/unnamed.png"
                    alt="GITEX Asia Badge"
                    className="emblem-mini-img"
                    loading="lazy"
                    decoding="async"
                  />
                  <span>GITEX Asia 2026</span>
                </div>
                <div className="user-photo-caption-bar">
                  <span className="user-name">Noyal Niroshan</span>
                  <span className="user-role">Prime One Global (PVT) LTD &amp; Altitude1 (PVT) LTD Delegate</span>
                </div>
              </div>
            </div>

            {/* Right Column: Event Story & Representation Details */}
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <div className="event-home-details">
                <div className="event-pill-row">
                  <span className="meta-tag"><i className="fas fa-map-marker-alt" /> Singapore</span>
                  <span className="meta-tag"><i className="fas fa-building" /> Prime One Global (PVT) LTD &amp; Altitude1 (PVT) LTD</span>
                  <span className="meta-tag"><i className="fas fa-robot" /> AI &amp; Tech Innovations</span>
                </div>

                <h3 className="event-card-title">
                  GITEX Asia 2026 Singapore
                </h3>
                <h4 className="event-card-subtitle">
                  Asia's Largest &amp; Most Global Tech, AI &amp; Startup Event
                </h4>

                <p className="event-card-desc">
                  Grateful for this incredible opportunity to represent <strong>Prime One Global (PVT) LTD</strong> and <strong>Altitude1 (PVT) LTD</strong> at GITEX Asia 2026 in Singapore. Engaged with global startups, tech executives, and innovators from the United States, Germany, Singapore, Italy, and Sri Lanka to explore future AI trends and enterprise solutions.
                </p>

                {/* Secondary Photo Preview from events/home */}
                <div className="event-secondary-photo-strip">
                  <div className="strip-item">
                    <img src="assets/images/events/home/2.jpeg" alt="GITEX Expo Hall" loading="lazy" decoding="async" />
                    <span>Global Tech Expo Hall</span>
                  </div>
                  <div className="strip-item badge-strip">
                    <img src="assets/images/events/home/unnamed.png" alt="GITEX Emblem" loading="lazy" decoding="async" />
                    <span>GITEX AI ASIA</span>
                  </div>
                </div>

                <div className="event-action-wrapper">
                  <Link href="/events">
                    <a className="btn circle event-explore-btn">
                      <span>Explore Full GITEX Event &amp; Gallery Showcase &rarr;</span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
