import _ from "lodash";

/**
 * Parse orders to bids/asks tables.
 * @param {Array<Object>} orders last orders
 * @param {Array<Object>} data diff-orders
 * @param {string} book ticker
 * @returns {Object} asks & bids array of orders
 */
const orderData = (orders, data, book) => {
  let { asks, bids, sequence } = orders.data.payload;
  // console.log(orders);
  if (data.sequence > sequence) {
    _.map(data.payload, order => {
      if (order.s === "open") {
        const item = {
          book,
          price: +order.r,
          amount: +order.a,
          oid: order.o,
          value: +order.a * +order.r
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
    // console.log('INDEX Desordenado',_.sortedIndexBy(asks, { price: lastBuy }, "price"));
    asks = _.orderBy(asks, ["price"], ["desc"]).slice(-15);
    bids = _.orderBy(bids, ["price"], ["asc"]).slice(-15);
    // let i = 0;
    // for (i; i < asks.length - 1; i++) {
    //   if (lastBuy > asks[i]) {
    //     console.log('I',i);
    //     break;
    //   }
    // }
    // console.log('INDEX',i, asks.length);
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
