import React from 'react'
import { Link } from 'react-router-dom'
import userData from '../../controllers/user/userData'
import clientData from '../../controllers/client/clientData'

export default function SideBarOptions() {
  function Button({ url, title }) {
    return (
      <Link
        to={url}
        className="block cursor-pointer p-2 rounded-md w-full text-center font-semibold duration-300 hover:duration-300 text-[#777] hover:text-[#ccc] bg-[#111] hover:bg-[#111] border border-[#222] shadow-md hover:scale-102"
        draggable={false}
      >
        {title}
      </Link>
    )
  }

  return (
    <>
      <Button url={'/'} title={'Página Inicial'} />
      <hr className="border border-[#222]" />
      <Button url={'meus-titulos'} title={'Meus Títulos'} />
      <Button url={'adicionar-titulo'} title={'Adicionar Títulos'} />
      {clientData.betaFunctions == 'true' && (
        <>
          <hr className="border border-[#222]" />
          <Button url={'net/compartilhar-arquivo'} title={'Comp. Arquivo'} />
        </>
      )}
      {!userData?.token && (
        <Button url={'login'} title={'Entrar'} />
      )}
    </>
  )
}
