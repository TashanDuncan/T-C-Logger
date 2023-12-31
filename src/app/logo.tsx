"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

export default function Logo() {
  const { theme } = useTheme();
  console.log(theme);
  return (
    <div className="flex justify-center items-center">
      {theme === "light" && (
        <Image src="/blt.png" height={300} width={400} alt="website logo" />
      )}
      {theme === "dark" && (
        <Image src="/wlt.png" height={300} width={400} alt="website logo" />
      )}
    </div>
  );
}
