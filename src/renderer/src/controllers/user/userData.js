const userData = {
  public_id: localStorage.getItem('public_id') || null,
  token: localStorage.getItem('token') || null,
  username: localStorage.getItem('username') || null,
  display_name: localStorage.getItem('display_name') || null,
  created_at: localStorage.getItem('created_at') || null
}

export default userData
