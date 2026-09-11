import Layout from "../src/layout/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import ProjectGallery from "../src/components/ProjectGallery";
import { getProjectBySlug, projects } from "../src/data/projects";

const WorkSingle = () => {
  const router = useRouter();
  const slug =
    (typeof router.query.project === "string" && router.query.project) ||
    "cameron-gateways";
  const project = getProjectBySlug(slug) || projects[0];

  if (!project) return null;

  const clientLines = (project.clientDisplay || project.client).split("\n");
  const hasLiveUrl = Boolean(
    project.liveUrl &&
      project.liveUrl.trim() !== "" &&
      project.liveUrl !== "#" &&
      !project.liveUrl.includes("github.com")
  );
  const liveHost = (() => {
    if (!hasLiveUrl) return null;
    try {
      return new URL(project.liveUrl).hostname.replace(/^www\./, "");
    } catch {
      return project.liveLabel || "Live site";
    }
  })();

  return (
    <Layout extraWrapClass={"project-single"}>
      <section className="section section-inner started-heading project-hero">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="h-titles project-hero-titles">
                <div className="project-detail-eyebrow">
                  {project.client} · {project.year}
                </div>
                <h1 className="h-title project-detail-title">
                  <span className="project-title-main">{project.title}</span>
                </h1>
                <p className="project-detail-lead">{project.subtitle}</p>
                {project.alsoKnownAs && (
                  <p className="project-detail-aka">
                    Also known as {project.alsoKnownAs}
                  </p>
                )}
                <div className="project-hero-tags">
                  {project.category.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {project.disclaimer && (
        <section className="section project-copy-section">
          <div className="container">
            <div className="text project-copy">
              <p className="project-summary-line">{project.disclaimer}</p>
            </div>
          </div>
        </section>
      )}

      <section className="section section-inner details">
        <div className="container">
          <div className="row row-custom">
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"></div>
            <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 vertical-line">
              <div className="m-details project-meta-grid">
                <div className="details-label">
                  <span>Year</span>
                  <strong>{project.year}</strong>
                </div>
                <div className="details-label">
                  <span>Role</span>
                  <strong>{project.role}</strong>
                </div>
                <div className="details-label">
                  <span>Client</span>
                  <strong>
                    {clientLines.map((line) => (
                      <span key={line}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </strong>
                </div>
                <div className="details-label">
                  <span>Location</span>
                  <strong>{project.location}</strong>
                </div>
                {hasLiveUrl && (
                  <div className="details-label">
                    <span>Live</span>
                    <strong>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="project-meta-link"
                      >
                        {project.liveLabel || liveHost}
                      </a>
                    </strong>
                  </div>
                )}
                {project.githubUrl && (
                  <div className="details-label">
                    <span>GitHub</span>
                    <strong>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="project-meta-link"
                      >
                        {project.githubLabel || "View repository"}
                      </a>
                    </strong>
                  </div>
                )}
                <div className="details-label">
                  <span>Categories</span>
                  <strong>
                    {project.category.map((item) => (
                      <span key={item}>
                        {item}
                        <br />
                      </span>
                    ))}
                  </strong>
                </div>
              </div>
              <div className="project-meta-actions">
                {hasLiveUrl && (
                  <a
                    className="btn project-live-btn"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>Visit Live Site</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    className="btn project-live-btn"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>View on GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-bg project-copy-section">
        <div className="container">
          <div className="p-title">About This Project</div>
          <div className="text project-copy">
            <p className="project-summary-line">{project.summary}</p>
            {project.about.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section project-copy-section">
        <div className="container">
          <div className="row project-split">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <div className="p-title">Problem</div>
              <div className="text project-copy">
                <p>{project.problem}</p>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <div className="p-title">Solution</div>
              <div className="text project-copy">
                <p>{project.solution}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {project.gallery?.length > 0 && (
        <section className="section section-inner project-gallery-section">
          <div className="container">
            <div className="p-title">Project Gallery</div>
            <ProjectGallery images={project.gallery} title={project.title} />
          </div>
        </section>
      )}

      {project.wireframes?.length > 0 && (
        <section className="section section-bg project-gallery-section">
          <div className="container">
            <div className="p-title">Mobile &amp; Wireframes</div>
            <ProjectGallery
              images={project.wireframes}
              title={`${project.title} wireframes`}
              className="project-bento-wireframes"
            />
          </div>
        </section>
      )}

      {project.customerFeatures?.length > 0 && (
        <section className="section project-copy-section">
          <div className="container">
            <div className="p-title">
              {project.customerFeaturesTitle || "Customer-Facing Features"}
            </div>
            <ul className="project-feature-list">
              {project.customerFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {project.adminFeatures?.length > 0 && (
        <section className="section section-bg project-copy-section">
          <div className="container">
            <div className="p-title">
              {project.adminFeaturesTitle || "Admin / Operations Features"}
            </div>
            <ul className="project-feature-list">
              {project.adminFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {project.roles?.length > 0 && (
        <section className="section project-copy-section">
          <div className="container">
            <div className="p-title">{project.rolesTitle || "Roles & Access"}</div>
            <ul className="project-feature-list project-achievements">
              {project.roles.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {project.pipelines?.length > 0 && (
        <section className="section section-bg project-copy-section">
          <div className="container">
            <div className="p-title">
              {project.pipelinesTitle || "Domain Pipelines"}
            </div>
            <ul className="project-feature-list project-achievements">
              {project.pipelines.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {project.architecture?.length > 0 && (
        <section className="section project-copy-section">
          <div className="container">
            <div className="p-title">Architecture Highlights</div>
            <ul className="project-feature-list project-achievements">
              {project.architecture.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {project.integrations?.length > 0 && (
        <section className="section section-bg project-copy-section">
          <div className="container">
            <div className="p-title">Integrations</div>
            <div className="project-detail-blocks">
              {project.integrations.map((item) => {
                const isObject = typeof item === "object" && item;
                const title = isObject
                  ? item.title
                  : item.includes(" — ")
                    ? item.split(" — ")[0]
                    : null;
                const text = isObject
                  ? item.text
                  : item.includes(" — ")
                    ? item.split(" — ").slice(1).join(" — ")
                    : item;
                return (
                  <article
                    key={title || text}
                    className="project-detail-block"
                  >
                    {title && <h4>{title}</h4>}
                    <p>{text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {project.security?.length > 0 && (
        <section className="section project-copy-section">
          <div className="container">
            <div className="p-title">
              {project.securityTitle || "Security"}
            </div>
            <div className="project-detail-blocks">
              {project.security.map((item) => {
                const isObject = typeof item === "object" && item;
                const title = isObject
                  ? item.title
                  : item.includes(" — ")
                    ? item.split(" — ")[0]
                    : null;
                const text = isObject
                  ? item.text
                  : item.includes(" — ")
                    ? item.split(" — ").slice(1).join(" — ")
                    : item;
                return (
                  <article
                    key={title || text}
                    className="project-detail-block"
                  >
                    {title && <h4>{title}</h4>}
                    <p>{text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {project.achievements?.length > 0 && (
        <section className="section section-bg project-copy-section">
          <div className="container">
            <div className="p-title">Key Achievements</div>
            <ul className="project-feature-list project-achievements">
              {project.achievements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section project-copy-section">
        <div className="container">
          <div className="p-title">Tech Stack</div>
          <div className="project-tech-groups">
            <div className="project-tech-group">
              <div className="skill-group-title">Frontend</div>
              <div className="skill-tags">
                {project.tech.frontend.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
            <div className="project-tech-group">
              <div className="skill-group-title">Backend</div>
              <div className="skill-tags">
                {project.tech.backend.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
            <div className="project-tech-group">
              <div className="skill-group-title">Infra</div>
              <div className="skill-tags">
                {project.tech.infra.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section project-copy-section">
        <div className="container">
          <div className="p-title">Tags</div>
          <div className="skill-tags project-all-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="m-page-navigation">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="h-titles h-navs">
                <Link href="/#works-section">
                  <a>
                    <span className="nav-arrow">Back to</span>
                    <span className="h-title">Projects</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WorkSingle;
