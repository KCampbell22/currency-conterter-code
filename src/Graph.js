import { useState, useEffect, useRef, useCallback } from "react";
import Chart from "chart.js/auto";

function Graph(props) {
  //        <Graph base={fromCurrency} quote={toCurrency} />

  // initialize props
  const { base, quote } = props;
  const [chart, setChart] = useState();
  const chartRef = useRef(document.getElementById("myChart"));

  useEffect(() => {
    console.log(base);
    console.log(quote);
  }, [base, quote]);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <canvas id="chart" ref={chartRef} />
        </div>
      </div>
    </div>
  );
}

export default Graph;
