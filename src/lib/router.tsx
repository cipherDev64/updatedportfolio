import { useEffect, useState, type AnchorHTMLAttributes, type MouseEvent } from "react";

// A tiny History API router: "/" and "/work/:slug" are the only routes.

const listeners = new Set<() => void>();

export function navigate(to: string) {
  if (to === window.location.pathname + window.location.hash) return;
  window.history.pushState({}, "", to);
  listeners.forEach((fn) => fn());
}

export function usePath() {
  const [path, setPath] = useState(() => window.location.pathname);
  useEffect(() => {
    const update = () => setPath(window.location.pathname);
    listeners.add(update);
    window.addEventListener("popstate", update);
    return () => {
      listeners.delete(update);
      window.removeEventListener("popstate", update);
    };
  }, []);
  return path;
}

/** Internal link. Handles "/path" and "/#section" without a full reload. */
export function Link({ href, onClick, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const handle = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    const [pathname, hash] = href.split("#");
    const target = pathname || "/";
    if (target !== window.location.pathname) {
      navigate(href);
      requestAnimationFrame(() => {
        if (hash) document.getElementById(hash)?.scrollIntoView();
        else window.scrollTo(0, 0);
      });
    } else if (hash) {
      window.history.replaceState({}, "", href);
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return <a href={href} onClick={handle} {...rest} />;
}
