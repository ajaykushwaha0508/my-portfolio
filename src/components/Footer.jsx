import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <a href="#hero" className="footer-logo">
          <span className="logo-bracket">&lt;</span>DevPortfolio<span className="logo-bracket">/&gt;</span>
        </a>
        <p className="footer-copy">
          © 2024 DevPortfolio. All rights reserved. Built with ❤ and MERN Stack.
        </p>
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}
