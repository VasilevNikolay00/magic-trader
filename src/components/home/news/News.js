import NewsPost from "./NewsPost";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { fetchAllRssFeeds } from "@/lib/rss";

export default async function News() {
  const rssFeed = await fetchAllRssFeeds();
  return (
    <Card className="m-5 w-1/3 flex flex-col max-h-screen">
      <CardHeader className="flex-shrink-0">
        <CardTitle>News</CardTitle>
      </CardHeader>
      <CardContent className="w-full flex-1 overflow-hidden">
        <NewsPost rssFeed={rssFeed} />
      </CardContent>
    </Card>
  );
}
