/* 
Trello List Export
Author: Dan Smith
Description: A JavaScript tool run in the browser console that allows data to be easily collected from Trello lists and output in markdown format. 
Version: 2.2.1
How to use: 
1. Visit your Trello board of choice and copy the code below into the 'Console' tab in Dev tools. 
2. You will then be prompted to type the name of a specific list. 
3. The name, ID and URL will then be output in the console log in Markdown format.

History

Version 2.2.1
- Fixed scope issue when targeting the card name. 

Version 2.2
- Encapsulated the legacy output for card names into a function. 
- Updated the logic for building the ID and name string to be more robust. 
- Added a new line to the beginning of the markdownOutput for readability purposes. 

Version 2.1
Updated Documentation and added a 'how to'. 

Version 2.0
Major version Update: 
- Added a Card object contructor. 
- Added the ability to retrieve the card URL. 
- Added a string builder that includes markdown output. 

*/   

/*
*** Copy the code below ***
*/

// Card object constructor
function Card(name, id, url){
    this.cardName = name;
    this.cardId = id;
    this.cardUrl = url;
}

// Our the array for the current list of cards
let cards = [];

// Define our list and choose it based on its name
names = document.querySelectorAll('.js-list-name-assist');
let myList;
let targetList = prompt("Which list would you like?", "Type the name of your list here");
let outputList;
names.forEach((name) => {
    if(name.innerHTML == targetList){
        myList = name;
    }
});

myList = myList.parentNode.parentNode;

// Fetch the names if this is all we need. 
myCardNames = myList.querySelectorAll('.list-card-title');

// Fetch the cards if we're a more detail-orientated person. 
myCards = myList.querySelectorAll('a.list-card');

// Create Card objects for each card in the list. 
myCards.forEach(item => {
    cardName = item.querySelector('.list-card-title').innerText.substring(item.querySelector('.list-card-title').innerText.indexOf(" ")+1,item.querySelector('.list-card-title').innerText.length);
    cardId = item.querySelector('.list-card-title').innerText.substring(1,item.querySelector('.list-card-title').innerText.indexOf(" "));
    cardUrl = item.href;
    card = new Card(cardName, cardId, cardUrl);
    cards.push(card);
})

// Basic String builder for displaying the names of the cards
function outputCardNames(){
    myCardNames.forEach((name) => {
        friendlyName = name.innerText.replace("#","T");
        friendlyName = friendlyName.substr(0,friendlyName.indexOf(" ")) + " - " + friendlyName.substr(friendlyName.indexOf(" ")+1,friendlyName.length);

        outputList = outputList + "\n" + 
        friendlyName;
    })
    console.log(outputList);
}

// Markdown String builder which outputs the Name, ID and URL of each card in the list. 
let markdownOutput = "\n";

cards.forEach((card) => {
    id = card.cardId;
    url = card.cardUrl;
    name = card.cardName;
    markdownOutputItem = "[T" + id + "](" + url + ") - " + name  +".\n";
    markdownOutput = markdownOutput + markdownOutputItem;
})
console.log(markdownOutput);