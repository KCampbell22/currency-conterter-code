import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import currencies from "./Currencies";
import { Chart } from "chart.js/auto";
import "./converter.css";
const CurrencyConverter = (props) => {
  const { base, quote } = useLocation();

  const [fromCurrency, setFromCurrency] = useState(base || "USD");
  const [toCurrency, setToCurrency] = useState(quote || "EUR");
  // use params to set the base and quote currencies

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
    getHistoricalData(fromCurrency, toCurrency);
  }, [fromCurrency, toCurrency]);

  return (
    <React.Fragment>
      <div>
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <h1>Currency Converter</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="fromCurrency">From</label>
                  <select
                    className="form-control"
                    id="fromCurrency"
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
            </div>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="toCurrency">To</label>
                  <select
                    className="form-control"
                    id="toCurrency"
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
            </div>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="dollarAmount">Amount</label>
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
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="conversionAmount">Conversion Amount</label>
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
          <div className="container-fluid">
            <div class="row">
              <div
                id="canvas-container"
                className="col-12 d-flex justify-content-center"
              >
                <canvas id="myChart" ref={chartRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CurrencyConverter;
