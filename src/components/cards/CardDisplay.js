"use client";
import { useEffect, useRef } from "react";
import CardImage from "../CardImage";

export default function CardDisplay({ cardData }) {
  const scrollContainerRef = useRef(null);
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [cardData]);

  if (!cardData || cardData.length == 0) {
    return (
      <div className="p-4 bg-card rounded-2xl overflow-hidden h-full w-[90%] flex items-center justify-center transition-opacity duration-1000">
        <h1 className="text-3xl text-white bold">No Cards Found!</h1>
      </div>
    );
  }

  return (
    <div className="p-4 bg-card rounded-2xl  h-full w-[90%] overflow-hidden transition-opacity duration-1000">
      <div className="bg-accent h-full overflow-y-auto rounded-xl">
        <div
          ref={scrollContainerRef}
          className="grid grid-cols-5 gap-4 relative p-4  pt-4"
        >
          {cardData.map((card, i) => (
            <CardImage size="normal" key={card.id || i} i={i} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}
