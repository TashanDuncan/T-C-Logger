import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { item_types } from "@prisma/client";
import { fetchItemTypes } from "@/app/lib/data";
import HomeNavLink from "../components/home-nav-link";
import { Button } from "../components/ui/button";

export default async function NavLinks({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const itemTypes = await fetchItemTypes();

  return (
    <>
      <HomeNavLink />
      {itemTypes.map((itemType) => {
        return (
          <Link
            key={itemType.id}
            href={itemType.name}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium  hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "text-blue-600": searchParams?.query?.includes(itemType.name),
              }
            )}
          >
            <p className="hidden md:block">{itemType.description}</p>
          </Link>
        );
      })}
      <Link
        href={"/items/new"}
        className={
          "flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium  hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        }
      >
        <Button className="hidden md:block text-center">Add New</Button>
      </Link>
    </>
  );
}
