import React from "react";
import Plot from "react-plotly.js";
import defaultImg from "./newsThumbnail.jpg";

var stockSymbol = "GOOGL";
var stockDisplaytype = "compact";
let tempYVals100 = [];
let tempXVals100 = [];
let tempXVals = [];
let tempYVals = [];
let newsArray = [];

class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: [],
      smaChartXValues: [],
      smaChartYValues: [],
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
    const NEWS_API_KEY = process.env.API_KEY_NEWS;

    // this.state.stockSymbolDisplay = stockSymbol;
    let API_Call_ALPHA = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbol}&outputsize=${stockDisplaytype}&apikey=${API_KEY}`;
    let API_Call_SMA = `https://www.alphavantage.co/query?function=SMA&symbol=${stockSymbol}&interval=daily&time_period=2&series_type=open&apikey=${API_KEY}`;
    let API_CALL_NEWS = `http://newsapi.org/v2/everything?q=${stockSymbol}&from=2020-05-13&to=2020-05-13&sortBy=popularity&apiKey=ff8c8269aead49568adb2058ad21ec07`;
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];
    let smaXValuesFunction = [];
    let smaYValuesFunction = [];

    //this.setState({ stockSymbolDisplay: stockSymbol });
    Promise.all([
      fetch(API_Call_ALPHA),
      fetch(API_Call_SMA),
      fetch(API_CALL_NEWS),
    ])
      .then(function ([alpha, sma, news]) {
        return [alpha.json(), sma.json(), news.json()];
      })
      .then(function ([alphaData, smaData, newsData]) {
        console.log(alphaData, smaData, newsData);

        alphaData.then((result) => {
          //console.log(result);
          for (var key in result["Time Series (Daily)"]) {
            stockChartXValuesFunction.push(key);
            stockChartYValuesFunction.push(
              result["Time Series (Daily)"][key]["1. open"]
            );
          }
          pointerToThis.setState({
            stockChartXValues: stockChartXValuesFunction,
            stockChartYValues: stockChartYValuesFunction,
          });
        });

        smaData.then((result) => {
          for (var key in result["Technical Analysis: SMA"]) {
            smaXValuesFunction.push(key);
            smaYValuesFunction.push(
              result["Technical Analysis: SMA"][key]["SMA"]
            );
          }
          tempXVals = smaXValuesFunction;
          tempYVals = smaYValuesFunction;

          for (var i = 0; i < 100; i++) {
            tempXVals100.push(smaXValuesFunction[i]);
            tempYVals100.push(smaYValuesFunction[i]);
          }
          //console.log(sma100);

          pointerToThis.setState({
            smaChartXValues: smaXValuesFunction,
            smaChartYValues: smaYValuesFunction,
          });
        });

        newsData.then((result) => {
          newsArray = result.articles;
          console.log(newsArray);
        });

        // console.log(stockChartXValuesFunction);
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
            <button
              className="btn btn-warning mx-2 p-1"
              onClick={this.handleClick}
            >
              Search
            </button>
            {/* End of Search Button */}
          </div>
          {/* Stock Search End */}

          {/* View Stock History Buttons */}
          <div className="mt-3">
            <button
              className="btn btn-light mr-2"
              onClick={this.handleFullDisplay}
            >
              View Full History
            </button>
            <button
              className="btn btn-light"
              onClick={this.handleCompactDisplay}
            >
              Past 100 Days
            </button>
          </div>
          {/* End View Stock History Buttons */}
          {/* Start of Stock Graph */}
          <div
            className="row plot-stock"
            style={{ marginRight: "3rem", display: "block" }}
          >
            <div className="">
              {/* w-50 mx-auto */}
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
                    name: stockSymbol,
                  },
                ]}
                layout={{
                  width: 500,
                  height: 450,
                  title: `${this.state.title}'s Stock`,
                  titlefont: { size: 25 },
                  paper_bgcolor: "#f8f9fa",
                  plot_bgcolor: "#f8f9fa",
                }}
              />
            </div>
          </div>
          {/* End of Stock Graph */}

          {/* Start of SMA Graph */}
          <div
            className="row plot-sma"
            style={{ marginRight: "3rem", display: "block" }}
          >
            <div className="">
              <Plot
                className="ml-3 bg-light text-center"
                style={{ marginTop: "5rem", marginLeft: "7rem" }}
                data={[
                  {
                    x: this.state.smaChartXValues,
                    y: this.state.smaChartYValues,
                    type: "scatter",
                    mode: "lines+markers",
                    marker: { color: "black" },
                    name: "SMA Line History",
                  },
                ]}
                layout={{
                  width: 500,
                  height: 450,
                  title: `${this.state.title}'s Full SMA History`,
                  titlefont: { size: 25 },
                  paper_bgcolor: "#f8f9fa",
                  plot_bgcolor: "#f8f9fa",
                }}
              />
            </div>
          </div>
          {/* End of SMA Graph */}
          {/* News Section Start */}
          <div className="company-news">
            <h2>{stockSymbol}' Latest Updates</h2>
            <div>
              <ul>
                {newsArray.map((item) => {
                  return (
                    <li>
                      <img
                        className="article-img"
                        src={item.urlToImage ? item.urlToImage : defaultImg}
                        alt="news"
                      />
                      <p>
                        <a className="article-link" href={item.url}>
                          {item.title}
                        </a>
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {/* End of News Section */}
        </div>
        {/* End of Below the Scroll Animation */}
      </div>
    );
  }
}

export { Stock };
export { stockSymbol };
