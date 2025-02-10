# AstroCat Design Document
## Introduction
This is Will's design document for our group's game, **AstroCat**. By no means a finalised *'this is what we are doing/must do'*, but more my own ideas of how the game should look, feel and play based on
discussions we have had in group meetings.
## Genre
2D shooter roguelike.
## Premise
AstroCat is the pilot of a one man vessel (or two man, if the co-op mode is chosen), seeking to explore the galaxy for knowledge, fame, and potentially treasure. Happening upon what appears
to be the wreckage of some kind of spacecraft, AstroCat docks in the hope of being able to scavenge something valuable. Little does AstroCat know of the danger that awaits inside...
## Setting
One of the main dividing ideas within our group is whether the game should be level-based with different locations and an eventual endpoint, or just set in one room with infinitely spawning enemies
of increasing intensity/difficulty, with the game lasting until the player dies.

My proposal is that we take the best bits of both ideas!

Set on a seemingly abandoned spaceship, AstroCat will move from room to room (similar to one of our inspirations, *The Binding of Isaac*) through various zones ('levels') of the ship.

| <img src = "https://assets2.ignimgs.com/2014/11/26/ss008a76bd0ab314c8140dd1a7ec61090c122d17791920x1080jpg-44d458.jpg" alt width = "400"> | 
| :--: |
| *A typical room in The Binding of Isaac* |

Each zone should be somewhat visually distinct, based on potential real life areas that may exist on a large spacecraft.

Some examples could include:
- Cargo bay
- Medical bay
- Engine room
- Crew quarters/living space
- Science/research labs

Two games that do this well are *System Shock 2* and *Dead Space*:

**Dead Space**

<table>
  <tr>
    <td><img src = "https://i.ytimg.com/vi/KklJoPeQxQQ/maxresdefault.jpg" alt width = "300"></td>
    <td><img src = "https://static.wikia.nocookie.net/deadspace/images/8/8a/Bridgecaptainroom.png/revision/latest/scale-to-width-down/1000?cb=20100517071854" alt width = "300"></td>
    <td><img src = "https://static.wikia.nocookie.net/deadspace/images/9/9f/Sleep_Block_B.png/revision/latest/scale-to-width-down/1000?cb=20100820121627" alt width = "300"></td>
  </tr>
  <tr>
    <td>Hydroponics Deck</td>
    <td>Bridge</td>
    <td>Crew Deck</td>
  </tr>
</table>

**System Shock 2**

<table>
  <tr>
    <td><img src = "https://static.wikia.nocookie.net/shodan/images/e/ef/Hydroponics_3.png/revision/latest?cb=20160719200257" alt width = "300"></td>
    <td><img src = "https://static.wikia.nocookie.net/shodan/images/4/43/Basketball_Court.jpg/revision/latest?cb=20160803220727" alt width = "300"></td>
    <td><img src = "https://static.wikia.nocookie.net/shodan/images/1/1c/EngineeringSS2.png/revision/latest?cb=20160719200114" alt width = "300"></td>
  </tr>
  <tr>
    <td>Hydroponics Deck</td>
    <td>Athletic Sector</td>
    <td>Engineering Deck</td>
  </tr>
</table>

## Presentation
### Perspective
Another differing opinion within the group is what perspective the game should be played from (e.g. top-down, isometric etc.)

I believe the game's perspective should be similar to that of *The Binding of Isaac*, with a bird's eye view of the room, and a flat 2D sprite of the player facing the camera.
This way, the player can actually see the cute cat they are playing as (as opposed to just seeing the top of their head).

In terms of movement, we can initially just have the player sprite facing the camera, but if we want to be fancy, we can flip the sprite along the y-axis when the player moves left/right, or
even have separate sprites to switch to when moving up/down.
### Enemies
One suggestion for the design of the enemies was to have them as animals that we typically associate to be the 'antagonists' of cats, such as dogs, mice, birds etc.

It was also suggested that these animals be cute like AstroCat, but I believe they should look more aggressive (or potentially mutated), to juxtapose AstroCat's cuteness - perhaps the crew
of the abandoned spaceship AstroCat is on were infected with some strange alien virus?

This would help the player visually differentiate their own character from the enemies - plus, who wants to shoot a cute dog in the face??
## Gameplay
### Rooms
Each room should act as an arena, either with a static number of enemies placed within, or, more interestingly, waves of enemies should come at the player [from all directions.](https://www.youtube.com/watch?v=DJQ_7jKIm24)

An example of the latter would be [Vampire Survivors.](https://www.youtube.com/watch?v=xqDmZzqrnBo)

To explain how enemies are seemingly coming through walls from all directions, the in-universe reasoning for this could be that they are coming through vents in the walls, and broken vent assets could be
created to place around the outside of the room.

Upon entering the room, the exit should lock to prevent the player leaving, and then unlock once all of the enemies are defeated.

After moving through a set amount of rooms filled with enemies (e.g. 3-5), the next room should be a boss room. Defeating the boss and leaving the room should be the start of the next 'zone'.

For example: cargo hold enemy rooms -> cargo hold boss room -> engineering deck enemy rooms -> engineering deck boss room...

The game should be infinite, similar to most other roguelikes, and should only end once the player dies.
### Enemies
Most enemies will probably have projectile attacks, which deal damage to the player if they are hit by them. To make the gameplay a bit more interesting, some enemies' attacks could inflict debuffs
on the player instead of dealing damage, such as dimming the screen to reduce visibility, slowing movement speed etc.

Another interesting potential enemy type would be heavily inspired by the [Screecher](https://doomwiki.org/wiki/Screecher) from *Doom Eternal*. This enemy wouldn't necessarily seek to attack the player,
but would instead act as an obstacle and buff the speed and health of all other enemies in the room if the player were to kill it (it's health should be comically low to maximise the chances of this 
happening). When all other enemies are killed, these enemies should automatically die.

This would add a bit more strategy to the game, and reduce the player's incentive to just aimlessly spray bullets all around the arena.
### Loot and Upgrades
It has basically been decided that the player will have access to multiple different weapons, each with different types of attacks.

What is yet to be decided is how picking up new weapons will work. Will the player be able to carry all possible weapons and have an inventory where they can switch between them 
(probably more complicated)? Or will there be a limit to how many weapons the player can have?

A potential idea would be to limit the player to only one weapon - upon picking up a new weapon that an enemy has randomly dropped as loot, their current weapon will be discarded and flung in
a random direction within the room. The player can still go and pick up this discarded weapon to switch back to it, but they will have to be careful, as enemies will be swarming from all sides
and possibly blocking access to it. Any weapons discarded by the player should be destroyed once the player moves to the next room.

Another decision to make would be how the random upgrade system works: 
- When are these awarded? (e.g. loot from enemies, reward for clearing a room, dropped by bosses)
- What are the effects of these upgrades? (e.g. more health, faster movement)
### The 'Twist'
An interesting proposal for the 'twist' was that the player's controls would be randomised at different points of the game - I think this could be easily worked into the space/spaceship setting we
are going for.

For example:
- One room could be randomly 'colder', so the player slides around instead of just stopping when the direction buttons are no longer being pressed.
- The 'gravity' could be different in one room, so the up and down keys become inverted (pressing up moves the player down etc.)

As one feature of roguelikes is randomisation, we could go a step further and randomise other things in different rooms, such as the player's health, damage etc.
