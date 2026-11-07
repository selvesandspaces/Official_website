import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import { fetchMyOrders } from "../../services/shopApi";
import { errorMessage } from "../../services/api";

const PAGE_SIZE = 20;

const STEPS = [
  { key: "order_placed", label: "Order placed", at: (o) => o.paid_at ?? o.created_at },
  { key: "in_transit", label: "On its way", at: (o) => o.in_transit_at },
  { key: "delivered", label: "Delivered", at: (o) => o.delivered_at },
];

const STATUS_LABEL = Object.fromEntries(STEPS.map((s) => [s.key, s.label]));

const formatDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "";

function StatusTimeline({ order }) {
  const current = STEPS.findIndex((s) => s.key === order.delivery_status);
  return (
    <ol className="flex w-full items-start" aria-label="Delivery progress">
      {STEPS.map((step, i) => {
        const reached = i <= current;
        const when = reached ? formatDate(step.at(order)) : "";
        return (
          <li key={step.key} className="relative flex flex-1 flex-col items-center text-center">
            {i > 0 && (
              <span
                aria-hidden="true"
                className="absolute right-1/2 top-[7px] h-px w-full"
                style={{ background: i <= current ? "#2C3B2D" : "rgba(28,28,26,0.15)" }}
              />
            )}
            <span
              aria-hidden="true"
              className="relative z-10 block h-[15px] w-[15px] rounded-full border"
              style={{
                background: reached ? "#2C3B2D" : "#F5F0E8",
                borderColor: reached ? "#2C3B2D" : "rgba(28,28,26,0.25)",
              }}
            />
            <span
              className="font-body mt-2 text-[11px]"
              style={{ color: reached ? "#1C1C1A" : "rgba(28,28,26,0.4)", fontWeight: i === current ? 500 : 300 }}
            >
              {step.label}
              {i === current && <span className="sr-only"> (current status)</span>}
            </span>
            <span className="font-body text-[10.5px] text-ink/45">{when}</span>
          </li>
        );
      })}
    </ol>
  );
}

function OrderCard({ order }) {
  const a = order.shipping_address;
  return (
    <motion.article
      className="border border-ink/10 bg-[#FDFCF9] p-6 md:p-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-body text-[10px] uppercase tracking-[0.3em] text-sage">
            Order {order.id.slice(0, 8).toUpperCase()}
          </p>
          <p className="font-body mt-1 text-[12.5px] font-light text-ink/55">
            Placed {formatDate(order.created_at)}
          </p>
        </div>
        <div className="text-right">
          <p className="font-body text-[15px] text-ink">₹{order.total_amount}</p>
          <p className="font-body mt-1 text-[11px] uppercase tracking-[0.18em] text-green-deep">
            {STATUS_LABEL[order.delivery_status] ?? order.delivery_status}
          </p>
        </div>
      </header>

      <StatusTimeline order={order} />

      <ul className="mt-7 border-t border-ink/10 pt-4">
        {order.items.map((item) => (
          <li key={item.id} className="font-body flex justify-between gap-4 py-1.5 text-[13px] font-light text-ink/70">
            <span>
              {item.product_title} × {item.quantity}
            </span>
            <span>₹{item.line_total}</span>
          </li>
        ))}
      </ul>

      <p className="font-body mt-4 border-t border-ink/10 pt-4 text-[12px] font-light leading-relaxed text-ink/50">
        Delivering to {[a.line1, a.line2, a.city, a.state, a.postal_code].filter(Boolean).join(", ")}
      </p>
    </motion.article>
  );
}

export default function MyOrdersSection() {
  const { loading: authLoading, session, user, signOut } = useAuth();
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const userId = user?.id;
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    fetchMyOrders(PAGE_SIZE)
      .then((rows) => {
        if (cancelled) return;
        setOrders(rows);
        setHasMore(rows.length === PAGE_SIZE);
        setStatus("ready");
      })
      .catch((err) => {
        if (cancelled) return;
        setError(errorMessage(err, "We couldn’t load your orders. Please try again."));
        setStatus("error");
      });
    return () => { cancelled = true; };
  }, [userId]);

  const loadMore = async () => {
    setLoadingMore(true);
    try {
      const rows = await fetchMyOrders(PAGE_SIZE, orders.length);
      setOrders((prev) => [...prev, ...rows]);
      setHasMore(rows.length === PAGE_SIZE);
    } catch (err) {
      setError(errorMessage(err, "We couldn’t load more orders."));
    } finally {
      setLoadingMore(false);
    }
  };

  if (authLoading) return <main className="min-h-screen bg-cream" aria-busy="true" />;
  if (!session) return <Navigate to="/login" replace state={{ from: "/orders" }} />;

  return (
    <main className="min-h-screen bg-cream px-6 pb-28 pt-36 text-ink md:px-14 lg:px-24">
      <div className="mx-auto max-w-3xl">
        <p className="font-body mb-4 text-[10px] uppercase tracking-[0.44em] text-sage">Selves &amp; Spaces · Account</p>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h1 className="font-display text-5xl italic leading-[0.95]">My orders.</h1>
          <div className="font-body text-right text-[12px] font-light text-ink/55">
            <p>{user?.email}</p>
            <button onClick={signOut} className="mt-1 underline underline-offset-4 hover:text-ink">
              Sign out
            </button>
          </div>
        </div>

        {status === "loading" && (
          <p className="font-display text-center text-xl italic text-ink/30" aria-live="polite">Loading your orders…</p>
        )}

        {status === "error" && (
          <p role="alert" className="font-body text-[13px] text-[#9B4A32]">{error}</p>
        )}

        {status === "ready" && orders.length === 0 && (
          <div className="py-10 text-center">
            <p className="font-display mb-6 text-2xl italic text-ink/40">You haven&rsquo;t placed any orders yet.</p>
            <Link to="/shop" className="font-body text-[10px] uppercase tracking-[0.26em] text-green-deep underline underline-offset-4">
              Browse the shop →
            </Link>
          </div>
        )}

        {orders.length > 0 && (
          <div className="flex flex-col gap-5">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
            {error && <p role="alert" className="font-body text-[13px] text-[#9B4A32]">{error}</p>}
            {hasMore && (
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="font-body mx-auto border border-ink/20 px-8 py-3 text-[10px] uppercase tracking-[0.24em] text-ink/70 transition-colors hover:text-ink disabled:opacity-60"
              >
                {loadingMore ? "Loading…" : "Show older orders"}
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
