import React, { useState } from "react";
import "./Projects.css";

const projects = [
  {
    title: "FullMoonHolidays",
    category: ["All", "React", "Next.js", "mongodb"],
    tags: ["React", "Next.js", "mongodb"],
    desc: "A travel company that organizes trekking, adventure trips, and spiritual tours in India.",
    color: "#1e3a5f",
    accent: "#4a9eff",
    icon: "📊",
    imgUrl: "/images/FMH.png",
    demo: "https://www.fullmoonholidays.com",
  },
  {
    title: "Poornam Events",
    category: ["All", "React", "Next.js", "mongodb"],
    tags: ["React", "Next.js", "mongodb"],
    desc: "A wedding planner that manages everything—from decoration to guest handling—to make your event stress-free and memorable.",
    color: "#1e3d2f",
    accent: "#4ade80",
    imgUrl: "/images/PE.png",
    icon: "🛍",
    demo: "https://www.poornamevents.com/",
  },
  {
    title: "Inhyma (industrial machines company)",
    category: ["All", "React", "Next.js", "mongodb"],
    tags: ["React", "Next.js", "mongodb"],
    desc: "A supplier of industrial packaging machines used by businesses to pack, seal, and process products.",
    color: "#3d1e1e",
    accent: "#f87171",
    imgUrl: "/images/inhyma.png",
    icon: "✓",
    demo: "https://www.inhyma.com",
  },
  {
    title: "Madhuban Ecoretreat (resort)",
    category: ["All", "Next.js"],
    tags: ["Next.js"],
    desc: "Madhuban Eco Retreat is an eco-luxury forest resort located near Ratapani Wildlife Sanctuary (near Bhopal, Madhya Pradesh).",
    color: "#2d1e3d",
    accent: "#c084fc",
    demo: "https://www.madhubanecoretreat.com/",
    imgUrl: "/images/madhuban.png",
  },
  {
    title: "Dream Home Styling (interior design company)",
    category: ["All", "React", "Next.js"],
    tags: ["React", "Tailwind CSS", "Next.js"],
    desc: "A home decor and interior design service that helps you design and customize your home according to your style.",
    color: "#1e2d3d",
    accent: "#38bdf8",
    demo: "https://www.dreamhomestyling.com/",
    imgUrl: "/images/DHS.png",
  },
];

const filters = ["All", "React", "Next.js", "mongodb"];

export default function Projects() {
  const [active, setActive] = useState("All");

  const filtered = projects.filter((p) => p.category.includes(active));

  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        <div className="projects-header">
          <div>
            <p className="section-label">My Work</p>
            <h2 className="section-title">Featured Projects</h2>
            <div className="accent-line" />
            <p className="section-subtitle">
              A collection of applications I've built using modern web
              technologies.
            </p>
          </div>
          <div className="project-filters">
            {filters.map((f) => (
              <button
                key={f}
                className={`filter-btn ${active === f ? "active" : ""}`}
                onClick={() => setActive(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {filtered.map((project) => (
            <div key={project.title} className="project-card">
              <div
                className="project-thumbnail"
                style={{
                  background: `linear-gradient(135deg, ${project.color} 0%, #0a0e1a 100%)`,
                }}
              >
                <div
                  className="project-thumb-icon"
                  style={{ color: project.accent }}
                >
                  <img src={project.imgUrl} alt={project.title} />
                </div>
                <div
                  className="thumb-glow"
                  style={{
                    background: `radial-gradient(circle, ${project.accent}22 0%, transparent 70%)`,
                  }}
                />
              </div>

              <div className="project-body">
                <div className="project-tags">
                  {project.tags.map((t) => (
                    <span key={t} className="project-tag">
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>

                <div className="project-links">
                  <a href={project.demo} className="project-link primary">
                    Live Demo
                    <span>↗</span>
                  </a>
                  {/* <a href={project.source} className="project-link ghost">
                    GitHub
                    <span>↗</span>
                  </a> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
