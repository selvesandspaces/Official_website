import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PAGES, NOT_FOUND, SITE_NAME } from "../lib/seo";

const setMeta = (name, content) => {
  let el = document.head.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

// Keeps document title, description and robots in sync with the current route.
export default function RouteMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const key = pathname.startsWith("/order-confirmation") ? "/order-confirmation" : pathname;
    const page = PAGES[key] ?? NOT_FOUND;
    document.title = pathname === "/" ? page.title : `${page.title} | ${SITE_NAME}`;
    if (page.description) setMeta("description", page.description);
    setMeta("robots", page.noindex ? "noindex" : "index, follow");
  }, [pathname]);

  return null;
}
