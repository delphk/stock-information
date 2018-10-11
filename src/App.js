import React, { Component } from "react";
import "./App.css";
import Titles from "./components/Titles";
import Search from "./components/Search";
import StockInfo from "./components/StockInfo";
import StockList from "./components/StockList";
import fetchQuotes from "./components/fetchQuotes";
import fetchSymbol from "./components/fetchSymbol";

class App extends Component {
  state = {
    searchresults: undefined,
    symbol: undefined,
    price: undefined,
    name: undefined
  };

  displayQuote = async (value, name) => {
    try {
      const data = await fetchQuotes(value);
      const price = data["Global Quote"]["05. price"];
      const symbol = data["Global Quote"]["01. symbol"];
      this.setState({
        price: price,
        symbol: symbol,
        name: name,
        searchresults: []
      });
      console.log(this.state);
    } catch (error) {
      console.log(error);
    }
  };

  getSymbol = async e => {
    try {
      this.setState({
        price: undefined,
        symbol: undefined,
        name: undefined
      });
      const stockname = e.target.value;
      if (stockname) {
        const data = await fetchSymbol(stockname);
        const searchresults = data["bestMatches"];
        console.log(searchresults);
        // if (searchresults) {
        //   this.setState({ searchresults });
        // } else {
        //   this.setState({ searchresults: [] });
        // }
        searchresults
          ? this.setState({ searchresults })
          : this.setState({ searchresults: [] });
      } else {
        this.setState({ searchresults: [] });
      }
    } catch (error) {
      console.log(error);
    }
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
                  <Search getSymbol={this.getSymbol} />
                  <div className="stock__info">
                    {this.state.searchresults && (
                      <ul>
                        {this.state.searchresults.map((results, index) => (
                          <StockList
                            displayQuote={this.displayQuote}
                            key={index}
                            index={index}
                            searchresults={results}
                          />
                        ))}
                      </ul>
                    )}
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
