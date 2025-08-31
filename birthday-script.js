document.addEventListener('DOMContentLoaded', function() {
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
    const crystals = document.querySelectorAll('.crystal');
    const wishToast = document.getElementById('wish-toast');
    
    crystals.forEach(crystal => {
        crystal.addEventListener('click', function() {
            if (!this.classList.contains('lit')) {
                // Thắp sáng pha lê
                this.classList.add('lit');
                
                // Hiển thị lời chúc
                const wish = this.getAttribute('data-wish');
                wishToast.textContent = wish;
                wishToast.classList.add('show');
                
                // Tạo hiệu ứng bong bóng biển
                createSeaBubbles(this);
                
                // Tạo hiệu ứng confetti
                createConfetti(this);
                
                // Ẩn toast sau 3 giây
                setTimeout(() => {
                    wishToast.classList.remove('show');
                }, 3000);
            }
        });
    });

    // --- SEA BUBBLES EFFECT ---
    function createSeaBubbles(crystal) {
        const rect = crystal.getBoundingClientRect();
        const colors = ['#87CEEB', '#98D8E8', '#B0E0E6', '#ADD8E6', '#E0F6FF'];
        const bubbleCount = 30;
        
        for (let i = 0; i < bubbleCount; i++) {
            const bubble = document.createElement('div');
            bubble.style.position = 'fixed';
            bubble.style.left = (rect.left + rect.width / 2) + 'px';
            bubble.style.top = (rect.top + rect.height / 2) + 'px';
            bubble.style.width = Math.random() * 15 + 10 + 'px';
            bubble.style.height = bubble.style.width;
            bubble.style.background = colors[Math.floor(Math.random() * colors.length)];
            bubble.style.borderRadius = '50%';
            bubble.style.pointerEvents = 'none';
            bubble.style.zIndex = '1000';
            bubble.style.opacity = '0.7';
            bubble.style.animation = `bubbleRise ${Math.random() * 3 + 2}s ease-out forwards`;
            
            document.body.appendChild(bubble);
            
            // Xóa bubble sau khi animation kết thúc
            setTimeout(() => {
                if (bubble.parentNode) {
                    bubble.parentNode.removeChild(bubble);
                }
            }, 6000);
        }
    }

    // --- CONFETTI EFFECT ---
    function createConfetti(crystal) {
        const rect = crystal.getBoundingClientRect();
        const colors = ['#FFD700', '#FFA500', '#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = (rect.left + rect.width / 2) + 'px';
            confetti.style.top = (rect.top + rect.height / 2) + 'px';
            confetti.style.width = '8px';
            confetti.style.height = '8px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1000';
            confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            
            document.body.appendChild(confetti);
            
            // Xóa confetti sau khi animation kết thúc
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 8000);
        }
    }

    // Thêm CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bubbleRise {
            0% { transform: translateY(0) scale(0.5); opacity: 0.7; }
            50% { transform: translateY(-50vh) scale(1.2); opacity: 1; }
            100% { transform: translateY(-100vh) scale(0.8); opacity: 0; }
        }
        
        @keyframes confettiFall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

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
    
    // Apply typing effect to hero subtitle after a delay
    setTimeout(() => {
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const originalText = heroSubtitle.innerHTML;
        typeWriter(heroSubtitle, originalText, 80);
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
        const elements = ['🐚', '⭐', '🐠', '🌊', '💎', '🌅', '🏖️'];
        const element = document.createElement('div');
        element.innerHTML = elements[Math.floor(Math.random() * elements.length)];
        element.style.position = 'fixed';
        element.style.left = Math.random() * 100 + '%';
        element.style.top = '100vh';
        element.style.fontSize = '2rem';
        element.style.color = '#1E90FF';
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
    
    // --- OCEAN WAVES ANIMATION ---
    function createOceanWaves() {
        const wave = document.createElement('div');
        wave.style.position = 'fixed';
        wave.style.bottom = '0';
        wave.style.left = '0';
        wave.style.width = '200%';
        wave.style.height = '40%';
        wave.style.background = 'linear-gradient(to bottom, rgba(30, 144, 255, 0.3), rgba(65, 105, 225, 0.2))';
        wave.style.borderRadius = '50% 50% 0 0';
        wave.style.animation = `wave ${Math.random() * 2 + 8}s ease-in-out infinite`;
        wave.style.zIndex = '2';
        
        document.body.appendChild(wave);
        
        // Remove wave after animation
        setTimeout(() => {
            if (wave.parentNode) {
                wave.parentNode.removeChild(wave);
            }
        }, 15000);
    }
    
    // Create additional waves periodically
    setInterval(createOceanWaves, 3000);
    
    // Add wave animation CSS
    const waveStyle = document.createElement('style');
    waveStyle.textContent = `
        @keyframes wave {
            0%, 100% { transform: translateX(-50%) translateY(0px) rotate(0deg); }
            50% { transform: translateX(-50%) translateY(-10px) rotate(1deg); }
        }
    `;
    document.head.appendChild(waveStyle);
    
    // --- CHECK IF ALL CRYSTALS ARE LIT ---
    function checkAllCrystalsLit() {
        const litCrystals = document.querySelectorAll('.crystal.lit');
        if (litCrystals.length === crystals.length) {
            // Tất cả pha lê đã được thắp sáng
            setTimeout(() => {
                showCompletionMessage();
            }, 1000);
        }
    }
    
    function showCompletionMessage() {
        const completionMessage = document.createElement('div');
        completionMessage.style.position = 'fixed';
        completionMessage.style.top = '50%';
        completionMessage.style.left = '50%';
        completionMessage.style.transform = 'translate(-50%, -50%)';
        completionMessage.style.background = 'linear-gradient(135deg, #FFD700, #FFA500)';
        completionMessage.style.color = '#000';
        completionMessage.style.padding = '30px 50px';
        completionMessage.style.borderRadius = '25px';
        completionMessage.style.fontSize = '1.5rem';
        completionMessage.style.fontWeight = 'bold';
        completionMessage.style.textAlign = 'center';
        completionMessage.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';
        completionMessage.style.border = '3px solid #FFF';
        completionMessage.style.zIndex = '2000';
        completionMessage.style.animation = 'fadeInScale 0.5s ease-out';
        
        completionMessage.innerHTML = `
            <h3>🎉 Hoàn Thành!</h3>
            <p>Tất cả lời chúc đã được thắp sáng!</p>
            <p style="margin-top: 15px; font-size: 1.2rem;">Vân Anh xứng đáng có được tất cả những điều tốt đẹp này! ✨</p>
        `;
        
        document.body.appendChild(completionMessage);
        
        // Ẩn message sau 5 giây
        setTimeout(() => {
            completionMessage.style.animation = 'fadeOutScale 0.5s ease-out';
            setTimeout(() => {
                if (completionMessage.parentNode) {
                    completionMessage.parentNode.removeChild(completionMessage);
                }
            }, 500);
        }, 5000);
    }
    
    // Add completion animation CSS
    const completionStyle = document.createElement('style');
    completionStyle.textContent = `
        @keyframes fadeInScale {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        
        @keyframes fadeOutScale {
            0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
    `;
    document.head.appendChild(completionStyle);
    
    // Kiểm tra mỗi khi click pha lê
    crystals.forEach(crystal => {
        crystal.addEventListener('click', checkAllCrystalsLit);
    });
});
