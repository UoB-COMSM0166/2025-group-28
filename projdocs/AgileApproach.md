# Agile Approach

## Overview ##

We are using GitHub projects to track our work trhough a Kanban board. We use this for both development work, and broader tasks such as ideation, documemetation, and planning. Our implentation of an Agile methodology involves:
  - **Epics** (issue type 'feauture' in GitHub projects)
    - Feautures we plan to deliver/broader design objectives that have quantifiable stories as sub-tasks
  - **Stories**
    - Every story is part of an epic. 
    - Stories are clearly-defined tasks with a user story and acceptance criteria where they correspond to development         activities.
  - **Bugs**
    - When a defect is found on the main branch, a bug should be raised and linked to the appropiate epic. These will be       triaged at sprint planning and allocated to a sprint accordingly.
   
We work in sprints, which given the relativley short time frame of this project, are a **week long**, and run from Fridays to Fridays. Our sprint cycle is as follows:
  - **Fridays** - sprint planning and assignment
  - **Tuesdays** - Mid-sprint checkpoint - discuss anything that needs to be put back/brought forward in to the sprint.



## Quality Management ##
In order to leverage the visibility of our project that Agile provides, we have integrateed testing into the core of our process, with an 'in test' column. For an item to move from this column to 'done' requires the following:


![Screenshot 2025-02-09 at 15 58 01](https://github.com/user-attachments/assets/f29f10c3-22e1-4e44-9a06-ac896559b474)


  - **Stories** Acceptance criteria has been met and code executes with no issues. Ticket should be updated with proof (e.g. screenshot) of test passing.
  - **Epics** All stories that are part of the Epic have passed their tests, and the feauture has undergone black-box user acceptance testing (e.g. checking the feautures works as expected).
  - **Bugs** Fixes for these should be tested and documented before Bug tickets can move to Done. 



