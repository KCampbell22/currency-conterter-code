import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg  text-dark">
      {/* link to home path = "/"*/}

      <Link to="/" className="navbar-brand p-3 text-dark">
        Home
      </Link>
    </nav>
  );
};
export default Navigation;
