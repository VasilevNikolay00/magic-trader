import News from "@/components/home/news/News";
import Search from "@/components/home/search/Search.js";

export default function Home() {
  return (
    <div className="py-4 gap-4 flex flex-row h-[90%] justify-center">
      <Search />
      <News />
    </div>
  );
}
