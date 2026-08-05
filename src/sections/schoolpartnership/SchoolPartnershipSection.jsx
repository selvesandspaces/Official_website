import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const staggerFast = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const QUESTIONS = [
  {
    path: "M12 21s-7-4.5-7-10a7 7 0 0 1 14 0c0 5.5-7 10-7 10ZM12 8v4M12 15h.01",
    text: "Are students receiving the right support at the right time?",
  },
  {
    path: "M3 20V9l9-6 9 6v11M3 20h18M9 20v-6h6v6",
    text: "Is wellbeing part of our culture, or only an occasional activity?",
  },
  {
    path: "M4 20V10M10 20V4M16 20v-7M22 20H2",
    text: "Can we demonstrate impact to parents, management and stakeholders?",
  },
];

const REPORT_LINES = [
  { label: "Student wellbeing trends", meta: "By grade, across terms" },
  { label: "Emerging emotional concerns", meta: "What is rising, and where" },
  { label: "Risk and support mapping", meta: "Who needs whom, and when" },
  { label: "Teacher observation themes", meta: "What staff are seeing" },
  { label: "Recommended next steps", meta: "Specific, and costed" },
];

const ECOSYSTEMS = [
  {
    tag: "Aindri S",
    title: "School Ecosystems",
    body: "A whole-school partnership, not a counsellor who visits on Thursdays. We work with students, teachers and parents as one system — because a child who is struggling is rarely struggling alone.",
    items: [
      "Counsellor embedded on campus",
      "School Mental Health Index, every term",
      "Teacher capacity building and supervision",
      "Parent programmes and annual wellbeing report",
    ],
  },
  {
    tag: "Aindri C",
    title: "Workplace Ecosystems",
    body: "Most employee assistance programmes are a number nobody calls. Ours is a clinician your people can meet, on a floor we actually walk. Utilisation is reported to you, not assumed on your behalf.",
    items: [
      "On-site and online counsellor access",
      "Managers trained to respond, not to diagnose",
      "Critical incident response within 24 hours",
      "Quarterly utilisation and emotional climate reporting",
    ],
  },
];

const WHY = [
  {
    title: "Relational",
    body: "We work with what happens between people, not only within them.",
    d: "M7 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM17 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM9.5 10.5 14.5 14",
  },
  {
    title: "Systems oriented",
    body: "A struggling child is often a signal about the system around them.",
    d: "M12 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 3v3M12 18v3M3 12h3M18 12h3",
  },
  {
    title: "Preventive",
    body: "Built for the months before a crisis, not the week after one.",
    d: "M3 17c3-9 6-9 9 0s6 9 9 0",
  },
  {
    title: "Measurable",
    body: "Every quarter, evidence you can put in front of a board.",
    d: "M4 19V7M9 19V4M14 19v-8M19 19v-5M2 22h20",
  },
  {
    title: "Culturally grounded",
    body: "Delivered across languages, for families as they actually live.",
    d: "M4 20c0-4 3.5-6 8-6s8 2 8 6M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
  },
  {
    title: "Long term",
    body: "Partnerships measured in years, because a culture changes slowly.",
    d: "M12 21c-1 0-8-5-8-10a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 11c0 5-7 10-8 10Z",
  },
];

const SPARKLINE = [38, 52, 74, 46, 61, 44, 83, 57, 49, 66, 41, 55];

const wrap = {
  maxWidth: "1220px",
  margin: "0 auto",
  paddingLeft: "clamp(1.5rem,5vw,6rem)",
  paddingRight: "clamp(1.5rem,5vw,6rem)",
};

function Eyebrow({ children, color = "#8A9E85" }) {
  return (
    <motion.div
      variants={fadeUp}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "1.6rem",
      }}
    >
      <span
        className="font-body font-semibold uppercase"
        style={{ fontSize: "0.68rem", letterSpacing: "0.2em", color }}
      >
        {children}
      </span>
      <span
        style={{
          flex: "0 0 2.5rem",
          height: "1px",
          background: color,
          opacity: 0.4,
        }}
      />
    </motion.div>
  );
}

export default function SchoolPartnershipSection() {
  return (
    <main style={{ color: "#1C1C1A" }}>
      {/* ══ 1. HERO IMAGE ══ */}
      <section
        className="school-hero-section"
        style={{ position: "relative", height: "100vh", overflow: "hidden" }}
      >
        {/* Background image */}
        <img
          src="ProjectAindri.png"
          alt="Project Aindri"
          className="school-hero-img"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        {/* Simple dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(32,43,31,0.08)",
            pointerEvents: "none",
          }}
        />
        {/* Grain */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: GRAIN,
            backgroundSize: "180px",
            opacity: 0.16,
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        />

        {/* Top-left: eyebrow */}
        <motion.div
          className="hidden md:block"
          style={{
            position: "absolute",
            top: "clamp(5.5rem,9vw,7.5rem)",
            left: "clamp(2rem,5vw,5rem)",
            zIndex: 2,
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <p
            className="font-body uppercase"
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.36em",
              color: "rgba(138,158,133,0.85)",
            }}
          >
            Selves &amp; Spaces · Mental Health Ecosystem
          </p>
        </motion.div>

        {/* Bottom-center scroll CTA */}
        <motion.div
          className="hidden md:flex"
          style={{
            position: "absolute",
            bottom: "clamp(2rem,4vw,3rem)",
            left: 0,
            right: 0,
            zIndex: 2,
            flexDirection: "column",
            alignItems: "center",
            gap: "0.6rem",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        >
          <span
            className="font-body uppercase"
            style={{ fontSize: "0.72rem", letterSpacing: "0.38em", color: "#C4956A" }}
          >
            Scroll to learn more
          </span>
          <motion.svg
            width="30" height="30" viewBox="0 0 24 24" fill="none"
            stroke="#C4956A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
        </motion.div>
      </section>

      {/* ══ 1b. HERO CONTENT ══ */}
      <section
        style={{
          background: "#202B1F",
          position: "relative",
          overflow: "hidden",
          paddingTop: "clamp(3.5rem,6vw,5.5rem)",
          paddingBottom: "clamp(3.5rem,6vw,5.5rem)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-140px",
            right: "-80px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(196,149,106,0.10) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: GRAIN,
            backgroundSize: "180px",
            opacity: 0.14,
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        />

        <div style={{ ...wrap, position: "relative", zIndex: 2 }}>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-end"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            <div>
              <motion.h2
                variants={fadeUp}
                className="font-display italic"
                style={{
                  fontSize: "clamp(1.6rem,3vw,2.6rem)",
                  lineHeight: 1.14,
                  color: "#F5F0E8",
                  maxWidth: "22ch",
                  marginBottom: "1.75rem",
                }}
              >
                "The quality of a system is revealed by how it{" "}
                <em style={{ color: "#C4956A", fontStyle: "normal" }}>holds</em>{" "}
                human emotion."
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="font-body font-light"
                style={{
                  fontSize: "clamp(1rem,1.4vw,1.12rem)",
                  color: "rgba(245,240,232,0.60)",
                  maxWidth: "52ch",
                  marginBottom: "1.75rem",
                  lineHeight: 1.7,
                }}
              >
                A measurable mental health ecosystem for schools and workplaces.
              </motion.p>
              <motion.div
                variants={fadeUp}
                style={{
                  borderLeft: "3px solid #C4956A",
                  paddingLeft: "1.25rem",
                  maxWidth: "52ch",
                }}
              >
                <p
                  className="font-body font-light"
                  style={{
                    fontSize: "0.98rem",
                    color: "rgba(245,240,232,0.78)",
                    lineHeight: 1.72,
                  }}
                >
                  Every quarter, your school receives a wellbeing report that
                  shows what students are struggling with, where support is
                  needed, and whether your mental health initiatives are
                  actually making a difference.
                </p>
              </motion.div>
            </div>

            <motion.div
              variants={fadeUp}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                flexShrink: 0,
              }}
            >
              <Link
                to="/contact"
                className="font-body font-light inline-flex items-center justify-center gap-2"
                style={{
                  fontSize: "0.78rem",
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  background: "#C4956A",
                  color: "#1C1C1A",
                  padding: "0.95rem 1.7rem",
                  textDecoration: "none",
                  transition: "background 0.22s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#B8895E")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#C4956A")
                }
              >
                Schedule a conversation <ArrowRight size={14} />
              </Link>
              <a
                href="#how-we-work"
                className="font-body font-light text-center"
                style={{
                  fontSize: "0.78rem",
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  color: "rgba(196,149,106,0.82)",
                  border: "1.5px solid rgba(196,149,106,0.38)",
                  padding: "0.9rem 1.7rem",
                  textDecoration: "none",
                  transition: "all 0.22s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#C4956A";
                  e.currentTarget.style.borderColor = "#C4956A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(196,149,106,0.82)";
                  e.currentTarget.style.borderColor = "rgba(196,149,106,0.38)";
                }}
              >
                See how the system works
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══ 2. QUESTIONS ══ */}
      <section
        style={{
          background: "#F5F0E8",
          position: "relative",
          overflow: "hidden",
          paddingBlock: "clamp(4rem,8vw,7.5rem)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(44,59,45,0.14) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.3,
            pointerEvents: "none",
          }}
        />

        <div style={{ ...wrap, position: "relative" }}>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            <Eyebrow>What is actually being asked</Eyebrow>
            <motion.h2
              variants={fadeUp}
              className="font-display"
              style={{
                fontSize: "clamp(1.85rem,3.3vw,2.85rem)",
                maxWidth: "20ch",
                marginBottom: "3rem",
                color: "#1C1C1A",
                lineHeight: 1.12,
                letterSpacing: "-0.018em",
              }}
            >
              The question every institution leader is really asking
            </motion.h2>

            <motion.div
              variants={staggerFast}
              className="grid grid-cols-1 sm:grid-cols-3"
              style={{ gap: "1.25rem", marginBottom: "3rem" }}
            >
              {QUESTIONS.map((q, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 16px 40px rgba(28,28,26,0.09)",
                  }}
                  transition={{ duration: 0.28 }}
                  style={{
                    background: "rgba(255,255,255,0.65)",
                    padding: "2.1rem 1.9rem 2.3rem",
                    borderRadius: "2px",
                    borderTop: "2px solid #C4956A",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.35rem",
                    cursor: "default",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="30"
                    height="30"
                    stroke="#8A9E85"
                    strokeWidth="1.4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={q.path} />
                  </svg>
                  <p
                    className="font-display"
                    style={{
                      fontSize: "1.18rem",
                      lineHeight: 1.45,
                      color: "#1C1C1A",
                    }}
                  >
                    {q.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="font-body font-light"
              style={{
                borderTop: "1px solid rgba(28,28,26,0.12)",
                paddingTop: "2rem",
                fontSize: "1.05rem",
                maxWidth: "66ch",
                color: "rgba(28,28,26,0.62)",
                lineHeight: 1.72,
              }}
            >
              These questions are not about wellness activities. They are about
              whether the system is able to{" "}
              <strong style={{ color: "#1C1C1A", fontWeight: 500 }}>
                recognise, hold and respond
              </strong>{" "}
              to human experience.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ══ 3. USP / REPORT CARD ══ */}
      <section
        style={{
          background: "#1E0F07",
          position: "relative",
          overflow: "hidden",
          paddingBlock: "clamp(4rem,8vw,7.5rem)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: GRAIN,
            backgroundSize: "200px",
            opacity: 0.16,
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-80px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,240,232,0.08) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "-40px",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(196,149,106,0.18) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ ...wrap, position: "relative" }}>
          <div
            className="grid grid-cols-1 md:grid-cols-[0.95fr_1.05fr]"
            style={{ gap: "clamp(2.5rem,5vw,5rem)", alignItems: "start" }}
          >
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
            >
              <Eyebrow color="rgba(245,240,232,0.55)">Our difference</Eyebrow>
              <motion.h2
                variants={fadeUp}
                className="font-display"
                style={{
                  fontSize: "clamp(2rem,3.6vw,3.1rem)",
                  maxWidth: "14ch",
                  marginBottom: "1.6rem",
                  color: "#F5F0E8",
                  lineHeight: 1.08,
                  letterSpacing: "-0.018em",
                }}
              >
                From wellness activities to wellbeing{" "}
                <em
                  style={{
                    fontStyle: "italic",
                    color: "#F5F0E8",
                    opacity: 0.7,
                  }}
                >
                  evidence
                </em>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="font-body font-light"
                style={{
                  color: "rgba(245,240,232,0.7)",
                  marginBottom: "1.4rem",
                  lineHeight: 1.72,
                  maxWidth: "52ch",
                }}
              >
                Most institutions can list what they have done. Very few can say
                what changed. A day of activities leaves behind photographs —
                nothing a principal can take to a board meeting.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="font-body font-light"
                style={{
                  color: "rgba(245,240,232,0.7)",
                  marginBottom: "1.4rem",
                  lineHeight: 1.72,
                  maxWidth: "52ch",
                }}
              >
                The School Mental Health Index measures every student, every
                term. It turns a year of scattered observations into something a
                school can read, act on and be held to.
              </motion.p>
              <motion.div
                variants={fadeUp}
                style={{
                  borderLeft: "3px solid rgba(245,240,232,0.35)",
                  paddingLeft: "1.3rem",
                  marginTop: "2.2rem",
                  maxWidth: "38ch",
                }}
              >
                <p
                  className="font-display italic"
                  style={{
                    fontSize: "clamp(1.2rem,2vw,1.5rem)",
                    lineHeight: 1.42,
                    color: "rgba(245,240,232,0.88)",
                  }}
                >
                  Schools move from reacting to isolated incidents to
                  understanding patterns across the whole school.
                </p>
              </motion.div>
            </motion.div>

            {/* Report card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: "#F5F0E8",
                border: "1px solid rgba(28,28,26,0.12)",
                borderTop: "5px solid #C4956A",
                borderRadius: "2px",
                padding: "2rem 2rem 1.5rem",
                boxShadow: "0 30px 70px -46px rgba(196,149,106,0.45)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  gap: "1rem",
                  paddingBottom: "1.15rem",
                  borderBottom: "1px solid rgba(28,28,26,0.12)",
                  marginBottom: "0.35rem",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <p
                    className="font-display"
                    style={{
                      fontSize: "1.12rem",
                      lineHeight: 1.3,
                      maxWidth: "18ch",
                      color: "#1C1C1A",
                    }}
                  >
                    School Mental Health Index
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      gap: "3px",
                      height: "26px",
                      marginTop: "0.5rem",
                    }}
                    aria-hidden="true"
                  >
                    {SPARKLINE.map((h, i) => (
                      <div
                        key={i}
                        style={{
                          width: "5px",
                          background: [2, 6].includes(i)
                            ? "#C4956A"
                            : "#8A9E85",
                          borderRadius: "1px",
                          height: `${h}%`,
                          opacity: [2, 6].includes(i) ? 0.85 : 0.45,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <span
                  className="font-body font-light"
                  style={{
                    fontSize: "0.68rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#8A9E85",
                    whiteSpace: "nowrap",
                  }}
                >
                  Term Report
                </span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {REPORT_LINES.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "0.9rem",
                      padding: "0.9rem 0",
                      borderBottom:
                        i < REPORT_LINES.length - 1
                          ? "1px solid rgba(28,28,26,0.08)"
                          : "none",
                    }}
                  >
                    <span
                      style={{
                        width: "7px",
                        height: "7px",
                        background: "#C4956A",
                        flexShrink: 0,
                        transform: "translateY(-1px)",
                        display: "inline-block",
                      }}
                    />
                    <span
                      className="font-body"
                      style={{
                        fontWeight: 500,
                        fontSize: "0.9rem",
                        flex: 1,
                        color: "#1C1C1A",
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="font-body font-light"
                      style={{
                        fontSize: "0.78rem",
                        color: "rgba(28,28,26,0.5)",
                        textAlign: "right",
                        maxWidth: "16ch",
                        lineHeight: 1.4,
                      }}
                    >
                      {item.meta}
                    </span>
                  </li>
                ))}
              </ul>
              <p
                className="font-body font-light"
                style={{
                  borderTop: "1px solid rgba(28,28,26,0.10)",
                  marginTop: "0.35rem",
                  paddingTop: "0.9rem",
                  fontSize: "0.76rem",
                  color: "rgba(28,28,26,0.48)",
                }}
              >
                Issued every quarter to the principal and management, in a
                format built for your annual wellbeing report.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ 4. ECOSYSTEMS ══ */}
      <section
        style={{
          background: "#F5F0E8",
          position: "relative",
          overflow: "hidden",
          paddingBlock: "clamp(4rem,8vw,7.5rem)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: GRAIN,
            backgroundSize: "200px",
            opacity: 0.08,
            mixBlendMode: "multiply",
            pointerEvents: "none",
          }}
        />

        <div style={{ ...wrap, position: "relative" }}>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            <Eyebrow>Our ecosystems</Eyebrow>
            <motion.div
              variants={staggerFast}
              className="grid grid-cols-1 md:grid-cols-2"
              style={{ gap: "1.5rem" }}
            >
              {ECOSYSTEMS.map((eco, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: "#EDE8DF",
                    padding: "2.6rem 2.2rem 2.4rem",
                    borderRadius: "2px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span
                    className="font-body"
                    style={{
                      fontSize: "0.66rem",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#C4956A",
                      marginBottom: "1rem",
                    }}
                  >
                    {eco.tag}
                  </span>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "clamp(1.5rem,2.4vw,1.95rem)",
                      marginBottom: "1.1rem",
                      color: "#1C1C1A",
                      lineHeight: 1.12,
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {eco.title}
                  </h3>
                  <p
                    className="font-body font-light"
                    style={{
                      fontSize: "1rem",
                      color: "rgba(28,28,26,0.62)",
                      marginBottom: "1.8rem",
                      lineHeight: 1.65,
                      maxWidth: "44ch",
                    }}
                  >
                    {eco.body}
                  </p>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: "0 0 2.2rem",
                      flex: 1,
                    }}
                  >
                    {eco.items.map((item, j) => (
                      <li
                        key={j}
                        className="font-body font-light"
                        style={{
                          padding: "0.72rem 0",
                          borderTop: "1px solid rgba(28,28,26,0.12)",
                          fontSize: "0.95rem",
                          display: "flex",
                          gap: "0.8rem",
                          alignItems: "baseline",
                          color: "#1C1C1A",
                        }}
                      >
                        <span
                          style={{
                            width: "5px",
                            height: "5px",
                            background: "#8A9E85",
                            flexShrink: 0,
                            transform: "translateY(-2px)",
                            display: "inline-block",
                            borderRadius: "50%",
                          }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="font-body font-light inline-flex items-center gap-2"
                    style={{
                      alignSelf: "flex-start",
                      fontSize: "0.74rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#C4956A",
                      border: "1.5px solid rgba(196,149,106,0.4)",
                      padding: "0.72rem 1.3rem",
                      textDecoration: "none",
                      transition: "all 0.22s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#C4956A";
                      e.currentTarget.style.background =
                        "rgba(196,149,106,0.06)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(196,149,106,0.4)";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    Talk to us <ArrowRight size={12} />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══ 5. IMPACT ══ */}
      <section
        style={{
          background: "#2C3B2D",
          position: "relative",
          overflow: "hidden",
          paddingBlock: "clamp(4rem,8vw,7.5rem)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: GRAIN,
            backgroundSize: "160px",
            opacity: 0.16,
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-60px",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(196,149,106,0.13) 0%, transparent 55%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ ...wrap, position: "relative" }}>
          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: "clamp(2.5rem,5vw,5rem)", alignItems: "center" }}
          >
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Eyebrow color="rgba(245,240,232,0.45)">Why this matters</Eyebrow>
              <motion.blockquote
                variants={fadeUp}
                className="font-display italic"
                style={{
                  maxWidth: "34ch",
                  fontSize: "clamp(1.5rem,2.9vw,2.35rem)",
                  lineHeight: 1.32,
                  fontWeight: 300,
                  color: "#F5F0E8",
                  letterSpacing: "-0.018em",
                }}
              >
                "Noticing early is not a soft skill. It is the whole
                intervention."
              </motion.blockquote>
            </motion.div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.p
                variants={fadeUp}
                className="font-body font-light"
                style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.72,
                  color: "rgba(245,240,232,0.8)",
                  marginBottom: "1.1rem",
                }}
              >
                When a school notices a child early, a family receives support
                before a crisis. When a workplace notices burnout early, a
                person receives support before they withdraw.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="font-body font-light"
                style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.72,
                  color: "rgba(245,240,232,0.8)",
                }}
              >
                By the time someone finally asks for help, the strain has
                usually been building for months. This work is built for those
                months — the long, quiet stretch where almost nothing is done,
                and almost everything could be.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="font-body font-light"
                style={{
                  marginTop: "1.6rem",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(245,240,232,0.42)",
                }}
              >
                Selves &amp; Spaces · 8,000+ sessions delivered
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ 7. WHY ══ */}
      <section
        style={{
          background: "#F5F0E8",
          position: "relative",
          overflow: "hidden",
          paddingBlock: "clamp(4rem,8vw,7.5rem)",
        }}
      >
        <div style={{ ...wrap, position: "relative" }}>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            <Eyebrow>Why institutions choose us</Eyebrow>
            <motion.div
              variants={staggerFast}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              style={{ gap: "2.4rem 2.6rem" }}
            >
              {WHY.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  style={{
                    display: "flex",
                    gap: "1.1rem",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      color: "#C4956A",
                      flexShrink: 0,
                      marginTop: "0.15rem",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="26"
                      height="26"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={item.d} />
                    </svg>
                  </div>
                  <div>
                    <h3
                      className="font-display"
                      style={{
                        fontSize: "1.08rem",
                        fontWeight: 500,
                        marginBottom: "0.3rem",
                        color: "#1C1C1A",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="font-body font-light"
                      style={{
                        fontSize: "0.93rem",
                        color: "rgba(28,28,26,0.58)",
                        lineHeight: 1.62,
                      }}
                    >
                      {item.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══ 8. CTA ══ */}
      <section
        style={{
          background: "#1E0F07",
          position: "relative",
          overflow: "hidden",
          paddingBlock: "clamp(4rem,8vw,7rem)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: GRAIN,
            backgroundSize: "180px",
            opacity: 0.22,
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 50%, rgba(196,149,106,0.18) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ ...wrap, position: "relative" }}>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              variants={fadeUp}
              className="font-display"
              style={{
                fontSize: "clamp(1.9rem,3.9vw,3.2rem)",
                maxWidth: "19ch",
                marginBottom: "1.6rem",
                lineHeight: 1.14,
                color: "#F5F0E8",
                letterSpacing: "-0.018em",
              }}
            >
              Every classroom has a nervous system. Every workplace has an
              emotional climate.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="font-body font-light"
              style={{
                fontSize: "1.1rem",
                color: "rgba(245,240,232,0.7)",
                maxWidth: "46ch",
                marginBottom: "2.4rem",
                lineHeight: 1.65,
              }}
            >
              Let's build systems that notice people before they reach a point
              of crisis.
            </motion.p>
            <motion.div
              variants={fadeUp}
              style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem" }}
            >
              <Link
                to="/contact"
                className="font-body font-light inline-flex items-center gap-2"
                style={{
                  fontSize: "0.78rem",
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  background: "#F5F0E8",
                  color: "#1C1C1A",
                  padding: "0.95rem 1.7rem",
                  textDecoration: "none",
                  transition: "all 0.22s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#C4956A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#F5F0E8";
                }}
              >
                Talk to us <ArrowRight size={14} />
              </Link>
              <Link
                to="/our-work"
                className="font-body font-light inline-flex items-center gap-2"
                style={{
                  fontSize: "0.78rem",
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  color: "rgba(245,240,232,0.65)",
                  border: "1.5px solid rgba(245,240,232,0.2)",
                  padding: "0.9rem 1.7rem",
                  textDecoration: "none",
                  transition: "all 0.22s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#F5F0E8";
                  e.currentTarget.style.borderColor = "rgba(245,240,232,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(245,240,232,0.65)";
                  e.currentTarget.style.borderColor = "rgba(245,240,232,0.2)";
                }}
              >
                See our resources
              </Link>
            </motion.div>
            <motion.div
              variants={fadeUp}
              style={{
                marginTop: "2.4rem",
                paddingTop: "1.8rem",
                borderTop: "1px solid rgba(245,240,232,0.12)",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.6rem 2.5rem",
              }}
            >
              <a
                href="mailto:hello@selvesandspaces.com"
                className="font-body font-light"
                style={{
                  fontSize: "0.93rem",
                  color: "rgba(245,240,232,0.65)",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(245,240,232,0.25)",
                  paddingBottom: "1px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#F5F0E8";
                  e.currentTarget.style.borderBottomColor =
                    "rgba(245,240,232,0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(245,240,232,0.65)";
                  e.currentTarget.style.borderBottomColor =
                    "rgba(245,240,232,0.25)";
                }}
              >
                hello@selvesandspaces.com
              </a>
              <span
                className="font-body font-light"
                style={{ fontSize: "0.93rem", color: "rgba(245,240,232,0.65)" }}
              >
                Chennai, Tamil Nadu
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
