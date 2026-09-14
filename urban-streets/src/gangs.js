// URBAN STREETS - Gangs System

const GangSystem = {
    renderMap() {
        this.renderGangRaces('gang1-races', 'street_phantoms');
        this.renderGangRaces('gang2-races', 'iron_vipers');
        this.renderGangRaces('gang3-races', 'night_reapers');
        this.renderGangRaces('final-races', 'final');
    },
    
    renderGangRaces(containerId, gangId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '';
        
        const gangRacers = GAME_DATA.racers.filter(r => r.gang === gangId);
        
        for (const racer of gangRacers) {
            const node = document.createElement('div');
            node.className = 'race-node';
            
            const defeated = Player.isRacerDefeated(racer.id);
            const canChallenge = Player.canChallengeRacer(racer);
            
            if (defeated) {
                node.classList.add('completed');
                node.textContent = '✓';
            } else if (canChallenge) {
                node.textContent = racer.isBoss ? '👑' : '○';
                node.onclick = () => {
                    if (racer.isBoss) {
                        UISystem.showBossIntro(racer);
                    } else {
                        UISystem.showDialogue(racer);
                    }
                };
            } else {
                node.classList.add('locked');
                node.textContent = '🔒';
            }
            
            if (racer.isBoss) {
                node.classList.add('boss');
            }
            
            container.appendChild(node);
        }
    },
    
    getGangById(gangId) {
        return GAME_DATA.gangs.find(g => g.id === gangId);
    },
    
    getAllGangs() {
        return GAME_DATA.gangs;
    },
    
    getProgress(gangId) {
        const racers = GAME_DATA.racers.filter(r => r.gang === gangId);
        const defeated = racers.filter(r => Player.isRacerDefeated(r.id));
        return {
            total: racers.length,
            completed: defeated.length,
            percentage: Math.round((defeated.length / racers.length) * 100)
        };
    },
    
    isGangComplete(gangId) {
        const progress = this.getProgress(gangId);
        return progress.completed >= progress.total;
    },
    
    areAllGangsComplete() {
        const gangs = ['street_phantoms', 'iron_vipers', 'night_reapers'];
        return gangs.every(g => this.isGangComplete(g));
    }
};
