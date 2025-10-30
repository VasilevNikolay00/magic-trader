import Image from "next/image";
import { Button } from "../ui/button";
import { Item, ItemContent } from "../ui/item";

export default function CardLinksOverview({ data }) {
  return (
    <div className=" relative flex border p-2 rounded-2xl gap-2 flex-col">
      <a href={data.purchaseUrisTcgplayer} className="w-full">
        <Button
          size="lg"
          className="w-full relative"
          variant="outline"
          target="_blank"
        >
          <Image
            src="/logos/tchplayer.png"
            alt="TCGPlayer"
            width={90}
            height={200}
            className="inline-block mr-2"
          />
        </Button>
      </a>
      <a href={data.purchaseUrisCardmarket} className="w-full">
        <Button size="lg" className="w-full" variant="outline" target="_blank">
          <Image
            src="/logos/cardmarket.png"
            alt="CardMarket"
            width={120}
            height={200}
            className="inline-block mr-2"
          />
        </Button>
      </a>
      <a href={data.purchaseUrisCardhoarder} className="w-full">
        <Button size="lg" className="w-full" variant="outline" target="_blank">
          <Image
            src="/logos/cardhoarder.png"
            alt="CardHoarder"
            width={120}
            height={200}
            className="inline-block mr-2"
          />
        </Button>
      </a>
      <Item>
        <ItemContent>
          <span>More to be added soon!</span>
        </ItemContent>
      </Item>
    </div>
  );
}
