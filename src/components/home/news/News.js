import { Suspense } from "react";
import NewsPost from "./NewsPost";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { fetchAllRssFeeds } from "@/lib/rss";
import { Newspaper } from "lucide-react";

// 1. The Async Component that fetches data
async function NewsList() {
  // This triggers the suspense boundary while waiting
  const rssFeed = await fetchAllRssFeeds();
  return <NewsPost rssFeed={rssFeed} />;
}

function NewsSkeleton() {
  return (
    <div className="space-y-4 p-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="h-5 w-3/4 bg-muted/40 animate-pulse rounded" />
          <div className="h-3 w-1/4 bg-muted/30 animate-pulse rounded" />
          {i !== 4 && <div className="h-px w-full bg-border/50 mt-2" />}
        </div>
      ))}
    </div>
  );
}

export default function News() {
  return (
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
        <div className="flex-1 overflow-hidden bg-accent/20 border-2 rounded-xl shadow-inner relative">

          <Suspense fallback={<NewsSkeleton />}>
            <NewsList />
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
}