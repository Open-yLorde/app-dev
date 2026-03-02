export default async function checkUsername(username) {
  try {
    const api = await fetch(
      import.meta.env.VITE_API_URL + '/api/user/check_username/' + String(username).toLowerCase(),
      {
        method: 'GET'
      }
    )

    if (api.status === 200) {
      const data = await api.json()
      if (data.status === 'success') {
        return false
      } else if (data.status === 'error') {
        return true
      }
    } else {
      return false
    }
  } catch (err) {
    throw new Error('Ao ao verificar o username!\n' + err)
  }
}
