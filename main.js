const {app, BrowserWindow} = require("electron");
const {join} = require("path");

app.whenReady().then(main);

function UpsertKeyValue(obj, keyToChange, value) {
    const keyToChangeLower = keyToChange.toLowerCase();
    for (const key of Object.keys(obj)) {
      if (key.toLowerCase() === keyToChangeLower) {
        // Reassign old key
        obj[key] = value;
        // Done
        return;
      }
    }
    // Insert at end instead
    obj[keyToChange] = value;
  }

function main () {
    const window = new BrowserWindow({
    width: 800, height: 700
    

});

const window2 = new BrowserWindow({
    width: 500, height: 400
    
    

});

window.webContents.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');
window2.webContents.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');

window.webContents.session.webRequest.onBeforeSendHeaders(
    (details, callback) => {
      const { requestHeaders } = details;
      UpsertKeyValue(requestHeaders, 'Access-Control-Allow-Origin', ['*']);
      callback({ requestHeaders });
    },
  );
  
  window.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    const { responseHeaders } = details;
    UpsertKeyValue(responseHeaders, 'Access-Control-Allow-Origin', ['*']);
    UpsertKeyValue(responseHeaders, 'Access-Control-Allow-Headers', ['*']);
    callback({
      responseHeaders,
    });
  });

 //window.on('resize', function () {
 //   var size   = window.getSize();
 //   var width  = size[0];
 //   var height = size[1];
 //   console.log("width: " + width);
 //   console.log("height: " + height);
//});

 window.loadURL("https://login.salesforce.com/");
 window2.loadURL("https://calendar.google.com/calendar");

 window2.on("ready-to-show", window2.show);

 window2.setAlwaysOnTop(true, 'screen');

 window.on("ready-to-show", window.show);

 //window.on('resize', () => {
 //   console.log("window resized")
 //   window.setSize(800,700, true)
 //})

 require('electron').shell.openExternal("http://google.com");

 window.on('move', () => {
    //console.log("window moved")
    //window.setSize(800,700, true)

    list = window.getPosition()
    //console.log(list)


    window2.setPosition(list[0], list[1], true)
    window2.setSize(500, 400, true)
 })

}