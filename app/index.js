import document from "document";
import * as messaging from "messaging";

let T_elem = document.getElementById("T"),
    S_elem = document.getElementById("S");

// Message is received
messaging.peerSocket.onmessage = evt => {
  console.log(`App received: ${JSON.stringify(evt)}`);
  let T = evt.data.TRANSACTIONAL/100,
      S = evt.data.SAVER/100;
  T_elem.text = "$" + T.toFixed(2);
  S_elem.text = "$" + S.toFixed(2);
};

// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("App Socket Open");
};

// Message socket closes
messaging.peerSocket.onclose = () => {
  console.log("App Socket Closed");
};
