<template>
  <div class="exchange">
    <div class="exchange-content" v-bind:style="{transform: mobilePagePosition}">
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
              <div class="price">MXN Precio</div>
              <div class="amount">BTC Monto</div>
            </li>
            <li class="trade" v-for="trade in trades"
                v-bind:key="trade.tid"
                v-bind:class="{sell: trade.maker_side === 'sell'}">
              <div class="hour">{{trade.created_at.split('T')[1].split('+')[0]}}</div>
              <div class="price">{{parseFloat(Math.round(trade.price * 100) / 100).toFixed(2)}}</div>
              <div class="amount">{{parseFloat(trade.amount)}}</div>
            </li>
          </ul>
        </div>
      </div>

      <div id="chart">
        <div class="select chartTypeChange" v-bind:class="{open: chart.type.selectVisible}">
          <div class="selected" v-on:click="chartTypeOptions()">
            <img src="../assets/images/candles.svg" v-bind:class="{transparent: chart.type.selected === 'triangles'}">
            <img src="../assets/images/triangles.svg" class="triangles" v-bind:class="{transparent: chart.type.selected === 'candles'}">
            <img src="../assets/images/dropdown.svg" class="dropdown">
          </div>

          <ul class="chartTypeChangeOptions">
            <li class="candles" v-on:click="chartTypeSelect('candles')">
              <img src="../assets/images/candles.svg">
            </li>

            <li class="triangles" v-on:click="chartTypeSelect('triangles')">
              <img src="../assets/images/triangles.svg">
            </li>
          </ul>
        </div>

        <div class="select chartPeriodicityChange" v-bind:class="{open: chart.periodicity.selectVisible}">
          <span> Periodo </span>
          <div class="selected" v-on:click="chartPeriodicityOptions()">
            <span> {{chart.periodicity.selected}} </span>
            <img src="../assets/images/dropdown.svg" class="dropdown">
          </div>

          <ul class="chartPeriodicityChangeOptions">
            <li v-for="option in chart.periodicity.options" v-on:click="chartPeriodicitySelect(option)" v-bind:key="option">
              <span> {{option}} </span>
            </li>
          </ul>
        </div>

        <div class="select chartIntervalChange" v-bind:class="{open: chart.interval.selectVisible}">
          <span> Intervalo </span>
          <div class="selected" v-on:click="chartIntervalOptions()">
            <span> {{chart.interval.selected}} </span>
            <img src="../assets/images/dropdown.svg" class="dropdown">
          </div>

          <ul class="chartIntervalChangeOptions">
            <li v-for="option in chart.interval.options" v-on:click="chartIntervalSelect(option)" v-bind:key="option">
              <span> {{option}} </span>
            </li>
          </ul>
        </div>

        <candles-chart></candles-chart>

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
import VueResource from 'vue-resource'

import candlesChart from './exchange/candlesChart.vue'

var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})

Vue.use(VueResource)

Vue.component('v-select', vSelect)

export default {
  components: {
    'candles-chart': candlesChart
  },
  computed: {
    trades: function () {
      return this.$store.state.trades
    }
  },
  name: 'Exchange',
  data () {
    return {
      chart: {
        type: {
          selected: 'candles',
          options: ['candles', 'triangles'],
          selectVisible: false
        },
        periodicity: {
          selected: '3m',
          options: ['1m', '3m', '1y'],
          selectVisible: false
        },
        interval: {
          selected: '1d',
          options: ['1d', '3d', '1w', '1m'],
          selectVisible: false
        }
      },
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
    chartTypeOptions () {
      this.chart.type.selectVisible = !this.chart.type.selectVisible
      this.chart.periodicity.selectVisible = false
      this.chart.interval.selectVisible = false
    },
    chartTypeSelect (option) {
      this.chart.type.selected = option
    },
    chartPeriodicityOptions () {
      this.chart.periodicity.selectVisible = !this.chart.periodicity.selectVisible
      this.chart.type.selectVisible = false
      this.chart.interval.selectVisible = false
    },
    chartPeriodicitySelect (option) {
      console.log(option)
      this.chart.periodicity.selected = option
      this.chart.periodicity.selectVisible = false
      this.$store.dispatch('chartPeriodicity', option)
    },
    chartIntervalOptions () {
      this.chart.interval.selectVisible = !this.chart.interval.selectVisible
      this.chart.periodicity.selectVisible = false
      this.chart.type.selectVisible = false
    },
    chartIntervalSelect (option) {
      console.log(option)
      this.chart.interval.selected = option
      this.chart.interval.selectVisible = false
      this.$store.dispatch('chartInterval', option)
    },
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
    var self = this
    /* select */
    document.addEventListener('click', function (e) {
      var classes = e.target.className.split(' ')
      if (classes.indexOf('selected') === -1) {
        classes = e.target.parentElement.className.split(' ')
        if (classes.indexOf('selected') === -1) {
          self.chart.type.selectVisible = false
          self.chart.periodicity.selectVisible = false
          self.chart.interval.selectVisible = false
        }
      }
    })
    /* end select */
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  transition: all 0.3s;
}

.exchange {
  position: relative;
  width: 100vw;
  height: calc(100vh - 111px);
}

.exchange-content {
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
    margin-left: 10px;
    width: 80px;
  }

  #last-trades .content ul li.trade {
    color: #606b76;
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
  }

  #last-trades .content ul li.trade:hover div.amount {
    color: #FFFFFF;
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

/* CHART */
  #chart {
    position: relative;
    text-align: left;
  }

  #chart .select {
    display: inline-block;
    color: #d6d6d6;
    font-size: 12px;
    font-family: 'DIN_Light';
    margin-right: 40px;
  }

  #chart .chartTypeChange {
    cursor: pointer;
    width: 56px;
  }

  #chart .chartTypeChange .selected {
    position: relative;
    z-index: 10;
    height: 20px;
    border-radius: 10px;
    background: #313a46;
    z-index: 20;
  }

  #chart .chartTypeChange ul {
    list-style: none;
    margin: -10px 0 0 0;
    padding: 10px 0 0 0;
    border-radius: 0 0 10px 10px;
    border: 1px solid #404e5f;
    background: #313a46;
    position: relative;
    z-index: 19;
    transition: all 0.3s;
  }

  #chart .chartTypeChange ul li {
    width: 54px;
    height: 32px;
    transition: all 0s;
    text-align: center;
  }

  #chart .chartTypeChange ul li:nth-child(2) {
    border-radius: 0 0 10px 10px;
  }

  #chart .chartTypeChange ul li:hover {
    background: #363e45;
  }

  #chart .chartTypeChange ul li img {
    margin-top: 8px;
  }

  #chart .chartTypeChange .chartTypeChangeOptions {
    display: none;
    position: absolute;
  }

  #chart .chartTypeChange.open .chartTypeChangeOptions {
    display: block;
  }

  #chart .chartTypeChange .selected img {
    position: absolute;
    top: 2px;
    right: 24px;
  }

  #chart .chartTypeChange.open .selected img.dropdown {
    transform: rotate(180deg);
  }

  #chart .chartTypeChange .selected img.dropdown {
    position: absolute;
    top: 8px;
    right: 8px;
  }

  #chart .chartTypeChange .selected img.triangles {
    margin-top: 2px;
  }

  #chart .chartPeriodicityChange {
    cursor: pointer;
    position: absolute;
    top: 16px;
  }

  #chart .chartIntervalChange {
    cursor: pointer;
    position: absolute;
    top: 16px;
    left: 236px;
  }

  #chart .chartPeriodicityChange ul, #chart .chartIntervalChange ul {
    display: none;
    background: #313a46;
  }

  #chart .chartPeriodicityChange.open ul, #chart .chartIntervalChange.open ul {
    display: block;
  }

  #chart .chartPeriodicityChange > *, #chart .chartIntervalChange > * {
    display: inline-block;
  }

  #chart .chartPeriodicityChange span, #chart .chartIntervalChange span {
    margin-right: 10px;
  }

  #chart .chartPeriodicityChange .selected, #chart .chartIntervalChange .selected {
    height: 20px;
    width: 48px;
    border: 1px solid #404e5f;
    border-radius: 10px;
    text-align: center;
    position: relative;
    z-index: 32;
    background: #313a46;
  }

  #chart .chartPeriodicityChange .selected img, #chart .chartIntervalChange .selected img {
    position: absolute;
    top: 7px;
    right: 6px;;
  }

  #chart .chartPeriodicityChange.open .selected img, #chart .chartIntervalChange.open .selected img {
    transform: rotate(180deg);
  }

  #chart .chartPeriodicityChange ul, #chart .chartIntervalChange ul {
    list-style: none;
    margin: 0;
    padding: 10px 0 0 0;
    border: 1px solid #404e5f;
    position: absolute;
    top: 10px;
    right: 0;
    width: 48px;
    text-align: center;
    z-index: 30;
    border-radius: 0 0 10px 10px;
  }

  #chart .chartPeriodicityChange ul li, #chart .chartIntervalChange ul li {
    height: 32px;
    transition: all 0s;
    line-height: 32px;
  }

  #chart .chartPeriodicityChange ul li:hover, #chart .chartIntervalChange ul li:hover {
    background: #363e45;
  }

  #chart .chartPeriodicityChange ul li:last-child, #chart .chartIntervalChange ul li:last-child {
    border-radius: 0 0 10px 10px;
  }

  #chart .chartPeriodicityChange ul li span, #chart .chartIntervalChange ul li span {
    margin-right: 0;
  }
/* END CHART */

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

  #chart {
    margin: 0 0 0 280px;
    padding-top: 16px;
  }
}

@media screen and (max-width:1200px) {
  #chart .select.chartTypeChange {
    position: absolute;
    top: 16px;
    left: 56px;
  }

  #chart .select.chartPeriodicityChange {
    margin-left: 140px;
  }

  #chart .select.chartIntervalChange {
    margin-left: 32px;
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

#app.day #markets .slider {
  background: #5C4B51;
}

#app.day #markets .slider .title {
  color: #747F89;
}
/* END DAY MODE */
</style>
