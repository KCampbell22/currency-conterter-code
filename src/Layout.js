import React, { Children } from "react";
import Footer from "./Footer";
import Home from "./Home";
import Navigation from "./Navigation";

export default function Layout(props) {
  return (
    <React.Fragment>
      <Home />
      {props.Children}
      <Footer />
    </React.Fragment>
  );
}
