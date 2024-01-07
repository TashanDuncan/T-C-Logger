import { fetchItemCategories } from "../lib/data";
import Logo from "../ui/components/logo";

import { MobileNavigation } from "../ui/components/mobile-nav";

export default async function Home() {
  const itemCategories = await fetchItemCategories();
  return (
    <>
      <div className="hidden md:block">
        <MobileNavigation categories={itemCategories} />
      </div>
      <main className="flex justify-center items-center flex-col px-24 md:p-24">
        <div className="md:absolute md:flex self-start">
          <Logo />
        </div>
      </main>
    </>
  );
}
