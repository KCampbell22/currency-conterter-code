import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CurrencyConverter from "./CurrencyConverter";
import CurrencyTable from "./CurrencyTable";

import "./App.css";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Home from "./Home";
// import fontawesome from "@fortawesome/fontawesome";
import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => {
  return (
    <>
      <Router basename="/currency-converter">
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route path="/converter" element={<CurrencyConverter />} />
          <Route path="/table" element={<CurrencyTable />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
};

export default App;
