import React from "react";
import "./About.css";
import resumePdf from "./Ajay_Kushwaha_Resume.pdf";

const qualities = [
  {
    icon: "✦",
    title: "Clean Code",
    desc: "Writing readable, maintainable and well-structured code.",
  },
  {
    icon: "⬡",
    title: "Responsive",
    desc: "Crafting pixel-perfect layouts across all screen sizes.",
  },
  {
    icon: "⚡",
    title: "Performance",
    desc: "Optimized applications with fast load times.",
  },
  {
    icon: "⟳",
    title: "Scalable",
    desc: "Building systems designed to grow with your product.",
  },
];

export default function About() {
  return (
    <section className="section about-section" id="about">
      <div className="container about-container">
        <div className="about-content">
          <p className="section-label">Who I Am</p>
          <h2 className="section-title">About Me</h2>
          <div className="accent-line" />

          <p className="about-text">
            I am a dedicated Full-Stack Developer with over 2+ years of
            experience crafting digital solutions. My journey began with a
            curiosity for how things work on the web, which evolved into a
            professional career specializing in the MERN stack.
          </p>
          <p className="about-text">
            I thrive on solving complex problems and optimizing performance.
            Beyond coding, I'm passionate about clean UI/UX, collaborative team
            environments, and keeping up with the latest industry trends like
            Docker and Microservices.
          </p>

          <a href={resumePdf} className="btn-resume" download="Ajay_Kushwaha_Resume.pdf">
            <span className="resume-icon">↓</span>
            Download Resume
          </a>
        </div>

        <div className="about-qualities">
          {qualities.map((q) => (
            <div key={q.title} className="quality-card">
              <div className="quality-icon">{q.icon}</div>
              <div>
                <h4 className="quality-title">{q.title}</h4>
                <p className="quality-desc">{q.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
