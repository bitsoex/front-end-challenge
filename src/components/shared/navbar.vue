<template>
  <div id="navbar">
    <img class="logo color" src="../../assets/images/bitso-logo-color.svg">
    <img class="logo" src="../../assets/images/bitso-logo.svg">
    <div class="divider-line logo-line"></div>
    <div class="subtitle">Exchange</div>

    <div class="bitcoin-price">
      1 {{books.selected.unit}} = {{currentPriceStr}} {{books.selected.comparision}}
    </div>

    <div class="divider-line btc-line"></div>

    <div class="wallet">
      <div> Wallet </div>
      <img src="../../assets/images/dropdown.svg">
    </div>

    <div class="exchange">
      <div> Exchange </div>
      <img src="../../assets/images/dropdown.svg">
    </div>

    <div class="ayuda">
      <div> Ayuda </div>
    </div>

    <div class="user">
      <div class="user-pic">
        <div class="outer"></div>
        <div class="inner"></div>
      </div>
      <div class="text"> Usuario </div>
      <img src="../../assets/images/dropdown.svg">
    </div>

    <div class="dayMode_switch" v-on:click="toggleDayMode()">
      <div class="button">
        <div class="outer"></div>
        <div class="inner"></div>
      </div>

      <img class="moon" src="../../assets/images/moon.svg">
    </div>

    <div id="mobile-menu" v-on:click="mobileMenu.open = !mobileMenu.open" v-bind:class="{open: mobileMenu.open}">
      <div class="menu-line first"></div>
      <div class="menu-line second"></div>
      <div class="menu-line third"></div>
    </div>

    <div id="mobile-menu-view" v-bind:class="{open: mobileMenu.open}">
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      books: {
        available: [],
        last: {url: 'btc_mxn', label: 'btc/mxn', unit: 'btc', comparision: 'mxn'},
        initial: {url: 'btc_mxn', label: 'btc/mxn', unit: 'btc', comparision: 'mxn'},
        selected: {url: 'btc_mxn', label: 'btc/mxn', unit: 'btc', comparision: 'mxn'}
      },
      mobileMenu: {
        open: false
      }
    }
  },
  methods: {
    toggleDayMode () {
      var move = !this.dayMode
      this.dayMode = move
      console.log(move)
      localStorage.setItem('dayMode', this.dayMode)
      this.$store.commit('dayMode', move)
    }
  },
  mounted () {
    /* day mode from localStorage */
    var dayMode = (localStorage.getItem('dayMode') === 'true')
    this.$store.commit('dayMode', dayMode)
    /* end */
  },
  name: 'navbar'
}
</script>

<style scoped>
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
    text-transform: uppercase;
  }

  #navbar .divider-line.btc-line {
    position: absolute;
    top: 21px;
    right: 628px;
    height: 24px;
  }

  #navbar .wallet {
    position: absolute;
    top: 0;
    right: 516px;
    width: 112px;
    height: 66px;
    line-height: 66px;
    cursor: pointer;
  }

  #navbar .wallet img {
    position: absolute;
    top: 32px;
    right: 12px;
  }

  #navbar .exchange {
    position: absolute;
    top: 0;
    right: 404px;
    width: 112px;
    height: 66px;
    line-height: 66px;
    cursor: pointer;
  }

  #navbar .exchange img {
    position: absolute;
    top: 32px;
    right: 4px;
  }

  #navbar .ayuda {
    position: absolute;
    top: 0;
    right: 292px;
    width: 112px;
    height: 66px;
    line-height: 66px;
    cursor: pointer;
  }

  #navbar .user {
    position: absolute;
    top: 0;
    right: 138px;
    width: 154px;
    height: 66px;
    line-height: 66px;
    cursor: pointer;
  }

  #navbar .user .outer {
    position: absolute;
    top: 9px;
    left: 9px;
    height: 48px;
    width: 48px;
    background: #606b76;
    border-radius: 24px;
  }

  #navbar .user .inner {
    position: absolute;
    top: 12px;
    left: 12px;
    height: 38px;
    width: 38px;
    background: #606b76;
    border-radius: 21px;
    border: 2px solid #252c36;
  }

  #navbar .user .text {
    position: absolute;
    top: 0;
    left: 72px;
  }

  #navbar .user img {
    position: absolute;
    top: 32px;
    right: 0;
  }

  #navbar .dayMode_switch {
    position: absolute;
    top: 23px;
    right: 60px;
    height: 20px;
    width: 48px;
    border-radius: 10px;
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
    top: 2px;
    right: 3px;
    height: 16px;
    width: 16px;
    border-radius: 8px;
    background: #606b76;
  }

  #navbar .dayMode_switch .button .inner {
    position: absolute;
    top: 4px;
    right: 5px;
    height: 10px;
    width: 10px;
    border-radius: 8px;
    background: #606b76;
    border: 1px solid #1d2228;
  }

  #navbar .dayMode_switch .moon {
    position: absolute;
    top: 5px;
    left: 8px;
  }

  #navbar .mobile-menu {
    display: none;
  }

  #navbar #mobile-menu-view {
    display: none;
  }
/* END NAVBAR */

@media screen and (max-width:1200px) {
  #navbar {
    font-size: 14px;
  }

  #navbar .dayMode_switch {
    right: 32px;
  }

  #navbar .user {
    right: 100px;
  }

  #navbar .user img {
    right: 8px;
  }

  #navbar .ayuda {
    right: 244px;
  }

  #navbar .exchange {
    right: 356px;
  }

  #navbar .wallet {
    right: 468px;
  }

  #navbar .divider-line.btc-line {
    right: 580px;
  }

  #navbar .bitcoin-price {
    right: 610px;
  }
}

@media screen and (max-width:992px) {
  #navbar .divider-line.logo-line {
    left: 140px;
  }

  #navbar .subtitle {
    left: 153px;
  }

  #navbar .btc-line, #navbar .wallet, #navbar .exchange, #navbar .ayuda, #navbar .user {
    display: none;
  }

  #navbar #mobile-menu {
    display: block;
    position: absolute;
    top: 26px;
    right: 24px;
    height: 18px;
    width: 24px;
    cursor: pointer;
    z-index: 999;
  }

  #navbar .bitcoin-price {
    right: 166px;
  }

  #navbar #mobile-menu .menu-line {
    position: absolute;
    height: 2px;
    width: 24px;
    background: #bdc6cc;
    left: 0;
  }

  #navbar #mobile-menu .menu-line.first {
    top: 0;
  }

  #navbar #mobile-menu.open .menu-line.first {
    top: 6px;
    transform: rotate(45deg);
  }

  #navbar #mobile-menu .menu-line.second {
    top: 6px;
  }

  #navbar #mobile-menu.open .menu-line.second {
    opacity: 0;
  }

  #navbar #mobile-menu .menu-line.third {
    top: 12px;
  }

  #navbar #mobile-menu.open .menu-line.third {
    top: 6px;
    transform: rotate(-45deg);
  }

  #navbar #mobile-menu-view {
    position: relative;
    display: block;
    transform: translate3d(0, -100vh, 0);
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.75);
    z-index: 900;
  }

  #navbar #mobile-menu-view.open {
    transform: translate3d(0, 0, 0);
  }

  #navbar .dayMode_switch {
    right: 84px;
  }
}

@media screen and (max-width:576px) {
  #navbar .bitcoin-price {
    display: none;
  }

  #navbar .dayMode_switch {
    display: none;
  }
}

@media screen and (max-width:320px) {
  #navbar .divider-line.logo-line {
    display: none;
  }

  #navbar .subtitle {
    display: none;
  }
}

/* DAY MODE */
#app.day #navbar {
  background: #FFF;
  color: #4E5863;
  box-shadow: 0 1px 3px #888;
}

#app.day #navbar .logo {
  opacity: 0;
}

#app.day #navbar .logo.color {
  opacity: 1;
}

#app.day #navbar .user .outer {
  background: #BDC6CC;
}

#app.day #navbar .user .inner {
  background: #BDC6CC;
  border: 2px solid #FFF;
}

#app.day #navbar .dayMode_switch {
  background: #FFF;
  box-shadow: inset 0 1px 2px #888;
}

#app.day #navbar .dayMode_switch .button {
  transform: translate3d(-26px, 0, 0);
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
/* END DAY MODE */
</style>
