import Link from "next/link";
import NavLinks from "@/app/ui/components/nav-links";
import Image from "next/image";
import { fetchItemCategories } from "../../lib/data";
import { ThemeToggle } from "./theme-toggle";
import { signOut } from "@/auth";

export default async function SideNav() {
  const itemCategories = await fetchItemCategories();
  const itemCategoryLinks = itemCategories?.map((category) => (
    <Link
      key={category.id}
      href={`/${category.slug}`}
      className={
        "flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium  hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
      }
    >
      <p>{category.description}</p>
    </Link>
  ));

  return (
    <div className="hidden md:flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="my-2 flex h-20 items-end justify-start rounded-md p-4 md:h-40"
        href="/"
      >
        <Image
          src="/tandc.jpg"
          height={200}
          width={300}
          className="hidden md:block"
          alt="Screenshots of the dashboard project showing desktop version"
        />
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        {itemCategoryLinks && <NavLinks links={itemCategoryLinks} />}
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <span>Signed in as Tashan</span>
        <div className="flex justify-between">
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
              <div className="hidden md:block">Sign Out</div>
            </button>
          </form>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
