<div align="center">
 
<img src="Requirements/banner.gif" width="10000">

[<img src="https://github.com/user-attachments/assets/bd98ef6e-f613-4d44-b601-7af35172aa4f" width="550">](https://uob-comsm0166.github.io/2025-group-28/)
</div>

---

## Table of Contents

- [Our Group](#our-group)
- [Introduction](#introduction)
- [Requirements](#requirements)
  - [Idea Development](#idea-development)
  - [Stakeholders and Users](#stakeholders-and-users)
  - [Feasibility Studies](#feasibility-studies)
  - [Requirement Prioritisation](#requirement-prioritisation)
- [Design](#design)
  - [Class Design](#class-design)
  - [Behavioural Diagrams](#behavioural-diagrams)
- [Implementation](#implementation)
  - [Challenge 1: Procedurally Generated Rooms](#challenge-1-procedurally-generated-rooms)
  - [Challenge 2: Game Balance](#challenge-2-game-balance)
- [Evaluation](#evaluation)
   - [Think-Aloud User Evaluation](#think-aloud-user-evaluation)
   - [Heuristic Evaluation](#heuristic-evaluation)
   - [NASA TLX and System Usability Scale (SUS) Evaluation](#nasa-tlx-and-system-usability-scale-sus-evaluation)
- [Process](#process)
  - [Sprint Breakdown](#sprint-breakdown)
  - [Agile Methods](#agile-methods)
- [Sustainability, Ethics and Accessibilty](#sustainability-ethics-and-accessibilty)
  - [Technical Sustainability](#technical-sustainability)
  - [Environmental Sustainability](#environmental-sustainability)
  - [Social Sustainability and Accessibility](#social-sustainability-and-accessibility)
- [Conclusion](#conclusion)
- [Contribution Statement](#contribution-statement)
- [References](#references)

## Our Group

![grouppic](https://github.com/user-attachments/assets/ec5b17da-6882-42b0-a55c-42023ebdaffb)

|Name|Email|GitHub|Role|Halloween costume in group image|
|----|-----|------|----|--------------------------------------|
|Luke Remus Elliot |pm24104@bristol.ac.uk | whileLuke | Back-End developer | Chrollo |
| Fred Clamp-Gray | ey24984@bristol.ac.uk | fred1778 | Scrum Master & Front-End developer | Julius Caesar |
|Matt Matloubi |dv24149@bristol.ac.uk |mattmatloubi | Back-End developer | Sully |
|Yoda Monplub | ds24614@bristol.ac.uk | Yoda-Yothada | Front-End developer & arts and design | Yoda |
|Will Nixon | zk24610@bristol.ac.uk | spockthewok | Back-End developer & sound design | Tiger |
|Dylan Haye | jk24742@bristol.ac.uk | dxlxnhxxe | Front-End developer & arts and design | No.5 |


## Introduction

![Untitled-4](https://github.com/user-attachments/assets/4e9927a0-c3e3-43a6-b144-0e3dbb921435)

Our game is called AstroCat. It is the story of cats who have found themselves on a spaceship and have to defeat hoards of Space Dogs in order to explore the endless rooms of their new galactic home.  

The game can be played with one or two players using the two control sets on the same keyboard. The objective is to kill the evil enemy space dogs and progress to the next room. There are a range of these Space Dogs – some can fire projectiles, and some can teleport around the room. AstroCat’s gun can overheat and stop working if you’re too trigger-happy, but defeated enemies can leave health and energy powerups to be collected to recover. There is no endgame – the aim is simply to get as far as you can, because once you’re dead, it’s back to room 1!  

However, AstroCat has a special ability that gives the gameplay a unique twist: Slow Meow. This slows the enemies and the projectiles down, but AstroCat can still move around like a cat on a hot tin roof! This ability is recharged through killing enemies.  

AstroCat is based on 2D roguelike games, featuring distinct procedurally-generated game environments and a 'permanent death approach', especially the game *'The Binding of Isaac'*, from which we took a lot of inspiration from in terms of gameplay, such as the playing environment being confined to small rooms seen by the player from a top-down perspective. The game also takes aesthetic cues from arcade and early video games, with a retro-style soundscape and pixel-art based design assets and fonts.  

## Requirements 

The first stage of our requirements-gathering process was to identify what kind of game AstroCat was going to be. Initially, we had two game ideas: a tower-defence style game, and a 2D shooter style game. From an early stage, we decided on the theme of the game (a cat protagonist in a space environment), and that a challenge we wanted to integrate would be co-operative play.  

At first, we were most inspired by the idea of creating a tower-defence game, taking inspiration from titles such as *'Bloons TD'*. However, undertaking our first stage of requirements engineering using paper-prototypes (the first time we had exposed our ideas to others), caused us to reconsider our direction. 

![pp](Requirements/Untitled.gif)

When we translated our ideas to physical paper, we found that the 2D shooter 'AstroCat' flowed much better, and this was echoed by our test users to whom we showed the paper prototypes, who indicated a preference for the 2D shooter variant over the tower-defence variant.  

### Idea Development

| ![boi](https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/113200/ss_d2dd031f581bcad380ed5a6065c8908329cf1115.1920x1080.jpg?t=1643480517) | ![bh](https://image.api.playstation.com/cdn/EP2575/CUSA08065_00/FREE_CONTENTTnvCkXugey5cdBc7TzX8/1.jpg) |
| :--: | :--: |
| *'The Binding of Isaac' - note top-down viewpoint and room game space* | *'Bloons TD' - typical tower defence game* |

### Stakeholders and Users

AstroCat the character may exist in a vacuum (i.e. space), but AstroCat the game does not. The onion model for AstroCat below captures some of the diverse range of stakeholders that can exist - from users, to the organisation we're part of, to regulators such as Ofcom who could potentially interact with AstroCat if the game threatened online saftey. As the assets and source code for the game are publically visible on GitHub, negative stakeholders include AI bots and other more malicious scrapers who could harvest our hard work!

<div align="center">
 <img src="https://github.com/user-attachments/assets/4cc95c6b-237f-459a-bc03-f70a3bfb47e4" width="500">
</div>

<br>
<br>
Next, we thought about who might (theoretically) play AstroCat - the 'Gaming public' captured in our onion model -  and what differing requirements they might have. We conceptualised diverse user types using a set of personas, translating their needs in to epics and user stories.

Our personas and their user stories were as follows: 
<br>
<br>
 <div align="center">
  <img width = "49%" src="https://github.com/user-attachments/assets/ab434d34-8bac-4127-a74d-5db559f04a1a">
<img width = "49%" src="https://github.com/user-attachments/assets/406f429f-dcab-4993-b946-4bebbf84a59b">
</div>

<div align="center">
 <img width = "49%" src="https://github.com/user-attachments/assets/22324163-6374-4635-8f0b-ad37120e649e">
  <img width = "49%" src="https://github.com/user-attachments/assets/aa030010-7bee-4502-b5eb-f8583447d855">
</div>

<div align="center">
<img  width = "49%" src="https://github.com/user-attachments/assets/e4f3b648-5a21-4536-828a-753f6f0451c0">
</div>
<br>

Requirements engineering involves making decisions about what requirements you can meet and which you can’t. In some cases, our stakeholders have **conflicting requirements**: Emma wants the game to be fully-playable without online multiplayer, but online multiplayer is important to Hans.  We used the MoSCoW and value-to-effort approaches to help identify which requirements we would prioritise, informed by feasibility studies to understand which requirements would require a lot of time and effort: 
 
### Feasibility Studies

We had more technical-focused whiteboard sessions to help identify the technical feasibility of different ideas. 
We want everybody to experience AstroCat, so we thought about our game from the perspective of different user profiles, each with different needs and wants. We evaluated the user stories based on need, timeframe, and techncial complexity (e.g. through feasibility studies in our Sandbox), and created corresponding epics/stories in our backlog, waiting to be candidates for future sprints if we had the resources:

| Feature | Study Details | Outcome |
| :--: | :--: | :--: |
| Same-device multiplayer | Tested how p5.js would handle executing two sets of keyboard gameplay commands in parallel to move two sprites and <br> whether this would cause lag/overload the update() function and reduce the FPS | Platform is able to handle two parallel sets of gameplay inputs with no observable degradation of performance, <br> co-op on-device multiplayer included in MVP |
| Online multiplayer | Integrated a BaaS (backend-as-a-service) connection and used realtime database to track positions of players and reflect these on other client | We found it was possible to integrate a Supabase database and track changes, challenges would be <br> (a) avoiding rate-limiting by rationing position updates <br> (b) creating and managing multiple 2-player online sessions <br> (c) mirroring behaviour of AI/environment across clients. Will be explored further if time permits. |
| Procedural graphics generation | We experimented with algorithmically generating different 'rooms'. | This proved feasible and was included in the MVP | 

### Requirement Prioritisation

We assessed the effort required to implement versus the projected benefit of the different features:
| Feauture | Effort | Value | MoSCoW bucket |
|------------|--------|-------|---------------|
| Offline multiplayer | Medium | Very High | Must Have |
| Online multiplayer  | Extremely High | High | Won't Do |
| Audible cues | Low | Medium | Should Have |
| Child Mode | Low | Low | Could Have |
| Difficulty Ranges (casual player to pro players) | High | Very High | Must Have |
| Customisable Controls | Medium | Medium | Could Have |



## Design

Having completed our initial requirements analysis, identifying key stakeholders, generating initiatives, epics and a collection of user stories, we were able to design the game itself, applying our initial vision to the needs and requirements of potential users. 

As a light, client-side only browser game, our development stack consists of JavaScript (p5.js) for the core game logic, and HTML/CSS for supplementary webpage design. 

In the simplest form, the game itself centres around AstroCat, the main playable character that ventures through an infinite number of rooms, killing enemies to score points.  

By performing a grammatical parse of the description above, we identified the core components of the game to build around: 

- AstroCat 
- Enemies 
- Rooms 

### Class Design

A class diagram provided us a way to formally apply the ideas listed above in an object-oriented manner, plan our development work and build a high-level blueprint of how we wanted the system to behave and be structured.  

The initial design revolved around the following key classes (See Fig X): 

- **Game**: this would be composed of the player(s), current room and score 
- **Sprite**: this is our abstract game character class 
- **Room**: this represented instances of an arena or level 
- **Player**: the playable character, AstroCat, extending Sprite 
- **Mob**: enemy characters, extending Sprite 


In the following development sprints, this base design was extended to accommodate additional requirements identified in sprint reviews and continuous user testing. Notable additions were (See Fig X+1): 

- **GameObject**: our core abstract class that represents any “thing” in the game – supplying them with a hitbox and position 
- **Tile**: represented each square block in the room, this facilitated our random generation of walls and traps 
- **Handler/Generator** classes: this delegated responsibility from the Room class to facilitate more flexible behaviour across rooms. 
- **Utility/Static** classes: allowed us to split UI and non-game elements such as the menu/settings/transitions away from the gameplay logic code. These included: 
  - **GameOver**: creates the game over screen 
  - **Menu**: game menu screen and logic 
  - **Settings**: settings and how to play pages 
  - **GameUI**: drew enemy health bars and scores

**Figure X**: Class Diagram at week 4 workshop 
![image](https://github.com/user-attachments/assets/7c23e660-87e8-4131-a0c0-dd7190344273)

**Figure X+1**: Class Diagram as at final sprint 
![image](https://github.com/user-attachments/assets/6fd5b006-6e27-4417-a278-2b17352c75d8)

### Behavioural Diagrams

Following on from the class diagram, drawing up a sequence diagram allowed us to model the interactions between different objects in the game and the order in which they occurred.  

In a typical gameplay loop, a room would be created, which would spawn mobs. The player would then have to shoot at the mobs and kill them. Once the player had killed all the mobs in the room, the game would then generate a new room, repeating this sequence. This is visualised in the diagram below (See Fig X+2) – where Game and Player are global variables persisting through the runtime states, interacting with the different objects of finite lifetimes. 

**Figure X+2**: Example combat & room progression sequence 
![image](https://github.com/user-attachments/assets/84e29cdf-692c-44ec-8789-52366a62b0a4)

## Implementation

### Challenge 1: Procedurally Generated Rooms

Infinite, procedurally generated rooms are a key aspect of roguelike games (Harris, 2020, p. 1), and this was our initial starting point when beginning development. 

The rooms in AstroCat are created using a 2D array, with each element containing a tile object. The dimensions of the room are defined as constant values: 50 tiles wide and 37 tiles high. The dimensions of the tiles are also constant, with all of them being 16x16 squares. The size of the room on the screen is therefore 800x592, which is as close to the resolution of the game space of 800x600 as possible, without having assets cut off by the room boundaries. 

Each tile also has a defined type, either being a wall, floor or trap tile. As JavaScript does not have native support for enumerated types, the tile variants were defined using plain objects, with integer values representing each (e.g. ```0 = FLOOR```, ```1 = WALL``` etc.). 

There are two separate room classes - one for the main singleplayer/co-operative modes, and another for the PvP game mode, with both classes sharing two common classes; One for generating the rooms, and the other for handling certain events or interactions that occur within the rooms. 

Having shared helper classes was something we implemented during one of our refactoring sessions to make our codebase more DRY, reducing redundant methods across room types. 

Upon initialization, the room generator populates the empty ```roomLayout``` array, placing walls around the two outer edges. It then moves through ```x``` and ```y``` positions in increments of four, determining whether walls should be placed and rolling a random number to set the number of wall shapes in each sector. If a wall is added, another probability check determines its shape: square, 'L', or upside-down 'L'. To avoid rooms being too symmetrical, each shape is given a random width, height, and positional offset.

A 'buffer' zone prevents walls from being added too close to the outer boundaries, ensuring players can access the exit. If a wall overlaps this buffer, its position is further adjusted until the full shape can be fully placed within the room.

Finally, in non-PvP rooms, a door is placed at a random position along the outer wall. To create a sense of continuity, the previous room's door position is stored and compared to the potential placement within the new room. For example, if a door was previously placed on the right side of the room, the position in the next room cannot be on the left. This prevents disorienting layouts where a player enters from the left only to find the next exit on the right, preserving a consistent progression through the game world.

| ![roomgendemo](https://github.com/user-attachments/assets/0ae788c8-5ca3-4351-82bd-d7232add9fcf) |
| :--: |
| *Our initial room generation implementation* |

### Challenge 2: Game Balance

Our second challenge, one we didn't initially anticipate, was the issue of game balance and making the game accessible to players of all skill levels. 

A consistent and surprising piece of feedback we received from playtesting, was the number of people completely unfamiliar with PC gaming, who struggled with the default WASD control scheme. 

These players felt more comfortable using arrow keys, and to accommodate this, we added the ability for them to switch between both control schemes in the game's settings. 

We also implemented a difficulty scaling system, which affects various aspects of gameplay, such as mob speed, damage and health, the amount of health items provide, as well as how quickly the player’s Slow Meow ability charges. For example, on the easiest difficulty, mob speeds are multiplied by 0.85, giving weaker players greater time react to enemy attacks. 

Another interesting aspect of AstroCat's gameplay is its adaptive difficulty and mob spawning system. 

To further account for players of all skill levels, we implemented a 'behaviour monitor', which tracks several statistics throughout a user’s playthrough and uses them to create a behaviour profile for the player. 

Players can be classified as either 'aggressive' (measured by how frequently they overheat or get close to overheating), 'defensive' (measured by how often they get hit against the number of projectiles fired by enemies), or 'neutral', for if they fall into neither of the previous categories. 

This profile is then assessed when determining which mobs to spawn within a room, with each mob having a specific playstyle they best counter, which increases the weighting of their spawn probability. 

This creates a much more dynamic, tactical and strategic style of gameplay, and was heavily inspired by the 'chess-like shooter' system found within *'Doom Eternal'* (Jenkins, 2020). 

## Evaluation

### Think-Aloud User Evaluation

Two main tasks were evaluated to assess player experience across different game modes and control configurations. Players were encouraged to express their thoughts as they play, which were noted down. Results are summarised below:

#### Task 1: Single-Player Mode
- Navigate menu and select single-player option
- Avoid mobs for several minutes
- Complete level objectives

#### Task 2: Two-Player Mode
- Play cooperatively using different keyboard configurations:
  - Laptop keyboard (compact layout)
  - Full-sized keyboard

#### Results

**Single-Player Experience**

| Observation Category | Participant Feedback |
|:---------------------|:---------------------|
| **Game Speed** | "Too fast" - AstroCat movement speed was too high for comfortable control |
| **Collision Detection** | "Get stuck on wall", "Easy to get stuck" - collision handling needs major refinement |
| **Navigation** | Players struggled with precise movement and frequently collided with environmental objects |

**Two-Player Experience**

| Observation Category | Participant Feedback |
|:---------------------|:---------------------|
| **Control Intuitiveness** | "If you've played games before you would know, but you can't assume that" - controls not immediately intuitive to non-gamers |
| **AI Behavior** | "The dog is following me" - mob AI behavior was acknowledged |
| **Movement Comparison** | "The mob is a lot more fluid than me" - perceived discrepancy between player and mob movement mechanics |
| **Engagement** | "I'm kinda bored now" - engagement declined after initial exploration |
| **Objectives** | "Oh yeah, you have to get to the door" - goal clarity issues noted |
| **Game Balance** | "Annoying that the enemy can go through walls but not me" - perceived unfairness in movement restrictions |
| **Hardware** | "Seemed fine on laptop keyboard" - compact keyboard layout did not significantly impact playability |

#### Key Issues Identified

1. **Wall Collision**: Players frequently get stuck on walls
2. **Movement Speed**: Character speed may be too high for precise control
3. **Mechanics Consistency**: Enemies can traverse walls that block players, creating perceived unfairness
4. **Objective Clarity**: Players don't know what the goal is
5. **Engagement**: Initial interest deteriorates during extended play

### Heuristic Evaluation

#### Methodology

The evaluation was conducted during week 7 with 5 participants. The users spent approximately 30 minutes going through the interface several times, producing lists of usability issues that corresponded to Neilsen's 10 principles of heuristic evaluation. We then compiled this list and summarised them in the results below. Each of the interface issues were then subsequently actioned during subsequent development sprints.

#### Results

| Interface Issue | Description | Heuristic Violated | Frequency(0-4) | Impact(0-4) | Persistence(0-4) | Severity(Avg) | Issue Link |
|:--------------:|:------------|:-------------------|:-------------:|:-----------:|:--------------:|:-----------------:|:-------------:|
| 🔴 **Sticky walls** | Collision logic between players and walls needs enhancement | Flexibility and efficiency of use | 4 | 4 | 3 | **3.7** | [Issue #50](https://github.com/UoB-COMSM0166/2025-group-28/issues/50) |
| 🟠 **Too easy** | Need more challenging levels | Consistency and standards | 3 | 2 | 4 | **3.0** | [Issue #115](https://github.com/UoB-COMSM0166/2025-group-28/issues/115) |
| 🟠 **Progress/goal tracking** | Need to show health bar, SlowMeow percentage, and overheating bar | Visibility of system status | 2 | 2 | 4 | **2.7** | [Issue #137](https://github.com/UoB-COMSM0166/2025-group-28/issues/137) |
| 🟡 **Limited enemy variety** | Need more types of mobs with standardized artwork style | Consistency and standards | 1 | 1 | 3 | **1.7** | [Issues #112, #127, #54](https://github.com/UoB-COMSM0166/2025-group-28/issues/112) |
| 🟡 **Single control scheme** | Using standard WASD to move, but some players might prefer arrow keys | Recognition rather than recall, User control and freedom | 2 | 2 | 1 | **1.7** | [Issue #148](https://github.com/UoB-COMSM0166/2025-group-28/issues/148)|
| 🟢 **Game over screen** | Bugs in game over screen | Help users recognize, diagnose and recover from errors | 1 | 1 | 1 | **1.0** | [Issue #116](https://github.com/UoB-COMSM0166/2025-group-28/issues/116) |

**Severity Color Legend:***
- 🔴 High (3.4-4.0)
- 🟠 Medium-High (2.6-3.3)
- 🟡 Medium-Low (1.6-2.5)
- 🟢 Low (0.0-1.5)

*Note: Severity is calculated as (Frequency + Impact + Persistence) / 3*

### NASA TLX and System Usability Scale (SUS) Evaluation

#### Methodology
The evaluation was conducted during week 8 of development with 10 participants testing both difficulty modes (Easy and Medium). Participants completed standardized NASA Task Load Index (TLX) and System Usability Scale (SUS) questionnaires after gameplay sessions to assess cognitive load and overall usability.

#### NASA Task Load Index (TLX) Results

**Raw TLX Scores by Difficulty Level**

| User ID | Easy Mode | Medium Mode | Difference |
|:-------:|:---------:|:----------:|:----------:|
| 1       | 26.7      | 29.2       | +2.5       |
| 2       | 17.5      | 27.5       | +10.0      |
| 3       | 36.7      | 49.2       | +12.5      |
| 4       | 47.5      | 68.3       | +20.8      |
| 5       | 26.7      | 30.0       | +3.3       |
| 6       | 62.5      | 50.0       | -12.5      |
| 7       | 30.0      | 75.8       | +45.8      |
| 8       | 12.5      | 16.7       | +4.2       |
| 9       | 53.3      | 54.2       | +0.9       |
| 10      | 38.3      | 48.3       | +10.0      |
| **Mean**| **35.2**  | **44.9**   | **+9.8**   |

<img width = "45%" src="https://github.com/user-attachments/assets/545c05d8-5a7e-41d5-97d2-8807a0a70104">

#### TLX Dimensional Analysis

The unweighted TLX scores provided us with insights about the cognitive load experienced by participants. A dimensional breakdown shows:

- **Strengths**: Mental and Physical Demand dimensions scored favorably across both difficulty levels, suggesting the game provides an appropriate level of cognitive engagement without causing excessive mental strain.
  
- **Areas for Improvement**: Frustration and Temporal Demand received notably higher ratings, particularly in Medium mode. Participant feedback indicates this may be due to increased time pressure and the fact that the game may have just been too hard.

- **Mean Difference**: The average 9.8-point increase in TLX scores between Easy and Medium modes demonstrates an increase in cognitive workload, validating our difficulty scaling implementation.

#### System Usability Scale (SUS) Results

**SUS Scores by Difficulty Level**

| User ID | Easy Mode | Medium Mode | Difference |
|:-------:|:---------:|:----------:|:----------:|
| 1       | 95.0      | 72.5       | -22.5      |
| 2       | 77.5      | 50.0       | -27.5      |
| 3       | 75.0      | 62.5       | -12.5      |
| 4       | 82.5      | 65.0       | -17.5      |
| 5       | 92.5      | 75.0       | -17.5      |
| 6       | 60.0      | 45.0       | -15.0      |
| 7       | 80.0      | 42.5       | -37.5      |
| 8       | 100.0     | 85.0       | -15.0      |
| 9       | 55.0      | 57.5       | +2.5       |
| 10      | 80.0      | 62.5       | -17.5      |
| **Mean**| **79.8**  | **61.8**   | **-18.0**  |

<img width = "45%" src="https://github.com/user-attachments/assets/d59cbe31-9066-43c5-bfbd-b32f7ffee11a">

#### SUS Performance Analysis

According to established benchmarks in usability research, SUS scores above 68 indicate above-average usability, with scores of 80+ representing excellent user experiences. Our evaluation yielded the following insights:

- **Easy Mode**: With a mean SUS score of 79.8, the Easy mode demonstrates excellent usability, with 80% of participants rating it above the 68-point threshold. This indicates the core gameplay mechanics are intuitive and approachable for new players.

- **Medium Mode**: The Medium difficulty received a mean score of 61.8, with only 30% of participants rating it above the benchmark. This substantial 18-point reduction from Easy mode suggests that the increased challenge may be compromising system usability.

#### Statistical Significance

To validate the observed differences between difficulty modes, we conducted a Wilcoxon Signed-Rank Test, which is appropriate for data from the same participants under different conditions (a within-participants test):

- **Test Statistic**: W = 7.5 for both TLX and SUS analyses
- **Sample Size**: N = 10
- **Significance Level**: α = 0.05
- **Critical Value**: According to the Wilcoxon table below, the critical value for N=10 at α=0.05 is 8

<img width = "35%" src="https://github.com/user-attachments/assets/065c3956-1793-44a3-bc46-0e9aa5745a4d">

Since our obtained W value (7.5) is less than the critical value (8), we can reject the null hypothesis with 95% confidence. This confirms that the differences in both cognitive load (TLX) and usability (SUS) between difficulty modes are statistically significant and not due to random variation.

## Process 

Our team cohesion was very high, and we have had an amazing time working together as a group. We have each brought unique and intelligent comments to the game and have all been highly motivated, willing to give both positive and negative feedback on gameplay ideas. No one took negative feedback harshly and we fostered a highly positive working environment. The team fell quite naturally into their respective roles.
 
Fred’s prior Agile experience made him well-suited to be our Scrum Master, where he kept the team organised and accountable. Yoda and Dylan took the lead on visual design, leveraging their artistic skills. Matt, Luke, and Will formed the backbone of our development team, with Will also taking charge of sound design thanks to his background in music and experience modding games.

Coming from varied academic backgrounds, our team had a diverse range of perspectives. This mix of skills, along with a shared commitment to quality, made collaboration smooth and effective. Each team member was responsible for several of the final design elements that made it into the game.

We followed the Agile Manifesto, focusing on the agile principles: 
- We used face to face communication, asking our friends and families to play the game and taking on board any feedback. 
- We embraced change and have consistently updated features that have received negative feedback. 
- We delivered working software frequently, from our MVP to our many updated versions, AstroCat has existed in playable form since early February and has had many updates over the weeks. Often, we would end up releasing new working versions of the product multiple times a week, each with visionary features. 
- We have reflected regularly on our performance. We did so throughout sprints during stand-up meetings and by having sprint retrospective meetings at the end of each sprint.  
- We built our team around motivated individuals. We are all high achieving students, and we all listed our effort as 100% for the team building exercise. We are like minded in our commitment to making the game as good as it can possibly be and have all been very devoted to it throughout. 
- We also took care to reduce unnecessary work and technical debt. Code was refactored where appropriate, such as adapting ```makeInvincible``` from a hard-coded value to a flexible, reusable function depending on the game mode.
- We paid continual attention to technical efforts. Where relevant, the team refactored code, adding functionalities to methods, adapting them to be reused for other features.
- We worked at a sustainable and adaptive pace. Members of the team were consistently adding code or assets during sprints, aligning our tasks to realistic timelines and structuring them around personal or common commitments. 

This leads into our commit history diagram, with our three and a half sprints clearly shown by colour: 
 
![image](https://github.com/user-attachments/assets/8207dca6-cbf7-4a72-ba9a-d1ec0aec8bd2)

### Sprint Breakdown

#### Sprint 1 (Green): 16th January to 12th February

The main goal of this sprint was to develop a Minimum Viable Product (MVP). We focused on getting the core gameplay mechanics working. By the end of this sprint, we had a working prototype with basic functionality and temporary assets, ready for us to expand upon in sprint 2. 

#### Sprint 2 (Blue): 13th February to 2nd April

Over the course of this sprint, the team focused on expanding the game’s scope and perfecting its visual style. We also first introduced the game’s main twist, “Slow Meow”, a slow-motion ability that AstroCat can use. We introduced the following features: 
- Multiple rooms with doors as transitions between them.
- Custom assets.
- New mob types, adding variety and challenge to the gameplay. 
The goal of this sprint was to improve the MVP and focus on creating a complete feeling and visually engaging game. 

#### Sprint 3 (Purple): 3rd of April to the 28th of April

In this sprint, we updated the “Slow Meow” mechanic, the defining twist of our game. We focused on:  
- Slow meow balance, ultimately tweaking the twist several times until it felt rewarding, useful and fun to use. 
- General gameplay balance for better pacing, making sure to start with easier rooms and increase difficulty as the player progresses. 
- Updating mob AI for better pathing, with unique mob patterns for variety. 
- Overall polish, focusing on UI tweaks, animations and quality-of-life improvements for the user (such as being able to change keybinds or view clear instructions in game).
- PvP mode as user feedback suggested it would be fun for players to compete against each other.
- Player score, so that progressing through rooms and killing mobs felt more rewarding. 

#### Sprint 3.5 (Orange): 29th of April to 5th May

A short sprint to resolve technical debt and ensure the code remained readable and concise. We removed redundant assets, refactored overcomplicated methods, and cleaned up the project’s structure so that the game would be in a good state to move forwards for our future plans. The layout is clear for any future developers’ benefit. 

### Agile Methods

Communication was simple and effective. In person meetings were our go-to for deeper discussion and reflective decision-making. Outside of working hours, we leaned heavily on WhatsApp. It was our main space to share updates, quick questions and check in with each other. When we couldn’t meet in person, FaceTime helped fill in the gaps with personal, real-time conversations.

We held our daily standup meetings every other day to keep everyone aligned while accommodating external responsibilities. It gave us a chance to share what we were implementing and listen to what the rest of the team was focused on. Quick check-ins like these kept us on track and helped us prioritise.

Kanban was the backbone of our task management system. Every task had a clear place whether it was in the backlog, in progress, in testing or already merged. It gave us visibility into what was happening at any given time, assuring ourselves nothing was missed or forgotten.

Collaboration was nested into our development workflow. Pair programming was a technique we used regularly - sharing knowledge, catching bugs early, and just generally improving code quality. Pull requests were an essential part of this process. Thanks to this, we didn’t simply merge code but also gave everyone a chance to review and suggest improvements before anything hit the main branch.

Our commit messages remained very detailed to tell the story of our work. Through this, we facilitated understanding as to what was done and why. This was beneficial whenever someone needed to revisit the logs or debug an error.

We used Planning Poker to estimate the complexity of tasks, encouraging healthy discussions and helping us align expectations. Combined with Kanban, it enabled us to prioritise effectively and adapt our backlog accordingly.

<p align="center">
  <img src="https://github.com/user-attachments/assets/4a872e5d-3868-41e3-88d1-60400e5cd1e3" width="330" />
  <img src="https://github.com/user-attachments/assets/7280437d-a15c-4bf4-8648-65ba71f06c45" width="330" />
  <img src="https://github.com/user-attachments/assets/c4ed5789-a786-4e96-8aba-52f3626cc0e0" width="330" />
  <img src="https://github.com/user-attachments/assets/cdef9ade-dc39-4ae0-8fa4-2eeb0f8c2c2b" width="330" />
  <img src="https://github.com/user-attachments/assets/2e084f6d-30f5-4a38-ac12-6b3dbe9ff146" width="330" />
  <img src="https://github.com/user-attachments/assets/9fdfe4d9-146e-4a13-b595-010c6a898bff" width="330" />
</p>

## Sustainability, Ethics and Accessibilty

### Technical Sustainability

AstroCat demonstrates technical sustainability through key software quality dimensions. In terms of maintainability, the game benefits from its modular structure where gameplay logic, UI, and procedural generation are separated, making it easier to debug, update, and refine specific systems without impacting the whole game. The retro aesthetic and pixel-art assets also reduce complexity, easing asset management and modification.

Usability is addressed with simple, intuitive controls for one or two players using the same keyboard. The consistent visual design and clear gameplay mechanics, such as overheating and the Slow Meow feature, contribute to a smooth user experience. For further improvement, future iterations could include brief in-game tutorials or customizable controls.

Extensibility and adaptability is supported through the game’s rogue-like structure. Our enemy generation process and their behavior (e.g., teleporting or firing) enables easy development for future content like new enemy types, room styles, or gameplay modifiers. Similarly, the game could be adapted to different platforms, control schemes, or accessibility modes with reasonable development effort.

Finally, scalability is achieved by our design choice of procedurally generated rooms and endless progression. This ensures the game remains challenging without requiring linear level design, allowing for potentially infinite expansion without heavy overhead.

Overall, AstroCat’s, modular design, and procedural mechanics provide a sustainable technical base that supports both current functionality and future growth.

### Environmental Sustainability

During the development of AstroCat, we became conscious of how the decisions we made had an impact on our environment. In some cases, performance issues we encountered with our game turned out to also be environmental issues, due to the relationship between memory consumption and both user experience and energy usage. This resulted in us considering how changing our use of assets (images, gifs, etc.) could reduce the environmental impact of our game, and improve game performance. We consulted the Green Software Patterns catalogue, and decided to incorporate the following in to the design of our game: 

Minimising use of GIFs - as highlighted here, GIFs are an outdated and memory-hungry means of displaying animated content – more modern formats such as MP4s etc. consume less memory for the same quality and are therefore more energy efficient. The Green Software Foundation's Green Software Patterns recommened [deprecating GIFs in favour of MP4s](https://patterns.greensoftware.foundation/catalog/web/deprecate-gifs).

We converted our looping main menu animation from a GIF to a mp4 video. Our initial menu backgrond was a gif of nearly 90 MB, whilst an equivalent length and resolution MP4 occupied less than a quarter of that size (18 MB). We used a Firefox plugin (Carbonanalyser) to estimate the energy consumption of our game with our original menu background as a GIF, and then did the same with the MP4. Our results below show how this change reduced energy consumption: 

![Carbon Usage](https://github.com/user-attachments/assets/051f7e57-63e7-4996-a6e7-712ba6e497d8)

This has a postive impact on AstroCat's Software Carbon Intensity score by reducing the 'E' (energy) component in the score's formula (SCI = (E * I) + M per R). Even the MP4 version of our original background was large, so to reduce the performance impact of our menu further, we created a smaller background video more inline with the game's style (using around 1.5 MB).

#### Trade-off: GIFs versus native animation:

Despite the relative ineffeciency of GIFs, we used them extensively for our in-game sprites, including AstroCat. AstroCat's responsive animation is implemented by manipulating the frame range being played of a single 20-frame GIF of AstroCat, which contains all the sprite's possible movements. This proved to be an effective way of having AstroCat's movement and appearence respond to user inputs, only requiring a few lines of code to implement movements:

<img width="585" alt="Screenshot 2025-05-06 at 17 04 16" src="https://github.com/user-attachments/assets/48cfbcfe-7d30-4e9a-8dda-96d0ccd47770" />

The AstroCat gif requires 10 KB of memory. To implement the same complexity of animation using PNGs would require 16 KB of memory used for PNGs, and additional energy consumption from increased code complexity to implement the animation:

![astrocatM7](https://github.com/user-attachments/assets/f2dbe04f-eea6-4367-b13c-3b2c781a4a34)![astrocatM7-1 png](https://github.com/user-attachments/assets/c1dbc72e-8185-40e6-98b1-30c9542dc621)
  
### Social Sustainability and Accessibility

AstroCat was developed with social sustainability at its core, aiming to create an inclusive gaming experience that caters to users with diverse backgrounds, needs, and preferences. The game's design ensures that individuals across various user profiles can access and enjoy its features without barriers.

To accommodate visually impaired users, AstroCat avoids relying on colour-based cues. All in-game mobs are uniquely designed in both appearance and sound, allowing players to distinguish between them using auditory and visual differences rather than colour alone. This enhances accessibility for players with limited or no color perception.

The game also supports social gameplay through modes tailored for paired users, such as siblings or friends. The inclusion of Co-op and Player vs. Player (PvP) modes promotes shared experiences and interactive fun. Additionally, AstroCat addresses varying skill levels and player engagement styles by offering multiple difficulty settings. Competitive gamers can challenge themselves with the intense "Apex" difficulty, while casual players can enjoy a more relaxed experience through the "Kitten" difficulty.

For younger audiences, particularly users under the age of 13, a dedicated “Child Mode” is available. This mode disables blood effects and gore sounds to ensure a more age-appropriate, family-friendly gaming environment.

#### Future Possibilities to Increase Accessibility

Looking ahead, AstroCat is being considered for further expansion in accessibility and convenience. Future plans include making the game available on mobile platforms to support users who prefer gaming on the go. Additionally, a colorblind-friendly mode is being explored to better serve players with specific visual challenges.
While these features significantly enhance the inclusivity and usability of the game, they may contribute to increased energy consumption in order to maintain performance across all platforms and modes.

## Conclusion

- 10% ~500 words

- Reflect on project as a whole. Lessons learned. Reflect on challenges. Future work. 

## Contribution Statement

| Team Member | Contribution |
|-------------------|--------------|
| Luke Remus Elliot | 1.0 |
| Fred Clamp-Gray | 1.0 |
| Matt Matloubi | 1.0 |
| Yoda Monplub | 1.0 |
| Will Nixon | 1.0 |
| Dylan Haye | 1.0 |

## References

Harris, J. (2020) *Exploring Roguelike Games*. Boca Raton: CRC Press.

Jenkins, D. (2020) *Doom Eternal hands-on preview and interview – if chess was an arcade shooter*. Available at: https://metro.co.uk/2020/01/21/doom-eternal-preview-interview-chess-arcade-shooter-12095644/ (Accessed: 2 May 2025).
