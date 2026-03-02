import { createHashRouter } from 'react-router-dom'
import App from './App.jsx'
import HomePage from './pages/app/HomePage.jsx'
import DashboardPage from './pages/user/DashboardPage.jsx'
import AdicionarTituloPage from './pages/titles/AdicionarTituloPage.jsx'
import ConfigPage from './pages/app/ConfigPage.jsx'
import MeusTitulosPage from './pages/titles/MeusTitulosPage.jsx'
import MeusLivrosPage from './pages/titles/MeusLivrosPage.jsx'
import MeuPerfilPage from './pages/user/MeuPerfilPage.jsx'
import LoginPage from './pages/user/LoginPage.jsx'
import RegisterPage from './pages/user/RegisterPage.jsx'
import MeusTitulosDetalhesPage from './pages/titles/MeusTitulosDetalhesPage.jsx'
import NETReceberArquivoPage from './pages/net/NETReceberArquivoPage.jsx'
import NETCompartilharArquivoPage from './pages/net/NETCompartilharArquivoPage.jsx'

const routes = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <HomePage />,
    children: [
      { path: '*', element: <HomePage /> },
      { path: '/', element: <HomePage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'adicionar-titulo', element: <AdicionarTituloPage /> },
      { path: 'config', element: <ConfigPage /> },
      { path: 'meus-titulos', element: <MeusTitulosPage /> },
      { path: 'titulo/:id', element: <MeusTitulosDetalhesPage /> },
      { path: 'meus-livros', element: <MeusLivrosPage /> },
      { path: 'perfil', element: <MeuPerfilPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'net/compartilhar-arquivo', element: <NETCompartilharArquivoPage /> },
      { path: 'net/receber-arquivo', element: <NETReceberArquivoPage /> }
    ]
  }
])

export default routes
