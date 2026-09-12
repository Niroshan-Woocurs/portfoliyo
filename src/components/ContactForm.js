import { useState } from "react";

const ContactForm = ({ formspreeId = "mwlkaoza" }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSucceeded(true);
        setSubmitting(false);
      } else {
        const data = await response.json().catch(() => ({}));
        const errorText =
          (data.errors && data.errors.map((err) => err.message).join(", ")) ||
          "There was a problem submitting your message. Please try again or contact directly via email.";
        setErrorMessage(errorText);
        setSubmitting(false);
      }
    } catch (err) {
      setErrorMessage(
        "Network error. Please check your internet connection or reach out directly at jenijeniston05@gmail.com."
      );
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setSucceeded(false);
    setErrorMessage("");
    setSubmitting(false);
  };

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
            {succeeded ? (
              <div className="contact-success" role="status">
                <span className="contact-success-icon" aria-hidden="true">
                  ✓
                </span>
                <h3>Message Sent Successfully!</h3>
                <p>Thanks for reaching out. I&apos;ll get back to you as soon as possible.</p>
                <button
                  type="button"
                  className="contact-submit"
                  onClick={handleReset}
                  style={{ marginTop: "24px" }}
                >
                  Send Another Message
                </button>
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
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        autoComplete="name"
                        required
                      />
                    </label>

                    <label className="contact-field" htmlFor="email">
                      <span>Email</span>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@email.com"
                        autoComplete="email"
                        required
                      />
                    </label>
                  </div>

                  <label className="contact-field" htmlFor="subject">
                    <span>Subject</span>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project, role, or question"
                      required
                    />
                  </label>

                  <label className="contact-field" htmlFor="message">
                    <span>Message</span>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="A short note about the project or how I can help…"
                      required
                    />
                  </label>
                </div>

                {errorMessage && (
                  <div
                    className="error contact-form-error"
                    style={{
                      marginTop: "16px",
                      padding: "12px 14px",
                      background: "rgba(255, 59, 0, 0.12)",
                      border: "1px solid rgba(255, 59, 0, 0.4)",
                      color: "#ff6b4a",
                      fontSize: "13px",
                    }}
                  >
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className="contact-submit"
                  disabled={submitting}
                >
                  {submitting ? "Sending…" : "Send Message"}
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
