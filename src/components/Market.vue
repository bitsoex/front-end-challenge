<template>
  <div class="market">
    <div class="market-content" v-bind:style="{transform: mobilePagePosition}">
      <div id="last-trades" v-bind:class="{open: lastTrades.open}">
        <div class="slider" v-on:click="lastTrades.open = !lastTrades.open">
          <img src="../assets/images/dropdown.svg">
          <div class="title">Últimos Trades</div>
        </div>
        <div class="content">
          <div class="header">
            Últimos Trades
          </div>
          <ul>
            <li class="head">
              <div class="hour">hora</div>
              <div class="price">Precio</div>
              <div class="amount">Monto</div>
            </li>
            <li class="trade" v-for="trade in trades" v-bind:key="trade.tid">
              <div class="hour">{{trade.created_at.split('T')[1].split('+')[0]}}</div>
              <div class="price">{{parseFloat(Math.round(trade.price * 100) / 100).toFixed(2)}}</div>
              <div class="amount">{{trade.amount}}</div>
            </li>
          </ul>
        </div>
      </div>

      <div id="chart">
      </div>

      <div id="positions">
      </div>

      <div id="markets" v-bind:class="{open: markets.open}">
        <div class="slider" v-on:click="markets.open = !markets.open">
          <img src="../assets/images/dropdown.svg">
          <div class="title">Mercados</div>
        </div>

        <div class="content"></div>
      </div>
    </div>

    <div id="mobile-tab-bar">
      <div class="nav first"  v-on:click="tab(1)"></div>
      <div class="nav second" v-on:click="tab(2)"></div>
      <div class="nav third"  v-on:click="tab(3)"></div>
      <audio id="tab-bar-audio">
       <source src="/static/Click-Fast-With-Swipe.m4a" type="audio/mp4">
      </audio>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import vSelect from 'vue-select'

var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})

Vue.component('v-select', vSelect)

export default {
  computed: {
    trades: function () {
      return this.$store.state.trades
    }
  },
  name: 'Market',
  data () {
    return {
      lastTrades: {
        open: false
      },
      markets: {
        open: false
      },
      mobilePagePosition: 'translate3d(0, 0, 0)'
    }
  },
  methods: {
    tab (t) {
      switch (t) {
        case 1:
          this.mobilePagePosition = 'translate3d(100vw, 0, 0)'
          break
        case 2:
          this.mobilePagePosition = 'translate3d(0, 0, 0)'
          break
        case 3:
          this.mobilePagePosition = 'translate3d(-100vw, 0, 0)'
          break
        default:
          this.mobilePagePosition = 'translate3d(0, 0, 0)'
          break
      }
      var x = document.getElementById('tab-bar-audio')
      x.play()
      console.log(t)
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  transition: all 0.3s;
}

.market {
  position: relative;
  width: 100vw;
  height: calc(100vh - 111px);
}

.market-content {
  transition: all 0.3s;
}

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
    width: 302px;
    transform: translate3d(-258px, 0 , 0);
    transition: all 0.3s;
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
  }

  #last-trades .content {
    height: calc(100vh - 111px);
    width: 258px;
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
    margin: 40px 0 0 0;
    padding: 0;
    list-style: none;
    max-height: calc(100vh - 151px);
    overflow-y: scroll;
    overflow-x: hidden;
  }

  #last-trades .content ul li.head {
    color: #949da2;
    text-transform: uppercase;
    width: calc(100% - 20px);
    margin-left: 32px;
    height: 32px;
    line-height: 32px;
    font-size: 11px;
    text-align: left;
  }

  #last-trades .content ul li.head div {
    display: inline-block;
    width: 32%;
  }

  #last-trades .content ul li.head div.hour {
    width: 64px;
  }

  #last-trades .content ul li.trade {
    color: #606b76;
    font-size: 12px;
    transition: all 0s;
    cursor: pointer;
    margin-left: 32px;
    text-align: left;
  }

  #last-trades .content ul li.trade:hover {
    color: #ffffff;
    background: #363e45;
  }

  #last-trades .content ul li.trade div {
    display: inline-block;
    width: calc(50% - 35px);
    line-height: 20px;
    height: 20px;
    transition: all 0s;
  }

  #last-trades .content ul li.trade div.hour {
    width: 64px;
  }
/* END LAST TRADES */

/* PURCHASE AND SELL POSITIONS */
  #positions {
  }
/* END PURCHASE AND SELL POSITIONS */

/* MARKETS */
  #markets {
    position: absolute;
    top: 0;
    right: 0;
    height: calc(100vh - 111px);
    width: 364px;
    overflow-y: scroll;
    transform: translate3d(320px, 0 , 0);
    transition: all 0.3s;
  }

  #markets.open {
    transform: translate3d(0, 0 , 0);
  }

  #markets .slider img {
    transform: rotate(90deg);
  }

  #markets.open .slider img {
    transform: rotate(270deg);
  }

  #markets .slider {
    position: absolute;
    top: 0;
    left: 0;
  }

  #markets .content {
    height: calc(100vh - 111px);
    background: purple;
    width: 320px;
    margin-left: 44px;
  }
/* MARKETS */

/* MOBILE TAB BAR */
  #mobile-tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 56px;
    width: 100vw;
    background: #252c36;
    z-index: 1000;
    display: none;
  }

  #mobile-tab-bar .nav {
    position: absolute;
    border-right: 1px solid red;
    height: 56px;
    width: 33vw;
    top: 0;
  }

  #mobile-tab-bar .nav.first {
    left: 0;
  }

  #mobile-tab-bar .nav.second {
    left: 33vw;
  }

  #mobile-tab-bar .nav.third {
    left: 66vw;
  }
/* END MOBILE TAB BAR */

@media screen and (min-width:1200px) {

  #last-trades {
    transform: translate3d(0, 0, 0);
  }

  #last-trades .slider {
    display: none;
  }

  #last-trades .content .header {
    display: block;
  }
}

@media screen and (max-width:767px) {
  #last-trades, #markets {
    width: 100vw;
  }

  #last-trades {
    transform: translate3d(-100vw, 0 , 0);
  }

  #last-trades .content {
    width: 100vw;
  }

  #markets {
    transform: translate3d(100vw, 0 , 0);
  }

  #markets .content {
    width: 100vw;
    margin-left: 0;
  }

  #last-trades .slider, #markets .slider {
    background: transparent;
    opacity: 0;
  }

  #mobile-tab-bar {
    display: block;
  }
}

/* DAY MODE */
/* END DAY MODE */
</style>
