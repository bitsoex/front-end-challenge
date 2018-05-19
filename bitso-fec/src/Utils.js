import moment from "moment";
import _ from "lodash";
import numeral from "numeral";

// Candlestick Data
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

// Volume Data
const parseVolumeData = data => {
  const parsedData = _.map(data, item => [
    moment(item.date).valueOf(),
    +item.volume
  ]);
  return parsedData;
};

// Close Price Data
const parseLineData = data => {
  const parsedData = _.map(data, item => [
    moment(item.date).valueOf(),
    +item.close
  ]);
  return parsedData;
};

export const parseChartData = data => {
  const candleData = parseCandleData(data);
  const volumeData = parseVolumeData(data);
  const lineData = parseLineData(data);
  return { candleData, volumeData, lineData };
};

export const parseTicker = ticker => {
  return ticker.replace("_", "/").toUpperCase();
};

const priceFormat = price => {
  if (price < 1) {
    return numeral(price).format("0.00000000");
  }
  return numeral(price).format("0,0.00");
};

export const parsePrice = (price, ticker) => {
  const [, Minor] = ticker.split("_");

  const parsedPrice = priceFormat(+price);
  return `${parsedPrice} ${Minor.toUpperCase()}`;
};
