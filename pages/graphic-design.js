import React, { useState, useMemo, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../src/layout/Layout";
import { graphicDesignPosters } from "../src/data/graphicDesign";

const ITEMS_PER_PAGE = 12;

const GraphicDesignPage = () => {
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [activePosterIndex, setActivePosterIndex] = useState(null);

  // Filter Posters
  const filteredPosters = useMemo(() => {
    if (filter === "All") return graphicDesignPosters;
    return graphicDesignPosters.filter((poster) => poster.category === filter);
  }, [filter]);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  // Paginate Posters
  const totalPages = Math.ceil(filteredPosters.length / ITEMS_PER_PAGE);
  const currentPosters = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPosters.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPosters, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  const handlePrevPoster = () => {
    if (activePosterIndex !== null) {
      setActivePosterIndex((prev) =>
        prev === 0 ? filteredPosters.length - 1 : prev - 1
      );
    }
  };

  const handleNextPoster = () => {
    if (activePosterIndex !== null) {
      setActivePosterIndex((prev) =>
        prev === filteredPosters.length - 1 ? 0 : prev + 1
      );
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activePosterIndex === null) return;
      if (e.key === "Escape") setActivePosterIndex(null);
      if (e.key === "ArrowLeft") handlePrevPoster();
      if (e.key === "ArrowRight") handleNextPoster();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePosterIndex, filteredPosters]);

  const activePoster =
    activePosterIndex !== null ? filteredPosters[activePosterIndex] : null;

  return (
    <Layout extraWrapClass="graphic-design-page">
      <Head>
        <title>Graphic Design &amp; Poster Showcase | Noyal Niroshan (N²Dev)</title>
        <meta
          name="description"
          content="Explore graphic design, poster art, brand promotion graphics, and creative visual artwork crafted by Noyal Niroshan."
        />
      </Head>

      {/* Page Hero Header */}
      <section className="section section-inner started-heading">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="h-titles">
                <Link href="/">
                  <a className="return-home-page-btn">
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Return to Home
                  </a>
                </Link>
                <h1 className="h-title">Poster &amp; Graphic Design</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="section graphic-bento-section">
        <div className="container">
          {/* Category Filter Tabs */}
          <div className="bento-filter-bar">
            {["All", "Event & Branding", "Promotions & Marketing", "Creative Concepts"].map(
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

          {/* Bento Grid */}
          <div className="bento-grid">
            {currentPosters.map((poster) => {
              const globalIndex = filteredPosters.findIndex(
                (p) => p.id === poster.id
              );
              return (
                <div
                  key={poster.id}
                  className={`bento-card bento-card-${poster.aspectRatio}`}
                  onClick={() => setActivePosterIndex(globalIndex)}
                >
                  <div className="bento-image-wrap">
                    <img src={poster.image} alt="Graphic Poster" loading="lazy" decoding="async" />
                    <div className="bento-overlay">
                      <div className="bento-action-hint">
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                        <span>Expand View</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <nav className="bento-pagination" aria-label="Poster pagination">
              <button
                className="bento-page-btn bento-page-nav"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                ← Prev
              </button>

              <div className="bento-page-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (num) => (
                    <button
                      key={num}
                      className={`bento-page-btn bento-page-num ${
                        currentPage === num ? "active" : ""
                      }`}
                      onClick={() => handlePageChange(num)}
                    >
                      {num}
                    </button>
                  )
                )}
              </div>

              <button
                className="bento-page-btn bento-page-nav"
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next →
              </button>
            </nav>
          )}
        </div>
      </section>

      {/* Lightbox Modal with Pure Image Viewer */}
      {activePoster && (
        <div
          className="bento-lightbox-overlay"
          onClick={() => setActivePosterIndex(null)}
        >
          <button
            className="bento-lightbox-arrow prev"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevPoster();
            }}
            aria-label="Previous Poster"
          >
            ‹
          </button>

          <div
            className="bento-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="bento-lightbox-close"
              onClick={() => setActivePosterIndex(null)}
              aria-label="Close Lightbox"
              title="Close Lightbox"
            >
              ✕ CLOSE
            </button>

            <div className="bento-lightbox-media">
              <img src={activePoster.image} alt="Graphic Poster" />
            </div>
            
            <div className="pure-lightbox-footer">
              <span className="pure-poster-count">
                {activePosterIndex + 1} / {filteredPosters.length}
              </span>
            </div>
          </div>

          <button
            className="bento-lightbox-arrow next"
            onClick={(e) => {
              e.stopPropagation();
              handleNextPoster();
            }}
            aria-label="Next Poster"
          >
            ›
          </button>
        </div>
      )}
    </Layout>
  );
};

export default GraphicDesignPage;
