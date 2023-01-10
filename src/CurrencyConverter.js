import React, { useState, useEffect, useRef } from "react";
import currencies from "./Currencies";
import { Chart } from "chart.js/auto";
import "./converter.css";
import { useLocation } from "react-router-dom";
import Swap from "./images/swap.svg";
const CurrencyConverter = (props) => {
  // get the search params from the url
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const base = searchParams.get("from");
  const quote = searchParams.get("to");
  const [fromCurrency, setFromCurrency] = useState(base);
  const [toCurrency, setToCurrency] = useState(quote);

  const [dollarAmount, setDollarAmount] = useState(1);
  const [conversionRate, setConversionRate] = useState(0);
  const [conversionAmount, setConversionAmount] = useState();
  const [chart, setChart] = useState();

  const chartRef = useRef(document.getElementById("myChart"));

  // get the rates from the API

  /*
   * handle currency changes, and ammount changes.
   *
   *
   *
   */
  const getConversionRate = () => {
    fetch(
      `https://api.frankfurter.app/latest?from=${fromCurrency}&to=${toCurrency}`
    )
      .then((res) => res.json())
      .then((data) => {
        setConversionRate(data.rates[toCurrency]);
      });
  };

  const getConversionAmount = () => {
    setConversionAmount(dollarAmount * conversionRate);
  };
  const changeBaseCurrency = (e) => {
    setFromCurrency(e.target.value);
    getConversionRate();
    getConversionAmount();
  };

  const changeToCurrency = (e) => {
    setToCurrency(e.target.value);
    getConversionRate();
    getConversionAmount();
  };

  const changeDollarAmount = (e) => {
    setDollarAmount(e.target.value);
    getConversionRate();
    getConversionAmount();
  };

  // get conversion rates
  useEffect(() => {
    getConversionRate();
    getConversionAmount();
    console.log(fromCurrency);
  }, [
    fromCurrency,
    toCurrency,
    dollarAmount,
    conversionAmount,
    conversionRate,
  ]); // include conversionAmount in dependencies array

  // get conversion amount

  // get conversion rates

  // get conversion amount

  // get data from historicalData

  //assign a variable
  // function to create the label, data, and labels for the graph
  console.log(conversionRate);

  console.log(fromCurrency);
  console.log(toCurrency);

  const buildChart = (labels, data, label) => {
    if (typeof chart !== "undefined") {
      chart.destroy();
    }

    // chart ref is a reference to the canvas element

    const newChart = new Chart(chartRef.current.getContext("2d"), {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: label,
            data,
            fill: false,
            tension: 0,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
    setChart(newChart);
  };

  const getHistoricalData = (base, quote) => {
    const endDate = new Date().toISOString().split("T")[0];
    const startDate = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    fetch(
      `https://api.frankfurter.app/${startDate}..${endDate}?from=${base}&to=${quote}`
    )
      .then((res) => res.json())
      .then((data) => {
        const labels = Object.keys(data.rates);
        const chartData = Object.values(data.rates).map(
          (rate) => rate[toCurrency]
        );

        const label = `${base} to ${quote}`;
        buildChart(labels, chartData, label);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getHistoricalData(base, quote);
  }, [fromCurrency, toCurrency]);

  //switch symbols when swapping currencies

  // swap currencies

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <React.Fragment>
      <div className="container-fluid" id="form">
        <div className="row">
          <div className="col-12">
            <h1>Currency Converter</h1>
          </div>
        </div>
        <div className="row" id="base">
          <div className="col">
            <div className="form-group">
              <select
                className="form-control form-select"
                id="toCurrency"
                value={fromCurrency}
                onChange={changeBaseCurrency} // handle currency changes
              >
                {Object.keys(currencies).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {currencies[fromCurrency].symbol}
                  </span>
                </div>
                <input
                  type="number"
                  className="form-control"
                  id="dollarAmount"
                  value={dollarAmount}
                  onChange={changeDollarAmount} // handle amount changes
                />
              </div>
            </div>
          </div>
        </div>
        {/* swap button */}
        <div className="row">
          <div className="col-12">
            <button
              className="btn btn-transparent"
              id="swap"
              onClick={swapCurrencies}
            >
              <img src={Swap} alt="swap" id="swap" />
            </button>
          </div>
        </div>
        {/* From currency and dollar amount */}
        <div className="row" id="quote">
          <div className="col">
            <div className="form-group">
              <select
                className="form-control form-select"
                id="fromCurrency"
                value={toCurrency}
                onChange={changeToCurrency} // handle currency changes
              >
                {Object.keys(currencies).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {/*dynamically add currency symbol if currency is swapped */}
                    {currencies[toCurrency].symbol}
                  </span>
                </div>

                <input
                  type="number"
                  value={conversionAmount}
                  className="form-control"
                  id="conversionAmount"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* To currency and conversion amount */}

      {/* Chart */}

      <div className="container-fluid mb-3 mt-3">
        <div class="row">
          <div
            id="canvas-container"
            className="col-12 d-flex justify-content-center"
          >
            <canvas id="myChart" ref={chartRef} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CurrencyConverter;
