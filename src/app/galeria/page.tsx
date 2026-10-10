import type { Metadata } from "next";
import { instagram } from "@/lib/data";
import { InstagramGallery } from "@/components/InstagramGallery";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Galeria | Mikołaj Chmielewski",
  description:
    "Galeria zdjęć i filmów Mikołaja Chmielewskiego – wyjazdy, osiągnięcia, szkoła, doświadczenie i nie tylko.",
};

export default function GaleriaPage() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-earth text-xs tracking-[0.3em] uppercase">
              Instagram
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-earth/30 to-transparent" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1} variant="slideLeft">
          <h1 className="text-4xl md:text-6xl font-bold text-cream leading-[1.05] tracking-[-0.02em] uppercase mb-8">
            Galeria
            <br />
            <span className="earth-gradient">Momentów</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2} variant="slideRight">
          <p className="text-cream/50 text-sm md:text-base max-w-2xl mb-16 leading-relaxed">
            Wybrane kadry i filmy z mojego profilu na Instagramie — posegregowane
            według kategorii: wyjazdy, osiągnięcia, szkoła, doświadczenie i życie.
          </p>
        </ScrollReveal>

        <InstagramGallery
          posts={instagram.posts}
          categories={instagram.categories}
        />
      </div>
    </section>
  );
}