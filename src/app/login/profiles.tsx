"use client";

import LoginForm from "./login-form";
import { useState } from "react";
import ProfileSelection from "./profile-selection";

export default function Profiles() {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  return selectedProfile ? (
    <LoginForm selectedProfile={selectedProfile} />
  ) : (
    <ProfileSelection setSelectedProfile={setSelectedProfile} />
  );
}
