import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";

const getBentoSpans = (count) => {
  if (count <= 0) return [];
  if (count === 1) return ["bento-wide"];
  if (count === 2) return ["bento-md", "bento-md"];
  if (count === 3) return ["bento-hero", "bento-sm", "bento-sm"];
  if (count === 4) return ["bento-hero", "bento-sm", "bento-sm", "bento-wide"];
  if (count === 5)
    return ["bento-hero", "bento-sm", "bento-sm", "bento-sm", "bento-md"];
  if (count === 6)
    return [
      "bento-hero",
      "bento-sm",
      "bento-sm",
      "bento-sm",
      "bento-sm",
      "bento-sm",
    ];
  if (count === 7)
    return [
      "bento-hero",
      "bento-sm",
      "bento-sm",
      "bento-sm",
      "bento-sm",
      "bento-sm",
      "bento-wide",
    ];
  if (count === 8)
    return [
      "bento-hero",
      "bento-sm",
      "bento-sm",
      "bento-sm",
      "bento-sm",
      "bento-sm",
      "bento-md",
      "bento-sm",
    ];
  const spans = ["bento-hero", "bento-sm", "bento-sm"];
  for (let i = 3; i < count; i += 1) {
    spans.push("bento-sm");
  }
  return spans;
};

const ProjectGallery = ({
  images = [],
  title = "Project",
  className = "",
}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [mounted, setMounted] = useState(false);
  const isOpen = activeIndex !== null;
  const spans = useMemo(() => getBentoSpans(images.length), [images.length]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => setActiveIndex(null), []);

  const showPrev = useCallback(() => {
    setActiveIndex((current) =>
      current === null
        ? null
        : (current - 1 + images.length) % images.length
    );
  }, [images.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % images.length
    );
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.classList.add("project-lightbox-open");
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("project-lightbox-open");
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close, showPrev, showNext]);

  if (!images.length) return null;

  const lightbox =
    mounted &&
    isOpen &&
    createPortal(
      <div
        className="project-lightbox"
        role="dialog"
        aria-modal="true"
        aria-label={`${title} full view`}
      >
        <button
          type="button"
          className="project-lightbox-backdrop"
          onClick={close}
          aria-label="Close gallery"
        />

        <div className="project-lightbox-frame">
          <div className="project-lightbox-topbar">
            <span className="project-lightbox-title">{title}</span>
            <span className="project-lightbox-counter">
              {activeIndex + 1} <em>/</em> {images.length}
            </span>
            <button
              type="button"
              className="project-lightbox-close"
              onClick={close}
              aria-label="Close gallery"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <div className="project-lightbox-body">
            {images.length > 1 && (
              <button
                type="button"
                className="project-lightbox-nav project-lightbox-prev"
                onClick={showPrev}
                aria-label="Previous image"
              >
                ‹
              </button>
            )}

            <div className="project-lightbox-stage">
              <img
                key={images[activeIndex]}
                src={images[activeIndex]}
                alt={`${title} image ${activeIndex + 1}`}
                className="project-lightbox-image"
              />
            </div>

            {images.length > 1 && (
              <button
                type="button"
                className="project-lightbox-nav project-lightbox-next"
                onClick={showNext}
                aria-label="Next image"
              >
                ›
              </button>
            )}
          </div>

          {images.length > 1 && (
            <div className="project-lightbox-thumbs">
              {images.map((src, index) => (
                <button
                  key={`thumb-${src}-${index}`}
                  type="button"
                  className={`project-lightbox-thumb${
                    index === activeIndex ? " is-active" : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View image ${index + 1}`}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>,
      document.body
    );

  return (
    <Fragment>
      <div className={`project-bento-grid ${className}`.trim()}>
        {images.map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            className={`project-bento-item ${spans[index] || "bento-sm"}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Open ${title} image ${index + 1}`}
          >
            <img
              src={src}
              alt={`${title} image ${index + 1}`}
              loading="lazy"
              decoding="async"
            />
            <span className="project-bento-zoom" aria-hidden="true">
              +
            </span>
          </button>
        ))}
      </div>
      {lightbox}
    </Fragment>
  );
};

export default ProjectGallery;
