import React, { useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper";
import { graphicDesignPosters } from "../data/graphicDesign";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const GraphicDesignCarousel = () => {
  const [selectedPoster, setSelectedPoster] = useState(null);
  const showcasePosters = graphicDesignPosters.slice(0, 10);

  return (
    <section className="section graphic-design-section" id="graphic-design-section">
      <div className="container">
        {/* Section Heading (Matching Projects Template Structure) */}
        <div className="m-titles">
          <h2 className="m-title">
            Graphic Design
          </h2>
        </div>
        <div className="row row-custom">
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"></div>
          <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 vertical-line">
            {/* Description */}
            <div className="text">
              <p>
                A curated collection of poster art, promotional graphics, event identity, and creative visual concepts crafted with precision.
              </p>
            </div>
          </div>
        </div>

        {/* 3D Swiper Carousel */}
        <div className="poster-carousel-wrapper">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 180,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            loop={true}
            className="poster-swiper"
          >
            {showcasePosters.map((poster) => (
              <SwiperSlide key={poster.id} className="poster-slide">
                <div
                  className="poster-card-wrap"
                  onClick={() => setSelectedPoster(poster)}
                >
                  <div className="poster-image-holder">
                    <img src={poster.image} alt={poster.title} loading="lazy" decoding="async" />
                    <div className="poster-overlay">
                      <span className="badge-tag">{poster.category}</span>
                      <h4 className="poster-slide-title">{poster.title}</h4>
                      <button className="view-btn">
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View Poster
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* CTA to Full Gallery */}
        <div className="poster-cta-box text-center">
          <Link href="/graphic-design">
            <a className="btn circle-btn">
              <span>EXPLORE ALL POSTERS &amp; BENTO GALLERY ({graphicDesignPosters.length})</span>
              <i className="arrow" />
            </a>
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPoster && (
        <div
          className="poster-lightbox-overlay"
          onClick={() => setSelectedPoster(null)}
        >
          <div
            className="poster-lightbox-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close-btn"
              onClick={() => setSelectedPoster(null)}
              aria-label="Close Lightbox"
            >
              ✕
            </button>
            <div className="lightbox-content">
              <div className="lightbox-img-wrap">
                <img src={selectedPoster.image} alt={selectedPoster.title} />
              </div>
              <div className="lightbox-details">
                <span className="lightbox-category">{selectedPoster.category}</span>
                <h3 className="lightbox-title">{selectedPoster.title}</h3>
                <div className="lightbox-tags">
                  {selectedPoster.tags.map((tag, idx) => (
                    <span key={idx} className="lightbox-tag-chip">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GraphicDesignCarousel;
