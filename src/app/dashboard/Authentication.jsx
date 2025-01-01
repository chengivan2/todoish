"use client";

import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import "./authentication.css";

export default function Authentication() {
  return (
    <div className="container">
      <h1>Welcome to Todoish</h1>
      <p>Please sign in to start managing your tasks</p>

      <div>
        <LoginLink>Sign in</LoginLink>
      </div>

      <div className="separator">
        <span>or</span>
      </div>

      <div>
        <RegisterLink>Sign up</RegisterLink>
      </div>
    </div>
  );
}
