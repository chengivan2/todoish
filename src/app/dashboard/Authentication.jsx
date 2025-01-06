"use client";

import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import "./authentication.css";

export default function Authentication() {
  return (
    <div className="container">
      <div className="authentication-container">
        <h1>Welcome to Todoish</h1>

        <p className="dashboard-welcome-message">
          Please sign in to start managing your tasks
        </p>

        <LoginLink className="dashboard-sign-in">Sign in</LoginLink>

        <div className="separator">
          <span>OR</span>
        </div>

        <RegisterLink className="dashboard-sign-up">Sign up</RegisterLink>
      </div>
    </div>
  );
}
