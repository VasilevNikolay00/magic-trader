"use client";
import { useEffect, useRef } from "react";
import CardImage from "../CardImage";
import { CollectionForm } from "../card/CollectionForm";

export default function CardDisplay({ cardData }) {
  const scrollContainerRef = useRef(null);
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [cardData]);

  if (!cardData || cardData.length == 0) {
    return (
      <div className=" bg-card/50 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden p-4 h-full w-full flex items-center justify-center transition-opacity duration-1000">
        <h1 className="text-3xl text-white bold">No Cards Found!</h1>
      </div>
    );
  }

  return (
    <div className=" bg-card/50 backdrop-blur-lg rounded-2xl shadow-xl p-4 h-full w-full overflow-hidden transition-opacity duration-1000">
      <div className="bg-accent/50 backdrop-blur-xl h-full overflow-y-auto rounded-xl">
        <div
          ref={scrollContainerRef}
          className="grid grid-cols-5 gap-4 relative p-4  pt-4"
        >
          {cardData.map((card, i) => (
            <div key={card.id || i} className="flex flex-col gap-3">
            <CardImage size="normal" i={i} card={card} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
