async function fetchSymbol(stockname) {
  const URL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockname}&&apikey=${
    process.env.REACT_APP_API_KEY_2
  }`;
  const request = await fetch(URL);
  const response = await request.json();
  const searchresults = response["bestMatches"];
  return searchresults;
}

export default fetchSymbol;
