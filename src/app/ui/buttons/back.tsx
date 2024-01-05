"use client";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";

export default function BackButton({
  text = "Back",
  className,
}: {
  text?: string;
  className?: string;
}) {
  const router = useRouter();
  return (
    <Button type="button" onClick={() => router.back()} className={className}>
      {text}
    </Button>
  );
}
