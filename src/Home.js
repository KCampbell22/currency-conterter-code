import React, { useState, useEffect } from "react";
import { Select, Table, Input } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import CurrencyTable from "./CurrencyTable";

const API_URL = "https://www.frankfurter.app/latest";

function Home() {
  const [currencies, setCurrencies] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [conversions, setConversions] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setCurrencies(Object.keys(data.rates));
        setConversions(data.rates);
      });
  }, []);

  const handleCurrencyChange = (currency) => {
    setBaseCurrency(currency);

    fetch(`${API_URL}?from=${currency}`)
      .then((res) => res.json())
      .then((data) => {
        setConversions(data.rates);
      });
  };

  const columns = [
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
    },
    {
      title: "Conversion",
      dataIndex: "conversion",
      key: "conversion",
      render: (conversion) => (
        <a
          href={`/currency-converter/converter?from=${baseCurrency}&to=${conversion.currency}`}
        >
          {conversion.amount}
        </a>
      ),
    },
  ];

  const dataSource = Object.keys(conversions).map((currency) => ({
    key: currency,
    currency,
    conversion: { currency, amount: conversions[currency] },
  }));

  return (
    <>
      <Select
        defaultValue={baseCurrency}
        className={"p-2"}
        onChange={handleCurrencyChange}
      >
        {currencies.map((currency) => (
          <Select.Option key={currency} value={currency}>
            {currency}
          </Select.Option>
        ))}
      </Select>
      <Table dataSource={dataSource} columns={columns} />
    </>
  );
}

export default Home;
