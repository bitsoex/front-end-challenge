import _ from "lodash";

const orderData = (orders, data, book) => {
  let { asks, bids, sequence } = orders.data.payload;
  if (data.sequence > sequence) {
    _.map(data.payload, order => {
      if (order.s === "open") {
        const item = {
          book,
          price: order.r,
          amount: order.a,
          oid: order.o,
          value: order.a * order.r
        };
        if (order.t === 0) {
          asks.splice(
            _.sortedIndexBy(asks, { price: order.r }, "price"),
            0,
            item
          );
        } else {
          bids.splice(
            _.sortedIndexBy(bids, { price: order.r }, "price"),
            0,
            item
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
    asks = _.orderBy(asks, ["price"], ["desc"]).slice(-10);
    bids = _.orderBy(bids, ["price"], ["asc"]).slice(-10);

    _.forEach(asks, (data, index) => {
      let sum = 0;
      if (!index > 0) {
        sum = data.amount;
        asks[index] = _.assign(data, { sum });
      } else {
        sum = (asks[index - 1].sum * 1e9 + data.amount * 1e9) / 1e9;
        asks[index] = _.assign(data, { sum });
      }
    });
    _.forEach(bids, (data, index) => {
      let sum = 0;
      if (!index > 0) {
        sum = data.amount;
        bids[index] = _.assign(data, { sum });
      } else {
        sum = (bids[index - 1].sum * 1e9 + data.amount * 1e9) / 1e9;
        bids[index] = _.assign(data, { sum });
      }
    });
  }
  return { asks, bids };
};

export default orderData;
