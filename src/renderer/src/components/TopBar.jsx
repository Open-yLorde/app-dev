import React from 'react'
import { FaBars, FaDownload, FaHome, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import userData from '../controllers/user/userData'
import { IoArrowBack, IoArrowForward, IoClose } from 'react-icons/io5'
import { FaGear } from 'react-icons/fa6'
// import { FaGear, FaMessage } from 'react-icons/fa6';

export default function TopBar() {
  const [hasNewVersion, setHasNewVersion] = React.useState(false);
  const [maximized, setMaximized] = React.useState(false);

  const minimize = () => window.electron.ipcRenderer.send('window:minimize')
  const maximize = () => window.electron.ipcRenderer.send('window:maximize')
  const close = () => window.electron.ipcRenderer.send('window:close')

  const handleUpdate = () => {
    setHasNewVersion(!hasNewVersion)
    window.electron.ipcRenderer.send('update-app');
  };

  React.useEffect(() => {
    window.electron.ipcRenderer.on("window:maximized", () => setMaximized(true));
    window.electron.ipcRenderer.on("window:unmaximized", () => setMaximized(false));
    window.electron.ipcRenderer.on('update-available', () => setHasNewVersion(true));
  }, []);

  return (
    <div className="titlebar titlebar-bg">
      <div className="title">VShelf: {import.meta.env.VITE_APP_UPDATE}</div>
      <div className="side-buttons flex items-center">
        {/* <div className="w-[25px] cursor-pointer h-[25px] hover:bg-[#222] rounded-sm flex items-center justify-center text-gray-500">
          <FaBars />
        </div> */}

        <div className='flex items-center border border-[#222] rounded-md'>
          <div
            onClick={() => {
              window.electron.ipcRenderer.send('navigate-back')
            }}
            className="w-[25px] cursor-pointer h-[25px] hover:bg-[#222] rounded-sm flex items-center justify-center text-gray-500"
          >
            <IoArrowBack />
          </div>

          <div
            onClick={() => {
              window.electron.ipcRenderer.send('navigate-forward')
            }}
            className="w-[25px] cursor-pointer h-[25px] hover:bg-[#222] rounded-sm flex items-center justify-center text-gray-500"
          >
            <IoArrowForward />
          </div>
        </div>

        <Link to={'/'} draggable={false}>
          <div className="w-[25px] cursor-pointer h-[25px] hover:bg-[#222] rounded-sm flex items-center justify-center text-gray-500">
            <FaHome />
          </div>
        </Link>

        {userData?.token && (
          <Link to={'config'} draggable={false}>
            <div className="w-[25px] cursor-pointer h-[25px] hover:bg-[#222] rounded-sm flex items-center justify-center text-gray-500">
              <FaGear />
            </div>
          </Link>
        )}

        <Link to={userData?.token ? 'perfil' : 'login'} draggable={false}>
          <div className="w-[25px] cursor-pointer h-[25px] hover:bg-[#222] rounded-sm flex items-center justify-center text-gray-500">
            <FaUser />
          </div>
        </Link>

        {hasNewVersion && (
          <div
            onClick={handleUpdate}
            className="w-[25px] h-[25px] cursor-pointer  hover:bg-[#222] rounded-sm flex items-center justify-center text-[#5099509a]"
          >
            <FaDownload />
          </div>
        )}
      </div>

      <div className="window-controls flex items-center text-gray-500">
        <button
          id="minimize"
          className="flex justify-center items-center"
          onClick={minimize}
        >
          ─
        </button>
        <button
          id="maximize"
          className="flex justify-center items-center"
          onClick={maximize}
        >
          {maximized ? "🗗" : "☐"}
        </button>
        <button
          id="close"
          className="flex justify-center items-center"
          onClick={close}
        >
          ✕
        </button>
      </div>

    </div>
  )
}
