/* Night Mode Switch Handler
----------------------------------------- */
function _toggleNightMode(){

  /* Toggle Night Mode */
  document.body.classList.toggle('night-mode');

  this.classList.toggle('on');

};

var NightModeSwitchHandler = function(){

  var nightModeBtn = document.getElementById('night-mode');

  /* Add Event Handler */
  nightModeBtn.addEventListener('click', _toggleNightMode, false);
};



function w3_open() {
  document.getElementById("main").style.marginLeft = "25%";
  document.getElementById("mySidebar").style.width = "25%";
  document.getElementById("mySidebar").style.display = "block";
}
function w3_close() {
  document.getElementById("main").style.marginLeft = "0%";
  document.getElementById("mySidebar").style.display = "none";
}

var App = function(){
  "use strict";

  return{
    init: function(){
      NightModeSwitchHandler();
    }
  };
}();