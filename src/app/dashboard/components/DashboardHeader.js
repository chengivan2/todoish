import React, { useState } from 'react';
import './DashboardHeader.css';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import SignOutButton from '@/app/components/SignOutButton';

export default function DashboardHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="dashboard-header">
      <div className="logo">Dashboard</div>
      <HamburgerMenuIcon className="hamburger-icon" onClick={() => setMenuOpen(true)} />
      <SignOutButton />
      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="menu-content" onClick={(e) => e.stopPropagation()}>
            <a href="#tasks">Tasks</a>
            <a href="#stats">Stats</a>
            <a href="#settings">Settings</a>
          </div>
        </div>
      )}
    </header>
  );
} 