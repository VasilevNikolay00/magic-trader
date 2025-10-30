import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";

export default function CardDataOverview({ card }) {
  if (!card) {
    return (
      <Card className="w-full max-w-2xl mx-auto h-full flex items-center justify-center">
        <CardContent>
          <p className="text-center text-muted-foreground">
            No card data available.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getLegalities = (card) => {
    const legalities = [];
    for (const key in card) {
      if (key.startsWith("legalities") && card[key] === "legal") {
        const formatName = key
          .replace("legalities", "")
          .replace(/([A-Z])/g, " $1")
          .trim();
        legalities.push(formatName);
      }
    }
    return legalities.length > 0
      ? legalities.join(", ")
      : "Not Legal in any format";
  };

  const renderManaCostSymbols = (cost) => {
    if (!cost) return <span className="text-gray-500">N/A</span>;

    const symbols = cost.match(/{[^}]+}/g) || []; // Find all {symbol} patterns

    return (
      <div className="flex items-center gap-0.5">
        {symbols.map((symbol, index) => {
          const char = symbol.replace(/{|}/g, "");
          let imageUrl;

          if (["R", "W", "B", "U", "G", "C", "X"].includes(char)) {
            imageUrl = `/manaIcons/${char.toUpperCase()}.svg`;
          } else {
            return (
              <span
                key={index}
                className="text-sm text-primary-foreground font-bold mx-px"
              >
                {symbol}
              </span>
            );
          }

          return (
            <Image
              key={index}
              src={imageUrl}
              alt={char}
              width={16}
              height={16}
              className="inline-block"
            />
          );
        })}
      </div>
    );
  };

  return (
    <Card className="w-full mx-auto h-full overflow-y-auto">
      <CardHeader>
        <div>
          <CardTitle className="text-3xl font-bold">{card.name}</CardTitle>
          <CardDescription className="text-muted-foreground mt-1">
            {card.typeLine}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-2">
          <p className="font-semibold">Mana Cost:</p>
          {renderManaCostSymbols(card.manaCost)}
          <p className="font-semibold ml-4">CMC:</p>
          <p className="text-lg">{card.cmc}</p>
        </div>

        <div>
          <p className="font-semibold">Oracle Text:</p>
          <p className="whitespace-pre-wrap text-sm text-card-foreground">
            {card.oracleText || "N/A"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div>
            <p className="font-semibold">Set:</p>
            <p className="text-sm">
              {card.setName} ({card.set.toUpperCase()})
            </p>
          </div>
          <div>
            <p className="font-semibold">Rarity:</p>
            <p className="capitalize text-sm">{card.rarity}</p>
          </div>
          <div>
            <p className="font-semibold">Artist:</p>
            <p className="text-sm">{card.artist || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold">Released At:</p>
            <p className="text-sm">
              {new Date(card.releasedAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="font-semibold">Colors:</p>
            <p className="text-sm">{card.colors || "Colorless"}</p>
          </div>
          <div>
            <p className="font-semibold">Color Identity:</p>
            <p className="text-sm">{card.colorIdentity || "Colorless"}</p>
          </div>
          <div>
            <p className="font-semibold">Keywods:</p>
            <p className="text-sm">{card.keywords || "N/A"}</p>
          </div>
        </div>

        <div>
          <p className="font-semibold">Legal In:</p>
          <p className="text-sm">{getLegalities(card)}</p>
        </div>
      </CardContent>
    </Card>
  );
}
