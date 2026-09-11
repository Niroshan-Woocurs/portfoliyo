import { useForm, ValidationError } from "@formspree/react";

const ContactForm = () => {
  const [state, handleSubmit] = useForm("mwlkaoza");

  return (
    <section className="section section-bg contact-section" id="contact-section">
      <div className="container">
        <div className="m-titles">
          <h2 className="m-title">Contact Me</h2>
        </div>

        <div className="contact-layout">
          <aside className="contact-aside">
            <p className="contact-aside-lead">
              Open to freelance work, full-time roles, and collaborations.
              Reach out — I usually reply within a day.
            </p>

            <ul className="contact-info-list">
              <li className="contact-info-card">
                <span className="contact-info-icon" aria-hidden="true">
                  <i className="fas fa-phone" />
                </span>
                <div className="contact-info-body">
                  <span className="contact-info-label">Phone</span>
                  <a href="tel:+94776401799" className="contact-info-value">
                    +94 77 640 1799
                  </a>
                </div>
              </li>

              <li className="contact-info-card">
                <span className="contact-info-icon" aria-hidden="true">
                  <i className="fas fa-envelope" />
                </span>
                <div className="contact-info-body">
                  <span className="contact-info-label">Email</span>
                  <a
                    href="mailto:jenijeniston05@gmail.com"
                    className="contact-info-value"
                  >
                    jenijeniston05@gmail.com
                  </a>
                </div>
              </li>

              <li className="contact-info-card">
                <span className="contact-info-icon" aria-hidden="true">
                  <i className="fas fa-map-marker-alt" />
                </span>
                <div className="contact-info-body">
                  <span className="contact-info-label">Address</span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=117%2FA+Temple+Road%2C+Jaffna%2C+Sri+Lanka"
                    target="_blank"
                    rel="noreferrer"
                    className="contact-info-value"
                  >
                    117 / A Temple Road
                    <br />
                    Jaffna, Sri Lanka
                  </a>
                </div>
              </li>
            </ul>

            <div className="contact-map">
              <iframe
                title="117 / A Temple Road, Jaffna"
                src="https://maps.google.com/maps?q=117%2FA%20Temple%20Road%2C%20Jaffna%2C%20Sri%20Lanka&z=16&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <a
                className="contact-map-link"
                href="https://www.google.com/maps/search/?api=1&query=117%2FA+Temple+Road%2C+Jaffna%2C+Sri+Lanka"
                target="_blank"
                rel="noreferrer"
              >
                Open in Google Maps
              </a>
            </div>
          </aside>

          <div className="contact-panel">
            {state.succeeded ? (
              <div className="contact-success" role="status">
                <span className="contact-success-icon" aria-hidden="true">
                  ✓
                </span>
                <h3>Message sent</h3>
                <p>Thanks for reaching out. I&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form className="contact-form" id="cform" onSubmit={handleSubmit}>
                <div className="contact-form-head">
                  <h3>Send a message</h3>
                  <p>Tell me what you need — I&apos;ll take it from there.</p>
                </div>

                <div className="contact-fields">
                  <div className="contact-field-row">
                    <label className="contact-field" htmlFor="name">
                      <span>Name</span>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Your name"
                        autoComplete="name"
                        required
                      />
                      <ValidationError
                        prefix="Name"
                        field="name"
                        errors={state.errors}
                        className="error"
                      />
                    </label>

                    <label className="contact-field" htmlFor="email">
                      <span>Email</span>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="you@email.com"
                        autoComplete="email"
                        required
                      />
                      <ValidationError
                        prefix="Email"
                        field="email"
                        errors={state.errors}
                        className="error"
                      />
                    </label>
                  </div>

                  <label className="contact-field" htmlFor="subject">
                    <span>Subject</span>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      placeholder="Project, role, or question"
                      required
                    />
                    <ValidationError
                      prefix="Subject"
                      field="subject"
                      errors={state.errors}
                      className="error"
                    />
                  </label>

                  <label className="contact-field" htmlFor="message">
                    <span>Message</span>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="A short note about the project or how I can help…"
                      required
                    />
                    <ValidationError
                      prefix="Message"
                      field="message"
                      errors={state.errors}
                      className="error"
                    />
                  </label>
                </div>

                <ValidationError
                  errors={state.errors}
                  className="error contact-form-error"
                />

                <button
                  type="submit"
                  className="contact-submit"
                  disabled={state.submitting}
                >
                  {state.submitting ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
