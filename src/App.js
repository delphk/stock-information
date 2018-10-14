import React, { Component } from "react";
import "./App.css";
import Titles from "./components/title/Titles";
import Search from "./components/search/Search";
import StockInfo from "./components/stock-info/StockInfo";
import { fetchQuotes } from "./data/data";

class App extends Component {
  state = {
    symbol: "",
    price: "",
    name: "",
    currency: ""
  };

  // Calls function to fetch price of the stock that was selected by the user
  displayQuote = async (symbol, name, currency) => {
    try {
      const data = await fetchQuotes(symbol);
      this.setState({
        price: data.price,
        symbol: data.symbol,
        name: name,
        currency: currency
      });
      console.log(this.state);
    } catch (error) {
      console.error(error);
    }
  };

  // Resets state when user enters input in search bar
  resetState = () => {
    this.setState({
      price: "",
      symbol: "",
      name: "",
      currency: ""
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
                        currency={this.state.currency}
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
