import _ from "lodash";
import uuid from "uuid";

const orderData = (orders, data) => {
  let { asks, bids, sequence } = orders.data.payload;
  if (data.sequence > sequence) {
    _.map(data.payload, order => {
      if (order.s === "open") {
        const value = {
          book: "btc_mxn",
          price: order.r,
          amount: order.a,
          oid: order.o || uuid()
        };
        if (order.t === 0) {
          asks.splice(
            _.sortedIndexBy(asks, { price: order.r }, "price"),
            0,
            value
          );
        } else {
          bids.splice(
            _.sortedIndexBy(bids, { price: order.r }, "price"),
            0,
            value
          );
        }
      } else {
        if (order.t === 0) {
          asks.splice(_.findIndex(asks, ["oid", order.o]), 1);
        } else {
          bids.splice(_.findIndex(bids, ["oid", order.o]), 1);
        }
      }
    });
  }
  asks = _.orderBy(asks, ["price"], ["desc"]);
  bids = _.orderBy(bids, ["price"], ["desc"]);

  _.forEach(asks, (data, index) => {
    const value = data.price * data.amount;
    let sum = 0;
    if (!index > 0) {
      sum = data.amount;
      asks[index] = _.assign(data, { value, sum });
    } else {
      sum = (asks[index - 1].sum * 1e9 + data.amount * 1e9) / 1e9;
      asks[index] = _.assign(data, { value, sum });
    }
  });
  _.forEach(bids, (data, index) => {
    const value = data.price * data.amount;
    let sum = 0;
    if (!index > 0) {
      sum = data.amount;
      bids[index] = _.assign(data, { value, sum });
    } else {
      sum = (bids[index - 1].sum * 1e9 + data.amount * 1e9) / 1e9;
      bids[index] = _.assign(data, { value, sum });
    }
  });

  return { asks, bids };
};

export default orderData;
