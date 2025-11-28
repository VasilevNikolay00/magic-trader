"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Archive, Loader2 } from "lucide-react";
import { addToCollection } from "@/lib/addToCollection";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export function CollectionForm({
  cardId,
  currentQuantity = 0,
}) {
  const [quantity, setQuantity] = useState(currentQuantity);
  const [isPending, startTransition] = useTransition();
  const { user } = useAuth();

  const handleAddToCollection = () => {
    startTransition(async () => {
      try {
        const result = await addToCollection({ cardId, quantity });
        toast.success("Collection updated successfully!");
        console.log("Success:", result);
      } catch (error) {
        toast.error(error.message || "Failed to update collection.");
        console.error("Failure:", error);
      }
    });
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(0, prevQuantity - 1));
  };

  if(user){
  return (
    <div className="flex w-full items-center justify-center gap-4">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          className="h-8 w-8 shrink-0"
          onClick={handleDecrement}
          disabled={quantity <= 0 || isPending} // Disable while pending
        >
          <Minus className="h-4 w-4" />
          <span className="sr-only">Decrease quantity</span>
        </Button>

        <p className="w-8 text-center text-lg font-semibold">{quantity}</p>

        <Button
          variant="outline"
          className="h-8 w-8 shrink-0"
          onClick={handleIncrement}
          disabled={isPending} // Disable while pending
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Increase quantity</span>
        </Button>
      </div>

      <Button
        className="w-28 flex-grow sm:flex-grow-0"
        onClick={handleAddToCollection}
        disabled={isPending || quantity === currentQuantity} // Disable if no change or pending
      >
        {isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Archive className="mr-2 h-4 w-4" />
        )}
        {isPending ? "Saving..." : "Save"}
      </Button>
    </div>
  );
  }else{
    return ;
  }
}
