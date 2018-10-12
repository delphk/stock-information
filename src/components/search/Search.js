import React, { Component } from "react";
import fetchSymbol from "../../data/fetchSymbol";
import "./Search.css";
import { debounce, throttle } from "throttle-debounce";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchinput: "",
      searchresults: undefined
    };
    this.getSymbolThrottle = throttle(500, this.getSymbol);
    this.getSymbolDebounce = debounce(500, this.getSymbol);
  }

  changeInput = e => {
    this.props.resetState();
    const stockname = e.target.value;
    this.setState({
      searchinput: stockname,
      searchresults: undefined
    });
    if (stockname.length === 0) {
      this.setState({ searchresults: undefined });
    } else if (stockname.length < 4) {
      this.getSymbolThrottle(stockname);
    } else {
      this.getSymbolDebounce(stockname);
    }
  };

  getSymbol = async stockname => {
    try {
      const searchresults = await fetchSymbol(stockname);
      searchresults
        ? this.setState({ searchresults })
        : this.setState({ searchresults: [] });
      console.log(this.state.searchresults);
    } catch (error) {
      console.error(error);
    }
  };

  getQuote = (symbol, name) => {
    this.setState({ searchresults: undefined });
    this.props.displayQuote(symbol, name);
  };

  // Resets search input when user clicks on reset button
  handleReset = () => {
    this.setState({
      searchinput: "",
      searchresults: undefined
    });
    this.props.resetState();
  };

  render() {
    const { searchresults, searchinput } = this.state;
    return (
      <div>
        <form onSubmit={e => e.preventDefault()}>
          <i className="fa fa-search fa-md" />

          {/* Input field to handle changes in search input */}
          <input
            type="text"
            value={searchinput}
            onChange={this.changeInput}
            placeholder="Search ..."
            autoComplete="off"
          />

          {/* Icon to reset search input */}
          {searchinput && (
            <i className="fa fa-times fa-lg" onClick={this.handleReset} />
          )}

          <div className="stock__info">
            {/* Display message if no stocks match user's search criteria */}
            {searchinput &&
              searchresults &&
              searchresults.length === 0 && (
                <p className="stock__value">no stocks found!</p>
              )}

            {/* Maps stock name and symbol for each search result */}
            {searchresults &&
              searchresults.map((results, index) => (
                <li
                  key={index}
                  className="search__result"
                  // trigger getQuote function when user clicks on desired stock
                  onClick={() =>
                    this.getQuote(results["1. symbol"], results["2. name"])
                  }
                >
                  {/* trims long stock names and display the name and symbol of search results */}
                  {results["2. name"].length < 25
                    ? `${results["2. name"]}`
                    : `${results["2. name"].substring(0, 22)}...`}{" "}
                  ({results["1. symbol"]})
                </li>
              ))}
          </div>
        </form>
      </div>
    );
  }
}

export default Search;
