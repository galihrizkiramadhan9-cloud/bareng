document.addEventListener('DOMContentLoaded', () => {
    // Background Stars Setup
    const starsContainer = document.getElementById('stars-container');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.width = `${Math.random() * 4 + 1}px`;
        star.style.height = star.style.width;
        star.style.left = `${Math.random() * windowWidth}px`;
        star.style.top = `${Math.random() * windowHeight}px`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        starsContainer.appendChild(star);
    }

    // Music Control
    const bgMusic = document.getElementById('bg-music');
    const musicControl = document.getElementById('music-control');
    let isPlaying = false;

    musicControl.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicControl.innerHTML = '<span class="icon">▶️</span> Putar Musik';
        } else {
            bgMusic.play();
            musicControl.innerHTML = '<span class="icon">⏸️</span> Pause Musik';
        }
        isPlaying = !isPlaying;
    });

    // Envelope Logic
    const envelope = document.getElementById('envelope');
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const card = document.getElementById('card');

    envelope.addEventListener('click', () => {
        // Buka amplop
        envelope.classList.add('open');
        
        // Putar musik otomatis jika belum jalan (browser policy might block this, but we try)
        if(!isPlaying) {
            bgMusic.play().then(() => {
                isPlaying = true;
                musicControl.innerHTML = '<span class="icon">⏸️</span> Pause Musik';
            }).catch(e => console.log("Auto-play blocked by browser."));
        }

        // Transisi ke kartu
        setTimeout(() => {
            envelopeWrapper.style.opacity = '0';
            setTimeout(() => {
                envelopeWrapper.style.display = 'none';
                card.classList.remove('hidden');
                card.classList.add('show');
            }, 800);
        }, 1200);
    });

    // Buttons Logic
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const title = document.getElementById('main-title');
    const subtitle = document.getElementById('main-subtitle');
    const animContainer = document.getElementById('animation-container');

    // Nanti Dulu Button
    btnNo.addEventListener('click', () => {
        createPetals(10);
        createHearts(5);
        
        // Buat tombol NO lari kalau di desktop, atau ganti teks
        btnNo.textContent = "Beneran gamau nihhhh? ";
        setTimeout(() => {
            btnNo.textContent = "Nanti dulu";
        }, 2000);
    });

    // Iya Button
    btnYes.addEventListener('click', () => {
        title.textContent = "Yeay! 🤍";
        subtitle.textContent = "Makasih yaaaaa ✨";
        
        // Sembunyikan tombol Yes/No utama
        document.getElementById('main-buttons').style.display = 'none';

        // Tampilkan pilihan lokasi
        const locationOptions = document.getElementById('location-options');
        locationOptions.style.display = 'block';
        
        // Animasi penuh
        createPetals(30);
        createHearts(20);
        createConfetti(50);
        createBlooms(5);
        
        // Tambahkan glow effect ke kartu
        card.style.boxShadow = "0 0 40px rgba(255, 71, 87, 0.5)";
        card.style.border = "2px solid #ff4757";
    });

    let selectedLocation = "";

    // Location custom
    const locationButtonsContainer = document.getElementById('location-buttons');
    const customLocContainer = document.getElementById('custom-loc-container');
    const customLocInput = document.getElementById('custom-loc-input');
    const btnSubmitLoc = document.getElementById('btn-submit-loc');

    // Time custom
    const timeButtonsContainer = document.getElementById('time-buttons');
    const customTimeContainer = document.getElementById('custom-time-container');
    const customTimeInput = document.getElementById('custom-time-input');
    const btnSubmitTime = document.getElementById('btn-submit-time');

    // Location Buttons Logic
    const locationBtns = document.querySelectorAll('.location-btn');
    locationBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const loc = e.target.getAttribute('data-loc');
            if(loc === "custom") {
                locationButtonsContainer.style.display = 'none';
                customLocContainer.style.display = 'flex';
            } else {
                proceedToTime(loc);
            }
        });
    });

    btnSubmitLoc.addEventListener('click', () => {
        const val = customLocInput.value.trim();
        if(val !== "") {
            proceedToTime(val);
        } else {
            alert("Isi dulu tempatnya yaa! ");
        }
    });

    function proceedToTime(loc) {
        selectedLocation = loc;
        document.getElementById('location-options').style.display = 'none';
        document.getElementById('time-options').style.display = 'block';
        subtitle.textContent = `Oke, kita ke ${selectedLocation}, mau jam berapa nih? ⏰`;
    }

    // Time Buttons Logic
    const timeBtns = document.querySelectorAll('.time-btn');
    timeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const time = e.target.getAttribute('data-time');
            if(time === "custom") {
                timeButtonsContainer.style.display = 'none';
                customTimeContainer.style.display = 'flex';
            } else {
                finishFlow(time);
            }
        });
    });

    btnSubmitTime.addEventListener('click', () => {
        const val = customTimeInput.value.trim();
        if(val !== "") {
            finishFlow(val);
        } else {
            alert("Isi dulu jamnya yaa! 😉");
        }
    });

    function finishFlow(time) {
        title.textContent = "Yeay, see you! ";
        subtitle.textContent = `Asikkk, kita nanti ke ${selectedLocation} jam ${time} yaaaaa, okeeiii! ✨`;
        
        // Sembunyikan pilihan lokasi/waktu
        document.getElementById('time-options').style.display = 'none';

        // Animasi closing
        createPetals(20);
        createBlooms(3);
        let count = 0;
        const interval = setInterval(() => {
            createHearts(5);
            createConfetti(10);
            count++;
            if(count > 10) clearInterval(interval);
        }, 500);
    }

    // Animasi Functions
    function createPetals(amount) {
        for(let i=0; i<amount; i++) {
            const petal = document.createElement('div');
            petal.classList.add('petal');
            petal.style.left = `${Math.random() * 100}vw`;
            petal.style.animationDuration = `${Math.random() * 3 + 2}s`;
            petal.style.animationDelay = `${Math.random() * 0.5}s`;
            // Random colors for petals
            const colors = ['#ffb6c1', '#ff91a4', '#ffa3b5', '#ffffff'];
            petal.style.background = colors[Math.floor(Math.random() * colors.length)];
            animContainer.appendChild(petal);
            setTimeout(() => petal.remove(), 5000);
        }
    }

    function createHearts(amount) {
        for(let i=0; i<amount; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart-fly');
            heart.textContent = ['🦋', '🦋', '🦋', '🦋'][Math.floor(Math.random() * 4)];
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.animationDuration = `${Math.random() * 3 + 3}s`;
            animContainer.appendChild(heart);
            setTimeout(() => heart.remove(), 6000);
        }
    }

    function createConfetti(amount) {
        for(let i=0; i<amount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;
            const colors = ['#f1c40f', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6'];
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            animContainer.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }
    }

    function createBlooms(amount) {
        for(let i=0; i<amount; i++) {
            const bloom = document.createElement('div');
            bloom.classList.add('bloom');
            bloom.textContent = ['🌸', '🌺', '🌷', '🌻'][Math.floor(Math.random() * 4)];
            bloom.style.left = `${Math.random() * 90 + 5}vw`;
            bloom.style.animationDuration = `${Math.random() * 1.5 + 1.5}s`;
            animContainer.appendChild(bloom);
            setTimeout(() => bloom.remove(), 3500);
        }
    }
});
