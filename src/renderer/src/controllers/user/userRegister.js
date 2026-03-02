export default async function userRegister({ email, password, username, display_name }) {
  try {
    const api = await fetch(import.meta.env.VITE_API_URL + '/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        username: username,
        display_name: display_name
      })
    })

    if (api.status === 200) {
      const res = await api.json()

      localStorage.setItem('token', res.token)
      localStorage.setItem('public_id', res.public_id)
      localStorage.setItem('username', res.username)
      localStorage.setItem('display_name', res.display_name)
      localStorage.setItem('created_at', res.created_at)

      window.electron.ipcRenderer.send('user-login', {
        token: res.token,
        public_id: res.public_id,
        username: res.username,
        display_name: res.display_name,
        created_at: res.created_at
      })

      // location.href = '/dashboard'
      window.location.reload()
      window.electron.ipcRenderer.send('navigate-back')
      return true
    }

    if (api.status === 401) {
      return false
    }

    throw new Error('Não foi possível realizar o cadastro.')
  } catch (err) {
    throw new Error('Ao ao realizar o cadastro!\n' + err)
  }
}
