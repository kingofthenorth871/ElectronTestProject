const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');
const { electron } = require('process');

let parent
let child


const createWindow = () => {
    const parent = new BrowserWindow({ title: 'Parent' });
    parent.loadFile("index.html");
    const child = new BrowserWindow({title: 'child', height: 300, width: 300, parent: 'parent' });
    
    const startUrl = url.format({

        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',

    });


    parent.loadURL(startUrl);
    child.loadURL("https://www.gmail.com")

    child.setParentWindow(parent)
    child.isMovable(false)

    parent.on("resized", ()=> {console.log("window resized")

    

    parent.setSize(800,700, true)
})



};



//function createMainWindow() {



    //const parentWindow = new BrowserWindow({title: 'Parent', width: 1000, height: 600 });
    //const hildWindow = new BrowserWindow({ parent:'parentWindow', title: 'Child', width: 600, height: 300, modal: false  });




    ////win.loadURL("https://www.gmail.com");
//}

app.whenReady().then(createWindow);
