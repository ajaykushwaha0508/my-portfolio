import React, { useState, useEffect, useCallback } from "react";
import "./adminDashboard.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://my-portfolio-backend-f9hu.onrender.com";
const PER_PAGE = 5;

const AVATAR_COLORS = [
  { bg: "#E6F1FB", text: "#185FA5" },
  { bg: "#E1F5EE", text: "#0F6E56" },
  { bg: "#FAEEDA", text: "#854F0B" },
  { bg: "#FBEAF0", text: "#72243E" },
  { bg: "#FAECE7", text: "#993C1D" },
];

function initials(name = "") {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(iso) {
  const d = new Date(iso);
  return (
    d.toLocaleDateString("en-IN", { month: "short", day: "numeric" }) +
    ", " +
    d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  );
}

// ── Stat Card ──────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, accent }) {
  return (
    <div className="stat-card">
      <p className="stat-label">{label}</p>
      <p className={`stat-value ${accent}`}>{value === null ? "—" : value}</p>
      <p className="stat-sub">{sub}</p>
    </div>
  );
}

// ── Status Badge ───────────────────────────────────────────────────────────────
function Badge({ status }) {
  return (
    <span className={`badge badge--${status}`}>{status.toUpperCase()}</span>
  );
}

// ── Row ────────────────────────────────────────────────────────────────────────
function Row({ item, index, onView }) {
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const status = item.status || "new";
  return (
    <div
      className={`inbox-row ${status === "archived" ? "row--archived" : ""}`}
    >
      <div className="cell cell--sender">
        <div
          className="mini-avatar"
          style={{ background: color.bg, color: color.text }}
        >
          {initials(item.name)}
        </div>
        <span className="sender-name">{item.name || "Unknown"}</span>
      </div>
      <div className="cell cell--subject">{item.subject || "(no subject)"}</div>
      <div className="cell cell--status">
        <Badge status={status} />
      </div>
      <div className="cell cell--date">
        {formatDate(item.createdAt || item.timestamp || new Date())}
      </div>
      <div className="cell cell--action">
        <button className="view-btn" onClick={() => onView(item)}>
          View →
        </button>
      </div>
    </div>
  );
}

// ── Message Modal ──────────────────────────────────────────────────────────────
function MessageModal({ item, onClose }) {
  if (!item) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{item.subject || "(no subject)"}</h3>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal-meta">
          <div className="modal-meta-row">
            <span className="meta-label">From</span>
            <span className="meta-val">{item.name}</span>
          </div>
          <div className="modal-meta-row">
            <span className="meta-label">Email</span>
            <a href={`mailto:${item.email}`} className="meta-link">
              {item.email}
            </a>
          </div>
          <div className="modal-meta-row">
            <span className="meta-label">Date</span>
            <span className="meta-val">
              {formatDate(item.createdAt || new Date())}
            </span>
          </div>
          <div className="modal-meta-row">
            <span className="meta-label">ID</span>
            <span className="meta-val meta-id">#{item.id}</span>
          </div>
        </div>
        <div className="modal-message">{item.message}</div>
        <div className="modal-footer">
          <a
            href={`mailto:${item.email}?subject=Re: ${item.subject}`}
            className="reply-btn"
          >
            Reply via Email →
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all"); // all | new | replied | archived

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/contact`);
      const json = await res.json();
      setData(Array.isArray(json.data) ? json.data : []);
    } catch {
      setError(
        "Could not connect to backend. Make sure the server is running.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // ── Derived stats ──────────────────────────────────────────────────────────
  const total = data.length;
  const unread = data.filter((d) => (d.status || "new") === "new").length;

  // ── Filtered + paginated ───────────────────────────────────────────────────
  const filtered =
    filter === "all"
      ? data
      : data.filter((d) => (d.status || "new") === filter);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const slice = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const handleFilter = (f) => {
    setFilter(f);
    setPage(1);
  };

  // ── Pager pages array ──────────────────────────────────────────────────────
  const pages = Array.from(
    { length: Math.min(totalPages, 5) },
    (_, i) => i + 1,
  );

  return (
    <div className="admin-shell">
      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="sb-brand">
          <div className="sb-logo">Cyan Ether Console</div>
          <div className="sb-tagline">mern stack portfolio</div>
        </div>

        <nav className="sb-nav">
          <p className="sb-section-label">Admin Portal</p>
          <div className="sb-item active">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              width="15"
              height="15"
            >
              <rect x="2" y="2" width="12" height="10" rx="2" />
              <path d="M5 12v2M11 12v2M3 14h10" />
              <path d="M5 6h6M5 8.5h4" />
            </svg>
            Inbox
          </div>
        </nav>

        <div className="sb-footer">
          <div className="sb-avatar">AK</div>
          <div>
            <p className="sb-name">Ajay Kushwaha</p>
            <p className="sb-online">● online</p>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="admin-main">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">
              Message <span>Terminal</span>
            </h1>
            <p className="page-desc">
              Active communication hub for portfolio inquiries.
            </p>
          </div>
          <button className="refresh-btn" onClick={load} title="Refresh">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              width="14"
              height="14"
            >
              <path d="M13 8A5 5 0 1 1 8 3" />
              <path d="M13 3v5h-5" />
            </svg>
            Refresh
          </button>
        </div>

        {/* Stat Cards — only 2 */}
        <div className="stats-row">
          <StatCard
            label="Total Submissions"
            value={loading ? null : total}
            sub={
              loading
                ? "Loading…"
                : `${total} form ${total === 1 ? "submission" : "submissions"} received`
            }
            accent="accent-cyan"
          />
          <StatCard
            label="Unread Messages"
            value={loading ? null : unread}
            sub={
              loading
                ? "Loading…"
                : unread === 0
                  ? "All caught up!"
                  : `${unread} ${unread === 1 ? "message" : "messages"} need attention`
            }
            accent="accent-amber"
          />
        </div>

        {/* Error state */}
        {error && (
          <div className="error-banner">
            <span>⚠ {error}</span>
            <button onClick={load}>Retry</button>
          </div>
        )}

        {/* Inbox Table */}
        <div className="inbox-card">
          <div className="inbox-card-header">
            <p className="inbox-title">Inbox Stream</p>
            <div className="filter-tabs">
              {["all", "new", "replied", "archived"].map((f) => (
                <button
                  key={f}
                  className={`filter-tab ${filter === f ? "active" : ""}`}
                  onClick={() => handleFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Column headers */}
          <div className="col-headers">
            <div className="col-h">Sender Name</div>
            <div className="col-h">Subject</div>
            <div className="col-h">Status</div>
            <div className="col-h">Date Received</div>
            <div className="col-h">Action</div>
          </div>

          {/* Rows */}
          <div className="inbox-rows">
            {loading ? (
              <div className="inbox-empty">Fetching submissions…</div>
            ) : slice.length === 0 ? (
              <div className="inbox-empty">No messages found.</div>
            ) : (
              slice.map((item, i) => (
                <Row
                  key={item.id || i}
                  item={item}
                  index={(safePage - 1) * PER_PAGE + i}
                  onView={setSelected}
                />
              ))
            )}
          </div>

          {/* Footer */}
          <div className="inbox-footer">
            <p className="showing-label">
              {loading
                ? "Loading…"
                : `Showing ${slice.length} of ${filtered.length} records`}
            </p>
            <div className="pager">
              <button
                className="page-btn"
                disabled={safePage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                ‹
              </button>
              {pages.map((p) => (
                <button
                  key={p}
                  className={`page-btn ${p === safePage ? "active" : ""}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
              <button
                className="page-btn"
                disabled={safePage === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                ›
              </button>
            </div>
          </div>
        </div>

        {/* Bar footer */}
        <div className="admin-bar-footer">
          <span></span>
          <span>© 2024 Ajay Kushwaha Portfolio</span>
        </div>
      </main>

      {/* Modal */}
      {selected && (
        <MessageModal item={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
