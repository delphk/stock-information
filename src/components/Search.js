import React from "react";

const Search = props => {
  return (
    <div>
      <form>
        <input
          type="text"
          name="stockname"
          onChange={props.getSymbol}
          placeholder="Search ..."
        />
        <button className="btn btn-danger">
          <i className="fa fa-search" />
        </button>
      </form>
    </div>
  );
};

export default Search;
