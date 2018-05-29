<template>
  <div id="app" v-bind:class="{day: dayMode === true}">
    <fullscreen :fullscreen.sync="fullscreen">
      <navbar></navbar>

      <status-bar></status-bar>

      <div id="content">
        <router-view/>
      </div>
    </fullscreen>
  </div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'

import navbar from './components/shared/navbar.vue'
import statusBar from './components/shared/statusBar.vue'

import fullscreen from 'vue-fullscreen'

Vue.use(VueResource)
Vue.use(fullscreen)

export default {
  name: 'App',
  components: {
    'navbar': navbar,
    'status-bar': statusBar
  },
  computed: {
    currentPriceStr: function () {
      return this.$store.state.ticker.last
    },
    dayMode: function () {
      return this.$store.state.dayMode
    },
    books: function () {
      return this.$store.state.books
    },
    fullscreen: function () {
      return this.$store.state.fullscreen
    },
    ticker: function () {
      this.$emit('updateHead')
      return this.$store.state.ticker
    }
  },
  data () {
    return {
    }
  },
  methods: {
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
    }
  },
  mounted () {
    this.loadAvailableBooks()

    /* load trades */
    this.$store.commit('tradesAll')
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

  .blur {
    filter: blur(3px);
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
    position: absolute;
    z-index: 20;
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
  /* END STATUS BAR */

  #content {
    position: fixed;
    top: 110px;
    left: 0;
    background: #21282f;
    border-top: solid 1px #2d3540;
    min-height: calc(100vh - 111px);
    z-index: 11;
  }

  /* DAY MODE */
    .dayMode {
      opacity: 0;
    }

    #app.day .dayMode {
      opacity: 1;
    }

    #app.day #status-bar {
      background: #F5F5F6;
    }

    #app.day #content {
      border-top: 1px solid #E1E2E1;
      background: #FFF;
    }

    #app.day #status-bar .dropdown-menu {
      background: #FFFFFF;
    }
  /* END DAY MODE */
</style>
