import React from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header>
      <div className="logo">
        <span className="logo-icon">⚡</span>
        <h1>Task Manager</h1>
      </div>
      <ThemeToggle />
    </header>
  );
}