import { Link } from "react-router-dom";
import currencies from "./Currencies";
// use the basename of the url
const CurrencyTable = (props) => {
  // destructure the props
  const { base, rates } = props;
  console.log(base);
  console.log(rates);
  return (
    // form to select the base currency
    // currency selector will be a dropdown
    // the dropdown will be populated with the currencies from the API

    //
    // wrap in a div

    <table className="table table-sm bg-light mt-4">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col" className="text-right pr-4 py-2">
            1.00 {base}
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(rates).map((currency) => (
          <tr key={currency}>
            <td>
              <Link
                to={`/currency-converter/converter?from=${currency}&to=${base}`}
              />
            </td>
            <td className="text-right pr-4 py-2">
              <td className="text-right pr-4 py-2">
                {/* link example to the converter page url with basename is 
                  https://KCampbell22.github.io/currency-converter/converter?from=USD&to=EUR
                  link needs to be /converter/{base}/{currency}
                  */}

                {rates[currency].toFixed(4)}
              </td>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CurrencyTable;
