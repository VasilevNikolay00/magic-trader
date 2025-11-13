import NewsPost from "./NewsPost";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { fetchAllRssFeeds } from "@/lib/rss";
import { Newspaper } from "lucide-react";

export default async function News() {
  const rssFeed = await fetchAllRssFeeds();

  return (
    <div className="w-1/3 flex-1 h-full">
      <Card className="flex flex-col h-full bg-accent/50 backdrop-blur-lg shadow-2xl">
        <CardHeader className="flex-shrink-0 space-y-1 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Newspaper className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">News</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="w-full flex-1 flex flex-col overflow-hidden px-6 pb-6">
          <div className="flex-1 overflow-hidden bg-accent/20 border-2 rounded-xl shadow-inner">
            <NewsPost rssFeed={rssFeed} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
