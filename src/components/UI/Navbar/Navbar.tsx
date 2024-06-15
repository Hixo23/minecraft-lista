"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Profile } from "../Profile/Profile";
import { Button } from "@nextui-org/react";

export const Navbar = () => {
  const pathName = usePathname();
  const { data } = useSession();
  return (
    <header className="w-screen h-16 flex p-8 items-center justify-between border-b-2 border-b-[#303030]">
      {pathName === "/" ? (
        <h1 className="text-xl font-bold">Serwery-MC</h1>
      ) : (
        <Link className="text-xl font-bold" href="/">
          Serwery-MC
        </Link>
      )}
      <nav className="flex gap-4">
        <Link href="/add">Dodaj serwer</Link>
        <Link href="/random">Losowy serwer</Link>
      </nav>
      {data?.user ? (
        <Profile user={data.user} />
      ) : (
        <Button onClick={() => signIn("discord")}>Zaloguj sie</Button>
      )}
    </header>
  );
};
