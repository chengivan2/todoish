'use client';

import Authentication from "../dashboard/Authentication";

export default function LoggedOutPage() {
  return (
    <div className="logged-out-page">
      <h1>You are logged out</h1>
      <p>Please log in to access your dashboard.</p>
      <div className="button-group">
        <Authentication />
      </div>
    </div>
  );
} 