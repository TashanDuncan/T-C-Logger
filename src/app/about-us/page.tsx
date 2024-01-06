import Link from "next/link";
import Logo from "../ui/components/logo";

export default function Page() {
  return (
    <Link href={"/"} className="md:absolute md:flex">
      <Logo />
    </Link>
  );
}
