<template>
  <div id="app" v-bind:class="{day: dayMode === true}">
    <div id="navbar">
      <img class="logo color" src="./assets/images/bitso-logo-color.svg">
      <img class="logo" src="./assets/images/bitso-logo.svg">
      <div class="divider-line logo-line"></div>
      <div class="subtitle">Exchange</div>

      <div class="bitcoin-price">
        1 BTC = {{bitcoinPriceStr}} MXN
      </div>

      <div class="divider-line btc-line"></div>

      <div class="wallet">
        <div> Wallet </div>
        <img src="./assets/images/dropdown.svg">
      </div>

      <div class="exchange">
        <div> Exchange </div>
        <img src="./assets/images/dropdown.svg">
      </div>

      <div class="ayuda">
        <div> Ayuda </div>
      </div>

      <div class="user"></div>

      <div class="dayMode_switch" v-on:click="dayMode = !dayMode">
        <div class="button">
          <div class="outer"></div>
          <div class="inner"></div>
        </div>

        <img class="moon" src="./assets/images/moon.svg">
      </div>
    </div>

    <div id="status-bar"></div>

    <div id="content">
      <router-view/>
    </div>

  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    bitcoinPriceStr: function () {
      return this.commafy(this.coins.bitcoin.price)
    }
  },
  data () {
    return {
      dayMode: false,
      coins: {
        bitcoin: {
          price: '168000.00'
        }
      }
    }
  },
  methods: {
    commafy (num) {
      var str = num.toString().split('.')
      if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,')
      }
      if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ')
      }
      return str.join('.')
    }
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

/* SHARED COMPONENTS */
  .divider-line {
    width: 1px;
    height: 12px;
    background: #979797;
  }
/* END SHARED COMPONENTS */

/* NAVBAR */
  #navbar {
    position: fixed;
    top: 0;
    left: 0;
    height: 66px;
    width: 100vw;
    background: #252c36;
    z-index: 1000;
    font-family: 'DIN_Light';
    color: #bdc6cc;
  }

  #navbar .logo {
    position: absolute;
    top: 17px;
    left: 32px;
    cursor: pointer;
  }

  #navbar .logo.color {
    opacity: 0;
  }

  #navbar .divider-line.logo-line {
    position: absolute;
    top: 27px;
    left: 150px;
  }

  #navbar .subtitle {
    position: absolute;
    top: 22px;
    left: 173px;
    text-transform: uppercase;
  }

  #navbar .bitcoin-price {
    position: absolute;
    top: 22px;
    right: 668px;
  }

  #navbar .divider-line.btc-line {
    position: absolute;
    top: 21px;
    right: 628px;
    height: 24px;
  }

  #navbar .wallet {
    position: absolute;
    top: 23px;
    right: 550px;
    cursor: pointer;
  }

  #navbar .wallet img {
    position: absolute;
    top: 9px;
    right: -18px;
  }

  #navbar .exchange {
    position: absolute;
    top: 23px;
    right: 424px;
  }

  #navbar .exchange img {
    position: absolute;
    top: 9px;
    right: -18px;
  }

  #navbar .ayuda {
    position: absolute;
    top: 23px;
    right: 324px;
  }

  #navbar .user {}

  #navbar .dayMode_switch {
    position: absolute;
    top: 21px;
    right: 60px;
    height: 24px;
    width: 48px;
    border-radius: 12px;
    background-color: #1d2228;
    cursor: pointer;
  }

  #navbar .dayMode_switch .button {
    position: absolute;
    top: 0;
    right: 0;
    transition: all 0.3s;
    z-index: 9;
  }

  #navbar .dayMode_switch .button .outer {
    position: absolute;
    top: 3px;
    right: 3px;
    height: 18px;
    width: 18px;
    border-radius: 8px;
    background: #606b76;
  }

  #navbar .dayMode_switch .button .inner {
    position: absolute;
    top: 5px;
    right: 5px;
    height: 12px;
    width: 12px;
    border-radius: 8px;
    background: #606b76;
    border: 1px solid #1d2228;
  }

  #navbar .dayMode_switch .moon {
    position: absolute;
    top: 7px;
    left: 10px;
  }

/* END NAVBAR */

/* STATUS BAR */
  #status-bar {
    position: fixed;
    top: 66px;
    left: 0;
    width: 100vw;
    height: 44px;
    background: #1d2228;
  }
/* END STATUS BAR */

#content {
  position: fixed;
  top: 110px;
  left: 0;
  background: #21282f;
  border-top: solid 1px #2d3540;
  min-height: calc(100vh - 111px);
}

/* DAY MODE */
  .dayMode {
    opacity: 0;
  }

  #app.day .dayMode {
    opacity: 1;
  }

  #app.day #navbar {
    background: #FFF;
    color: #4E5863;
    box-shadow: 0 1px 3px #888;
  }

  #app.day .logo {
    opacity: 0;
  }

  #app.day .logo.color {
    opacity: 1;
  }

  #app.day #navbar .dayMode_switch {
    background: #FFF;
    box-shadow: inset 0 1px 2px #888;
  }

  #app.day #navbar .dayMode_switch .button {
    transform: translate3d(-24px, 0, 0);
  }

  #app.day #navbar .dayMode_switch .button .outer, #app.day #navbar .dayMode_switch .button .inner {
    background: #EBC256;
  }

  #app.day #navbar .dayMode_switch .button .outer {
    box-shadow: 0 1px 3px #EBC256;
  }

  #app.day #navbar .dayMode_switch .button .inner {
    border: 1px solid #FFF;
  }

  #app.day #status-bar {
    background: #F0F0F0;
  }

  #app.day #content {
    border-top: solid 1px #ccc;
    background: #FFF;
  }

/* END DAY MODE */
</style>
