"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import './SignOutButton.css';

export default function SignOutButton() {
  return <LogoutLink className="sign-out-button">Sign Out</LogoutLink>;
}
