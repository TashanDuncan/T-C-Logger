import Link from "next/link";
import NavLinks from "@/app/ui/nav-links";
import Image from "next/image";
import { fetchItemTypes } from "../lib/data";
import clsx from "clsx";
import { headers } from "next/headers";

export default async function SideNav() {
  const res = await fetchItemTypes();

  const headersList = headers();
  const header_url = headersList.get("x-url") || "";
  const pathname = headersList.get("x-pathname");
  const origin_url = headersList.get("x-origin");
  console.log(header_url, pathname, origin_url);
  const initialLinks = res.map((i, index) => (
    <Link
      key={i.id}
      href={i.name}
      className={clsx(
        "flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium  hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
        {
          // "text-blue-600": pathname?.startsWith(`/${i.name}`),
        }
      )}
    >
      <p className="hidden md:block">{i.description}</p>
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
        <NavLinks links={initialLinks} />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <form>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
