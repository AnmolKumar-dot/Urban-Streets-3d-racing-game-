// URBAN STREETS - Tracks System

const TrackSystem = {
    tracks: {},
    
    generateTrack(theme, trackId) {
        const track = {
            id: trackId || `track_${Date.now()}`,
            theme: theme,
            checkpoints: [],
            startLine: { x: 0, y: 0 },
            finishLine: { x: 0, y: 0 },
            lapDistance: 0,
            totalLaps: 2,
            bounds: { minX: -500, maxX: 500, minY: -500, maxY: 500 }
        };
        
        // Generate track based on theme
        switch (theme) {
            case 'downtown_night':
                this.generateDowntownTrack(track);
                break;
            case 'industrial':
                this.generateIndustrialTrack(track);
                break;
            case 'harbor':
                this.generateHarborTrack(track);
                break;
            case 'tunnel':
                this.generateTunnelTrack(track);
                break;
            case 'mountain':
                this.generateMountainTrack(track);
                break;
            case 'highway':
                this.generateHighwayTrack(track);
                break;
            case 'rain_district':
                this.generateRainDistrictTrack(track);
                break;
            case 'night_market':
                this.generateNightMarketTrack(track);
                break;
            default:
                this.generateDefaultTrack(track);
        }
        
        return track;
    },
    
    generateDowntownTrack(track) {
        // Tight corners, tall buildings
        track.checkpoints = [
            { x: 0, y: 0, radius: 60 },
            { x: 200, y: 0, radius: 50 },
            { x: 300, y: 150, radius: 50 },
            { x: 200, y: 300, radius: 50 },
            { x: 0, y: 300, radius: 50 },
            { x: -150, y: 200, radius: 50 },
            { x: -200, y: 50, radius: 50 },
            { x: -100, y: -100, radius: 50 },
            { x: 0, y: -150, radius: 50 }
        ];
        track.totalLaps = 3;
        track.themeColor = '#aa00ff';
    },
    
    generateIndustrialTrack(track) {
        // Wide roads, warehouses
        track.checkpoints = [
            { x: 0, y: 0, radius: 70 },
            { x: 300, y: 0, radius: 60 },
            { x: 400, y: 200, radius: 60 },
            { x: 400, y: 400, radius: 60 },
            { x: 100, y: 400, radius: 60 },
            { x: -100, y: 200, radius: 60 },
            { x: -200, y: 0, radius: 60 },
            { x: -100, y: -150, radius: 60 }
        ];
        track.totalLaps = 2;
        track.themeColor = '#ff6600';
    },
    
    generateHarborTrack(track) {
        // Water nearby, cranes
        track.checkpoints = [
            { x: 0, y: 0, radius: 60 },
            { x: 250, y: 50, radius: 50 },
            { x: 350, y: 200, radius: 50 },
            { x: 250, y: 350, radius: 50 },
            { x: 50, y: 350, radius: 50 },
            { x: -100, y: 200, radius: 50 },
            { x: -150, y: 50, radius: 50 },
            { x: -50, y: -100, radius: 50 }
        ];
        track.totalLaps = 3;
        track.themeColor = '#0088ff';
    },
    
    generateTunnelTrack(track) {
        // Long straights, neon lighting
        track.checkpoints = [
            { x: 0, y: 0, radius: 50 },
            { x: 400, y: 0, radius: 50 },
            { x: 500, y: 150, radius: 50 },
            { x: 400, y: 300, radius: 50 },
            { x: 0, y: 300, radius: 50 },
            { x: -100, y: 150, radius: 50 },
            { x: -200, y: 0, radius: 50 }
        ];
        track.totalLaps = 2;
        track.themeColor = '#00ff88';
    },
    
    generateMountainTrack(track) {
        // Curving roads, elevation
        track.checkpoints = [
            { x: 0, y: 0, radius: 55 },
            { x: 150, y: 100, radius: 50 },
            { x: 250, y: 250, radius: 50 },
            { x: 150, y: 400, radius: 50 },
            { x: 0, y: 450, radius: 50 },
            { x: -150, y: 350, radius: 50 },
            { x: -250, y: 200, radius: 50 },
            { x: -200, y: 50, radius: 50 },
            { x: -100, y: -50, radius: 50 }
        ];
        track.totalLaps = 3;
        track.themeColor = '#88aa00';
    },
    
    generateHighwayTrack(track) {
        // High speed, multiple lanes
        track.checkpoints = [
            { x: 0, y: 0, radius: 80 },
            { x: 500, y: 0, radius: 70 },
            { x: 600, y: 200, radius: 70 },
            { x: 500, y: 400, radius: 70 },
            { x: 0, y: 400, radius: 70 },
            { x: -200, y: 200, radius: 70 },
            { x: -300, y: 0, radius: 70 }
        ];
        track.totalLaps = 2;
        track.themeColor = '#ffff00';
    },
    
    generateRainDistrictTrack(track) {
        // Wet roads, reflections
        track.checkpoints = [
            { x: 0, y: 0, radius: 55 },
            { x: 200, y: 50, radius: 50 },
            { x: 300, y: 200, radius: 50 },
            { x: 200, y: 350, radius: 50 },
            { x: 0, y: 350, radius: 50 },
            { x: -200, y: 250, radius: 50 },
            { x: -300, y: 100, radius: 50 },
            { x: -150, y: -50, radius: 50 }
        ];
        track.totalLaps = 3;
        track.themeColor = '#4466aa';
    },
    
    generateNightMarketTrack(track) {
        // Dense urban, neon storefronts
        track.checkpoints = [
            { x: 0, y: 0, radius: 45 },
            { x: 150, y: 0, radius: 40 },
            { x: 200, y: 100, radius: 40 },
            { x: 150, y: 200, radius: 40 },
            { x: 50, y: 200, radius: 40 },
            { x: 0, y: 100, radius: 40 },
            { x: -100, y: 50, radius: 40 },
            { x: -150, y: 150, radius: 40 },
            { x: -100, y: 250, radius: 40 },
            { x: 0, y: 300, radius: 40 },
            { x: 100, y: 250, radius: 40 },
            { x: 150, y: 350, radius: 40 }
        ];
        track.totalLaps = 2;
        track.themeColor = '#ff00ff';
    },
    
    generateDefaultTrack(track) {
        track.checkpoints = [
            { x: 0, y: 0, radius: 60 },
            { x: 200, y: 0, radius: 50 },
            { x: 300, y: 150, radius: 50 },
            { x: 200, y: 300, radius: 50 },
            { x: 0, y: 300, radius: 50 },
            { x: -150, y: 150, radius: 50 }
        ];
        track.totalLaps = 3;
        track.themeColor = '#ffffff';
    },
    
    getTrackForRacer(racer) {
        const themeIndex = GAME_DATA.racers.indexOf(racer) % GAME_DATA.trackThemes.length;
        const theme = GAME_DATA.trackThemes[themeIndex];
        return this.generateTrack(theme, racer.id);
    },
    
    isPointOnTrack(x, y, track) {
        // Check if point is within any checkpoint radius
        for (const checkpoint of track.checkpoints) {
            const dx = x - checkpoint.x;
            const dy = y - checkpoint.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < checkpoint.radius * 1.5) {
                return true;
            }
        }
        return false;
    },
    
    getNextCheckpointIndex(currentIndex, track) {
        return (currentIndex + 1) % track.checkpoints.length;
    },
    
    reachedCheckpoint(car, checkpointIndex, track) {
        const checkpoint = track.checkpoints[checkpointIndex];
        const dx = car.x - checkpoint.x;
        const dy = car.y - checkpoint.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < checkpoint.radius;
    },
    
    drawTrack(ctx, track, cameraX, cameraY, zoom) {
        ctx.save();
        ctx.translate(-cameraX, -cameraY);
        ctx.scale(zoom, zoom);
        
        // Draw road surface
        ctx.fillStyle = '#1a1a1a';
        ctx.beginPath();
        if (track.checkpoints.length > 0) {
            ctx.moveTo(track.checkpoints[0].x, track.checkpoints[0].y);
            for (let i = 1; i < track.checkpoints.length; i++) {
                const cp = track.checkpoints[i];
                ctx.lineTo(cp.x, cp.y);
            }
            ctx.closePath();
        }
        ctx.lineWidth = 80;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
        
        // Draw road edges
        ctx.strokeStyle = track.themeColor || '#ffffff';
        ctx.lineWidth = 2;
        ctx.setLineDash([10, 10]);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Draw checkpoints (subtle)
        for (let i = 0; i < track.checkpoints.length; i++) {
            const cp = track.checkpoints[i];
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.beginPath();
            ctx.arc(cp.x, cp.y, cp.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Checkpoint number
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.font = 'bold 20px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(i + 1, cp.x, cp.y);
        }
        
        // Draw start/finish line
        const startCp = track.checkpoints[0];
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(startCp.x - 40, startCp.y - 5, 80, 10);
        
        // Checker pattern
        ctx.fillStyle = '#000000';
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 2; j++) {
                if ((i + j) % 2 === 0) {
                    ctx.fillRect(startCp.x - 40 + i * 10, startCp.y - 5 + j * 5, 10, 5);
                }
            }
        }
        
        ctx.restore();
    },
    
    getTrackBounds(track) {
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        for (const cp of track.checkpoints) {
            minX = Math.min(minX, cp.x - cp.radius);
            maxX = Math.max(maxX, cp.x + cp.radius);
            minY = Math.min(minY, cp.y - cp.radius);
            maxY = Math.max(maxY, cp.y + cp.radius);
        }
        return { minX, maxX, minY, maxY };
    }
};
