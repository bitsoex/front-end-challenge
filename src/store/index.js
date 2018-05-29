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
      dataToWork: [],
      width: '10px',
      high: 0,
      low: 0
    },
    periodicity: '3months',
    interval: '1d'
  },
  dayMode: false,
  diffOrders: [],
  fullscreen: false,
  orders: {
    aggregate: {
      bids: [],
      asks: []
    },
    high: {
      bid: 0,
      ask: 0
    },
    all: {
      bids: [],
      asks: []
    }
  },
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
    state.charts.candles.data = payload.data
  },
  candlesChart (state) {
    var w = document.getElementById('candles-chart').offsetWidth

    var dataToWork = state.charts.candles.data
    var divider
    switch (state.charts.periodicity) {
      case '1month':
        divider = 30
        dataToWork = dataToWork.slice(-30)
        break
      case '3months':
        divider = 90
        dataToWork = dataToWork.slice(-90)
        break
      case '1year':
        divider = 365
        break
    }
    state.charts.candles.dataToWork = dataToWork

    var intervalDataToWork = []
    var i
    var intervalOpen
    var intervalClose
    var intervalHigh = 0
    var intervalLow = 1000000
    var intervalVolume = 0

    switch (state.charts.interval) {
      case '1d':
        break
      case '3d':
        for (i = 0; i < dataToWork.length; i++) {
          if (i % 3 === 0) { // index is even
            intervalVolume = 0
            intervalOpen = parseFloat(dataToWork[i].open)
          }

          if (parseFloat(dataToWork[i].high) > intervalHigh) {
            intervalHigh = parseFloat(dataToWork[i].high)
          }
          if (parseFloat(dataToWork[i].low) < intervalLow) {
            intervalLow = parseFloat(dataToWork[i].low)
          }

          intervalVolume = intervalVolume + parseFloat(dataToWork[i].volume)
          if (i % 3 === 2) {
            intervalClose = parseFloat(dataToWork[i].close)
            intervalDataToWork.push({open: String(intervalOpen), close: String(intervalClose), high: String(intervalHigh), low: String(intervalLow), volume: String(intervalVolume)})
            intervalHigh = 0
            intervalLow = 1000000
          }
        }
        divider = divider / 3
        dataToWork = intervalDataToWork
        break
      case '1w':
        for (i = 0; i < dataToWork.length; i++) {
          if (i % 7 === 0) { // index is even
            intervalVolume = 0
            intervalOpen = parseFloat(dataToWork[i].open)
          }

          if (parseFloat(dataToWork[i].high) > intervalHigh) {
            intervalHigh = parseFloat(dataToWork[i].high)
          }
          if (parseFloat(dataToWork[i].low) < intervalLow) {
            intervalLow = parseFloat(dataToWork[i].low)
          }

          intervalVolume = intervalVolume + parseFloat(dataToWork[i].volume)
          if (i % 7 === 6) {
            intervalClose = parseFloat(dataToWork[i].close)
            intervalDataToWork.push({open: String(intervalOpen), close: String(intervalClose), high: String(intervalHigh), low: String(intervalLow), volume: String(intervalVolume)})
            intervalHigh = 0
            intervalLow = 1000000
          }
        }
        divider = divider / 7
        dataToWork = intervalDataToWork
        break
      case '1m':
        for (i = 0; i < dataToWork.length; i++) {
          if (i % 30 === 0) { // index is even
            intervalVolume = 0
            intervalOpen = parseFloat(dataToWork[i].open)
          }

          if (parseFloat(dataToWork[i].high) > intervalHigh) {
            intervalHigh = parseFloat(dataToWork[i].high)
          }
          if (parseFloat(dataToWork[i].low) < intervalLow) {
            intervalLow = parseFloat(dataToWork[i].low)
          }

          intervalVolume = intervalVolume + parseFloat(dataToWork[i].volume)
          if (i % 30 === 29) {
            intervalClose = parseFloat(dataToWork[i].close)
            intervalDataToWork.push({open: String(intervalOpen), close: String(intervalClose), high: String(intervalHigh), low: String(intervalLow), volume: String(intervalVolume)})
            intervalHigh = 0
            intervalLow = 1000000
          }
        }
        divider = divider / 30
        dataToWork = intervalDataToWork
        break
    }

    var candleWidth = (w - 8) / divider

    var low = 1000000
    var high = 0
    var averageVol = 0

    for (i = 0; i < dataToWork.length; i++) {
      if (parseFloat(dataToWork[i].high) > parseFloat(high)) {
        high = dataToWork[i].high
      }
      if (parseFloat(dataToWork[i].low) < parseFloat(low)) {
        low = dataToWork[i].low
      }
      averageVol = averageVol + parseFloat(dataToWork[i].volume)
    }
    averageVol = averageVol / dataToWork.length

    state.charts.candles.width = candleWidth
    state.charts.candles.high = high
    state.charts.candles.low = low
    state.charts.candles.averageVol = averageVol
    state.charts.candles.dataToWork = dataToWork
  },
  chartPeriodicity (state, payload) {
    switch (payload) {
      case '1m':
        state.charts.periodicity = '1month'
        break
      case '3m':
        state.charts.periodicity = '3months'
        break
      case '1y':
        state.charts.periodicity = '1year'
        break
    }
  },
  chartInterval (state, payload) {
    state.charts.interval = payload
  },
  dayMode (state, payload) {
    state.dayMode = payload
    localStorage.setItem('dayMode', payload)
  },
  fullscreenOn () {
    state.fullscreen = true
  },
  orderBook () {
    var higherBidAmount = 0
    var higherAskAmount = 0
    var i
    Vue.http.get('https://api.bitso.com/v3/order_book?book=' + state.books.selected.url + '&aggregate=true').then(function (data) {
      var bids = {}
      for (i = 0; i < data.body.payload.bids.length; i++) {
        bids[data.body.payload.bids[i].price] = parseFloat(data.body.payload.bids[i].amount)
        if (parseFloat(data.body.payload.bids[i].amount) > higherBidAmount) {
          higherBidAmount = data.body.payload.bids[i].amount
        }
      }
      state.orders.aggregate.bids = bids
      console.log(higherBidAmount)

      var asks = {}
      for (i = 0; i < data.body.payload.asks.length; i++) {
        asks[data.body.payload.asks[i].price] = parseFloat(data.body.payload.asks[i].amount)
      }
      state.orders.aggregate.asks = asks
      console.log(higherAskAmount)
    }, function (err) {
      console.log(err)
    })

    Vue.http.get('https://api.bitso.com/v3/order_book?book=' + state.books.selected.url + '&aggregate=false').then(function (data) {
      state.orders.all.bids = data.body.payload.bids
      for (i = 0; i < data.body.payload.bids.length; i++) {
        if (parseFloat(data.body.payload.bids[i].amount) > higherBidAmount) {
          higherBidAmount = data.body.payload.bids[i].amount
        }
      }
      state.orders.high.bid = higherBidAmount

      state.orders.all.asks = data.body.payload.asks
      for (i = 0; i < data.body.payload.asks.length; i++) {
        if (parseFloat(data.body.payload.asks[i].amount) > higherAskAmount) {
          higherAskAmount = data.body.payload.asks[i].amount
        }
      }
      state.orders.high.ask = higherAskAmount
    }, function (err) {
      console.log(err)
    })
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
      var tradesWithCorrectHour = []
      for (var i = 0; i < allTrades.length; i++) {
        var trade = allTrades[i]
        var dateOfTrade = new Date(trade.created_at)
        trade.created_at = new Date(dateOfTrade).toString().split(' ')[4].split(' ')[0]
        tradesWithCorrectHour.push(trade)
      }
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
      created_at: new Date().toString().split(' ')[4].split(' ')[0],
      maker_side: buyOrSell,
      price: payload.r,
      tid: payload.i
    }
    state.ticker.last = commafy(trade.price)
    state.trades.unshift(trade)
  }
}

const actions = {
  bookChange (context, payload) {
    context.commit('booksSelected', payload)
    context.commit('tradesAll')
    context.commit('candlesChart')
    context.commit('orderBook')
  },
  chartInterval (context, payload) {
    context.commit('chartInterval', payload)
    context.commit('candlesChart')
  },
  chartPeriodicity (context, payload) {
    context.commit('chartPeriodicity', payload)
    context.commit('candlesChart')
  },
  fullscreenOn (context, payload) {
    context.commit('fullscreenOn')
    context.commit('candlesChart')
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
