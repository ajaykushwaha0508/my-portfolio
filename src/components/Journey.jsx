import React from "react";
import "./Journey.css";

const experiences = [
  {
    period: "2025 – Present",
    role: "MERN Stack Developer",
    company: "Vyomedge Private Limited, Bhopal",
    side: "left",
    desc: "Working on building scalable and responsive web applications using the MERN stack. Contributing to frontend and backend development, focusing on clean architecture, performance optimization, and reusable components.",
    highlights: ["React", "Node.js", "MongoDB", "Performance"],
  },
  {
    period: "2024 – 2025",
    role: "Frontend Developer",
    company: "IIFE Tech Private Limited, Bhopal",
    side: "right",
    desc: "Developed responsive and user-friendly UI components using React and Redux. Improved application performance through lazy loading, code splitting, and efficient state management techniques.",
    highlights: ["React", "Redux", "Optimization"],
  },
];

export default function Journey() {
  return (
    <section className="section journey-section" id="journey">
      <div className="container">
        <div
          className="section-header centered"
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <p className="section-label">Career Path</p>
          <h2 className="section-title">My Journey</h2>
          <div className="accent-line" style={{ margin: "16px auto 0" }} />
        </div>

        <div className="timeline">
          <div className="timeline-line" />

          {experiences.map((exp, i) => (
            <div key={exp.role} className={`timeline-item ${exp.side}`}>
              <div className="timeline-node">
                <div className="node-ring" />
                <div className="node-dot" />
              </div>

              <div className="timeline-card">
                <div className="exp-period">{exp.period}</div>
                <h3 className="exp-role">{exp.role}</h3>
                <p className="exp-company">{exp.company}</p>
                <p className="exp-desc">{exp.desc}</p>
                <div className="exp-highlights">
                  {exp.highlights.map((h) => (
                    <span key={h} className="exp-highlight">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
