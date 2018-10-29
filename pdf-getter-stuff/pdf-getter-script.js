//importing file system & request module
const fs = require('fs');
const request = require('request');

//getting DOM elements
//contentList is populated with the list of targets
const contentList = document.getElementById("contentList");

//getPdfButton gets an event handler added to listen for clicks & then run getPdfs()
const getPdfButton = document.getElementById("getPdfBtn");

//functions that "Do Stuff"

//helper function that gets & parses the list of targeted pdfs for both populateList & getPdfs
function getListObjs() {
  return JSON.parse(fs.readFileSync('target-list.json', 'utf-8'));
}

//populates the list with entries from the target-list.json file located in the root dir.
function populateList() {
  const parsedJson = getListObjs();
  parsedJson.map(x => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'list-group-action');
    li.textContent = x.resource_name;
    contentList.appendChild(li);
  });
}

//requests the pdfs & saves them to a "Temp" folder located in root dir. Make changeable later?
function getPdfs() {
  const today = new Date();
  const list = getListObjs();
  fs.mkdirSync(`./temp/${today.toDateString()}`);
  for (x = 0; x < list.length; x++) {
    request(list[x].url).pipe(fs.createWriteStream(`./temp/${today.toDateString()}/${list[x].resource_name}.pdf`), () => {
      console.log('Downloaded Resource' + (x+1))
    });
  };
  //changed from streams to iterator + callbacks because of trouble with frequent incomplete downloads
//   list.map(x => {
//     request(x.url).pipe(fs.createWriteStream(`./temp/${today.toDateString()}/${x.resource_name}.pdf`));
//   });
}

//attach an event handler for the "Get Pdfs" button
getPdfButton.addEventListener("click", () => { getPdfs() });

//calls the function that populates the list. 
populateList();