import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const auth = getAuth();

document.addEventListener("DOMContentLoaded", () => {
  const joinBtn = document.getElementById("joinBtn");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      joinBtn.disabled = false;
    } else {
      joinBtn.disabled = true;
      joinBtn.textContent = "Login to Join Call";
      joinBtn.style.background = "#ccc";
      joinBtn.style.cursor = "not-allowed";

      joinBtn.addEventListener("click", () => {
        alert("You must be logged in to use the video call feature.");
      });
    }
  });
});