import { useEffect, useRef } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Moves focus into the dialog on open, keeps Tab inside it, and restores focus
// to the previously focused element on close. Pass onEscape if the dialog has
// no Escape handler of its own; pass active=false while it is not rendered.
export function useDialog(ref, { active = true, onEscape } = {}) {
  const escapeRef = useRef(onEscape);
  useEffect(() => {
    escapeRef.current = onEscape;
  });

  useEffect(() => {
    const node = ref.current;
    if (!active || !node) return;
    const previous = document.activeElement;

    const focusables = () => Array.from(node.querySelectorAll(FOCUSABLE));
    (focusables()[0] ?? node).focus({ preventScroll: true });

    const onKeyDown = (e) => {
      if (e.key === "Escape" && escapeRef.current) {
        escapeRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    node.addEventListener("keydown", onKeyDown);
    return () => {
      node.removeEventListener("keydown", onKeyDown);
      if (previous instanceof HTMLElement) previous.focus({ preventScroll: true });
    };
  }, [ref, active]);
}
