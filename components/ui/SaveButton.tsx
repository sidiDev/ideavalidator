import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconLoading } from "@/components/icons";
import { MouseEventHandler } from "react";

export default function SaveButton({
  onSave,
  isLoading,
}: {
  onSave?: MouseEventHandler;
  isLoading?: boolean;
}) {
  return (
    <div className="sticky inset-x-0 bottom-4">
      <div className="flex items-center justify-between px-1 py-1 shadow bg-white border rounded-full max-w-[180px] mx-auto text-sm">
        <div className="flex items-center gap-x-2 text-neutral-700 ml-2">
          <Info className="w-3.5 h-3.5 text-neutral-500" />
          Unsaved
        </div>
        <Button
          onClick={onSave}
          disabled={isLoading}
          size="sm"
          className="w-12 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-xs py-2 h-7"
        >
          {isLoading ? <IconLoading /> : "Save"}
        </Button>
      </div>
    </div>
  );
}
