import Image from "next/image";
import { Button } from "../ui/components/ui/button";
import Link from "next/link";

export default function ProfileSelection({
  setSelectedProfile,
}: {
  setSelectedProfile: any;
}) {
  return (
    <div className="absolute flex flex-col justify-center items-center top-[25%] w-full">
      <h1 className="text-center font-extrabold text-xl my-4">Who are you?</h1>
      <div className="flex justify-around items-center flex-wrap gap-8 text-center">
        <div>
          <Image
            src="/tashan.jpg"
            alt={""}
            width={200}
            height={200}
            className="w-[200px] h-[200px] cursor-pointer"
            onClick={() =>
              setSelectedProfile({
                name: "Tashan",
                image: "/tashan.jpg",
                email: "tashan@test.com",
              })
            }
          />
          <span>Tashan</span>
        </div>
        <div>
          <Image
            src="/christina.png"
            alt={""}
            width={200}
            height={200}
            className="w-[200px] h-[200px] cursor-pointer"
            onClick={() =>
              setSelectedProfile({
                name: "Christina",
                image: "/christina.png",
                email: "christina@test.com",
              })
            }
          />
          <span>Christina</span>
        </div>
        <Link href={"/"}>
          <Image
            src="/guest.png"
            alt={""}
            width={200}
            height={200}
            className="w-[200px] h-[200px]"
          />
          <span>Guest</span>
        </Link>
      </div>
      <Button className="my-8">Manage Profiles</Button>
    </div>
  );
}
