import React, { useState } from "react";
import "./Contact.css";
import { FaGithub } from "react-icons/fa";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://my-portfolio-backend-f9hu.onrender.com";

const contactInfo = [
  { icon: "✉", label: "Email", value: "ajaykushwaha626162@gmail.com" },
  { icon: "⊕", label: "Location", value: "Bhopal, India" },
];

const socials = [
  {
    icon: <FaGithub />,
    label: "GitHub",
    href: "https://github.com/ajaykushwaha0508",
  },
  {
    icon: "in",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ajay-kushwaha-a8b91824a",
  },
];

const EMPTY = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [fieldErrs, setFieldErrs] = useState({});
  const [serverMsg, setServerMsg] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear that field's error as the user types
    if (fieldErrs[e.target.name]) {
      setFieldErrs((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setFieldErrs({});
    setServerMsg("");

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        // 422 — per-field validation errors from express-validator
        if (res.status === 422 && data.errors) {
          const fe = {};
          data.errors.forEach(({ field, message }) => {
            fe[field] = message;
          });
          setFieldErrs(fe);
          setStatus("idle");
          return;
        }
        // 429 rate-limit or other server error
        throw new Error(
          data.message || "Something went wrong. Please try again.",
        );
      }

      // Success
      setStatus("success");
      setServerMsg(data.message || "Thanks! I'll get back to you soon.");
      setForm(EMPTY);
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setServerMsg(err.message || "Could not send message. Please try again.");
    }
  };

  const isLoading = status === "loading";

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="contact-inner">
          {/* ── Left info panel ── */}
          <div className="contact-info">
            <p className="section-label">Get In Touch</p>
            <h2 className="section-title">Let's Connect</h2>
            <div className="accent-line" />
            <p className="contact-desc">
              I'm currently looking for new opportunities. Whether you have a
              question or just want to say hi, I'll try my best to get back to
              you!
            </p>

            <div className="contact-details">
              {contactInfo.map((c) => (
                <div key={c.label} className="contact-detail">
                  <div className="detail-icon">{c.icon}</div>
                  <div>
                    <span className="detail-label">{c.label}</span>
                    <span className="detail-value">{c.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="social-row">
              <p className="follow-label">Follow Me</p>
              <div className="socials-list">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="social-pill"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                  >
                    <span>{s.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={fieldErrs.name ? "input-error" : ""}
                  required
                />
                {fieldErrs.name && (
                  <span className="field-error">{fieldErrs.name}</span>
                )}
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={fieldErrs.email ? "input-error" : ""}
                  required
                />
                {fieldErrs.email && (
                  <span className="field-error">{fieldErrs.email}</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Project Inquiry"
                value={form.subject}
                onChange={handleChange}
                disabled={isLoading}
                className={fieldErrs.subject ? "input-error" : ""}
                required
              />
              {fieldErrs.subject && (
                <span className="field-error">{fieldErrs.subject}</span>
              )}
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                placeholder="Tell me about your project..."
                rows={5}
                value={form.message}
                onChange={handleChange}
                disabled={isLoading}
                className={fieldErrs.message ? "input-error" : ""}
                required
              />
              {fieldErrs.message && (
                <span className="field-error">{fieldErrs.message}</span>
              )}
            </div>

            <button
              type="submit"
              className={`send-btn ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner" /> Sending…
                </>
              ) : status === "success" ? (
                "✓ Message Sent!"
              ) : (
                <>
                  Send Message <span className="send-arrow">→</span>
                </>
              )}
            </button>

            {status === "success" && (
              <p className="form-feedback success-msg">{serverMsg}</p>
            )}
            {status === "error" && (
              <p className="form-feedback error-msg">{serverMsg}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
