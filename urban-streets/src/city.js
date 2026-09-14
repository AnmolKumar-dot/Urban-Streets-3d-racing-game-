// URBAN STREETS - City Hub System

const CitySystem = {
    canvas: null,
    ctx: null,
    player: { x: 0, y: 0, angle: -Math.PI/2, speed: 0 },
    cameraX: 0,
    cameraY: 0,
    buildings: [],
    racers: [],
    nearbyRacer: null,
    
    init() {
        this.canvas = document.getElementById('city-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        this.generateCity();
        this.spawnRacers();
        this.player.x = 0;
        this.player.y = 0;
        
        this.gameLoop();
    },
    
    resize() {
        if (this.canvas) {
            this.canvas.width = this.canvas.offsetWidth;
            this.canvas.height = this.canvas.offsetHeight;
        }
    },
    
    generateCity() {
        // Generate buildings
        this.buildings = [];
        for (let i = 0; i < 50; i++) {
            const angle = (i / 50) * Math.PI * 2;
            const radius = 300 + Math.random() * 400;
            this.buildings.push({
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
                width: 40 + Math.random() * 60,
                height: 40 + Math.random() * 60,
                color: `hsl(${Math.random() * 60 + 200}, 50%, ${10 + Math.random() * 20}%)`,
                windows: Math.random() > 0.5
            });
        }
        
        // Add some central buildings
        for (let i = 0; i < 20; i++) {
            this.buildings.push({
                x: (Math.random() - 0.5) * 800,
                y: (Math.random() - 0.5) * 800,
                width: 50 + Math.random() * 80,
                height: 50 + Math.random() * 80,
                color: '#1a1a2e',
                windows: true
            });
        }
    },
    
    spawnRacers() {
        this.racers = [];
        const availableRacers = GAME_DATA.racers.filter(r => !r.isFinalBoss);
        
        for (let i = 0; i < Math.min(15, availableRacers.length); i++) {
            const racer = availableRacers[i];
            const angle = (i / 15) * Math.PI * 2;
            const radius = 200 + Math.random() * 300;
            
            this.racers.push({
                data: racer,
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
                angle: -angle,
                defeated: Player.isRacerDefeated(racer.id),
                canChallenge: Player.canChallengeRacer(racer)
            });
        }
    },
    
    gameLoop() {
        if (!document.getElementById('city-screen').classList.contains('active')) return;
        
        this.update();
        this.render();
        
        requestAnimationFrame(() => this.gameLoop());
    },
    
    update() {
        const p = this.player;
        const maxSpeed = 8;
        const accel = 0.2;
        const friction = 0.95;
        const turnSpeed = 0.05;
        
        // Controls
        if (this.controls?.up) p.speed = Math.min(p.speed + accel, maxSpeed);
        if (this.controls?.down) p.speed = Math.max(p.speed - accel, -maxSpeed/2);
        if (this.controls?.left) p.angle -= turnSpeed;
        if (this.controls?.right) p.angle += turnSpeed;
        
        // Friction
        p.speed *= friction;
        
        // Update position
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        
        // Camera follow
        this.cameraX = p.x - this.canvas.width / 2;
        this.cameraY = p.y - this.canvas.height / 2;
        
        // Check nearby racers
        this.nearbyRacer = null;
        for (const racer of this.racers) {
            const dx = p.x - racer.x;
            const dy = p.y - racer.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 60 && !racer.defeated && racer.canChallenge) {
                this.nearbyRacer = racer;
                break;
            }
        }
        
        // Update prompt
        const prompt = document.getElementById('interaction-prompt');
        if (this.nearbyRacer) {
            prompt.classList.remove('hidden');
            document.getElementById('prompt-racer-name').textContent = this.nearbyRacer.data.name;
        } else {
            prompt.classList.add('hidden');
        }
        
        // Update HUD
        document.getElementById('city-money').textContent = Player.getMoney().toLocaleString();
        document.getElementById('city-xp').textContent = Player.getXp();
        const car = CarSystem.getCarById(Player.getCurrentCar());
        document.getElementById('city-car-name').textContent = car ? car.name : 'Unknown';
    },
    
    render() {
        const ctx = this.ctx;
        const canvas = this.canvas;
        
        // Clear with dark background
        ctx.fillStyle = '#0a0a0f';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.save();
        ctx.translate(-this.cameraX, -this.cameraY);
        
        // Draw roads
        ctx.strokeStyle = '#1a1a1a';
        ctx.lineWidth = 100;
        ctx.beginPath();
        ctx.moveTo(-1000, 0);
        ctx.lineTo(1000, 0);
        ctx.moveTo(0, -1000);
        ctx.lineTo(0, 1000);
        ctx.stroke();
        
        // Road markings
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.setLineDash([20, 20]);
        ctx.beginPath();
        ctx.moveTo(-1000, 0);
        ctx.lineTo(1000, 0);
        ctx.moveTo(0, -1000);
        ctx.lineTo(0, 1000);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Draw buildings
        for (const b of this.buildings) {
            ctx.fillStyle = b.color;
            ctx.fillRect(b.x - b.width/2, b.y - b.height/2, b.width, b.height);
            
            // Neon edges
            ctx.strokeStyle = '#aa00ff';
            ctx.lineWidth = 2;
            ctx.strokeRect(b.x - b.width/2, b.y - b.height/2, b.width, b.height);
            
            // Windows
            if (b.windows) {
                ctx.fillStyle = 'rgba(255, 255, 100, 0.3)';
                for (let wx = 0; wx < 3; wx++) {
                    for (let wy = 0; wy < 3; wy++) {
                        if (Math.random() > 0.4) {
                            ctx.fillRect(
                                b.x - b.width/2 + 10 + wx * 15,
                                b.y - b.height/2 + 10 + wy * 15,
                                8, 8
                            );
                        }
                    }
                }
            }
        }
        
        // Draw racers
        for (const racer of this.racers) {
            if (racer.defeated) {
                ctx.fillStyle = '#333';
            } else if (racer.canChallenge) {
                ctx.fillStyle = racer.data.gang === 'street_phantoms' ? '#aa00ff' :
                               racer.data.gang === 'iron_vipers' ? '#ff4400' : '#00ff88';
            } else {
                ctx.fillStyle = '#666';
            }
            
            // Racer marker
            ctx.beginPath();
            ctx.arc(racer.x, racer.y, 20, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(racer.data.name, racer.x, racer.y - 30);
        }
        
        // Draw player car
        CarSystem.drawCar(this.ctx, this.player.x, this.player.y, Player.getCurrentCar(), {
            rotation: this.player.angle + Math.PI/2
        });
        
        ctx.restore();
    },
    
    setControls(controls) {
        this.controls = controls;
    },
    
    interactWithRacer() {
        if (this.nearbyRacer) {
            UISystem.showDialogue(this.nearbyRacer.data);
        }
    }
};
