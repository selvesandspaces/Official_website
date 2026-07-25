import { useState } from "react";

const CATEGORIES = [
  {
    id: "book-reading",
    label: "Book Reading",
    accent: "#C4956A",
    images: Array.from({ length: 4 }, (_, i) => ({
      id: i + 1,
      src: `/Gallery/BookReading/${i + 1}.jpeg`,
      alt: `Book Reading ${i + 1}`,
    })),
  },
  {
    id: "documentary",
    label: "Documentary",
    accent: "#323b10",
    images: Array.from({ length: 9 }, (_, i) => ({
      id: i + 1,
      src: `/Gallery/Documentary/${i + 1}.jpeg`,
      alt: `Documentary ${i + 1}`,
    })),
  },
  {
    id: "mirror-mirror",
    label: "Mirror Mirror",
    accent: "#6B56A8",
    images: Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      src: `/Gallery/Mirror%20Mirror/${i + 1}.jpeg`,
      alt: `Mirror Mirror ${i + 1}`,
    })),
  },
  {
    id: "open-house",
    label: "Open House",
    accent: "#8A9E85",
    images: Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      src: `/Gallery/OpenHouse/${i + 1}.jpeg`,
      alt: `Open House ${i + 1}`,
    })),
  },
];

const INITIAL_VISIBLE = 6;

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export default function HomeGallery() {
  const [activeId, setActiveId] = useState(CATEGORIES[0].id);
  const [expanded, setExpanded] = useState(false);

  const category = CATEGORIES.find((c) => c.id === activeId);
  const visibleImages = expanded ? category.images : category.images.slice(0, INITIAL_VISIBLE);
  const hasMore = category.images.length > INITIAL_VISIBLE;

  const handleTabChange = (id) => {
    setActiveId(id);
    setExpanded(false);
  };

  return (
    <main
      className="relative"
      style={{
        background: "linear-gradient(145deg, #2C1A0E 0%, #3D2512 25%, #5C3D1E 50%, #3A2410 75%, #241508 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Warm amber radial glow — top right */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-60px",
          right: "-60px",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,149,106,0.22) 0%, transparent 65%)",
        }}
      />
      {/* Deeper mocha glow — bottom left */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "10%",
          left: "-80px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(180,110,60,0.14) 0%, transparent 65%)",
        }}
      />
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: GRAIN,
          backgroundSize: "180px",
          opacity: 0.09,
        }}
      />
      {/* ── Header ── */}
      <section className="px-6 md:px-14 lg:px-24 pt-32 pb-12">
        <div className="max-w-6xl mx-auto">
          <p
            className="font-body uppercase mb-4"
            style={{ fontSize: "10px", letterSpacing: "0.44em", color: "rgba(196,149,106,0.72)" }}
          >
            Selves & Spaces · Gallery
          </p>
          <h1
            className="font-display italic"
            style={{
              fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
              color: "#F5EDE0",
              lineHeight: 0.92,
            }}
          >
            The spaces we hold.
          </h1>
        </div>
      </section>

      {/* 4px stripe */}
      <div style={{ height: "3px", background: "linear-gradient(90deg, #323b10, #C4956A, #6B56A8, #8A9E85)" }} />

      {/* ── Category tabs ── */}
      <section className="px-6 md:px-14 lg:px-24 pt-14 pb-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const active = cat.id === activeId;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleTabChange(cat.id)}
                  className="font-body uppercase transition-all duration-300"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.32em",
                    padding: "10px 20px",
                    border: `1px solid ${active ? cat.accent : "rgba(245,237,224,0.18)"}`,
                    background: active ? cat.accent : "rgba(255,255,255,0.04)",
                    color: active ? "#F5F0E8" : "rgba(245,237,224,0.50)",
                    cursor: "pointer",
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Category count */}
          <p
            className="font-body mt-5"
            style={{ fontSize: "12px", color: "rgba(245,237,224,0.28)", letterSpacing: "0.08em" }}
          >
            {category.images.length} {category.images.length === 1 ? "image" : "images"}
          </p>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="px-6 md:px-14 lg:px-24 py-10">
        <div className="max-w-6xl mx-auto">
          <div
            style={{
              columns: "3 280px",
              columnGap: "12px",
            }}
          >
            {visibleImages.map((img) => (
              <div
                key={img.id}
                className="group relative overflow-hidden"
                style={{
                  breakInside: "avoid",
                  marginBottom: "12px",
                  display: "block",
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full block transition-transform duration-700 group-hover:scale-105"
                  style={{ display: "block" }}
                />
                {/* Label overlay on hover */}
                <div
                  className="absolute inset-0 flex items-end"
                  style={{
                    background: "linear-gradient(0deg, rgba(0,0,0,0.52) 0%, transparent 55%)",
                    opacity: 0,
                    transition: "opacity 0.35s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                >
                  <p
                    className="font-body px-4 py-4"
                    style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#F5F0E8", textTransform: "uppercase" }}
                  >
                    {img.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* View more / View less */}
          {hasMore && (
            <div className="mt-12 flex items-center gap-6">
              <div style={{ flex: 1, height: "1px", background: "rgba(245,237,224,0.10)" }} />
              <button
                onClick={() => setExpanded((v) => !v)}
                className="font-body uppercase transition-all duration-300"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.36em",
                  padding: "12px 28px",
                  border: `1px solid ${category.accent}`,
                  background: "transparent",
                  color: category.accent,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = category.accent;
                  e.currentTarget.style.color = "#F5F0E8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = category.accent;
                }}
              >
                {expanded
                  ? "View less ↑"
                  : `View all ${category.images.length} images ↓`}
              </button>
              <div style={{ flex: 1, height: "1px", background: "rgba(245,237,224,0.10)" }} />
            </div>
          )}
        </div>
      </section>

      {/* Bottom breathing room */}
      <div style={{ height: "80px" }} />
    </main>
  );
}
