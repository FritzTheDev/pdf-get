const electron = require('electron');
const url = require('url');
const path = require('path');
const fs = require('fs');

//get electron properties via destructuring
const { app, BrowserWindow, Menu, ipcMain } = electron;

//create global reference to window to dodge garbage collection
let pdfGetter;

//listen for ready
app.on('ready', () => {

  //create new window
  pdfGetter = new BrowserWindow({height: 800, width: 1200});

  //load html into window
  pdfGetter.loadURL(url.format({
    pathname: path.join(__dirname, 'pdf-getter.html'),
    protocol: 'file:',
    slashes: true
  })); //above three lines == file://dirname/mainwindow.html
});

ipcMain.on('switchToSummarizer', () => {
  pdfGetter.loadURL(url.format({
    pathname: path.join(__dirname, 'summarizer.html'),
    protocol: 'file:',
    slashes: true
  }));
});