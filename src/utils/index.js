import { format } from "d3-format";

/**
 *
 * @param {string} book
 * @returns array of 2 strings representing the currencies
 * @example "btc_mxn" -> ["BTC", "MXN"]
 */
export const getCurrencies = (book = "btc_mxn") =>
  book.toUpperCase().split("_");

/**
 *
 * @param {number} quantity
 * @returns quantity with commas and 2 decimals.
 * @example 10000.00 -> 10,000.00
 */
export const formatToLocaleString = (
  quantity = 0,
  { minimumFractionDigits, maximumFractionDigits } = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 9
  }
) =>
  quantity.toLocaleString("es-MX", {
    minimumFractionDigits,
    maximumFractionDigits
  });

/**
 * Trims insignificant trailing zeros and adds appropriate suffix (https://github.com/d3/d3-format#locale_formatPrefix).
 *
 * @param {number} quantity
 * @returns formatted quantity
 * @example 140000 -> 140K
 */
export const formatToDecimalNotation = (quantity = 0) => format("~s")(quantity);

/**
 *
 * @param {array} asksOrBids
 * @returns array with original values plus computed "sum" and "value"
 */
export const computeOrderBookValues = (asksOrBids = []) => {
  let sum = 0;
  return asksOrBids.map(v => ({
    ...v,
    sum: (sum += +v.amount),
    value: +v.price * +v.amount
  }));
};
