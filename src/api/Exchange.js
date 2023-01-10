export const GetExchangeRate = async (base, quote) => {
  const response = await fetch(
    `https://api.frankfurter.app/latest?from=${base}&to=${quote}`
  );
  const data = await response.json();
  return data;
};

//
