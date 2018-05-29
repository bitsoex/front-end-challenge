<template>
  <div id="last-trades" v-bind:class="{open: lastTrades.open}">
    <div class="slider" v-on:click="lastTrades.open = !lastTrades.open">
      <img src="../../assets/images/dropdown.svg">
      <div class="title">Últimos Trades</div>
    </div>
    <div class="content">
      <div class="header">
        Últimos Trades
      </div>
      <ul>
        <li class="head">
          <div class="hour">hora</div>
          <div class="price">MXN Precio</div>
          <div class="amount">BTC Monto</div>
        </li>
        <li class="trade" v-for="trade in trades"
            v-bind:key="trade.tid"
            v-bind:class="{sell: trade.maker_side === 'sell'}">
          <div class="hour">{{trade.created_at}}</div>
          <div class="price">{{ trade.price }}</div>
          <div class="amount">
            <div class="gray">{{parseFloat(trade.amount).toFixed(8)}}</div>
            <div class="normal">{{parseFloat(trade.amount)}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      lastTrades: {
        open: false
      }
    }
  },
  computed: {
    trades: function () {
      return this.$store.state.trades
    }
  },
  methods: {
  },
  mounted () {
  },
  name: 'lastTrades'
}
</script>

<style scoped>
#app .slider {
  min-height: calc(100vh - 111px);
  height: 100%;
  width: 44px;
  background: #3c454e;
  cursor: pointer;
}

.slider img {
  position: absolute;
  top: 24px;
  left: 16px;
}

.slider div.title {
  margin-top: 64px;
  color: #B0BAC1;
  text-transform: uppercase;
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  white-space: nowrap;
}
/* LAST TRADES */
  #last-trades {
    position: absolute;
    top: 0;
    left: 0;
    overflow-y: scroll;
    overflow-x: hidden;
    width: 302px;
    transform: translate3d(-258px, 0 , 0);
    transition: all 0.3s;
    z-index: 500;
    background: #21282f;
  }

  #last-trades.open {
    transform: translate3d(0, 0 , 0);
  }

  #last-trades .slider img {
    transform: rotate(270deg);
  }

  #last-trades.open .slider img {
    transform: rotate(90deg);
  }

  #last-trades .slider {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
  }

  #last-trades .content {
    height: calc(100vh - 72px);
    width: 272px;
  }

  #last-trades .content .header {
    width: 226px;
    height: 30px;
    background-color: #33404d;
    font-family: 'DIN_Medium';
    text-transform: uppercase;
    color: #bdc6cc;
    text-align: left;
    line-height: 30px;
    position: absolute;
    top: 12px;
    left: 16px;
    padding-left: 16px;
    display: none;
  }

  #last-trades .content ul {
    margin: 0 0 0 0;
    padding: 34px 0 0 0;
    list-style: none;
    max-height: calc(100vh - 145px);
    overflow-y: scroll;
    overflow-x: hidden;
  }

  #last-trades .content .head {
    color: #949da2;
    text-transform: uppercase;
    width: calc(100% - 74px);
    margin-left: 16px;
    height: 32px;
    line-height: 32px;
    font-size: 11px;
    text-align: left;
    position: fixed;
    top: 0;
    left: 0;
    background: #21282f;
    padding-left: 14px;
    z-index: 10;
  }

  #last-trades .content ul li.head div {
    display: inline-block;
    height: 32px;
    width: 30%;
  }

  #last-trades .content ul li.head div.hour {
    width: 56px;
  }

  #last-trades .content ul li.head div.amount {
    margin-left: 16px;
  }

  #last-trades .content ul li.trade {
    color: #606b76;
    position: relative;
    font-size: 12px;
    transition: all 0s;
    cursor: pointer;
    margin-left: 16px;
    padding-left: 12px;
    text-align: left;
  }

  #last-trades .content ul li.trade:hover {
    color: #ffffff;
    background: #363e45;
  }

  #last-trades .content ul li.trade div {
    display: inline-block;
    width: calc(50% - 44px);
    line-height: 20px;
    height: 20px;
    transition: all 0s;
  }

  #last-trades .content ul li.trade div.hour {
    width: 64px;
  }

  #last-trades .content ul li.trade div.price {
    width: calc(50% - 72px);
    text-align: center;
    color: #5e814e;
  }

  #last-trades .content ul li.trade.sell div.price {
    color: #7f3741;
  }

  #last-trades .content ul li.trade:hover div.price {
    color: #90c969;
  }

  #last-trades .content ul li.trade.sell:hover div.price {
    color: #ba3040;
  }

  #last-trades .content ul li.trade div.amount {
    color: #bdc6cc;
    position: absolute;
    right: 50px;
    text-align: right;
    width: auto;
  }

  #last-trades .content ul li.trade div.amount .normal {
    position: absolute;
    left: 0;
    color: #BDC6CC;
    width: auto;
  }

  #last-trades .content ul li.trade:hover div.amount .normal {
    color: #FFFFFF;
  }

  #last-trades .content ul li.trade div.amount .gray {
    color: #616B77;
    text-align: right;
    width: auto;
  }

/* END LAST TRADES */

@media screen and (min-width:1200px) {

  #last-trades {
    transform: translate3d(0, 0, 0);
    width: 256px;
  }

  #last-trades .slider {
    display: none;
  }

  #last-trades .content {
    width: 302px;
  }

  #last-trades .content .header {
    display: block;
  }

  #last-trades .content ul {
    margin-top: 42px;
  }

  #last-trades .content ul li.head {
    width: 100%;
    margin-top: 42px;
  }

  #last-trades .content ul li.trade .amount {
    margin-left: -10px;
  }
}

#app.day #last-trades {
  background: #FFFFFF;
}

#app.day #last-trades .content .header {
  background: #F0F0F0;
  color: rgba(0, 0, 0, 0.8);
}

#app.day #last-trades .content ul .head {
  background: #FFFFFF;
}

#app.day #last-trades .content ul li.trade:hover {
  background: rgba(0, 0, 0, 0.05);
}

#app.day #last-trades .content ul li.trade .hour {
  color: #abc;
}

#app.day #last-trades .content ul li.trade:hover .hour {
  color: #abc;
}

#app.day #last-trades .content ul li.trade .price {
  color: #86AF6B;
}

#app.day #last-trades .content ul li.trade:hover .price {
  color: #80C156;
}

#app.day #last-trades .content ul li.trade.sell .price {
  color: #CC4458;
}

#app.day #last-trades .content ul li.trade.sell:hover .price {
  color: #BA3040;
}

#app.day #last-trades .content ul li.trade .amount {
  color: #abc;
}

#app.day #last-trades .content ul li.trade:hover .amount {
  color: #abc;
}
</style>
