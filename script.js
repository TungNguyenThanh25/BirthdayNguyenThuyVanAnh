document.addEventListener('DOMContentLoaded', function() {
    // --- OCEAN WAVES BACKGROUND ---
    const oceanWaves = document.getElementById('ocean-waves');
    
    function createWave() {
        const wave = document.createElement('div');
        wave.className = 'wave';
        wave.style.animationDelay = Math.random() * 8 + 's';
        wave.style.animationDuration = (Math.random() * 2 + 6) + 's';
        oceanWaves.appendChild(wave);
        
        // Remove wave after animation
        setTimeout(() => {
            if (wave.parentNode) {
                wave.parentNode.removeChild(wave);
            }
        }, 12000);
    }
    
    // Create waves periodically
    setInterval(createWave, 2000);
    
    // --- COUNTDOWN TIMER ---
    function updateCountdown() {
        const birthday = new Date('2025-09-06T00:00:00');
        const now = new Date();
        const diff = birthday - now;
        
        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            // Birthday has passed
            document.getElementById('countdown').innerHTML = '<h3 style="color: var(--ocean-deep); font-size: 2rem;">🎉 Happy Birthday, Vân Anh! 🎉</h3>';
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // --- BIRTHDAY TIME CHECK ---
    function isBirthdayTime() {
        const now = new Date();
        const birthday = new Date('2025-09-06T00:00:00');
        const diff = birthday - now;
        
        // Allow access if birthday has passed or if it's exactly the birthday
        return diff <= 0;
    }
    
    // --- EXPLORE BUTTON LOGIC ---
    const exploreBtn = document.getElementById('explore-btn');
    const waitMessage = document.getElementById('wait-message');
    
    exploreBtn.addEventListener('click', function(e) {
        if (!isBirthdayTime()) {
            e.preventDefault();
            showWaitMessage();
        }
        // If it's birthday time, allow normal navigation
    });
    
    function showWaitMessage() {
        waitMessage.classList.add('show');
        // Add some ocean-themed effects
        createSeaBubbles();
    }
    
    function closeWaitMessage() {
        waitMessage.classList.remove('show');
    }
    
    // Make closeWaitMessage global
    window.closeWaitMessage = closeWaitMessage;
    
    // --- SEA BUBBLES EFFECT ---
    function createSeaBubbles() {
        const colors = ['var(--ocean-light)', 'var(--ocean-surface)', 'var(--ocean-foam)'];
        const bubbleCount = 20;
        
        for (let i = 0; i < bubbleCount; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'confetti'; // Reusing confetti class for bubbles
            bubble.style.left = Math.random() * 100 + '%';
            bubble.style.top = '100vh';
            bubble.style.background = colors[Math.floor(Math.random() * colors.length)];
            bubble.style.animationDelay = Math.random() * 2 + 's';
            bubble.style.animationDuration = (Math.random() * 3 + 3) + 's';
            
            document.body.appendChild(bubble);
            
            setTimeout(() => {
                if (bubble.parentNode) {
                    bubble.parentNode.removeChild(bubble);
                }
            }, 8000);
        }
    }
    
    // --- HIỆU ỨNG HIỆN CONTENT KHI CUỘN TỚI ---
    const contentBoxes = document.querySelectorAll('.content-box');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    contentBoxes.forEach(box => {
        observer.observe(box);
    });

    // --- LOGIC HANG PHA LÊ ---
    const crystalCanvas = document.getElementById('crystal-canvas');
    const ctx = crystalCanvas.getContext('2d');
    const wishToast = document.getElementById('wish-toast');
    
    let crystals = [];
    const wishes = [
        "Luôn an yên và hạnh phúc như sóng biển", 
        "Luôn rạng rỡ như ánh nắng trên mặt biển", 
        "Luôn tự tin và mạnh mẽ như đại dương", 
        "Thật nhiều niềm vui và tiếng cười như tiếng sóng", 
        "Gặp nhiều may mắn trong cuộc sống", 
        "Thành công trong mọi ước mơ",
        "Luôn được yêu thương và trân trọng",
        "Mọi điều tốt đẹp sẽ đến với cậu như thủy triều"
    ];
    
    function resizeCanvas() {
        crystalCanvas.width = crystalCanvas.offsetWidth;
        crystalCanvas.height = crystalCanvas.offsetHeight;
    }

    function drawCrystal(crystal) {
        ctx.beginPath();
        ctx.moveTo(crystal.x, crystal.y - crystal.size);
        ctx.lineTo(crystal.x + crystal.size * 0.8, crystal.y);
        ctx.lineTo(crystal.x, crystal.y + crystal.size);
        ctx.lineTo(crystal.x - crystal.size * 0.8, crystal.y);
        ctx.closePath();
        
        // Ocean-themed gradient fill for crystals
        const gradient = ctx.createRadialGradient(
            crystal.x, crystal.y, 0,
            crystal.x, crystal.y, crystal.size
        );
        
        if (crystal.lit) {
            gradient.addColorStop(0, 'rgba(66, 165, 245, 1)');
            gradient.addColorStop(1, 'rgba(30, 136, 229, 0.8)');
            ctx.strokeStyle = '#42a5f5';
            ctx.shadowBlur = 30;
            ctx.shadowColor = '#42a5f5';
        } else {
            gradient.addColorStop(0, 'rgba(100, 181, 246, 0.9)');
            gradient.addColorStop(1, 'rgba(144, 202, 249, 0.7)');
            ctx.strokeStyle = '#64b5f6';
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#64b5f6';
        }
        
        ctx.fillStyle = gradient;
        ctx.lineWidth = 3;
        ctx.fill();
        ctx.stroke();
        
        // Add ocean sparkle effect for lit crystals
        if (crystal.lit) {
            ctx.save();
            ctx.globalAlpha = 0.8;
            ctx.beginPath();
            ctx.arc(crystal.x, crystal.y, crystal.size * 0.3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.fill();
            ctx.restore();
        }
    }

    function createCrystals() {
        crystals = [];
        for (let i = 0; i < wishes.length; i++) {
            crystals.push({
                x: (crystalCanvas.width / (wishes.length + 1)) * (i + 1),
                y: crystalCanvas.height / 2 + (Math.random() - 0.5) * 60,
                size: Math.random() * 20 + 25,
                wish: wishes[i],
                lit: false,
                pulse: 0
            });
        }
    }

    function animateCrystals() {
        ctx.clearRect(0, 0, crystalCanvas.width, crystalCanvas.height);
        
        // Add subtle ocean background glow
        ctx.fillStyle = 'rgba(66, 165, 245, 0.05)';
        ctx.fillRect(0, 0, crystalCanvas.width, crystalCanvas.height);
        
        crystals.forEach(crystal => {
            crystal.pulse += 0.1;
            drawCrystal(crystal);
        });
        
        requestAnimationFrame(animateCrystals);
    }

    resizeCanvas();
    createCrystals();
    animateCrystals();
    window.addEventListener('resize', () => {
        resizeCanvas();
        createCrystals();
    });

    // --- SEA BUBBLES EFFECT FOR CRYSTALS ---
    function createSeaBubblesForCrystal(x, y) {
        const colors = ['#42a5f5', '#64b5f6', '#90caf9', '#bbdefb', '#e3f2fd'];
        const bubbleCount = 40;
        
        for (let i = 0; i < bubbleCount; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'confetti';
            bubble.style.left = x + 'px';
            bubble.style.top = y + 'px';
            bubble.style.background = colors[Math.floor(Math.random() * colors.length)];
            bubble.style.animationDelay = Math.random() * 0.5 + 's';
            bubble.style.animationDuration = (Math.random() * 2 + 3) + 's';
            
            document.body.appendChild(bubble);
            
            setTimeout(() => {
                if (bubble.parentNode) {
                    bubble.parentNode.removeChild(bubble);
                }
            }, 6000);
        }
    }

    crystalCanvas.addEventListener('click', (event) => {
        const rect = crystalCanvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        crystals.forEach(crystal => {
            const distance = Math.sqrt(Math.pow(x - crystal.x, 2) + Math.pow(y - crystal.y, 2));
            if (distance < crystal.size && !crystal.lit) {
                crystal.lit = true;
                wishToast.textContent = crystal.wish;
                wishToast.classList.add('show');
                
                // Create sea bubbles at click position
                createSeaBubblesForCrystal(event.clientX, event.clientY);
                
                setTimeout(() => {
                    wishToast.classList.remove('show');
                }, 3000);
            }
        });
    });

    // --- ĐIỀU KHIỂN NHẠC ---
    const music = document.getElementById('background-music');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    let isPlaying = false;

    function togglePlay() {
        if (isPlaying) {
            music.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        } else {
            music.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        }
        isPlaying = !isPlaying;
    }

    playPauseBtn.addEventListener('click', togglePlay);
    
    document.body.addEventListener('click', () => {
        if (!isPlaying) {
            music.play().then(() => {
                isPlaying = true;
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
            }).catch(error => {
                console.log("Autoplay prevented.");
            });
        }
    }, { once: true });
    
    // --- TYPING EFFECT FOR HERO TEXT ---
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Apply typing effect to hero paragraph after a delay
    setTimeout(() => {
        const heroText = document.querySelector('#hero p');
        const originalText = heroText.innerHTML;
        typeWriter(heroText, originalText, 50);
    }, 1000);
    
    // --- SMOOTH SCROLLING FOR NAVIGATION ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // --- ADD FLOATING SEA ELEMENTS ---
    function addFloatingSeaElement() {
        const elements = ['🐚', '⭐', '🐠', '🌊', '💎'];
        const element = document.createElement('div');
        element.innerHTML = elements[Math.floor(Math.random() * elements.length)];
        element.style.position = 'fixed';
        element.style.left = Math.random() * 100 + '%';
        element.style.top = '100vh';
        element.style.fontSize = '2rem';
        element.style.color = 'var(--ocean-light)';
        element.style.opacity = '0.7';
        element.style.pointerEvents = 'none';
        element.style.zIndex = '1';
        element.style.transition = 'all 5s ease-out';
        
        document.body.appendChild(element);
        
        setTimeout(() => {
            element.style.top = '-10vh';
            element.style.opacity = '0';
        }, 100);
        
        setTimeout(() => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }, 5000);
    }
    
    // Add floating sea elements occasionally
    setInterval(addFloatingSeaElement, 4000);
});