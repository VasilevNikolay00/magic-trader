import News from "@/components/home/news/News";
import Search from "@/components/home/search/Search.js";

export default function Home() {
  return (
    <div className="py-4 gap-4 flex flex-row h-[90%] justify-center">
      <div className="w-2/3">
      <Search />
      </div>
      <div className="w-1/3">
      <News />
      </div>
    </div>
  );
}
