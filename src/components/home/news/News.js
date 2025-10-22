import NewsPost from "./NewsPost";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { fetchAllRssFeeds } from "@/lib/rss";

export default async function News() {
  const rssFeed = await fetchAllRssFeeds();
  return (
    <div className="m-5 w-1/3 flex-1 h-full">
      <Card className="flex flex-col h-full">
        <CardHeader className="flex-shrink-0">
          <CardTitle>News</CardTitle>
        </CardHeader>
        {/* Make CardContent a flex container and let it grow */}
        <CardContent className="w-full flex-1 flex flex-col overflow-hidden">
          {" "}
          {/* Added flex flex-col */}
          <NewsPost rssFeed={rssFeed} />
        </CardContent>
      </Card>
    </div>
  );
}
