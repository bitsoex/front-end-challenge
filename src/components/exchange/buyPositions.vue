<template>
  <div id="buyPositions">
    <div class="head">
      <span class="title">Posturas de Compra</span>
      <div class="value">
        <span class="comparision">{{book.comparision}}</span>
        <span class="type">Bid</span>
        <span class="value">{{Object.keys(orders.aggregate.bids)[0]}}</span>
      </div>
    </div>
    <div class="titles">
      <div class="bar"></div>
      <div class="sum">SUM</div>
      <div class="amount">
        <span class="unit">{{book.unit}}</span> MONTO
      </div>
      <div class="value">
        <span class="comparision">{{book.comparision}}</span> VALOR
      </div>
      <div class="price">
        <span class="comparision">{{book.comparision}}</span> PRECIO
      </div>
    </div>
    <ul class="positions">
      <li v-for="bid in orders.all.bids" v-bind:key="bid.oid" v-bind:id="bid.oid">
        <div>
          <div class="chart" v-bind:style="{width: (parseFloat(Math.cbrt(bid.amount)) * 75 / parseFloat(Math.cbrt(orders.high.bid))).toString() + '%'}"></div>
        </div>
        <div class="sum">{{orders.aggregate.bids[bid.price]}}</div>
        <div class="amount">{{bid.amount}}</div>
        <div class="value">{{(parseFloat(bid.amount) * parseFloat(bid.price)).toFixed(2)}}</div>
        <div class="price">{{bid.price}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    book: function () {
      return this.$store.state.books.selected
    },
    orders: function () {
      return this.$store.state.orders
    }
  },
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  },
  name: 'buyPositions'
}
</script>

<style scoped>
#buyPositions {
  position: absolute;
  margin-top: 330px;
  height: calc(100vh - 482px);
  width: calc(50vw - 172px);
}

.head {
  border-left: 3px solid #97bb7e;
  width: calc(100% - 3px);
  height: 30px;
  background-color: #25313D;
  color: #bdc6cc;
}

.head .title {
  text-transform: uppercase;
  line-height: 28px;
  margin-left: 12px;
}

.head div.value {
  position: absolute;
  top: 0;
  right: 0;
  line-height: 28px;
  margin-right: 20px;
  font-size: 13px;
}

.head div.value span.comparision {
  color: #606b76;
  text-transform: uppercase;
}

.head div.value span.type {
  color: #90999f;
}

.head div.value span.value {
  color:  #90999f;
}

.titles {
  color: #787f85;
  font-size: 0;
  height: 36px;
  line-height: 36px;
  text-transform: uppercase;
}

.titles div {
  width: 13%;
  display: inline-block;
  font-size: 12px;
}

.titles div.sum {
  width: 11%;
  text-align: right;
}

.titles div.amount {
  width: 26%;
  text-align: right;
}

.titles div.value {
  width: 24%;
  text-align: right;
}

.titles div.price {
  width: calc(26% - 16px);
  text-align: right;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: scroll;
  max-height: calc(100vh - 550px);
}

ul li {
  width: 100%;
  font-size: 0;
  height: 20px;
  line-height: 20px;
  background-color: transparent;
  transition: all 0s;
}

ul li:hover {
  background-color: #282F36;
}

ul li div {
  width: 13%;
  display: inline-block;
  font-size: 13px;
  color: #bdc6cc;
  transition: all 0s;
}

ul li:hover div {
  color: #FFFFFF;
}

ul li div div.chart {
  width: 20px;
  height: 10px;
  background-color: #87b26b;
  text-align: left;
}

ul li div.sum {
  width: 11%;
  text-align: right;
}

ul li div.amount {
  width: 26%;
  text-align: right;
}

ul li div.value {
  width: 24%;
  text-align: right;
  color: #404B56;
}

ul li div.price {
  width: calc(26% - 16px);
  text-align: right;
  color: #8bc166;
}

@media screen and (max-width:1200px) {
  #buyPositions {
    position: absolute;
    left: 56px;
    margin-top: 348px;
    width: calc(50vw - 56px);
  }
}

@media screen and (max-width: 992px) {
  #buyPositions {
    transform: translate3d(-100vw, 0, 0);
    width: 100vw;
    left: 0;
    margin-top: 0;
    height: calc(100vh - 200px);
  }

  #buyPositions ul.positions {
    max-height: calc(100% - 36px);
  }
}
</style>
