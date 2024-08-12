/**
 * Light and dark mode
 */

const /** {NodeElement} */ $themeBtn = document.querySelector("[data-theme-btn]");
const /** {NodeElement} */ $HTML = document.documentElement;
let /** {Boolean | String} */ isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (sessionStorage.getItem("theme")) {
  $HTML.dataset.theme = sessionStorage.getItem("theme");
} else {
  $HTML.dataset.theme = isDark ? "dark" : "light";
}

const changeTheme = () => {

  $HTML.dataset.theme = sessionStorage.getItem("theme") === "light" ? "dark" : "light";
  sessionStorage.setItem("theme", $HTML.dataset.theme);

}

$themeBtn.addEventListener("click", changeTheme);



// Modal
function openModal(src) {
    console.log(src); // Debug log

    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');
    modal.style.display = 'flex'; // Show the modal
    modalImage.src = src; // Set the image source
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none'; // Hide the modal
}


// Change Image For Project 1
let currentIndex = 0;
const images = [
  "/assets/images/Projects/Hotel Management System/1.png",
  "/assets/images/Projects/Hotel Management System/2.png",
  "/assets/images/Projects/Hotel Management System/3.png"
  // Add more image paths as needed
];

function openModal(index) {
  currentIndex = index;
  const modalImage = document.getElementById("modalImage");
  modalImage.src = images[currentIndex];
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

function changeSlide(direction) {
  currentIndex += direction;

  // Wrap around if necessary
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  } else if (currentIndex >= images.length) {
    currentIndex = 0;
  }

  document.getElementById("modalImage").src = images[currentIndex];
}


// Change Image For Project 2
let currentIndex2 = 0;
const images2 = [
  "/assets/images/Projects/Track's Number & PhoneBook/1.png",
  "/assets/images/Projects/Track's Number & PhoneBook/2.png",
  "/assets/images/Projects/Track's Number & PhoneBook/3.png",
  "/assets/images/Projects/Track's Number & PhoneBook/4.png"
  // Add more image paths as needed
];

function openModal2(index) {
  currentIndex2 = index;
  const modalImage = document.getElementById("modalImage");
  modalImage.src = images2[currentIndex2];
  document.getElementById("myModal").style.display = "block";
}

function closeModal2() {
  document.getElementById("myModal").style.display = "none";
}

function changeSlide2(direction) {
  currentIndex2 += direction;

  // Wrap around if necessary
  if (currentIndex2 < 0) {
    currentIndex2 = images2.length - 1;
  } else if (currentIndex2 >= images2.length) {
    currentIndex2 = 0;
  }

  document.getElementById("modalImage").src = images2[currentIndex2];
}
