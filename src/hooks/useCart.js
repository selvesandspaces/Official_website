import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "ss_cart";

const withoutItem = (cart, id) => {
  const rest = { ...cart };
  delete rest[id];
  return rest;
};

// To swap to a server-side cart: replace the useState initializer with a fetch,
// and replace the localStorage useEffect with API calls in each mutation.
export function useCart() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  const addToCart = (id, qty) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + qty }));
  };

  const updateQty = (id, delta) => {
    setCart((prev) => {
      const next = (prev[id] || 0) + delta;
      if (next <= 0) {
        return withoutItem(prev, id);
      }
      return { ...prev, [id]: next };
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => withoutItem(prev, id));
  };

  const clearCart = () => setCart({});

  // Drops entries for products that no longer exist (the cart outlives the catalogue in
  // localStorage) and any entry with an invalid quantity. Returns the same state when nothing changes.
  const pruneCart = useCallback((validIds) => {
    const valid = new Set(validIds.map(String));
    setCart((prev) => {
      const next = {};
      let changed = false;
      for (const [id, qty] of Object.entries(prev)) {
        if (valid.has(id) && Number.isInteger(qty) && qty > 0) next[id] = qty;
        else changed = true;
      }
      return changed ? next : prev;
    });
  }, []);

  return { cart, totalItems, addToCart, updateQty, removeFromCart, clearCart, pruneCart };
}
