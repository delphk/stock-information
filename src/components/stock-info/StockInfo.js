import React from "react";
import "./StockInfo.css";

const StockInfo = props => {
  return (
    <div>
      <br />
      <p className="stock__key">
        Stock name: <span className="stock__value">{props.name}</span>
      </p>
      <p className="stock__key">
        Symbol: <span className="stock__value">{props.symbol}</span>
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
