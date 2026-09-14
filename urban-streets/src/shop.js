// URBAN STREETS - Shop System

const ShopSystem = {
    init() {
        this.renderCars();
        document.getElementById('shop-money').textContent = Player.getMoney().toLocaleString();
    },
    
    renderCars() {
        const container = document.getElementById('shop-car-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        for (const car of GAME_DATA.cars) {
            const owned = Player.ownsCar(car.id);
            const equipped = Player.getCurrentCar() === car.id;
            
            const item = document.createElement('div');
            item.className = 'shop-car-item';
            
            let html = `
                <h3>${car.name}</h3>
                <div class="shop-car-stats">
                    Speed: ${car.stats.speed} | Accel: ${car.stats.acceluation}<br>
                    Handling: ${car.stats.handling} | Nitro: ${car.stats.nitro}
                </div>
                <div class="shop-car-price">${owned ? 'OWNED' : '$' + car.price.toLocaleString()}</div>
            `;
            
            if (equipped) {
                html += `<button disabled>EQUIPPED</button>`;
            } else if (owned) {
                html += `<button onclick="ShopSystem.equipCar('${car.id}')">EQUIP</button>`;
            } else {
                const canAfford = Player.getMoney() >= car.price;
                html += `<button ${!canAfford ? 'disabled' : ''} onclick="ShopSystem.buyCar('${car.id}')">BUY</button>`;
            }
            
            item.innerHTML = html;
            container.appendChild(item);
        }
    },
    
    buyCar(carId) {
        const car = CarSystem.getCarById(carId);
        if (!car) return;
        
        if (Player.getMoney() >= car.price) {
            if (Player.spendMoney(car.price)) {
                Player.addCar(carId);
                AudioSystem.playBuy();
                this.renderCars();
                document.getElementById('shop-money').textContent = Player.getMoney().toLocaleString();
                Player.save();
            }
        } else {
            AudioSystem.playError();
        }
    },
    
    equipCar(carId) {
        if (Player.setCurrentCar(carId)) {
            AudioSystem.playMenuClick();
            this.renderCars();
            Player.save();
        }
    }
};
