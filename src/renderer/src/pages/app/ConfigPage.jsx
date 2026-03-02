import React from 'react'
import CustomSwitch from '../../components/elements/CustomSwitch'
import clientData from '../../controllers/client/clientData'
import { IoMdAlert } from 'react-icons/io';

export default function ConfigPage() {
  return (
    <div className='flex flex-col justify-center items-center'>

      <div className='w-1/2 max-w-[600px] border border-[#333] rounded-md p-2 bg-[#111] mt-4'>
        <h1 className="flex justify-center items-center text-xl text-white font-semibold">
          Atualização
          <IoMdAlert
            className='ml-2 text-yellow-500'
            title='Alterar as opções abaixo pode afetar o funcionamento do software. Recomendamos que não altere essas opções.'
          />
        </h1>
        <div className='w-full mt-3 text-white'>

          <div className='w-full border border-[#333] bg-[#222] rounded-md p-2 flex justify-between mt-2'>
            <span>Atualizar automaticamente</span>
            <CustomSwitch
              checked={clientData.autoUpdate | false}
              onChange={(e) => {
                localStorage.setItem('auto_update', e.target.checked);
                window.electron.ipcRenderer.send('change-auto-update', e.target.checked);
              }}
              disabled={true}
            />
          </div>

          <div className='w-full border border-[#333] bg-[#222] rounded-md p-2 flex justify-between mt-2'>
            <span>Notificação de nova atualização</span>
            <CustomSwitch
              checked={clientData.autoUpdateNotify | false}
              onChange={(e) => {
                localStorage.setItem('auto_update_notify', e.target.checked);
                window.electron.ipcRenderer.send('change-auto-update-notify', e.target.checked);
              }}
              disabled={true}
            />
          </div>

        </div>
      </div>

      <div className='w-1/2 max-w-[600px] border border-[#333] rounded-md p-2 bg-[#111] mt-4'>
        <h1 className="text-xl text-white font-semibold text-center">Aplicativo</h1>
        <div className='w-full mt-3 text-white '>

          <div className='w-full border border-[#333] bg-[#222] rounded-md p-2 flex justify-between mt-2'>
            <span className='flex items-center'>Ativar funções beta
              <IoMdAlert
                className='ml-2 text-yellow-500'
                title='Ativar essa função pode acarretar em bugs e problemas no software. Função ainda em desenvolvimento.'
              />
            </span>
            <CustomSwitch
              checked={clientData.betaFunctions === 'true' || false}
              onChange={(e) => {
                localStorage.setItem('beta_functions', e.target.checked)
              }}
              disabled={true}
            />
          </div>

          {clientData.betaFunctions === 'true' && (
            <div className='w-full border border-green-500 bg-[#222] rounded-md p-2 flex justify-between mt-2'>
              <span className='flex items-center'>Modo Torrent ativo
                <IoMdAlert
                  className='ml-2 text-green-500'
                  title='Responsável pelo compartilhamento de arquivos utilizando o VShelf.'
                />
              </span>
            </div>
          )}

        </div>
      </div>

    </div>
  )
}
