async function fetchQuotes(value) {
  const URL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${value}&apikey=${
    process.env.REACT_APP_API_KEY_3
  }`;
  const request = await fetch(URL);
  const response = await request.json();

  if (response["Global Quote"] === undefined) {
    console.log(response);
    const URL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${value}&apikey=${
      process.env.REACT_APP_API_KEY_1
    }`;
    const newRequest = await fetch(URL);
    const newResponse = await newRequest.json();
    console.log(newResponse);
    const data = {
      price: newResponse["Global Quote"]["05. price"],
      symbol: newResponse["Global Quote"]["01. symbol"]
    };
    return data;
    // throw new Error(
    //   "Failed to retrieve quote for stock " +
    //     value +
    //     ". Response from server is " +
    //     JSON.stringify(response)
    // );
  } else {
    const data = {
      price: response["Global Quote"]["05. price"],
      symbol: response["Global Quote"]["01. symbol"]
    };
    return data;
  }
}

export default fetchQuotes;
