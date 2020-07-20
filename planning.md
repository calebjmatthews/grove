Init:
  - Load sprites
  - Create box objects
  - Display sprites according to box locations

Game loop:
  - Check for keyboard input
  - Set velocity based on keyboard input
  - Check collisions of pending position based on velocity
    - If no collision, reposition player box to this position
    - If collision, reposition player box at edge of colliding object
  - Update sprite to match new box location

Directional pieces:
  - Determine direction based on original xy position and subsequent xy position
  - If same direction as previous, age animation
  - If new direction, start new animation at random point
  - If no direction, change sprite to standing facing previous direction

Player walking:
  Down:
    25, 1, 25, 2
  Left:
    8, 7, 8, 33
  Up:
    5, 27, 6, 27
  Right:
    4, 3, 4, 34
Player striking:
  Down:
    18, 10
  Left:
    24, 16
  Up:
    30, 14
  Right:
    20, 12

Bush positions: [3, 6] = row-4-col-7.png; [4, 7] = row-5-col-8.png;
Grass position: [0, 5] = row-6-col-1.png;
Dirt position: [8, 8] = row-9-col-9.png;

Piece behaviors:
  - Player
  - Background: does not cause collision
  - Breakable: causes collision, can be broken (variable for durability, variable for drops)
  - Obstruction: causes collision, cannot be broken

Scene editor:
- New pixi state that handles stage clicks, animates pieces, and allows scrolling based on keyboard input
- Hook absolutely positioned on bottom of screen to hold piece types
- Iterate through piece types, creating a DOM container object for each, which holds the title and the graphic
- OnClick event in the DOM container which sets a selected piece type
- click event handler in the pixi state that replaces the clicked tile with a new piece
- Function to export created scenes as a two-dimensional array of indexes
- Function to import a scene for editing or play

Drawing large maps:
- Perform check every time enters a new grid space
- Find the new row/column about to be introduced to the viewport and the old row/column that has exited by calculating using the offset, screen size, and tile size
- Show/hide them respectively
- If necessary, remove the sprites that leave and create the ones that enter

Burst breaking:
- One bush in five twinkles
- With a set of five bush hits the twinkle with increase, then reset
- If a twinkle bush is hit on five within the set it will burst, breaking it and any bushes next to it
- If a twinkle bush is hit on one through four within the set the twinkles with dissipate, doing nothing

Planes:
- Dark, cozy forest with constant hunger (Forest of Starving Darkness)
- Bright white and gold rocky land with flowing bright blue rivers and waterfalls (Forest of Golden Pillars)
- Neon city with creatures that attack, cannot bring anything in (Forest of Neon Terrors)
- Cloud-covered, floating sunset land where food grants flight (Forest of Sunset Clouds)
- Nighttime desert with glowing sands where food gives exponential strength (Forest of Glowing Sands)

Character ideas:
- Scrappy old woman trader who visits periodically
- Father/son/daughter trio where the father is a carpenter (who makes buildings for you), the son is something else (?) and the father is bitter about it, and the daughter is an apprentice carpenter (who makes furniture)
- Woman who raises her niece/nephew and wants to explore the forest with you to find her brother (the Rambling Linguist)
- Deva researcher
- Farmer
- Tailor
- Doctor
- Leader

Tool ideas:
- Tools are used for breaking obstacles ("Power" for # hits, "Gather" for drop multiplier), harvesting plants ("Harvest" for drop multiplier), and watering plants ("Water" for speed increase)
- Tools also have special moves which differing triggers and effects:
- Triggers:
  - "Sparkle", by hitting a specific obstacle with the correct timing
  - "Focus", by holding and releasing at a specific point
  - "Cooldown", by waiting after last use and holding for a short time
  - "Relentless", by striking breakable objects many times with little delay
- Effects:
  - "Impact", triple damage to neighboring eight tiles
  - "Rain", increase growth speed of plants
  - "Burn", damage over time to obstacles
  - "Dash", moving as far in one direction as possible

Other ideas:
- Devas which can perform work (harvesting, breeding, watering, cooking) in exchange for food and a place to live (statue)
- The "Rambling Linguist" whose work can be found scattered around the planes and translates Deva language
- Currency is "influence", which you can use to ask the other villagers to make you things or withdraw items from storage, you receive influence by adding items to storage

Map size: 39 x 18
