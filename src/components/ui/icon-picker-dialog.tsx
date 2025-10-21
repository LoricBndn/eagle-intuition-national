"use client";
import { useState } from "react";
import { IconRenderer, useIconPicker } from "@/components/ui/icon-picker";
import Button from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface IconPickerDialogProps {
  selectedIcon: string | null;
  onIconSelect: (icon: string) => void;
}

export const IconPickerDialog = ({ selectedIcon, onIconSelect }: IconPickerDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          {selectedIcon ? (
            <>
              <IconRenderer className="size-4 text-white" icon={selectedIcon} />
              Update
            </>
          ) : (
            "Select"
          )}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select an Icon</DialogTitle>
          <DialogDescription>Choose the best suited icon</DialogDescription>
        </DialogHeader>

        <IconPicker
          onChange={(icon) => {
            onIconSelect(icon);
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

// --- IconPicker (inchangé) ---
export const IconPicker = ({ onChange }: { onChange: (icon: string) => void }) => {
  const { search, setSearch, icons } = useIconPicker();

  return (
    <div className="relative">
      <Input
        placeholder="Search..."
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-2"
      />

      <div className="mt-2 flex h-full max-h-[400px] flex-wrap gap-2 overflow-y-scroll py-4 pb-12">
        {icons.map(({ name, Component }) => {
          const IconComponent = Component as React.ElementType;
          return (
            <Button key={name} type="button" onClick={() => onChange(name)} className="h-11 flex items-center justify-center gap-1">
              <IconComponent className="!size-6 shrink-0" />
              <span className="sr-only">{name}</span>
            </Button>
          );
        })}

        {icons.length === 0 && (
          <div className="col-span-full flex grow flex-col items-center justify-center gap-2 text-center">
            <p>No icons found...</p>
            <Button onClick={() => setSearch("")} type="button" className="bg-gray-100 text-gray-600 hover:bg-gray-200">
              Clear search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
