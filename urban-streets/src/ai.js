// URBAN STREETS - AI System

const AISystem = {
    createAI(racer, track, difficultyMultiplier = 1) {
        const car = CarSystem.getCarById(racer.car);
        const stats = CarSystem.getCarStats(racer.car);
        
        return {
            id: racer.id,
            name: racer.name,
            carId: racer.car,
            x: track.checkpoints[0].x,
            y: track.checkpoints[0].y - (Math.random() * 60 - 30),
            angle: -Math.PI / 2,
            speed: 0,
            maxSpeed: stats.speed * difficultyMultiplier,
            acceleration: stats.acceleration * difficultyMultiplier,
            handling: stats.handling * difficultyMultiplier,
            braking: stats.braking * difficultyMultiplier,
            currentCheckpoint: 0,
            lap: 0,
            totalLaps: track.totalLaps,
            finished: false,
            finishTime: 0,
            nitro: 100,
            usingNitro: false,
            color: car.color,
            // AI behavior
            aggression: 0.5 + (racer.difficulty / 20),
            mistakeChance: Math.max(0.01, 0.1 - (racer.difficulty / 50)),
            corneringSkill: 0.7 + (racer.difficulty / 25)
        };
    },
    
    updateAI(ai, track, deltaTime, playerPos) {
        if (ai.finished) return;
        
        const targetCp = track.checkpoints[ai.currentCheckpoint];
        const dx = targetCp.x - ai.x;
        const dy = targetCp.y - ai.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const targetAngle = Math.atan2(dy, dx);
        
        // Smooth steering
        let angleDiff = targetAngle - ai.angle;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        
        ai.angle += angleDiff * ai.handling * 0.05 * deltaTime;
        
        // Speed control based on corner sharpness
        const cornerSharpness = Math.abs(angleDiff);
        const targetSpeed = ai.maxSpeed * (1 - cornerSharpness * ai.corneringSkill);
        
        // Accelerate or brake
        if (ai.speed < targetSpeed) {
            ai.speed += ai.acceleration * 0.01 * deltaTime;
        } else if (ai.speed > targetSpeed) {
            ai.speed -= ai.braking * 0.015 * deltaTime;
        }
        
        // Update position
        ai.x += Math.cos(ai.angle) * ai.speed * 0.1 * deltaTime;
        ai.y += Math.sin(ai.angle) * ai.speed * 0.1 * deltaTime;
        
        // Check checkpoint reached
        if (distance < targetCp.radius) {
            ai.currentCheckpoint = (ai.currentCheckpoint + 1) % track.checkpoints.length;
            if (ai.currentCheckpoint === 0) {
                ai.lap++;
                if (ai.lap >= ai.totalLaps) {
                    ai.finished = true;
                    ai.finishTime = Date.now();
                }
            }
        }
        
        // Occasional mistakes for lower difficulty AIs
        if (Math.random() < ai.mistakeChance * 0.001 * deltaTime) {
            ai.speed *= 0.7;
        }
        
        // Nitro usage for boss racers
        if (ai.nitro > 0 && Math.random() < 0.002 * deltaTime && ai.speed > ai.maxSpeed * 0.8) {
            ai.usingNitro = true;
            ai.speed *= 1.1;
            ai.nitro -= 0.5;
        } else {
            ai.usingNitro = false;
            if (ai.nitro < 100) ai.nitro += 0.1;
        }
    },
    
    getPosition(ai, allRacers) {
        let position = 1;
        for (const other of allRacers) {
            if (other === ai) continue;
            if (other.lap > ai.lap) position++;
            else if (other.lap === ai.lap && other.currentCheckpoint > ai.currentCheckpoint) position++;
        }
        return position;
    }
};
