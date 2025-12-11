document.addEventListener('DOMContentLoaded', () => {
    
    // --- Elements ---
    const html = document.documentElement; // Gets the root <html> element
    const themeToggleBtn = document.getElementById('theme-toggle');
    const musicToggleBtn = document.getElementById('music-toggle');
    const profileImg = document.getElementById('profile-pic');
    const audio = document.getElementById('bg-audio');
    const musicIcon = musicToggleBtn.querySelector('i');
    const themeIcon = themeToggleBtn.querySelector('i');

    // --- Configuration for Images ---
    const lightModeImg = "layt.jpg";
    const darkModeImg = "dork.jpg";

    // --- Theme Toggle Logic ---
    themeToggleBtn.addEventListener('click', () => {
        // Get the current theme from the HTML tag
        const currentTheme = html.getAttribute('data-theme'); 
        
        if (currentTheme === 'light') {
            // Switch to Dark
            html.setAttribute('data-theme', 'dark'); // Sets the attribute the CSS targets
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            
            // Swap Profile Picture
            profileImg.src = darkModeImg;
        } else {
            // Switch to Light
            html.setAttribute('data-theme', 'light'); // Sets the attribute the CSS targets
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            
            // Swap Profile Picture
            profileImg.src = lightModeImg;
        }
    });

    // --- Audio Control Logic ---
    let isPlaying = false;
    audio.volume = 0.5; 

    function toggleMusic() {
        if (isPlaying) {
            audio.pause();
            musicIcon.classList.remove('fa-pause');
            musicIcon.classList.add('fa-play');
            isPlaying = false;
        } else {
            audio.play().then(() => {
                musicIcon.classList.remove('fa-play');
                musicIcon.classList.add('fa-pause');
                isPlaying = true;
            }).catch(error => {
                console.error("Audio play failed, browser blocked autoplay:", error);
            });
        }
    }

    musicToggleBtn.addEventListener('click', toggleMusic);

    // AUTOPLAY WORKAROUND (Triggers on first user click anywhere)
    document.body.addEventListener('click', function initAudio() {
        if (!isPlaying) {
            audio.play();
            musicIcon.classList.remove('fa-play');
            musicIcon.classList.add('fa-pause');
            isPlaying = true;
            document.body.removeEventListener('click', initAudio);
        }
    }, { once: true });
});