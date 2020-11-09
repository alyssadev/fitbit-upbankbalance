import { me } from "companion";
import * as messaging from "messaging";
import { settingsStorage } from "settings";

import { UpBank } from "./upbank.js"

// Listen for the onmessage event
messaging.peerSocket.onmessage = function(evt) {
  // Output the message to the console
  console.log(JSON.stringify(evt.data));
}

// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("Companion Socket Open");
  updateBalance();
};

// Message socket closes
messaging.peerSocket.onclose = () => {
  console.log("Companion Socket Closed");
};

// A user changes settings
settingsStorage.onchange = evt => {
  console.log(JSON.parse(settingsStorage.getItem("token")).name);
  updateBalance();
};

// Send data to device using Messaging API
function sendVal(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
}

function updateBalance() {
  let upBank = new UpBank(JSON.parse(settingsStorage.getItem("token")).name);
  upBank.updateBalance().then(function(balance) {
    console.log(balance);
    sendVal(balance);
  }).catch(function (e) {
    console.log("error"); console.log(e)
  });
}