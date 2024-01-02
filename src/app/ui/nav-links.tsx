"use client";
import Link from "next/link";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { HomeIcon } from "lucide-react";

export default function NavLinks({ links }: { links: JSX.Element[] }) {
  const [linkList] = useState<JSX.Element[]>(links);
  const currentCategory = `/${usePathname().split("/")[1]}`;

  useEffect(() => {
    const activeCategoryLink = linkList.find((link) => {
      return link.props.href === currentCategory;
    });

    if (activeCategoryLink) {
      activeCategoryLink.props.className =
        "text-blue-600 flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium  hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3";
    }
  }, [currentCategory, linkList]);
  return (
    <>
      <Link
        href={"/"}
        className={clsx(
          "flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium  hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
          {
            "text-blue-600": currentCategory === "/",
          }
        )}
      >
        <HomeIcon />
      </Link>
      {linkList}
      <Link
        href={"/items/new"}
        className={
          "flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium  hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        }
      ></Link>
    </>
  );
}
