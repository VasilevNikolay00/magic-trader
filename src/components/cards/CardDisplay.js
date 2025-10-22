"use client";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";

export default function CardDisplay({ cardData }) {
  return (
    <div className="grid grid-cols-4 gap-4 p-4 h-full overflow-y-auto bg-accent-foreground rounded-xl pt-4">
      {cardData.map((card, i) => (
        <Card key={i} className="border-none bg-accent-foreground">
          <CardContent>
            {card.imageUrisNormal ? (
              <Image
                src={card.imageUrisNormal}
                alt={card.name || "Magic Card"}
                width={250}
                height={100}
                priority
                className="shadow bg-white"
              />
            ) : (
              <div className="flex flex-col bg-accent w-full rounded-xl pl-2">
                <h1 className="text-lg font-bold">{card.name}</h1>
                <p>Colors: {card.colors}</p>
                <p>Rarity: {card.rarity}</p>
                <p>Set: {card.setName}</p>
                <p>Artist: {card.artist}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
