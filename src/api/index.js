const baseUrl = "https://api.bitso.com/v3";
const availableBooksUrl = `${baseUrl}/available_books/`;
const tickerUrl = `${baseUrl}/ticker/`;

// const headers = new Headers({
//   "Content-Type": "application/json",
//   "Access-Control-Allow-Origin": "*"
// });

let headers = new Headers({
  "Access-Control-Allow-Origin": "",
  "Content-Type": "application/json"
});

export const availableBooks = async () => {
  const result = await fetch(availableBooksUrl);
  return await result.json();
};

export const ticker = async book => {
  const params = `book=${book}`;
  console.log("ticker api url", `${tickerUrl}?${params}`);
  const result = await fetch(`https://api.bitso.com/v3/ticker/`, {
    mode: "no-cors"
  });
  return await result.json();
};
