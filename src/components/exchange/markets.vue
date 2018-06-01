<template>
  <div id="markets" v-bind:class="{open: open}">
    <div class="slider" v-on:click="open = !open">
      <img src="../../assets/images/dropdown.svg">
      <div class="title">Mercados</div>
    </div>

    <div class="content">
      <div class="head">
        Mercados 24 hrs
      </div>
      <ul>
        <li v-for="(market, index) in markets"
            v-bind:key="index"
            v-bind:class="{closed: openMarket !== index}">
          <div class="head" v-on:click="openMarket = index">
            <span>{{index.replace('_', '/')}}</span>
            <div v-bind:class="{up: markets[index].values[7].value > markets[index].values[6].value}">
              {{markets[index].values[7].value}} {{index.split('_')[1]}}
            </div>
          </div>
          <div class="body">
            <svg height="64" width="238" class="chart_svg">
             <line :x1="0" :y1="64 - (parseFloat(markets[index].values[0].value - parseFloat(markets[index].low)) * 64 / markets[index].diff)"
                   x2="34" :y2="64 - (parseFloat(markets[index].values[1].value - parseFloat(markets[index].low)) * 64 / markets[index].diff)" />

             <line :x1="34" :y1="64 - (parseFloat(markets[index].values[1].value - parseFloat(markets[index].low)) * 64 / markets[index].diff)"
                   x2="68" :y2="64 - (parseFloat(markets[index].values[2].value - parseFloat(markets[index].low)) * 64 / markets[index].diff)" />

             <line :x1="68" :y1="64 - (parseFloat(markets[index].values[2].value - parseFloat(markets[index].low)) * 64 / markets[index].diff)"
                   x2="102" :y2="64 - (parseFloat(markets[index].values[3].value - parseFloat(markets[index].low)) * 64 / markets[index].diff)" />

             <line :x1="102" :y1="64 - (parseFloat(markets[index].values[3].value - parseFloat(markets[index].low)) * 64 / markets[index].diff)"
                   x2="136" :y2="64 - (parseFloat(markets[index].values[4].value - parseFloat(markets[index].low)) * 64 / markets[index].diff)" />

             <line :x1="136" :y1="64 - (parseFloat(markets[index].values[4].value - parseFloat(markets[index].low)) * 64 / markets[index].diff)"
                   x2="170" :y2="64 - (parseFloat(markets[index].values[5].value - parseFloat(markets[index].low)) * 64 / markets[index].diff)" />

             <line :x1="170" :y1="64 - (parseFloat(markets[index].values[5].value - parseFloat(markets[index].low)) * 64 / markets[index].diff)"
                   x2="204" :y2="64 - (parseFloat(markets[index].values[6].value - parseFloat(markets[index].low)) * 64 / markets[index].diff)" />

             <line :x1="204" :y1="64 - (parseFloat(markets[index].values[6].value - parseFloat(markets[index].low)) * 64 / markets[index].diff)"
                   x2="238" :y2="64 - (parseFloat(markets[index].values[7].value - parseFloat(markets[index].low)) * 64 / markets[index].diff)" />
            </svg>
          </div>
        </li>
      </ul>
      <div class="fixer"></div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    books: function () {
      return this.$store.state.books
    }
  },
  data () {
    return {
      open: false,
      openMarket: 'btc_mxn',
      one: 1,
      two: 100,
      markets: {
        btc_mxn: {
          values: [{value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}],
          diff: 1,
          high: 0,
          low: 0
        },
        bch_btc: {
          values: [{value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}],
          diff: 1,
          high: 0,
          low: 0
        },
        bch_mxn: {
          values: [{value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}],
          high: 0,
          diff: 1,
          low: 0
        },
        eth_btc: {
          values: [{value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}],
          high: 0,
          diff: 1,
          low: 0
        },
        eth_mxn: {
          values: [{value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}],
          high: 0,
          diff: 1,
          low: 0
        },
        ltc_btc: {
          values: [{value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}],
          high: 0,
          diff: 1,
          low: 0
        },
        ltc_mxn: {
          values: [{value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}],
          high: 0,
          diff: 1,
          low: 0
        },
        xrp_btc: {
          values: [{value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}],
          high: 0,
          diff: 1,
          low: 0
        },
        xrp_mxn: {
          values: [{value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}],
          high: 0,
          diff: 1,
          low: 0
        }
      }
    }
  },
  methods: {
    calcGraphs () {
      var self = this
      var books = this.$store.state.books
      var low
      var high
      for (var i = 0; i < Object.keys(this.markets).length; i++) {
        low = 1000000
        high = 0
        var key = Object.keys(self.markets)[i]
        self.markets[key].values = books.values[key].slice(-8)

        for (var j = 0; j < self.markets[key].values.length; j++) {
          if (parseFloat(self.markets[key].values[j].value) < low) {
            low = self.markets[key].values[j].value
          }

          if (parseFloat(self.markets[key].values[j].value) > high) {
            high = self.markets[key].values[j].value
          }
        }

        self.markets[key].high = high
        self.markets[key].low = low
        self.markets[key].diff = high - low
      }
    },
    checkValuesLoaded () {
      var self = this
      setTimeout(function () {
        if (self.$store.state.books.values['bch_mxn'].length === 0) {
          self.checkValuesLoaded()
        } else {
          self.calcGraphs()
        }
      }, 300)
    }
  },
  mounted () {
    this.checkValuesLoaded()
  },
  name: 'markets'
}
</script>

<style scoped>
#app .slider {
  min-height: calc(100vh - 115px);
  height: 100%;
  width: 36px;
  background: #2D353E;
  cursor: pointer;
  font-size: 14px;
}

.slider img {
  position: absolute;
  top: 24px;
  left: 12px;
}

.slider div.title {
  margin-top: 64px;
  color: #B0BAC1;
  text-transform: uppercase;
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  white-space: nowrap;
}

/* MARKETS */
  #markets {
    position: absolute;
    top: 2px;
    right: 0;
    height: calc(100vh - 115px);
    width: 300px;
    overflow-y: scroll;
    transform: translate3d(264px, 0 , 0);
    transition: all 0.3s;
    z-index: 90;
  }

  #markets.open {
    transform: translate3d(0, 0 , 0);
  }

  #markets .slider img {
    transform: rotate(90deg);
  }

  #markets.open .slider img {
    transform: rotate(270deg);
  }

  #markets .slider {
    position: absolute;
    top: 0;
    left: 0;
  }

  #markets .content {
    height: calc(100vh - 115px);
    background: #181E24;
    width: 260px;
    margin-left: 36px;
    padding-left: 2px;
  }

  #markets .content .head {
    width: calc(100% - 32px);
    height: 40px;
    background: #424A51;
    padding: 0 16px;
    line-height: 40px;
    text-transform: uppercase;
    color: #AEBAC2;
    text-align: left;
    font-size: 14px;
  }

  #markets .content ul {
    list-style: none;
    margin: 2px 0 0 0;
    padding: 0;
  }

  #markets .content ul li div.head {
    height: 44px;
    width: calc(100% - 32px);
    background: #22292D;
    border-bottom: 1px solid #333B43;
    cursor: pointer;
    position: relative;
    z-index: 20;
  }

  #markets .content ul li div.head div {
    position: absolute;
    top: 0;
    right: 16px;
    color: #B4344C;
  }

  #markets .content ul li div.head div.up {
    color: #69C142;
  }

  #markets .content ul li div.body {
    height: 104px;
    width: 100%;
    background: #151A1E;
    position: relative;
    z-index: 19;
  }

  #markets .content ul li.closed div.body {
    height: 0;
  }

    #markets .content ul li div.body svg {
      margin-top: 16px;
    }

  #markets .content ul li div.body svg line {
    stroke: #5CA93E;
    stroke-width: 2;
  }

  #markets .content .fixer {
    height: 200px;
    width: 100%;
    background: #181E24;
    position: relative;
    z-index: 20;
  }
/* MARKETS */

@media screen and (max-width: 992px) {
  div.slider {
    display: none;
  }

  #markets {
    width: 100vw;
    transform: translate3d(200vw, 0 , 0);
  }

  #markets .content {
    width: 100vw;
    margin-left: 0;
  }

  #mobile-tab-bar {
    display: block;
  }
}

/* DAY MODE */
#app.day #markets .slider {
  background: #E5E5E5;
}

#app.day #markets .slider .title {
  color: #747F89;
}

#app.day #markets .head {
  background: #F5F5F5;
}

#app.day #markets .content {
  background: #FFFFFF;
}

#app.day #markets .content ul li div.head {
  background: #E5E5E5;
  border-bottom: 1px solid #F5F5F5;
}

#app.day #markets .content ul li div.body {
  background: #F5F5F5;
}

#app.day #markets .content .fixer {
  background: #FFFFFF;
}
/* END DAY MODE */
</style>
