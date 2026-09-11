import Head from "next/head";
import Link from "next/link";
import Layout from "../src/layout/Layout";

const blogPosts = [
  {
    id: 1,
    title: "Building Scalable Systems with Laravel 11 & Filament PHP 3",
    category: "Backend & SaaS",
    date: "February 14, 2026",
    image: "assets/images/blog4.jpg",
    summary:
      "A deep dive into architecture decisions, event-driven model hooks, atomic ID generation, and reactive Filament admin control panels for enterprise-grade applications.",
    slug: "building-scalable-systems-laravel-11-filament-3",
  },
  {
    id: 2,
    title: "Agentic-Based Coding: Accelerating Full-Stack Delivery by 5x",
    category: "AI & Engineering",
    date: "January 28, 2026",
    image: "assets/images/blog3.jpg",
    summary:
      "How leveraging AI coding assistants like Cursor AI, Claude, and automated workflow agents transforms development velocity while maintaining high code quality and test coverage.",
    slug: "agentic-coding-accelerating-fullstack-delivery",
  },
  {
    id: 3,
    title: "Modern Travel Tech: Next.js 15, Prisma ORM & Stripe Payments",
    category: "Full Stack",
    date: "December 18, 2025",
    image: "assets/images/single7.jpg",
    summary:
      "Key lessons learned from engineering production travel booking systems (Cameron Gateways) with role-based access control, Stripe webhooks, and split API architecture.",
    slug: "modern-travel-tech-nextjs-prisma-stripe",
  },
];

const Blog = () => {
  return (
    <Layout>
      <Head>
        <title>Engineering Blog &amp; Insights | Noyal Niroshan</title>
        <meta
          name="description"
          content="Read technical articles, software architecture insights, agentic coding workflows, and web development strategies by Noyal Niroshan."
        />
      </Head>

      <section className="section section-inner started-heading">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="h-titles">
                <h1 className="h-title">Blog &amp; Tech Insights</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-inner m-archive">
        <div className="container">
          <div className="row row-custom">
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"></div>
            <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 vertical-line">
              <div className="text">
                <h6>
                  Thoughts, technical guides, and practical engineering insights on full-stack web development, Laravel, AI-assisted coding, and cloud architectures.
                </h6>
              </div>
            </div>
          </div>
        </div>

        <div className="blog-items">
          {blogPosts.map((post) => (
            <div key={post.id} className="archive-item">
              <div className="image">
                <Link href="/blog-single">
                  <a>
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                </Link>
              </div>
              <div className="desc">
                <div className="category">
                  {post.category}
                  <br />
                  <span>{post.date}</span>
                </div>
                <div className="title">
                  <Link href="/blog-single">
                    <a>{post.title}</a>
                  </Link>
                </div>
                <div className="text">
                  <p>{post.summary}</p>
                  <div className="readmore">
                    <Link href="/blog-single">
                      <a className="lnk">Read article &rarr;</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
