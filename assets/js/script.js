'use strict';

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}

// Navbar toggle logic
const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const toggleNavbar = () => navbar.classList.toggle("active");
addEventOnElem(navToggler, "click", toggleNavbar);
const closeNavbar = () => navbar.classList.remove("active");
addEventOnElem(navLinks, "click", closeNavbar);

// Header scroll logic
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");
const headerActive = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}
addEventOnElem(window, "scroll", headerActive);

// Filter logic
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter]");
let lastClickedFilterBtn = filterBtns[0];
const filter = function () {
  lastClickedFilterBtn.classList.remove("active");
  this.classList.add("active");
  lastClickedFilterBtn = this;
  for (let i = 0; i < filterItems.length; i++) {
    if (this.dataset.filterBtn === filterItems[i].dataset.filter || this.dataset.filterBtn === "all") {
      filterItems[i].style.display = "block";
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].style.display = "none";
      filterItems[i].classList.remove("active");
    }
  }
}
addEventOnElem(filterBtns, "click", filter);

// Chat toggle
const chatCircle = document.getElementById("chat-circle");
const chatBox = document.getElementById("chat-box");
chatCircle.addEventListener("click", () => {
  chatBox.classList.toggle("open");
});

// Chat functionality with loader + Netlify AI
const chatBody = document.getElementById("chat-body");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");

// Loader HTML
function showLoader() {
  const loader = document.createElement("div");
  loader.className = "message ai-msg loader";
  loader.innerHTML = `<div class="dot"></div><div class="dot"></div><div class="dot"></div>`;
  chatBody.appendChild(loader);
  chatBody.scrollTop = chatBody.scrollHeight;
  return loader;
}

// Fetch AI response from Netlify Function
async function getAIResponse(userMsg) {
  try {
    const response = await fetch("/.netlify/functions/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: userMsg
      })
    });

    const data = await response.json();

    if (data && data.choices && data.choices[0].message.content) {
      const text = data.choices[0].message.content;
      return text
        .split(". ")
        .map(sentence => sentence.trim())
        .filter(Boolean)
        .join(".\n");
    } else {
      return "Sorry, I couldn't understand that!";
    }

  } catch (error) {
    console.error(error);
    return "Oops! Something went wrong. Please try again.";
  }
}

chatSend.addEventListener("click", async () => {
  const userMsg = chatInput.value.trim();
  if (!userMsg) return;

  chatBody.innerHTML += `<div class="message user-msg">${userMsg}</div>`;
  chatInput.value = "";
  chatBody.scrollTop = chatBody.scrollHeight;

  const loaderElem = showLoader();

  const aiMsg = await getAIResponse(userMsg);

  loaderElem.remove();

  chatBody.innerHTML += `<div class="message ai-msg">${aiMsg}</div>`;
  chatBody.scrollTop = chatBody.scrollHeight;
});
