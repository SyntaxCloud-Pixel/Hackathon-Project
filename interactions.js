document.addEventListener('DOMContentLoaded', () => {
    // 1. Ripple Effect for Buttons
    const buttons = document.querySelectorAll('button, .h-logo-style-button, .btn-green-pill, .btn-white-pill, .big-green-button, .small-white-btn');
    
    buttons.forEach(btn => {
        if (getComputedStyle(btn).position === 'static') {
            btn.style.position = 'relative';
        }
        btn.style.overflow = 'hidden';

        btn.addEventListener('click', function (e) {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripples = document.createElement('span');
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            ripples.classList.add('ripple-effect');
            this.appendChild(ripples);
            
            setTimeout(() => {
                ripples.remove();
            }, 600);
            
            // Show a subtle toast on button clicks
            showToast("Action recognized \u2728");
        });
    });

    // 2. Subtle 3D Card Tilt Effect
    const cards = document.querySelectorAll('.request-card, .info-card, .stat-box, .trend-card, .rank-card, .msg-card, .white-right-box, .dark-left-box, .ai-assistant-card');
    
    cards.forEach(card => {
        // Add a smooth transition for returning to normal state
        card.style.transition = 'transform 0.4s ease-out, box-shadow 0.4s ease-out';
        
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation (very subtle, max 3 degrees)
            const rotateX = ((y - centerY) / centerY) * -3; 
            const rotateY = ((x - centerX) / centerX) * 3;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
            card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.06)';
            // Remove transition during movement for zero-latency tracking
            card.style.transition = 'none';
        });
        
        card.addEventListener('mouseleave', () => {
            // Restore normal state with smooth transition
            card.style.transition = 'transform 0.5s ease-out, box-shadow 0.5s ease-out';
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            card.style.boxShadow = '';
        });
    });

    // 3. Toast Notification Setup
    const toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);

    function showToast(msg) {
        const toast = document.createElement('div');
        toast.classList.add('premium-toast');
        toast.innerText = msg;
        
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 400);
        }, 1500);
    }
});
