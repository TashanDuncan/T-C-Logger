import { MobileNavigation } from "../ui/components/mobile-nav";
import { fetchItemCategories } from "../lib/data";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const itemCategories = await fetchItemCategories();

  return (
    <>
      <div className="md:hidden flex justify-center">
        <MobileNavigation categories={itemCategories} />
      </div>
      <div>{children}</div>
    </>
  );
}
