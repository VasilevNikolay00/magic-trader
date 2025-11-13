import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

export default function RulingOverview({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-card/50 shadow-xl rounded-2xl flex flex-col border justify-cente gap-2 p-2 h-full w-full overflow-auto">
        <Item className=" border-3 border-primary">
          <ItemContent>
            <ItemTitle>No rulings for this card yet!</ItemTitle>
          </ItemContent>
        </Item>
      </div>
    );
  }

  return (
    <div className="bg-card/50 shadow-xl rounded-2xl flex flex-col border  gap-2 p-2 h-full w-full overflow-auto">
      {data.map((ruling, i) => (
        <Item key={i} className="bg-card/50 shadow-xl">
          <ItemContent>
            <ItemTitle>{ruling.publishedAt}</ItemTitle>
            <ItemDescription>{ruling.comment}</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  );
}
