Personal Dashboard

What:
A personal homepage to store useful info links and resources such as:
- A customisable to-do list
- Weather for your location
- Date and time
- Interesting facts
- Favourite websites 
- Art of the day
- Something to do generator

Ideas for features:
- Toggle dark mode on and off
- Add and remove "widgets" 
- Add and remove links

How:
Frontend:
* Brainstorm features and info
* Design a prototype on Figma
* Write HTML and CSS following the prototype
* Write JavaScript DOM manipulation
## To do:
#### Header
- [X] current date and time saved to variable ``time`` which is updated every 60 seconds
- [X] nav bar that opens and closes on click of icon
- [X] ``<h1>`` containing title
#### Footer
- [X] footer with ``<p>`` containing info about website
#### Weather
- [X] weather widget
#### Gallery
- [X] gallery displays image and info
- [X] heart button turns red on click
#### Poetry
- [X] poetry displays poem snippet and info
- [X] heart button turns red on click
#### Favourites
- [ ] favourites
#### Idea generator
- [X] idea generator displays an idea 
- [X] on click of refresh button the idea changes
#### Goals
 - [X] inputs and buttons can be used to add a new goal
 - [X] select options change the order of the list items
 - [X] on click, the stars change colour and flag the list item as "starred" so that the user can put them to the top of the list if desired using one of the select options mentioned above
 - [X] see all button (currently leads nowhere)
#### Things to do
- [X] sorting and priority-flagging functionality complete

Backend:
* Create a database to store the user's to-do list on Railway
* Create a database to store the user's favourite links on Railway
* Create a database to store the user's things to do
* Pull interesting facts from an API
* Pull weather info from an API
* Make a JSON of art to display a random "image of the day"
* Make a JSON of interesting facts