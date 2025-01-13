"use client";

import "./DashboardHeader.css";
import SignOutButton from "@/app/components/SignOutButton";
import DashboardMenu from "./DashboardMenu";

export default function DashboardHeader() {
  return (
    <header className="dashboard-header">
      <div className="logo">Todoish Dashboard</div>
      <DashboardMenu />
      <SignOutButton />
    </header>
  );
}
