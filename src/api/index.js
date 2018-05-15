const baseUrl = "https://api.bitso.com/v3";
const tradeChartUrl = "https://bitso.com/trade/chartJSON";
const availableBooksUrl = `${baseUrl}/available_books/`;
const tickerUrl = `${baseUrl}/ticker/`;

const headers = new Headers({
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json"
});

const request = url =>
  fetch(url, { headers }).then(response => response.json());

export const availableBooks = async () => await request(availableBooksUrl);

/**
 *
 * @param {string} book
 *  the book to look for, example "btc_mxn"
 */
export const ticker = async (book = "") =>
  await request(`${tickerUrl}?book=${book}`);

/**
 * @param {object} params
 *
 * @param {string} params.book
 * @param {string} params.timeFrame accepted values: 1month, 3months, 1year
 */
export const trade = async ({ book = "btc_mxn", timeFrame = "1month" }) =>
  await request(`${tradeChartUrl}/${book}/${timeFrame}/`);
