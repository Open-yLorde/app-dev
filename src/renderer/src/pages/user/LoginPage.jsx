import React from 'react'
import { FaEye } from 'react-icons/fa'
import { FaEyeLowVision } from 'react-icons/fa6'
import userLogin from '../../controllers/user/userLogin.js'
import { Link } from 'react-router-dom'
import Loading from '../../components/elements/Loading.jsx'
import userData from '../../controllers/user/userData.js'

export default function LoginPage() {
  //   if (localStorage.getItem('token')) {
  //     location.href = '/dashboard'
  //   }

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [passType, setPassType] = React.useState('password')
  const [passIcon, setPassIcon] = React.useState(<FaEye />)

  const [showEmailError, setShowEmailError] = React.useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()

    if (email !== '' && password !== '') {
      const login = await userLogin({ email, password })
      if (!login) {
        setShowEmailError(true)
        setTimeout(() => setShowEmailError(false), 5 * 1000)
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
      <div className="flex flex-col items-center mt-[16vh] text-white">
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center justify-center w-92 p-10 container rounded-md"
        >
          <h1 className="text-white text-3xl font-bold mb-4">Login</h1>
          {/* <span className="text-purple-300 text-xs font-bold mb-4 text-center uppercase">Login usando senha e email em desenvolvimento</span> */}

          <div className="w-full mt-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              className="mb-4 text-gray-300 p-2 outline-none bg-transparent border-b-2 border-gray-500 w-full cursor-text"
              required={true}
            />
          </div>

          <div className="flex items-center justify-between w-full">
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
            <span className="text-gray-300">
              Esqueceu sua senha?{' '}
              <a className="text-gray-500 cursor-pointer decoration-0">Recuperar senha</a>
            </span>
          </div>

          <button
            type="submit"
            className="mt-3 w-[80%] cursor-pointer p-2 0 px-4 rounded-md font-bold duration-300 hover:duration-300 text-white bg-[#121212] hover:bg-[#191924] hover:text-white border border-[#222]"
          >
            Entrar
          </button>

          {/* <CustomButton props={{ content: 'Entrar', variant: 'default', className: 'mt-3 w-[80%]' }} /> */}

          {showEmailError && (
            <span className="text-red-400 text-md font-semibold mt-2">
              Erro ao entrar, senha ou email incorreto
            </span>
          )}

          <div className="mt-4">
            <span className="text-gray-300">
              Não possui uma conta?{' '}
              <Link to={'/register'} className="text-gray-500 cursor-pointer decoration-0">
                crie uma
              </Link>
              {/* <button className='text-gray-500 cursor-pointer decoration-0'>crie uma</button> */}
            </span>
          </div>
        </form>
      </div>
    </Loading>
  )
}
