/*
 * Bitso App
 *
 * NightModeSwitch            Init Night Mode Switch
 * MobileSidebar              Init Mobile Sidebar
 */

/* Night Mode Switch Handler
----------------------------------------- */
function _toggleNightModeHandler(){

  /* Toggle Night Mode */
  document.body.classList.toggle('night-mode');

  this.classList.toggle('on');

};

/* Night Mode Switch Handler
----------------------------------------- */
function _toggleMobileSidebar(){

  if (this.className.indexOf('active') === -1) {
    /* Open Sidebar */
    document.getElementById("main").style.marginLeft          = "300px";
    document.getElementById("main-header").style.marginLeft   = "300px";
    document.getElementById("mobile-nav").style.marginLeft    = "300px";
    document.getElementById("markets-sidebar").style.width    = "300px";
    document.getElementById("markets-sidebar").style.display  = "block";
  } else{
    /* Close Sidebar */
    document.getElementById("main").style.marginLeft          = "0px";
    document.getElementById("main-header").style.marginLeft   = "0px";
    document.getElementById("mobile-nav").style.marginLeft    = "0px";
    document.getElementById("markets-sidebar").style.display  = "none";
  }

  /* Toggle Sidebar */
  this.classList.toggle('active');
};

/* Night Mode Switch Handler
----------------------------------------- */
var NightModeSwitch = function(){

  var nightModeBtn = document.getElementById('night-mode');

  /* Add Event Handler */
  nightModeBtn.addEventListener('click', _toggleNightModeHandler, false);
},
MobileSidebar = function(){
  var marketsButton = document.getElementById('markets-button');

  marketsButton.addEventListener('click', _toggleMobileSidebar, false);
}

var App = function(){
  "use strict";

  return{
    init: function(){
      NightModeSwitch();
      MobileSidebar();
    }
  };
}();