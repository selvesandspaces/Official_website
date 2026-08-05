export default function Footer() {
  return (
    <footer
      style={{
        background: "#F5F0E8",
        borderTop: "1px solid rgba(28,28,26,0.08)",
      }}
    >
      <div className="px-6 md:px-14 lg:px-24 py-5 max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p
          className="font-body font-light"
          style={{
            fontSize: "11px",
            color: "rgba(28,28,26,0.3)",
            letterSpacing: "0.06em",
          }}
        >
          © {new Date().getFullYear()} Selves & Spaces
        </p>
        <div className="flex gap-6">
          <a
            href="mailto:selvesandspaces@gmail.com"
            className="font-body font-light transition-colors duration-200"
            style={{
              fontSize: "11px",
              color: "rgba(28,28,26,0.3)",
              letterSpacing: "0.04em",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C4956A")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(28,28,26,0.3)")
            }
          >
            selvesandspaces@gmail.com
          </a>
          <a
            href="tel:+919677175894"
            className="font-body font-light transition-colors duration-200"
            style={{
              fontSize: "11px",
              color: "rgba(28,28,26,0.3)",
              letterSpacing: "0.04em",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C4956A")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(28,28,26,0.3)")
            }
          >
            +91 96771 75894
          </a>
        </div>
      </div>
    </footer>
  );
}
