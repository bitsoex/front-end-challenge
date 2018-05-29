<template>
  <div id="buyPositions">
    <div class="head">
      <span class="title">Posturas de Compra</span>
      <div class="value">
        <span class="comparision">MXN</span>
        <span class="type">Bid</span>
        <span class="value">319,140.00</span>
      </div>
    </div>
    <div class="titles">
      <div class="bar"></div>
      <div class="sum">SUM</div>
      <div class="amount">
        <span class="unit">BTC</span> MONTO
      </div>
      <div class="value">
        <span class="comparision">MXN</span> VALOR
      </div>
      <div class="price">
        <span class="comparision">MXN</span> PRECIO
      </div>
    </div>
    <ul class="positions">
      <li v-for="bid in orders.all.bids" v-bind:key="bid.oid">
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
  background-color: #33404d;
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
}

.titles div {
  width: 20%;
  display: inline-block;
  font-size: 12px;
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
  transition: background-color 0s;
}

ul li:hover {
  background-color: rgba(116, 127, 137, 0.4);
}

ul li div {
  width: 20%;
  display: inline-block;
  font-size: 12px;
  color: white;
}

ul li div div.chart {
  width: 20px;
  height: 10px;
  background-color: #87b26b;
}
</style>
