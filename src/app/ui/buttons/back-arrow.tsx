"use client";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import { MoveLeftIcon } from "lucide-react";

export default function BackArrow({
  text = "Back",
  className,
}: {
  text?: string;
  className?: string;
}) {
  const router = useRouter();
  return (
    <Button type="button" onClick={() => router.back()} className={className}>
      <MoveLeftIcon />
    </Button>
  );
}
