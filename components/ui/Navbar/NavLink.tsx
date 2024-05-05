import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function NavLink({
  children,
  href = "",
  className = "",
  active = "",
  ...props
}: {
  children: ReactNode;
  href: string;
  className?: string;
  active?: string;
}) {
  const pathname = usePathname();

  const isActive = pathname == href;
  const activeClass = isActive ? active : "";

  return (
    <li
      className={`py-3 border-b-[1.5px] ${
        isActive ? activeClass : "border-transparent"
      }`}
    >
      <Link
        {...props}
        href={href}
        className={cn(
          "block py-1.5 px-3 rounded-lg text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 duration-150",
          className
        )}
      >
        {children}
      </Link>
    </li>
  );
}
