import { Gallery } from "@/components/Gallery";
import { SectionHeading } from "@/components/SectionHeading";
import { Highlight } from "@/components/motion";
import { gallery } from "@/data/gallery";

export function GallerySection() {
  return (
    <section className="container-x py-24 sm:py-32">
      <SectionHeading eyebrow="Gallery">
        Moments in <Highlight>ministry</Highlight>
      </SectionHeading>
      <div className="mt-12">
        <Gallery images={gallery} initial={9} />
      </div>
    </section>
  );
}
