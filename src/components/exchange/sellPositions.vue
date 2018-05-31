<template>
  <div id="sellPositions">
    <div class="head">
      <span class="title">Posturas de Venta</span>
      <div class="value">
        <span class="comparision">{{book.comparision}}</span>
        <span class="type">Ask</span>
        <span class="value">{{Object.keys(orders.aggregate.asks)[0]}}</span>
      </div>
    </div>
    <div class="titles">
      <div class="price">
        <span class="comparision">{{book.comparision}}</span> PRECIO
      </div>
      <div class="value">
        <span class="comparision">{{book.comparision}}</span> VALOR
      </div>
      <div class="amount">
        <span class="unit">{{book.unit}}</span> MONTO
      </div>
      <div class="sum">SUM</div>
      <div class="bar"></div>
    </div>
    <ul class="positions">
      <li v-for="ask in orders.all.asks" v-bind:key="ask.oid" v-bind:id="ask.oid">
        <div class="price">{{ask.price}}</div>
        <div class="value">{{(parseFloat(ask.amount) * parseFloat(ask.price)).toFixed(2)}}</div>
        <div class="amount">{{ask.amount}}</div>
        <div class="sum">{{orders.aggregate.asks[ask.price]}}</div>
        <div>
          <div class="chart" v-bind:style="{width: (parseFloat(Math.cbrt(ask.amount)) * 75 / parseFloat(Math.cbrt(orders.high.ask))).toString() + '%'}"></div>
        </div>
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
  name: 'sellPositions'
}
</script>

<style scoped>
#sellPositions {
  position: absolute;
  left: calc(50vw - 164px);
  margin-top: 330px;
  height: calc(100vh - 482px);
  width: calc(50vw - 172px);
}

.head {
  width: calc(100% - 3px);
  height: 30px;
  background-color: #1E262E;
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
  width: 17%;
  text-align: right;
}

.titles div.amount {
  width: 25%;
  text-align: right;
}

.titles div.value {
  width: 26%;
  text-align: right;
}

.titles div.price {
  width: 16%;
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
  position: relative;
}

ul li:hover {
  background-color: rgba(116, 127, 137, 0.4);
}

ul li div {
  width: 13%;
  display: inline-block;
  font-size: 13px;
  color: #bdc6cc;
  position: relative;
}

ul li div div.chart {
  width: 20px;
  height: 10px;
  background-color: #C91C3B;
  text-align: right;
  position: absolute;
  right: 0;
  top: -10px;
}

ul li div.sum {
  width: 17%;
  text-align: right;
}

ul li div.amount {
  width: 25%;
  text-align: right;
}

ul li div.value {
  width: 26%;
  text-align: right;
  color: #404B56;
}

ul li div.price {
  width: 16.66%;
  text-align: right;
  color: #732030;
  transition: all 0s;
}

ul li:hover div.price {
  color: #B83049;
}

@media screen and (max-width:1200px) {
  #sellPositions {
    position: absolute;
    left: calc(50vw + 10px);
    margin-top: 348px;
    width: calc(50vw - 72px);
  }
}

@media screen and (max-width: 992px) {
  #sellPositions {
    transform: translate3d(100vw, 0, 0);
    width: 100vw;
    left: 0;
    margin-top: 0;
    height: calc(100vh - 200px);
  }

  #sellPositions ul.positions {
    max-height: calc(100% - 36px);
  }
}
</style>
