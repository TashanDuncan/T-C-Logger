import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/components/ui/dropdown-menu";
import { Button } from "./ui/components/ui/button";
import Link from "next/link";
import { fetchItemCategories } from "./lib/data";
import Image from "next/image";
import Logo from "./ui/components/logo";
import { ThemeToggle } from "./ui/components/theme-toggle";
import { MobileNavigation } from "./ui/components/mobile-nav";

export default async function Home() {
  const itemCategories = await fetchItemCategories();
  return (
    <>
      <div className="hidden md:block">
        <MobileNavigation categories={itemCategories} />
      </div>
      <main className="flex justify-center items-center flex-col p-24">
        <div className="md:absolute md:flex self-start">
          <Logo />
        </div>
      </main>
    </>
  );
}
