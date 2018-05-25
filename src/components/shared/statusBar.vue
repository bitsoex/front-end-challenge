<template>
  <div id="status-bar">
    <v-select v-model="books.initial" :options="books.available" @input="bookChange" :searchable="false"></v-select>

    <div id="ticker">
      <div class="item vol-24-hrs">
        Volumen 24 hrs.
        <span class="value">{{ticker.volume}} {{books.selected.unit}}</span>
      </div>

      <div class="item max">
        Max.
        <span class="value">{{ticker.high}} {{books.selected.comparision}}</span>
      </div>

      <div class="item min">
        Min.
        <span class="value">{{ticker.low}} {{books.selected.comparision}}</span>
      </div>

      <div class="item variation">
        Variación
        <span class="value"></span>
      </div>
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
  computed: {
    books: function () {
      return this.$store.state.books
    },
    ticker: function () {
      return this.$store.state.ticker
    }
  },
  data () {
    return {
      websocket: {
        open: false
      }
    }
  },
  head: {
    title: function () {
      return {
        inner: this.ticker.last + ' (' + this.books.selected.label.toUpperCase() + ')'
      }
    }
  },
  methods: {
    bookChange (val) { /* function after changing the books select */
      /* fix unwanted feature that deselected the option if you clicked the same that is currently selected */
      if (val !== null) {
        var newBook = {url: val.url, label: val.label, unit: val.unit, comparision: val.comparision}
        this.$store.dispatch('bookChange', newBook)
      } else {
        this.books.initial = this.books.selected
      }
      /* end feature */
      var self = this
      Vue.http.get('https://bitso-challenge.firebaseapp.com/ticker?book=' + this.books.selected.url).then(function (data) {
        self.$store.commit('ticker', data.body.payload)
      }, function (err) {
        console.log(err)
      })

      if (this.websocket.open) {
        websocket.send(JSON.stringify({ action: 'subscribe', book: this.books.selected.url, type: 'trades' }))
        websocket.send(JSON.stringify({ action: 'unsubscribe', book: this.books.last.url, type: 'trades' }))
      }

      this.loadTicker()
    },
    loadTicker (book) {
      var self = this
      Vue.http.get('https://bitso-challenge.firebaseapp.com/ticker?book=' + self.books.selected.url).then(function (data) {
        self.$store.commit('ticker', data.body.payload)
        console.log('ticker update')
        self.$emit('updateHead')
      }, function (err) {
        console.log(err)
      })
    }
  },
  mounted () {
    var self = this

    this.loadTicker('btc_mxn')

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
            self.$store.commit('tradesPush', data.payload[0])
            self.$emit('updateHead')
          }
          break
      }
    }
    /* end websockets */
  },
  name: 'statusBar'
}
</script>

<style scoped>
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
</style>
