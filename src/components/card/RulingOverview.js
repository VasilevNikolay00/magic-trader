import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

export default function RulingOverview({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col border rounded-2xl justify-cente gap-2 p-2 h-full w-full overflow-auto">
        <Item className=" border-3 border-primary">
          <ItemContent>
            <ItemTitle>No rulings for this card yet!</ItemTitle>
          </ItemContent>
        </Item>
      </div>
    );
  }

  return (
    <div className="flex flex-col border rounded-2xl gap-2 p-2 h-full w-full overflow-auto">
      {data.map((ruling, i) => (
        <Item key={i} className=" border-3 border-primary">
          <ItemContent>
            <ItemTitle>{ruling.publishedAt}</ItemTitle>
            <ItemDescription>{ruling.comment}</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  );
}
