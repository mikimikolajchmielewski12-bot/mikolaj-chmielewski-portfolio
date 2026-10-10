"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { asset } from "@/lib/asset";

const sectionLinks = [
  { label: "O mnie", href: "#about" },
  { label: "Edukacja", href: "#education" },
  { label: "Doświadczenie", href: "#experience" },
  { label: "Osiągnięcia", href: "#achievements" },
  { label: "Wyjazdy", href: "#trips" },
  { label: "Kontakt", href: "#contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const galleryHref = asset("/galeria/");
  const navItems = [
    ...sectionLinks.map((item) => ({
      ...item,
      href: isHome ? item.href : `${asset("/")}${item.href}`,
    })),
    { label: "Galeria", href: galleryHref },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-lg border-b border-earth/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href={asset("/")} className="flex items-center gap-3">
          <Image
            src={asset("/images/LOGO M.CH. BIAŁE.png")}
            alt="M.CH."
            width={32}
            height={32}
            className="object-contain brightness-0 invert"
          />
          <span className="text-cream text-lg tracking-[0.2em] uppercase hidden sm:block">
            Mikołaj Chmielewski
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm tracking-[0.15em] uppercase transition-all duration-300 relative group ${
                item.href === galleryHref && pathname.startsWith("/galeria")
                  ? "text-earth"
                  : "text-cream/70 hover:text-earth"
              }`}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-earth transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-cream text-2xl"
          aria-label="Menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-lg border-b border-earth/20"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm tracking-[0.15em] uppercase transition-colors ${
                    item.href === galleryHref && pathname.startsWith("/galeria")
                      ? "text-earth"
                      : "text-cream/70 hover:text-earth"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}