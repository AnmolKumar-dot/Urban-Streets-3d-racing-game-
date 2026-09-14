// URBAN STREETS - Audio System

const AudioSystem = {
    audioContext: null,
    masterGain: null,
    musicVolume: 0.6,
    sfxVolume: 0.8,
    enabled: true,
    
    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.audioContext.createGain();
            this.masterGain.connect(this.audioContext.destination);
            this.masterGain.gain.value = 1;
            this.enabled = true;
        } catch (e) {
            console.warn('Web Audio API not supported');
            this.enabled = false;
        }
    },
    
    setMasterVolume(value) {
        if (this.masterGain) {
            this.masterGain.gain.value = value / 100;
        }
    },
    
    playTone(frequency, duration, type = 'sine', volume = 0.3) {
        if (!this.enabled || !this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);
        
        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(volume * this.sfxVolume, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    },
    
    playMenuClick() {
        this.playTone(800, 0.1, 'square', 0.1);
    },
    
    playCountdown(num) {
        const freq = 600 + (3 - num) * 100;
        this.playTone(freq, 0.2, 'square', 0.2);
    },
    
    playGo() {
        this.playTone(1200, 0.3, 'square', 0.3);
        setTimeout(() => this.playTone(1600, 0.3, 'square', 0.3), 100);
    },
    
    playEngine(pitch = 1, volume = 0.2) {
        // Engine sound is continuous, handled separately
    },
    
    playNitro() {
        if (!this.enabled || !this.audioContext) return;
        
        const bufferSize = this.audioContext.sampleRate * 0.5;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        const noise = this.audioContext.createBufferSource();
        noise.buffer = buffer;
        
        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 400;
        
        const gainNode = this.audioContext.createGain();
        gainNode.gain.value = 0.3 * this.sfxVolume;
        
        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.masterGain);
        
        noise.start();
    },
    
    playSkid() {
        if (!this.enabled || !this.audioContext) return;
        
        const bufferSize = this.audioContext.sampleRate * 0.3;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        const noise = this.audioContext.createBufferSource();
        noise.buffer = buffer;
        
        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 1000;
        
        const gainNode = this.audioContext.createGain();
        gainNode.gain.setValueAtTime(0.2 * this.sfxVolume, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
        
        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.masterGain);
        
        noise.start();
    },
    
    playCollision() {
        this.playTone(150, 0.3, 'sawtooth', 0.3);
        this.playTone(100, 0.3, 'square', 0.2);
    },
    
    playVictory() {
        const notes = [523, 659, 784, 1047];
        notes.forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, 0.4, 'sine', 0.3), i * 150);
        });
    },
    
    playDefeat() {
        const notes = [392, 349, 311, 261];
        notes.forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, 0.4, 'triangle', 0.2), i * 200);
        });
    },
    
    playRaceFinish() {
        this.playTone(880, 0.2, 'sine', 0.3);
        setTimeout(() => this.playTone(1100, 0.3, 'sine', 0.3), 150);
    },
    
    playBuy() {
        this.playTone(1000, 0.15, 'sine', 0.2);
        setTimeout(() => this.playTone(1500, 0.2, 'sine', 0.2), 100);
    },
    
    playError() {
        this.playTone(200, 0.2, 'sawtooth', 0.2);
    },
    
    resume() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }
};
