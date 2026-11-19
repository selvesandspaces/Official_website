import { useRef } from "react";
import { useDialog } from "../hooks/useDialog";

const STAGES = {
  saving: "Saving your details…",
  starting: "Preparing your payment…",
  paying: "Waiting for payment…",
  confirming: "Confirming your order…",
};

// Full-screen block shown while an order is being placed, so nothing on the page can be clicked
// twice. Razorpay's own popup renders above it.
export default function PaymentOverlay({ stage }) {
  const ref = useRef(null);
  useDialog(ref);

  return (
    <div
      ref={ref}
      role="alertdialog"
      aria-modal="true"
      aria-busy="true"
      aria-label="Processing your order"
      tabIndex={-1}
      className="font-body"
      style={{
        position: "fixed",
        inset: 0,
        minHeight: "100dvh",
        zIndex: 100,
        background: "rgba(245,240,232,0.94)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        padding: "max(24px, env(safe-area-inset-top)) max(24px, env(safe-area-inset-right)) max(24px, env(safe-area-inset-bottom)) max(24px, env(safe-area-inset-left))",
        textAlign: "center",
        outline: "none",
      }}
    >
      <style>{`
        @keyframes ss-spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .ss-spinner { animation-duration: 3s !important; } }
      `}</style>
      <div
        className="ss-spinner"
        aria-hidden="true"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "2px solid rgba(44,59,45,0.15)",
          borderTopColor: "#2C3B2D",
          animation: "ss-spin 0.9s linear infinite",
        }}
      />
      <p role="status" className="font-display italic" style={{ fontSize: "clamp(1.25rem, 5vw, 1.6rem)", color: "#1C1C1A", lineHeight: 1.25 }}>
        {STAGES[stage] ?? "Please wait…"}
      </p>
      <p className="font-light" style={{ fontSize: "12.5px", color: "rgba(28,28,26,0.55)", maxWidth: "320px", lineHeight: 1.6 }}>
        Please don&rsquo;t close or refresh this page.
      </p>
    </div>
  );
}
