import Image from "next/image";

export default function MTGCard({ card }) {
  return card.imageUrisNormal && card.imageUrisNormal != "N/A" ? (
    <div className="relative rounded-4xl transform transition-transform duration-100 hover:scale-105 hover:z-50 hover:shadow-2xl">
      <a
        href="#"
        className="flex flex-col justify-between bg-accent text-accent-foreground p-4 rounded-4xl"
        style={{ aspectRatio: "384 / 535" }}
      >
        <Image
          src={card.imageUrisNormal}
          alt={card.name || "Magic Card"}
          fill
          placeholder="blur"
          blurDataURL="/placeholder.webp"
          className="object-cover rounded-4xl transition-all"
        />
      </a>
    </div>
  ) : (
    <div className="relative rounded-2xl bg-card transform transition-transform duration-100 hover:scale-150 hover:z-50 ">
      <a
        href="#"
        className="flex flex-col justify-between text-accent-foreground p-4 rounded-2xl"
        style={{ aspectRatio: "384 / 535" }}
      >
        <div className="overflow-auto">
          <h1 className="text-lg font-bold mb-2">{card.name}</h1>
          <p className="text-sm">Colors: {card.colors || "N/A"}</p>
          <p className="text-sm">Cost: {card.manaCost || "N/A"}</p>
          <p className="text-sm">Set: {card.setName || "N/A"}</p>
          <p className="text-sm">Types: {card.typeLine || "N/A"}</p>
          <p className="text-sm">Rarity: {card.rarity || "N/A"}</p>
          <p className="text-sm">Oracle Text: {card.oracleText || "N/A"}</p>
        </div>
        <p className="text-xs mt-4 text-left">Artist: {card.artist || "N/A"}</p>
      </a>
    </div>
  );
}
