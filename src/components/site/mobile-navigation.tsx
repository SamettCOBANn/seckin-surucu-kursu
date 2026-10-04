"use client";

import { useRef, useState } from "react";

export function MobileNavigation({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return (
    <div className="mobile-navigation" onKeyDown={(event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    }}>
      <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="mobile-links" onClick={() => setOpen(!open)}>
        <span>{open ? "Kapat" : "Menü"}</span><span aria-hidden="true">{open ? "×" : "☰"}</span>
      </button>
      <nav id="mobile-links" aria-label="Mobil ana menü" hidden={!open} onClick={(event) => {
        if (event.target instanceof Element && event.target.closest("a")) setOpen(false);
      }}>{children}</nav>
    </div>
  );
}
