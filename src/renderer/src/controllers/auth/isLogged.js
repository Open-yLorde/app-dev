export default async function isLogged() {
  try {
    const token = localStorage.getItem('token')
    if (!token) return false
    return true
  } catch (err) {
    throw new Error('Ao ao verificar se o usuário está logado!\n' + err)
  }
}
