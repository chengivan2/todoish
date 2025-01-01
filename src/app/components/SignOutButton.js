"use client";

import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";

export default function SignOutButton() {
  const { logout } = useKindeAuth();

  return <button onClick={() => logout()}>Sign Out</button>;
}
