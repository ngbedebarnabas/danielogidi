import { AdullamFeature } from "@/components/home/AdullamFeature";
import { CtaBanner } from "@/components/CtaBanner";
import { GallerySection } from "@/components/home/GallerySection";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { Pillars } from "@/components/home/Pillars";
import { ItineraryPreview, TeachingsPreview } from "@/components/home/Previews";
import { StatsBar } from "@/components/home/StatsBar";
import { Marquee } from "@/components/Marquee";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Intro />
      <Marquee />
      <div className="py-24 sm:py-32">
        <Pillars />
      </div>
      <AdullamFeature />
      <ItineraryPreview />
      <TeachingsPreview />
      <GallerySection />
      <CtaBanner />
    </>
  );
}
