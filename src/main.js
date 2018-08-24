import {app, BrowserWindow} from 'electron';
import path from 'path';

if (require('electron-squirrel-startup')) {
    app.quit();
}

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        icon: path.join(__dirname, 'favicon.png'),
        width: 800,
        height: 600,
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
