const snacks = [
  { name: "Oreos", calories: 160 },
  { name: "Chips", calories: 140 },
  { name: "Trail Mix", calories: 200 },
  { name: "Popcorn", calories: 120 },
  { name: "Gummies", calories: 100 },
  { name: "Granola Bar", calories: 180 },
  { name: "Chocolate", calories: 210 },
  { name: "Cookies", calories: 150 },
  { name: "Pretzels", calories: 110 },
  { name: "Fruit Snacks", calories: 90 }
];

let totalCalories = 0;

function revealSnack() {
  const randomIndex = Math.floor(Math.random() * snacks.length);
  const snack = snacks[randomIndex];

  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  const display = document.getElementById("snackDisplay");

  display.style.opacity = 0;

  setTimeout(() => {
    display.textContent = snack.name;
    display.style.color = randomColor;
    display.style.opacity = 1;

    playPopSound();
    logSnack(snack.name);
    addCalories(snack.calories);
  }, 100);
}

function addCalories(amount) {
  totalCalories += amount;
  updateCalorieDisplay();
  saveTotalCalories();
}

function updateCalorieDisplay() {
  document.getElementById("calorieTotal").textContent = `Total Calories: ${totalCalories}`;
}

function clearSnack() {
  document.getElementById("snackDisplay").textContent = "";
}

function clearLog() {
  document.getElementById("snackLog").innerHTML = "";
  localStorage.removeItem("snackLog");

  totalCalories = 0;
  updateCalorieDisplay();
  localStorage.removeItem("totalCalories");
}

function logSnack(snackName) {
  const logList = document.getElementById("snackLog");
  const listItem = document.createElement("li");

  const emoji = getRandomEmoji();
  listItem.textContent = `${emoji} ${snackName}`;
  listItem.classList.add("snackItem");

  logList.appendChild(listItem);

  if (logList.children.length > 5) {
    logList.removeChild(logList.firstChild);
  }

  saveSnackLog();
}

function getRandomEmoji() {
  const emojis = ["🍪", "🍩", "🍫", "🍿", "🧁", "🍭", "🍬", "🥨"];
  const index = Math.floor(Math.random() * emojis.length);
  return emojis[index];
}

function saveSnackLog() {
  const snacks = [];
  const listItems = document.querySelectorAll("#snackLog li");
  listItems.forEach(item => snacks.push(item.textContent));
  localStorage.setItem("snackLog", JSON.stringify(snacks));
}

function loadSnackLog() {
  const saved = localStorage.getItem("snackLog");
  if (!saved) return;

  const snacks = JSON.parse(saved);
  const logList = document.getElementById("snackLog");
  snacks.forEach(snack => {
    const listItem = document.createElement("li");
    listItem.textContent = snack;
    listItem.classList.add("snackItem");
    logList.appendChild(listItem);
  });
}

function saveTotalCalories() {
  localStorage.setItem("totalCalories", totalCalories);
}

function loadTotalCalories() {
  const saved = localStorage.getItem("totalCalories");
  if (!saved) return;
  totalCalories = parseInt(saved);
  updateCalorieDisplay();
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

function playPopSound() {
  const sound = document.getElementById("popSound");
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }
}

// On page load
window.onload = () => {
  loadSnackLog();
  loadTotalCalories();
};
