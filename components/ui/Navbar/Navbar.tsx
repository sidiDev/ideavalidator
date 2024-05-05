"use client";

import Brand from "../Brand";
import ButtonLogin from "../ButtonLogin";
import NavLink from "./NavLink";
import { useSession } from "next-auth/react";
import { ArrowRight } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header>
      <nav className="custom-screen-lg flex items-center justify-between gap-x-3 py-2">
        <div className="">
          <Brand href="https://rapidforms.co" />
        </div>
        <ul>
          {session && session.user ? (
            <NavLink
              href="/dashboard"
              className="text-neutral-700 bg-neutral-50 border text-sm font-medium"
            >
              Dashboard
            </NavLink>
          ) : (
            <ButtonLogin
              icon={<ArrowRight className="w-4 h-4" />}
              className="w-full flex py-1.5 px-3 rounded-lg hover:text-zinc-900 hover:bg-zinc-100 duration-150 text-neutral-700 bg-neutral-50 border text-sm font-medium"
            >
              Login
            </ButtonLogin>
          )}
        </ul>
      </nav>
    </header>
  );
}
