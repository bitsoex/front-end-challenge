<template>
  <div id="app" v-bind:class="{day: dayMode === true}">
    <div id="navbar">
      <img class="logo color" src="./assets/images/bitso-logo-color.svg">
      <img class="logo" src="./assets/images/bitso-logo.svg">
      <div class="divider-line logo-line"></div>
      <div class="subtitle">Exchange</div>

      <div class="bitcoin-price">
        1 {{books.selected.unit}} = {{currentPriceStr}} {{books.selected.comparision}}
      </div>

      <div class="divider-line btc-line"></div>

      <div class="wallet">
        <div> Wallet </div>
        <img src="./assets/images/dropdown.svg">
      </div>

      <div class="exchange">
        <div> Exchange </div>
        <img src="./assets/images/dropdown.svg">
      </div>

      <div class="ayuda">
        <div> Ayuda </div>
      </div>

      <div class="user">
        <div class="user-pic">
          <div class="outer"></div>
          <div class="inner"></div>
        </div>
        <div class="text"> Usuario </div>
        <img src="./assets/images/dropdown.svg">
      </div>

      <div class="dayMode_switch" v-on:click="toggleDayMode()">
        <div class="button">
          <div class="outer"></div>
          <div class="inner"></div>
        </div>

        <img class="moon" src="./assets/images/moon.svg">
      </div>

      <div id="mobile-menu" v-on:click="mobileMenu.open = !mobileMenu.open" v-bind:class="{open: mobileMenu.open}">
        <div class="menu-line first"></div>
        <div class="menu-line second"></div>
        <div class="menu-line third"></div>
      </div>

      <div id="mobile-menu-view" v-bind:class="{open: mobileMenu.open}">
      </div>

    </div>

    <div id="status-bar">
      <v-select v-model="books.initial" :options="books.available" @input="bookChange" :searchable="false"></v-select>

      <div id="ticker">
        <div class="item vol-24-hrs">
          Volumen 24 hrs.
          <span class="value">{{ticker.vol}} {{books.selected.unit}}</span>
        </div>

        <div class="item max">
          Max.
          <span class="value">{{ticker.max}} {{books.selected.comparision}}</span>
        </div>

        <div class="item min">
          Min.
          <span class="value">{{ticker.min}} {{books.selected.comparision}}</span>
        </div>

        <div class="item variation">
          Variación
          <span class="value"></span>
        </div>
      </div>
    </div>

    <div id="content">
      <router-view/>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueHead from 'vue-head'
import vSelect from 'vue-select'

Vue.use(VueResource)
Vue.use(VueHead)

Vue.component('v-select', vSelect)

var websocket = new WebSocket('wss://ws.bitso.com')

export default {
  name: 'App',
  computed: {
    currentPriceStr: function () {
      return this.commafy(this.ticker.price)
    }
  },
  data () {
    return {
      books: {
        available: [],
        last: {url: 'btc_mxn', label: 'btc/mxn', unit: 'btc', comparision: 'mxn'},
        initial: {url: 'btc_mxn', label: 'btc/mxn', unit: 'btc', comparision: 'mxn'},
        selected: {url: 'btc_mxn', label: 'btc/mxn', unit: 'btc', comparision: 'mxn'}
      },
      dayMode: false,
      mobileMenu: {
        open: false
      },
      ticker: {
        vol: '-',
        max: '-',
        min: '-',
        price: '-'
      },
      websocket: {
        open: false
      }
    }
  },
  head: {
    title: function () {
      return {
        inner: this.currentPriceStr + ' (' + this.books.selected.label.toUpperCase() + ')'
      }
    }
  },
  methods: {
    bookChange (val) { /* function after changing the books select */
      /* fix unwanted feature that deselected the option if you clicked the same that is currently selected */
      if (val !== null) {
        console.log(val.comparision)
        this.books.selected = {url: val.url, label: val.label, unit: val.unit, comparision: val.comparision}
      } else {
        this.books.initial = this.books.selected
      }
      /* end feature */
      var self = this
      Vue.http.get('https://bitso-challenge.firebaseapp.com/ticker?book=' + this.books.selected.url).then(function (data) {
        self.ticker.vol = data.body.payload.volume
        self.ticker.max = data.body.payload.high
        self.ticker.min = data.body.payload.low
        console.log(data.body.payload.book)
      }, function (err) {
        console.log(err)
      })

      if (this.websocket.open) {
        websocket.send(JSON.stringify({ action: 'subscribe', book: this.books.selected.url, type: 'trades' }))
        websocket.send(JSON.stringify({ action: 'unsubscribe', book: this.books.last.url, type: 'trades' }))
      }

      this.loadTicker()
    },
    commafy (num) { /* function to style strings into money format */
      var str = num.toString().split('.')
      if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1\'')
      }
      if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ')
      }
      return str.join('.')
    },
    loadTicker (book) {
      var self = this
      Vue.http.get('https://bitso-challenge.firebaseapp.com/ticker?book=' + self.books.selected.url).then(function (data) {
        self.ticker.price = data.body.payload.last
        console.log('ticker update')
        self.$emit('updateHead')
      }, function (err) {
        console.log(err)
      })
    },
    loadAvailableBooks () {
      var self = this
      Vue.http.get('https://api.bitso.com/v3/available_books/').then(function (data) {
        var booksLoaded = data.body.payload
        var books = []
        for (var i = 0; i < booksLoaded.length; i++) {
          var name = booksLoaded[i]['book'].replace('_', '/')
          var unit = booksLoaded[i]['book'].split('_')[0]
          var comparision = booksLoaded[i]['book'].split('_')[1]
          books.push({url: booksLoaded[i]['book'], label: name, unit: unit, comparision: comparision})
        }
        self.books.available = books
      }, function (err) {
        console.log(err)
      })
    },
    loadTrades () {
      var self = this
      Vue.http.get('https://api.bitso.com/v3/trades?book=' + this.books.selected.url + '&limit=50').then(function (data) {
        var allTrades = data.body.payload
        self.$store.commit('tradesAll', allTrades)
      }, function (err) {
        console.log(err)
      })
    },
    toggleDayMode () {
      var move = !this.dayMode
      this.dayMode = move
      console.log(move)
      localStorage.setItem('dayMode', this.dayMode)
    }
  },
  mounted () {
    var self = this

    /* day mode from localStorage */
    var dayMode = (localStorage.getItem('dayMode') === 'true')
    this.dayMode = dayMode
    /* end day mode */

    /* websockets */
    websocket.onopen = function () {
      self.websocket.open = true
      websocket.send(JSON.stringify({ action: 'subscribe', book: 'btc_mxn', type: 'trades' }))
      // websocket.send(JSON.stringify({ action: 'subscribe', book: 'btc_mxn', type: 'diff-orders' }))
      // websocket.send(JSON.stringify({ action: 'subscribe', book: 'btc_mxn', type: 'orders' }))
    }

    websocket.onmessage = function (message) {
      var data = JSON.parse(message.data)
      switch (data.type) {
        case 'trades':
          if (data.book === self.books.selected.url) {
            self.ticker.price = data.payload[0].r
            self.$emit('updateHead')
            console.log(data.payload[0])
            self.$store.commit('tradesPush', data.payload[0])
          }
          break
      }
    }
    /* end websockets */

    this.loadTicker('btc_mxn')
    this.loadAvailableBooks()

    /* load trades */
    this.loadTrades()
    /* end load trades */
  }
}
</script>

<style>

  html, body {
    margin: 0;
    padding: 0;
    background: #21282f;
    overflow-x: hidden;
    -webkit-touch-callout: none;                /* prevent callout to copy image, etc when tap to hold */
    -webkit-text-size-adjust: none;             /* prevent webkit from resizing text to fit */
    -webkit-user-select: none;                  /* prevent copy paste, to allow, change 'none' to 'text' */
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  * {
    transition: all 0.3s;
  }

  @font-face {
    font-family: 'DIN_Light';
    src: url('./assets/font/DINPro-Light.otf');
  }

  @font-face {
    font-family: 'DIN_Medium';
    src: url('./assets/font/DINPro-Medium.otf');
  }

  @font-face {
    font-family: 'DIN_Regular';
    src: url('./assets/font/DINPro-Regular.otf');
  }

  #app {
    font-family: 'DIN_Medium', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding: 0;
    margin: 66px 0 0 0;
  }

  /* SHARED COMPONENTS */
    .divider-line {
      width: 1px;
      height: 12px;
      background: #979797;
    }
  /* END SHARED COMPONENTS */

  /* NAVBAR */
    #navbar {
      position: fixed;
      top: 0;
      left: 0;
      height: 66px;
      width: 100vw;
      background: #252c36;
      z-index: 1000;
      font-family: 'DIN_Light';
      color: #bdc6cc;
    }

    #navbar .logo {
      position: absolute;
      top: 17px;
      left: 32px;
      cursor: pointer;
    }

    #navbar .logo.color {
      opacity: 0;
    }

    #navbar .divider-line.logo-line {
      position: absolute;
      top: 27px;
      left: 150px;
    }

    #navbar .subtitle {
      position: absolute;
      top: 22px;
      left: 173px;
      text-transform: uppercase;
    }

    #navbar .bitcoin-price {
      position: absolute;
      top: 22px;
      right: 668px;
      text-transform: uppercase;
    }

    #navbar .divider-line.btc-line {
      position: absolute;
      top: 21px;
      right: 628px;
      height: 24px;
    }

    #navbar .wallet {
      position: absolute;
      top: 0;
      right: 516px;
      width: 112px;
      height: 66px;
      line-height: 66px;
      cursor: pointer;
    }

    #navbar .wallet img {
      position: absolute;
      top: 32px;
      right: 12px;
    }

    #navbar .exchange {
      position: absolute;
      top: 0;
      right: 404px;
      width: 112px;
      height: 66px;
      line-height: 66px;
      cursor: pointer;
    }

    #navbar .exchange img {
      position: absolute;
      top: 32px;
      right: 4px;
    }

    #navbar .ayuda {
      position: absolute;
      top: 0;
      right: 292px;
      width: 112px;
      height: 66px;
      line-height: 66px;
      cursor: pointer;
    }

    #navbar .user {
      position: absolute;
      top: 0;
      right: 138px;
      width: 154px;
      height: 66px;
      line-height: 66px;
      cursor: pointer;
    }

    #navbar .user .outer {
      position: absolute;
      top: 9px;
      left: 9px;
      height: 48px;
      width: 48px;
      background: #606b76;
      border-radius: 24px;
    }

    #navbar .user .inner {
      position: absolute;
      top: 12px;
      left: 12px;
      height: 38px;
      width: 38px;
      background: #606b76;
      border-radius: 21px;
      border: 2px solid #252c36;
    }

    #navbar .user .text {
      position: absolute;
      top: 0;
      left: 72px;
    }

    #navbar .user img {
      position: absolute;
      top: 32px;
      right: 0;
    }

    #navbar .dayMode_switch {
      position: absolute;
      top: 23px;
      right: 60px;
      height: 20px;
      width: 48px;
      border-radius: 10px;
      background-color: #1d2228;
      cursor: pointer;
    }

    #navbar .dayMode_switch .button {
      position: absolute;
      top: 0;
      right: 0;
      transition: all 0.3s;
      z-index: 9;
    }

    #navbar .dayMode_switch .button .outer {
      position: absolute;
      top: 2px;
      right: 3px;
      height: 16px;
      width: 16px;
      border-radius: 8px;
      background: #606b76;
    }

    #navbar .dayMode_switch .button .inner {
      position: absolute;
      top: 4px;
      right: 5px;
      height: 10px;
      width: 10px;
      border-radius: 8px;
      background: #606b76;
      border: 1px solid #1d2228;
    }

    #navbar .dayMode_switch .moon {
      position: absolute;
      top: 5px;
      left: 8px;
    }

    #navbar .mobile-menu {
      display: none;
    }

    #navbar #mobile-menu-view {
      display: none;
    }
  /* END NAVBAR */

  /* STATUS BAR */
    #status-bar {
      position: fixed;
      top: 66px;
      left: 0;
      width: 100vw;
      height: 44px;
      background: #1d2228;
      z-index: 10;
    }

    #status-bar .dropdown {
      height: 44px;
      width: 160px;
      text-transform: uppercase;
      text-align: center;
      color: #97BB7E;
      font-family: 'DIN_Medium';
      font-size: 16px;
    }

    #status-bar .dropdown * {
      transition: all 0s;
    }

    #status-bar .dropdown.v-select .dropdown-toggle {
      border:none;
    }

    #status-bar .dropdown.v-select input {
      height: 44px;
      line-height: 44px;
    }

    #status-bar .v-select .open-indicator::before {
      height: 8px;
      width: 8px;
      border-color: #B0BAC1;
      position: absolute;
      top: -2px;
      left: -20px;
    }

    #status-bar .dropdown button.clear {
      display: none;
    }

    #status-bar .dropdown .selected-tag {
      color: #97BB7E;
      pointer-events: none;
      position: absolute;
      top: 2px;
      margin-left: 32px;
    }

    #status-bar .dropdown-menu {
      text-align: center;
      color: #97BB7E !important;
      background: #1D2228;
    }

    #status-bar .dropdown-menu li a {
      color: #97BB7E;
    }

    #status-bar .dropdown-menu li.highlight a {
      background: #566A51;
      color: #FFFFFF;
    }

    #status-bar .dropdown-menu li:hover a {
      background: #363E45;
    }

    #status-bar #ticker {
      position: absolute;
      top: 0;
      left: 160px;
      color: #767D83;
      font-size: 14px;
      height: 44px;
      line-height: 40px;
    }

    #status-bar #ticker .item {
      display: inline-block;
      margin-right: 32px;
    }

    #status-bar #ticker .item .value {
      color: #9D9FA0;
      text-transform: uppercase;
    }

  /* END STATUS BAR */

  #content {
    position: fixed;
    top: 110px;
    left: 0;
    background: #21282f;
    border-top: solid 1px #2d3540;
    min-height: calc(100vh - 111px);
  }

  @media screen and (max-width:1200px) {
    #navbar {
      font-size: 14px;
    }

    #navbar .dayMode_switch {
      right: 32px;
    }

    #navbar .user {
      right: 100px;
    }

    #navbar .user img {
      right: 8px;
    }

    #navbar .ayuda {
      right: 244px;
    }

    #navbar .exchange {
      right: 356px;
    }

    #navbar .wallet {
      right: 468px;
    }

    #navbar .divider-line.btc-line {
      right: 580px;
    }

    #navbar .bitcoin-price {
      right: 610px;
    }
  }

  @media screen and (max-width:992px) {
    #navbar .divider-line.logo-line {
      left: 140px;
    }

    #navbar .subtitle {
      left: 153px;
    }

    #navbar .btc-line, #navbar .wallet, #navbar .exchange, #navbar .ayuda, #navbar .user {
      display: none;
    }

    #navbar #mobile-menu {
      display: block;
      position: absolute;
      top: 26px;
      right: 24px;
      height: 18px;
      width: 24px;
      cursor: pointer;
      z-index: 999;
    }

    #navbar .bitcoin-price {
      right: 166px;
    }

    #navbar #mobile-menu .menu-line {
      position: absolute;
      height: 2px;
      width: 24px;
      background: #bdc6cc;
      left: 0;
    }

    #navbar #mobile-menu .menu-line.first {
      top: 0;
    }

    #navbar #mobile-menu.open .menu-line.first {
      top: 6px;
      transform: rotate(45deg);
    }

    #navbar #mobile-menu .menu-line.second {
      top: 6px;
    }

    #navbar #mobile-menu.open .menu-line.second {
      opacity: 0;
    }

    #navbar #mobile-menu .menu-line.third {
      top: 12px;
    }

    #navbar #mobile-menu.open .menu-line.third {
      top: 6px;
      transform: rotate(-45deg);
    }

    #navbar #mobile-menu-view {
      position: relative;
      display: block;
      transform: translate3d(0, -100vh, 0);
      height: 100vh;
      width: 100vw;
      background: rgba(0, 0, 0, 0.75);
      z-index: 900;
    }

    #navbar #mobile-menu-view.open {
      transform: translate3d(0, 0, 0);
    }

    #navbar .dayMode_switch {
      right: 84px;
    }
  }

  @media screen and (max-width:576px) {
    #navbar .bitcoin-price {
      display: none;
    }

    #navbar .dayMode_switch {
      display: none;
    }
  }

  @media screen and (max-width:320px) {
    #navbar .divider-line.logo-line {
      display: none;
    }

    #navbar .subtitle {
      display: none;
    }
  }

  /* DAY MODE */
    .dayMode {
      opacity: 0;
    }

    #app.day .dayMode {
      opacity: 1;
    }

    #app.day #navbar {
      background: #FFF;
      color: #4E5863;
      box-shadow: 0 1px 3px #888;
    }

    #app.day .logo {
      opacity: 0;
    }

    #app.day .logo.color {
      opacity: 1;
    }

    #app.day #navbar .user .outer {
      background: #BDC6CC;
    }

    #app.day #navbar .user .inner {
      background: #BDC6CC;
      border: 2px solid #FFF;
    }

    #app.day #navbar .dayMode_switch {
      background: #FFF;
      box-shadow: inset 0 1px 2px #888;
    }

    #app.day #navbar .dayMode_switch .button {
      transform: translate3d(-26px, 0, 0);
    }

    #app.day #navbar .dayMode_switch .button .outer, #app.day #navbar .dayMode_switch .button .inner {
      background: #EBC256;
    }

    #app.day #navbar .dayMode_switch .button .outer {
      box-shadow: 0 1px 3px #EBC256;
    }

    #app.day #navbar .dayMode_switch .button .inner {
      border: 1px solid #FFF;
    }

    #app.day #status-bar {
      background: #F0F0F0;
    }

    #app.day #content {
      border-top: solid 1px #ccc;
      background: #FFF;
    }

    #app.day #status-bar .dropdown-menu {
      background: #FFFFFF;
    }
  /* END DAY MODE */
</style>
