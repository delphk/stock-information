async function fetchQuotes(value) {
  const URL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${value}&apikey=${
    process.env.REACT_APP_API_KEY_1
  }`;
  const request = await fetch(URL);
  const data = await request.json();
  return data;
}

export default fetchQuotes;
