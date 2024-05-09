import { cn } from "@/lib/utils";

export default function Heading({ ...props }) {
  return (
    <h2 className={cn("text-lg font-semibold", props.className || "")}>
      {props.children}
    </h2>
  );
}
