import React from 'react'
import userData from '../controllers/user/userData'
import clientData from '../controllers/client/clientData'

export default function Footer() {
  return (
    <footer className="custom-footer h-[25px] w-full flex text-gray-500 items-center uppercase italic border-t border-[#222] justify-between">
      <div className="flex items-center normal-case">
        <span className="text-shadow-amber-200 ml-5 normal-case">
          v{import.meta.env.VITE_APP_VERSION}
        </span>
        <span className="mx-2">|</span>
        <span>ClientID: {clientData.clientId}</span>
      </div>
      <div className="mx-5">
        <span className="text-shadow-amber-200">
          <b className="font-normal normal-case italic">
            {userData?.token
              ? `Conta conectada: ${userData?.username}`
              : `VShelf: ${import.meta.env.VITE_APP_UPDATE}`}
          </b>
        </span>
      </div>
    </footer>
  )
}
