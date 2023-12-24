"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export function HomeNavLink() {
  const pathname = usePathname();
  return (
    <Link
      href={"/"}
      className={clsx(
        "flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium  hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
        {
          "text-blue-600": pathname === "/",
        }
      )}
    >
      <p className="hidden md:block">Home</p>
    </Link>
  );
}

export default HomeNavLink;
