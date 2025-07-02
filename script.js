const snacks = [
  "Oreos", "Chips", "Trail Mix", "Popcorn", "Gummies",
  "Granola Bar", "Chocolate", "Cookies", "Pretzels", "Fruit Snacks"
];

function revealSnack() {
  const randomIndex = Math.floor(Math.random() * snacks.length);
  const randomSnack = snacks[randomIndex];

  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  const display = document.getElementById("snackDisplay");

  display.style.opacity = 0;

  setTimeout(() => {
    display.textContent = randomSnack;
    display.style.color = randomColor;
    display.style.opacity = 1;

    logSnack(randomSnack);
  }, 100);
}

function clearSnack() {
  document.getElementById("snackDisplay").textContent = "";
}

function clearLog() {
  document.getElementById("snackLog").innerHTML = "";
}

function logSnack(snack) {
  const logList = document.getElementById("snackLog");
  const listItem = document.createElement("li");
  listItem.textContent = snack;
  logList.appendChild(listItem);

  if (logList.children.length > 5) {
    logList.removeChild(logList.firstChild);
  }
}

// NEW: Toggle Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
