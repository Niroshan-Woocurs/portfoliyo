import Head from "next/head";
import Link from "next/link";
import Layout from "../src/layout/Layout";
import dynamic from "next/dynamic";

const ProjectIsotop = dynamic(() => import("../src/components/ProjectIsotop"), {
  ssr: false,
});

const works = () => {
  return (
    <Layout>
      <Head>
        <title>Featured Projects Portfolio | Noyal Niroshan</title>
        <meta
          name="description"
          content="Explore 50+ real client and enterprise projects delivered by Noyal Niroshan across web development, SaaS, POS platforms, MERN stack, and ASP.NET Core."
        />
      </Head>

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
                <h1 className="h-title">Projects</h1>
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
                  A collection of production platforms, enterprise software, and client projects built with modern full-stack architectures.
                </h6>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <ProjectIsotop itemsPerPage={4} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default works;
