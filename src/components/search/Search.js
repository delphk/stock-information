import React, { Component } from "react";
import { fetchSymbol } from "../../data/data";
import "./Search.css";
import { debounce } from "throttle-debounce";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchinput: "",
      searchresults: undefined
    };
    // Calls function to get symbol after user stops typing to prevent excessive API calls
    this.getSymbolFasterDebounce = debounce(500, this.getSymbol);
    this.getSymbolSlowerDebounce = debounce(800, this.getSymbol);
  }

  // Update search value in the state and call function to debounce
  changeInput = e => {
    this.props.resetState();
    const stockname = e.target.value;
    this.setState({
      searchinput: stockname,
      searchresults: undefined
    });
    if (stockname.length === 0) {
      this.setState({ searchresults: undefined });
    } else if (stockname.length < 3) {
      this.getSymbolFasterDebounce(stockname);
    } else {
      this.getSymbolSlowerDebounce(stockname);
    }
  };

  // Calls function to fetch the stock symbol based on user's input and get search results
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

  // Resets search results and passes name and symbol of selected stock to displayQuote function
  getQuote = (symbol, name, currency) => {
    this.setState({ searchresults: undefined });
    this.props.displayQuote(symbol, name, currency);
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
    const symbol = "1. symbol";
    const name = "2. name";
    const currency = "8. currency";
    return (
      <React.Fragment>
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
                    this.getQuote(
                      results[symbol],
                      results[name],
                      results[currency]
                    )
                  }
                >
                  {/* trims long stock names and display the name and symbol of search results */}
                  {results[name].length < 25
                    ? `${results[name]}`
                    : `${results[name].substring(0, 22)}...`}{" "}
                  ({results[symbol]})
                </li>
              ))}
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default Search;
