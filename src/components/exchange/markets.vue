<template>
  <div id="markets" v-bind:class="{open: open}">
    <div class="slider" v-on:click="open = !open">
      <img src="../../assets/images/dropdown.svg">
      <div class="title">Mercados</div>
    </div>

    <div class="content"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      open: false
    }
  },
  methods: {
  },
  mounted () {
  },
  name: 'markets'
}
</script>

<style scoped>
#app .slider {
  min-height: calc(100vh - 111px);
  height: 100%;
  width: 44px;
  background: #3c454e;
  cursor: pointer;
}

.slider img {
  position: absolute;
  top: 24px;
  left: 16px;
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
    top: 0;
    right: 0;
    height: calc(100vh - 111px);
    width: 364px;
    overflow-y: scroll;
    transform: translate3d(320px, 0 , 0);
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
    height: calc(100vh - 111px);
    background: purple;
    width: 320px;
    margin-left: 44px;
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
  background: #5C4B51;
}

#app.day #markets .slider .title {
  color: #747F89;
}
/* END DAY MODE */
</style>
