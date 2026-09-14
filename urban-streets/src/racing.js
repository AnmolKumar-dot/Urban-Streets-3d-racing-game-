// URBAN STREETS - Racing System

const RacingSystem = {
    canvas: null,
    ctx: null,
    isRacing: false,
    isPaused: false,
    track: null,
    player: null,
    aiRacers: [],
    raceStartTime: 0,
    raceTime: 0,
    countdown: 3,
    countdownActive: false,
    currentLap: 1,
    totalLaps: 3,
    currentCheckpoint: 0,
    playerPosition: 1,
    finished: false,
    finishPosition: 0,
    
    init(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
    },
    
    resize() {
        if (this.canvas) {
            this.canvas.width = this.canvas.offsetWidth;
            this.canvas.height = this.canvas.offsetHeight;
        }
    },
    
    startRace(racerData) {
        const trackTheme = GAME_DATA.trackThemes[GAME_DATA.racers.indexOf(racerData) % GAME_DATA.trackThemes.length];
        this.track = TrackSystem.generateTrack(trackTheme, racerData.id);
        
        const playerCarId = Player.getCurrentCar();
        const playerStats = CarSystem.calculateEffectiveStats(playerCarId);
        
        this.player = {
            x: this.track.checkpoints[0].x - 20,
            y: this.track.checkpoints[0].y,
            angle: -Math.PI / 2,
            speed: 0,
            maxSpeed: playerStats.speed,
            acceleration: playerStats.acceleration,
            handling: playerStats.handling,
            braking: playerStats.braking,
            nitro: 100,
            currentCheckpoint: 0,
            lap: 0,
            carId: playerCarId,
            controls: { up: false, down: false, left: false, right: false, nitro: false }
        };
        
        // Create AI opponents
        this.aiRacers = [];
        const aiCount = Math.min(3, racerData.isBoss ? 1 : 2);
        for (let i = 0; i < aiCount; i++) {
            const aiRacer = GAME_DATA.racers.find(r => r.gang === racerData.gang && !r.isBoss && r.id !== racerData.id) || racerData;
            const diffMult = 0.85 + (i * 0.05);
            this.aiRacers.push(AISystem.createAI(aiRacer, this.track, diffMult));
        }
        
        this.totalLaps = this.track.totalLaps;
        this.currentLap = 1;
        this.currentCheckpoint = 0;
        this.raceTime = 0;
        this.finished = false;
        this.finishPosition = 0;
        this.isRacing = true;
        this.isPaused = false;
        
        this.startCountdown();
        this.gameLoop();
    },
    
    startCountdown() {
        this.countdownActive = true;
        this.countdown = 3;
        const overlay = document.getElementById('countdown-overlay');
        const numberEl = document.getElementById('countdown-number');
        
        overlay.classList.remove('hidden');
        
        const countInterval = setInterval(() => {
            if (this.countdown > 0) {
                AudioSystem.playCountdown(this.countdown);
                numberEl.textContent = this.countdown;
                numberEl.style.animation = 'none';
                numberEl.offsetHeight;
                numberEl.style.animation = 'countdownPop 0.8s ease forwards';
                this.countdown--;
            } else {
                clearInterval(countInterval);
                AudioSystem.playGo();
                numberEl.textContent = 'GO!';
                this.raceStartTime = Date.now();
                setTimeout(() => {
                    overlay.classList.add('hidden');
                    this.countdownActive = false;
                }, 800);
            }
        }, 1000);
    },
    
    gameLoop() {
        if (!this.isRacing) return;
        
        const deltaTime = 16;
        
        if (!this.isPaused && !this.countdownActive) {
            this.update(deltaTime);
        }
        this.render();
        
        requestAnimationFrame(() => this.gameLoop());
    },
    
    update(deltaTime) {
        // Update race time
        this.raceTime = Date.now() - this.raceStartTime;
        
        // Update player
        this.updatePlayer(deltaTime);
        
        // Update AI
        for (const ai of this.aiRacers) {
            AISystem.updateAI(ai, this.track, deltaTime, this.player);
        }
        
        // Calculate position
        this.calculatePosition();
        
        // Update HUD
        this.updateHUD();
        
        // Check finish
        if (this.player.lap >= this.totalLaps && !this.finished) {
            this.finishRace();
        }
    },
    
    updatePlayer(dt) {
        const p = this.player;
        const turnSpeed = 0.04 * (p.handling / 100);
        const accelRate = 0.15 * (p.acceleration / 100);
        const brakeRate = 0.25 * (p.braking / 100);
        const friction = 0.98;
        const maxNitroSpeed = p.maxSpeed * 1.3;
        
        // Steering
        if (p.controls.left) p.angle -= turnSpeed * dt;
        if (p.controls.right) p.angle += turnSpeed * dt;
        
        // Acceleration
        if (p.controls.up) {
            const targetSpeed = p.controls.nitro && p.nitro > 0 ? maxNitroSpeed : p.maxSpeed;
            p.speed = Math.min(p.speed + accelRate * dt, targetSpeed);
            if (p.controls.nitro && p.nitro > 0) {
                p.nitro -= 0.3 * dt;
                AudioSystem.playNitro();
            }
        }
        
        // Braking
        if (p.controls.down) {
            p.speed = Math.max(p.speed - brakeRate * dt, 0);
        }
        
        // Friction
        p.speed *= friction;
        
        // Update position
        p.x += Math.cos(p.angle) * p.speed * 0.1 * dt;
        p.y += Math.sin(p.angle) * p.speed * 0.1 * dt;
        
        // Check checkpoint
        const cp = this.track.checkpoints[p.currentCheckpoint];
        const dist = Math.sqrt((p.x - cp.x) ** 2 + (p.y - cp.y) ** 2);
        if (dist < cp.radius) {
            p.currentCheckpoint = (p.currentCheckpoint + 1) % this.track.checkpoints.length;
            if (p.currentCheckpoint === 0) {
                p.lap++;
                this.currentLap = p.lap + 1;
            }
        }
        
        // Nitro regen
        if (!p.controls.nitro && p.nitro < 100) {
            p.nitro += 0.1 * dt;
        }
    },
    
    calculatePosition() {
        const allRacers = [this.player, ...this.aiRacers];
        let pos = 1;
        for (const r of allRacers) {
            if (r === this.player) continue;
            if (r.lap > this.player.lap) pos++;
            else if (r.lap === this.player.lap && r.currentCheckpoint > this.player.currentCheckpoint) pos++;
        }
        this.playerPosition = pos;
    },
    
    render() {
        const ctx = this.ctx;
        const canvas = this.canvas;
        
        // Clear
        ctx.fillStyle = '#0a0a0f';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Camera follow player
        const camX = this.player.x - canvas.width / 2;
        const camY = this.player.y - canvas.height / 2;
        
        // Draw track
        TrackSystem.drawTrack(ctx, this.track, camX, camY, 1);
        
        // Draw environment
        this.drawEnvironment(ctx, camX, camY);
        
        // Draw AI racers
        for (const ai of this.aiRacers) {
            CarSystem.drawCar(ctx, ai.x, ai.y, ai.carId, { rotation: ai.angle + Math.PI/2, nitro: ai.usingNitro });
        }
        
        // Draw player
        CarSystem.drawCar(ctx, this.player.x, this.player.y, this.player.carId, { 
            rotation: this.player.angle + Math.PI/2, 
            nitro: this.player.controls.nitro && this.player.nitro > 0 
        });
    },
    
    drawEnvironment(ctx, camX, camY) {
        ctx.save();
        ctx.translate(-camX, -camY);
        
        // Draw buildings/decorations based on track theme
        const themeColor = this.track.themeColor || '#aa00ff';
        
        // Simple building outlines
        for (let i = 0; i < 20; i++) {
            const bx = (Math.sin(i * 1.5) * 400) + (i * 50);
            const by = (Math.cos(i * 2) * 400) + (i * 30);
            ctx.fillStyle = 'rgba(20, 20, 30, 0.8)';
            ctx.fillRect(bx - 30, by - 30, 60, 60);
            ctx.strokeStyle = themeColor;
            ctx.lineWidth = 2;
            ctx.strokeRect(bx - 30, by - 30, 60, 60);
            
            // Windows
            ctx.fillStyle = 'rgba(255, 255, 100, 0.3)';
            for (let w = 0; w < 3; w++) {
                for (let h = 0; h < 3; h++) {
                    if (Math.random() > 0.3) {
                        ctx.fillRect(bx - 20 + w * 15, by - 20 + h * 15, 10, 10);
                    }
                }
            }
        }
        
        ctx.restore();
    },
    
    updateHUD() {
        document.getElementById('hud-position').textContent = this.playerPosition;
        document.getElementById('hud-total').textContent = this.aiRacers.length + 1;
        document.getElementById('hud-lap').textContent = Math.min(this.currentLap, this.totalLaps);
        document.getElementById('hud-laps').textContent = this.totalLaps;
        
        const mins = Math.floor(this.raceTime / 60000);
        const secs = Math.floor((this.raceTime % 60000) / 1000);
        const ms = Math.floor((this.raceTime % 1000) / 10);
        document.getElementById('hud-time').textContent = 
            `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
        
        document.getElementById('hud-speed').textContent = Math.floor(this.player.speed);
        document.getElementById('hud-nitro-fill').style.width = `${this.player.nitro}%`;
    },
    
    pause() {
        this.isPaused = true;
        document.getElementById('race-pause-menu').classList.remove('hidden');
    },
    
    resume() {
        this.isPaused = false;
        document.getElementById('race-pause-menu').classList.add('hidden');
    },
    
    quitRace() {
        this.isRacing = false;
        document.getElementById('race-screen').classList.remove('active');
        document.getElementById('city-screen').classList.add('active');
        CitySystem.init();
    },
    
    finishRace() {
        this.finished = true;
        this.finishPosition = this.playerPosition;
        AudioSystem.playRaceFinish();
        
        setTimeout(() => this.showResults(), 2000);
    },
    
    showResults() {
        const racer = this.currentRacer;
        const baseReward = racer.reward;
        const positionBonus = Math.max(0, (4 - this.finishPosition) * 500);
        const totalReward = baseReward + positionBonus;
        const xpReward = racer.xp;
        
        // Update player
        Player.addMoney(totalReward);
        Player.addXp(xpReward);
        Player.defeatRacer(racer.id);
        Player.completeRace(racer.id);
        
        // Update gang progress
        const gangRacers = GAME_DATA.racers.filter(r => r.gang === racer.gang);
        const completedInGang = gangRacers.filter(r => Player.isRacerDefeated(r.id)).length;
        Player.updateGangProgress(racer.gang, completedInGang);
        
        // Show results screen
        document.getElementById('race-screen').classList.remove('active');
        document.getElementById('results-screen').classList.add('active');
        
        document.getElementById('results-title').textContent = this.finishPosition === 1 ? 'RACE COMPLETE' : 'RACE FINISHED';
        document.getElementById('results-position').textContent = 
            this.finishPosition === 1 ? '🏆 1ST PLACE' : `${this.finishPosition}${this.getOrdinal(this.finishPosition)} PLACE`;
        document.getElementById('results-reward').textContent = `+$${baseReward.toLocaleString()}`;
        document.getElementById('results-bonus').textContent = `+$${positionBonus.toLocaleString()}`;
        document.getElementById('results-total').textContent = `+$${totalReward.toLocaleString()}`;
        document.getElementById('results-xp').textContent = `+${xpReward} XP`;
        
        const mins = Math.floor(this.raceTime / 60000);
        const secs = Math.floor((this.raceTime % 60000) / 1000);
        const ms = Math.floor((this.raceTime % 1000) / 10);
        document.getElementById('results-time').textContent = 
            `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
        
        if (this.finishPosition === 1) {
            AudioSystem.playVictory();
        } else {
            AudioSystem.playDefeat();
        }
        
        Player.save();
    },
    
    getOrdinal(n) {
        const s = ['th', 'st', 'nd', 'rd'];
        const v = n % 100;
        return s[(v - 20) % 10] || s[v] || s[0];
    },
    
    setControl(key, value) {
        if (key === 'up' || key === 'w') this.player.controls.up = value;
        if (key === 'down' || key === 's') this.player.controls.down = value;
        if (key === 'left' || key === 'a') this.player.controls.left = value;
        if (key === 'right' || key === 'd') this.player.controls.right = value;
        if (key === ' ' || key === 'nitro') this.player.controls.nitro = value;
    }
};
