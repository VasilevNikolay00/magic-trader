"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { useRouter, useSearchParams, usePathname } from "next/navigation"; // Import hooks

export default function OrderSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const setOrder = (order) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("order", order.toString());
    params.set("page", "0");
    router.push(`${pathname}?${params.toString()}`);
  };

  const setDir = (dir) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("dir", dir.toString());
    params.set("page", "0");
    router.push(`${pathname}?${params.toString()}`);
  };

  const setLanguage = (lang) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("lang", lang.toString());
    params.set("page", "0");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-card w-[90%] rounded-2xl h-[5%] items-center gap-4 flex flex-row">
      <Label className={"pl-10"}>Order By</Label>
      <div>
        <Select onValueChange={(value) => setOrder(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Release Date"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="releasedAt">Relase Date</SelectItem>
              <SelectItem value="set">Set</SelectItem>
              <SelectItem value="rarity">Rarity</SelectItem>
              <SelectItem value="color">Color</SelectItem>
              <SelectItem value="cmc">Mana Cost</SelectItem>
              <SelectItem value="artist">Artist</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Label>:</Label>
      <div>
        <Select onValueChange={(value) => setDir(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Auto"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="asc">Asc</SelectItem>
              <SelectItem value="desc">Desc</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Label className={"pl-10"}>Language</Label>
      <div>
        <Select onValueChange={(value) => setLanguage(value)}>
          <SelectTrigger>
            <SelectValue placeholder="English"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="en">Englsih</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="ar">Arabic</SelectItem>
              <SelectItem value="de">German</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="grc">Ancient Greek</SelectItem>
              <SelectItem value="he">Hebrew</SelectItem>
              <SelectItem value="it">Italian</SelectItem>
              <SelectItem value="ja">Japanese</SelectItem>
              <SelectItem value="ko">Korean</SelectItem>
              <SelectItem value="la">Latin</SelectItem>
              <SelectItem value="ph">Phyrexian</SelectItem>
              <SelectItem value="pt">Portuguese</SelectItem>
              <SelectItem value="qya">Quenya</SelectItem>
              <SelectItem value="ru">Russian</SelectItem>
              <SelectItem value="sa">Sanskrit</SelectItem>
              <SelectItem value="zhs">Simplified Chinese</SelectItem>
              <SelectItem value="zht">Traditional Chinese</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
