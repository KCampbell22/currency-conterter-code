import React from "react";
import Footer from "./Footer";
import Home from "./Home";
import Navigation from "./Navigation";

export default function Layout(props) {
  return (
    <React.Fragment>
      <Home />
      <Footer />
    </React.Fragment>
  );
}
