# 2025-group-28
# AstroCat

2025 COMSM0166 group 28



## Quick Links
Weclome to AstroCat! Here are some key resources elsewhere in our repo to sink your paws in to:

Our Kanban board can be found [here](https://github.com/orgs/UoB-COMSM0166/projects/102/views/4).

Other docs to explore:
- Our [Agile Methodology documentation](https://github.com/UoB-COMSM0166/2025-group-28/blob/main/projdocs/Guides%20%26%20Methodologies/AgileApproach.md)
- Our [coding House Style guide](https://github.com/UoB-COMSM0166/2025-group-28/blob/0b117a29b753fcb3a977b6115e14fc687edeecb2/projdocs/Guides%20%26%20Methodologies/HouseStyle.md)
- [Project Wireframe](https://github.com/UoB-COMSM0166/2025-group-28/blob/main/projdocs/Design%20Artefacts/Wireframe.md)
- The AstroCat [Pinterest Board](https://pin.it/1VpPiL6jl)




## Your Game

Link to your game [PLAY HERE](https://uob-comsm0166.github.io/2025-group-28/)

Your game lives in the [/docs](/docs) folder, and is published using Github pages to the link above.

Include a demo video of your game here (you don't have to wait until the end, you can insert a work in progress video)

## Your Group


![grouppic](https://github.com/user-attachments/assets/ec5b17da-6882-42b0-a55c-42023ebdaffb)

- Luke Remus Elliot, pm24104@bristol.ac.uk, whileLuke, role (Chrollo)
- Fred Clamp-Gray, ey24984@bristol.ac.uk, fred1778, role (Julius Caesar)
- Matt Matloubi, dv24149@bristol.ac.uk, mattmatloubi, role (Sully)
- Yoda Monplub, ds24614@bristol.ac.uk, Yoda-Yothada, role (Yoda)
- Will Nixon, zk24610@bristol.ac.uk, spockthewok, role (tiger/tigger)
- Dylan Haye, jk24742@bristol.ac.uk, dxlxnhxxe, role (No.5)

## Project Report

### Introduction

- 5% ~250 words 
- Describe your game, what is based on, what makes it novel?

- +

### Requirements 

Our first game idea was inspired by tower-defence games (such as >>>[perosn who knows about games]<<<), with potential twists on this game mechanic being the ability to control the towers as opposed to just the players. Our second idea was inspired by room-based 2D-shooter games, principally 'Binding of Isaac', with the twist based on playing with relations health/resources/difficulty. A requirement we agreed on from the outset was that our game should be playable by two users on the same keyboard to provide a single-screen 'co-op' mode.


| ![boi](https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/113200/ss_d2dd031f581bcad380ed5a6065c8908329cf1115.1920x1080.jpg?t=1643480517) | ![bh](https://image.api.playstation.com/cdn/EP2575/CUSA08065_00/FREE_CONTENTTnvCkXugey5cdBc7TzX8/1.jpg) |
| :--: | :--: |
| *'Binding of Isaac' - note top-down viewpoint and room game space* | *'Bloons TD' - typical tower defence game* |

We paper-prototyped our takes on the these two genres - both themed around a cat in space (the space environment allows us the most freedom in terms of fun new game mechanics/physics). Despite going in to the session with the tower-defence game most developed, the prototyping of our 2D shooter game flowed more readily  and also recieved the most positive feedback from our test users.

///link to pp video///


![pp](Requirements/Untitled.gif)


[what we did for reqs, pp etc.]




## Stakeholders and Users

We want everybody to experience AstroCat, so we thought about our game from the perspective of different user profiles, each with different needs and wants. We evaluated the user stories based on need, timeframe, and techncial complexity (e.g. through feasibility studies in our Sandbox), and created corresponding epics/stories in our backlog, waiting to be candidates for future sprints if we have the resources:


| User Profile  | Requirements | Evaluation |
| :--: | :--: | :--: |
| Colourblind User | Epic: As a colourblind player, I want to apply to be able to play AstroCat effectively, being able to distinguish between players, objects, and HUD components.<br>User Story A: As a colourblind player, I want to able to toggle a high-contrast mode to make the game easier to see. <br>User Story B: As a colourblind player, I want to be informed of game state changes by visual cues (shapes, movement) other than colour. | [Epic: Visual Accessibility Options](https://github.com/orgs/UoB-COMSM0166/projects/102/views/4?pane=issue&itemId=98543333&issue=UoB-COMSM0166%7C2025-group-28%7C55)
| Siblings/Friends | Epic: As a user, I want to play the same game with my friends. <br> User Story A: As a pair of users, we want to play a game of AstroCat on the same computer sharing the same I/O devices. <br> User Story B: As a user, I want to be able to play AstroCat with another person remotely (online two-player co-op). | MVP includes [Co-Op multiplayer epic](https://github.com/orgs/UoB-COMSM0166/projects/102/views/4?pane=issue&itemId=98548558&issue=UoB-COMSM0166%7C2025-group-28%7C56) <br> Feasability test for online multiplayer conducted - potentially include post-MVP delivery. 
| Competitive Gamer | Epic: As a competitive user, I want to be able to monitor and enhance my performance. <br> User Story A: As a competitive gamer, I want to be able to see my performance stats at the end of each game. <br> User Story A: As a competitive gamer, I want to be able to see my performance stats at the end of each game. <br> User Story B: As a competitive gamer, I want the option to the change key-mappings to enable me to optimise my performance. |
| Casual Gamer | Epic: As a casual gamer, I want a game that can be played casually - in short bursts, engaging without requiring my full attention, and playable e.g. at night/in bed. <br> User Story A: As a casual gamer, I want a game mode (e.g. survival/easy) that enables me to enjoy the gameplay without worrying about progression. <br> User Story B: As a casual gamer, I want a game mode that has a softer colours/soundscape, to enable me to play relaxingly in the evening before I go to bed, without compromising my sleep.|


### Under 13s (Will)
Epic - have options to disable gore etc./profanity from the game
User Story: As a 12 year old whose parents are strict about games, I want to be able to play the game in a mode that will not cause me to get in to trouble.
AC: Given I am playing the game, 
User Story: Given I am a parent of a child who plays the game, I want to be able to use  prohibit objectionable content on the game, to stop my child being able to see nasty stuff. 

User story
 - As siblings/a couple/close friends we want to be able to play together online. So that we can enjoy the game together when we both want to play

Acceptance
Given that we are friends/dating etc
When we want to play games together online
Then we can play together


###  Competitive Gamer (Dylan)
User story
  - As a competitive gamer, I want to be able to see my performance stats at the end of each game.
  - As a competitive gamer, I want the option to the change key-mappings to enable me to optimise my performance.

### Casual Gamer (Yoda)
User story
  - As a gamer who plays the game at night, I would like soft sound/dark theme to be an option, so that the game does not keeo me awake.
- As a user who enjoys less intense games, I would like a simpler survival/easy mode to enable me to enjoy the gameplay without worrying about progression.

###  On The Go Gamers (Fred)
User story
  - As a user who games on my commute, I want the game to be able to be played on a mobile device in portrait mode.
  - As a user who games on the go, I want the game to function offline with as many feautures as possible, so I can enjoy the game where I have no internet connection.



## Feasibility Studies

For some feautures that came out of our requirements gathering, we conducted feasibility studies in parallel to our MVP development to assess whether these features were technically possible within the timeframe and tech stack avaialble to us. Below are the features we experimented with and our assesment of their possibility. We have a 'Sandbox' folder to store this experimental code.

| Feature | Study Details | Outcome |
| :--: | :--: | :--: |
| Co-op local multiplayer | Tested how p5.js would handle executing two sets of keyboard gameplay commands in parallel to move two sprites and <br> whether this would cause lag/overload the update() function and reduce the FPS | Platform is able to handle two parallel sets of gameplay inputs with no observable degradation of performance, <br> co-op local multiplayer included in MVP |
| Online multiplayer | Integrated a BaaS (backend-as-a-service) connection and used realtime database to track positions of players and reflect these on other client | We found it was possible to integrate a Supabase database and track changes, challenges would be <br> (a) avoiding rate-limiting by rationing position updates <br> (b) creating and managing multiple 2-player online sessions <br> (c) mirroring behaviour of AI/environment across clients. Will be explored further if time permits. |
| Procedural graphics generation | We experimented with algorithmicly generating different 'rooms'. | This proved feasible and was included in the MVP | 


Following our paper protyping session and our requirement gathering, we held several workshops to refine the game design in terms of both story/aesthetics, and also finalsing our twist.


## Further Evaluations

### HCI Evaluation
(conducted at week 7 with 6 participants)

Heuristic Evaluation
| Interface | Issue | Heuristics | Frequency (0=rare, 4=common) | Impact | Persistence | Severity ((F+I+P)/3) | Our fix |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| Sticky walls | Collision logic between players and walls need enhancement | flexibility and efficiency of use | 4 | 4 | 3 | 3.67 | https://github.com/UoB-COMSM0166/2025-group-28/issues/50 |
| Too easy | Need more challenging levels | consistency and standards | 3 | 2 | 4 | 3 | https://github.com/UoB-COMSM0166/2025-group-28/issues/115 |
| Progress/goal tracking | Need to show health bar, SlowMeaw percentage, and overheating bar | visibility of system status  | 2 | 2 | 4 | 2.67 | https://github.com/UoB-COMSM0166/2025-group-28/issues/137 |
| Only one kind of enemy | Need more type of mobs, with standardize artwork style | consistency and standards | 1 | 1 | 3 | 1.67 | https://github.com/UoB-COMSM0166/2025-group-28/issues/112, https://github.com/UoB-COMSM0166/2025-group-28/issues/127, https://github.com/UoB-COMSM0166/2025-group-28/issues/54 |
| Single player keyboard | We are using standard ASWD key to move, but some players might want to use an the arrow keys instead. | recognition rather than recall, user control and freedom | 2 | 2 | 1 | 1.67 | TBC |
| After death experience | Bugs in game over screen | help users recognise, diagnose and recover from errors | 1 | 1 | 1 | 1 | https://github.com/UoB-COMSM0166/2025-group-28/issues/116 |
| What is the main twist? | Multiplayer mode enhancement |  |   |   |   |   |


### NASA TLX and System Usability Scale (SUS) Evaluation
(conducted at week 8 with 10 participants)

NASA TLX Result
| User ID | EASY | Medium |
| :--: | :--: | :--: |
| 1 | 26.67 | 29.17 |
| 2 | 17.5 | 27.5 |
| 3 | 36.67 | 49.17 |
| 4 | 47.5 | 68.33 |
| 5 | 26.67 | 30 |
| 6 | 62.5 | 50 |
| 7 | 30 | 75.83 |
| 8 | 12.5 | 16.67 |
| 9 | 53.33 | 54.17 |
| 10 | 38.33 | 48.33 |

The table above is showing raw TLX scores, where the six dimensions are not weighted. To dive in further, our game scored well for Mental and Physical Demand but scored slightly worse in terms of Fustration and Temporal Demand. Which we collected further comments from participants to be implemented further.

SUS Result
| User ID | EASY | Medium |	
| :--: | :--: | :--: |
| 1 | 95 | 72.5 |	
| 2 | 77.5 | 50 |	
| 3 | 75 | 62.5 |	
| 4 | 82.5 | 65 |	
| 5 | 92.5 | 75 |	
| 6 | 60 | 45 |	
| 7 | 80 | 42.5 |	
| 8 | 100 | 85 |	
| 9 | 55 | 57.5 |	
| 10 | 80 | 62.5 |	

Based on studies, SUS score above 68 is considered the average. In our game, 80% of participants rated our game above average in easy mode and 30% did for medium difficulty. Which suggests more room for improvements, especially for medium difficulty.

Using Wilcoxon Signed-Rank Test, both test results got W test statistic of 7.5. With N=10 and significance value of 0.05, our W is below the critical value as shown in the table below. Therefore indicates 95% certainty that the difference in our result is significant. And can be used for further evaluations.
![image](https://github.com/user-attachments/assets/065c3956-1793-44a3-bc46-0e9aa5745a4d)


- 15% ~750 words
- Use case diagrams, user stories. Early stages design. Ideation process. How did you decide as a team what to develop? 

### Design

Having completed our initial requirements analysis, identifying key stakeholders, generating initiatives, epics and a collection of user stories, we were able to design the game itself, applying our initial vision to the needs and requirements of potential users. 

As a light, client-side only browser game, our development stack consists of JavaScript (p5.js) for the core game logic, and HTML/CSS for supplementary webpage design. 

In the simplest form, the game itself centres around AstroCat, the main playable character that ventures through an infinite number of rooms, killing enemies to score points.  

By performing a grammatical parse of the description above, we identified the core components of the game to build around: 

- AstroCat 
- Enemies 
- Rooms 

## Class Design

A class diagram provided us a way to formally apply the ideas listed above in an object-oriented manner, plan our development work and build a high-level blueprint of how we wanted the system to behave and be structured.  

The initial design revolved around the following key classes (See Fig X): 

- **Game**: this would be composed of the player(s), current room and score 
- **Sprite**: this is our abstract game character class 
- **Room**: this represented instances of an arena or level 
- **Player**: the playable character, AstroCat, extending Sprite 
- **Mob**: enemy characters, extending Sprite 


In the following development sprints, this base design was extended to accommodate additional requirements identified in sprint reviews and continuous user testing. Notable additions were (See Fig X+1): 

- **GameObject**: our core abstract class that represents any “thing” in the game – supplying them with a hitbox and position 
- ***Tile**: represented each square block in the room, this facilitated our random generation of walls and traps 
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

##Behavioural Diagrams 

Following on from the class diagram, drawing up a sequence diagram allowed us to model the interactions between different objects in the game and the order in which they occurred.  

In a typical gameplay loop, a room would be created, which would spawn mobs. The player would then have to shoot at the mobs and kill them. Once the player had killed all the mobs in the room, the game would then generate a new room, repeating this sequence. This is visualised in the diagram below (See Fig X+2) – where Game and Player are global variables persisting through the runtime states, interacting with the different objects of finite lifetimes. 

**Figure X+2**: Example combat & room progression sequence 
![image](https://github.com/user-attachments/assets/84e29cdf-692c-44ec-8789-52366a62b0a4)


## 

### Implementation

- 15% ~750 words

- Describe implementation of your game, in particular highlighting the three areas of challenge in developing your game.
- Collisions engine
- Getting the hang of branches/control whilst being agile

### Evaluation

- 15% ~750 words

- One qualitative evaluation (your choice) 

- One quantitative evaluation (of your choice) 

- Description of how code was tested. 

### Process 

- 15% ~750 words

- Teamwork. How did you work together, what tools did you use. Did you have team roles? Reflection on how you worked together. 

### Conclusion

- 10% ~500 words

- Reflect on project as a whole. Lessons learned. Reflect on challenges. Future work. 

### Contribution Statement

- Provide a table of everyone's contribution, which may be used to weight individual grades. We expect that the contribution will be split evenly across team-members in most cases. Let us know as soon as possible if there are any issues with teamwork as soon as they are apparent. 

### Additional Marks

You can delete this section in your own repo, it's just here for information. in addition to the marks above, we will be marking you on the following two points:

- **Quality** of report writing, presentation, use of figures and visual material (5%) 
  - Please write in a clear concise manner suitable for an interested layperson. Write as if this repo was publicly available.

- **Documentation** of code (5%)

  - Is your repo clearly organised? 
  - Is code well commented throughout?
