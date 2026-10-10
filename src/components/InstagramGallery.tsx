"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { asset } from "@/lib/asset";
import type { InstagramCategory, InstagramPost } from "@/lib/data";

interface InstagramGalleryProps {
  posts: InstagramPost[];
  categories: InstagramCategory[];
}

function formatDate(date: string): string {
  const [y, m, d] = date.split("-");
  return `${d}.${m}.${y}`;
}

export function InstagramGallery({ posts, categories }: InstagramGalleryProps) {
  const [active, setActive] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === "all" ? posts : posts.filter((p) => p.category === active);
  const current = lightbox !== null ? filtered[lightbox] : null;

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i + filtered.length - 1) % filtered.length));
  }, [filtered.length]);
  const next = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i + 1) % filtered.length));
  }, [filtered.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, close, prev, next]);

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActive(cat.id);
              setLightbox(null);
            }}
            className={`px-5 py-2 text-xs tracking-[0.2em] uppercase transition-all duration-300 border ${
              active === cat.id
                ? "bg-earth text-black border-earth"
                : "text-cream/60 border-earth/30 hover:border-earth hover:text-earth"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((post, index) => (
            <motion.button
              key={post.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              onClick={() => setLightbox(index)}
              className="relative aspect-square overflow-hidden rounded-2xl border border-earth/15 group text-left"
            >
              <Image
                src={asset(post.image)}
                alt={post.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {post.type === "reel" && (
                <span className="absolute top-3 left-3 z-10 bg-black/70 backdrop-blur px-2 py-0.5 text-[9px] tracking-[0.2em] uppercase text-earth-light border border-earth/30">
                  Reel
                </span>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                <span className="text-[10px] tracking-[0.2em] uppercase text-earth-light mb-1">
                  {formatDate(post.date)}
                </span>
                <span className="text-cream uppercase tracking-[0.1em] leading-tight">
                  {post.title}
                </span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {current && lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur flex items-center justify-center p-4 md:p-10"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute top-5 right-5 z-20 text-cream/70 hover:text-earth text-3xl transition-colors"
              aria-label="Zamknij"
            >
              ✕
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-20 text-cream/60 hover:text-earth text-4xl transition-colors"
              aria-label="Poprzednie"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-20 text-cream/60 hover:text-earth text-4xl transition-colors"
              aria-label="Następne"
            >
              ›
            </button>

            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.35 }}
              className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col lg:flex-row bg-black border border-earth/20 rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative lg:w-1/2 aspect-square lg:aspect-auto lg:min-h-[420px] bg-charcoal/20">
                <Image
                  src={asset(current.image)}
                  alt={current.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                {current.type === "reel" && (
                  <span className="absolute top-3 left-3 z-10 bg-black/70 backdrop-blur px-2 py-0.5 text-[9px] tracking-[0.2em] uppercase text-earth-light border border-earth/30">
                    Reel
                  </span>
                )}
              </div>
              <div className="px-6 py-6 overflow-y-auto flex flex-col lg:w-1/2">
                <span className="text-[10px] tracking-[0.2em] uppercase text-earth-light mb-2">
                  {formatDate(current.date)}
                </span>
                <h3 className="text-2xl text-cream uppercase tracking-[0.1em] leading-tight mb-4">
                  {current.title}
                </h3>
                {current.caption ? (
                  <p className="text-cream/60 text-sm leading-relaxed whitespace-pre-line">
                    {current.caption}
                  </p>
                ) : (
                  <p className="text-cream/40 text-sm italic">Brak opisu.</p>
                )}
                <div className="flex items-center gap-4 mt-6 pt-4 border-t border-earth/15">
                  <a
                    href={current.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-earth hover:text-earth-light text-xs tracking-[0.2em] uppercase transition-colors"
                  >
                    Zobacz na Instagramie ↗
                  </a>
                  <span className="ml-auto text-[10px] tracking-[0.15em] uppercase text-cream/30">
                    {lightbox + 1} / {filtered.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}