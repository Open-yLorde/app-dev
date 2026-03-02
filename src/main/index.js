import { app, shell, BrowserWindow, Notification } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { QuickDB } from 'quick.db'
import setupIPC from './ipc.js'
import { autoUpdater } from 'electron-updater'
import primaryServer from './primaryServer.js'
import titleManager from './titleManager.js'
import saveTitle from './saveTitle.js'
import netIPC from './netIPC.js'

let mainWindow

const database = new QuickDB({
  filePath: app.getPath('appData') + `/VShelf/${app.isPackaged ? 'local.sqlite' : 'dev.sqlite'}`
})

export { database, mainWindow }

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,

    minWidth: 1100,
    minHeight: 690,

    resizable: true,
    title: 'VShelf',
    tabbingIdentifier: 'VShelf',
    roundedCorners: true,

    show: true,
    frame: false,
    autoHideMenuBar: true,
    // titleBarStyle: 'hiddenInset',

    // darkTheme: true,
    backgroundColor: '#121219',

    fullscreenable: false,
    fullscreen: false,

    icon: icon,

    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      allowRunningInsecureContent: true,
      devTools: !app.isPackaged
    }
  })

  if (app.isPackaged) {
    autoUpdater.setFeedURL({
      provider: 'github',
      owner: 'VShelf',
      repo: 'windows',
      releaseType: 'release',
      url: `https://github.com/VShelf/windows/releases`,
      private: false,
      timeout: 25000
    })

    autoUpdater.checkForUpdates();
  };

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(async () => {
  electronApp.setAppUserModelId('com.vshelf.app')

  setupIPC()
  titleManager()
  saveTitle()
  netIPC()
  createWindow()

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // if (app.isPackaged) {
  //   primaryServer.checkConnection().finally(async () => {
  //     if (!(await database.get(`primaryServerStatus`))) {
  //       new Notification({
  //         title: 'Servidor offline!',
  //         subtitle: 'Pode ser sua conexão com a internet ou o nosso servidor.',
  //         body: 'Algumas funcionalidades podem não estar disponíveis.',
  //         icon: 'build/icon.ico',
  //         silent: false,
  //         urgency: 'critical',
  //         timeoutType: 'default'
  //       }).show()
  //     }
  //   })
  // };

  autoUpdater.on('update-available', async () => {
    autoUpdater.downloadUpdate();
  });

  autoUpdater.on('update-downloaded', () => {
    mainWindow.webContents.send('update-available');
    new Notification({
      title: 'Nova versão detectada',
      body: 'A versão será instalada quando o aplicativo for encerrado e estará atualizado quando for aberto da próxima vez.',
      icon: 'build/icon.ico',
      silent: true,
      urgency: 'normal',
      timeoutType: 'default'
    }).show();
  });

  mainWindow.on("maximize", () => {
    mainWindow.webContents.send("window:maximized");
  });

  mainWindow.on("unmaximize", () => {
    mainWindow.webContents.send("window:unmaximized");
  });

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
