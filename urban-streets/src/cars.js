// URBAN STREETS - Cars System

const CarSystem = {
    getCarById(carId) {
        return GAME_DATA.cars.find(c => c.id === carId);
    },
    
    getAllCars() {
        return GAME_DATA.cars;
    },
    
    getCarStats(carId, includeUpgrades = true, carUpgrades = null) {
        const car = this.getCarById(carId);
        if (!car) return null;
        
        let stats = { ...car.stats };
        
        if (includeUpgrades && carUpgrades) {
            // Apply upgrade bonuses
            for (const [upgradeType, level] of Object.entries(carUpgrades)) {
                const benefits = GAME_DATA.upgradeBenefits[upgradeType];
                if (benefits) {
                    for (const [stat, bonus] of Object.entries(benefits)) {
                        if (stats[stat] !== undefined) {
                            stats[stat] += bonus * level;
                        }
                    }
                }
            }
        }
        
        // Cap stats at reasonable maximums
        for (const stat in stats) {
            stats[stat] = Math.min(stats[stat], 300);
        }
        
        return stats;
    },
    
    calculateEffectiveStats(carId) {
        const upgrades = Player.getCarUpgrades(carId);
        return this.getCarStats(carId, true, upgrades);
    },
    
    getUpgradeCost(upgradeType, currentLevel) {
        const costs = GAME_DATA.upgradeCosts[upgradeType];
        if (currentLevel >= costs.length) return null;
        return costs[currentLevel];
    },
    
    getMaxUpgradeLevel() {
        return 5;
    },
    
    drawCar(ctx, x, y, carId, options = {}) {
        const car = this.getCarById(carId);
        if (!car) return;
        
        const scale = options.scale || 1;
        const rotation = options.rotation || 0;
        const nitro = options.nitro || false;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.scale(scale, scale);
        
        // Car body based on shape
        const color = car.color;
        
        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.beginPath();
        ctx.ellipse(0, 5, 25, 45, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Main body
        ctx.fillStyle = color;
        ctx.beginPath();
        
        switch (car.shape) {
            case 'compact':
                this.drawCompactCar(ctx, color);
                break;
            case 'sport':
                this.drawSportCar(ctx, color);
                break;
            case 'muscle':
                this.drawMuscleCar(ctx, color);
                break;
            case 'super':
                this.drawSuperCar(ctx, color);
                break;
            case 'hyper':
                this.drawHyperCar(ctx, color);
                break;
            default:
                this.drawDefaultCar(ctx, color);
        }
        
        // Windshield
        ctx.fillStyle = '#1a1a2e';
        ctx.beginPath();
        ctx.moveTo(-8, -10);
        ctx.lineTo(8, -10);
        ctx.lineTo(6, -25);
        ctx.lineTo(-6, -25);
        ctx.closePath();
        ctx.fill();
        
        // Headlights
        ctx.fillStyle = nitro ? '#ffffff' : '#ffffaa';
        ctx.beginPath();
        ctx.arc(-10, -35, 4, 0, Math.PI * 2);
        ctx.arc(10, -35, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Headlight glow
        if (nitro) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.beginPath();
            ctx.moveTo(-10, -35);
            ctx.lineTo(-20, -80);
            ctx.lineTo(0, -80);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(10, -35);
            ctx.lineTo(20, -80);
            ctx.lineTo(0, -80);
            ctx.closePath();
            ctx.fill();
        }
        
        // Taillights
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(-12, 35, 6, 3);
        ctx.fillRect(6, 35, 6, 3);
        
        // Nitro flames
        if (nitro) {
            ctx.fillStyle = '#00ffff';
            ctx.beginPath();
            ctx.moveTo(-8, 38);
            ctx.lineTo(-5, 55 + Math.random() * 10);
            ctx.lineTo(-2, 38);
            ctx.closePath();
            ctx.fill();
            
            ctx.beginPath();
            ctx.moveTo(2, 38);
            ctx.lineTo(5, 55 + Math.random() * 10);
            ctx.lineTo(8, 38);
            ctx.closePath();
            ctx.fill();
        }
        
        ctx.restore();
    },
    
    drawCompactCar(ctx, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.roundRect(-12, -35, 24, 70, 5);
        ctx.fill();
    },
    
    drawSportCar(ctx, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(-14, -35);
        ctx.lineTo(14, -35);
        ctx.lineTo(16, 35);
        ctx.lineTo(-16, 35);
        ctx.closePath();
        ctx.fill();
    },
    
    drawMuscleCar(ctx, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.roundRect(-16, -38, 32, 76, 4);
        ctx.fill();
        
        // Hood stripes
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(-4, -30, 8, 60);
    },
    
    drawSuperCar(ctx, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(-18, -30);
        ctx.lineTo(18, -30);
        ctx.lineTo(20, 0);
        ctx.lineTo(18, 40);
        ctx.lineTo(-18, 40);
        ctx.lineTo(-20, 0);
        ctx.closePath();
        ctx.fill();
    },
    
    drawHyperCar(ctx, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(-15, -40);
        ctx.lineTo(15, -40);
        ctx.lineTo(22, -10);
        ctx.lineTo(20, 40);
        ctx.lineTo(-20, 40);
        ctx.lineTo(-22, -10);
        ctx.closePath();
        ctx.fill();
        
        // Aerodynamic lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-10, -20);
        ctx.lineTo(-10, 30);
        ctx.moveTo(10, -20);
        ctx.lineTo(10, 30);
        ctx.stroke();
    },
    
    drawDefaultCar(ctx, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.roundRect(-14, -36, 28, 72, 6);
        ctx.fill();
    }
};
