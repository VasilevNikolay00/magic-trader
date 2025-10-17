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

export default function SubTypeSelector() {
  const [subType, setSubType] = useState("");

  return (
    <div>
      <Label>Sub Type</Label>
      <input type="hidden" name="subType" value={subType} />
      <ComboboxSet data={data} subType={subType} setSubType={setSubType} />
    </div>
  );
}

function ComboboxSet({ data, subType, setSubType }) {
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
          {subType || "Select sub type..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="PopoverContent">
        <Command>
          <CommandInput
            placeholder="Search sub type..."
            value={search}
            onValueChange={setSearch}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No sub-types found.</CommandEmpty>
            <CommandGroup>
              {filteredData.map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={() => {
                    setSubType(item);
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
