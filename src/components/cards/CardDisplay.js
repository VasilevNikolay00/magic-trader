import Image from "next/image";
import MTGCard from "./MTGCard";

export default function CardDisplay({ cardData }) {
  return (
    <div className="p-4 bg-card rounded-2xl overflow-hidden h-full w-[90%]">
      <div className="grid grid-cols-5 gap-4 w-full relative p-4 h-full bg-accent rounded-xl overflow-y-auto  pt-4">
        {cardData.map((card, i) => (
          <MTGCard key={i} i={i} card={card} />
        ))}
      </div>
    </div>
  );
}
