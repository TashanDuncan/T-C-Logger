"use client";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";

export default function BackButton({
  children = "Back",
  className,
}: {
  children?: string | JSX.Element;
  className?: string;
}) {
  const router = useRouter();
  return (
    <Button type="button" onClick={() => router.back()} className={className}>
      {children}
    </Button>
  );
}
