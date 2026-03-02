import React from 'react'
import { FaFileDownload, FaFileUpload } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function NETCompartilharArquivoPage() {
    function BlockSelect({ name, icon, url, onClick }) {
        return (
            <Link to={url} draggable={false} onClick={onClick}>
                <div
                    className='text-[#777] w-[160px] h-[160px] container rounded-md flex flex-col items-center justify-center hover:scale-102 duration-300 hover:duration-300 cursor-pointer shadow-md hover:text-[#999]'
                >
                    <div className='w-[100px] h-[100px] rounded-md flex justify-center items-center'>
                        {icon}
                    </div>
                    <h1 className='mt-1 font-bold text-sm uppercase'>{name}</h1>
                </div>
            </Link>
        );
    };

    return (
        <div className='mt-5'>
            <div className='flex items-center justify-around'>
                <BlockSelect name={'Enviar Arquivo'} icon={<FaFileUpload size={90} />} url={'#'} onClick={() => {
                    window.electron.ipcRenderer.invoke('net:select-file-to-upload');
                }}/>
                <BlockSelect name={'Receber Arquivo'} icon={<FaFileDownload size={90} />} url={'/net/receber-arquivo'} />
            </div>
        </div>
    )
}
