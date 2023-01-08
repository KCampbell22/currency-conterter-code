import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark text-secondary">
      {/* link to home path = "/"*/}

      <Link to="/" className="navbar-brand p-3 text-light">
        Home
      </Link>
    </nav>
  );
};
export default Navigation;
