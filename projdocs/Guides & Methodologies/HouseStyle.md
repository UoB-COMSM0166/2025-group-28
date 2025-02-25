# House Style Guide

## A: Syntactical Conventions

**1 Indentation**
- Code should be indented within every new scope by 2 spaces.

**2 Brackets**

- Expressions in if statements should be bracketed, as should should all in-place evaluations.

**3 Statements**

- Each statement should end with a ';' whether or not the language enforces this.
  
- Each allocation/instantation of a variable/object should be on a new line.
  
**4 Classes & Objects**
  
- When referring to an object's attribute within itself, the 'this.variable' syntax should be used.
  
- Classes should always provide implementations for abstract methods or methods where the parent method is not suitable, even where this is not enforced in the language.

## B: Naming Conventions

**1 Variables**

- Variables should be descriptive, and be lowercase or camelCased if more than one word
- Global constants, e.g. for images, should be all caps.
  
**2 Functions**
  
- Function names should follow a verb-noun form where possible, e.g. getPosition or decreaseHealth.
- Except for common processes e.g. draw(), update(), ames should be at least one word and camelcased.
- Arguement parementers should follow the same naming conventions as variables.
- 
**3 Classes**
  
- Classes should be have simple names that describe what they represent, either a noun or a 'doer' word - e.g. 'Game' or 'DataParser'
- Class names should always be capitalised
- Object constructor paramenter names should be distinct from the object's attribute names, e.g. avoid ;'this.name = name'


## Example Code....
`let ASTROCAT_IMAGE; // Global variable is in caps
class AstroCat{ // class has simple capitalised name
   var xPosition; // indented by 3 spaces
   var yPosition;
   var health;
   constructor(xPos, yPos, start_health){
      this.xPosition = xPos; // Parameter names distinct from attribute names
      this.yPosition = yPos;
      this.health = start_health;
   reduceHealth(){ // Method has verbNoun camelcase     
}`
