// Song Controls
const progress = document.getElementById("progress");
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");
const playPauseButton = document.querySelector(".play-pause-btn");
const forwardButton = document.querySelector(".forward");
const backwardButton = document.querySelector(".backward");
const songName = document.querySelector(".music-player h1");
const artistName = document.querySelector(".music-player p");

// Folder Selection Button
const folderBtn = document.getElementById("folder-btn");

let songs = [];
let currentSongIndex = 0;

// Update Music Player Info
function updateSongInfo() {
    if (songs.length === 0) {
        songName.textContent = "No Songs Available";
        artistName.textContent = "";
        song.src = "";
        return;
    }

    const currentSong = songs[currentSongIndex];
    songName.textContent = currentSong.title;
    artistName.textContent = currentSong.name;
    song.src = currentSong.source;

    song.addEventListener("loadedmetadata", () => {
        progress.max = song.duration;
        progress.value = song.currentTime;
    });
}

// Play/Pause Toggle
function playPause() {
    if (song.paused && songs.length > 0) {
        song.play();
        controlIcon.classList.replace("fa-play", "fa-pause");
    } else {
        song.pause();
        controlIcon.classList.replace("fa-pause", "fa-play");
    }
}

// Change Song Logic - Ensures Only One-Song Skip
function changeSong(direction) {
    if (songs.length === 0) return;

    const nextIndex = (currentSongIndex + direction + songs.length) % songs.length;

    if (swiper) {
        swiper.slideTo(nextIndex);
    }

    currentSongIndex = nextIndex;

    updateSongInfo();
}

// Event Listeners
playPauseButton.addEventListener("click", playPause);

progress.addEventListener("input", () => {
    song.currentTime = progress.value;
});

progress.addEventListener("change", () => song.play());

forwardButton.addEventListener("click", () => {
    if (currentSongIndex < songs.length - 1) {
        currentSongIndex++;
    } else {
        currentSongIndex = 0;
    }

    swiper.slideTo(currentSongIndex);
    updateSongInfo();
});

backwardButton.addEventListener("click", () => {
    if (currentSongIndex > 0) {
        currentSongIndex--;
    } else {
        currentSongIndex = songs.length - 1;
    }

    swiper.slideTo(currentSongIndex);
    updateSongInfo();
});

// Swiper Configuration
let swiper;

function initializeSwiper(totalSongs) {
    const medianSlide = calculateInitialSlide(totalSongs);
    swiper = new Swiper(".swiper", {
        effect: "coverflow",
        centeredSlides: true,
        slidesPerView: "auto",
        initialSlide: medianSlide,
        allowTouchMove: false,
        loop: true,
        spaceBetween: 40,
        coverflowEffect: {
            rotate: 25,
            stretch: 0,
            depth: 100,
            modifier: 0,
            slideShadows: false,
        },
        navigation: {
            nextEl: ".forward",
            prevEl: ".backward",
        },
    });
}

// Function to Calculate Median Slide
function calculateInitialSlide(totalSongs) {
    return Math.floor((totalSongs - 1) / 2);
}

// Update Swiper Slides with Dynamic Initial Slide
function updateSwiperSlides(songs) {
    const swiperWrapper = document.querySelector(".swiper-wrapper");
    swiperWrapper.innerHTML = songs
        .map(
            (song, index) => `
            <div class="swiper-slide">
                <img src="${song.cover}" />
                <div class="overlay">
                    <a href="#" onclick="changeSongTo(${index})">
                        <ion-icon name="play-circle-outline"></ion-icon>
                    </a>
                </div>
            </div>`
        )
        .join("");

    if (swiper) {
        swiper.destroy();
    }

    initializeSwiper(songs.length);
}

// Folder Selection Logic
folderBtn.addEventListener("click", selectFolder);

async function selectFolder() {
    try {
        if (!window.showDirectoryPicker) {
            alert("Your browser doesn't support folder selection.");
            return;
        }

        const dirHandle = await window.showDirectoryPicker();
        songs = []; // Clear previous songs

        for await (const entry of dirHandle.values()) {
            if (entry.kind === 'file' && entry.name.endsWith('.mp3')) {
                const file = await entry.getFile();
                const songTitle = entry.name.replace(".mp3", "");

                // Album cover from ./Images folder
                const albumCoverPath = `./Images/${songTitle}.png`;
                const albumCoverExists = await checkImageExists(albumCoverPath);

                songs.push({
                    title: songTitle,
                    name: "Unknown Artist",
                    source: URL.createObjectURL(file),
                    cover: albumCoverExists ? albumCoverPath : "./Images/default-cover.png"
                });
            }
        }

        // Sort songs in alphabetical order
        songs.sort((a, b) => a.title.localeCompare(b.title));

        if (songs.length) {

            // Set Median as Starting Point
            const medianSlide = calculateInitialSlide(songs.length);
            currentSongIndex = medianSlide;

            updateSwiperSlides(songs);
            
            // Ensure album cover element exists before updating it
            const albumCoverElement = document.getElementById("albumCover");
            if (albumCoverElement) {
                albumCoverElement.src = songs[medianSlide].cover;
            }

            updateSongInfo();

            // Hide Folder Button after selection
            folderBtn.style.display = "none";
        } else {
            alert("No songs found in the selected folder.");
            updateSongInfo();
        }
    } catch (error) {
        alert("Failed to access folder. Please try again.");
        console.error("Error selecting folder:", error);
    }
}

// Helper Function to Check if Album Cover Exists
async function checkImageExists(imagePath) {
    try {
        const response = await fetch(imagePath, { method: 'HEAD' });
        return response.ok;
    } catch {
        return false;
    }
}


// Change Song in Folder
function changeSongTo(index) {
    currentSongIndex = index;

    if (swiper) {
        swiper.slideTo(index);
    }

    updateSongInfo();
}

// Initialize without songs
currentSongIndex = calculateInitialSlide(0);
updateSongInfo();
initializeSwiper(0);

// Dark Mode Toggle
const darkModeToggle = document.getElementById("darkModeToggle");
const themeIcon = document.getElementById("themeIcon");

if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    themeIcon.classList.replace("fa-moon", "fa-sun");
}

darkModeToggle.addEventListener("click", () => {
    const isDarkMode = document.body.classList.toggle("dark-mode");
    themeIcon.classList.replace(
        isDarkMode ? "fa-moon" : "fa-sun",
        isDarkMode ? "fa-sun" : "fa-moon"
    );

    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
});