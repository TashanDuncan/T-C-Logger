"use client";
import Link from "next/link";
import clsx from "clsx";
import { fetchItemTypes } from "@/app/lib/data";
import HomeNavLink from "./components/home-nav-link";
import { Button } from "./components/ui/button";
import { headers } from "next/headers";
import { JSXElementConstructor, useEffect, useState } from "react";
import { item_types } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";

export default function NavLinks({ links }: { links: JSX.Element[] }) {
  const [linkList] = useState<any[]>(links);
  const pathname = usePathname();

  useEffect(() => {
    linkList.find((link) => {
      return `/${link.props.href}` === pathname;
    }).props.className =
      "text-blue-600 flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium  hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3";
  }, [pathname, linkList]);
  return (
    <>
      <HomeNavLink />
      {linkList}
      <Link
        href={"/items/new"}
        className={
          "flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium  hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        }
      >
        <Button className="hidden md:block">Add New</Button>
      </Link>
    </>
  );
}
