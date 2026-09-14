# URBAN STREETS - Street Racing Evolved

A polished, professional 3D-inspired street-racing web game built with HTML, CSS, and vanilla JavaScript.

## Features

### Core Gameplay
- **City Hub**: Explore a dynamic urban environment with neon lighting, buildings, and AI racers
- **38 Races**: Complete campaign with 30 standard races, 6 boss races, and 2 final bosses
- **3 Racing Gangs**: Street Phantoms, Iron Vipers, and Night Reapers
- **Car System**: 10 unique vehicles from starter to ultimate tier
- **Upgrades**: Engine, Transmission, Tires, Brakes, Nitro, and ECU upgrades (5 levels each)
- **Persistent Progression**: Save system using localStorage

### Controls

#### Keyboard (Desktop)
- **W / ↑**: Accelerate
- **S / ↓**: Brake / Reverse
- **A / ←**: Steer Left
- **D / →**: Steer Right
- **SPACE**: Nitro Boost
- **E**: Interact with racers (in city)
- **ESC**: Pause menu

#### Touch (Mobile)
- On-screen controls appear automatically on touch devices
- Large, accessible buttons for steering, gas, brake, and nitro

### Game Structure

```
START
  ↓
Gang 1 - Street Phantoms (10 racers + 2 bosses)
  ↓
Gang 2 - Iron Vipers (10 racers + 2 bosses)
  ↓
Gang 3 - Night Reapers (10 racers + 2 bosses)
  ↓
Final Boss 1 - The Legend
  ↓
Final Boss 2 - The Ultimate
  ↓
VICTORY
```

## How to Play

1. Open `index.html` in a modern web browser
2. Click "NEW GAME" to start your racing career
3. Drive around the city hub (WASD or Arrow keys)
4. Approach AI racers and press E to challenge them
5. Win races to earn money and XP
6. Visit the Garage to upgrade your car
7. Visit the Shop to buy new vehicles
8. Complete all 38 races to become the Urban Streets Champion!

## Technical Details

- **Rendering**: HTML5 Canvas with 2D top-down perspective
- **Physics**: Arcade-style car physics with drift behavior
- **AI**: Checkpoint-based AI with difficulty scaling
- **Audio**: Web Audio API for procedural sound effects
- **Save System**: localStorage for persistent progression
- **Responsive**: Works on desktop, tablet, and mobile devices

## File Structure

```
urban-streets/
├── index.html          # Main HTML file
├── styles/
│   └── main.css       # All game styles
├── src/
│   ├── main.js        # Entry point
│   ├── game-data.js   # Cars, racers, gangs data
│   ├── player.js      # Player progression
│   ├── cars.js        # Car rendering and stats
│   ├── tracks.js      # Track generation
│   ├── ai.js          # AI opponent logic
│   ├── racing.js      # Race system
│   ├── city.js        # City hub
│   ├── ui.js          # UI management
│   ├── gangs.js       # Gang progression
│   ├── shop.js        # Car dealership
│   ├── garage.js      # Car garage & upgrades
│   ├── settings.js    # Game settings
│   ├── audio.js       # Sound effects
│   └── save-system.js # Save/load functionality
└── README.md
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (Android/iOS)

## Performance

Optimized for mid-range devices:
- Efficient canvas rendering
- Object pooling where beneficial
- Quality settings for lower-end devices
- Responsive resolution scaling

## License

Free to use and modify for personal and educational purposes.
