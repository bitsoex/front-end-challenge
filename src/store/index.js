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
  dayMode (state, payload) {
    state.dayMode = payload
    localStorage.setItem('dayMode', payload)
  },
  booksSelected (state, payload) {
    state.books.selected = payload
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
    state.trades = payload
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
  dayMode (context, payload) {
    context.commit('dayMode', payload)
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
