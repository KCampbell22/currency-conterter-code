import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// get the GetLatestCurrenciesWithBase function from the api
import { GetLatestCurrenciesWithBase } from "./api/Requests";

// use the basename of the url
const CurrencyTable = (props) => {
  // destructure the props
  const { base, currencies } = props;
  console.log(base);
  console.log(currencies);

  const [rates, setRates] = useState({});

  // get the latest currencies with the base from api
  useEffect(() => {
    GetLatestCurrenciesWithBase(base).then((data) => {
      setRates(data.rates);
    });
  }, [base]);

  console.log(rates);

  return (
    // form to select the base currency
    // currency selector will be a dropdown
    // the dropdown will be populated with the currencies from the API

    //
    // wrap in a div

    <table className="table table-sm bg-light table-bordered mt-4 table-responsive">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col" className="text-center pr-4 py-2">
            1.00 {props.base}
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(props.currencies).map((currency) => (
          <tr className="text-center" key={currency}>
            <td className="p-2">{currency}</td>
            <td className="text-right pr-4 py-2 text-center align-middle">
              <Link to={`/converter?from=${props.base}&to=${currency}`}>
                {rates[currency]}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CurrencyTable;
