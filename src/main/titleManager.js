import { database } from './index.js'

const { ipcMain } = require('electron')

async function preLoadTitles() {
  const allTitles = (await database.get('titles')) || []
  const JSONTitles = JSON.stringify(allTitles)
  ipcMain.handle('preload_titles', () => {
    return JSONTitles
  })
}

function titleManager() {
  ipcMain.handle('get-titles', async (event, arg) => {
    const titles = (await database.get('titles')) || []
    return titles
  })

  ipcMain.handle('find-title', async (_, { search, nota, status, useFilter }) => {
    const titles = (await database.get('titles')) || [];
    let result = [];

    if (useFilter) {
      result = titles.filter((x) =>
        String(x.titulo).toLowerCase().includes(String(search).toLowerCase()) && x.estrelas === nota && x.status === status
      );
    } else {
      result = titles.filter((x) => String(x.titulo).toLowerCase().includes(String(search).toLowerCase()));
    };
    return result;
  })

  ipcMain.handle('get-title-by-id', async (_, id) => {
    const titles = (await database.get('titles')) || []
    return titles.find((x) => x.id === id)
  })

  ipcMain.handle('remove-title', async (_, id) => {
    const titles = await database.get('titles') || [];
    const newTitle = titles.filter((x) => x.id !== id);
    await database.delete('titles');
    await database.set('titles', newTitle);
  })

  ipcMain.handle('favorite-gender', async () => {
    const titles = await database.get('titles') || [];

    const generoCount = {};
    await titles.forEach((item) => {
      generoCount[item.genero] = (generoCount[item.genero] || 0) + 1;
    });

    let favorito = null;
    let maxCount = 0;

    for (const genero in generoCount) {
      if (generoCount[genero] > maxCount) {
        maxCount = generoCount[genero];
        favorito = genero;
      }
    }

    return { favorito, maxCount };
  });

  ipcMain.handle('total-titles', async () => {
    const titles = await database.get('titles') || [];
    return titles.length
  });
}

export default titleManager
