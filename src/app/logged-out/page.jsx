'use client';

import LoAuthentication from "./LoAuthentication";

export default function LoggedOutPage() {
  return (
    <div className="logged-out-page">
      <h1>You are logged out</h1>
      <p>Please log in to access your dashboard.</p>
      <div className="button-group">
        <LoAuthentication />
      </div>
    </div>
  );
} 