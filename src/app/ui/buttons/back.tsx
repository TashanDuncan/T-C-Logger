"use client";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import { MoveLeftIcon, ShowerHead } from "lucide-react";

export default function BackButton({
  text = "Back",
  className,
  showArrow,
}: {
  text?: string;
  className?: string;
  showArrow?: boolean;
}) {
  const router = useRouter();
  return (
    <Button type="button" onClick={() => router.back()} className={className}>
      {showArrow && <MoveLeftIcon />}
      {text}
    </Button>
  );
}
