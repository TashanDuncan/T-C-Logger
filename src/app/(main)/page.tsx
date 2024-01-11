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
      <main className="flex justify-center items-center flex-col px-12 md:px-24 md:p-24">
        <div className="md:absolute md:flex self-start">
          <Logo />
        </div>
        <div className="flex md:w-[500px] md:text-balance">
          <p>
            We are Tashan and Christina, we met in 2022 and have been together
            ever since. As a couple, we like going out for food, or for some
            type of activity but we mainly like staying in and we like watching
            anime, playing computer games, listening to music from our playlist
            and code. Well, mainly Tashan teaches me how to code and together we
            created this site. We created this site to record things and places
            we experienced together and leave our honest reviews.
          </p>
        </div>
      </main>
    </>
  );
}
