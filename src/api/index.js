const baseUrl = "https://api.bitso.com/v3";
const tradeChartUrl = "https://bitso.com/trade/chartJSON";
const availableBooksUrl = `${baseUrl}/available_books/`;
const tickerUrl = `${baseUrl}/ticker/`;
const tradesUrl = `${baseUrl}/trades/`;

const headers = new Headers({
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json"
});

const getRequest = url =>
  fetch(url, { headers }).then(response => response.json());

export const availableBooks = async () => {
  try {
    const response = await getRequest(availableBooksUrl);
    const { payload: books } = response;
    return books;
  } catch (e) {
    console.error("Error getting available books", e);
    return [];
  }
};

/**
 *
 * @param {string} book @example "btc_mxn"
 */
export const ticker = async (book = "") =>
  await getRequest(`${tickerUrl}?book=${book}`);

/**
 * @param {object} params
 *
 * @param {string} params.book
 * @param {string} params.timeFrame
 *  @example "1month", "3months", "1year"
 */
export const trade = async ({ book = "btc_mxn", timeFrame = "1month" }) =>
  await getRequest(`${tradeChartUrl}/${book}/${timeFrame}/`);

/**
 * @param {object} params
 *
 * @param {string} params.book
 * @param {string} params.sort @default "desc"
 *  @example "asc", "desc"
 *
 * @param {number} params.limit @default 25
 */
export const trades = async ({ book = "", sort = "desc", limit = 25 }) => {
  try {
    const response = await getRequest(
      `${tradesUrl}?book=${book}&sort=${sort}&limit=${limit}`
    );
    return response.payload;
  } catch (e) {
    console.error("Error getting trades", e);
    return [];
  }
};
