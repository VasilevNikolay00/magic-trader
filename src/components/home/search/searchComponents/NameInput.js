"use client";
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function NameInput() {
  return (
    <FieldSet className={"mb-2"}>
      <Field>
        <FieldLabel>Card Name</FieldLabel>
        <FieldDescription>
          Search by name or phrase in the name of the card
        </FieldDescription>
        <Input
          id="cardName"
          name="cardName"
          placeholder="Phyrexian Arena"
          className="p-6"
        />
      </Field>
    </FieldSet>
  );
}
