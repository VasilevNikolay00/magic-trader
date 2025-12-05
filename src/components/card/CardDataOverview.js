import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner"; // Ensure this path matches your project

export default function CardDataOverview({ card, isLoading }) {
  // 1. Loading State
  if (isLoading) {
    return (
      <Card className="bg-card/50 shadow-xl rounded-2xl w-full mx-auto h-full min-h-[400px] flex items-center justify-center">
        <CardContent className="flex flex-col items-center gap-2">
          <Spinner size="large" /> {/* Add size prop if your spinner supports it */}
          <p className="text-muted-foreground text-sm">Loading card data...</p>
        </CardContent>
      </Card>
    );
  }

  // 2. Empty State (Not loading, but no card data)
  if (!card) {
    return (
      <Card className="bg-card shadow-xl rounded-2xl w-full max-w-2xl mx-auto h-full flex items-center justify-center">
        <CardContent>
          <p className="text-center text-muted-foreground">
            No card data available.
          </p>
        </CardContent>
      </Card>
    );
  }

  // 3. Render Content Helpers
  const renderManaCostSymbols = (cost) => {
    if (!cost) return <span className="text-muted-foreground">N/A</span>;

    const symbols = cost.match(/{[^}]+}/g) || [];

    return (
      <div className="flex items-center gap-0.5">
        {symbols.map((symbol, index) => {
          const char = symbol.replace(/{|}/g, "");
          let imageUrl;

          // Check for basic colors + X. 
          // Note: You might want to handle numbers (1, 2, 3) or phyrexian mana here later.
          if (["R", "W", "B", "U", "G", "C", "X"].includes(char)) {
            imageUrl = `/manaIcons/${char.toUpperCase()}.svg`;
          } else {
            // Render text for numbers or unknown symbols
            return (
              <span key={index} className="text-sm font-bold mx-px px-1 bg-gray-200 dark:bg-gray-700 rounded-full min-w-[1.2rem] text-center inline-block">
                {char}
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

  // 4. Main Render
  return (
    <Card className="bg-card/50 shadow-xl rounded-2xl w-full mx-auto h-full overflow-hidden flex flex-col">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-3xl font-bold">{card.name}</CardTitle>
        <CardDescription className="text-base mt-1">
          {card.typeLine}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto space-y-5">
        {/* Mana Cost and CMC */}
        <div className="flex items-center gap-6 p-3 bg-accent/30 rounded-lg border">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm">Mana Cost:</p>
            {renderManaCostSymbols(card.manaCost)}
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm">CMC:</p>
            <p className="text-base font-bold text-primary">{card.cmc}</p>
          </div>
        </div>

        {/* Oracle Text */}
        <div className="space-y-2">
          <p className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Oracle Text
          </p>
          <div className="p-4 bg-accent/30 rounded-lg border">
            <p className="whitespace-pre-wrap text-sm leading-relaxed">
              {card.oracleText || "N/A"}
            </p>
          </div>
        </div>

        {/* Card Details Grid */}
        <div className="space-y-2">
          <p className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Card Details
          </p>
          <div className="grid grid-cols-2 gap-3 p-4 bg-accent/30 rounded-lg border">
            <div>
              <p className="font-semibold text-xs text-muted-foreground mb-1">
                Set
              </p>
              <p className="text-sm">
                {card.setName} ({card.set.toUpperCase()})
              </p>
            </div>
            <div>
              <p className="font-semibold text-xs text-muted-foreground mb-1">
                Rarity
              </p>
              <p className="capitalize text-sm">{card.rarity}</p>
            </div>
            <div>
              <p className="font-semibold text-xs text-muted-foreground mb-1">
                Artist
              </p>
              <p className="text-sm">{card.artist || "N/A"}</p>
            </div>
            <div>
              <p className="font-semibold text-xs text-muted-foreground mb-1">
                Released
              </p>
              <p className="text-sm">
                {new Date(card.releasedAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="font-semibold text-xs text-muted-foreground mb-1">
                Colors
              </p>
              <p className="text-sm">{card.colors || "Colorless"}</p>
            </div>
            <div>
              <p className="font-semibold text-xs text-muted-foreground mb-1">
                Color Identity
              </p>
              <p className="text-sm">{card.colorIdentity || "Colorless"}</p>
            </div>
            <div className="col-span-2">
              <p className="font-semibold text-xs text-muted-foreground mb-1">
                Keywords
              </p>
              <p className="text-sm">{card.keywords || "N/A"}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}