"use client";
import { useEffect, useRef } from "react";
import MTGCard from "./MTGCard";

export default function CardDisplay({ cardData }) {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [cardData]);

  return (
    <div className="p-4 bg-card rounded-2xl overflow-hidden h-full w-[90%] transition-opacity duration-1000">
      <div
        ref={scrollContainerRef}
        className="grid grid-cols-5 gap-4 w-full relative p-4 h-full bg-accent rounded-xl overflow-y-auto pt-4"
      >
        {cardData.map((card, i) => (
          <MTGCard key={card.id || i} i={i} card={card} />
        ))}
      </div>
    </div>
  );
}
