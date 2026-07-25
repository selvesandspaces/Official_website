import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const UPCOMING = [
  {
    id: 1,
    title: "Understanding Anxiety",
    description: "A guided workshop exploring the roots of anxiety and practical tools for everyday calm.",
    tag: "Self-awareness",
    accent: "#C4956A",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    formLink: "#",
    learnLink: "#",
  },
  {
    id: 2,
    title: "Parenting Through Big Emotions",
    description: "For parents navigating emotional storms with their children — building connection before correction.",
    tag: "Parenting",
    accent: "#6B56A8",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    formLink: "#",
    learnLink: "#",
  },
  {
    id: 3,
    title: "Grief & Loss: A Circle of Sharing",
    description: "A held space to process grief with others who understand, facilitated by our therapists.",
    tag: "Grief",
    accent: "#8A9E85",
    image: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=800&q=80",
    formLink: "#",
    learnLink: "#",
  },
];

const COMPLETED = [
  {
    id: 4,
    title: "Mirror Mirror: What Do You See?",
    description: "A reflective workshop for therapists and Master's students to pause, introspect, and rejuvenate. Guided exercises, experiential learning, and group discussions to enhance self-awareness and therapeutic presence. Facilitated by Dr. Poornima Viswanathan and Ms. Kanaga Lakshmi. Held on January 18, 2025 at Selves & Spaces, Adyar.",
    tag: "Therapist Wellbeing",
    accent: "#C4956A",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
    formLink: "#",
    learnLink: "#",
  },
  {
    id: 5,
    title: "Introduction to Mindfulness",
    description: "An introductory session on present-moment awareness and how to cultivate it daily.",
    tag: "Mindfulness",
    accent: "#6B56A8",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&q=80",
    formLink: "#",
    learnLink: "#",
  },
  {
    id: 6,
    title: "Boundaries & Relationships",
    description: "Exploring how to set and communicate boundaries with compassion — for yourself and others.",
    tag: "Relationships",
    accent: "#8A9E85",
    image: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=800&q=80",
    formLink: "#",
    learnLink: "#",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function WorkshopModal({ workshop, onClose }) {
  if (!workshop) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center px-4"
        style={{ background: "rgba(17,18,9,0.65)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <motion.div
          className="relative w-full overflow-hidden"
          style={{ maxWidth: "480px", background: "#F5F0E8", boxShadow: "0 32px 80px rgba(0,0,0,0.28)" }}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.93, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ height: "3px", background: "linear-gradient(90deg, #323b10, #C4956A, #6B56A8)" }} />

          <div style={{ padding: "44px 32px 40px" }} className="md:px-10">
            <button
              onClick={onClose}
              className="absolute font-body"
              style={{ top: "18px", right: "20px", fontSize: "10px", letterSpacing: "0.22em", color: "rgba(28,28,26,0.36)", background: "none", border: "none", cursor: "pointer", textTransform: "uppercase" }}
            >
              ✕ close
            </button>

            <p className="font-body uppercase mb-3" style={{ fontSize: "9px", letterSpacing: "0.38em", color: workshop.accent }}>
              {workshop.tag}
            </p>

            <h2 className="font-display italic mb-6" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "#1C1C1A", lineHeight: 1.05 }}>
              {workshop.title}
            </h2>

            <div style={{ height: "1px", background: "rgba(28,28,26,0.10)", marginBottom: "22px" }} />

            <p className="font-body font-light mb-10" style={{ fontSize: "15.5px", lineHeight: 1.9, color: "rgba(28,28,26,0.62)" }}>
              {workshop.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={workshop.formLink}
                className="font-body uppercase text-center transition-opacity duration-200"
                style={{ flex: 1, fontSize: "10px", letterSpacing: "0.24em", padding: "13px 16px", background: workshop.accent, color: "#F5F0E8", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.82")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Register on Google Forms →
              </a>
              <a
                href={workshop.learnLink}
                className="font-body uppercase text-center transition-all duration-200"
                style={{ flex: 1, fontSize: "10px", letterSpacing: "0.24em", padding: "13px 16px", background: "transparent", color: "rgba(28,28,26,0.56)", border: "1px solid rgba(28,28,26,0.16)", textDecoration: "none" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#1C1C1A"; e.currentTarget.style.borderColor = "rgba(28,28,26,0.36)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(28,28,26,0.56)"; e.currentTarget.style.borderColor = "rgba(28,28,26,0.16)"; }}
              >
                Learn More →
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function WorkshopCard({ workshop, onLearnMore, index }) {
  return (
    <motion.div
      className="flex flex-col overflow-hidden"
      style={{ background: "#FFFFFF", border: "1px solid rgba(107,86,168,0.12)" }}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
    >
      {/* Image */}
      <div className="overflow-hidden" style={{ height: "220px" }}>
        <img
          src={workshop.image}
          alt={workshop.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-7">
        <p
          className="font-body uppercase mb-3"
          style={{ fontSize: "9px", letterSpacing: "0.36em", color: workshop.accent }}
        >
          {workshop.tag}
        </p>
        <h3
          className="font-display italic mb-3"
          style={{ fontSize: "1.7rem", color: "#1C1C1A", lineHeight: 1.1 }}
        >
          {workshop.title}
        </h3>
        <p
          className="font-body font-light flex-1 mb-7"
          style={{ fontSize: "14.5px", lineHeight: 1.85, color: "rgba(28,28,26,0.58)" }}
        >
          {workshop.description}
        </p>

        <button
          onClick={() => onLearnMore(workshop)}
          className="font-body uppercase self-start transition-all duration-300"
          style={{
            fontSize: "9px",
            letterSpacing: "0.30em",
            padding: "11px 22px",
            background: "transparent",
            border: `1px solid ${workshop.accent}`,
            color: workshop.accent,
            cursor: "pointer",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = workshop.accent; e.currentTarget.style.color = "#F5F0E8"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = workshop.accent; }}
        >
          Learn more →
        </button>
      </div>
    </motion.div>
  );
}

export default function WorkshopsSection() {
  const [tab, setTab] = useState("upcoming");
  const [selected, setSelected] = useState(null);

  const workshops = tab === "upcoming" ? UPCOMING : COMPLETED;

  return (
    <main className="font-body" style={{ background: "#F5F0E8", minHeight: "100vh", color: "#1C1C1A" }}>

      {/* ── Header ── */}
      <section className="relative z-10 px-6 md:px-14 lg:px-24 pt-32 pb-14" style={{ background: "transparent" }}>
        <div className="max-w-6xl mx-auto">
          <motion.p
            className="font-body uppercase mb-4"
            style={{ fontSize: "10px", letterSpacing: "0.44em", color: "#8A9E85" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Selves & Spaces · Workshops
          </motion.p>
          <motion.h1
            className="font-display italic"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", color: "#1C1C1A", lineHeight: 0.95 }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Our workshops.
          </motion.h1>
        </div>
      </section>

      {/* Stripe */}
      <div style={{ height: "3px", background: "linear-gradient(90deg, #323b10, #C4956A, #6B56A8)" }} />

      {/* ── Tabs ── */}
      <section className="relative z-10 px-6 md:px-14 lg:px-24 pt-12 pb-0">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2">
            {[
              { id: "upcoming", label: "Upcoming" },
              { id: "completed", label: "Completed" },
            ].map(({ id, label }) => {
              const active = tab === id;
              return (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className="font-body uppercase transition-all duration-300"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.30em",
                    padding: "10px 24px",
                    background: active ? "#323b10" : "transparent",
                    color: active ? "#F5F0E8" : "rgba(28,28,26,0.46)",
                    border: `1px solid ${active ? "#323b10" : "rgba(28,28,26,0.16)"}`,
                    cursor: "pointer",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div style={{ height: "1px", background: "rgba(28,28,26,0.10)", marginTop: "24px" }} />
        </div>
      </section>

      {/* ── Cards ── */}
      <section className="relative z-10 px-6 md:px-14 lg:px-24 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshops.map((ws, i) => (
              <WorkshopCard key={ws.id} workshop={ws} onLearnMore={setSelected} index={i} />
            ))}
          </div>
        </div>
      </section>

      <WorkshopModal workshop={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
