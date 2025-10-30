import Parser from "rss-parser";

let cachedNewsFeedData = null;
let lastFetchTime = 0;
const CACHE_LIFETIME = 3600 * 12 * 1000;

export async function fetchAllRssFeeds() {
  const now = Date.now();

  // If cached data exists and is still fresh, return it
  if (cachedNewsFeedData && now - lastFetchTime < CACHE_LIFETIME) {
    return cachedNewsFeedData;
  }

  console.log("Fetching fresh news feed data...");
  const parser = new Parser();

  const feedConfig = [
    { name: "edhrec", url: "https://edhrec.com/articles/feed/" },
    { name: "goldfish", url: "https://www.mtggoldfish.com/feed" },
    { name: "draftsim", url: "https://draftsim.com/feed" },
  ];

  const fetchedData = {};

  for (const config of feedConfig) {
    try {
      const feed = await parser.parseURL(config.url);
      // Assign items directly to the corresponding key in fetchedData
      fetchedData[config.name] = feed.items.map((item) => {
        return {
          title: item.title,
          link: item.link,
          contentSnippet: item.contentSnippet,
          source: feed.title,
        };
      });
    } catch (error) {
      console.error(`Error fetching feed from ${config.url}:`, error);
      fetchedData[config.name] = []; // Ensure an empty array if fetching fails
    }
  }

  cachedNewsFeedData = fetchedData;
  lastFetchTime = now;

  return cachedNewsFeedData;
}
