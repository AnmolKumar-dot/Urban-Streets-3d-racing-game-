// URBAN STREETS - Player System

const Player = {
    data: null,
    
    init(saveData = null) {
        if (saveData) {
            this.data = saveData;
        } else {
            this.data = SaveSystem.createNewSave();
        }
        return this.data;
    },
    
    getMoney() {
        return this.data.money;
    },
    
    addMoney(amount) {
        this.data.money += amount;
        this.data.totalEarnings += amount;
        this.save();
    },
    
    spendMoney(amount) {
        if (this.data.money >= amount) {
            this.data.money -= amount;
            this.save();
            return true;
        }
        return false;
    },
    
    getXp() {
        return this.data.xp;
    },
    
    addXp(amount) {
        this.data.xp += amount;
        // Level up calculation
        const xpForNextLevel = this.data.level * 1000;
        if (this.data.xp >= xpForNextLevel) {
            this.data.xp -= xpForNextLevel;
            this.data.level++;
            return true; // Leveled up
        }
        this.save();
        return false;
    },
    
    getLevel() {
        return this.data.level;
    },
    
    ownsCar(carId) {
        return this.data.ownedCars.includes(carId);
    },
    
    addCar(carId) {
        if (!this.data.ownedCars.includes(carId)) {
            this.data.ownedCars.push(carId);
            this.save();
            return true;
        }
        return false;
    },
    
    getCurrentCar() {
        return this.data.currentCar;
    },
    
    setCurrentCar(carId) {
        if (this.ownsCar(carId)) {
            this.data.currentCar = carId;
            this.save();
            return true;
        }
        return false;
    },
    
    getOwnedCars() {
        return this.data.ownedCars;
    },
    
    getCarUpgrades(carId) {
        if (!this.data.carUpgrades[carId]) {
            this.data.carUpgrades[carId] = {
                engine: 0,
                transmission: 0,
                tires: 0,
                brakes: 0,
                nitro: 0,
                ecu: 0
            };
        }
        return this.data.carUpgrades[carId];
    },
    
    upgradeCar(carId, upgradeType) {
        const upgrades = this.getCarUpgrades(carId);
        const maxLevel = 5;
        
        if (upgrades[upgradeType] < maxLevel) {
            upgrades[upgradeType]++;
            this.save();
            return true;
        }
        return false;
    },
    
    getUpgradeLevel(carId, upgradeType) {
        const upgrades = this.getCarUpgrades(carId);
        return upgrades[upgradeType] || 0;
    },
    
    isRaceCompleted(raceId) {
        return this.data.completedRaces.includes(raceId);
    },
    
    completeRace(raceId) {
        if (!this.data.completedRaces.includes(raceId)) {
            this.data.completedRaces.push(raceId);
            this.save();
            return true;
        }
        return false;
    },
    
    isRacerDefeated(racerId) {
        return this.data.defeatedRacers.includes(racerId);
    },
    
    defeatRacer(racerId) {
        if (!this.data.defeatedRacers.includes(racerId)) {
            this.data.defeatedRacers.push(racerId);
            this.save();
            return true;
        }
        return false;
    },
    
    canChallengeRacer(racer) {
        // Check if already defeated
        if (this.isRacerDefeated(racer.id)) {
            return false;
        }
        
        // Check unlock requirements
        if (racer.unlockAfter) {
            if (!this.isRacerDefeated(racer.unlockAfter)) {
                return false;
            }
        }
        
        // Check gang progression for final bosses
        if (racer.requiresAllGangs) {
            if (!this.data.finalBossUnlocked) {
                return false;
            }
        }
        
        return true;
    },
    
    updateGangProgress(gangId, progress) {
        this.data.gangProgress[gangId] = progress;
        
        // Unlock next gang if all racers completed
        if (gangId === 'street_phantoms' && progress >= 12) {
            this.data.gangProgress['iron_vipers'] = 0;
        }
        if (gangId === 'iron_vipers' && progress >= 12) {
            this.data.gangProgress['night_reapers'] = 0;
        }
        if (gangId === 'night_reapers' && progress >= 12) {
            this.data.finalBossUnlocked = true;
        }
        
        this.save();
    },
    
    getGangProgress(gangId) {
        return this.data.gangProgress[gangId] || -1;
    },
    
    isFinalBossUnlocked() {
        return this.data.finalBossUnlocked;
    },
    
    getSettings() {
        return this.data.settings;
    },
    
    updateSettings(newSettings) {
        this.data.settings = { ...this.data.settings, ...newSettings };
        this.save();
    },
    
    save() {
        SaveSystem.save(this.data);
    },
    
    getData() {
        return this.data;
    }
};
