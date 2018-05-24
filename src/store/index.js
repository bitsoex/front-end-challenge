import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  dayMode: false,
  diffOrders: [],
  orders: [],
  trades: []
}

const mutations = {
  dayMode (state, payload) {
    state.dayMode = payload
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

    console.log('here')
    console.log(trade)
    state.trades.unshift(trade)
  }
}

const actions = {
  dayMode (context, payload) {
    context.commit('dayMode', payload)
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
