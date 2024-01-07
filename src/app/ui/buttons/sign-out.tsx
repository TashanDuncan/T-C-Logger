import { signOut } from "@/auth";
import { Button } from "../components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";

export default function SignOutButton({
  className,
  variant,
}: {
  className?: string;
  variant?: "outline";
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant={variant} className={className}>
          Sign Out
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want to Sign Out?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <AlertDialogAction type="submit">
              Yes, Sign me out!
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
