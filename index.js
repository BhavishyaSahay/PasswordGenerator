let sliderLength = document.querySelector(".char-length-slider");
let sliderCount = document.querySelector(".char-count");
let passwordDisplay = document.querySelector(".password-placeholder");
let upperCase = document.getElementById("uppercase");
let lowerCase = document.getElementById("lowercase");
let numbers = document.getElementById("numbers");
let symbols = document.getElementById("symbols");
const genBtn = document.querySelector(".generate-btn");
const form = document.querySelector(".password-settings");
const copyBtn = document.querySelector(".copy-btn");

let checkBoxArr = Array.from(
  document.querySelectorAll("input[type='checkbox']")
);

// strength determining varibles
let stengthDisplay = document.querySelector(".strength-label");
let bars = document.querySelectorAll(".bar");

// function to generate password
genBtn.addEventListener("click", () => {
  passwordDisplay.textContent = generatePassword();
  passwordDisplay.style.color = "hsl(0, 0%, 100%)";
  passwordDisplay.style.opacity = 1;
  strengthHandle();
});

function generatePassword() {
  let arr = checkBoxArr.filter((item) => {
    return item.checked;
  });
  if (arr.length >= 1 && sliderLength.value < arr.length) {
    alert("INVALID");
    passwordDisplay.textContent = "";
  }
  let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let lowerChars = "abcdefghijklmnopqrstuvwxyz";
  let allNumbers = "0123456789";
  let allSymbols = "@!#$%&~^*";

  let genPassword = "";
  let allChars = "";

  if (lowerCase.checked) {
    genPassword += lowerChars.charAt(
      Math.floor(Math.random() * lowerChars.length)
    );
  }
  if (upperCase.checked) {
    genPassword += upperChars.charAt(
      Math.floor(Math.random() * upperChars.length)
    );
  }
  if (numbers.checked) {
    genPassword += allNumbers.charAt(
      Math.floor(Math.random() * allNumbers.length)
    );
  }
  if (symbols.checked) {
    genPassword += allSymbols.charAt(
      Math.floor(Math.random() * allSymbols.length)
    );
  }

  allChars += lowerCase.checked ? lowerChars : "";
  allChars += upperCase.checked ? upperChars : "";
  allChars += numbers.checked ? allNumbers : "";
  allChars += symbols.checked ? allSymbols : "";

  if (allChars == "" || allChars.length == 0) {
    return genPassword;
  }

  let i = genPassword.length;
  while (i < sliderLength.value) {
    genPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
    i++;
  }
  return genPassword;
}

sliderLength.addEventListener("input", () => {
  sliderCount.textContent = sliderLength.value;
  sliderLength.style.backgroundSize =
    (sliderLength.value / 15) * 100 - 5 + "% 100%";
});
function strengthHandle() {
  let checkedArrLength = checkBoxArr.filter((item) => {
    return item.checked;
  });
  let barsToColor = 0;
  let strengthToShow = "STRENGTH";
  let barColor = "";
  if (sliderLength.value < 8 || checkedArrLength.length < 3) {
    strengthToShow = "Weak";
    barsToColor = 2;
    barColor = "red";
  } else if (sliderLength.value < 8 && checkedArrLength.length >= 3) {
    strengthToShow = "Weak";
    barsToColor = 2;
    barColor = "red";
  } else if (sliderLength.value < 8 && checkedArrLength.length < 3) {
    strengthToShow = "Weak";
    barsToColor = 2;
    barColor = "red";
  } else if (sliderLength.value >= 12 && checkedArrLength.length === 3) {
    strengthToShow = "Medium";
    barsToColor = 3;
    barColor = "Yellow";
  } else if (sliderLength.value >= 12 && checkedArrLength.length === 4) {
    strengthToShow = "Strong";
    barsToColor = 4;
    barColor = "hsl(127, 100%, 82%)";
  }

  for (let i = 0; i < barsToColor; i++) {
    bars[i].style.backgroundColor = barColor;
  }
  for (let i = barsToColor; i < checkBoxArr.length; i++) {
    bars[i].style.backgroundColor = "";
  }
  stengthDisplay.textContent = strengthToShow;
  stengthDisplay.style.color = "white";
}

// form submission preventing default behavior
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

// copying password to clipboard
copyBtn.addEventListener("click", () => {
  if (passwordDisplay != "" || passwordDisplay >= 1) {
    navigator.clipboard.writeText(passwordDisplay.textContent);
  }
});

function greeting(name) {
  alert("Hello " + name);
}
function processUserInput(callback) {
  var name = prompt("Please enter your name.");
  callback(name);
}
processUserInput(greeting);
