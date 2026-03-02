import './assets/css/main.css'
import './assets/javascript/global.js'

// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App'
import { RouterProvider } from 'react-router-dom'
import routes from './routes.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>
  <RouterProvider router={routes} />
)
