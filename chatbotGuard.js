import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const auth = getAuth();
let isLoggedIn = false;


const inputField = document.getElementById("input");
const sendButton = document.getElementById("send-button");

inputField.disabled = true;
sendButton.disabled = true;
inputField.placeholder = "Checking login...";

onAuthStateChanged(auth, (user) => {
  if (user) {
    isLoggedIn = true;
    inputField.disabled = false;
    sendButton.disabled = false;
    inputField.placeholder = "Type your problem here...";
  } else {
    isLoggedIn = false;
    inputField.disabled = true;
    sendButton.disabled = false;
    inputField.placeholder = "Login to use Med AI";
  }
});

sendButton.addEventListener("click", (e) => {
  if (!isLoggedIn) {
    e.preventDefault();
    alert("⚠️ You must login to use the Med AI chatbot.");
    return;
  }
});