'use client'

import React, { useEffect } from 'react';
import './Home.css';

export default function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.home-header');
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home">
      <header className="home-header">
        <div className="logo">YourLogo</div>
        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#pricing">Pricing</a>
          <a href="#blog">Blog</a>
          <a href="#contact" className="contact-button">Contact Us</a>
        </nav>
      </header>
      <main className="home-content">
        <h1>Boost Your Productivity</h1>
        <p>Streamline your workflow with our AI-powered task management system.</p>
        <div className="cta-buttons">
          <button className="get-started">Get Started Now</button>
          <button className="try-free">Try It Free</button>
        </div>
      </main>
    </div>
  );
} 