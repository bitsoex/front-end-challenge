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
         v-for="(column, index) in candlesChart.dataToWork"
         v-bind:style="{width: candlesChart.width + 'px'}"
         v-bind:class="{up: column.open < column.close}">

         <div class="line"
              v-bind:style="{height: String(Math.abs((column.high - column.low)/pixelValue )) + 'px',
                             marginTop: String((candlesChart.high - column.high)/pixelValue) + 'px'}"></div>
         <div class="body"
              v-bind:style="{marginTop: String((candlesChart.high - Math.max(column.open, column.close))/pixelValue) + 'px',
                             height: String(Math.abs((column.open - column.close)/pixelValue )) + 'px'}">
         </div>

         <div class="bottom"
              v-bind:style="{height: String(column.volume * 27 / candlesChart.averageVol) + 'px'}"></div>

         <div class="tooltip"
              v-bind:class="{left: index > (candlesChart.dataToWork.length / 2)}"
              v-bind:style="{marginTop: String(Math.max(8, (candlesChart.high - Math.max(column.open, column.close))/pixelValue - 50)) + 'px'}">
           <div class="open"> <span>Open</span> ${{parseFloat(Math.round(column.open * 100) / 100).toFixed(2)}} {{booksSelected.comparision}}</div>
           <div class="close"> <span>Close</span> ${{parseFloat(Math.round(column.close * 100) / 100).toFixed(2)}} {{booksSelected.comparision}}</div>
           <div class="high"> <span>High</span> ${{parseFloat(Math.round(column.high * 100) / 100).toFixed(2)}} {{booksSelected.comparision}}</div>
           <div class="low"> <span>Low</span> ${{parseFloat(Math.round(column.low * 100) / 100).toFixed(2)}} {{booksSelected.comparision}}</div>
           <div class="vol"> <span>Vol.</span> {{parseFloat(Math.round(column.volume * 100) / 100).toFixed(2)}} {{booksSelected.unit}}</div>
           <div class="indicator"></div>
         </div>

         <div class="hover-fixer"></div>
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
  transition: all 3s;
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
  position: relative;
  z-index: 4;
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
  z-index: 5;
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
  left: 1px;
  bottom: 0;
  width: calc(100% - 2px);
  background: #384555;
  opacity: 0.4;
  height: 40px;
  transition: opacity 0s;
  transition: height 0.3s;
  z-index: 3;
}

#candles-chart .column:hover .bottom {
  opacity: 1;
}

#candles-chart .column .tooltip {
  position: absolute;
  opacity: 0;
  top: 0;
  left: calc(100% + 8px);
  height: 80px;
  width: 128px;
  border: 1px solid #4F5A62;
  transition: opacity 0s;
  background: rgba(37, 44, 54, .90);
  border-radius: 5px;
  z-index: 10;
  color: #B0BAC1;
  font-size: 12px;
  text-align: right;
  padding: 12px 18px;
  letter-spacing: -1px;
  text-transform: uppercase;
}

#candles-chart .column .tooltip.left {
  left: unset;
  right: calc(100% + 8px);
}

#candles-chart .column .tooltip span {
  color: #FFFFFF;
  text-transform: capitalize;
  margin-right: 4px;
}

#candles-chart .column:hover .tooltip {
  opacity: 1;
}

#candles-chart .column:hover .tooltip div {
  height: 16px;
}

#candles-chart .column .tooltip div.indicator {
  position: absolute;
  top: 43px;
  left: -8px;
  height: 12px;
  width: 12px;
  background: rgba(37, 44, 54, .90);
  border-left: 1px solid #4F5A62;
  border-bottom: 1px solid #4F5A62;
  transform: rotate(45deg);
  transition: all 0s;
}

#candles-chart .column .tooltip.left div.indicator {
  left: 158px;
  transform: rotate(-135deg);
}

#candles-chart .column .hover-fixer {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  height: 282px;
  z-index: 20;
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

#app.day #candles-chart .column:hover {
  background: rgba(0, 0, 0, 0.1);
}

#app.day #candles-chart .column .body {
  background: #CC4458;
  border: 1px solid #BA3040;
}

#app.day #candles-chart .column:hover .body {
  background-color: #BA3040;
}

#app.day #candles-chart .column.up .body {
  background: #98D372;
  border: 1px solid #80C156;
}

#app.day #candles-chart .column.up:hover .body {
  background-color: #80C156;
}

#app.day #candles-chart .column .bottom {
  background: rgba(56, 69,85, 0.4);
}

#app.day #candles-chart .column:hover .bottom {
  background: rgba(56, 69,85, 0.6);
}

#app.day .background .vertical {
  background: #CCCCCC;
}

#app.day .background hr {
  border-top: 1px dashed #CCCCCC;
}

</style>
