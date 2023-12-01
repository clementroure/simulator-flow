"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
  {
    value: "custom",
    label: "Custom",
  },
];

export function ComboboxDemo({
  connectedOutputs,
  onCustomSelected,
  onNonCustomSelected,
  onValueChange,
}: any) {
  const [open, setOpen] = React.useState(false);

  // Combine connectedOutputs with frameworks
  const options = [
    ...connectedOutputs.map((outputName: any) => ({
      value: outputName,
      label: outputName,
    })),
    ...frameworks,
  ];

  // Set initial value to the first option if available
  const [value, setValue] = React.useState(
    options.length > 0 ? options[0].value : ""
  );

  // Update the value if the current value is no longer in the options
  React.useEffect(() => {
    if (!options.some((option) => option.value === value)) {
      setValue(options.length > 0 ? options[0].value : "");
    }
  }, [options, value]);

  const handleSelect = (currentValue: string) => {
    setValue(currentValue);
    setOpen(false);

    if (currentValue === "custom") {
      onCustomSelected();
      onValueChange(""); // Reset the value
    } else {
      onNonCustomSelected && onNonCustomSelected();
      onValueChange && onValueChange(currentValue); // Pass the selected value back
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={() => handleSelect(option.value)} // Call handleSelect directly
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
