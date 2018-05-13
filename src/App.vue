<template>
  <div id="app">
    <div id="navbar">
      <img class="logo" src="./assets/images/bitso-logo.svg">
      <div class="divider-line"></div>
      <div class="subtitle">Exchange</div>
    </div>

    <div id="status-bar"></div>

    <div id="content">
      <router-view/>
    </div>

  </div>
</template>

<script>
export default {
  name: 'App'
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
  }

  #navbar .logo {
    position: absolute;
    top: 17px;
    left: 32px;
    cursor: pointer;
  }

  #navbar .divider-line {
    position: absolute;
    top: 27px;
    left: 150px;
  }

  #navbar .subtitle {
    position: absolute;
    top: 22px;
    left: 173px;
    color: #bdc6cc;
    text-transform: uppercase;
    font-family: 'DIN_Light';
  }
/* END NAVBAR */

/* STATUS BAR */
  #status-bar {
    width: 100vw;
    height: 44px;
    background: #1d2228;
  }
/* END STATUS BAR */

#content {
  background: #21282f;
  border-top: solid 1px #2d3540;
  min-height: calc(100vh - 111px);
}
</style>
