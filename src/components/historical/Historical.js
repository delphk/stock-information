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
import { getHistoricalData } from "../../data/data";

class Historical extends Component {
  state = {
    data: []
  };

  async componentDidMount() {
    const symbol = this.props.location.state.symbol;
    const data = await getHistoricalData(symbol);
    this.setState({ data });
  }

  render() {
    console.log(this.state.data);
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
              dataKey="Closing Price"
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
