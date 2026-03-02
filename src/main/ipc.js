import { autoUpdater } from 'electron-updater'
import { database, mainWindow } from './index.js'

const { ipcMain, shell, app, Notification, clipboard } = require('electron')

function setupIPC() {
  ipcMain.on('window:minimize', () => mainWindow.minimize())
  ipcMain.on('window:maximize', () =>
    mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize()
  )
  ipcMain.on('window:close', () => mainWindow.close())

  ipcMain.on('navigate-back', () => {
    mainWindow.webContents.navigationHistory.goBack()
  });

  ipcMain.on('navigate-forward', () => {
    mainWindow.webContents.navigationHistory.goForward()
  });

  ipcMain.on('update-app', () => {
    autoUpdater.quitAndInstall(true, true);
  });

  ipcMain.handle('get-client-id', async () => {
    let client_id = await database.get('client_id')
    if (!client_id) {
      client_id = Math.floor(10000000 + Math.random() * 90000000)
      await database.set('client_id', client_id)
    }

    return client_id;
  });

  ipcMain.on('open-external-link', (_, url) => {
    shell.openExternal(url)
  })

  ipcMain.on('user-login', async (_, user) => {
    await database.set('user', user)
  });

  ipcMain.on('change-auto-update', async (_, value) => {
    await database.set('auto_update', value);
  });

  ipcMain.on('change-auto-update-notify', async (_, value) => {
    await database.set('auto_update_notify', value);
  });

  ipcMain.handle('load-history', async () => {
    return [];
  });

  ipcMain.on('is-dev', async () => {
    return !app.isPackaged;
  });

  ipcMain.on('create-notify', (_, notify) => {
    new Notification({
      title: notify.title,
      subtitle: notify.body,
      body: notify.body,
      icon: 'build/icon.ico',
      silent: false,
      urgency: 'critical',
      timeoutType: 'default'
    }).show()
  });

  ipcMain.on('copy-to-clipboard', (_, value) => {
    try {
      clipboard.writeText(value);
    } catch (err) {
      throw new Error(err);
    };
  });
};

export default setupIPC;