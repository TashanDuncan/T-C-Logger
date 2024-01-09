"use client";

import LoginForm from "./login-form";
import { useState } from "react";
import ProfileSelection from "./profile-selection";
import { User } from "@prisma/client";

export type ProfileProps = Omit<User, "password" | "id" | "partnerId">;
export default function Profiles() {
  const [selectedProfile, setSelectedProfile] = useState<ProfileProps | null>(
    null
  );

  return selectedProfile ? (
    <LoginForm
      selectedProfile={selectedProfile}
      setSelectedProfile={setSelectedProfile}
    />
  ) : (
    <ProfileSelection setSelectedProfile={setSelectedProfile} />
  );
}
