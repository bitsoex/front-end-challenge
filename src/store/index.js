import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  books: {
    available: [],
    last: {url: 'btc_mxn', label: 'btc/mxn', unit: 'btc', comparision: 'mxn'},
    initial: {url: 'btc_mxn', label: 'btc/mxn', unit: 'btc', comparision: 'mxn'},
    selected: {url: 'btc_mxn', label: 'btc/mxn', unit: 'btc', comparision: 'mxn'}
  },
  charts: {
    candles: {
      data: [],
      width: '10px',
      high: 0,
      low: 0
    }
  },
  dayMode: false,
  diffOrders: [],
  orders: [],
  ticker: {
    ask: '-',
    bid: '-',
    book: '-',
    created_at: '-',
    high: '-',
    last: '-',
    low: '-',
    volume: '-',
    vwap: '-'
  },
  trades: []
}

const mutations = {
  booksSelected (state, payload) {
    state.books.selected = payload
  },
  candlesChart (state, payload) {
    Vue.http.get('https://bitso-challenge.firebaseapp.com/chart?' + state.books.selected.url + '&' + '3months').then(function (data) {
      var w = document.getElementById('candles-chart').offsetWidth

      var candleWidth = (w - 8) / data.body.length

      var low = 1000000
      var high = 0

      for (var i = 0; i < data.body.length; i++) {
        if (data.body[i].high > high) {
          high = data.body[i].high
        }
        if (data.body[i].low < low) {
          low = data.body[i].low
        }
      }

      var payload = {width: candleWidth, data: data.body, high: high, low: low}
      state.charts.candles = payload
    })
  },
  dayMode (state, payload) {
    state.dayMode = payload
    localStorage.setItem('dayMode', payload)
  },
  ticker (state, payload) {
    state.ticker.ask = commafy(payload.ask)
    state.ticker.bid = commafy(payload.bid)
    state.ticker.book = payload.book
    state.ticker.created_at = payload.created_at
    state.ticker.high = commafy(payload.high)
    state.ticker.last = commafy(payload.last)
    state.ticker.low = commafy(payload.low)
    state.ticker.volume = commafy(payload.volume)
    state.ticker.vwap = commafy(payload.vwap)
  },
  tradesAll (state, payload) {
    Vue.http.get('https://api.bitso.com/v3/trades?book=' + state.books.selected.url + '&limit=50').then(function (data) {
      var allTrades = data.body.payload
      state.trades = allTrades
    }, function (err) {
      console.log(err)
    })
  },
  tradesPush (state, payload) {
    var buyOrSell
    if (payload.t === 1) {
      buyOrSell = 'sell'
    } else {
      buyOrSell = 'buy'
    }

    var trade = {
      amount: payload.a,
      book: 'btc_mxn',
      created_at: new Date().toISOString().split('.')[0],
      maker_side: buyOrSell,
      price: payload.r,
      tid: payload.i
    }

    state.ticker.last = trade.price
    state.trades.unshift(trade)
  }
}

const actions = {
  bookChange (context, payload) {
    context.commit('booksSelected', payload)
    context.commit('tradesAll')
    context.commit('candlesChart')
  },
  dayMode (context, payload) {
    context.commit('dayMode', payload)
  },
  candlesChart (context, payload) {
    context.commit('candlesChart', payload)
  },
  ticker (context, payload) {
    context.commit('ticker', payload)
  },
  tickerLastPrice (context, payload) {
    context.commit('tickerLastPrice', payload)
  },
  tradesAll (context, payload) {
    context.commit('tradesAll', payload)
  },
  tradesPush (context, payload) {
    context.commit('tradesPush', payload)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})

function commafy (num) { /* function to style strings into money format */
  var str = num.toString().split('.')
  if (str[0].length >= 5) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1\'')
  }
  if (str[1] && str[1].length >= 5) {
    str[1] = str[1].replace(/(\d{3})/g, '$1')
  }
  return str.join('.')
}

console.log('store')
