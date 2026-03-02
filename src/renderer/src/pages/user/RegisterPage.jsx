import React from 'react'
import { FaEye } from 'react-icons/fa'
import { FaEyeLowVision } from 'react-icons/fa6'
import sha256 from '../../functions/sha256.js'
import checkUsername from '../../controllers/user/checkUsername.js'
import userRegister from '../../controllers/user/userRegister.js'
import { Link } from 'react-router-dom'
import Loading from '../../components/elements/Loading.jsx'
import userData from '../../controllers/user/userData.js'

export default function RegisterPage() {
  //   if (localStorage.getItem('token')) {
  //     location.href = '/dashboard'
  //   }

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [displayName, setDisplayName] = React.useState('')

  const [passType, setPassType] = React.useState('password')
  const [passIcon, setPassIcon] = React.useState(<FaEye />)

  const [showEmailError, setShowEmailError] = React.useState(false)
  const [showUsernameError, setShowUsernameError] = React.useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    const hashPassword = await sha256(password)

    if (email !== '' && hashPassword !== '' && username !== '' && displayName !== '') {
      const validUsername = await checkUsername(username)
      if (!validUsername) {
        setShowUsernameError(true)
        setTimeout(() => setShowUsernameError(false), 5 * 1000)
        return
      }

      if (validUsername) {
        const registerStatus = await userRegister({
          email: email,
          password: password,
          username: username,
          display_name: displayName
        })

        if (!registerStatus) {
          setShowEmailError(true)
          setTimeout(() => setShowEmailError(false), 5 * 1000)
          return
        }
      }
    }
  }

  function togglePass() {
    if (passType === 'password') {
      setPassIcon(<FaEyeLowVision />)
      setPassType('text')
    } else {
      setPassIcon(<FaEye />)
      setPassType('password')
    }
  }

  return (
    <Loading loaded={userData?.token === null}>
      <div className="flex flex-col items-center mt-[10vh] text-white">
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center justify-center w-92 p-10 container rounded-md"
        >
          <h1 className="text-white text-3xl font-bold mb-4">Register</h1>
          {/* <span className="text-purple-300 text-xs font-bold mb-4 text-center uppercase">Login usando senha e email em desenvolvimento</span> */}

          <div className="w-full mt-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              className="mb-4 text-gray-300 p-2 outline-none bg-transparent border-b-2 border-gray-500 w-full cursor-text"
              required={true}
            />
            {showEmailError && (
              <span className="text-red-500 text-md font-semibold">email já cadastrado</span>
            )}
          </div>

          <div className="w-full mt-2">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Apelido"
              className="mb-4 text-gray-300 p-2 outline-none bg-transparent border-b-2 border-gray-500 w-full cursor-text"
              required={true}
              minLength={3}
              maxLength={45}
            />
            {showUsernameError && (
              <span className="text-red-500 text-md font-semibold">Apelido já em uso</span>
            )}
          </div>

          <div className="w-full mt-2">
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Nome de exibição"
              className="mb-4 text-gray-300 p-2 outline-none bg-transparent border-b-2 border-gray-500 w-full cursor-text"
              required={true}
              minLength={1}
              maxLength={45}
            />
          </div>

          <div className="flex items-center justify-between w-full mt-2">
            <input
              type={passType}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="mb-4 p-2 text-gray-300 outline-none bg-transparent border-b-2 border-gray-500 w-full mr-2 cursor-text"
              required={true}
            />

            <button onClick={togglePass} type="button" className="cursor-pointer">
              {passIcon}
            </button>
          </div>

          <div>
            {/* <span className="text-purple-300">Esqueceu sua senha? <a className="text-purple-500 cursor-pointer">Recuperar senha</a></span> */}
          </div>

          <button
            type="submit"
            className="mt-3 w-[80%] cursor-pointer p-2 0 px-4 rounded-md font-bold duration-300 hover:duration-300 text-white bg-[#121212] hover:bg-[#191924] hover:text-white border border-[#222]"
          >
            Criar Conta
          </button>

          {/* <CustomButton props={{ className: 'w-[80%] mt-3', content: 'Criar Conta', onClick: handleLogin, variant: 'default' }} /> */}

          <div className="mt-4">
            <span className="text-gray-300">
              Não possui uma conta?{' '}
              <Link to={'/login'} className="text-gray-500 cursor-pointer">
                entrar
              </Link>
              {/* <button className='text-gray-500 cursor-pointer'>entrar</button> */}
            </span>
          </div>
        </form>
      </div>
    </Loading>
  )
}
