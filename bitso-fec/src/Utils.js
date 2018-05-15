import moment from "moment";
import _ from "lodash";

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

const parseVolumeData = data => {
  const parsedData = _.map(data, item => [
    moment(item.date).valueOf(),
    +item.volume
  ]);
  return parsedData;
};

export const parseChartData = data => {
  const candleData = parseCandleData(data);
  const volumeData = parseVolumeData(data);
  return { candleData, volumeData };
};
