<template>
  <div id="app" v-bind:class="{day: dayMode === true}">

    <navbar></navbar>

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

import navbar from './components/shared/navbar.vue'

Vue.use(VueResource)
Vue.use(VueHead)

Vue.component('v-select', vSelect)

var websocket = new WebSocket('wss://ws.bitso.com')

export default {
  name: 'App',
  components: {
    'navbar': navbar
  },
  computed: {
    currentPriceStr: function () {
      return this.commafy(this.ticker.price)
    },
    dayMode: function () {
      return this.$store.state.dayMode
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
    }
  },
  mounted () {
    var self = this

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

  .transparent {
    opacity: 0;
  }

  .hidden {
    display: none;
  }

  ::-webkit-scrollbar { width: 0 !important }

  * {
    -ms-overflow-style: none;
  }
  /* SHARED COMPONENTS */
    .divider-line {
      width: 1px;
      height: 12px;
      background: #979797;
    }
  /* END SHARED COMPONENTS */

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

    #status-bar .v-select.open .open-indicator::before {
      top: -4px;
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

  /* DAY MODE */
    .dayMode {
      opacity: 0;
    }

    #app.day .dayMode {
      opacity: 1;
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
