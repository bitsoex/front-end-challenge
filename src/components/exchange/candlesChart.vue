<template>
  <div id="candles-chart">
    <div class="background">
      <div class="vertical"></div>
      <div class="vertical"></div>
      <div class="vertical"></div>
      <div class="vertical"></div>
      <div class="vertical"></div>
      <div class="vertical"></div>
      <div class="vertical"></div>
      <div class="vertical"></div>
      <div class="vertical"></div>
      <div class="vertical"></div>
      <div class="vertical"></div>
      <div class="vertical"></div>
      <div class="vertical"></div>
      <div class="vertical"></div>
      <div class="vertical"></div>
      <div class="vertical"></div>
      <div class="vertical"></div>

      <hr>
      <hr style="top:75px">
      <hr style="top:150px">
      <hr style="top:225px">

    </div>
    <div class="column"
         v-bind:key="column.date"
         v-for="column in candlesChart.data"
         v-bind:style="{width: candlesChart.width + 'px'}"
         v-bind:class="{up: column.open < column.close}">

         <div class="line"
              v-bind:style="{height: String(Math.abs((column.high - column.low)/pixelValue )) + 'px',
                             marginTop: String((candlesChart.high - column.high)/pixelValue) + 'px'}"></div>
         <div class="body"
              v-bind:style="{marginTop: String((candlesChart.high - Math.max(column.open, column.close))/pixelValue) + 'px',
                             height: String(Math.abs((column.open - column.close)/pixelValue )) + 'px'}">
         </div>

         <div class="bottom"></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

export default {
  computed: {
    booksSelected: function () {
      console.log('candles change books')
      return this.$store.state.books.selected
    },
    candlesChart: function () {
      return this.$store.state.charts.candles
    },
    difference: function () {
      return this.$store.state.charts.candles.high - this.$store.state.charts.candles.low
    },
    pixelValue: function () {
      return (this.$store.state.charts.candles.high - this.$store.state.charts.candles.low) / 225
    }
  },
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  },
  name: 'candlesChart'
}
</script>

<style scoped>
#candles-chart {
  height: 282px;
  width: calc(100vw - 368px);
  margin-top: 32px;
  font-size: 0;
  position: absolute;
  overflow: hidden;
}

#candles-chart .column {
  display: inline-block;
  height: 282px;
  width: 20px;
  transition: all 0s;
  position: relative;
}

#candles-chart .column:hover {
  background: rgba(0, 0, 0, 0.3);
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
  top: 0;
  left: 2px;
  box-sizing: border-box;
  width: calc(100% - 4px);
  height: 20px;
  background: #59252F;
  border: 1px solid #BA3040;
  transition: background-color 0s;
}

#candles-chart .column:hover .body {
  background-color: #7e2732;
}

#candles-chart .column.up .body {
  background: #44583F;
  border: 1px solid #80C156;
}

#candles-chart .column.up:hover .body {
  background-color: #64785F;
}

#candles-chart .column .bottom {
  position: absolute;
  left: 2px;
  bottom: 0;
  width: calc(100% - 4px);
  background: #384555;
  opacity: 0.4;
  height: 40px;
  transition: opacity 0s;
}

#candles-chart .column:hover .bottom {
  opacity: 1;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  height: 282px;
  width: 100vw;
  overflow: hidden;
}

.background .vertical {
  height: 100%;
  width: 1px;
  background: #313D47;
  margin-right: 200px;
  display: inline-block;
}

.background hr {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px dashed #313D47;
  margin: 1em 0;
  padding: 0;
}

@media screen and (max-width: 1200px) {
  #candles-chart {
    margin-top: 56px;
    margin-left: 56px;
    width: calc(100vw - 112px);
  }
}
</style>
