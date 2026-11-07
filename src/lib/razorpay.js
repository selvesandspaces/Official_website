const SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

export class PaymentCancelled extends Error {
  constructor() {
    super("Payment cancelled");
    this.name = "PaymentCancelled";
  }
}

function loadScript() {
  if (window.Razorpay) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const el = document.createElement("script");
    el.src = SCRIPT_SRC;
    el.onload = resolve;
    el.onerror = () => reject(new Error("Couldn’t load the payment window. Check your connection and try again."));
    document.body.appendChild(el);
  });
}

// Opens Razorpay Checkout for a POST /checkout response. Resolves with
// { razorpay_payment_id, razorpay_order_id, razorpay_signature }; rejects with
// PaymentCancelled if the popup is closed, or an Error if the payment fails.
export async function openRazorpay(checkout) {
  await loadScript();
  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay({
      key: checkout.razorpay_key_id,
      order_id: checkout.razorpay_order_id,
      amount: checkout.amount,
      currency: checkout.currency,
      prefill: checkout.prefill,
      name: "Selves & Spaces",
      theme: { color: "#2C3B2D" },
      handler: resolve,
      modal: { ondismiss: () => reject(new PaymentCancelled()) },
    });
    rzp.on("payment.failed", (r) =>
      reject(new Error(r?.error?.description || "Your payment didn’t go through. You haven’t been charged for this order.")),
    );
    rzp.open();
  });
}
