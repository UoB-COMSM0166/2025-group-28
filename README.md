# 2025-group-28
2025 COMSM0166 group 28

![pp](Requirements/banner.gif)


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

‘Time spent with cats is never wasted’ 

Unkown/Everyone who’s ever played AstroCat 

 

Our game is called AstroCat. It is the story of cats have found themselves on a spaceship and have to defeat hoards of Space Dogs in order to explore the endless rooms of their new galactic home.  

The game can be played with one or two players using the two control sets on the same keyboard. The objective is to kill the  evil enemy space dogs and progress to the next room.  There are a range of these Space Dogs – some can fire projectiles, and some can teleport around the room.  AstroCat’s gun can overheat and stop working if you’re too trigger-happy, but defeated enemies can leave health and energy powerups to be collected to recover.  There is no endgame –  the aim is simply to get as far as you can, because once you’re dead, it’s back to room 1!  

However, AstroCat has a special ability that gives the gameplay a unique twist: Slow Meow. This slows the enemies and the projectiles down, but AstroCat can still move around like a cat on a hot tin roof! This ability is rechardged through killing enemies.  

 
AstroCat is based on 2D rogue-like games, featuring distinct procedurally-generated game environments and a ‘permanent death approach’.  especially the game ‘Binding of Isaac’,  from which we took a lot of inspiration from in terms of gameplay, such as the playing environment being confined to small rooms seen by the player from a top-down perspective.  The game also takes aesthetic cues from arcade and early video games, with a  retro-style soundscape and pixel-art based design assets and fonts.  

### Requirements 
The first stage of our requirements-gathering process was to identify what kind of game AstroCat was going to be. Initially, we had two game ideas: a tower-defence style game, and a 2D shooter style game. From an early stage, we decided on the theme of the game (a cat protagonist in a space environment), and that a challenge we wanted to integrate would be co-operative play.  

 

At first, we were most inspired by the idea of creating a tower-defence game, taking inspiration from titles such as Bloons2D. However, undertaking  our first stage of requirements engineering using paper-prototypes  (the first time we had exposed our ideas to others ), caused us to reconsider our direction. 

![pp](Requirements/Untitled.gif)


When we translated our ideas to physical paper, we found that the 2D shooter ‘AstroCat’ flowed much better, and this was echoed by our test users to whom we showed the paper prototypes, who indicated a preference for the 2D shooter variant over the tower-defence variant.  

 

Idea Development 


| ![boi](https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/113200/ss_d2dd031f581bcad380ed5a6065c8908329cf1115.1920x1080.jpg?t=1643480517) | ![bh](https://image.api.playstation.com/cdn/EP2575/CUSA08065_00/FREE_CONTENTTnvCkXugey5cdBc7TzX8/1.jpg) |
| :--: | :--: |
| *'Binding of Isaac' - note top-down viewpoint and room game space* | *'Bloons TD' - typical tower defence game* |

We paper-prototyped our takes on the these two genres - both themed around a cat in space (the space environment allows us the most freedom in terms of fun new game mechanics/physics). Despite going in to the session with the tower-defence game most developed, the prototyping of our 2D shooter game flowed more readily  and also recieved the most positive feedback from our test users.

///link to pp video///




[what we did for reqs, pp etc.]




## Stakeholders and Users

<onion model> 

Next, we thought about who might play AstroCat, and what differing requirements they might have. We conceptualised diverse user types using a set of personas, translating their needs in to epics and user stories. Our personas and their user stories were as follows: 

 

<user personas> 

 

Requirements engineering involves making decisions about what requirements you can meet and which you can’t. We used the MoSCoW and value-to-effort approaches to help identify which requirements we would prioritise, informed by feasibility studies to understand which requirements would require a lot of time and effort: 

 

Feasibility study 
 

We had more technical-focussed whiteboard sessions to help identify the technical feasibility of different ideas. 
We want everybody to experience AstroCat, so we thought about our game from the perspective of different user profiles, each with different needs and wants. We evaluated the user stories based on need, timeframe, and techncial complexity (e.g. through feasibility studies in our Sandbox), and created corresponding epics/stories in our backlog, waiting to be candidates for future sprints if we have the resources:



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

### Behavioural Diagrams 

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

### Sustainability, Ethics and Accessiilty

# Environmental Sustainability 




During the development of AstroCat, we became conscious of how the decisions we made had an impact on our environment. In some cases, performance issues we encountered with our game turned out to also be environmental issues, due to the relationship between memory consumption and both user experience and energy usage. This resulted in us considering how changing our use of assets (images, gifs, etc.) could reduce the environmental impact of our game, and improve game performance. We consulted Green Software Patterns catalogue, and decided to incorporate the following in to the design of our game: 



Minimising use of GIFs - as highlighted here, GIFs are an outdated and memory-hungry means of displaying animated content – more modern formats such as MP4s etc consume less memory for the same quality and are therefore more energy efficient. The Green Software Foundation's Green Software Patterns recommened [depreacting GIFs in favour of MP4s](https://patterns.greensoftware.foundation/catalog/web/deprecate-gifs).

We converted our looping main menu animation from a GIF to a mp4 video. Our initial menu backgrond was a gif of nearly 90 MB, whilst an equivalent length and resolution MP4 occipied less than a quarter of that size (18 MB).  We used a Fireforx plugin (Carbonanalyser) to estimate the energy consumption of our game with our original menu background as a GIF, and then did the same with the MP4. Our results below show how this change reduced energy consumption: 
 

![Carbon Usage](https://github.com/user-attachments/assets/051f7e57-63e7-4996-a6e7-712ba6e497d8)


 
This has a postive impact on Astro Cats Software Carbon Intensity score by reducing the 'E' (energy) component in the score's formula (SCI = (E * I) + M per R). Even the MP4 version of our original background was large, so to reduce the performance impact of our menu further  we created a smaller background video more inline with the game's style (using around 1.5 MB).


**Trade-off: GIFs versus native animation:**


Despite the relative ineffeciency of GIFs, we used them extensively for our in-game sprites, including AstroCat. AstroCat's responsive animation is implemented by manipulating the frame range being played of a single 20-frame GIF of AstroCat, which contains all the sprite's possible movements. This proved to be an effective way of having AstroCat's movement and appearence respond to user inputs, only requiring a few lines of code to implement movements:

 <img width="585" alt="Screenshot 2025-05-06 at 17 04 16" src="https://github.com/user-attachments/assets/48cfbcfe-7d30-4e9a-8dda-96d0ccd47770" />

The AstroCat gif requires 10 KB of memory. To implement the same complexity of animation using PNGs would require 16 KB of memory used for PNGs, and additional energy consumption from increased code complexity to implement the animation:


![astrocatM7](https://github.com/user-attachments/assets/f2dbe04f-eea6-4367-b13c-3b2c781a4a34)![astrocatM7-1 png](https://github.com/user-attachments/assets/c1dbc72e-8185-40e6-98b1-30c9542dc621)

  

 




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
