// URBAN STREETS - UI System

const UISystem = {
    currentDialogueRacer: null,
    
    init() {
        this.setupEventListeners();
    },
    
    setupEventListeners() {
        // Main menu buttons
        document.getElementById('btn-continue').addEventListener('click', () => this.continueGame());
        document.getElementById('btn-new-game').addEventListener('click', () => this.newGame());
        document.getElementById('btn-garage-menu').addEventListener('click', () => this.showGarage());
        document.getElementById('btn-map-menu').addEventListener('click', () => this.showMap());
        document.getElementById('btn-shop-menu').addEventListener('click', () => this.showShop());
        document.getElementById('btn-settings-menu').addEventListener('click', () => this.showSettings());
        document.getElementById('btn-credits-menu').addEventListener('click', () => this.showCredits());
        
        // Dialogue buttons
        document.getElementById('btn-race-challenge').addEventListener('click', () => this.startRaceChallenge());
        document.getElementById('btn-dialogue-cancel').addEventListener('click', () => this.closeDialogue());
        
        // Results screen
        document.getElementById('btn-continue-results').addEventListener('click', () => this.continueFromResults());
        
        // Race pause menu
        document.getElementById('btn-resume-race').addEventListener('click', () => RacingSystem.resume());
        document.getElementById('btn-restart-race').addEventListener('click', () => this.restartRace());
        document.getElementById('btn-quit-race').addEventListener('click', () => RacingSystem.quitRace());
        
        // City buttons
        document.getElementById('btn-city-garage').addEventListener('click', () => this.showGarage());
        document.getElementById('btn-city-shop').addEventListener('click', () => this.showShop());
        document.getElementById('btn-city-map').addEventListener('click', () => this.showMap());
        document.getElementById('btn-city-menu').addEventListener('click', () => this.showMainMenu());
        
        // Back buttons
        document.getElementById('btn-back-garage').addEventListener('click', () => this.showMainMenu());
        document.getElementById('btn-back-shop').addEventListener('click', () => this.showMainMenu());
        document.getElementById('btn-back-map').addEventListener('click', () => this.showMainMenu());
        document.getElementById('btn-back-settings').addEventListener('click', () => this.showMainMenu());
        document.getElementById('btn-back-credits').addEventListener('click', () => this.showMainMenu());
        document.getElementById('btn-close-upgrades').addEventListener('click', () => {
            document.getElementById('upgrades-panel').classList.add('hidden');
        });
        
        // Settings
        document.getElementById('btn-save-settings').addEventListener('click', () => this.saveSettings());
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
    },
    
    handleKeyDown(e) {
        if (document.getElementById('race-screen').classList.contains('active')) {
            RacingSystem.setControl(e.key.toLowerCase(), true);
            if (e.key === 'Escape') RacingSystem.pause();
        } else if (document.getElementById('city-screen').classList.contains('active')) {
            CitySystem.setControls({
                up: e.key === 'w' || e.key === 'ArrowUp',
                down: e.key === 's' || e.key === 'ArrowDown',
                left: e.key === 'a' || e.key === 'ArrowLeft',
                right: e.key === 'd' || e.key === 'ArrowRight'
            });
            if (e.key === 'e' || e.key === 'E') CitySystem.interactWithRacer();
        }
    },
    
    handleKeyUp(e) {
        if (document.getElementById('race-screen').classList.contains('active')) {
            RacingSystem.setControl(e.key.toLowerCase(), false);
        } else if (document.getElementById('city-screen').classList.contains('active')) {
            CitySystem.setControls({
                up: false, down: false, left: false, right: false
            });
        }
    },
    
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const screen = document.getElementById(screenId);
        if (screen) screen.classList.add('active');
    },
    
    continueGame() {
        if (SaveSystem.hasSave()) {
            const saveData = SaveSystem.load();
            Player.init(saveData);
            AudioSystem.resume();
            this.showCity();
        }
    },
    
    newGame() {
        if (confirm('Start a new game? This will overwrite your current progress.')) {
            Player.init(null);
            Player.save();
            AudioSystem.resume();
            this.showCity();
        }
    },
    
    showCity() {
        this.showScreen('city-screen');
        CitySystem.init();
    },
    
    showMainMenu() {
        this.showScreen('main-menu');
        const hasSave = SaveSystem.hasSave();
        document.getElementById('btn-continue').disabled = !hasSave;
        document.getElementById('btn-continue').style.opacity = hasSave ? '1' : '0.5';
    },
    
    showDialogue(racer) {
        this.currentDialogueRacer = racer;
        this.showScreen('dialogue-screen');
        
        document.getElementById('dialogue-racer-name').textContent = racer.name;
        document.getElementById('dialogue-racer-title').textContent = racer.title;
        document.getElementById('dialogue-difficulty').textContent = '★'.repeat(racer.difficulty) + '☆'.repeat(5 - racer.difficulty);
        document.getElementById('dialogue-reward').textContent = `$${racer.reward.toLocaleString()}`;
        
        // Show first dialogue line
        const dialogueIndex = 0;
        document.getElementById('dialogue-text').textContent = racer.dialogue[dialogueIndex];
        
        // Cycle through dialogue on click
        let diagIdx = 0;
        document.getElementById('dialogue-text').onclick = () => {
            diagIdx = (diagIdx + 1) % racer.dialogue.length;
            document.getElementById('dialogue-text').textContent = racer.dialogue[diagIdx];
        };
        
        AudioSystem.playMenuClick();
    },
    
    closeDialogue() {
        this.showScreen('city-screen');
        AudioSystem.playMenuClick();
    },
    
    startRaceChallenge() {
        if (this.currentDialogueRacer) {
            this.closeDialogue();
            
            // Show transition
            this.showScreen('transition-screen');
            
            setTimeout(() => {
                RacingSystem.currentRacer = this.currentDialogueRacer;
                this.showScreen('race-screen');
                RacingSystem.startRace(this.currentDialogueRacer);
            }, 1500);
            
            AudioSystem.playMenuClick();
        }
    },
    
    restartRace() {
        RacingSystem.isRacing = false;
        RacingSystem.startRace(RacingSystem.currentRacer);
        document.getElementById('race-pause-menu').classList.add('hidden');
    },
    
    continueFromResults() {
        this.showScreen('city-screen');
        CitySystem.init();
        AudioSystem.playMenuClick();
    },
    
    showGarage() {
        GarageSystem.init();
        this.showScreen('garage-screen');
        AudioSystem.playMenuClick();
    },
    
    showShop() {
        ShopSystem.init();
        this.showScreen('shop-screen');
        AudioSystem.playMenuClick();
    },
    
    showMap() {
        GangSystem.renderMap();
        this.showScreen('map-screen');
        AudioSystem.playMenuClick();
    },
    
    showSettings() {
        SettingsSystem.loadSettings();
        this.showScreen('settings-screen');
        AudioSystem.playMenuClick();
    },
    
    showCredits() {
        this.showScreen('credits-screen');
        AudioSystem.playMenuClick();
    },
    
    saveSettings() {
        SettingsSystem.saveSettings();
        this.showMainMenu();
        AudioSystem.playMenuClick();
    },
    
    showBossIntro(boss) {
        this.showScreen('boss-intro-screen');
        document.getElementById('boss-name').textContent = boss.name;
        document.getElementById('boss-subtitle').textContent = boss.title;
        document.getElementById('boss-quote').textContent = boss.dialogue[0];
        
        RacingSystem.currentRacer = boss;
        document.getElementById('btn-boss-race').onclick = () => {
            this.showScreen('transition-screen');
            setTimeout(() => {
                this.showScreen('race-screen');
                RacingSystem.startRace(boss);
            }, 1500);
        };
        
        AudioSystem.playMenuClick();
    },
    
    showVictory() {
        this.showScreen('victory-screen');
        document.getElementById('victory-earnings').textContent = `$${Player.getData().totalEarnings.toLocaleString()}`;
        AudioSystem.playVictory();
    }
};
