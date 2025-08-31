document.addEventListener('DOMContentLoaded', function() {
    // Chặn scroll
    document.body.style.overflow = 'hidden';
    
    // Chặn các phím tắt
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'PageDown' || e.key === 'PageUp' || e.key === ' ') {
            e.preventDefault();
        }
    });
    
    // Chặn scroll bằng chuột
    document.addEventListener('wheel', function(e) {
        e.preventDefault();
    }, { passive: false });
    
    // Chặn touch scroll trên mobile
    document.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, { passive: false });
    
    // --- COUNTDOWN TIMER ---
    function updateCountdown() {
        const birthday = new Date('2025-09-06T00:00:00');
        const now = new Date();
        const diff = birthday - now;
        
        if (diff > 0) {
            // Còn thời gian - hiển thị countdown
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
            
            // Ẩn nút chuyển trang
            document.getElementById('birthday-button').style.display = 'none';
            
        } else {
            // Đã đến sinh nhật - hiển thị nút chuyển trang
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            
            // Hiện nút chuyển trang với hiệu ứng
            const birthdayButton = document.getElementById('birthday-button');
            birthdayButton.style.display = 'block';
            
            // Thêm hiệu ứng confetti
            createBirthdayConfetti();
            
            // Thay đổi nội dung countdown
            const countdownTimer = document.querySelector('.countdown-timer');
            countdownTimer.innerHTML = '<div class="birthday-text">🎉 Happy Birthday, Vân Anh! 🎉</div>';
            
            // Thay đổi message
            const message = document.querySelector('.message');
            message.innerHTML = '<p>🎂 Chúc mừng sinh nhật! Đã đến lúc khám phá những điều bí mật rồi!</p><p class="quote">"Mọi điều tốt đẹp đều đã sẵn sàng cho cậu!" ✨</p>';
            
            // Cho phép scroll
            document.body.style.overflow = 'auto';
            
            // Cho phép các phím tắt
            document.removeEventListener('keydown', arguments.callee);
            document.removeEventListener('wheel', arguments.callee);
            document.removeEventListener('touchmove', arguments.callee);
        }
    }
    
    // Cập nhật countdown mỗi giây
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // --- BIRTHDAY CONFETTI EFFECT ---
    function createBirthdayConfetti() {
        const colors = ['#FFD700', '#FFA500', '#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD'];
        const confettiCount = 100;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1000';
            confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
            confetti.style.animationDelay = Math.random() * 2 + 's';
            
            document.body.appendChild(confetti);
            
            // Xóa confetti sau khi animation kết thúc
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 8000);
        }
    }
    
    // Thêm CSS animation cho confetti
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        
        .birthday-text {
            font-size: 3rem;
            color: #FFD700;
            text-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
            font-family: 'Playfair Display', serif;
            font-weight: 700;
            animation: birthdayGlow 2s ease-in-out infinite alternate;
        }
        
        @keyframes birthdayGlow {
            0% { text-shadow: 0 0 20px rgba(255, 215, 0, 0.8); }
            100% { text-shadow: 0 0 30px rgba(255, 215, 0, 1), 0 0 40px rgba(255, 215, 0, 0.6); }
        }
    `;
    document.head.appendChild(style);
    
    // --- FLOATING ELEMENTS ANIMATION ---
    function animateFloatingElements() {
        const floatingItems = document.querySelectorAll('.floating-item');
        
        floatingItems.forEach((item, index) => {
            item.style.animationDelay = (index * 2) + 's';
        });
    }
    
    animateFloatingElements();
    
    // --- ADDITIONAL OCEAN EFFECTS ---
    function createOceanBubbles() {
        const bubble = document.createElement('div');
        bubble.style.position = 'fixed';
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.bottom = '-20px';
        bubble.style.width = Math.random() * 20 + 10 + 'px';
        bubble.style.height = bubble.style.width;
        bubble.style.background = 'rgba(255, 255, 255, 0.3)';
        bubble.style.borderRadius = '50%';
        bubble.style.pointerEvents = 'none';
        bubble.style.zIndex = '5';
        bubble.style.animation = `bubbleRise ${Math.random() * 4 + 3}s ease-out forwards`;
        
        document.body.appendChild(bubble);
        
        // Xóa bubble sau khi animation kết thúc
        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.parentNode.removeChild(bubble);
            }
        }, 8000);
    }
    
    // Tạo bubbles định kỳ
    setInterval(createOceanBubbles, 2000);
    
    // Thêm CSS animation cho bubbles
    const bubbleStyle = document.createElement('style');
    bubbleStyle.textContent = `
        @keyframes bubbleRise {
            0% { transform: translateY(0) scale(0.5); opacity: 0.7; }
            50% { transform: translateY(-50vh) scale(1.2); opacity: 1; }
            100% { transform: translateY(-100vh) scale(0.8); opacity: 0; }
        }
    `;
    document.head.appendChild(bubbleStyle);
    
    // --- SMOOTH TRANSITION TO BIRTHDAY PAGE ---
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn')) {
            // Thêm hiệu ứng transition
            document.body.style.transition = 'opacity 1s ease-out';
            document.body.style.opacity = '0';
            
            setTimeout(() => {
                window.location.href = 'birthday.html';
            }, 1000);
        }
    });
});
