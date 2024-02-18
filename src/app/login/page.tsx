import Image from "next/image";
import { getCurrentUser } from "../lib/session";
import SignOutButton from "../ui/buttons/sign-out";
import Profiles from "./profiles";
import Link from "next/link";
import { Button } from "../ui/components/ui/button";

export default async function Page() {
  const user = await getCurrentUser();

  return !!user ? (
    <div className="absolute flex flex-col justify-center items-center top-[25%] w-full">
      <Image
        src={user.image || ""}
        alt={""}
        width={200}
        height={200}
        className="w-[200px] h-[200px] cursor-pointer"
      />
      <span className="text-sm italic">Signed in as {user.name}</span>
      <div className="flex justify-between items-center gap-2">
        <SignOutButton />
        <Link href={"/"}>
          <Button>Home</Button>
        </Link>
      </div>
    </div>
  ) : (
    <Profiles />
  );
}
