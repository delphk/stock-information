import React, { Component } from "react";

class StockList extends Component {
  render() {
    const symbol = this.props.searchresults["1. symbol"];
    const name = this.props.searchresults["2. name"];
    return (
      <div>
        <li
          className="stock__value"
          onClick={() => this.props.displayQuote(symbol, name)}
        >
          {name} ({symbol})
        </li>
      </div>
    );
  }
}

export default StockList;
