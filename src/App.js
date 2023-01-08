import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CurrencyConverter from "./CurrencyConverter";
import CurrencyTable from "./CurrencyTable";

import "./App.css";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Home from "./Home";
import React from "react";

const App = () => {
  return (
    <>
      <Router basename="/currency-converter">
        <Navigation />
        <Routes>
          <Route path={"/"} exact element={<Home />} />
          <Route
            path={"/converter/:base:quote"}
            element={<CurrencyConverter />}
          />
        </Routes>

        <Footer />
      </Router>
    </>
  );
};

export default App;
