import Head from "next/head";
import Link from "next/link";
import Layout from "../src/layout/Layout";

const BlogSingle = () => {
  return (
    <Layout extraWrapClass={"single-post"}>
      <Head>
        <title>Building Scalable Systems with Laravel 11 &amp; Filament PHP 3 | Noyal Niroshan</title>
        <meta
          name="description"
          content="An architectural deep dive into building enterprise applications with Laravel 11, Filament PHP 3, event-driven model hooks, and atomic ID generation by Noyal Niroshan."
        />
      </Head>

      {/* Section Started Heading */}
      <section className="section section-inner started-heading">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="m-titles">
                <h1 className="m-title">
                  Building Scalable Systems with Laravel 11 &amp; Filament PHP 3
                </h1>
                <div className="m-category">
                  <span className="cat-tag">Backend &amp; SaaS</span> / February 14, 2026 / By Noyal Niroshan
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Single Post */}
      <section className="section section-inner m-archive">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-10 offset-1">
              {/* image */}
              <div className="m-image-large">
                <div className="image">
                  <div
                    className="img"
                    style={{ backgroundImage: "url(assets/images/blog5.jpg)" }}
                  />
                </div>
              </div>
              {/* content */}
              <div className="description">
                <div className="post-content">
                  <p>
                    Modern web applications demand high-throughput data processing, strict auditability, and reactive administrative control panels. Over the past year, building production applications like the <strong>Enterprise Inventory &amp; POS Suite</strong> and <strong>AWS Cloud Provisioning Dashboard</strong> taught me how powerful the combination of <strong>Laravel 11</strong>, <strong>Livewire 3</strong>, and <strong>Filament PHP 3</strong> is when architected correctly.
                  </p>
                  <p>
                    In this article, I share key architectural principles for structuring scalable Laravel backends that stay maintainable as data models and team requirements grow.
                  </p>

                  <blockquote>
                    <p>
                      &ldquo;Architecture isn&apos;t just about choosing frameworks — it&apos;s about enforcing strict domain boundaries, event-driven integrity, and predictable state transitions.&rdquo;
                    </p>
                    <p>
                      <cite>&ndash; Noyal Niroshan</cite>
                    </p>
                  </blockquote>

                  <h3>1. Event-Driven Model Hooks Over Bloated Controllers</h3>
                  <p>
                    Controller actions should remain thin HTTP translators. Complex domain rules — such as automated FIFO (First-In, First-Out) stock deduction, low-stock email triggers, and double-entry accounting ledgers — belong inside Eloquent Model lifecycle hooks (<code>static::creating</code>, <code>static::created</code>, <code>static::saving</code>) or domain actions.
                  </p>

                  <h3>2. Custom Atomic Prefixed Primary Keys</h3>
                  <p>
                    Auto-incrementing integer IDs expose database volume and create collision risks in multi-node systems. Implementing custom string primary key generators (e.g., <code>pr001</code> for products, <code>si001</code> for stock-ins, <code>tr001</code> for transactions) ensures audit-friendly identifiers across 14+ database entities.
                  </p>

                  <ul className="gallery gallery-columns-2">
                    <li className="gallery-item">
                      <figure>
                        <img src="assets/images/blog8.jpg" alt="Laravel Architecture" loading="lazy" decoding="async" />
                      </figure>
                    </li>
                    <li className="gallery-item">
                      <figure>
                        <img src="assets/images/blog7.jpg" alt="Filament Admin Control Panel" loading="lazy" decoding="async" />
                      </figure>
                    </li>
                  </ul>

                  <h3>3. Rapid Operations UI with Filament PHP 3</h3>
                  <p>
                    Filament 3 transforms admin development by providing reactive Livewire-driven tables, form schemas, and real-time Chart.js widgets directly in PHP. Instead of spending weeks building custom React/Vue admin dashboards, Filament provides high-speed CRUD, fine-grained role-based permissions (Spatie RBAC), and export utilities out of the box.
                  </p>

                  <span className="tags-links">
                    <span>Tags:</span>
                    <a href="#">Laravel 11</a>
                    <a href="#">Filament PHP</a>
                    <a href="#">Livewire</a>
                    <a href="#">Full Stack</a>
                    <a href="#">Architecture</a>
                  </span>
                </div>
              </div>

              {/* Back Link */}
              <div style={{ marginTop: "40px" }}>
                <Link href="/blog">
                  <a className="btn circle">
                    <span>&larr; Back to All Articles</span>
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

export default BlogSingle;
