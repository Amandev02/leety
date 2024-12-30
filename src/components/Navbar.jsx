import React from 'react';
import './Navbar.css'; // Import CSS for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__left">
      <a href="/" className="navbar_logo">
      LEETCOM
      </a>
        <a href="/" className="navbar__link">
          Home
        </a>
      </div>
      <div className="navbar__right">
        <a href="/profile" className="navbar__link">
          Profile
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
