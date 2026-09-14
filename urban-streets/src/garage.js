// URBAN STREETS - Garage System

const GarageSystem = {
    currentIndex: 0,
    
    init() {
        this.currentIndex = 0;
        this.renderCar();
        this.setupButtons();
    },
    
    setupButtons() {
        document.getElementById('btn-prev-car').onclick = () => this.prevCar();
        document.getElementById('btn-next-car').onclick = () => this.nextCar();
        document.getElementById('btn-equip-car').onclick = () => this.equipCar();
        document.getElementById('btn-buy-car').onclick = () => this.buyCar();
        
        // Upgrade buttons
        document.querySelectorAll('.upgrade-btn').forEach(btn => {
            btn.onclick = () => this.upgradePart(btn.dataset.upgrade);
        });
    },
    
    getSelectedCar() {
        const ownedCars = Player.getOwnedCars();
        return GAME_DATA.cars.find(c => c.id === ownedCars[this.currentIndex]);
    },
    
    renderCar() {
        const ownedCars = Player.getOwnedCars();
        if (ownedCars.length === 0) return;
        
        const car = this.getSelectedCar();
        if (!car) return;
        
        // Update index display
        document.getElementById('car-selector-index').textContent = `${this.currentIndex + 1} / ${ownedCars.length}`;
        
        // Car info
        document.getElementById('garage-car-name').textContent = car.name;
        const owned = Player.ownsCar(car.id);
        const equipped = Player.getCurrentCar() === car.id;
        
        document.getElementById('garage-car-price').textContent = owned ? '' : `$${car.price.toLocaleString()}`;
        document.getElementById('garage-car-owned').textContent = equipped ? 'EQUIPPED' : (owned ? 'OWNED' : '');
        
        // Draw car preview
        this.drawCarPreview(car);
        
        // Stats
        const stats = CarSystem.calculateEffectiveStats(car.id);
        this.updateStatBar('stat-speed', stats.speed, 300);
        this.updateStatBar('stat-acceleration', stats.acceleration, 100);
        this.updateStatBar('stat-handling', stats.handling, 100);
        this.updateStatBar('stat-braking', stats.braking, 100);
        this.updateStatBar('stat-nitro', stats.nitro, 100);
        
        // Upgrades
        this.renderUpgrades(car.id);
        
        // Button states
        const equipBtn = document.getElementById('btn-equip-car');
        const buyBtn = document.getElementById('btn-buy-car');
        
        if (equipped) {
            equipBtn.disabled = true;
            equipBtn.textContent = 'EQUIPPED';
            buyBtn.style.display = 'none';
        } else if (owned) {
            equipBtn.disabled = false;
            equipBtn.textContent = 'EQUIP';
            buyBtn.style.display = 'none';
        } else {
            equipBtn.disabled = true;
            equipBtn.textContent = 'NOT OWNED';
            buyBtn.style.display = 'block';
            buyBtn.textContent = `BUY $${car.price.toLocaleString()}`;
        }
    },
    
    drawCarPreview(car) {
        const canvas = document.getElementById('garage-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        ctx.fillStyle = '#0a0a0f';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Draw grid
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.width; i += 30) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
        }
        for (let i = 0; i < canvas.height; i += 30) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx.stroke();
        }
        
        // Draw car
        CarSystem.drawCar(ctx, centerX, centerY, car.id, { scale: 2, rotation: -0.3 });
    },
    
    updateStatBar(id, value, max) {
        const bar = document.getElementById(id);
        const percentage = Math.min(100, (value / max) * 100);
        bar.style.width = `${percentage}%`;
    },
    
    renderUpgrades(carId) {
        const upgrades = Player.getCarUpgrades(carId);
        const maxLevel = CarSystem.getMaxUpgradeLevel();
        
        for (const [type, level] of Object.entries(upgrades)) {
            const lvlEl = document.getElementById(`upgrade-${type}-lvl`);
            const costEl = document.getElementById(`upgrade-${type}-cost`);
            const btn = document.querySelector(`[data-upgrade="${type}"]`);
            
            if (lvlEl) lvlEl.textContent = `LV.${level}/${maxLevel}`;
            
            if (costEl && btn) {
                if (level >= maxLevel) {
                    costEl.textContent = 'MAX';
                    btn.disabled = true;
                    btn.textContent = 'MAXED';
                } else {
                    const cost = CarSystem.getUpgradeCost(type, level);
                    costEl.textContent = `$${cost.toLocaleString()}`;
                    btn.disabled = Player.getMoney() < cost;
                    btn.textContent = 'UPGRADE';
                }
            }
        }
    },
    
    prevCar() {
        const ownedCars = Player.getOwnedCars();
        this.currentIndex = (this.currentIndex - 1 + ownedCars.length) % ownedCars.length;
        this.renderCar();
        AudioSystem.playMenuClick();
    },
    
    nextCar() {
        const ownedCars = Player.getOwnedCars();
        this.currentIndex = (this.currentIndex + 1) % ownedCars.length;
        this.renderCar();
        AudioSystem.playMenuClick();
    },
    
    equipCar() {
        const car = this.getSelectedCar();
        if (car && Player.setCurrentCar(car.id)) {
            AudioSystem.playMenuClick();
            this.renderCar();
            Player.save();
        }
    },
    
    buyCar() {
        const car = this.getSelectedCar();
        if (car && Player.getMoney() >= car.price) {
            if (Player.spendMoney(car.price)) {
                Player.addCar(car.id);
                AudioSystem.playBuy();
                this.renderCar();
                Player.save();
            }
        } else {
            AudioSystem.playError();
        }
    },
    
    upgradePart(type) {
        const car = this.getSelectedCar();
        if (!car) return;
        
        const currentLevel = Player.getUpgradeLevel(car.id, type);
        const cost = CarSystem.getUpgradeCost(type, currentLevel);
        
        if (currentLevel >= 5) return;
        
        if (Player.getMoney() >= cost) {
            if (Player.spendMoney(cost)) {
                Player.upgradeCar(car.id, type);
                AudioSystem.playBuy();
                this.renderCar();
                Player.save();
            }
        } else {
            AudioSystem.playError();
        }
    }
};
