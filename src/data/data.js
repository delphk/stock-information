import moment from "moment";

async function fetchSymbol(stockname) {
  const URL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockname}&&apikey=${
    process.env.REACT_APP_API_KEY_2
  }`;
  const request = await fetch(URL);
  const response = await request.json();
  const searchresults = response["bestMatches"];
  return searchresults;
}

async function fetchQuotes(value) {
  const URL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${value}&apikey=${
    process.env.REACT_APP_API_KEY_1
  }`;
  const request = await fetch(URL);
  const response = await request.json();

  if (response["Global Quote"]) {
    const data = {
      price: response["Global Quote"]["05. price"],
      symbol: response["Global Quote"]["01. symbol"]
    };
    return data;
  } else {
    console.log(response);
    throw new Error(
      "Failed to retrieve quote for stock " +
        value +
        ". Response from server is " +
        JSON.stringify(response)
    );
  }
}

async function getHistoricalData(symbol) {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${
    process.env.REACT_APP_API_KEY_1
  }`;

  const request = await fetch(url);
  const response = await request.json();
  if (response["Time Series (Daily)"]) {
    const data = response["Time Series (Daily)"];
    const sortedData = [];
    for (let date in data) {
      sortedData.push({
        date: moment(date).format("MMM DD"),
        "Closing Price": parseFloat(data[date]["5. adjusted close"])
      });
    }
    sortedData.reverse();
    return sortedData;
  } else {
    console.log(response);
    throw new Error(
      "Failed to retrieve historical data for stock " +
        symbol +
        ". Response from server is " +
        JSON.stringify(response)
    );
  }
}

export { fetchSymbol, fetchQuotes, getHistoricalData };
