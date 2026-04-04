import React from "react";
import "./Skills.css";

const skillCategories = [
  {
    title: "Frontend",
    icon: "⬡",
    color: "#61dafb",
    skills: [
      { name: "React / Next.js", level: 90 },
      { name: "Tailwind CSS", level: 85 },
      { name: "TypeScript", level: 80 },
    ],
  },
  {
    title: "Backend",
    icon: "⚙",
    color: "#68d391",
    skills: [
      { name: "Node.js / Express", level: 88 },
      { name: "REST API", level: 90 },
    ],
  },
  {
    title: "Database",
    icon: "▦",
    color: "#f6ad55",
    skills: [
      { name: "MongoDB", level: 85 },

      { name: "Redis", level: 65 },
    ],
  },
  {
    title: "Tools",
    icon: "◈",
    color: "#b794f4",
    skills: [
      { name: "Git / GitHub", level: 90 },
      { name: "Docker", level: 70 },
      { name: "Kubernetes", level: 65 },
      { name: "AWS / Vercel", level: 60 },
    ],
  },
];

function SkillBar({ name, level }) {
  return (
    <div className="skill-item">
      <div className="skill-meta">
        <span className="skill-name">{name}</span>
        <span className="skill-pct">{level}%</span>
      </div>
      <div className="skill-track">
        <div className="skill-fill" style={{ "--target": `${level}%` }} />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section className="section skills-section" id="skills">
      <div className="container">
        <div className="section-header centered">
          <p className="section-label">What I Know</p>
          <h2 className="section-title">Technical Skills</h2>
          <div className="accent-line" style={{ margin: "16px auto 0" }} />
          <p
            className="section-subtitle"
            style={{ margin: "12px auto 0", textAlign: "center" }}
          >
            My technical arsenal covers the entire development lifecycle, from
            frontend polish to backend architecture.
          </p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((cat) => (
            <div key={cat.title} className="skill-card">
              <div
                className="skill-card-header"
                style={{ "--cat-color": cat.color }}
              >
                <span className="cat-icon" style={{ color: cat.color }}>
                  {cat.icon}
                </span>
                <h3 className="cat-title">{cat.title}</h3>
              </div>
              <div className="skill-list">
                {cat.skills.map((s) => (
                  <SkillBar key={s.name} name={s.name} level={s.level} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
