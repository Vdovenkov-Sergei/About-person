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

    const songCards = document.querySelectorAll('.song-card');
    songCards.forEach(player => {
        const playBtn = player.querySelector('.play-btn');
        const audio = player.querySelector('.audio');
        const icon = playBtn.querySelector('i');
        const progressBar = player.querySelector('.progress-bar');
        const durationDisplay = player.querySelector('.duration');

        audio.addEventListener('loadedmetadata', () => {
            const duration = audio.duration;
            durationDisplay.textContent = formatTime(duration);
        });

        let isSeeking = false;
        playBtn.addEventListener('click', () => {
            songCards.forEach(otherPlayer => {
                if (otherPlayer !== player) {
                    const otherAudio = otherPlayer.querySelector('.audio');
                    const otherIcon = otherPlayer.querySelector('.play-btn i');
                    otherAudio.pause();
                    otherIcon.classList.remove('fa-stop');
                    otherIcon.classList.add('fa-play');
                }
            });

            if (audio.paused) {
                audio.play();
                icon.classList.remove('fa-play');
                icon.classList.add('fa-stop');
            } else {
                audio.pause();
                icon.classList.remove('fa-stop');
                icon.classList.add('fa-play');
            }
        });

        audio.addEventListener('timeupdate', () => {
            if (!isSeeking) {
                const currentTime = audio.currentTime;
                const duration = audio.duration;
                const progressPercent = (currentTime / duration) * 100;

                const step = progressBar.step ? Number(progressBar.step) : 1;
                const roundedProgress = Math.round(progressPercent / step) * step;

                progressBar.value = roundedProgress;
                progressBar.style.setProperty('--progress', `${roundedProgress}%`);

                const remainingTime = duration - currentTime;
                durationDisplay.textContent = formatTime(remainingTime);
            }
        });

        progressBar.addEventListener('input', function() {
            isSeeking = true;
            audio.pause();
            progressBar.style.setProperty('--progress', `${this.value}%`);
        });

        progressBar.addEventListener('change', function () {
            const seekTime = (this.value / 100) * audio.duration;
            audio.currentTime = seekTime;
            isSeeking = false;
            if (icon.classList.contains('fa-stop')) {
                audio.play();
            }
        });

        audio.addEventListener('ended', () => {
            icon.classList.remove('fa-stop');
            icon.classList.add('fa-play');
            progressBar.value = 0;
            progressBar.style.setProperty('--progress', `0%`);
            durationDisplay.textContent = formatTime(audio.duration)
        });
    });

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
});
