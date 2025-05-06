# 2025-group-28
2025 COMSM0166 group 28
# Our Game: AstroCat
<div align="center">
 
<img src="Requirements/banner.gif" width="10000">

[<img src="https://github.com/user-attachments/assets/bd98ef6e-f613-4d44-b601-7af35172aa4f" width="550">](https://uob-comsm0166.github.io/2025-group-28/)
</div>


## Our Group


![grouppic](https://github.com/user-attachments/assets/ec5b17da-6882-42b0-a55c-42023ebdaffb)

|Name|Email|GitHub|Role|Halloween costume in group image|
|----|-----|------|----|--------------------------------------|
|Luke Remus Elliot |pm24104@bristol.ac.uk | whileLuke |role  |Chrollo|
| Fred Clamp-Gray | ey24984@bristol.ac.uk | fred1778 | Scrum Master & Front-End developer | Julius Caesar |
|Matt Matloubi |dv24149@bristol.ac.uk |mattmatloubi |role | Sully |
|Yoda Monplub | ds24614@bristol.ac.uk | Yoda-Yothada | role | Yoda |
|Will Nixon | zk24610@bristol.ac.uk | spockthewok | role | tiger/tigger|
|Dylan Haye | jk24742@bristol.ac.uk | dxlxnhxxe |role |No.5|


## Project Report

### Introduction

![Untitled-4](https://github.com/user-attachments/assets/4e9927a0-c3e3-43a6-b144-0e3dbb921435)


 

Our game is called AstroCat. It is the story of cats have found themselves on a spaceship and have to defeat hoards of Space Dogs in order to explore the endless rooms of their new galactic home.  

The game can be played with one or two players using the two control sets on the same keyboard. The objective is to kill the  evil enemy space dogs and progress to the next room.  There are a range of these Space Dogs – some can fire projectiles, and some can teleport around the room.  AstroCat’s gun can overheat and stop working if you’re too trigger-happy, but defeated enemies can leave health and energy powerups to be collected to recover.  There is no endgame –  the aim is simply to get as far as you can, because once you’re dead, it’s back to room 1!  

However, AstroCat has a special ability that gives the gameplay a unique twist: Slow Meow. This slows the enemies and the projectiles down, but AstroCat can still move around like a cat on a hot tin roof! This ability is rechardged through killing enemies.  

 
AstroCat is based on 2D rogue-like games, featuring distinct procedurally-generated game environments and a ‘permanent death approach’. especially the game ‘Binding of Isaac’,  from which we took a lot of inspiration from in terms of gameplay, such as the playing environment being confined to small rooms seen by the player from a top-down perspective.  The game also takes aesthetic cues from arcade and early video games, with a  retro-style soundscape and pixel-art based design assets and fonts.  



## Requirements 

The first stage of our requirements-gathering process was to identify what kind of game AstroCat was going to be. Initially, we had two game ideas: a tower-defence style game, and a 2D shooter style game. From an early stage, we decided on the theme of the game (a cat protagonist in a space environment), and that a challenge we wanted to integrate would be co-operative play.  

 

At first, we were most inspired by the idea of creating a tower-defence game, taking inspiration from titles such as Bloons2D. However, undertaking  our first stage of requirements engineering using paper-prototypes  (the first time we had exposed our ideas to others ), caused us to reconsider our direction. 

![pp](Requirements/Untitled.gif)


When we translated our ideas to physical paper, we found that the 2D shooter ‘AstroCat’ flowed much better, and this was echoed by our test users to whom we showed the paper prototypes, who indicated a preference for the 2D shooter variant over the tower-defence variant.  

 

Idea Development 


| ![boi](https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/113200/ss_d2dd031f581bcad380ed5a6065c8908329cf1115.1920x1080.jpg?t=1643480517) | ![bh](https://image.api.playstation.com/cdn/EP2575/CUSA08065_00/FREE_CONTENTTnvCkXugey5cdBc7TzX8/1.jpg) |
| :--: | :--: |
| *'Binding of Isaac' - note top-down viewpoint and room game space* | *'Bloons TD' - typical tower defence game* |




# Stakeholders and Users

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
(conducted at week 7 with 5 participants)

Heuristic Evaluation
| Interface | Issue | Heuristics | Frequency (0=rare, 4=common) | Impact | Persistence | Severity ((F+I+P)/3) | Our fix |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| Sticky walls | Collision logic between players and walls need enhancement | flexibility and efficiency of use | 4 | 4 | 3 | 3.67 | https://github.com/UoB-COMSM0166/2025-group-28/issues/50 |
| Too easy | Need more challenging levels | consistency and standards | 3 | 2 | 4 | 3 | https://github.com/UoB-COMSM0166/2025-group-28/issues/115 |
| Progress/goal tracking | Need to show health bar, SlowMeaw percentage, and overheating bar | visibility of system status  | 2 | 2 | 4 | 2.67 | https://github.com/UoB-COMSM0166/2025-group-28/issues/137 |
| Only one kind of enemy | Need more type of mobs, with standardize artwork style | consistency and standards | 1 | 1 | 3 | 1.67 | https://github.com/UoB-COMSM0166/2025-group-28/issues/112, https://github.com/UoB-COMSM0166/2025-group-28/issues/127, https://github.com/UoB-COMSM0166/2025-group-28/issues/54 |
| Single player keyboard | We are using standard ASWD key to move, but some players might want to use an the arrow keys instead. | recognition rather than recall, user control and freedom | 2 | 2 | 1 | 1.67 | TBC |
| After death experience | Bugs in game over screen | help users recognise, diagnose and recover from errors | 1 | 1 | 1 | 1 | https://github.com/UoB-COMSM0166/2025-group-28/issues/116 |


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

![image](https://github.com/user-attachments/assets/545c05d8-5a7e-41d5-97d2-8807a0a70104)


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

![image](https://github.com/user-attachments/assets/d59cbe31-9066-43c5-bfbd-b32f7ffee11a)


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

Our team cohesion was very high, and we have had an amazing time working together as a group. We have all brought unique and intelligent suggestions to the game and have all been switched on and willing to give both positive and negative feedback on gameplay ideas. No one took negative feedback harshly and we fostered a strongly positive working environment. The team fell quite naturally into roles: 

Fred is organised and good at holding people accountable, with previous Agile experience in his past job, so it made most sense to give him the role of Scrum Master. Yoda and Dylan are talented artists with a strong eye for detail, so they became our Lead Designers. Matt, Luke and Will are strong coders with the knowledge and drive necessary to lead the Backend Development. Will was also responsible for the Sound Design of the game, as his previous experience as a Music degree graduate and an audio mod creator came in handy. All our team brought unique ideas and perspectives as we come from a wide variety of undergraduate backgrounds and this wide range of knowledge really helped us excel. Our team are all astute, hard-working and each of us were responsible for several of the ideas that made it to the final game design. We have loved working together as a team. 

Fred – Frontend Developer + Scrum Master 

Matt, Luke – Backend Developer 

Yoda, Dylan – Frontend Developers + arts & design 

Will – Backend Developer + sound design 

 

We followed the Agile Manifesto, focusing on the agile principles: 

We used face to face communication, asking our friends and families to play the game and taking on board any feedback. 

We embraced change and have been consistently willing to update and change features that have received negative feedback. 

We delivered working software frequently, from our MVP to our many updated versions, AstroCat has existed in playable form since early February and has had many updates over the weeks. Often, we would end up releasing new features and new working versions of the product multiple times per week. 

 

We have reflected regularly on our performance. We did so throughout sprints during stand-up meetings and by having sprint retrospective meetings at the end of each sprint.  

 

We built our team around motivated individuals. We are all high achieving students, and we all listed our effort as 100% for the team building exercise. We are like minded in our commitment to making the game as good as it can possibly be and have all been very devoted to it throughout. 

 

We minimised the amount of unnecessary work. 

 

We paid continual attention to technical efforts. Where relevant, the team refactored code, adding functionalities to methods, adapting them to be reused for other features. For example, makeInvincible was originally hard coded to last 1 second, but with a slight tweak, it was then possible to adapt how long the sprites were invincible depending on the game mode. 

 

We worked at a steady, sustainable pace. Everyone’s rhythm was adapted to their needs.  

 

Our sprint velocity varied greatly due to members having other commitments over the course of the term. As a result, our sprints varied in length.  

This leads into our commit history diagram, with our three and a half sprints clearly shown by colour: 

 
![image](https://github.com/user-attachments/assets/8207dca6-cbf7-4a72-ba9a-d1ec0aec8bd2)


Sprint Breakdown 


Sprint 1: 16th January to 12th February 

The main goal of this sprint was to develop a Minimum Viable Product (MVP). We focused on getting the core gameplay mechanics working. By the end of this sprint, we had a working prototype with basic functionality and temporary assets, ready for us to expand upon in sprint 2. 

Sprint 2: 13th February to 2nd April  

Over the course of this sprint, the team focused on expanding the game’s scope and perfecting its visual style. We also first introduced the game’s main twist, “Slow Meow”, a slow-motion ability that AstroCat can use. We introduced the following features: 

Multiple rooms with doors as transitions between them 

Custom assets 

New mob types, adding variety and challenge to the gameplay 

The goal of this sprint was to improve the MVP and focus on creating a complete feeling and visually engaging game. 

Sprint 3: 3rd of April to the 28th of April 

In this sprint, we updated the “Slow Meow” mechanic, the defining twist of our game. We focused on:  

Slow meow balance, ultimately tweaking the twist several times until it felt rewarding, useful and fun to use 

General gameplay balance for better pacing, making sure to start with easier rooms and increase difficulty as the player progresses 

Updating mob AI for better pathing, with unique mob patterns for variety 

Overall polish, focusing on UI tweaks, animations and quality-of-life improvements for the user (such as being able to change keybinds or view clear instructions in game), 

PvP mode as user feedback suggested it would be fun for players to compete against each other 

Player score, so that progressing through rooms and killing mobs felt more meaningful 

 

Sprint 3.5: 29th of April to 5th May   

A short sprint to resolve technical debt and ensure the code remained readable and concise. We removed redundant assets, refactored overcomplicated methods, and cleaned up the project’s structure so that the game would be in a good state to move forwards for our future plans. The layout is clear for any future developers’ benefit. 



Agile Methods 

We kept things simple and effective when it came to communication. In person meetings were our go-to for deeper discussion and reflective decision-making. Outside of working hours, we leaned heavily on WhatsApp. It was our main space to share updates, quick questions and check in with each other. We would often update the Kanban board whenever anything significant was to be fixed, implemented or changed. When we couldn’t meet in person, FaceTime helped fill in the gaps with personal, real-time conversations. 

<img width="452" alt="image" src="https://github.com/user-attachments/assets/90b7e975-649f-4d87-b87a-86d111189c06" />


We decided to have our daily standup meetings every other day. They were another key part of staying on the same page while enabling us to squeeze in outside priorities. It gave us a chance to share what we were implementing and listen to what the rest of the team was focused on. This always kept everyone in the loop and helped move things forward. 

 <img width="315" alt="image" src="https://github.com/user-attachments/assets/8bd66aec-57a7-449e-90b8-ff3fab9a78e2" />


We equally prioritised a close collaborative environment. Pair programming was a technique we used regularly to share knowledge, catch bugs early, and just generally write better code. Pull requests were also essential. Thanks to this, we didn’t simply merge code but also gave everyone a chance to review and suggest improvements before anything hit the main branch. 

Our commit messages remained thorough and expansive, with enough detail to tell the story of our work. Through this, we facilitated understanding as to what was done and why. This was beneficial whenever someone needed to revisit the logs or debug an error. 

 <img width="411" alt="image" src="https://github.com/user-attachments/assets/3d1e2bde-6ece-465b-8858-12a763bc4aeb" />


We structured our work around 4 sprints, though the length of each sprint varied depending on personal commitments outside of the project. This flexibility worked well for us as we stayed committed without overworking ourselves. In terms of task management, we used Planning Poker to estimate task complexity, which always sparked a good conversation, helping us align expectations and appropriately update the Kanban board. 


Kanban was the backbone of our task management system. Every task had a clear place whether it was in the backlog, in progress, in testing or already merged. It gave us visibility into what was happening at any given time, assuring ourselves nothing was missed or forgotten. 

<img width="401" alt="image" src="https://github.com/user-attachments/assets/8ca37f67-7435-4efe-9dc8-e5f60312cda5" />


### Sustainability, Ethics and Accessiilty

### Technical Sustainability

AstroCat demonstrates technical sustainability through key software quality dimensions. In terms of maintainability, the game benefits from its modular structure where gameplay logic, UI, and procedural generation are separated, making it easier to debug, update, and refine specific systems without impacting the whole game. The retro aesthetic and pixel-art assets also reduce complexity, easing asset management and modification.

Usability is addressed with simple, intuitive controls for one or two players using the same keyboard. The consistent visual design and clear gameplay mechanics, such as overheating and the Slow Meow feature, contribute to a smooth user experience. For further improvement, future iterations could include brief in-game tutorials or customizable controls.

Extensibility and adaptability is supported through the game’s rogue-like structure. Our enemy generation process and their behavior (e.g., teleporting or firing) enables easy development for future content like new enemy types, room styles, or gameplay modifiers. Similarly, the game could be adapted to different platforms, control schemes, or accessibility modes with reasonable development effort.

Finally, scalability is achieved by our design choice of procedurally generated rooms and endless progression. This ensures the game remains challenging without requiring linear level design, allowing for potentially infinite expansion without heavy overhead.

Overall, AstroCat’s, modular design, and procedural mechanics provide a sustainable technical base that supports both current functionality and future growth.



### Environmental Sustainability 




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

  
### Social Sustainability and Accessibility


AstroCat was developed with social sustainability at its core, aiming to create an inclusive gaming experience that caters to users with diverse backgrounds, needs, and preferences. The game's design ensures that individuals across various user profiles can access and enjoy its features without barriers.

To accommodate visually impaired users, AstroCat avoids relying on color-based cues. All in-game mobs are uniquely designed in both appearance and sound, allowing players to distinguish between them using auditory and visual differences rather than color alone. This enhances accessibility for players with limited or no color perception.
The game also supports social gameplay through modes tailored for paired users, such as siblings or friends. The inclusion of Co-op and Player vs. Player (PVP) modes promotes shared experiences and interactive fun. Additionally, AstroCat addresses varying skill levels and player engagement styles by offering multiple difficulty settings. Competitive gamers can challenge themselves with the intense "Apex" difficulty, while casual players can enjoy a more relaxed experience through the "Kitten" difficulty.
For younger audiences, particularly users under 13 years old, a dedicated “Child Mode” is available. This mode disables blood effects and gore sounds to ensure a more age-appropriate, family-friendly gaming environment.

**Future Possibilities to Increase Accessibility**

Looking ahead, AstroCat is being considered for further expansion in accessibility and convenience. Future plans include making the game available on mobile platforms to support users who prefer gaming on the go. Additionally, a colorblind-friendly mode is being explored to better serve players with specific visual challenges.
While these features significantly enhance the inclusivity and usability of the game, they may contribute to increased energy consumption in order to maintain performance across all platforms and modes.

 




### Conclusion

- 10% ~500 words

- Reflect on project as a whole. Lessons learned. Reflect on challenges. Future work. 

### Contribution Statement

| Team Member | Contribution |
|-------------------|--------------|
| Luke Remus Elliot | 1.0 |
| Fred Clamp-Gray | 1.0 |
| Matt Matloubi | 1.0 |
| Yoda Monplub | 1.0 |
| Will Nixon | 1.0 |
| Dylan Haye | 1.0 |

### Additional Marks

You can delete this section in your own repo, it's just here for information. in addition to the marks above, we will be marking you on the following two points:

- **Quality** of report writing, presentation, use of figures and visual material (5%) 
  - Please write in a clear concise manner suitable for an interested layperson. Write as if this repo was publicly available.

- **Documentation** of code (5%)

  - Is your repo clearly organised? 
  - Is code well commented throughout?
