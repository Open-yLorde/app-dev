import { database } from './index.js'

import axios from 'axios'
import cheerio from 'cheerio'

const { ipcMain } = require('electron')

function generateId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function saveTitle() {
  ipcMain.handle('save-title', async (_, title) => {
    const code = title.titulo;
    const base_url = 'https://www.themoviedb.org';
    let image, link, sinopse, background;

    async function findLink() {
      await axios
        .get(`${base_url}/search?query=${String(code).replaceAll(' ', '%20')}`, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/114.0.5735.99 Mobile/15E148 Safari/604.1'
          }
        })
        .catch((err) => {
          throw new Error(err);
        })
        .then((response) => {
          if (response) {
            const $ = cheerio.load(response.data);
            link = $('div .results').find('div .card').find('div .wrapper').find('div .details').find('div .title').find('div').find('a').attr('href');
          };
        });
    };

    async function findBanner() {
      await axios
        .get(`${base_url}${link}`, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/114.0.5735.99 Mobile/15E148 Safari/604.1'
          }
        })
        .catch((err) => {
          throw new Error(err);
        })
        .then((response) => {
          if (response) {
            const $ = cheerio.load(response.data)
            image = $('main').find('section').find('div .poster').find('img').attr('srcset').split(',')[1].toString().split(' ')[1].replace(' x2', '');
            sinopse = $('main').find('section').find('div .header_info').find('div .overview').find('p').text();
            background = $('section .media').find('div .backdrop').find('img').attr('srcset').split(',')[1].toString().split(' ')[1].replace(' x2', '');
          };
        });
    };

    await findLink();
    await findBanner();

    const formattedTitle = {
      id: generateId(),
      titulo: title.titulo,
      nota: title.nota,
      stream: title.stream,
      classificacao: title.classificacao,
      genero: title.genero,
      status: title.status,
      tipo: title.tipo,
      estrelas: title.estrelas,
      image: image,
      background: background,
      sinopse: sinopse
    };

    try {
      const titles = (await database.get('titles')) || []
      const existingTitle = titles.find((x) => x.titulo === formattedTitle.titulo)

      if (!existingTitle) {
        titles.push(formattedTitle)
        await database.set('titles', titles)
        return 'added'
      } else {
        return 'exists'
      }
    } catch (err) {
      throw new Error(err)
    };
  });
};

export default saveTitle;