// URBAN STREETS - Main Entry Point

document.addEventListener('DOMContentLoaded', () => {
    // Initialize audio system
    AudioSystem.init();
    
    // Initialize UI system
    UISystem.init();
    
    // Initialize Racing system canvas
    RacingSystem.init('race-canvas');
    
    // Check for saved game
    const hasSave = SaveSystem.hasSave();
    document.getElementById('btn-continue').disabled = !hasSave;
    document.getElementById('btn-continue').style.opacity = hasSave ? '1' : '0.5';
    
    // Show main menu
    UISystem.showMainMenu();
    
    // Request landscape orientation on mobile
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch(() => {
            // Orientation lock not supported or denied
            console.log('Orientation lock not available');
        });
    }
    
    // Handle visibility change (pause when tab hidden)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && RacingSystem.isRacing && !RacingSystem.isPaused) {
            RacingSystem.pause();
        }
    });
    
    // Touch controls for racing
    setupTouchControls();
    
    console.log('URBAN STREETS loaded successfully!');
});

function setupTouchControls() {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouch) {
        const mobileControls = document.getElementById('mobile-controls');
        mobileControls.classList.remove('hidden');
        
        // Gas button
        const touchGas = document.getElementById('touch-gas');
        touchGas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            RacingSystem.setControl('up', true);
        });
        touchGas.addEventListener('touchend', (e) => {
            e.preventDefault();
            RacingSystem.setControl('up', false);
        });
        
        // Brake button
        const touchBrake = document.getElementById('touch-brake');
        touchBrake.addEventListener('touchstart', (e) => {
            e.preventDefault();
            RacingSystem.setControl('down', true);
        });
        touchBrake.addEventListener('touchend', (e) => {
            e.preventDefault();
            RacingSystem.setControl('down', false);
        });
        
        // Left button
        const touchLeft = document.getElementById('touch-left');
        touchLeft.addEventListener('touchstart', (e) => {
            e.preventDefault();
            RacingSystem.setControl('left', true);
        });
        touchLeft.addEventListener('touchend', (e) => {
            e.preventDefault();
            RacingSystem.setControl('left', false);
        });
        
        // Right button
        const touchRight = document.getElementById('touch-right');
        touchRight.addEventListener('touchstart', (e) => {
            e.preventDefault();
            RacingSystem.setControl('right', true);
        });
        touchRight.addEventListener('touchend', (e) => {
            e.preventDefault();
            RacingSystem.setControl('right', false);
        });
        
        // Nitro button
        const touchNitro = document.getElementById('touch-nitro');
        touchNitro.addEventListener('touchstart', (e) => {
            e.preventDefault();
            RacingSystem.setControl('nitro', true);
        });
        touchNitro.addEventListener('touchend', (e) => {
            e.preventDefault();
            RacingSystem.setControl('nitro', false);
        });
    }
}

// Prevent default touch behaviors
document.addEventListener('touchmove', (e) => {
    if (e.target.closest('#mobile-controls')) {
        e.preventDefault();
    }
}, { passive: false });
