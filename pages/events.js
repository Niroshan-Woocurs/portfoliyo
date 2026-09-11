import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../src/layout/Layout";
import { gitexEventData } from "../src/data/events";

const EventsPage = () => {
  const [filter, setFilter] = useState("All");
  const [selectedMedia, setSelectedMedia] = useState(null);

  const filteredMedia =
    filter === "All"
      ? gitexEventData.fullGallery
      : gitexEventData.fullGallery.filter((item) => item.category === filter);

  const handlePrevMedia = () => {
    if (!selectedMedia) return;
    const currentIndex = filteredMedia.findIndex((m) => m.id === selectedMedia.id);
    const prevIndex = (currentIndex - 1 + filteredMedia.length) % filteredMedia.length;
    setSelectedMedia(filteredMedia[prevIndex]);
  };

  const handleNextMedia = () => {
    if (!selectedMedia) return;
    const currentIndex = filteredMedia.findIndex((m) => m.id === selectedMedia.id);
    const nextIndex = (currentIndex + 1) % filteredMedia.length;
    setSelectedMedia(filteredMedia[nextIndex]);
  };

  return (
    <Layout extraWrapClass="events-detailed-page">
      <Head>
        <title>GITEX Asia 2026 Singapore | Prime One Global &amp; Altitude1 Representation — Noyal Niroshan</title>
        <meta
          name="description"
          content="Noyal Niroshan representing Prime One Global and Altitude1 at GITEX Asia 2026 in Singapore. Discover AI innovations, startup delegations, and tech highlights."
        />
      </Head>

      {/* Hero Header */}
      <section className="section section-inner started-heading">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="h-titles">
                <h1 className="h-title">GITEX Asia 2026 Singapore</h1>
              </div>
              <div className="events-delegation-pill-row">
                <span className="delegation-pill"><i className="fas fa-building" /> Prime One Global</span>
                <span className="delegation-pill"><i className="fas fa-microchip" /> Altitude1</span>
                <span className="delegation-pill"><i className="fas fa-map-marker-alt" /> Singapore Summit</span>
                <span className="delegation-pill"><i className="fas fa-robot" /> Tech &amp; AI Event</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Showcase Spotlight Banner featuring User's Photo (1.jpeg) */}
      <section className="section gitex-story-section">
        <div className="container">
          <div className="gitex-story-banner">
            <div className="row align-items-center">
              <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5">
                <div className="story-hero-user-frame">
                  <img
                    src="assets/images/events/home/1.jpeg"
                    alt="Noyal Niroshan - Prime One Global & Altitude1 Representation"
                    className="story-hero-user-img"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="hero-user-badge">
                    <img
                      src="assets/images/events/home/unnamed.png"
                      alt="GITEX Emblem"
                      className="hero-badge-icon"
                      loading="lazy"
                      decoding="async"
                    />
                    <span>GITEX AI ASIA 2026</span>
                  </div>
                </div>
              </div>

              <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7">
                <div className="story-intro-content">
                  <h2>International Stage Representation &amp; Innovation Milestone</h2>
                  <p>
                    Grateful for this incredible opportunity to represent <strong>Prime One Global</strong> and <strong>Altitude1</strong> at the <strong>GITEX Asia 2026</strong> event in Singapore. It was truly a valuable experience where we connected with global startups, explored new innovations, and gained meaningful insights into the future of technology.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Story Pillar Cards */}
          <div className="row story-pillars-row">
            {gitexEventData.storySections.map((story) => (
              <div key={story.id} className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                <div className="story-pillar-card">
                  <div className="pillar-icon">
                    <i className={story.icon} />
                  </div>
                  <h3 className="pillar-title">{story.title}</h3>
                  <p className="pillar-text">{story.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Spotlight Grid */}
      <section className="section gitex-spotlight-section">
        <div className="container">
          <div className="m-titles">
            <h2 className="m-title events-section-heading">Featured Highlights Spotlight</h2>
          </div>

          <div className="spotlight-bento-grid">
            {gitexEventData.featuredHighlights.map((item, idx) => (
              <div
                key={item.id}
                className={`spotlight-bento-card card-${idx + 1} ${item.span}`}
                onClick={() => setSelectedMedia(item)}
              >
                <div className="bento-image-wrapper">
                  <img src={item.src} alt={item.title} className="bento-img" loading="lazy" decoding="async" />
                  <div className="bento-overlay">
                    <span className="bento-tag">{item.category}</span>
                    <h4 className="bento-title">{item.title}</h4>
                    <span className="bento-zoom-icon"><i className="fas fa-expand-alt" /></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full 24 Media Showcase Gallery & Video Grid */}
      <section className="section gitex-full-gallery-section">
        <div className="container">
          <div className="m-titles">
            <h2 className="m-title events-section-heading">Complete 24-Media Event Gallery</h2>
          </div>

          {/* Filter Bar */}
          <div className="bento-filter-bar">
            {["All", "Representation", "AI & Tech", "Networking", "Videos"].map(
              (cat) => (
                <button
                  key={cat}
                  className={`bento-filter-tab ${filter === cat ? "active" : ""}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              )
            )}
          </div>

          {/* Uniform Gallery Grid (No Cut-Offs, Equal Size Ratio) */}
          <div className="events-gallery-grid-uniform">
            {filteredMedia.map((media) => (
              <div
                key={media.id}
                className={`bento-gallery-item ${
                  media.type === "video" ? "video-item" : ""
                }`}
                onClick={() => setSelectedMedia(media)}
              >
                <div className="bento-media-frame">
                  {media.type === "video" ? (
                    <div className="video-thumbnail-container">
                      <video
                        src={media.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="bento-video-autoplay"
                      />
                      <div className="video-autoplay-badge">
                        <i className="fas fa-play" />
                        <span>Live Video Reel</span>
                      </div>
                    </div>
                  ) : (
                    <img src={media.src} alt={media.title} className="bento-img" loading="lazy" decoding="async" />
                  )}
                  <div className="bento-hover-details">
                    <span className="media-category-badge">{media.category}</span>
                    <h4 className="media-title">{media.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox / Video Player Modal */}
      {selectedMedia && (
        <div className="events-lightbox-modal" onClick={() => setSelectedMedia(null)}>
          <button
            className="events-lightbox-close"
            onClick={() => setSelectedMedia(null)}
            aria-label="Close modal"
          >
            &times;
          </button>
          <div className="events-lightbox-content" onClick={(e) => e.stopPropagation()}>

            <button
              className="events-lightbox-arrow prev"
              onClick={handlePrevMedia}
              aria-label="Previous media"
            >
              <i className="fas fa-chevron-left" />
            </button>

            <div className="lightbox-media-container">
              {selectedMedia.type === "video" ? (
                <video
                  src={selectedMedia.src}
                  controls
                  autoPlay
                  className="lightbox-full-video"
                />
              ) : (
                <img
                  src={selectedMedia.src}
                  alt={selectedMedia.title}
                  className="lightbox-full-img"
                />
              )}
            </div>

            <button
              className="events-lightbox-arrow next"
              onClick={handleNextMedia}
              aria-label="Next media"
            >
              <i className="fas fa-chevron-right" />
            </button>

            <div className="events-lightbox-caption">
              <h3>{selectedMedia.title}</h3>
              <span className="caption-tag">{selectedMedia.category}</span>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default EventsPage;
