import { database } from './index.js'

export default new (class primaryServer {
  async isOnline() {
    const status = (await database.get(`primaryServerStatus`)) || false
    return status;
  };

  async checkConnection() {
    try {
      await fetch(import.meta.env.VITE_API_URL+`/api/healthChecker`, {
        method: 'GET',
        mode: 'no-cors'
      })
        .then(async (res) => {
          if (res.status === 200) {
            console.log(`Servidor 1 online`)
            await database.set(`primaryServerStatus`, true)
          } else {
            console.log(`Servidor 1 offline`)
            await database.set(`primaryServerStatus`, false)
          }
        })
        .catch(async () => {
          await database.set(`primaryServerStatus`, false)
        })
    } catch (err) {
      throw new Error(err)
    }
  }
})()
