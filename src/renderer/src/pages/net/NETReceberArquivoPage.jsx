import React from 'react'

export default function NETReceberArquivoPage() {
    return (
        <div className='w-full mt-5'>
            <form className='w-full'>
                <div className='w-full'>
                    <input
                        type="url"
                        placeholder='Cole aqui o link do arquivo...'
                        className='outline-none border border-[#333] bg-[#111] rounded-tl-md rounded-bl-md p-2 text-white w-7/8 italic'
                        required={true}
                    />
                    <button
                        type='submit'
                        className='border-[#333] bg-[#111] border text-white p-2 rounded-tr-md rounded-br-md w-1/8 cursor-pointer hover:bg-[#222] font-bold uppercase'
                    >
                        Buscar
                    </button>
                </div>
            </form>
            <div className='w-full mt-10 border-[#333] border bg-[#111] rounded-md h-40'>

            </div>
        </div>
    )
}
