"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import data from "@/components/home/search/cardSubTypeData.json";
import { Label } from "@radix-ui/react-dropdown-menu";

export default function TypeSelector() {
  const [type, setType] = useState("");

  return (
    <div className="flex flex-col">
      <Label>Type</Label>
      <input type="hidden" name="type" value={type}></input>
      <ComboboxSet data={data} type={type} setType={setType} />
    </div>
  );
}

function ComboboxSet({ data, type, setType }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredData = data
    .filter((item) => item.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 10);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {type || "Select type..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="PopoverContent">
        <Command>
          <CommandInput
            placeholder="Search type..."
            value={search}
            onValueChange={setSearch}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No type found.</CommandEmpty>
            <CommandGroup>
              {filteredData.map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={() => {
                    setType(item);
                    setSearch("");
                    setOpen(false);
                  }}
                >
                  {item}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
