import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const team = [
  {
    id: 1,
    name: "Kanagalakshmi P",
    title: "Senior Clinical Psychologist, Psychotherapist & Founder",
    tags: ["Clinical Psychologist", "Psychotherapist", "Supervisor", "Founder"],
    years: 12,
    rating: "4.9",
    bio: "I'm Ms. Kanaga Lakshmi, a Clinical Psychologist and Psychotherapist, with years of experience helping children, adolescents, and families navigate their emotional challenges.",
    fullContent: [
      "I'm Ms. Kanaga Lakshmi, a Clinical Psychologist and Psychotherapist, with years of experience helping children, adolescents, and families navigate their emotional challenges.",
      "I hold an MA in Human Resources, an MA in Applied Psychology (Clinical specialization) from TISS, and an MPhil in Clinical Psychology from IMH. I'm also a licensed professional with the Rehabilitation Council of India (RCI) and specialize in trauma-focused care. In addition to my clinical training, I hold a Diploma in Transactional Analysis and Psychodynamic Psychotherapy and I specialize in child and adolescent psychotherapy. Currently, I'm deepening my approach by training in Somatic Experiencing to better support my clients' healing journeys.",
      'As a single mother and a caregiver for a parent with mental illness, my personal experiences have profoundly shaped how I approach mental health. I understand the importance of safety, support, and community in the healing process. This journey inspired me to create Selves and Spaces, a mental health clinic where every part of the "self" is acknowledged, embraced, and empowered. This is more than just a clinic — it\'s a space where people can feel seen, understood, and supported on their emotional journey.',
      "My therapeutic approach is relational and systems-oriented, which means I focus on understanding the dynamics of relationships and the broader contexts in which individuals live. I work to create a space where clients can explore and heal through the connections they have with others and the systems that shape their lives. My approach is deeply rooted in both my professional training and lived experience. I believe in the power of understanding trauma and its long-term impact, and I bring that empathy into every interaction.",
      "I also offer training for parents, teachers, and corporate groups on topics like well-being, sexual abuse prevention, and procrastination. Supporting mothers during pregnancy and the post-pregnancy period is also close to my heart. I run a group specifically for expectant mothers, offering a safe space for them to share, heal, and connect.",
      "I have also had the privilege of serving as a Senior Mentor at Nishta Neurodev Centre and heading the Yaavarum project, an NGO dedicated to improving school mental health. Through these experiences, I've worked to create safe and nurturing environments for emotional growth, both within schools and the wider community. My passion for inclusivity extends into my volunteer work at the Madhuram Narayanan Centre, where I support children with special needs.",
      "I am also the creator of Magic Manasu, a bilingual activity book for government school children of Tamilnadu that reflects my holistic approach to mental health and well-being. Through everything I do, my mission is to build a community where mental health care is not just a service, but a shared experience that fosters healing, connection, and growth for all.",
    ],
    img: "teamImages/Kanaga.jpeg",
  },
  {
    id: 2,
    name: "Ms. Radhika",
    title: "External Supervisor",
    tags: ["Supervisor", "Relational", "Queer Affirmative"],
    bio: "I'm Radhika, an independently practicing Queer affirmative psychotherapist based in Bangalore.",
    fullContent: [
      "I'm Radhika, an independently practicing Queer affirmative psychotherapist based in Bangalore. I hold a Master's degree in Applied Psychology with a specialisation in Clinical Psychology from TISS BALM, Chennai, and have been practicing for six years. As a Supervisor, my goal is to create a safe and collaborative space where supervisees can reflect on their work with vulnerability and compassion. I believe in fostering an environment that encourages openness, growth, and mutual respect.",
    ],
    img: "teamImages/Radhika.jpeg",
  },
  {
    id: 3,
    name: "Dr. Poornima Viswanathan",
    title: "External Supervisor",
    tags: ["Supervisor", "Reflective Thinking", "Trauma Informed"],
    bio: "Dr. Poornima Viswanathan is a licensed clinical psychologist, researcher, and Assistant Professor at the Jindal School of Psychology and Counselling, OP Jindal Global University.",
    fullContent: [
      "Dr. Poornima Viswanathan is a licensed clinical psychologist, researcher, and Assistant Professor at the Jindal School of Psychology and Counselling, OP Jindal Global University.",
      "She completed her MPhil and PhD in Clinical Psychology from NIMHANS. She is the co-founder and Associate Director of Aagahi — Centre for Psychotherapy Research and Training, and the Centre for Neurodiversity Studies.",
      "Trained in psychodynamic, trauma-focused, somatic, and creative therapies, she adopts a person-centred, relational approach. Her work promotes inclusive, neurodiversity-affirming and trauma-informed care.",
      "She is passionate about mentoring future therapists through reflective, skill-building spaces. As a Supervisor, her goal is to create a safe and collaborative space where supervisees can reflect on their work with vulnerability and compassion, fostering an environment that encourages openness, growth, and mutual respect.",
    ],
    img: "teamImages/Poornima.jpeg",
  },
  {
    id: 4,
    name: "Ms. Anupama",
    title: "Clinical Psychologist & Psychotherapist",
    tags: ["Curious", "Perceptive", "Assuring"],
    bio: "Anupama is an RCI licensed Clinical Psychologist & Psychotherapist. She holds a Masters and an MPhil in Clinical Psychology from the Government Institute of Mental Health, Kilpauk.",
    fullContent: [
      "Anupama is an RCI licensed Clinical Psychologist & Psychotherapist. She holds a Masters and an MPhil in Clinical Psychology from the Government Institute of Mental Health, Kilpauk. In her therapeutic work she adopts a person-centered, relational approach thus viewing the therapeutic relationship as a key factor in helping clients navigate their emotional challenges.",
      "She also brings in aspects of Transactional Analysis to reflect on our favoured patterns of relating to ourselves, others and the world. She endeavours to create a therapeutic space that holds and explores varied aspects of the self with compassion.",
    ],
    img: "teamImages/Anupama.jpeg",
  },
  {
    id: 5,
    name: "Ms. Pavithra",
    title: "Psychotherapist",
    tags: ["Observant", "Inquisitive", "Reflective"],
    bio: "Pavithra is a Psychotherapist with a Master's degree in Clinical Psychology.At the core of her practice is a deeply held belief that individuals do not exist in isolation.",
    fullContent: [
      "Pavithra is a Psychotherapist with a Master's degree in Clinical Psychology. At the core of her practice is a deeply held belief that individuals do not exist in isolation. Our identities, beliefs, struggles, and strengths are constantly being shaped by the many systems and relationships around us, and she believes these cannot be set aside at the therapy door. They belong in the room too.",
      "With this in mind, she approaches therapy through a systemic and relational lens, paying close attention to how these interacting forces show up within a person and between the many different parts of who they are. She also draws from Transactional Analysis and is curious about the patterns and roles we inhabit, and how our inner world influences the way we move through and relate to ourselves and others.",
      "Through this approach, she brings a gentle, reflective presence to her sessions and values creating spaces that are non-judgmental, curious, and collaborative.",
    ],
    img: "teamImages/Pavithra.jpeg",
  },
  {
    id: 6,
    name: "Ms. Jannani M",
    title: "Psychotherapist",
    tags: ["Trauma Informed", "Relational", "Queer Affirmative"],
    bio: "Jannani M is a psychotherapist with over 2 years of experience with a Masters in Clinical Psychology. She enjoys gaming, reading, dry humour and lame jokes.",
    fullContent: [
      "Jannani M is a psychotherapist with over 2 years of experience with a Masters in Clinical Psychology. She has experience working with children, adolescents, adults and the queer population. Her work is trauma informed and grounded in a relational and systemic approach through a psychodynamic lens. She believes therapy is a collaborative process where regulation, distress tolerance and incorporating the body into the present play a role in healing.",
      "She enjoys gaming, reading, dry humour and lame jokes.",
    ],
    img: "teamImages/Jannani.jpeg",
  },
  {
    id: 7,
    name: "Ms. Abhirami",
    title: "Psychotherapist",
    tags: ["Trauma Informed", "Client-Centered", "Reflective"],
    bio: "Abhirami is a Psychotherapist with a Diploma in Counselling and Psychotherapy, and a Master's degree in Counselling Psychology.",
    fullContent: [
      "Abhirami is a Psychotherapist with a Diploma in Counselling and Psychotherapy, and a Master's degree in Counselling Psychology. With over two years of experience working with children and adults, her practice is trauma-informed and rooted in a relational approach, drawing from psychodynamic and narrative perspectives.",
      "Her work is grounded in curiosity, collaboration, and creating a space where clients can explore their experiences with compassion and authenticity. She also integrates attention to the body and the present moment as part of the therapeutic process.",
      "Outside of therapy, she enjoys spending time in nature, engaging with her cats, and admiring artistic creations.",
    ],
    img: "teamImages/Abhirami.jpeg",
  },
  {
    id: 8,
    name: "Ms. Sanjuthraa",
    title: "Psychotherapist",
    tags: ["Curious", "Warm", "Thoughtful"],
    bio: "Sanjuthraa is a Psychotherapist who believes that being human is messy and that our thoughts, emotions, relationships, and experiences are deeply intertwined.",
    fullContent: [
      "Sanjuthraa is a Psychotherapist who believes that being human is messy and that our thoughts, emotions, relationships, and experiences are deeply intertwined. She works with individuals and couples navigating anxiety, relationship challenges, self doubt, and life transitions, bringing a warm, relational, and reflective approach to her practice.",
      "With a deep curiosity about the patterns that shape us, she helps clients understand themselves and their relationships with greater awareness and self compassion. Her sessions are collaborative, thoughtful, and grounded in authentic conversation, creating space for honesty, reflection, and the occasional laugh because growth does not always have to feel heavy.",
      "Outside the therapy room, she is happiest with a good book, surrounded by pets, and is always ready to recommend both.",
    ],
    img: "teamImages/Sanjuratha.jpeg",
  },
  {
    id: 9,
    name: "Ms. Smruthi Peramaiyadass",
    title: "Clinical Psychologist (On Break)",
    tags: ["Clinical Psychology", "Psychodynamic", "Intersectional"],
    bio: "I’m Smruthi and I’m currently pursuing my MPhil in Clinical Psychology from Central Institute of Psychiatry, Ranchi.",
    fullContent: [
      "Hello! I’m Smruthi and I’m currently pursuing my MPhil in Clinical Psychology from Central Institute of Psychiatry, Ranchi.",

      "As a Psychotherapist, the core of my work adapts a Relational Psychodynamic framework. Here the major focus lies in the therapeutic alliance, experiential learning and the individual’s sense of self in relation to their social system. Our work within the therapy room involves being curious and looking at your experiences - not as isolated, but rather a combined reflection of both you and the broader world we live in. I will hence adopt a trauma informed stance which includes safe exploration and developing a pragmatic support system relative to your current context. ",

      "Well, on top of this, I’m also human first who is a sucker for all things sky, enjoys conversation with fellow humans and occasionally the sass of cats :))",
    ],
    img: "teamImages/Smruthi.jpeg",
  },
];

/* ── Nav controls (shared between mobile and desktop) ── */
function NavControls({ active, total, onPrev, onNext, onDot }) {
  return (
    <>
      <div className="flex items-center gap-5 mb-8">
        <button
          onClick={onPrev}
          className="flex items-center justify-center transition-all duration-300"
          style={{
            width: "48px",
            height: "48px",
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
        <button
          onClick={onNext}
          className="flex items-center justify-center transition-all duration-300"
          style={{
            width: "48px",
            height: "48px",
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
      <div className="flex gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onDot(i)}
            style={{
              width: i === active ? "52px" : "20px",
              height: "2px",
              background: i === active ? "#C4956A" : "rgba(28,28,26,0.2)",
              transition: "all 0.4s ease",
            }}
          />
        ))}
      </div>
    </>
  );
}

export default function TeamCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (paused || expanded) return;
    const t = setInterval(() => setActive((p) => (p + 1) % team.length), 4000);
    return () => clearInterval(t);
  }, [paused, expanded]);

  const current = team[active];

  const goPrev = () => {
    setPaused(true);
    setActive((p) => (p - 1 + team.length) % team.length);
  };
  const goNext = () => {
    setPaused(true);
    setActive((p) => (p + 1) % team.length);
  };
  const goDot = (i) => {
    setActive(i);
    setPaused(true);
  };

  return (
    <section
      className="w-full min-h-screen overflow-hidden"
      style={{ background: "#F5F0E8", position: "relative", zIndex: 0 }}
    >
      {!expanded ? (
        <>
          {/* ══ MOBILE LAYOUT (below md) ══ */}
          <div className="flex flex-col md:hidden">
            {/* Header — olive green */}
            <div
              className="relative flex flex-col justify-end px-8 pb-10 overflow-hidden"
              style={{ background: "#323b10", paddingTop: "120px" }}
            >
              <div
                className="absolute -top-20 -left-20 w-56 h-56 rounded-full pointer-events-none"
                style={{ border: "1px solid rgba(245,240,232,0.06)" }}
              />
              <p
                className="font-body uppercase mb-6"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.3em",
                  color: "#8A9E85",
                }}
              >
                Our People
              </p>
              <div style={{ lineHeight: 0.88 }}>
                <span
                  className="font-display block"
                  style={{
                    fontSize: "clamp(4rem, 18vw, 6rem)",
                    color: "#F5F0E8",
                  }}
                >
                  Meet
                </span>
                <span
                  className="font-display italic block"
                  style={{
                    fontSize: "clamp(4rem, 18vw, 6rem)",
                    color: "#C4956A",
                  }}
                >
                  Our
                </span>
                <span
                  className="font-display block"
                  style={{
                    fontSize: "clamp(4rem, 18vw, 6rem)",
                    color: "#F5F0E8",
                  }}
                >
                  Team
                </span>
              </div>
            </div>

            {/* Photo */}
            <div
              className="relative"
              style={{ height: "400px", overflow: "hidden" }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={current.img}
                  alt={current.name}
                  className="w-full h-full object-cover object-top"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)",
                }}
              />
              <button
                onClick={() => setExpanded(true)}
                className="absolute bottom-5 left-6 font-body uppercase px-4 py-2"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.25em",
                  background: "rgba(245,240,232,0.92)",
                  color: "#2C3B2D",
                }}
              >
                View Profile →
              </button>
            </div>

            {/* Info panel */}
            <div
              className="flex flex-col px-6 py-10"
              style={{ background: "#F5F0E8" }}
            >
              <div className="flex items-baseline gap-2 mb-4">
                <span
                  className="font-display"
                  style={{ fontSize: "40px", color: "#1C1C1A", lineHeight: 1 }}
                >
                  {String(active + 1).padStart(2, "0")}
                </span>
                <span
                  className="font-body"
                  style={{
                    fontSize: "13px",
                    color: "rgba(28,28,26,0.3)",
                    letterSpacing: "0.1em",
                  }}
                >
                  / {String(team.length).padStart(2, "0")}
                </span>
              </div>

              <div style={{ minHeight: "280px" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2
                      className="font-display mb-2"
                      style={{
                        fontSize: "clamp(2rem, 8vw, 2.8rem)",
                        color: "#1C1C1A",
                        lineHeight: 0.95,
                      }}
                    >
                      {current.name}
                    </h2>
                    {current.words && (
                      <p
                        className="font-body italic mb-4"
                        style={{
                          fontSize: "12px",
                          color: "#8A9E85",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {current.words}
                      </p>
                    )}
                    <div className="flex gap-2 flex-wrap mb-6">
                      {current.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-body uppercase"
                          style={{
                            fontSize: "9px",
                            letterSpacing: "0.2em",
                            padding: "6px 12px",
                            border: "1px solid rgba(28,28,26,0.15)",
                            color: "#1C1C1A",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p
                      className="font-body font-light mb-8"
                      style={{
                        fontSize: "15px",
                        color: "rgba(28,28,26,0.6)",
                        lineHeight: 1.9,
                      }}
                    >
                      {current.bio}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <NavControls
                active={active}
                total={team.length}
                onPrev={goPrev}
                onNext={goNext}
                onDot={goDot}
              />
            </div>
          </div>

          {/* ══ DESKTOP LAYOUT (md+) ══ */}
          <div
            className="hidden md:grid min-h-screen"
            style={{ gridTemplateColumns: "0.6fr 580px 0.8fr" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* LEFT PANEL */}
            <div
              className="relative flex flex-col justify-center px-14 py-20 overflow-hidden"
              style={{ background: "#323b10" }}
            >
              <div
                className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full pointer-events-none"
                style={{ border: "1px solid rgba(245,240,232,0.06)" }}
              />
              <div
                className="absolute -bottom-20 -right-20 w-[280px] h-[280px] rounded-full pointer-events-none"
                style={{ border: "1px solid rgba(245,240,232,0.06)" }}
              />
              <div>
                <p
                  className="font-body uppercase mb-10"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.3em",
                    color: "#8A9E85",
                  }}
                >
                  Our People
                </p>
                <div style={{ lineHeight: 0.88 }}>
                  <div
                    className="font-display block text-center"
                    style={{
                      fontSize: "clamp(4.5rem, 7vw, 7rem)",
                      color: "#F5F0E8",
                    }}
                  >
                    Meet
                  </div>
                  <div
                    className="font-display italic block text-center"
                    style={{
                      fontSize: "clamp(4.5rem, 7vw, 7rem)",
                      color: "#C4956A",
                    }}
                  >
                    Our
                  </div>
                  <div
                    className="font-display block text-center"
                    style={{
                      fontSize: "clamp(4.5rem, 7vw, 7rem)",
                      color: "#F5F0E8",
                    }}
                  >
                    Team
                  </div>
                </div>
              </div>
            </div>

            {/* CENTER — photo card */}
            <div
              className="relative flex items-center justify-center"
              style={{ background: "#EDE8DF" }}
            >
              <div
                className="relative overflow-hidden cursor-pointer"
                style={{
                  width: "380px",
                  height: "600px",
                  boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
                }}
                onClick={() => setExpanded(true)}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={active}
                    src={current.img}
                    alt={current.name}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.38) 0%, transparent 55%)",
                  }}
                />
                <div
                  className="absolute bottom-5 left-0 right-0 flex items-center justify-center"
                  style={{ zIndex: 2 }}
                >
                  <span
                    className="font-body uppercase px-4 py-2"
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.25em",
                      background: "rgba(245,240,232,0.9)",
                      color: "#2C3B2D",
                    }}
                  >
                    View Profile
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="flex flex-col justify-center px-16 py-20">
              <div className="flex items-baseline gap-2 mb-10">
                <span
                  className="font-display"
                  style={{ fontSize: "56px", color: "#1C1C1A", lineHeight: 1 }}
                >
                  {String(active + 1).padStart(2, "0")}
                </span>
                <span
                  className="font-body"
                  style={{
                    fontSize: "13px",
                    color: "rgba(28,28,26,0.3)",
                    letterSpacing: "0.1em",
                  }}
                >
                  / {String(team.length).padStart(2, "0")}
                </span>
              </div>

              <div style={{ minHeight: "320px" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <h2
                      className="font-display mb-2"
                      style={{
                        fontSize: "clamp(2.8rem, 4vw, 4rem)",
                        color: "#1C1C1A",
                        lineHeight: 0.95,
                      }}
                    >
                      {current.name}
                    </h2>
                    {current.words && (
                      <p
                        className="font-body italic mb-6"
                        style={{
                          fontSize: "12px",
                          color: "#8A9E85",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {current.words}
                      </p>
                    )}

                    <div className="flex gap-2 flex-wrap mb-10">
                      {current.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-body uppercase"
                          style={{
                            fontSize: "9px",
                            letterSpacing: "0.2em",
                            padding: "7px 14px",
                            border: "1px solid rgba(28,28,26,0.15)",
                            color: "#1C1C1A",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p
                      className="leading-relaxed mb-12"
                      style={{
                        fontSize: "17px",
                        color: "rgba(28,28,26,0.6)",
                        lineHeight: 1.9,
                      }}
                    >
                      {current.bio}{" "}
                      <span className="italic">
                        {" Click view profile to learn more."}
                      </span>
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-5 mb-10">
                <button
                  onClick={goPrev}
                  className="flex items-center justify-center transition-all duration-300"
                  style={{
                    width: "52px",
                    height: "52px",
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
                <button
                  onClick={goNext}
                  className="flex items-center justify-center transition-all duration-300"
                  style={{
                    width: "52px",
                    height: "52px",
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

              <div className="flex gap-2">
                {team.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goDot(i)}
                    style={{
                      width: i === active ? "52px" : "20px",
                      height: "2px",
                      background:
                        i === active ? "#C4956A" : "rgba(28,28,26,0.2)",
                      transition: "all 0.4s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        /* ── EXPANDED PROFILE ── */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col"
          style={{ height: "100vh", background: "#F5F0E8" }}
        >
          {/* HEADER — back button, tags, name (non-scrolling) */}
          <div
            className="px-6 md:px-20 pt-24 md:pt-20 pb-6 md:pb-8"
            style={{ flexShrink: 0 }}
          >
            <button
              onClick={() => setExpanded(false)}
              className="flex items-center gap-2 font-body uppercase mb-6 transition-colors duration-300"
              style={{
                fontSize: "10px",
                letterSpacing: "0.25em",
                color: "rgba(28,28,26,0.4)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1C1C1A")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(28,28,26,0.4)")
              }
            >
              ← Back to Team
            </button>

            <div className="flex gap-3 flex-wrap mb-5">
              {current.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-body uppercase"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.22em",
                    padding: "7px 16px",
                    border: "1px solid rgba(28,28,26,0.2)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h2
              className="font-display leading-none"
              style={{ fontSize: "clamp(2.8rem, 6vw, 7rem)" }}
            >
              <em className="italic" style={{ color: "#8A9E85" }}>
                {current.name.split(" ")[0]}{" "}
              </em>
              <span style={{ color: "#1C1C1A" }}>
                {current.name.split(" ").slice(1).join(" ")}
              </span>
            </h2>
          </div>

          {/* BODY — image left (fixed) + content right (scrollable) */}
          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{
              flex: 1,
              overflow: "hidden",
              background: "rgba(138,158,133,0.12)",
            }}
          >
            {/* Image — desktop left column, portrait card centered on background */}
            <div
              className="hidden md:flex items-center justify-center"
              style={{ height: "100%", background: "#EDE8DF", padding: "2rem" }}
            >
              <div
                style={{
                  width: "300px",
                  height: "100%",
                  maxHeight: "520px",
                  overflow: "hidden",
                  boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
                  flexShrink: 0,
                }}
              >
                <img
                  src={current.img}
                  alt={current.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Content — scrollable right column */}
            <div
              className="p-6 md:p-12"
              style={{ overflowY: "auto", height: "100%" }}
            >
              {/* Mobile-only image at top of scroll area */}
              <div
                className="md:hidden mb-8 overflow-hidden"
                style={{ height: "280px" }}
              >
                <img
                  src={current.img}
                  alt={current.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {current.fullContent.map((para, i) => (
                <p
                  key={i}
                  className="font-body font-light"
                  style={{
                    fontSize: "15px",
                    color: "rgba(28,28,26,0.65)",
                    lineHeight: 1.9,
                    marginBottom:
                      i < current.fullContent.length - 1 ? "20px" : "36px",
                  }}
                >
                  {para}
                </p>
              ))}

              <button
                className="font-body uppercase transition-colors duration-300"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.25em",
                  background: "#2C3B2D",
                  color: "#F5F0E8",
                  padding: "16px 32px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#C4956A")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#2C3B2D")
                }
              >
                Book a Session →
              </button>

              {current.years && (
                <div
                  className="flex gap-10 md:gap-16 pt-10 mt-10"
                  style={{ borderTop: "1px solid rgba(28,28,26,0.1)" }}
                >
                  <div>
                    <div
                      className="font-display"
                      style={{
                        fontSize: "clamp(2rem, 5vw, 3.5rem)",
                        color: "#1C1C1A",
                        lineHeight: 1,
                      }}
                    >
                      {current.years}
                    </div>
                    <div
                      className="font-body uppercase mt-2"
                      style={{
                        fontSize: "9px",
                        letterSpacing: "0.2em",
                        color: "rgba(28,28,26,0.4)",
                      }}
                    >
                      Years in practice
                    </div>
                  </div>
                  <div>
                    <div
                      className="font-display"
                      style={{
                        fontSize: "clamp(2rem, 5vw, 3.5rem)",
                        color: "#1C1C1A",
                        lineHeight: 1,
                      }}
                    >
                      {current.rating}
                    </div>
                    <div
                      className="font-body uppercase mt-2"
                      style={{
                        fontSize: "9px",
                        letterSpacing: "0.2em",
                        color: "rgba(28,28,26,0.4)",
                      }}
                    >
                      Average rating
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
