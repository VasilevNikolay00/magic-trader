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
import SetSelector from "./SetSelector";
import RaritySelector from "./RaritySelector";
import TypeSelector from "./TypeSelector";
import SuperTypeSelector from "./SuperTypeSelector";
import SubTypeSelector from "./SubTypeSelector";

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
    const supertype = formData.get("supertype");

    const searchCardObj = {
      cardName,
      set,
      rarity,
      type,
      subType,
      supertype,
    };
  };

  return (
    <div className="w-2/3 m-5 flex flex-col">
      <Card>
        <CardHeader>
          <CardTitle>Card Search</CardTitle>
          <CardDescription>
            Search for MTG Cards throughout our local PSQL Database
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <FieldSet>
                <Field>
                  <FieldLabel>Card Name</FieldLabel>
                  <FieldDescription>
                    Search by name or phrase in the name of the card
                  </FieldDescription>
                  <Input
                    id="cardName"
                    name="cardName"
                    required
                    placeholder="Phyrexian Arena"
                  />
                </Field>
              </FieldSet>

              <Field orientation="horizontal">
                <Button type="submit">Submit</Button>
                <Button
                  variant="outline"
                  onClick={() => setExpand(!expand)}
                  type="button"
                >
                  {expand ? "Hide" : "Show"} Advanced Search
                </Button>
              </Field>
              {expand && (
                <FieldGroup>
                  <SetSelector />
                  <RaritySelector />
                  <TypeSelector />
                  <SuperTypeSelector />
                  <SubTypeSelector />
                </FieldGroup>
              )}
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
