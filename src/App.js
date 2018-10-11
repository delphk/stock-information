import React, { Component } from "react";
import "./App.css";
import Titles from "./components/title/Titles";
import Search from "./components/search/Search";
import StockInfo from "./components/stock-info/StockInfo";
import fetchQuotes from "./data/fetchQuotes";

class App extends Component {
  state = {
    symbol: undefined,
    price: undefined,
    name: undefined
  };

  displayQuote = async (value, name) => {
    try {
      const data = await fetchQuotes(value);
      this.setState({
        price: data.price,
        symbol: data.symbol,
        name: name
      });
      console.log(this.state);
    } catch (error) {
      console.error(error);
    }
  };

  resetState = () => {
    this.setState({
      price: undefined,
      symbol: undefined,
      name: undefined
    });
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-5 title-container">
                  <Titles />
                </div>
                <div className="col-sm-7 form-container">
                  <Search
                    displayQuote={this.displayQuote}
                    resetState={this.resetState}
                  />
                  <div className="stock__info">
                    {this.state.name && (
                      <StockInfo
                        symbol={this.state.symbol}
                        name={this.state.name}
                        price={this.state.price}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
