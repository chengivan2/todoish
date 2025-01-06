"use client";

import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import "../dashboard/authentication.css";

export default function LoAuthentication() {
  return (
    <div className="container">
      <div className="authentication-container">
        <h1>Youve been logged out successfully</h1>
        
        <p className="dashboard-welcome-message">
          Sign in again to continue managing your tasks
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
