import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from './Header';

const NavBar = ({ handleFaq, handleHowItWork }) => {
  return (
    <>
    <Nav className="m-auto header_menu">
      <Link className="nav-link" to="/">
        Home
      </Link>
      <Link className="nav-link" to="/about-us">
        About Us
      </Link>
      {/* <Link className="nav-link" to="/blog">
        Blog
      </Link> */}
      <Link className="nav-link" to="/pricing">
        Pricing
      </Link>
      {/* <Link className="nav-link" to="/privacy-policy">
        Privacy Policy
      </Link>
      <Link onClick={handleHowItWork}>How it Work</Link>
      <Link onClick={handleFaq}>FAQ</Link> */}
      <Link className="nav-link" to="/contact-us">
        Contact Us
      </Link>
    </Nav>



    </>
  );
};

export default NavBar;
