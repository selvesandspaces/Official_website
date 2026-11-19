const SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

export class PaymentCancelled extends Error {
  constructor() {
    super("Payment cancelled");
    this.name = "PaymentCancelled";
  }
}

export class PaymentFailed extends Error {
  constructor(description) {
    super(description || "Your payment didn’t go through. You haven’t been charged for this order.");
    this.name = "PaymentFailed";
  }
}

let scriptPromise = null;
function loadScript() {
  if (window.Razorpay) return Promise.resolve();
  scriptPromise ??= new Promise((resolve, reject) => {
    const el = document.createElement("script");
    el.src = SCRIPT_SRC;
    el.onload = resolve;
    el.onerror = () => {
      el.remove();
      scriptPromise = null; // allow a retry
      reject(new Error("Couldn’t load the payment window. Check your connection and try again."));
    };
    document.body.appendChild(el);
  });
  return scriptPromise;
}

// Opens Razorpay Checkout for a POST /checkout response. Resolves with
// { razorpay_payment_id, razorpay_order_id, razorpay_signature }; rejects with
// PaymentCancelled if the popup is closed, or PaymentFailed if the payment fails.
export async function openRazorpay(checkout) {
  await loadScript();
  return new Promise((resolve, reject) => {
    let settled = false;
    const settle = (fn, value) => {
      if (settled) return;
      settled = true;
      fn(value);
    };
    const rzp = new window.Razorpay({
      key: checkout.razorpay_key_id,
      order_id: checkout.razorpay_order_id,
      amount: checkout.amount,
      currency: checkout.currency,
      prefill: checkout.prefill,
      name: "Selves & Spaces",
      theme: { color: "#2C3B2D" },
      handler: (response) => settle(resolve, response),
      modal: {
        confirm_close: true,
        ondismiss: () => settle(reject, new PaymentCancelled()),
      },
    });
    rzp.on("payment.failed", (r) => settle(reject, new PaymentFailed(r?.error?.description)));
    rzp.open();
  });
}
