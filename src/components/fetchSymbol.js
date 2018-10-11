async function fetchSymbol(stockname) {
  const URL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockname}&&apikey=${
    process.env.REACT_APP_API_KEY_2
  }`;
  const request = await fetch(URL);
  const data = await request.json();
  return data;
}

export default fetchSymbol;
