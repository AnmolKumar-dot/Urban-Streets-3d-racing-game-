// URBAN STREETS - Game Data

const GAME_DATA = {
    // Gangs
    gangs: [
        {
            id: "street_phantoms",
            name: "STREET PHANTOMS",
            color: "#aa00ff",
            description: "Beginner and intermediate street racers",
            style: "Neon purple and blue visual identity"
        },
        {
            id: "iron_vipers",
            name: "IRON VIPERS",
            color: "#ff4400",
            description: "Aggressive racers from industrial areas",
            style: "Red and orange visual identity"
        },
        {
            id: "night_reapers",
            name: "NIGHT REAPERS",
            color: "#00ff88",
            description: "Elite racers with high-performance vehicles",
            style: "Dark, futuristic city environments"
        }
    ],

    // Cars
    cars: [
        {
            id: "street_fox",
            name: "Street Fox",
            tier: 1,
            price: 0,
            stats: {
                speed: 120,
                acceleration: 55,
                handling: 60,
                braking: 58,
                nitro: 50
            },
            color: "#4488ff",
            shape: "compact"
        },
        {
            id: "neon_streak",
            name: "Neon Streak",
            tier: 2,
            price: 12000,
            stats: {
                speed: 145,
                acceleration: 65,
                handling: 65,
                braking: 62,
                nitro: 58
            },
            color: "#ff00ff",
            shape: "sport"
        },
        {
            id: "night_runner",
            name: "Night Runner",
            tier: 2,
            price: 15000,
            stats: {
                speed: 155,
                acceleration: 70,
                handling: 68,
                braking: 65,
                nitro: 62
            },
            color: "#00ffff",
            shape: "sport"
        },
        {
            id: "shadow_blade",
            name: "Shadow Blade",
            tier: 3,
            price: 25000,
            stats: {
                speed: 175,
                acceleration: 75,
                handling: 72,
                braking: 70,
                nitro: 68
            },
            color: "#222222",
            shape: "muscle"
        },
        {
            id: "vortex_r",
            name: "Vortex R",
            tier: 3,
            price: 35000,
            stats: {
                speed: 190,
                acceleration: 82,
                handling: 76,
                braking: 75,
                nitro: 72
            },
            color: "#ff6600",
            shape: "super"
        },
        {
            id: "midnight_gt",
            name: "Midnight GT",
            tier: 4,
            price: 50000,
            stats: {
                speed: 205,
                acceleration: 85,
                handling: 80,
                braking: 78,
                nitro: 75
            },
            color: "#4400ff",
            shape: "super"
        },
        {
            id: "nightfall_gt",
            name: "Nightfall GT",
            tier: 4,
            price: 70000,
            stats: {
                speed: 225,
                acceleration: 90,
                handling: 85,
                braking: 82,
                nitro: 80
            },
            color: "#001133",
            shape: "hyper"
        },
        {
            id: "phantom_x",
            name: "Phantom X",
            tier: 4,
            price: 85000,
            stats: {
                speed: 240,
                acceleration: 92,
                handling: 88,
                braking: 85,
                nitro: 85
            },
            color: "#8800ff",
            shape: "hyper"
        },
        {
            id: "titan_ss",
            name: "Titan SS",
            tier: 5,
            price: 120000,
            stats: {
                speed: 250,
                acceleration: 94,
                handling: 90,
                braking: 88,
                nitro: 88
            },
            color: "#ff0044",
            shape: "hyper"
        },
        {
            id: "urban_titan",
            name: "Urban Titan",
            tier: 5,
            price: 150000,
            stats: {
                speed: 260,
                acceleration: 96,
                handling: 92,
                braking: 90,
                nitro: 92
            },
            color: "#ffffff",
            shape: "ultimate"
        }
    ],

    // Upgrade costs per level
    upgradeCosts: {
        engine: [5000, 8000, 12000, 18000, 25000],
        transmission: [4000, 7000, 10000, 15000, 22000],
        tires: [3500, 6000, 9000, 13000, 18000],
        brakes: [3000, 5000, 8000, 12000, 17000],
        nitro: [6000, 9000, 13000, 18000, 25000],
        ecu: [7000, 11000, 16000, 22000, 30000]
    },

    // Upgrade benefits per level
    upgradeBenefits: {
        engine: { speed: 8, acceleration: 5 },
        transmission: { acceleration: 4 },
        tires: { handling: 5, braking: 2 },
        brakes: { braking: 5 },
        nitro: { nitro: 8 },
        ecu: { speed: 3, acceleration: 2, handling: 2, braking: 2, nitro: 3 }
    },

    // Track themes
    trackThemes: [
        "downtown_night",
        "industrial",
        "harbor",
        "tunnel",
        "mountain",
        "highway",
        "rain_district",
        "night_market"
    ],

    // Racers for each gang (10 standard + 2 bosses per gang)
    racers: [
        // Street Phantoms (Gang 1)
        {
            id: "sp_racer_01",
            name: "Maya",
            title: "Street Phantom",
            gang: "street_phantoms",
            difficulty: 1,
            reward: 1500,
            xp: 300,
            car: "street_fox",
            dialogue: ["Think you can handle these streets?", "Let's see if you can actually drive."],
            isBoss: false,
            unlockAfter: null
        },
        {
            id: "sp_racer_02",
            name: "Jinx",
            title: "Neon Rider",
            gang: "street_phantoms",
            difficulty: 1,
            reward: 1600,
            xp: 320,
            car: "street_fox",
            dialogue: ["You're new here, right?", "Time to learn the ropes."],
            isBoss: false,
            unlockAfter: "sp_racer_01"
        },
        {
            id: "sp_racer_03",
            name: "Kai",
            title: "Drift King",
            gang: "street_phantoms",
            difficulty: 2,
            reward: 1800,
            xp: 350,
            car: "neon_streak",
            dialogue: ["I've been drifting these streets for years.", "Can you keep up?"],
            isBoss: false,
            unlockAfter: "sp_racer_02"
        },
        {
            id: "sp_racer_04",
            name: "Luna",
            title: "Moon Runner",
            gang: "street_phantoms",
            difficulty: 2,
            reward: 2000,
            xp: 380,
            car: "neon_streak",
            dialogue: ["The night is my playground.", "Try not to get lost."],
            isBoss: false,
            unlockAfter: "sp_racer_03"
        },
        {
            id: "sp_racer_05",
            name: "Rex",
            title: "Turbo Kid",
            gang: "street_phantoms",
            difficulty: 3,
            reward: 2200,
            xp: 420,
            car: "night_runner",
            dialogue: ["My turbo never sleeps.", "Neither should you."],
            isBoss: false,
            unlockAfter: "sp_racer_04"
        },
        {
            id: "sp_racer_06",
            name: "Vega",
            title: "Star Chaser",
            gang: "street_phantoms",
            difficulty: 3,
            reward: 2400,
            xp: 450,
            car: "night_runner",
            dialogue: ["I race under the stars.", "They watch every move."],
            isBoss: false,
            unlockAfter: "sp_racer_05"
        },
        {
            id: "sp_racer_07",
            name: "Blaze",
            title: "Fire Starter",
            gang: "street_phantoms",
            difficulty: 4,
            reward: 2700,
            xp: 500,
            car: "shadow_blade",
            dialogue: ["You're playing with fire now.", "Hope you don't burn out."],
            isBoss: false,
            unlockAfter: "sp_racer_06"
        },
        {
            id: "sp_racer_08",
            name: "Echo",
            title: "Sound Barrier",
            gang: "street_phantoms",
            difficulty: 4,
            reward: 3000,
            xp: 550,
            car: "shadow_blade",
            dialogue: ["Hear that? That's the sound of defeat.", "Your defeat."],
            isBoss: false,
            unlockAfter: "sp_racer_07"
        },
        {
            id: "sp_racer_09",
            name: "Frost",
            title: "Ice Breaker",
            gang: "street_phantoms",
            difficulty: 5,
            reward: 3400,
            xp: 600,
            car: "vortex_r",
            dialogue: ["Cold as ice, fast as lightning.", "That's how I roll."],
            isBoss: false,
            unlockAfter: "sp_racer_08"
        },
        {
            id: "sp_racer_10",
            name: "Storm",
            title: "Weather Master",
            gang: "street_phantoms",
            difficulty: 5,
            reward: 3800,
            xp: 650,
            car: "vortex_r",
            dialogue: ["A storm is coming.", "And you're in its path."],
            isBoss: false,
            unlockAfter: "sp_racer_09"
        },
        {
            id: "sp_boss_01",
            name: "Phantom Leader",
            title: "Ghost Commander",
            gang: "street_phantoms",
            difficulty: 6,
            reward: 8000,
            xp: 1500,
            car: "midnight_gt",
            dialogue: ["I lead the Phantoms.", "But even leaders fall."],
            isBoss: true,
            bossLevel: 1,
            unlockAfter: "sp_racer_10"
        },
        {
            id: "sp_boss_02",
            name: "Phantom King",
            title: "Spectral Ruler",
            gang: "street_phantoms",
            difficulty: 7,
            reward: 12000,
            xp: 2000,
            car: "nightfall_gt",
            dialogue: ["The throne is mine.", "Try to take it."],
            isBoss: true,
            bossLevel: 2,
            unlockAfter: "sp_boss_01"
        },
        // Iron Vipers (Gang 2)
        {
            id: "iv_racer_01",
            name: "Axel",
            title: "Iron Fist",
            gang: "iron_vipers",
            difficulty: 5,
            reward: 4000,
            xp: 700,
            car: "vortex_r",
            dialogue: ["The Vipers don't back down.", "Ever."],
            isBoss: false,
            unlockAfter: "sp_boss_02"
        },
        {
            id: "iv_racer_02",
            name: "Brick",
            title: "Heavy Metal",
            gang: "iron_vipers",
            difficulty: 5,
            reward: 4200,
            xp: 720,
            car: "vortex_r",
            dialogue: ["I crush competition.", "Literally."],
            isBoss: false,
            unlockAfter: "iv_racer_01"
        },
        {
            id: "iv_racer_03",
            name: "Cinder",
            title: "Ember Queen",
            gang: "iron_vipers",
            difficulty: 6,
            reward: 4500,
            xp: 750,
            car: "midnight_gt",
            dialogue: ["Feel the heat.", "It only gets hotter."],
            isBoss: false,
            unlockAfter: "iv_racer_02"
        },
        {
            id: "iv_racer_04",
            name: "Duke",
            title: "Steel Baron",
            gang: "iron_vipers",
            difficulty: 6,
            reward: 4800,
            xp: 780,
            car: "midnight_gt",
            dialogue: ["This is my territory.", "Show some respect."],
            isBoss: false,
            unlockAfter: "iv_racer_03"
        },
        {
            id: "iv_racer_05",
            name: "Ember",
            title: "Spark Plug",
            gang: "iron_vipers",
            difficulty: 7,
            reward: 5200,
            xp: 820,
            car: "nightfall_gt",
            dialogue: ["One spark is all I need.", "To ignite the track."],
            isBoss: false,
            unlockAfter: "iv_racer_04"
        },
        {
            id: "iv_racer_06",
            name: "Forge",
            title: "Iron Smith",
            gang: "iron_vipers",
            difficulty: 7,
            reward: 5500,
            xp: 850,
            car: "nightfall_gt",
            dialogue: ["Forged in fire.", "Tempered in speed."],
            isBoss: false,
            unlockAfter: "iv_racer_05"
        },
        {
            id: "iv_racer_07",
            name: "Grinder",
            title: "Metal Shredder",
            gang: "iron_vipers",
            difficulty: 8,
            reward: 6000,
            xp: 900,
            car: "phantom_x",
            dialogue: ["I'll grind you down.", "To nothing."],
            isBoss: false,
            unlockAfter: "iv_racer_06"
        },
        {
            id: "iv_racer_08",
            name: "Havoc",
            title: "Chaos Bringer",
            gang: "iron_vipers",
            difficulty: 8,
            reward: 6500,
            xp: 950,
            car: "phantom_x",
            dialogue: ["Chaos is my middle name.", "Actually, it's Steve."],
            isBoss: false,
            unlockAfter: "iv_racer_07"
        },
        {
            id: "iv_racer_09",
            name: "Inferno",
            title: "Flame Warden",
            gang: "iron_vipers",
            difficulty: 9,
            reward: 7000,
            xp: 1000,
            car: "titan_ss",
            dialogue: ["Walk through fire.", "If you dare."],
            isBoss: false,
            unlockAfter: "iv_racer_08"
        },
        {
            id: "iv_racer_10",
            name: "Juggernaut",
            title: "Unstoppable",
            gang: "iron_vipers",
            difficulty: 9,
            reward: 7500,
            xp: 1100,
            car: "titan_ss",
            dialogue: ["Nothing stops me.", "Nothing."],
            isBoss: false,
            unlockAfter: "iv_racer_09"
        },
        {
            id: "iv_boss_01",
            name: "Viper Captain",
            title: "Venom Leader",
            gang: "iron_vipers",
            difficulty: 10,
            reward: 15000,
            xp: 2500,
            car: "urban_titan",
            dialogue: ["The Captain always wins.", "Always."],
            isBoss: true,
            bossLevel: 1,
            unlockAfter: "iv_racer_10"
        },
        {
            id: "iv_boss_02",
            name: "Viper King",
            title: "Serpent Supreme",
            gang: "iron_vipers",
            difficulty: 10,
            reward: 20000,
            xp: 3000,
            car: "urban_titan",
            dialogue: ["Bow before the King.", "Or be crushed."],
            isBoss: true,
            bossLevel: 2,
            unlockAfter: "iv_boss_01"
        },
        // Night Reapers (Gang 3)
        {
            id: "nr_racer_01",
            name: "Ash",
            title: "Death Touch",
            gang: "night_reapers",
            difficulty: 9,
            reward: 8000,
            xp: 1200,
            car: "titan_ss",
            dialogue: ["Death follows me.", "On the track."],
            isBoss: false,
            unlockAfter: "iv_boss_02"
        },
        {
            id: "nr_racer_02",
            name: "Banshee",
            title: "Scream Queen",
            gang: "night_reapers",
            difficulty: 9,
            reward: 8500,
            xp: 1250,
            car: "titan_ss",
            dialogue: ["Hear my scream.", "It's the last thing many hear."],
            isBoss: false,
            unlockAfter: "nr_racer_01"
        },
        {
            id: "nr_racer_03",
            name: "Crypt",
            title: "Tomb Keeper",
            gang: "night_reapers",
            difficulty: 10,
            reward: 9000,
            xp: 1300,
            car: "urban_titan",
            dialogue: ["The crypt awaits.", "All who challenge me."],
            isBoss: false,
            unlockAfter: "nr_racer_02"
        },
        {
            id: "nr_racer_04",
            name: "Dread",
            title: "Fear Incarnate",
            gang: "night_reapers",
            difficulty: 10,
            reward: 9500,
            xp: 1350,
            car: "urban_titan",
            dialogue: ["Fear is my weapon.", "And you're terrified."],
            isBoss: false,
            unlockAfter: "nr_racer_03"
        },
        {
            id: "nr_racer_05",
            name: "Eclipse",
            title: "Darkness Falls",
            gang: "night_reapers",
            difficulty: 10,
            reward: 10000,
            xp: 1400,
            car: "urban_titan",
            dialogue: ["The light fades.", "Darkness remains."],
            isBoss: false,
            unlockAfter: "nr_racer_04"
        },
        {
            id: "nr_racer_06",
            name: "Fallen",
            title: "Angel of Death",
            gang: "night_reapers",
            difficulty: 10,
            reward: 10500,
            xp: 1450,
            car: "urban_titan",
            dialogue: ["Even angels fall.", "Especially angels."],
            isBoss: false,
            unlockAfter: "nr_racer_05"
        },
        {
            id: "nr_racer_07",
            name: "Grim",
            title: "Reaper's Hand",
            gang: "night_reapers",
            difficulty: 10,
            reward: 11000,
            xp: 1500,
            car: "urban_titan",
            dialogue: ["Grim reaper.", "Grim results."],
            isBoss: false,
            unlockAfter: "nr_racer_06"
        },
        {
            id: "nr_racer_08",
            name: "Hex",
            title: "Curse Bearer",
            gang: "night_reapers",
            difficulty: 10,
            reward: 11500,
            xp: 1550,
            car: "urban_titan",
            dialogue: ["You're cursed.", "Since the moment you challenged me."],
            isBoss: false,
            unlockAfter: "nr_racer_07"
        },
        {
            id: "nr_racer_09",
            name: "Wraith",
            title: "Shadow Walker",
            gang: "night_reapers",
            difficulty: 10,
            reward: 12000,
            xp: 1600,
            car: "urban_titan",
            dialogue: ["I walk between worlds.", "You're stuck on the ground."],
            isBoss: false,
            unlockAfter: "nr_racer_08"
        },
        {
            id: "nr_racer_10",
            name: "Zero",
            title: "End Point",
            gang: "night_reapers",
            difficulty: 10,
            reward: 12500,
            xp: 1650,
            car: "urban_titan",
            dialogue: ["Zero mercy.", "Zero chances.", "Zero you."],
            isBoss: false,
            unlockAfter: "nr_racer_09"
        },
        {
            id: "nr_boss_01",
            name: "Reaper Captain",
            title: "Death Commander",
            gang: "night_reapers",
            difficulty: 10,
            reward: 25000,
            xp: 4000,
            car: "urban_titan",
            dialogue: ["Death commands me.", "I command the streets."],
            isBoss: true,
            bossLevel: 1,
            unlockAfter: "nr_racer_10"
        },
        {
            id: "nr_boss_02",
            name: "Reaper King",
            title: "Lord of Shadows",
            gang: "night_reapers",
            difficulty: 10,
            reward: 35000,
            xp: 5000,
            car: "urban_titan",
            dialogue: ["The shadows bow to me.", "Now you will too."],
            isBoss: true,
            bossLevel: 2,
            unlockAfter: "nr_boss_01"
        },
        // Final Bosses
        {
            id: "final_boss_01",
            name: "The Legend",
            title: "Street Immortal",
            gang: "final",
            difficulty: 10,
            reward: 100000,
            xp: 10000,
            car: "urban_titan",
            dialogue: ["I am legend.", "You are nothing."],
            isBoss: true,
            isFinalBoss: true,
            bossLevel: 1,
            unlockAfter: "nr_boss_02",
            requiresAllGangs: true
        },
        {
            id: "final_boss_02",
            name: "The Ultimate",
            title: "Racing God",
            gang: "final",
            difficulty: 10,
            reward: 250000,
            xp: 25000,
            car: "urban_titan",
            dialogue: ["You've made it this far.", "But this is where dreams end."],
            isBoss: true,
            isFinalBoss: true,
            bossLevel: 2,
            unlockAfter: "final_boss_01",
            requiresAllGangs: true
        }
    ]
};
