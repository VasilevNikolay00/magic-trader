"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SetSelector from "./searchComponents/SetSelector";
import RaritySelector from "./searchComponents/RaritySelector";
import TypeSelector from "./searchComponents/TypeSelector";
import SuperTypeSelector from "./searchComponents/SuperTypeSelector";
import SubTypeSelector from "./searchComponents/SubTypeSelector";
import ManaCostSelector from "./searchComponents/ManaCostSelector";
import ColorSelector from "./searchComponents/ColorSelector";
import KeyWordsSelector from "./searchComponents/KeyWordsSelector";
import NameInput from "./searchComponents/NameInput";
import { Search as SearchIcon } from "lucide-react";

export default function Search() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const searchParams = new URLSearchParams();

    const superTypeValue = formData.get("superType") || "";
    const subTypeValue = formData.get("subType") || "";
    const typeValue = formData.get("type") || "";

    let combinedValue = "";
    if (subTypeValue && !superTypeValue && !typeValue) {
      combinedValue = subTypeValue.toLocaleLowerCase();
    } else if (superTypeValue || typeValue) {
      combinedValue = `
        ${superTypeValue && superTypeValue.toLocaleLowerCase()} ${
        typeValue && typeValue.toLocaleLowerCase()
      } ${subTypeValue && `— ${subTypeValue.toLocaleLowerCase()}`}`
        .trim()
        .replace(/\s+/g, " ");
    }

    if (combinedValue) {
      searchParams.append("typeLine", combinedValue);
    }

    for (let [key, value] of formData.entries()) {
      if (value && key !== "superType" && key !== "subType" && key !== "type") {
        searchParams.append(key, value);
      }
    }

    const queryString = searchParams.toString();
    window.location.href = `/cards${queryString ? `?${queryString}` : ""}`;
  };

  return (
    <div className="w-2/3 flex-1 h-full">
      <Card className="flex flex-col h-full shadow-xl bg-card/50 backdrop-blur-2xl">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <SearchIcon className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Card Search</CardTitle>
          </div>
          <CardDescription className="text-base">
            Search for MTG Cards throughout our local PSQL Database
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden px-6 pb-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 h-full">
            {/* Search Input */}
            <div className="space-y-2">
              <NameInput />
            </div>

            {/* Advanced Filters Section */}
            <div className="flex-1 overflow-hidden bg-accent/20 border-2 rounded-xl shadow-inner">
              <div className="flex flex-col h-full">
                {/* Scrollable filters area */}
                <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      Basic Filters
                    </h3>
                    <div className="grid gap-4">
                      <SetSelector />
                      <RaritySelector />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      Card Type
                    </h3>
                    <div className="grid gap-4">
                      <TypeSelector />
                      <SuperTypeSelector />
                      <SubTypeSelector />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      Attributes
                    </h3>
                    <div className="grid gap-4">
                      <KeyWordsSelector />
                      <div className=" border rounded-lg p-5 space-y-4 shadow-sm">
                        <ColorSelector />
                        <div className=" pt-4">
                          <ManaCostSelector />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full font-semibold text-base transition-all duration-200 hover:scale-[1.02] shadow-md"
            >
              <SearchIcon className="w-4 h-4 mr-2" />
              Search Cards
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
