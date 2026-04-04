import React, { useEffect, useRef } from "react";
import "./Hero.css";
import { FaGithub } from "react-icons/fa";

const socialLinks = [
  {
    label: "GitHub",
    icon: <FaGithub />,
    href: "https://github.com/ajaykushwaha0508",
  },
  {
    label: "LinkedIn",
    icon: "in",
    href: "https://www.linkedin.com/in/ajay-kushwaha-a8b91824a",
  },
];

export default function Hero() {
  const badgeRef = useRef(null);

  useEffect(() => {
    const el = badgeRef.current;
    if (!el) return;
    let angle = 0;
    const spin = setInterval(() => {
      angle += 0.5;
      el.style.setProperty("--angle", `${angle}deg`);
    }, 16);
    return () => clearInterval(spin);
  }, []);

  return (
    <section className="hero" id="hero">
      {/* Ambient background blobs */}
      <div className="hero-blob blob-1" />
      <div className="hero-blob blob-2" />
      <div className="grid-overlay" />

      <div className="container hero-container">
        {/* Left: Content */}
        <div className="hero-content">
          <div className="available-badge">
            <span className="badge-dot" />
            Available for work
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="hero-name">Ajay</span>
            ,<br />
            a MERN Stack
            <br />
            Developer.
          </h1>

          <p className="hero-desc">
            I build high-performance, scalable web applications with a focus on
            seamless user experiences and robust backend architectures.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn-secondary">
              Contact Me
            </a>
          </div>

          <div className="hero-socials">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="social-icon">{s.icon}</span>
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right: Image */}
        <div className="hero-image-wrap">
          <div className="hero-image-card">
            <div className="image-glow" />
            <div className="hero-photo">
              <img
                src="src/assets/ajay.png"
                alt="Arjun - MERN Stack Developer"
              />
            </div>
            <div className="exp-badge" ref={badgeRef}>
              <span className="exp-number">2+</span>
              <span className="exp-label">
                Years of
                <br />
                Experience
              </span>
            </div>
          </div>

          {/* Floating tech tags */}
          <div className="floating-tag tag-1">React.js</div>
          <div className="floating-tag tag-2">Node.js</div>
          <div className="floating-tag tag-3">MongoDB</div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="scroll-hint">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
