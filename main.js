const electron = require('electron');
const url = require('url');
const path = require('path');
const fs = require('fs');

//get electron properties via destructuring
const { app, BrowserWindow, Menu, ipcMain } = electron;

//create global reference to window to dodge garbage collection
let mainWindow;

//listen for ready
app.on('ready', () => {

  //create new window
  mainWindow = new BrowserWindow({height: 800, width: 1200});

  //load html into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainwindow.html'),
    protocol: 'file:',
    slashes: true
  })); //above three lines == file://dirname/mainwindow.html

  //build menu from template
  // const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  //set menu
  // Menu.setApplicationMenu(mainMenu);
});

ipcMain.on('item:add', (e, item) => {
  console.log(item);
  fs.writeFileSync('config.json', item, (err) => {
    console.log('Error adding to list. Contact Fritz');
  });
});

//main menu template
const mainMenuTemplate = [
  {
    label: 'File',
  }
]