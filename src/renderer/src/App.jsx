import TopBar from './components/TopBar'
import Footer from './components/Footer'
// import HomePage from './pages/HomePage'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col rounded-2xl overflow-hidden">
      <header className="fixed top-0 w-full z-10">
        <TopBar />
      </header>
      <div className="flex flex-1 mt-[40px]">
        <Sidebar />
        <main
          id="main"
          className="flex-1 overflow-y-auto p-4 pb-20 h-screen space-y-4"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#191924 #121214',
          scrollBehavior: 'smooth'
        }}
        >
          <Outlet />
        </main>
      </div>
      <footer className="fixed bottom-0 w-full">
        <Footer />
      </footer>
    </div>
  )
}
