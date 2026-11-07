import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDialog } from "../hooks/useDialog";

const SEEN_KEY = "ss_first_visit_prompt_seen";

const hasSeenPrompt = () => {
  try {
    return localStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
};

const markPromptSeen = () => {
  try {
    localStorage.setItem(SEEN_KEY, "1");
  } catch {
    // storage unavailable (private mode) — the prompt may show again, which is acceptable
  }
};

export default function FirstVisitPopup() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (hasSeenPrompt()) return;
    // Small delay so the page renders first
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    markPromptSeen();
    setVisible(false);
  };

  const dialogRef = useRef(null);
  useDialog(dialogRef, { active: visible, onEscape: dismiss });

  const handleYes = () => {
    markPromptSeen();
    setVisible(false);
    navigate("/first-visit");
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center"
      style={{ background: "rgba(28,28,26,0.60)", backdropFilter: "blur(8px)" }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="First visit"
        tabIndex={-1}
        className="relative mx-4 flex flex-col items-center text-center overflow-hidden"
        style={{
          background: "#F5F0E8",
          maxWidth: "440px",
          width: "100%",
          padding: "52px 44px 44px",
          boxShadow: "0 32px 80px rgba(0,0,0,0.28)",
        }}
      >
        {/* Decorative top bar */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{ height: "3px", background: "linear-gradient(90deg, #323b10, #C4956A, #6B56A8)" }}
        />

        {/* Leaf mark */}
        <div
          className="flex items-center justify-center mb-6"
          style={{
            width: "44px",
            height: "44px",
            border: "1px solid rgba(44,59,45,0.18)",
            background: "rgba(50,59,16,0.06)",
          }}
        >
          <span style={{ fontSize: "18px", color: "#323b10" }}>✦</span>
        </div>

        <p
          className="font-body uppercase mb-3"
          style={{ fontSize: "9px", letterSpacing: "0.38em", color: "#8A9E85" }}
        >
          Welcome
        </p>

        <h2
          className="font-display italic leading-[0.92] mb-4"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", color: "#1C1C1A" }}
        >
          Is this your first time here?
        </h2>

        <p
          className="font-body font-light mb-10"
          style={{ fontSize: "13.5px", color: "rgba(28,28,26,0.52)", lineHeight: 1.8, maxWidth: "320px" }}
        >
          We have a short guide for first-time visitors — it explains what to expect and how we can help.
        </p>

        <div className="flex flex-col gap-3 w-full">
          <button
            className="w-full font-body text-xs uppercase tracking-[0.24em] py-4 transition-all duration-300"
            style={{ background: "#323b10", color: "#F5F0E8" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#4a5618")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#323b10")}
            onClick={handleYes}
          >
            Yes, show me the guide →
          </button>

          <button
            className="w-full font-body text-xs uppercase tracking-[0.24em] py-4 transition-all duration-300"
            style={{
              background: "transparent",
              color: "rgba(28,28,26,0.46)",
              border: "1px solid rgba(28,28,26,0.14)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(28,28,26,0.32)";
              e.currentTarget.style.color = "#1C1C1A";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(28,28,26,0.14)";
              e.currentTarget.style.color = "rgba(28,28,26,0.46)";
            }}
            onClick={dismiss}
          >
            No, I know my way around
          </button>
        </div>
      </div>
    </div>
  );
}
