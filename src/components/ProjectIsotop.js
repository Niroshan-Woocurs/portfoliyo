import Link from "next/link";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { projects } from "../data/projects";

const ProjectIsotop = ({ itemsPerPage = 0 }) => {
  const [filterKey, setFilterKey] = useState("*");
  const [page, setPage] = useState(1);
  const gridRef = useRef(null);

  const filteredProjects = useMemo(() => {
    if (filterKey === "*") return projects;
    return projects.filter((project) =>
      project.sorting.includes(filterKey)
    );
  }, [filterKey]);

  const paginate = itemsPerPage > 0;
  const totalPages = paginate
    ? Math.max(1, Math.ceil(filteredProjects.length / itemsPerPage))
    : 1;

  const safePage = Math.min(page, totalPages);

  const visibleProjects = useMemo(() => {
    if (!paginate) return filteredProjects;
    const start = (safePage - 1) * itemsPerPage;
    return filteredProjects.slice(start, start + itemsPerPage);
  }, [filteredProjects, paginate, safePage, itemsPerPage]);

  useEffect(() => {
    setPage(1);
  }, [filterKey]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const goToPage = (num) => {
    setPage(num);
    if (gridRef.current) {
      const top =
        gridRef.current.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleFilterKeyChange = (key) => () => {
    setFilterKey(key);
  };

  const activeBtn = (value) => (value === filterKey ? "active" : "");

  return (
    <Fragment>
      <div className="works-box projects-showcase">
        <div className="filter-links projects-filters">
          <a
            className={`c-pointer ${activeBtn("*")}`}
            onClick={handleFilterKeyChange("*")}
            data-href=".works-col"
          >
            All
          </a>
          <a
            className={`c-pointer ${activeBtn("sorting-ui-ux-design")}`}
            onClick={handleFilterKeyChange("sorting-ui-ux-design")}
            data-href=".sorting-ui-ux-design"
          >
            UI UX Design
          </a>
          <a
            className={`c-pointer ${activeBtn("sorting-development")}`}
            onClick={handleFilterKeyChange("sorting-development")}
            data-href=".sorting-development"
          >
            Development
          </a>
          <a
            className={`c-pointer ${activeBtn("sorting-photo")}`}
            onClick={handleFilterKeyChange("sorting-photo")}
            data-href=".sorting-photo"
          >
            Photography
          </a>
        </div>

        <div
          ref={gridRef}
          className="works-items works-masonry-items projects-grid row"
        >
          {visibleProjects.length === 0 ? (
            <div className="col-xs-12 projects-empty">
              <p>No projects in this category yet.</p>
            </div>
          ) : (
            visibleProjects.map((project) => (
              <div
                key={project.id}
                className={`works-col col-xs-12 col-sm-12 col-md-12 col-lg-6 ${project.sorting.join(
                  " "
                )}`}
              >
                <div className="works-item project-card">
                  <Link href={`/work-single?project=${project.slug}`}>
                    <a>
                      <span className="image">
                        <span className="img">
                          <img src={project.cover} alt={project.title} loading="lazy" decoding="async" />
                          <span className="overlay" />
                        </span>
                      </span>
                      <span className="desc">
                        <span className="name">{project.title}</span>
                        <span className="category">
                          {project.category.join(" · ")}
                        </span>
                      </span>
                    </a>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {paginate && totalPages > 1 && (
          <nav
            className="projects-pagination"
            aria-label="Projects pages"
          >
            <button
              type="button"
              className="projects-page-btn projects-page-nav"
              onClick={() => goToPage(Math.max(1, safePage - 1))}
              disabled={safePage <= 1}
              aria-label="Previous page"
            >
              <span aria-hidden="true">←</span>
              <span>Prev</span>
            </button>

            <div className="projects-page-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (num) => (
                  <button
                    key={num}
                    type="button"
                    className={`projects-page-btn projects-page-num ${
                      safePage === num ? "active" : ""
                    }`}
                    onClick={() => goToPage(num)}
                    aria-label={`Page ${num}`}
                    aria-current={safePage === num ? "page" : undefined}
                  >
                    {num}
                  </button>
                )
              )}
            </div>

            <button
              type="button"
              className="projects-page-btn projects-page-nav"
              onClick={() => goToPage(Math.min(totalPages, safePage + 1))}
              disabled={safePage >= totalPages}
              aria-label="Next page"
            >
              <span>Next</span>
              <span aria-hidden="true">→</span>
            </button>
          </nav>
        )}
      </div>
    </Fragment>
  );
};

export default ProjectIsotop;
