"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { GalleryImage } from "@/data/gallery";
import { Overlay } from "./Overlay";
import { Button } from "./Button";
import { ChevronLeft, ChevronRight, Expand } from "./icons";

export function Gallery({ images, initial = 9 }: { images: GalleryImage[]; initial?: number }) {
  const [showAll, setShowAll] = useState(false);
  const [index, setIndex] = useState<number | null>(null);
  const visible = showAll ? images : images.slice(0, initial);
  const canExpand = images.length > initial;

  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  const current = index === null ? null : images[index];

  return (
    <div>
      <motion.ul layout className="columns-2 gap-3 sm:gap-4 lg:columns-3">
        {visible.map((img, i) => (
          <motion.li
            key={img.src}
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.08 }}
            className="mb-3 break-inside-avoid sm:mb-4"
          >
            <button
              type="button"
              onClick={() => setIndex(images.indexOf(img))}
              aria-label={`Open photo: ${img.alt}`}
              className="group relative block w-full overflow-hidden rounded-2xl sm:rounded-3xl"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes="(min-width: 1024px) 30vw, 48vw"
                className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/40" />
              <span className="absolute right-3 bottom-3 grid size-10 translate-y-2 place-items-center rounded-full bg-gold text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <Expand width={16} height={16} />
              </span>
            </button>
          </motion.li>
        ))}
      </motion.ul>

      {canExpand && (
        <div className="mt-10 flex justify-center">
          <Button variant="outline" onClick={() => setShowAll((s) => !s)}>
            {showAll ? "Show fewer photos" : `View all ${images.length} photos`}
          </Button>
        </div>
      )}

      <AnimatePresence>
        {current && index !== null && (
          <Overlay label="Photo viewer" onClose={() => setIndex(null)}>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute top-1/2 left-2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-fg/10 transition-colors hover:bg-gold hover:text-ink sm:left-6"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute top-1/2 right-2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-fg/10 transition-colors hover:bg-gold hover:text-ink sm:right-6"
            >
              <ChevronRight />
            </button>

            <AnimatePresence mode="wait">
              <motion.figure
                key={current.src}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                className="flex max-h-full max-w-full flex-col items-center gap-4"
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  width={current.width}
                  height={current.height}
                  sizes="100vw"
                  className="max-h-[78vh] w-auto max-w-full rounded-2xl object-contain"
                />
                <figcaption className="max-w-xl text-center text-sm text-fg/70">
                  {current.alt}
                  <span className="ml-3 text-gold-ink">
                    {index + 1} / {images.length}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </Overlay>
        )}
      </AnimatePresence>
    </div>
  );
}
