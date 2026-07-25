import { useState, useEffect, useRef } from "react";

const services = [
  {
    id: 1,
    title: "Individual Psychotherapy",
    tagline: "A space that is entirely yours.",
    desc: "Our individual therapy sessions are rooted in understanding your unique patterns and needs. Through a relational, person-centred approach, we explore personal thoughts, emotions, and behaviours — creating space for insight, emotional healing, and a more balanced, fulfilling life.",
    icon: "◎",
    accent: "#2C3B2D",
    iconBg: "rgba(44,59,45,0.10)",
  },
  {
    id: 2,
    title: "Group Psychotherapy",
    tagline: "Healing in the presence of others.",
    desc: "Relational group psychotherapy focuses on interpersonal dynamics within a group setting, where members explore their relationships with others. By observing and interacting, individuals gain insight into their own relational patterns — practising new ways of relating in a supported, therapeutic environment.",
    icon: "⬡",
    accent: "#C4956A",
    iconBg: "rgba(196,149,106,0.12)",
  },
  {
    id: 3,
    title: "Body Sessions",
    tagline: "Listening to what the body holds.",
    desc: "Body sessions integrate somatic awareness into the therapeutic process, supporting clients in understanding the connection between physical experience and emotional wellbeing. Through gentle attention to breath, sensation, and bodily presence, we explore what the body holds and what it needs to move toward healing.",
    icon: "◈",
    accent: "#8A9E85",
    iconBg: "rgba(138,158,133,0.15)",
  },
  {
    id: 4,
    title: "Support Group",
    tagline: "Community in shared experience.",
    desc: "A support group provides a safe space for individuals facing similar challenges to come together and share their experiences. It fosters a sense of community, reducing feelings of isolation. Typically facilitated by a professional, these groups help individuals feel empowered and less alone in their journey.",
    icon: "✦",
    accent: "#6B56A8",
    iconBg: "rgba(107,86,168,0.12)",
  },
  {
    id: 5,
    title: "Parent Sessions",
    tagline: "Supporting the whole family.",
    desc: "Parent sessions support and enable the young person in their therapeutic journey. We provide a space for parents to express their worries, understand their child's challenges, and learn strategies to foster a nurturing, understanding environment at home — aligning family and therapist toward shared healing.",
    icon: "◉",
    accent: "#2C3B2D",
    iconBg: "rgba(44,59,45,0.10)",
  },
  {
    id: 6,
    title: "Diagnosis & Assessment",
    tagline: "Understanding through clarity.",
    desc: "Assessment gathers information through clinical interviews, psychological tests, and observations to evaluate cognitive, emotional, and behavioural patterns. Diagnosis provides formal identification of mental health conditions based on DSM-5 or ICD-11 criteria, guiding effective treatment planning and interventions.",
    icon: "◌",
    accent: "#C4956A",
    iconBg: "rgba(196,149,106,0.12)",
  },
  {
    id: 7,
    title: "Our Mental Health Programs",
    tagline: "Care that reaches communities.",
    desc: "Our structured mental health programs are designed to support specific populations and communities. From school-based interventions to specialised group formats, these programs bring evidence-informed care to spaces where it is needed most — building capacity for healing within communities, not just individuals.",
    icon: "◇",
    accent: "#8A9E85",
    iconBg: "rgba(138,158,133,0.15)",
  },
];

// Unique blob paths — organic, no two alike
const blobPaths = [
  "M50,5 C68,0 90,10 95,30 C100,50 92,76 74,88 C56,100 28,98 12,82 C-4,66 0,38 12,20 C22,5 38,8 50,5Z",
  "M52,8 C72,2 94,16 98,38 C102,60 86,84 64,92 C42,100 14,88 6,66 C-2,44 10,18 30,10 C40,5 38,12 52,8Z",
  "M48,4 C70,-2 96,12 98,36 C100,60 82,86 58,93 C34,100 6,84 1,60 C-4,36 10,10 32,5 C40,1 34,8 48,4Z",
  "M54,6 C76,0 98,14 100,38 C102,62 84,86 62,93 C40,100 12,88 4,64 C-4,40 8,14 30,7 C42,3 40,10 54,6Z",
  "M50,3 C74,-4 98,12 100,36 C102,60 84,88 60,95 C36,102 6,86 1,62 C-4,38 10,8 34,3 C44,-1 36,8 50,3Z",
  "M46,7 C68,0 92,14 96,36 C100,58 86,82 64,91 C42,100 14,90 6,68 C-2,46 8,20 28,10 C38,5 34,12 46,7Z",
  "M53,5 C75,-1 97,13 99,37 C101,61 83,85 61,93 C39,101 11,87 4,63 C-3,39 9,13 31,6 C43,2 39,9 53,5Z",
  "M49,6 C71,0 95,14 97,38 C99,62 81,86 59,93 C37,100 9,86 3,62 C-3,38 11,12 33,6 C43,2 37,10 49,6Z",
];

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  const current = services[active];

  const goTo = (index) => {
    if (animating || index === active) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(index);
      setAnimating(false);
    }, 300);
  };

  const goNext = () => goTo((active + 1) % services.length);
  const goPrev = () => goTo((active - 1 + services.length) % services.length);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(goNext, 4000);
    return () => clearInterval(intervalRef.current);
  }, [active, paused]);

  // Visible cards — active + 2 on each side
  const getCardState = (index) => {
    const total = services.length;
    const diff = (index - active + total) % total;
    const diffLeft = (active - index + total) % total;

    if (diff === 0) return "active";
    if (diff === 1) return "next1";
    if (diff === 2) return "next2";
    if (diffLeft === 1) return "prev1";
    if (diffLeft === 2) return "prev2";
    return "hidden";
  };

  const cardConfig = {
    active: { x: 0, scale: 1, opacity: 1, z: 50, size: 300 },
    next1: { x: 240, scale: 0.82, opacity: 0.7, z: 40, size: 300 },
    next2: { x: 420, scale: 0.66, opacity: 0.35, z: 30, size: 300 },
    prev1: { x: -240, scale: 0.82, opacity: 0.7, z: 40, size: 300 },
    prev2: { x: -420, scale: 0.66, opacity: 0.35, z: 30, size: 300 },
    hidden: { x: 0, scale: 0.5, opacity: 0, z: 10, size: 300 },
  };

  return (
    <section
      className="min-h-screen relative overflow-hidden"
      style={{ background: "#F5F0E8" }}
    >
      {/* Grain */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.15]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      {/* Background shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute -top-24 -left-24 opacity-[0.07]"
          width="480"
          height="480"
          viewBox="0 0 480 480"
        >
          <path
            d="M240,30 C340,20 440,100 450,220 C460,340 380,440 260,455 C140,470 30,400 15,280 C0,160 60,50 180,32 C204,28 222,32 240,30Z"
            fill="#2C3B2D"
          />
        </svg>
        <svg
          className="absolute -top-10 -right-10 opacity-[0.06]"
          width="380"
          height="380"
          viewBox="0 0 380 380"
        >
          <circle cx="190" cy="190" r="190" fill="#8A9E85" />
        </svg>
        <svg
          className="absolute bottom-0 left-0 opacity-[0.06]"
          width="420"
          height="380"
          viewBox="0 0 420 380"
        >
          <path
            d="M40,60 C120,5 270,0 360,65 C450,130 465,275 395,360 C325,440 155,455 65,375 C-20,300 -25,120 40,60Z"
            fill="#C4956A"
          />
        </svg>
        <svg
          className="absolute top-1/3 -right-6 opacity-[0.05]"
          width="140"
          height="300"
          viewBox="0 0 140 300"
        >
          <rect x="0" y="0" width="140" height="300" rx="70" fill="#2C3B2D" />
        </svg>
        <svg
          className="absolute bottom-1/3 left-1/4 opacity-[0.04]"
          width="180"
          height="180"
          viewBox="0 0 180 180"
        >
          <circle
            cx="90"
            cy="90"
            r="80"
            fill="none"
            stroke="#8A9E85"
            strokeWidth="14"
          />
        </svg>
      </div>

      <div className="relative z-10 px-6 md:px-16 pt-32 pb-20 flex flex-col min-h-screen">
        {/* ── Hero header ── */}
        <div className="max-w-6xl mx-auto w-full mb-16">
          <p
            className="font-body uppercase mb-5"
            style={{
              fontSize: "9px",
              letterSpacing: "0.38em",
              color: "#8A9E85",
            }}
          >
            Selves & Spaces — Our Services
          </p>
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-20">
            <h1
              className="font-display leading-none shrink-0"
              style={{ fontSize: "clamp(3.5rem, 7vw, 7rem)", color: "#1C1C1A" }}
            >
              How we
              <br />
              <em className="italic" style={{ color: "#2C3B2D" }}>
                show up.
              </em>
            </h1>
            <p
              className="font-body font-light pb-2"
              style={{
                fontSize: "14px",
                color: "rgba(28,28,26,0.5)",
                lineHeight: 1.9,
                maxWidth: "400px",
              }}
            >
              Every offering is shaped around the belief that healing is not
              linear. Find what feels right for you — or let's figure it out
              together.
            </p>
          </div>
        </div>

        {/* ── Carousel ── */}
        <div
          className="flex-1 flex flex-col items-center justify-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Blob carousel stage */}
          <div
            className="relative flex items-center justify-center"
            style={{ width: "100%", height: "360px" }}
          >
            {services.map((service, index) => {
              const state = getCardState(index);
              const cfg = cardConfig[state];
              if (state === "hidden") return null;

              const isActive = state === "active";
              const blob = blobPaths[index % blobPaths.length];

              return (
                <div
                  key={service.id}
                  className="absolute cursor-pointer"
                  style={{
                    width: `${cfg.size}px`,
                    height: `${cfg.size}px`,
                    transform: `translateX(${cfg.x}px) scale(${cfg.scale})`,
                    opacity: cfg.opacity,
                    zIndex: cfg.z,
                    transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onClick={() => (isActive ? null : goTo(index))}
                >
                  {/* Blob SVG */}
                  <svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full"
                    style={{
                      filter: isActive
                        ? `drop-shadow(0 24px 48px rgba(44,59,45,0.18))`
                        : `drop-shadow(0 8px 20px rgba(28,28,26,0.08))`,
                    }}
                  >
                    <path
                      d={blob}
                      fill={isActive ? service.accent : "#FFFFFF"}
                      style={{ transition: "fill 0.5s ease" }}
                    />
                  </svg>

                  {/* Card content */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
                    style={{
                      opacity: animating ? 0 : 1,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    {/* Icon */}
                    <div
                      className="w-11 h-11 flex items-center justify-center mb-4 text-lg"
                      style={{
                        background: isActive
                          ? "rgba(255,255,255,0.18)"
                          : service.iconBg,
                        color: isActive ? "#F5F0E8" : service.accent,
                        transition: "all 0.5s ease",
                      }}
                    >
                      {service.icon}
                    </div>

                    {/* Title */}
                    <h3
                      className="font-display mb-2"
                      style={{
                        fontSize: "1.1rem",
                        lineHeight: 1.2,
                        color: isActive ? "#F5F0E8" : "#1C1C1A",
                        transition: "color 0.5s ease",
                      }}
                    >
                      {service.title}
                    </h3>

                    {/* Tagline */}
                    <p
                      className="font-body font-light"
                      style={{
                        fontSize: "11px",
                        lineHeight: 1.65,
                        color: isActive
                          ? "rgba(245,240,232,0.75)"
                          : "rgba(28,28,26,0.45)",
                        maxWidth: "170px",
                        transition: "color 0.5s ease",
                      }}
                    >
                      {service.tagline}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Detail strip — below carousel ── */}
          <div
            className="w-full max-w-2xl mx-auto mt-10 px-8 py-8 text-center"
            style={{
              opacity: animating ? 0 : 1,
              transition: "opacity 0.3s ease",
            }}
          >
            <p
              className="font-body font-light mb-6"
              style={{
                fontSize: "14px",
                color: "rgba(28,28,26,0.55)",
                lineHeight: 1.9,
              }}
            >
              {current.desc}
            </p>

            <a
              href="/contact"
              className="inline-block font-body uppercase px-10 py-4 transition-all duration-300"
              style={{
                fontSize: "9px",
                letterSpacing: "0.3em",
                background: current.accent,
                color: "#F5F0E8",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Book {current.title} →
            </a>
          </div>

          {/* ── Controls ── */}
          <div className="flex items-center gap-8 mt-10">
            <button
              onClick={goPrev}
              className="w-12 h-12 flex items-center justify-center transition-all duration-300"
              style={{
                border: "1px solid rgba(28,28,26,0.15)",
                color: "#1C1C1A",
                fontSize: "18px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#2C3B2D";
                e.currentTarget.style.color = "#F5F0E8";
                e.currentTarget.style.borderColor = "#2C3B2D";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#1C1C1A";
                e.currentTarget.style.borderColor = "rgba(28,28,26,0.15)";
              }}
            >
              ←
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="transition-all duration-400"
                  style={{
                    height: "2px",
                    width: i === active ? "36px" : "14px",
                    background: i === active ? "#2C3B2D" : "rgba(28,28,26,0.2)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className="w-12 h-12 flex items-center justify-center transition-all duration-300"
              style={{
                border: "1px solid rgba(28,28,26,0.15)",
                color: "#1C1C1A",
                fontSize: "18px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#2C3B2D";
                e.currentTarget.style.color = "#F5F0E8";
                e.currentTarget.style.borderColor = "#2C3B2D";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#1C1C1A";
                e.currentTarget.style.borderColor = "rgba(28,28,26,0.15)";
              }}
            >
              →
            </button>
          </div>

          {/* Counter */}
          <p
            className="font-body mt-5"
            style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
              color: "rgba(28,28,26,0.25)",
            }}
          >
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(services.length).padStart(2, "0")}
          </p>
        </div>

        {/* ── Bottom CTA ── */}
        <div
          className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-10 mt-8"
          style={{ borderTop: "1px solid rgba(28,28,26,0.08)" }}
        >
          <p
            className="font-display italic"
            style={{ fontSize: "1.3rem", color: "rgba(28,28,26,0.3)" }}
          >
            Not sure where to start?
          </p>

          <a
            href="/contact"
            className="font-body uppercase px-10 py-4 transition-all duration-300"
            style={{
              fontSize: "9px",
              letterSpacing: "0.3em",
              background: "#2C3B2D",
              color: "#F5F0E8",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#8A9E85")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#2C3B2D")}
          >
            Let's Talk First →
          </a>
        </div>
      </div>
    </section>
  );
}
