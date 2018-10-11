import React from "react";

const StockInfo = props => {
  return (
    <div>
      <p className="stock__key">
        Stock name: <span className="stock__value">{props.name}</span>
      </p>
      <p className="stock__key">
        Symbol: <span className="stock__value">{props.symbol}</span>
      </p>
      <p className="stock__key">
        Price: <span className="stock__value">{props.price}</span>
      </p>
    </div>
  );
};

export default StockInfo;
