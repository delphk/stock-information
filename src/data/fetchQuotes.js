async function fetchQuotes(value) {
  const URL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${value}&apikey=${
    process.env.REACT_APP_API_KEY_1
  }`;
  const request = await fetch(URL);
  const response = await request.json();
  const data = {
    price: response["Global Quote"]["05. price"],
    symbol: response["Global Quote"]["01. symbol"]
  };
  return data;
}

export default fetchQuotes;
