const electron = require('electron');
const fs = require('fs');
const request = require('request');


const contentList = document.getElementById("contentList");
const getPdfButton = document.getElementById("getPdfBtn");
// Populates the list with entries
function populateList() {
  const parsedJson = getListObjs();
  parsedJson.map(x => {
    const button = document.createElement('button');
    button.classList.add('list-group-item', 'list-group-action');
    button.textContent = x.resource_name;
    contentList.appendChild(button);
  });
}
function getPdfs() {
  const today = new Date();
  const list = getListObjs();
  fs.mkdirSync(`./temp/${today.toDateString()}`);
  list.map(x => {
    request(x.url).pipe(fs.createWriteStream(`./temp/${today.toDateString()}/${x.resource_name}.pdf`));
  });
}

getPdfButton.addEventListener("click", () => {getPdfs()});
populateList();

//helper function that gets & parses the list of targeted pdfs
function getListObjs() {
  return JSON.parse(fs.readFileSync('target-list.json', 'utf-8'));
}