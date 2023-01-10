const latestCurrences_url = "https://api.frankfurter.app/latest";

const latestWithBase_url = (base) =>
  `https://api.frankfurter.app/latest?from=${base}`;

// api request to get the latest currencies

export const GetLatestCurrencies = async () => {
  const response = await fetch(latestCurrences_url);
  const data = await response.json();
  return data;
};

// api request to get the latest currencies with base

export const GetLatestCurrenciesWithBase = async (base) => {
  const response = await fetch(latestWithBase_url(base));
  const currencyData = await response.json();
  return currencyData;
};

// get the search params from the url

const getSearchParams = (location) => {
  const searchParams = new URLSearchParams(location.search);
  const base = searchParams.get("from");
  const quote = searchParams.get("to");
  return [base, quote];
};

// get historical data from the api

export const GetHistoricalData = async (base, quote) => {
  const end_date = new Date().toISOString().split("T")[0];
  const start_date = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
  const response = await fetch(
    `https://api.frankfurter.app/${start_date}..${end_date}?from=${base}&to=${quote}`
  );
  const data = await response.json();
  return data;
};
