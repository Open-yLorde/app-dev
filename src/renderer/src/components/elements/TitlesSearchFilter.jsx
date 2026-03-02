import React from 'react'

export default function TitlesSearchFilter({
    notaFilter, setNotaFilter,
    statusFilter, setStatusFilter,
    useFilter, setUseFilter,
    useOrdemDeAdicao, setUseOrdemDeAdicao,
}) {
    return (
        <>
            <div className='h-1/2'>
                <h1 className="text-center text1xl uppercase font-semibold mb-2 bg-[#141419] border border-[#333] p-2 rounded-md">Pesquisa</h1>

                <div className='flex justify-around border border-[#222] rounded-md p-2 uppercase'>
                    <span>Usar filtro</span>
                    <input
                        type="checkbox"
                        onChange={(e) => setUseFilter(e.target.checked)}
                        checked={useFilter}
                    />
                </div>

                <div className="border-[#222] border rounded-md p-2 mt-2">
                    <div className="flex justify-around items-center">
                        <span>NOTA</span>
                        <span>{notaFilter * 2}/10</span>
                    </div>
                    <input
                        className="w-full mt-2"
                        onChange={(e) => setNotaFilter(e.target.value)}
                        type="range"
                        defaultValue={notaFilter}
                        max={5}
                        min={1}
                    />
                </div>

                <div className="border-[#222] border rounded-md p-2 mt-2">
                    <div className='flex justify-center'>
                        <span>STATUS</span>
                    </div>
                    <div className='flex uppercase ml-2 mt-2'>
                        <select
                            required
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full border rounded-md border-black px-2 py-1 default-text input-background"
                            id="status"
                        >
                            <option value="nunca-assistido">Nunca Assistido</option>
                            <option value="assistido">Assistido</option>
                            <option value="assistindo">Assistindo</option>
                            <option value="assistindo-novamente">Assistindo Novamente</option>
                            <option value="assistido-parcialmente">Assistido Parcialmente</option>
                            <option value="pausado">Pausado</option>
                            <option value="outro">Outro não listado</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}
