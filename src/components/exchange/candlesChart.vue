<template>
  <div id="candles-chart">
    <div class="column"
         v-bind:key="column.date"
         v-for="column in chart.data"
         v-bind:style="{width: chart.width + 'px'}"
         v-bind:class="{up: column.open < column.close}">

         <div class="line"></div>
         <div class="body"
              v-bind:style="{height: String(Math.abs((column.open - column.close)/62.5 )) + 'px'}">
         </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

export default {
  data () {
    return {
      chart: {
        data: [],
        width: '10px',
        high: 0,
        low: 0
      }
    }
  },
  methods: {
    chartLoad () {
      var self = this
      Vue.http.get('https://bitso-challenge.firebaseapp.com/chart?' + 'btc_mxn' + '&' + '3months').then(function (data) {
        var w = document.getElementById('candles-chart').offsetWidth

        var candleWidth = w / data.body.length

        self.chart.width = candleWidth
        self.chart.data = data.body

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
        self.chart.high = high
        console.log(high)
        self.chart.low = low
        console.log(low)
      }, function (err) {
        console.log(err)
      })
    }
  },
  mounted () {
    /* chart */
    this.chartLoad()
    /* end chart */
  },
  name: 'candlesChart'
}
</script>

<style scoped>
#candles-chart {
  height: 282px;
  width: calc(100vw - 374px);
  margin-top: 32px;
  font-size: 0;
}

#candles-chart .column {
  display: inline-block;
  height: 282px;
  width: 20px;
  transition: all 0s;
  position: relative;
}

#candles-chart .column:hover {
  background: #000000;
}

#candles-chart .column .line {
  margin: 0 auto;
  width: 2px;
  height: 40px;
  background: #BA3040;
}

#candles-chart .column.up .line {
  background: #80C156;
}

#candles-chart .column .body {
  position: absolute;
  top: 10px;
  left: 2px;
  box-sizing: border-box;
  width: calc(100% - 4px);
  height: 20px;
  background: #59252F;
  border: 1px solid #BA3040;
}

#candles-chart .column.up .body {
  background: #44583F;
  border: 1px solid #80C156;
}
</style>
