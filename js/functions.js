const gameGrid = document.querySelector("[data-grid]");
const keyboard = document.querySelector("[data-keyboard]");
const dataKeys = document.querySelectorAll("[data-key]");

//function to get a random word to use as the target
function getRandomWord() {
	const randomIndex = Math.floor(Math.random() * dictionary.length);
	return dictionary[randomIndex].toUpperCase();
}

//function for human readable date and time
function dateFormat() {
	const date = new Date();
	const addZero = (num) => (num < 10 ? "0" + num : num); //add a zero if the number is less than 10
	const month = addZero(date.getMonth() + 1);
	const day = addZero(date.getDate());
	const hour = addZero(date.getHours());
	const minute = addZero(date.getMinutes());
	return `Last refresh was on ${day}/${month} at ${hour}:${minute}`;
}

//function to show time until next refresh (24hours)
function refreshTimer() {
	const lastUpdated = localStorage.getItem("lastUpdated");
	const refreshTime = 86400000 - (Date.now() - lastUpdated);
	localStorage.setItem("timeUntilRefresh", refreshTime + "ms");
}

//function to save the target word to local storage with timers if it doesn't exist or 24 hours has passed
function setTargetWord() {
	if (localStorage.length === 0 || refreshTimer() <= 0) {
		localStorage.setItem("lastUpdated", Date.now());
		localStorage.setItem("lastUpdatedHuman", dateFormat());
		localStorage.setItem("targetWord", getRandomWord());
	}
}

//function to log current content of the localStorage in console
function logLocalStorage() {
	console.group("%c<-- Local Storage --> ", "color: #fff; background: #000; padding: 50px;");
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		const value = localStorage.getItem(key);
		console.log(`%c${key}: %c${value}`, "color: black; background: white; padding: 10px;");
	}
	console.groupEnd();
}

//function to check if the key pressed is in the target word
function checkKey(key) {
	const targetWord = localStorage.getItem("targetWord");
	if (targetWord.includes(key)) {
		console.log("%c correct", "color: black; background: lightgreen; padding: 10px;");
	} else {
		console.log("%c incorrect", "color: black; background: orange; padding: 10px;");
	}
}

//event listeners

(function virtualKeyboardHandler() {
	dataKeys.forEach((key) => {
		key.addEventListener("click", function () {
			checkKey(this.innerText);
		});
	});
})();

(function keyboardHandler() {
	document.addEventListener("keydown", function (e) {
		const key = e.key.toUpperCase();
		if (key.match(/^[A-Z]$/)) checkKey(key);
	});
})();
