@"
# The Last Citadel (Icy Flame Knight)

A browser-based 2D HTML5 Canvas platformer built with vanilla JavaScript, custom pixel-art backgrounds, and physics-based tile collision.

## Controls
- **Start Game:** `Enter`
- **Move Left / Right:** `A` / `D` or `Left` / `Right` Arrow
- **Jump:** `Space` or `W` or `Up` Arrow

## Key Features Built
- Custom Glacier & Citadel visual theme with parallax-scrolling pixel mountains
- Sculpted snow-stone tiles, icicle overhangs, and rune-carved frost blocks
- Custom sprite animation mapping for idle, run, and directional leap states
- Accessible platforming level design with stepping-stone islands

## Future Roadmap
- Add collectible frost coins that increment the live HUD score
- Implement enemy patrol AI and combat hitbox detection
- Add multi-level progression and sound effects
"@ | Set-Content README.md

git add README.md
git commit -m "Add README with game overview, controls, and future roadmap"
