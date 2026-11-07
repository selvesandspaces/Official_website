import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { fetchOrder } from "../../services/shopApi";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

const DELIVERY_LABEL = {
  order_placed: "Order placed",
  in_transit: "On its way",
  delivered: "Delivered",
};

function Message({ text, linkTo, linkLabel }) {
  return (
    <div
      className="font-body"
      style={{
        minHeight: "100vh",
        background: "#F5F0E8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        padding: "0 24px",
        textAlign: "center",
      }}
    >
      <p className="font-display italic" style={{ fontSize: "1.6rem", color: "rgba(28,28,26,0.38)" }}>
        {text}
      </p>
      {linkTo && (
        <Link
          to={linkTo}
          className="font-body uppercase"
          style={{ fontSize: "10px", letterSpacing: "0.26em", color: "#2C3B2D", textDecoration: "none" }}
        >
          {linkLabel}
        </Link>
      )}
    </div>
  );
}

export default function OrderConfirmationSection() {
  const { orderId } = useParams();
  const location = useLocation();
  const { loading: authLoading, session } = useAuth();
  // The order from /checkout/verify is server data; a direct visit refetches it from /orders/:id.
  const [order, setOrder] = useState(location.state?.order ?? null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (order || authLoading || !session) return;
    let cancelled = false;
    fetchOrder(orderId)
      .then((o) => { if (!cancelled) setOrder(o); })
      .catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; };
  }, [orderId, order, authLoading, session]);

  if (authLoading) return <Message text="Loading your order…" />;
  if (!session) {
    return <Navigate to="/login" replace state={{ from: `/order-confirmation/${orderId}` }} />;
  }
  if (failed) return <Message text="We couldn’t find that order." linkTo="/shop" linkLabel="← Back to shop" />;
  if (!order) return <Message text="Loading your order…" />;

  const items = order.items;
  const shortId = order.id.slice(0, 8).toUpperCase();

  return (
    <main
      className="font-body flex items-center justify-center px-6"
      style={{
        background: "#F5F0E8",
        minHeight: "100vh",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
    >
      <motion.div
        className="flex flex-col items-center text-center"
        style={{ maxWidth: "460px", width: "100%" }}
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Animated checkmark */}
        <motion.div variants={fadeUp} className="mb-8">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.circle
              cx="40"
              cy="40"
              r="36"
              stroke="#2C3B2D"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.path
              d="M 23 40 L 35 53 L 57 27"
              stroke="#2C3B2D"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          className="font-body uppercase mb-3"
          style={{ fontSize: "9px", letterSpacing: "0.44em", color: "#8A9E85" }}
        >
          Order Confirmed
        </motion.p>

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          className="font-display italic mb-5"
          style={{
            fontSize: "clamp(3rem, 8vw, 5.5rem)",
            color: "#1C1C1A",
            lineHeight: 0.95,
          }}
        >
          Thank you.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          className="font-body font-light mb-7"
          style={{
            fontSize: "15px",
            lineHeight: 1.85,
            color: "rgba(28,28,26,0.52)",
            maxWidth: "340px",
          }}
        >
          Your payment was received and your order is placed. We\u2019ll be in touch about delivery.
        </motion.p>

        {/* Order number */}
        <motion.div
          variants={fadeUp}
          className="mb-2"
          style={{
            padding: "8px 20px",
            background: "rgba(138,158,133,0.12)",
            border: "1px solid rgba(138,158,133,0.28)",
          }}
        >
          <p
            className="font-body uppercase"
            style={{
              fontSize: "10px",
              letterSpacing: "0.32em",
              color: "rgba(28,28,26,0.56)",
            }}
          >
            Order {shortId}
          </p>
        </motion.div>

        {/* Total */}
        <motion.p
          variants={fadeUp}
          className="font-body mb-9"
          style={{ fontSize: "14px", color: "rgba(28,28,26,0.38)" }}
        >
          ₹{order.total_amount} · {DELIVERY_LABEL[order.delivery_status] ?? order.delivery_status}
        </motion.p>

        {/* Items summary */}
        {items.length > 0 && (
          <motion.div variants={fadeUp} className="mb-10 w-full">
            <div
              style={{
                borderTop: "1px solid rgba(28,28,26,0.08)",
                borderBottom: "1px solid rgba(28,28,26,0.08)",
                padding: "12px 0",
              }}
            >
              {items.map((item) => (
                <p
                  key={item.id}
                  className="font-body font-light py-1"
                  style={{ fontSize: "12.5px", color: "rgba(28,28,26,0.44)" }}
                >
                  {item.product_title} × {item.quantity}
                </p>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 w-full">
          <Link
            to="/shop"
            className="font-body uppercase text-center flex-1"
            style={{
              fontSize: "10px",
              letterSpacing: "0.26em",
              padding: "14px 24px",
              background: "#2C3B2D",
              color: "#F5F0E8",
              textDecoration: "none",
              display: "block",
              transition: "background 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#C4956A")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#2C3B2D")}
          >
            Continue Shopping →
          </Link>
          <Link
            to="/orders"
            className="font-body uppercase text-center flex-1"
            style={{
              fontSize: "10px",
              letterSpacing: "0.26em",
              padding: "14px 24px",
              background: "transparent",
              color: "rgba(28,28,26,0.56)",
              border: "1px solid rgba(28,28,26,0.18)",
              textDecoration: "none",
              display: "block",
            }}
          >
            View My Orders
          </Link>
          <Link
            to="/"
            className="font-body uppercase text-center flex-1"
            style={{
              fontSize: "10px",
              letterSpacing: "0.26em",
              padding: "14px 24px",
              background: "transparent",
              color: "rgba(28,28,26,0.56)",
              border: "1px solid rgba(28,28,26,0.18)",
              textDecoration: "none",
              display: "block",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#1C1C1A";
              e.currentTarget.style.borderColor = "rgba(28,28,26,0.36)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(28,28,26,0.56)";
              e.currentTarget.style.borderColor = "rgba(28,28,26,0.18)";
            }}
          >
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
