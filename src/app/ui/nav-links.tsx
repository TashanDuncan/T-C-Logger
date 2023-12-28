"use client";
import Link from "next/link";
import HomeNavLink from "./components/home-nav-link";
import { Button } from "./components/ui/button";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function NavLinks({ links }: { links: JSX.Element[] }) {
  const [linkList] = useState<any[]>(links);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    linkList.find((link) => {
      return `/${link.props.href}` === pathname;
    }).props.className =
      "text-blue-600 flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium  hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3";
    router.refresh();
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
