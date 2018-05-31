<template>
  <div id="depthMarket">
    <div class="bids">
      <div class="bid"
           v-for="(index, bar) in orders.aggregate.bids"
           v-bind:style="{width: parseFloat(Math.abs(bar - bidHighest) * bidDivider) + 'px', height: (parseFloat(index) * bidHeight).toString() + 'px'}"
           v-bind:key="bar">
      </div>
    </div>

    <div class="asks">
      <div class="ask"
           v-for="(index, bar) in orders.aggregate.asks"
           v-bind:style="{width: parseFloat(Math.abs(bar - askHighest) * askDivider * -1) + 'px', height: (parseFloat(index) * bidHeight).toString() + 'px'}"
           v-bind:key="bar">
           <span style="font-size:0">{{bar}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    orders: function () {
      return this.$store.state.orders
    },
    bidDivider: function () {
      var width = document.getElementById('depthMarket').offsetWidth
      return width * 0.5 / (this.bidHighest - Object.keys(this.orders.aggregate.bids)[49])
    },
    bidHighest: function () {
      return this.$store.state.orders.bid.highest
    },
    bidHeight: function () {
      var total = 0
      for (var i = 0; i < this.orders.all.bids.length; i++) {
        total = total + parseFloat(this.orders.all.bids[i].amount)
      }
      if (window.innerWidth > 992) {
        return 282 / total
      } else {
        return (window.innerHeight - 360) / total
      }
    },
    askDivider: function () {
      var width = document.getElementById('depthMarket').offsetWidth
      return width * 0.5 / (this.askHighest - Object.keys(this.orders.aggregate.asks)[49])
    },
    askHighest: function () {
      return parseFloat(Object.keys(this.$store.state.orders.aggregate.asks)[0])
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
  name: 'depthMarket'
}
</script>

<style scoped>
#depthMarket {
  height: 282px;
  width: calc(100vw - 368px);
  position: absolute;
  margin-top: 32px;
  overflow: hidden;
}

.bid {
  width: 40px;
  height: 5.64px;
  background: #40593D;
}

.bids {
  position: absolute;
  left: 0;
  bottom: 0;
}

.asks {
  position: absolute;
  right: 0;
  bottom: 0;
  transform: rotateY(180deg);
}

.ask {
  width: 40px;
  height: 5.64px;
  background: #60212E;
}

@media screen and (max-width:992px) {
  #depthMarket {
    width: 100vw;
    height: calc(100vh - 199px);
  }
}
</style>
