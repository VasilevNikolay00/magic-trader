const { Button } = require("@/components/ui/button");
const { Label } = require("@radix-ui/react-dropdown-menu");
const { useState } = require("react");

export default function ManaColorSelector() {
  const [colorStates, setColorStates] = useState(
    new Map([
      ["W", false],
      ["U", false],
      ["B", false],
      ["R", false],
      ["G", false],
      ["C", false],
    ])
  );

  const toggleColor = (color) => {
    setColorStates(() => {
      const newMap = new Map(colorStates);
      newMap.set(color, !newMap.get(color));
      return newMap;
    });
  };

  const getActiveColors = () => {
    return Array.from(colorStates.keys())
      .filter((color) => colorStates.get(color))
      .join("");
  };

  return (
    <div>
      <input type="hidden" name="colors" value={getActiveColors()} />
      <Label>Colors</Label>
      <div className="flex mt-1 flex-wrap gap-2 w-full justify-">
        {Array.from(colorStates.keys()).map((color) => (
          <Button
            key={color}
            variant={"colorless"}
            className={`text-xl border  flex-1 ${
              colorStates.get(color)
                ? "dark:bg-primary dark:hover:bg-primary/90"
                : "dark:bg-accent  dark:hover:bg-input"
            }`}
            onClick={() => toggleColor(color)}
          >
            {color}
          </Button>
        ))}
      </div>
    </div>
  );
}
