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
import { useState } from "react";
import { Input } from "../ui/input";

export default function OrderSelector() {
  const [searchTerm, setSearchTerm] = useState("");
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

  const setSize = (size) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("size", size.toString());
    params.set("page", "0");
    router.push(`${pathname}?${params.toString()}`);
  };

  const findByName = () => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("name", searchTerm.toString());
    params.set("page", "0");
    router.push(`${pathname}?${params.toString()}`);
  };
  console.log("search: " + searchTerm);

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
      <div className="w-4/5 bg-red h-full"></div>
      <div className="flex flex-row gap-4 pr-10 justify-end w-full">
        <form onSubmit={findByName}>
          <Input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Card Name..."
            value={searchTerm}
          />
        </form>
        <Label className={"pl-10 "}>Size</Label>
        <Select onValueChange={(value) => setSize(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Auto"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
