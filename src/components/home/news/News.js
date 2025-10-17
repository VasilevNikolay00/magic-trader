import NewsPost from "./NewsPost";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { fetchAllRssFeeds } from "@/lib/rss";

export default async function News() {
  const rssFeed = await fetchAllRssFeeds();

  return (
    <Card className="m-5 flex w-1/3 flex-col">
      <CardHeader>
        <CardTitle>News</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <NewsPost rssFeed={rssFeed} />
      </CardContent>
    </Card>
  );
}
