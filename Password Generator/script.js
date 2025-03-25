let passwordLength = 8;
let isUpperCase = false;
let isNumbers = false;
let isSymbols = false;

const passwordRangeInputEl = document.getElementById("passRangeInput");
const passRangeValueEl = document.getElementById("passRangeValue");
const genBtn = document.getElementById("genBtn");
const passwordEl = document.getElementById("password");
const customNameInputEl = document.getElementById("customName");

const generatePassword = (passLength) => {
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseLetters = isUpperCase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "";
  const numbers = isNumbers ? "0123456789" : "";
  const symbols = isSymbols ? "!@#$%^&*()_+" : "";

  const customName = customNameInputEl.value.trim();

  if (!customName) {
    alert("Please enter a custom word or name.");
    return "";
  }

  // Ensure custom word doesn't exceed password length
  if (customName.length > passLength) {
    return customName.slice(0, passLength);
  }

  const passwordChar = lowerCaseLetters + upperCaseLetters + numbers + symbols;
  let remainingChars = "";

  // Fill remaining slots with random characters
  for (let i = 0; i < passLength - customName.length; i++) {
    const charIndex = Math.floor(Math.random() * passwordChar.length);
    remainingChars += passwordChar[charIndex];
  }

  // Shuffle the custom word + remaining characters for randomness
  const combinedPassword = customName + remainingChars;
  const shuffledPassword = combinedPassword
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return shuffledPassword;
};

passwordRangeInputEl.addEventListener("input", (e) => {
  passwordLength = +e.target.value;
  passRangeValueEl.innerText = passwordLength;
});

genBtn.addEventListener("click", () => {
  const upperCaseCheckEl = document.getElementById("uppercase");
  const numbersCheckEl = document.getElementById("numbers");
  const symbolsCheckEl = document.getElementById("symbols");

  isUpperCase = upperCaseCheckEl.checked;
  isNumbers = numbersCheckEl.checked;
  isSymbols = symbolsCheckEl.checked;

  const password = generatePassword(passwordLength);
  passwordEl.innerHTML = password;
});

passwordEl.addEventListener("click", (e) => {
  if (e.target.innerText.length > 0) {
    navigator.clipboard
      .writeText(passwordEl.innerText)
      .then(() => alert("Copied to clipboard"))
      .catch(() => alert("Could not copy"));
  }
});
