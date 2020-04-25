import React from "react";
import Plot from "react-plotly.js";
import "./App.css";

var stockSymbol = "GOOGL";
var stockDisplaytype = "compact";

class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: [],
      stockSymbolDisplay: "",
      title: "GOOGL",
    };
  }

  componentDidMount() {
    this.fetchStock();
  }

  fetchStock() {
    const pointerToThis = this;
    //console.log(pointerToThis);
    const API_KEY = process.env.REACT_API_KEY;

    // this.state.stockSymbolDisplay = stockSymbol;
    let API_Call_ALPHA = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbol}&outputsize=${stockDisplaytype}&apikey=${API_KEY}`;
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];
    //this.setState({ stockSymbolDisplay: stockSymbol });

    fetch(API_Call_ALPHA)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        for (var key in data["Time Series (Daily)"]) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(
            data["Time Series (Daily)"][key]["1. open"]
          );
        }

        // console.log(stockChartXValuesFunction);
        pointerToThis.setState({
          stockChartXValues: stockChartXValuesFunction,
          stockChartYValues: stockChartYValuesFunction,
        });
      });
  }

  handleClick = () => {
    stockSymbol = this.state.stockSymbolDisplay.toUpperCase();
    console.log(this.state.stockSymbolDisplay.toUpperCase());
    this.setState({
      title: stockSymbol,
    });
    this.fetchStock();
  };

  handleFullDisplay = () => {
    console.log("Full Display");
    stockDisplaytype = "full";
    this.fetchStock();
  };

  handleCompactDisplay = () => {
    console.log("Compact Displays");
    stockDisplaytype = "compact";
    this.fetchStock();
  };

  render() {
    return (
      <div className="bg-light">
        {/* Scroll Animation */}
        <div className="App-header text-center">
          <h1 className="mb-5 shadow text-style">Stock Market Lookup</h1>
          <div className="scroll-down" style={{ textAlign: "center" }}></div>
        </div>
        {/*End Scroll Animation */}

        {/* Below the Scroll Animation */}
        <div className="bg-light">
          {/* Stock Search Start */}
          <div className="mt-5 bg-light">
            <input
              className="mt-5"
              name="userSymbol"
              placeholder="GOOGL"
              onChange={(event) =>
                this.setState({
                  stockSymbolDisplay: event.target.value.toUpperCase(),
                })
              }
              value={this.state.stockSymbolDisplay.toUpperCase()}
            />
            {/* Search Button */}
            <button class="btn btn-warning mx-2 p-1" onClick={this.handleClick}>
              Search
            </button>
            {/* End of Search Button */}
          </div>
          {/* Stock Search End */}

          {/* View Stock History Buttons */}
          <div className="mt-3">
            <button class="btn btn-light mr-2" onClick={this.handleFullDisplay}>
              View Full History
            </button>
            <button class="btn btn-light" onClick={this.handleCompactDisplay}>
              Past 100 Days
            </button>
          </div>
          {/* End View Stock History Buttons */}
          {/* Start of Graph */}
          <div
            className="row"
            style={{ marginRight: "3rem", display: "block" }}
          >
            <div className="w-50 mx-auto">
              <Plot
                className="ml-3 bg-light text-center"
                style={{ marginTop: "5rem", marginLeft: "7rem" }}
                data={[
                  {
                    x: this.state.stockChartXValues,
                    y: this.state.stockChartYValues,
                    type: "scatter",
                    mode: "lines+markers",
                    marker: { color: "#21ce99" },
                  },
                ]}
                layout={{
                  width: 750,
                  height: 500,
                  title: `${this.state.title}'s Stock`,
                  titlefont: { size: 25 },
                  paper_bgcolor: "#f8f9fa",
                  plot_bgcolor: "#f8f9fa",
                }}
              />
              {/* End of Graph */}
            </div>
          </div>
        </div>
        {/* End of Below the Scroll Animation */}
      </div>
    );
  }
}

export default Stock;
