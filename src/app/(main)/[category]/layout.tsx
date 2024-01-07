import SideNav from "@/app/ui/components/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64 border-r-2  border-r-blue-600">
        <SideNav />
      </div>
      <div className="flex-grow py-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
