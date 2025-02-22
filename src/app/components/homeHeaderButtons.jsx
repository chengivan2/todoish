"use client";

import './homeHeaderButtons.css';
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import SignOutButton from './SignOutButton';

export default function HomeHeaderButtons() {
  const { isAuthenticated } = useKindeAuth();

  return (
    <>
      {isAuthenticated ? (
        <div>
          <a href="/dashboard" className="dashboard-button">Dashboard</a>
          <SignOutButton />
        </div>
      ) : (
        <div>
          <a href="/dashboard" className="sign-in-button">Sign In</a>
          <a href="/dashboard" className="sign-up-button">Sign Up</a>
        </div>
      )}
    </>
  );
}
