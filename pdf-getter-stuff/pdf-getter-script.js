const electron = require('electron');
const fs = require('fs');
fs.readFile('target-list.json', (err, data) => {
  if (err) throw err;
  const parsedJson = (JSON.parse(data));
  const contentList = document.getElementById("contentList");
  parsedJson.map(x => {
    const button = document.createElement('button');
    button.classList.add('list-group-item', 'list-group-action');
    button.textContent = x.resource_name;
    contentList.appendChild(button);
  });
});