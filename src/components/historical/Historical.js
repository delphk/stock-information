import React, { Component } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import "./Historical.css";
import { Link } from "react-router-dom";
import moment from "moment";

class Historical extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    this.setState({ currency: this.props.location.state.currency });
    const symbol = this.props.location.state.symbol;
    const getData = () => {
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${
        process.env.REACT_APP_API_KEY_1
      }`;

      fetch(url)
        .then(r => r.json())
        .then(stockData => {
          stockData = stockData["Time Series (Daily)"];
          const sortedData = [];
          for (let date in stockData) {
            sortedData.push({
              date: moment(date).format("MMM DD"),
              "Closing Price": parseFloat(stockData[date]["5. adjusted close"]),
              p: stockData[date]["5. adjusted close"].toLocaleString("us-EN", {
                style: "currency",
                currency: "USD"
              })
            });
          }
          sortedData.reverse();
          this.setState({
            data: sortedData
          });
        })
        .catch(e => {
          console.log(e);
        });
    };
    getData();
  }
  render() {
    return (
      <div id="container">
        <div className="row">
          <h1 className="historical__title">
            100 Day Price Chart{" "}
            <span className="symbol__info">
              ({this.props.location.state.symbol})
            </span>
          </h1>
        </div>
        <ResponsiveContainer>
          <AreaChart
            data={this.state.data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ stroke: "#cacaca" }}
              minTickGap={15}
            />
            <YAxis
              dataKey="p"
              domain={["dataMin", "dataMax"]}
              tick={{ stroke: "#cacaca" }}
              width={80}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Closing Price"
              stroke="#1e69af"
              fill="#53a4f0"
            />
          </AreaChart>
        </ResponsiveContainer>
        <br />
        <button className="btn btn-sm">
          <Link to="/">Go back</Link>
        </button>
      </div>
    );
  }
}

export default Historical;
