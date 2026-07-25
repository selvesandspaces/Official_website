import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────
   BLOG DATA — add / edit posts here
───────────────────────────────────────────────────────────── */
const blogPosts = [
  {
    id: 1,
    category: "Relationships",
    title: "The Language We Never Learned: Attachment in Adult Love",
    excerpt:
      "Most of us enter relationships carrying scripts written in childhood — unspoken rules about closeness, need, and safety. Understanding attachment isn't about labelling yourself; it's about reading the story you've been telling without knowing it.",
    body: `<p>Every relationship is, in some sense, a continuation of the first ones we ever had. Long before we could articulate what we needed from another person, we were learning — through eye contact, through being held, through the quality of silence in a room — what closeness felt like and whether it was safe.</p>

<p>John Bowlby, who first mapped the terrain of attachment theory, described this as the foundation of all later emotional life. What he couldn't fully anticipate was how powerfully these early templates would shape the way two adults sit across a dinner table, lie awake beside each other, or fight about something that isn't really about the dishes.</p>

<h3>The three patterns most of us know</h3>

<p>Secure attachment — the one we all hope for — develops when caregivers are consistently responsive. Not perfect, but reliably present. The child learns: <em>I can need things. People come back. The world is mostly safe.</em></p>

<p>Anxious attachment forms when care is inconsistent. Sometimes warmth, sometimes withdrawal. The child's nervous system learns to stay vigilant, to scan for signs of abandonment, to protest loudly rather than risk being overlooked.</p>

<p>Avoidant attachment is the child's solution to a caregiver who found emotional need overwhelming. The child learns to self-soothe, to minimise, to be fiercely independent — because dependence has always cost something.</p>

<h3>What this looks like in a partnership</h3>

<p>An anxiously attached person and an avoidantly attached person often find each other. This is not cosmic cruelty — it's pattern recognition. Each person's behaviour confirms the other's deepest fear. The more one pursues, the more the other withdraws. The more one withdraws, the more the other pursues. The dance is exhausting and, often, deeply familiar to both.</p>

<p>Understanding the pattern doesn't dissolve it overnight. But it does something quietly radical: it moves the conversation from <em>you always do this</em> to <em>I notice that when I do this, something in me is trying to stay safe.</em> That shift — from accusation to curiosity — is where repair becomes possible.</p>`,
    date: "14 Apr 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1200&q=80",
    accent: "#C4956A",
  },
  {
    id: 2,
    category: "Self-care",
    title: "Rest Is Not a Reward: On Unlearning Productivity Guilt",
    excerpt:
      "There is a particular kind of exhaustion that comes not from doing too much, but from believing that stopping is a moral failure. Learning to rest — truly rest — requires dismantling an identity built around busyness.",
    body: `<p>Somewhere along the way, many of us absorbed a belief so thoroughly it no longer feels like a belief — it feels like fact: rest must be earned. You work, and then, if you've worked enough, you may stop. Stopping before that point is laziness. Laziness is shameful. Therefore: keep going.</p>

<p>This is not a personal failing. It is the water most of us were raised in — a culture that conflates worth with output, rest with weakness, and stillness with falling behind.</p>

<h3>The nervous system doesn't negotiate</h3>

<p>The body does not care about your productivity metrics. It operates on older rhythms — rhythms of exertion and recovery that predate capitalism, deadlines, and the particular anxiety of leaving an email unread overnight.</p>

<p>When we override these rhythms consistently, we don't become more productive. We become more fragile. The research on sleep deprivation, chronic stress, and burnout tells a consistent story: the nervous system in a state of sustained activation has diminishing capacity for the things we most value — creativity, connection, clear judgement, warmth.</p>

<h3>What real rest requires</h3>

<p>Rest is not the absence of activity. For some people, a walk in the evening is genuinely restorative; for others, it is just guilt about not running. The question worth asking is not <em>what should I do to relax</em> but <em>what actually refills me</em> — and whether I can let myself have it without negotiation.</p>

<p>This is, quietly, a values question. To choose rest is to choose yourself over an imagined audience watching to see how hard you try. That is not laziness. It is one of the harder choices a person can make.</p>`,
    date: "28 Mar 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80",
    accent: "#6B56A8",
  },
  {
    id: 3,
    category: "Grief",
    title: "Grief That Has No Name: Mourning What Was Never There",
    excerpt:
      "Not all grief follows a loss of something real. Some of the deepest mourning is for what never existed — the parent who wasn't present, the childhood that wasn't safe, the version of your life that might have been.",
    body: `<p>The grief we know how to talk about has an object. A person. A relationship. A job, a place, a particular chapter of life that closed. We have rituals for this kind of grief — funerals, anniversaries, the social permission to cry at certain moments and in certain company.</p>

<p>But there is another grief with no ceremony, no clear beginning, and often no name. It is the mourning of what never was. The father who was physically present but emotionally absent. The childhood home that didn't feel safe. The version of yourself that might have emerged if things had been different.</p>

<h3>Why this grief is harder</h3>

<p>Mourning an absence is disorienting because there is nothing to point to. When someone says <em>I'm grieving my mother</em>, the world understands. When someone says <em>I'm grieving the mother I never had</em>, even they may not fully believe they have the right.</p>

<p>This grief can surface at unexpected moments — at a friend's wedding, watching a parent hold their child tenderly, in a therapy session when something finally cracks open. It often arrives mixed with anger, confusion, and a deep ambivalence: how do you mourn a person who is still alive? How do you grieve something that never happened?</p>

<h3>Making space for it</h3>

<p>The first thing this grief needs is permission. Permission to be real, to count, to be named. The second thing it needs is patience — because unlike grief with a clear event horizon, this kind tends to spiral and return and deepen in layers over years.</p>

<p>What it eventually opens into, for many people, is a more honest and sometimes more tender relationship with themselves. The child who didn't get what they needed deserves the compassion we might more naturally extend to others. Grief, in this form, can become a form of self-recognition.</p>`,
    date: "10 Mar 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1474376788614-a83cb14e34d4?w=1200&q=80",
    accent: "#8A9E85",
  },
  {
    id: 4,
    category: "Body & Mind",
    title: "The Body Keeps the Score — and It Also Keeps the Story",
    excerpt:
      "Somatic therapy works from a deceptively simple premise: the body is not a passive vessel for the mind's experiences. It holds, processes, and communicates — and sometimes it is further ahead in healing than we know.",
    body: `<p>Most of us were taught, explicitly or implicitly, to manage our emotions by managing our thoughts. Feel anxious? Reframe the thought. Feel sad? Find perspective. The mind, in this model, is the site of change, and the body is along for the ride.</p>

<p>Somatic approaches begin from a different premise: the body is not downstream of the mind. Thought, emotion, and physical sensation form a continuous loop, and sometimes the loop can only be interrupted at the body's level — not through insight, but through sensation, movement, and breath.</p>

<h3>What trauma does to the body</h3>

<p>Peter Levine, who developed Somatic Experiencing, observed that animals in the wild regularly face life-threatening situations and then — after the threat passes — shake, tremble, and return to normal function. Humans, he noticed, often interrupt this process. We hold ourselves still. We suppress the shake. We carry the incomplete discharge forward in time.</p>

<p>The result is a nervous system that remains, in some sense, stuck in the event — not consciously, but physiologically. The startle response stays elevated. The shoulders stay raised. The breath stays shallow. The body is still braced against something that happened years ago.</p>

<h3>What working somatically looks like</h3>

<p>Somatic work is not about dramatic catharsis. It tends to be slower, subtler, and more curious than that. A therapist might invite you to notice where in your body you feel something, what that sensation is like, whether it wants to move or expand or settle.</p>

<p>This kind of attention — slow, non-judgmental, embodied — is unfamiliar for many people. And that unfamiliarity is itself information: how little practice most of us have had simply inhabiting ourselves.</p>`,
    date: "22 Feb 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80",
    accent: "#C4956A",
  },
  {
    id: 5,
    category: "Parenting",
    title: "Good Enough: Winnicott and the Gift of the Imperfect Parent",
    excerpt:
      "The psychoanalyst D.W. Winnicott coined a phrase that quietly revolutionised how we think about raising children: the 'good enough' mother. The goal, he argued, is not perfection — it is repair.",
    body: `<p>D.W. Winnicott, the paediatrician turned psychoanalyst who spent decades watching mothers and babies together, made an observation that sounds simple and is anything but: the perfectly responsive parent would actually harm the child.</p>

<p>What children need, Winnicott argued, is not a mother (or father, or caregiver) who anticipates and meets every need before the child feels it. They need someone who is <em>good enough</em> — someone who gets it right most of the time, fails sometimes, and crucially, repairs the failure.</p>

<h3>Why imperfection matters</h3>

<p>The gradual experience of small frustrations — waiting a moment for hunger to be met, being misunderstood and then understood — is precisely what builds the child's capacity to tolerate discomfort, to trust that difficulty doesn't last, to develop a self that can function in an imperfect world.</p>

<p>A child whose every discomfort is immediately erased never develops these capacities. They also never learn, in their bones, that rupture and repair is a normal rhythm of relationship — that the relationship survives the failure, and so do they.</p>

<h3>What this means for parents today</h3>

<p>In a culture saturated with parenting content — every anxiety catalogued, every developmental stage benchmarked — Winnicott's idea is quietly radical. It gives parents permission to be human. To lose patience, to get it wrong, to apologise and try again.</p>

<p>The research on what makes a secure attachment is consistent with this: it is not the absence of rupture. It is the consistency of repair. What your child will remember, and internalise, is not your perfection. It is your willingness to return.</p>`,
    date: "8 Feb 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=1200&q=80",
    accent: "#6B56A8",
  },
  {
    id: 6,
    category: "Self-care",
    title: "On Sitting with Discomfort: A Practical Guide to Not Running Away",
    excerpt:
      "Avoidance is one of the most effective short-term strategies a nervous system can employ. It is also, over time, one of the most costly. The capacity to sit with discomfort — not to dissolve it, but to be with it — is one of the most quietly transformative skills in therapy.",
    body: `<p>The brain is remarkably good at protecting us from pain. Its toolkit includes distraction, minimisation, rationalisation, and — its most reliable instrument — avoidance. If something hurts, don't go near it. If a thought is unbearable, don't think it. If a feeling is too large, stay busy.</p>

<p>This strategy works in the short term. The discomfort recedes. But avoidance has a peculiar feature: it also charges interest. The thing we avoid tends to grow in our estimation of it. The conversation we postpone becomes more frightening. The emotion we won't feel becomes more urgent.</p>

<h3>The paradox of acceptance</h3>

<p>Acceptance and Commitment Therapy, among other approaches, has documented what many traditions knew intuitively: the attempt to suppress or avoid an experience often amplifies it. The instruction <em>do not think of a white bear</em> produces, reliably, a white bear.</p>

<p>The alternative is not to like the discomfort or to agree that it is fine. It is something more modest: to allow it to be present, to observe it without immediately acting on it, to discover that it is survivable.</p>

<h3>Building the capacity slowly</h3>

<p>This is not something that happens by deciding to be braver. It is a capacity built incrementally — often in therapy, but also in small daily practices of staying present with what is uncomfortable for just a little longer than you otherwise would.</p>

<p>The goal is not to become someone who doesn't feel discomfort. It is to become someone who knows, in their body and not just their mind, that they can feel it and remain intact. That knowledge changes everything about how you move through a difficult life.</p>`,
    date: "25 Jan 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=80",
    accent: "#8A9E85",
  },
];

const CATEGORIES = ["All", "Relationships", "Self-care", "Grief", "Body & Mind", "Parenting"];

/* ─────────────────────────────────────────────────────────────
   MODAL COMPONENT
───────────────────────────────────────────────────────────── */
function BlogModal({ post, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-stretch"
      style={{ background: "rgba(28,28,26,0.82)", backdropFilter: "blur(12px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative m-auto flex w-full max-w-5xl overflow-hidden"
        style={{
          maxHeight: "90vh",
          background: "#EDEAE4",
          boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 flex items-center justify-center transition-all duration-200"
          style={{
            width: "36px",
            height: "36px",
            border: "1px solid rgba(28,28,26,0.18)",
            color: "rgba(28,28,26,0.5)",
            fontSize: "18px",
            background: "#EDEAE4",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = post.accent;
            e.currentTarget.style.color = post.accent;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(28,28,26,0.18)";
            e.currentTarget.style.color = "rgba(28,28,26,0.5)";
          }}
        >
          ×
        </button>

        {/* Left — article content */}
        <div className="flex-1 overflow-y-auto px-10 py-12 md:px-14" style={{ maxWidth: "55%", background: "#F5F0E8" }}>
          {/* Meta */}
          <div className="flex items-center gap-3 mb-6">
            <span
              className="font-body uppercase text-[10px] tracking-[0.32em] px-3 py-1"
              style={{ background: post.accent + "18", color: post.accent }}
            >
              {post.category}
            </span>
            <span className="font-body text-[11px]" style={{ color: "rgba(28,28,26,0.38)" }}>
              {post.date} · {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h2
            className="font-display italic leading-[0.9] mb-8"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#1C1C1A" }}
          >
            {post.title}
          </h2>

          {/* Divider */}
          <div className="mb-8" style={{ height: "1px", background: post.accent + "40" }} />

          {/* Body */}
          <div
            className="font-body font-light leading-[1.95] prose-article"
            style={{ fontSize: "14.5px", color: "rgba(28,28,26,0.72)" }}
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          {/* CTA */}
          <div className="mt-10 pt-8" style={{ borderTop: "1px solid rgba(28,28,26,0.08)" }}>
            <p className="font-body text-xs mb-4" style={{ color: "rgba(28,28,26,0.38)", letterSpacing: "0.06em" }}>
              This piece resonated with you?
            </p>
            <a
              href="/contact"
              className="font-body inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] px-6 py-3.5 transition-colors duration-300"
              style={{ background: post.accent, color: "#F5F0E8" }}
            >
              Book a conversation →
            </a>
          </div>
        </div>

        {/* Right — image */}
        <div className="hidden md:block relative" style={{ width: "45%", minHeight: "500px" }}>
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${post.accent}22 0%, transparent 60%)`,
            }}
          />
          {/* Post number badge */}
          <div
            className="absolute top-6 left-6 font-display italic"
            style={{
              fontSize: "5rem",
              lineHeight: 1,
              color: "rgba(245,240,232,0.18)",
            }}
          >
            {String(post.id).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* Inline prose styles */}
      <style>{`
        .prose-article h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem;
          font-style: italic;
          color: #1C1C1A;
          margin: 1.8rem 0 0.8rem;
        }
        .prose-article p {
          margin-bottom: 1.2rem;
        }
        .prose-article em {
          font-style: italic;
          color: rgba(28,28,26,0.88);
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CAROUSEL CARD
───────────────────────────────────────────────────────────── */
function BlogCard({ post, isActive, onClick, onReadMore }) {
  return (
    <article
      className="shrink-0 flex flex-col overflow-hidden cursor-pointer transition-all duration-300 group"
      style={{
        width: "280px",
        background: isActive ? "#F5F0E8" : "#E4E0D9",
        border: `1.5px solid ${isActive ? post.accent : "rgba(28,28,26,0.10)"}`,
        boxShadow: isActive
          ? `0 8px 32px ${post.accent}28`
          : "0 1px 6px rgba(28,28,26,0.06)",
      }}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: "160px" }}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, transparent 50%, rgba(28,28,26,0.45) 100%)`,
          }}
        />
        <span
          className="absolute top-3 left-3 font-body uppercase text-[9px] tracking-[0.3em] px-2.5 py-1"
          style={{ background: post.accent, color: "#F5F0E8" }}
        >
          {post.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3
          className="font-display italic leading-[1.1] mb-3 flex-1"
          style={{ fontSize: "1.2rem", color: "#1C1C1A" }}
        >
          {post.title}
        </h3>
        <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: "1px solid rgba(28,28,26,0.10)" }}>
          <span className="font-body text-[10px]" style={{ color: "rgba(28,28,26,0.38)" }}>
            {post.date} · {post.readTime}
          </span>
          <button
            className="font-body text-[10px] uppercase tracking-[0.18em] transition-colors duration-200"
            style={{ color: post.accent }}
            onClick={(e) => { e.stopPropagation(); onReadMore(); }}
          >
            Read →
          </button>
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────────────────────── */
export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState(blogPosts[0]);
  const [modalPost, setModalPost] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);
  const heroRef = useRef(null);

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  const scrollToCard = useCallback((index) => {
    if (!carouselRef.current) return;
    const cards = carouselRef.current.querySelectorAll("article");
    if (!cards[index]) return;
    const card = cards[index];
    const container = carouselRef.current;
    const scrollTarget = card.offsetLeft - (container.offsetWidth - card.offsetWidth) / 2;
    container.scrollTo({ left: scrollTarget, behavior: "smooth" });
  }, []);

  const goToIndex = useCallback(
    (index) => {
      const i = ((index % filteredPosts.length) + filteredPosts.length) % filteredPosts.length;
      setActiveIndex(i);
      setSelectedPost(filteredPosts[i]);
      scrollToCard(i);
    },
    [filteredPosts, scrollToCard]
  );

  // Auto-rotate
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % filteredPosts.length;
        setSelectedPost(filteredPosts[next]);
        scrollToCard(next);
        return next;
      });
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [filteredPosts, scrollToCard]);

  const handleCardClick = (post, index) => {
    clearInterval(intervalRef.current);
    setSelectedPost(post);
    setActiveIndex(index);
    // Only update hero content — do NOT scroll the page
  };

  return (
    <>
      {/* ══ HERO — featured post ══ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-28 pb-16 px-5 md:px-10 lg:px-16"
        style={{
          background: "linear-gradient(160deg, #1e2408 0%, #323b10 45%, #3d4814 100%)",
        }}
      >
        {/* Grain */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.24]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px",
          }}
        />
        {/* Ambient accent glow — shifts per post */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-80px", right: "-60px",
            width: "520px", height: "520px", borderRadius: "50%",
            background: `radial-gradient(circle, ${selectedPost.accent}30 0%, transparent 65%)`,
            transition: "background 0.8s ease",
          }}
        />
        {/* Olive mid-glow bottom-left */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "-60px", left: "-80px",
            width: "440px", height: "440px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(74,86,24,0.45) 0%, transparent 65%)",
          }}
        />
        {/* Diagonal grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: "repeating-linear-gradient(135deg, rgba(245,240,232,0.9) 0px, rgba(245,240,232,0.9) 1px, transparent 1px, transparent 48px)",
          }}
        />

        <div className="relative z-10 max-w-[1280px] mx-auto">
          {/* Page label */}
          <div className="flex items-center gap-4 mb-12">
            <p className="font-body uppercase text-[9px] tracking-[0.42em]" style={{ color: "#8A9E85" }}>
              Selves & Spaces
            </p>
            <div className="h-px flex-1 max-w-[60px]" style={{ background: "rgba(138,158,133,0.3)" }} />
            <p className="font-body uppercase text-[9px] tracking-[0.42em]" style={{ color: "rgba(245,240,232,0.28)" }}>
              Journal
            </p>
          </div>

          {/* Hero split */}
          <div className="grid gap-10 md:gap-16 items-center" style={{ gridTemplateColumns: "1fr 1fr" }}>

            {/* Left — text */}
            <div>
              <span
                className="inline-block font-body uppercase text-[9px] tracking-[0.34em] px-3 py-1.5 mb-8 transition-all duration-500"
                style={{ background: selectedPost.accent + "28", color: selectedPost.accent, border: `1px solid ${selectedPost.accent}40` }}
              >
                {selectedPost.category}
              </span>

              <h1
                className="font-display italic leading-[0.88] mb-8 transition-all duration-300"
                style={{ fontSize: "clamp(2.4rem, 4.2vw, 4.8rem)", color: "#F5F0E8" }}
              >
                {selectedPost.title}
              </h1>

              <p
                className="font-body font-light leading-[1.9] mb-10"
                style={{ fontSize: "14.5px", color: "rgba(245,240,232,0.58)", maxWidth: "480px" }}
              >
                {selectedPost.excerpt}
              </p>

              <div className="flex items-center gap-5">
                <button
                  className="font-body text-xs uppercase tracking-[0.24em] px-7 py-4 transition-all duration-300"
                  style={{ background: selectedPost.accent, color: "#F5F0E8" }}
                  onClick={() => setModalPost(selectedPost)}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Read more →
                </button>
                <span className="font-body text-[10px]" style={{ color: "rgba(245,240,232,0.32)" }}>
                  {selectedPost.date} · {selectedPost.readTime}
                </span>
              </div>
            </div>

            {/* Right — image */}
            <div className="relative hidden md:block">
              {/* Ghost post number */}
              <span
                className="absolute -top-8 -left-4 font-display italic leading-none select-none pointer-events-none z-10"
                style={{ fontSize: "10rem", color: "rgba(245,240,232,0.05)", transition: "color 0.5s" }}
              >
                {String(selectedPost.id).padStart(2, "0")}
              </span>

              <div className="relative overflow-hidden" style={{ borderRadius: "2px" }}>
                <img
                  key={selectedPost.id}
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full object-cover"
                  style={{ height: "420px", display: "block" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${selectedPost.accent}28 0%, transparent 55%)`,
                    transition: "background 0.6s ease",
                  }}
                />
              </div>

              {/* Accent frame line */}
              <div
                className="absolute -bottom-2 -right-2 pointer-events-none transition-all duration-500"
                style={{
                  width: "60%",
                  height: "60%",
                  border: `1px solid ${selectedPost.accent}35`,
                  borderRadius: "2px",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Olive divider stripe */}
      <div style={{ height: "4px", background: "linear-gradient(90deg, #323b10, #4a5618, #323b10)" }} />

      {/* ══ CAROUSEL — all posts ══ */}
      <section
        className="relative overflow-hidden px-5 md:px-10 lg:px-16 py-14"
        style={{ background: "#EDEAE4" }}
      >
        {/* Dot grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.25]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(44,59,45,0.18) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative z-10 max-w-[1280px] mx-auto">

          {/* Category filter + section header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="font-body uppercase text-[9px] tracking-[0.38em] mb-3" style={{ color: "#8A9E85" }}>
                All writings
              </p>
              <h2
                className="font-display leading-none"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3.2rem)", color: "#1C1C1A" }}
              >
                Browse the<em className="italic ml-2" style={{ color: "#323b10" }}>journal.</em>
              </h2>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className="font-body text-[10px] uppercase tracking-[0.2em] px-4 py-2 transition-all duration-200"
                  style={{
                    background: activeCategory === cat ? "#323b10" : "#D6D2CB",
                    color: activeCategory === cat ? "#F5F0E8" : "rgba(28,28,26,0.52)",
                    border: `1px solid ${activeCategory === cat ? "#323b10" : "#C4BFB8"}`,
                  }}
                  onClick={() => {
                    setActiveCategory(cat);
                    setActiveIndex(0);
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards row */}
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filteredPosts.map((post, i) => (
              <BlogCard
                key={post.id}
                post={post}
                isActive={i === activeIndex}
                onClick={() => handleCardClick(post, i)}
                onReadMore={() => setModalPost(post)}
              />
            ))}
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-2 mt-6">
            {filteredPosts.map((_, i) => (
              <button
                key={i}
                className="transition-all duration-300"
                style={{
                  width: i === activeIndex ? "24px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  background:
                    i === activeIndex
                      ? filteredPosts[activeIndex]?.accent ?? "#C4956A"
                      : "#C4BFB8",
                }}
                onClick={() => goToIndex(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalPost && <BlogModal post={modalPost} onClose={() => setModalPost(null)} />}
    </>
  );
}
