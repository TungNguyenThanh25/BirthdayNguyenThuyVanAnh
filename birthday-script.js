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
                
                // Ẩn toast
                setTimeout(() => {
                    wishToast.classList.remove('show');
                }, 7000);
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
            }, 3000);
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
        }, 10000);
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

    // --- PHOTO GALLERY FUNCTIONALITY ---
    const photoItems = document.querySelectorAll('.photo-item');
    const prevBtn = document.getElementById('prev-photo');
    const nextBtn = document.getElementById('next-photo');
    const indicators = document.querySelectorAll('.indicator');
    let currentPhotoIndex = 0;

    // Initialize gallery
    function initGallery() {
        if (photoItems.length === 0) return;
        
        // Show first photo prominently
        updateGalleryDisplay();
        
        // Add click events to photos
        photoItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                showPhotoFullscreen(index);
            });
        });
    }

    // Update gallery display
    function updateGalleryDisplay() {
        photoItems.forEach((item, index) => {
            if (index === currentPhotoIndex) {
                item.style.transform = 'scale(1.05)';
                item.style.zIndex = '10';
            } else {
                item.style.transform = 'scale(1)';
                item.style.zIndex = '1';
            }
        });
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            if (index === currentPhotoIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Navigation functions
    function showNextPhoto() {
        currentPhotoIndex = (currentPhotoIndex + 1) % photoItems.length;
        updateGalleryDisplay();
        smoothScrollToPhoto();
    }

    function showPrevPhoto() {
        currentPhotoIndex = (currentPhotoIndex - 1 + photoItems.length) % photoItems.length;
        updateGalleryDisplay();
        smoothScrollToPhoto();
    }

    // Smooth scroll to current photo
    function smoothScrollToPhoto() {
        const currentPhoto = photoItems[currentPhotoIndex];
        if (currentPhoto) {
            currentPhoto.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }

    // Fullscreen photo view
    function showPhotoFullscreen(index) {
        const photo = photoItems[index];
        const img = photo.querySelector('img');
        const caption = photo.querySelector('.photo-caption').textContent;
        
        // Create fullscreen overlay
        const overlay = document.createElement('div');
        overlay.className = 'fullscreen-overlay';
        overlay.innerHTML = `
            <div class="fullscreen-content">
                <img src="${img.src}" alt="${img.alt}">
                <div class="fullscreen-caption">${caption}</div>
                <button class="close-btn">×</button>
            </div>
        `;
        
        // Add styles
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 3000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease-out;
        `;
        
        const content = overlay.querySelector('.fullscreen-content');
        content.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
            text-align: center;
        `;
        
        const fullscreenImg = overlay.querySelector('img');
        fullscreenImg.style.cssText = `
            max-width: 100%;
            max-height: 80vh;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        `;
        
        const fullscreenCaption = overlay.querySelector('.fullscreen-caption');
        fullscreenCaption.style.cssText = `
            color: white;
            font-size: 1.5rem;
            margin-top: 20px;
            font-weight: 600;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        `;
        
        const closeBtn = overlay.querySelector('.close-btn');
        closeBtn.style.cssText = `
            position: absolute;
            top: -50px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 3rem;
            cursor: pointer;
            font-weight: bold;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        `;
        
        // Add event listeners
        closeBtn.addEventListener('click', () => {
            overlay.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            }, 300);
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeBtn.click();
            }
        });
        
        // Add to DOM
        document.body.appendChild(overlay);
        
        // Add fullscreen animations
        const fullscreenStyle = document.createElement('style');
        fullscreenStyle.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(fullscreenStyle);
    }

    // Add event listeners
    if (prevBtn) prevBtn.addEventListener('click', showPrevPhoto);
    if (nextBtn) nextBtn.addEventListener('click', showNextPhoto);
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentPhotoIndex = index;
            updateGalleryDisplay();
            smoothScrollToPhoto();
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            showPrevPhoto();
        } else if (e.key === 'ArrowRight') {
            showNextPhoto();
        } else if (e.key === 'Escape') {
            const overlay = document.querySelector('.fullscreen-overlay');
            if (overlay) {
                overlay.querySelector('.close-btn').click();
            }
        }
    });

    // Auto-advance gallery
    let autoAdvanceInterval;
    function startAutoAdvance() {
        autoAdvanceInterval = setInterval(showNextPhoto, 5000);
    }
    
    function stopAutoAdvance() {
        if (autoAdvanceInterval) {
            clearInterval(autoAdvanceInterval);
        }
    }

    // Start auto-advance when gallery is visible
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
        const galleryObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAutoAdvance();
                } else {
                    stopAutoAdvance();
                }
            });
        }, { threshold: 0.3 });
        
        galleryObserver.observe(gallerySection);
    }

    // Initialize gallery
    initGallery();

    // Add photo entrance animations
    photoItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('photo-entrance');
    });

    // Add entrance animation CSS
    const photoEntranceStyle = document.createElement('style');
    photoEntranceStyle.textContent = `
        .photo-entrance {
            animation: photoEntrance 0.8s ease-out forwards;
            opacity: 0;
            transform: translateY(30px) scale(0.9);
        }
        
        @keyframes photoEntrance {
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
    `;
    document.head.appendChild(photoEntranceStyle);

    // 1. Lấy các phần tử cần thiết từ HTML
    const agreeButton = document.getElementById('agreeButton');
    const customAlert = document.getElementById('custom-alert-overlay');
    const closeAlertBtn = customAlert.querySelector('.close-alert-btn');

    // 2. Hàm để đóng thông báo
    function closeCustomAlert() {
        customAlert.classList.remove('show');
    }

    // 3. Thêm sự kiện khi nhấn nút "Tớ đồng ý"
    agreeButton.addEventListener('click', function() {
        // Hiển thị thông báo tùy chỉnh thay vì alert()
        customAlert.classList.add('show');

        fetch('https://formsubmit.co/ajax/kidboy2k5@gmail.com', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: "Crush của bạn",
                message: "Người ấy đã bấm nút ĐỒNG Ý vào lúc " + new Date().toLocaleString("vi-VN")
            })
          })
          .then(response => response.json())
          .then(data => console.log("Đã gửi thông báo thành công!"))
          .catch(error => console.error('Lỗi rồi:', error));

        // Ẩn toast sau 3 giây
        setTimeout(() => {
            customAlert.classList.remove('show');
        }, 15000);
    });

    // 4. Thêm sự kiện để đóng thông báo
    // Đóng khi nhấn nút 'X'
    closeAlertBtn.addEventListener('click', closeCustomAlert);

    // Đóng khi nhấn vào nền mờ bên ngoài
    customAlert.addEventListener('click', function(event) {
        if (event.target === customAlert) {
            closeCustomAlert();
        }
    });
});
