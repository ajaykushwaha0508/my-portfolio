import React, { useState } from "react";
import "./Contact.css";
import { FaGithub } from "react-icons/fa";

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

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="contact-inner">
          {/* Left */}
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

          {/* Right: Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
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
                required
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                placeholder="Tell me about your project..."
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="send-btn">
              {sent ? "✓ Message Sent!" : "Send Message"}
              {!sent && <span className="send-arrow">→</span>}
            </button>

            {sent && (
              <p className="success-msg">Thanks! I'll get back to you soon.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
