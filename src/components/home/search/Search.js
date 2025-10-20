"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
import ManaValueSelector from "./searchComponents/ManaValueSelector";
import PowerSelector from "./searchComponents/PowerSelector";
import TougnessSelector from "./searchComponents/ToughnessSelector copy";
import LoyaltySelector from "./searchComponents/LoyaltySelector";
import ManaColorSelector from "./searchComponents/ManaColorSelector";
import KeyWordsSelector from "./searchComponents/KeyWordsSelector";
import NameInput from "./searchComponents/NameInput";

export default function Search() {
  const [expand, setExpand] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const cardName = formData.get("cardName");
    const set = formData.get("set");
    const rarity = formData.get("rarity");
    const type = formData.get("type");
    const subType = formData.get("subType");
    const superType = formData.get("superType");
    const searchCardObj = {
      cardName,
      set,
      rarity,
      type,
      subType,
      superType,
    };
    console.log(searchCardObj);
  };

  return (
    <div className={`m-5 w-2/3 ${expand ? "max-h-screen" : ""}`}>
      <Card className={expand ? "flex flex-col h-full" : ""}>
        <CardHeader className={expand ? "flex-shrink-0" : ""}>
          <CardTitle>Card Search</CardTitle>
          <CardDescription>
            Search for MTG Cards throughout our local PSQL Database
          </CardDescription>
        </CardHeader>
        <CardContent className={expand ? "flex-1 overflow-auto" : ""}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <NameInput />
            <div className="flex gap-2">
              <Button type="submit">Submit</Button>
              <Button
                variant="outline"
                onClick={() => setExpand(!expand)}
                type="button"
              >
                {expand ? "Hide" : "Show"} Advanced Search
              </Button>
            </div>
            {expand && (
              <div className="mt-4 p-2 border flex flex-col space-y-4 rounded-md">
                <SetSelector />
                <RaritySelector />
                <TypeSelector />
                <SuperTypeSelector />
                <SubTypeSelector />
                <div className="flex flex-row gap-4">
                  <div className="border w-full rounded-md p-4 space-y-3">
                    <ManaColorSelector />
                    <ManaValueSelector />
                    <PowerSelector />
                    <TougnessSelector />
                    <LoyaltySelector />
                  </div>
                  <div className="border w-full rounded-md p-4">
                    <KeyWordsSelector />
                  </div>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
