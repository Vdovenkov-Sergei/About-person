document.addEventListener("DOMContentLoaded", function () {
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const albumsContainer = document.querySelector(".albums-container");

    const albumCardWidth = document.querySelector(".album-card").offsetWidth + 20;

    nextBtn.addEventListener("click", () => {
        albumsContainer.scrollBy({ left: albumCardWidth, behavior: "smooth" });
    });

    prevBtn.addEventListener("click", () => {
        albumsContainer.scrollBy({ left: -albumCardWidth, behavior: "smooth" });
    });


    const audioPlayers = document.querySelectorAll("audio");
    audioPlayers.forEach(audio => {
        audio.addEventListener("play", () => {
            audioPlayers.forEach(otherAudio => {
                if (otherAudio !== audio) {
                    otherAudio.pause();
                    otherAudio.currentTime = 0;
                }
            });
        });
    });
});

