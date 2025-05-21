"use client";
import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Media } from "@/Lib/types/venue";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SmartImage from "./SmartImage";

interface ImageCarouselProps {
  images: Media[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollButtons = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    updateScrollButtons();
    emblaApi.on("select", updateScrollButtons);
  }, [emblaApi, updateScrollButtons]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="relative w-full overflow-hidden">
      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="flex transition-transform duration-600 ease-in-out">
          {images.map((image, index) => (
            <div
              className="flex-[0_0_100%] relative h-64 sm:h-80 md:h-96"
              key={index}>
              {/* <img
                src={image?.url || "/images/placeholder.png"}
                alt={image?.alt || "Venue image"}
                className="w-full h-full object-cover"
              /> */}
              <SmartImage
                src={image?.url || "/images/placeholder.png"}
                alt={image?.alt || "Venue image"}
                width={1920}
                height={400}
                className="w-full h-full object-cover"
                fallback
              />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1 rounded-full shadow disabled:opacity-30"
        aria-label="Previous image">
        <ChevronLeft />
      </button>

      <button
        onClick={scrollNext}
        disabled={!canScrollNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1 rounded-full shadow disabled:opacity-30"
        aria-label="Next image">
        <ChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === selectedIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
