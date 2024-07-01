import React from 'react';
import '../../css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h1 className="footer-logo">JPS Streaming</h1>
          <p>JPS Streaming is a leading platform for streaming the best movies and TV shows. Our mission is to provide high-quality content to our users.</p>
        </div>
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <p>Email: support@jpsstreaming.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 JPS Street, StreamCity, SC 12345</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 JPS Streaming. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
