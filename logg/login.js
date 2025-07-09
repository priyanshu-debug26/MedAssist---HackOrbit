import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB9P5XlgfUFATkYUzOb6gzUVzgDhdXuEuw",
  authDomain: "medassist-4b652.firebaseapp.com",
  projectId: "medassist-4b652",
  storageBucket: "medassist-4b652.appspot.com",
  messagingSenderId: "559510897181",
  appId: "1:559510897181:web:0a27b79f12448a98cabcf4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const form = document.querySelector("form");
const errorDiv = document.getElementById("error-message");
const googleLoginBtn = document.querySelector(".google-login");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    errorDiv.textContent = "Please fill in all fields.";
    return;
  }

  errorDiv.textContent = "";

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login successful ✅");
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 1000);
    })
    .catch((error) => {
      console.error("Login error:", error);
      errorDiv.textContent = error.message;
    });
});

googleLoginBtn.addEventListener("click", function () {
  signInWithPopup(auth, provider)
    .then(() => {
      alert("Google login successful ✅");
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 1000);
    })
    .catch((error) => {
      console.error("Google sign-in error:", error);
      errorDiv.textContent = error.message;
    });
});
