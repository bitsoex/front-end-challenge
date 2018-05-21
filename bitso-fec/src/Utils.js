import moment from "moment";
import _ from "lodash";
import numeral from "numeral";

/**
 * Takes trade data to parse for candles chart.
 * @param {Array<Object>} data trade values
 * @returns {Array<Array>} array of array of numbers
 */
const parseCandleData = data => {
  const parsedData = _.map(data, item => [
    moment(item.date).valueOf(),
    +item.open,
    +item.high,
    +item.low,
    +item.close
  ]);
  return parsedData;
};

/**
 * Takes trade data to parse for volume section in candles chart.
 * @param {Array<Object>} data trade values
 * @returns {Array<Array>} array of array of numbers
 */
const parseVolumeData = data => {
  const parsedData = _.map(data, item => [
    moment(item.date).valueOf(),
    +item.volume
  ]);
  return parsedData;
};

/**
 * Takes trade data to parse for market list sidebar.
 * @param {Array<Object>} data trade values
 * @returns {Array<Array>} array of array of numbers
 */
const parseLineData = data => {
  const parsedData = _.map(data, item => [
    moment(item.date).valueOf(),
    +item.close
  ]);
  return parsedData;
};

/**
 * Parse data for charts.
 * @param {Array<Object>} data trade values
 * @returns {Object} object of arrays
 */
export const parseChartData = data => {
  const candleData = parseCandleData(data);
  const volumeData = parseVolumeData(data);
  const lineData = parseLineData(data);
  return { candleData, volumeData, lineData };
};

/**
 * Takes ticker string to parse.
 * @param {string} ticker string to parse
 * @returns {string} parsed string
 */
export const parseTicker = ticker => {
  return ticker.replace("_", "/").toUpperCase();
};

/**
 * Takes price number to parse.
 * @param {number} price number to parse
 * @returns {string} parsed price string
 */
const priceFormat = price => {
  if (price < 1) {
    return numeral(price).format("0.00000000");
  }
  return numeral(price).format("0,0.00");
};

/**
 * Takes price & ticker to parse for market list sidebar.
 * @param {string} price string to parse
 * @param {*} ticker string to parse
 */
export const parsePrice = (price, ticker) => {
  const [, Minor] = ticker.split("_");

  const parsedPrice = priceFormat(+price);
  return `${parsedPrice} ${Minor.toUpperCase()}`;
};
