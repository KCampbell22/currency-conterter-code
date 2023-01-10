import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CurrencyTable from "./CurrencyTable";
import { Line } from "react-chartjs-2";
import currencyList from "./Currencies";
// import dropdwon icon from icons folder /Users/kadecampbell/currency-app/public/icons/dropdown-2-48.png
import dropdown from "./images/dropdown-2-48.png";

const API_URL = "https://www.frankfurter.app/latest";

function Home() {
  const [currencies, setCurrencies] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [conversions, setConversions] = useState([]);

  const handleCurrencyChange = (currency) => {
    setBaseCurrency(currency);

    fetch(`${API_URL}?from=${currency}`)
      .then((res) => res.json())
      .then((data) => {
        setConversions(data.rates);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // get currencies from GetLatestCurrencies
  useEffect(() => {
    // currencies is in the currencies.js file
    setCurrencies(currencyList);
  }, []);

  const dataSource = Object.keys(conversions).map((currency) => ({
    key: currency,
    currency,
    conversion: { currency, amount: conversions[currency] },
  }));

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Currency Converter</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <label htmlFor="base-select">
              Base Currency
              <select
                className="form-control form-select"
                id="base-select"
                value={baseCurrency}
                onChange={(e) => handleCurrencyChange(e.target.value)}
              >
                {Object.keys(currencyList).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <CurrencyTable base={baseCurrency} currencies={currencyList} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
