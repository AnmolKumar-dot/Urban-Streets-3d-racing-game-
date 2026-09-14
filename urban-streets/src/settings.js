// URBAN STREETS - Settings System

const SettingsSystem = {
    loadSettings() {
        const settings = Player.getSettings();
        
        document.getElementById('setting-quality').value = settings.quality;
        document.getElementById('setting-effects').checked = settings.effects;
        document.getElementById('setting-particles').checked = settings.particles;
        document.getElementById('setting-master-volume').value = settings.masterVolume;
        document.getElementById('setting-music-volume').value = settings.musicVolume;
        document.getElementById('setting-sfx-volume').value = settings.sfxVolume;
        document.getElementById('setting-touch-controls').checked = settings.touchControls;
    },
    
    saveSettings() {
        const settings = {
            quality: document.getElementById('setting-quality').value,
            effects: document.getElementById('setting-effects').checked,
            particles: document.getElementById('setting-particles').checked,
            masterVolume: parseInt(document.getElementById('setting-master-volume').value),
            musicVolume: parseInt(document.getElementById('setting-music-volume').value),
            sfxVolume: parseInt(document.getElementById('setting-sfx-volume').value),
            touchControls: document.getElementById('setting-touch-controls').checked
        };
        
        Player.updateSettings(settings);
        
        // Apply audio settings
        AudioSystem.setMasterVolume(settings.masterVolume);
        AudioSystem.sfxVolume = settings.sfxVolume / 100;
        AudioSystem.musicVolume = settings.musicVolume / 100;
    },
    
    applyQuality(quality) {
        // Quality settings could affect rendering resolution, particle counts, etc.
        console.log('Quality set to:', quality);
    }
};
