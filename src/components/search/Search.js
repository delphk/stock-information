import React, { Component } from "react";
import fetchSymbol from "../../data/fetchSymbol";
import "./Search.css";

class Search extends Component {
  state = {
    searchinput: "",
    searchresults: undefined
  };

  getSymbol = async e => {
    try {
      this.props.resetState();
      this.setState({ searchresults: undefined });
      const stockname = e.target.value;
      this.setState({ searchinput: stockname });
      if (stockname) {
        const searchresults = await fetchSymbol(stockname);
        searchresults
          ? this.setState({ searchresults })
          : this.setState({ searchresults: [] });
        console.log(this.state.searchresults);
      } else {
        this.setState({ searchresults: [] });
      }
    } catch (error) {
      console.log(error);
    }
  };

  getQuote = (symbol, name) => {
    this.setState({ searchresults: undefined });
    this.props.displayQuote(symbol, name);
  };

  render() {
    const { searchresults } = this.state;
    return (
      <div>
        <form>
          <i className="fa fa-search" />
          <input
            type="text"
            name="stockname"
            onChange={this.getSymbol}
            placeholder="Search ..."
            autoComplete="off"
          />
          <div className="stock__info search__dropdown">
            {this.state.searchinput &&
              searchresults &&
              searchresults.length === 0 && (
                <p className="stock__value">no stocks found</p>
              )}
            {searchresults &&
              searchresults.map((results, index) => (
                <li
                  key={index}
                  className="search__result"
                  onClick={() =>
                    this.getQuote(results["1. symbol"], results["2. name"])
                  }
                >
                  {results["2. name"]} ({results["1. symbol"]})
                </li>
              ))}
          </div>
        </form>
      </div>
    );
  }
}

export default Search;

// import React from "react";

// const Search = props => {
//   return (
//     <div>
//       <form>
//         <input
//           type="text"
//           name="stockname"
//           onChange={props.getSymbol}
//           placeholder="Search ..."
//         />
//         <button className="btn btn-danger">
//           <i className="fa fa-search" />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Search;
