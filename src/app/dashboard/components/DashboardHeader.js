"use client";

import "./DashboardHeader.css";
import SignOutButton from "@/app/components/SignOutButton";
import DashboardMenu from "./DashboardMenu";
import Image from "next/image";

export default function DashboardHeader() {
  return (
    <header className="dashboard-header">
      <div className="logo">
        <Image 
        src="./todoishMainLogo.png"
        width={20}
        height={20}
        alt="Todoish main logo with a transparent background"/>
      </div>
      <div className="dashboard-menu-and-sign-out">
      <DashboardMenu className="dashboard-menu" />
      <SignOutButton className="dashboard-sign-out" />
      </div>
    </header>
  );
}
