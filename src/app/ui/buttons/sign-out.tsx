import { signOut } from "@/auth";
import { Button } from "../components/ui/button";

export default function SignOutButton({ className }: { className?: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button className={className}>Sign Out</Button>
    </form>
  );
}
