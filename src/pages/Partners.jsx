import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const Partners = () => {
  return (
    <main
      style={{ minHeight: "100vh", background: "#2C3B2D", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}
    >
      {/* Grain */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: GRAIN, backgroundSize: "180px", opacity: 0.16, mixBlendMode: "overlay", pointerEvents: "none" }} />
      {/* Warm glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(196,149,106,0.10) 0%, transparent 65%)", pointerEvents: "none" }} />

      <motion.div
        className="text-center"
        style={{ position: "relative", zIndex: 2, padding: "2rem" }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-body uppercase" style={{ fontSize: "0.65rem", letterSpacing: "0.44em", color: "rgba(138,158,133,0.80)", marginBottom: "1.5rem" }}>
          Selves &amp; Spaces · Partners
        </p>

        <h1 className="font-display italic" style={{ fontSize: "clamp(3.5rem,10vw,8rem)", lineHeight: 0.90, color: "#F5F0E8", marginBottom: "1.5rem" }}>
          Coming
          <span className="block" style={{ color: "#C4956A" }}>Soon.</span>
        </h1>

        <p className="font-body font-light" style={{ fontSize: "1rem", color: "rgba(245,240,232,0.48)", lineHeight: 1.8, maxWidth: "36ch", margin: "0 auto 2.5rem" }}>
          We're building something meaningful here. Our partnerships page will be live shortly.
        </p>

        <Link
          to="/"
          className="font-body uppercase"
          style={{ fontSize: "0.72rem", letterSpacing: "0.22em", color: "rgba(196,149,106,0.80)", borderBottom: "1px solid rgba(196,149,106,0.30)", paddingBottom: "2px", textDecoration: "none", transition: "color 0.2s ease" }}
          onMouseEnter={e => e.currentTarget.style.color = "#C4956A"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(196,149,106,0.80)"}
        >
          ← Back to home
        </Link>
      </motion.div>
    </main>
  );
};

export default Partners;
