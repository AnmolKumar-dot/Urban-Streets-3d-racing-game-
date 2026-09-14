// URBAN STREETS - Save System

const SaveSystem = {
    SAVE_KEY: 'urban_streets_save',
    
    createNewSave() {
        return {
            money: 5000,
            xp: 0,
            level: 1,
            completedRaces: [],
            defeatedRacers: [],
            defeatedBosses: [],
            ownedCars: ['street_fox'],
            currentCar: 'street_fox',
            carUpgrades: {}, // { carId: { engine: 0, transmission: 0, ... } }
            gangProgress: {
                street_phantoms: 0,
                iron_vipers: -1, // Locked
                night_reapers: -1 // Locked
            },
            finalBossUnlocked: false,
            totalEarnings: 5000,
            playTime: 0,
            settings: {
                quality: 'medium',
                effects: true,
                particles: true,
                masterVolume: 80,
                musicVolume: 60,
                sfxVolume: 80,
                touchControls: true
            }
        };
    },
    
    save(gameData) {
        try {
            localStorage.setItem(this.SAVE_KEY, JSON.stringify(gameData));
            return true;
        } catch (e) {
            console.error('Save failed:', e);
            return false;
        }
    },
    
    load() {
        try {
            const saved = localStorage.getItem(this.SAVE_KEY);
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (e) {
            console.error('Load failed:', e);
        }
        return null;
    },
    
    hasSave() {
        return localStorage.getItem(this.SAVE_KEY) !== null;
    },
    
    delete() {
        localStorage.removeItem(this.SAVE_KEY);
    }
};
