const baseUrl = "https://api.bitso.com/v3";
const tradeChartUrl = "https://bitso.com/trade/chartJSON";

const headers = new Headers({
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json"
});

const getRequest = url =>
  fetch(url, { headers }).then(response => response.json());

export const fetchAvailableBooks = async () => {
  try {
    const response = await getRequest(`${baseUrl}/available_books/`);
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
export const fetchBookDetails = async (book = "") =>
  await getRequest(`${baseUrl}/ticker/?book=${book}`).then(
    resp => resp.payload
  );

/**
 * @param {object} params
 *
 * @param {string} params.book
 * @param {string} params.timeFrame
 *  @example "1month", "3months", "1year"
 */
export const fetchChartData = async ({
  book = "btc_mxn",
  timeFrame = "1month"
}) => await getRequest(`${tradeChartUrl}/${book}/${timeFrame}/`);

/**
 * @param {object} params
 *
 * @param {string} params.book
 * @param {string} params.sort @default "desc"
 *  @example "asc", "desc"
 *
 * @param {number} params.limit @default 25
 */
export const fetchLastTrades = async ({
  book = "",
  sort = "desc",
  limit = 25
}) => {
  try {
    const response = await getRequest(
      `${baseUrl}/trades/?book=${book}&sort=${sort}&limit=${limit}`
    );
    return response.payload;
  } catch (e) {
    console.error("Error getting trades", e);
    return [];
  }
};

export const fetchOrderBook = async ({ book = "", aggregate = true }) =>
  await getRequest(
    `${baseUrl}/order_book/?book=${book}?aggregate=${aggregate}`
  );
