import { Item, ItemContent, ItemTitle, ItemDescription } from "@/components/ui/item";

export default function RulingLoading() {
  return (
    <div className="bg-card/50 shadow-xl rounded-2xl flex flex-col border gap-2 p-2 h-full w-full overflow-hidden">
      {/* Create 3 fake loading items */}
      {[1, 2, 3].map((i) => (
        <Item key={i} className="bg-card/50 shadow-xl animate-pulse">
          <ItemContent>
            {/* Fake Date */}
            <ItemTitle>
              <div className="h-4 w-24 bg-primary/20 rounded mb-2" />
            </ItemTitle>
            {/* Fake Text lines */}
            <ItemDescription>
              <div className="space-y-2">
                <div className="h-3 w-full bg-muted/50 rounded" />
                <div className="h-3 w-3/4 bg-muted/50 rounded" />
              </div>
            </ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  );
}