"use client";

import Brand from "../Brand";
import NavLink from "./NavLink";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { IconLoading } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function DashboardNavbar() {
  const { data: session } = useSession();

  const [isLogoutActive, setLogoutActive] = useState(false);
  const [isFeedbackFormOpen, setOpenFeedbackForm] = useState(false);

  const pathname = usePathname();

  return (
    <header className="border-b top-0 bg-white xl:sticky">
      <nav className="custom-screen-lg py-2 flex items-center justify-between flex-wrap text-sm sm:flex-nowrap">
        <div className="">
          <Brand href="/dashboard" />
        </div>
        <div className="order-2 flex-shrink-0 sm:order-3">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="outline-none">
              <Avatar className="w-10 h-10 relative ">
                <AvatarImage src={(session && session?.user?.image) || ""} />
                <AvatarFallback className="text-white text-sm font-medium bg-gradient-to-r from-teal-400 to-blue-500">
                  {session && session?.user?.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
                {isLogoutActive ? (
                  <IconLoading className="w-5 h-5 m-auto text-blue-600 absolute inset-0" />
                ) : (
                  ""
                )}
              </Avatar>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                side="bottom"
                align="end"
                className="w-60 mt-3 border shadow bg-white rounded-xl left-0 text-zinc-700 text-sm z-20"
              >
                <DropdownMenu.Label className="px-4 pt-4 text-zinc-800">
                  Signed in with
                </DropdownMenu.Label>
                <p className="text-zinc-600 px-4 py-2">
                  {session?.user?.email}
                </p>
                <DropdownMenu.Item asChild className="outline-none">
                  <Link
                    href="https://twitter.com/sidi_jeddou_dev"
                    target="_balnk"
                    className="block w-full px-4 py-2 hover:bg-zinc-100 duration-150 text-left"
                  >
                    Support
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild className="outline-none">
                  <div className="block py-1 border-t">
                    <button
                      className="block w-full px-4 py-2 hover:bg-zinc-100 duration-150 text-left"
                      onClick={() => {
                        setLogoutActive(true);
                        signOut({ callbackUrl: "/" });
                      }}
                    >
                      Log Out
                    </button>
                  </div>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </nav>
    </header>
  );
}
