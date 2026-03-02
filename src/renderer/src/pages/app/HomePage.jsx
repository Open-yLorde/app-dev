import React from 'react'
import CustomButton from '../../components/elements/CustomButton.jsx'
import userData from '../../controllers/user/userData.js'
import clientData from '../../controllers/client/clientData.js'

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-white w-full">
      <h1 className="text-3xl mt-10">
        {userData?.display_name
          ? `Bem-vindo(a) ${userData?.display_name}`
          : `Bem-vindo(a) ao VShelf`}
      </h1>

      <div className="mt-5 space-x-5">
        <h1>
          {clientData?.clientId}
        </h1>
      </div>

      <hr className="w-1/2 my-3 border-gray-500 border" />

      {/* <h1 className="text-xl flex text-wrap wrap-anywhere">
        Junto com esta atualização o contrato de uso do software e serviços também foi atualizado.
      </h1>

      <div className="flex">
        <CustomButton
          props={{
            content: 'Ver contrato de uso',
            variant: 'default',
            className: 'mt-5 mx-5 uppercase font-semibold',
            onClick: () => {
              window.open('https://www.ylorde.com.br/license.pdf', '_blank')
            }
          }}
        />
      </div> */}

      <h1 className="mt-10 text-2xl uppercase font-semibold">
        Novidades da {import.meta.env.VITE_APP_VERSION}
      </h1>
      <div className="w-1/2 mt-4 min-w-[600px] rounded-md container text-white text-sm cursor-default p-4 text-wrap wrap-anywhere">
        <pre className="font-bold uppercase mb-2">Adicionado:</pre>

        <pre className="text-green-400">Página de configurações</pre>
        {/* <pre className="text-green-400">Função de compatilhamento de arquivos via P2P (Torrent)</pre> */}
        <pre className="text-green-400">Flint API (API proprietária do VShelf)</pre>

        <hr className="border border-[#333] my-2" />
        <pre className="font-bold uppercase mb-2">Melhorado / Modificado:</pre>

        <pre className="text-yellow-400">Barra de navegação</pre>
        <pre className="text-yellow-400">Sistema de atualização automática</pre>
        <pre className="text-yellow-400">Sistema de classificação automática de gênero favorito</pre>

        <hr className="border border-[#333] my-2" />
        <pre className="font-bold uppercase mb-2">Removido / Corrigido:</pre>

        <pre className="text-red-400">Instalação de atualizações</pre>
      </div>


    </div>
  )
}
