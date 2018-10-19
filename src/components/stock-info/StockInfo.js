import React from "react";
import "./StockInfo.css";
import { Link } from "react-router-dom";

const StockInfo = props => {
  return (
    <div>
      <br />
      <p className="stock__key">
        Stock name: <span className="stock__value">{props.name}</span>
      </p>
      <p className="stock__key">
        Symbol:{" "}
        <span className="stock__value">
          <Link
            to={{
              pathname: "/historical",
              state: { symbol: props.symbol, currency: props.currency }
            }}
          >
            {props.symbol}
          </Link>
        </span>
      </p>
      <p className="stock__key">
        Price:{" "}
        <span className="stock__value">
          {props.price} {props.currency}
        </span>
      </p>
    </div>
  );
};

export default StockInfo;
