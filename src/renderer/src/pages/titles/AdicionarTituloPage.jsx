import React from 'react'
import titleGenders from '../../components/titleInfos/titleGenders.js'
import titleTypes from '../../components/titleInfos/titleTypes.js'
import titleStreams from '../../components/titleInfos/titleStreams.js'
import CustomButton from '../../components/elements/CustomButton.jsx'

export default function AdicionarTituloPage() {
  function handleTitulo(e) {
    e.preventDefault()

    try {
      const titulo = {
        titulo: document.getElementById('nome').value,
        nota: document.getElementById('nota').value,
        stream: document.getElementById('stream').value,
        classificacao: document.getElementById('classificacao').value,
        genero: document.getElementById('genero').value,
        status: document.getElementById('status').value,
        tipo: document.getElementById('tipo').value,
        estrelas: document.getElementById('estrelas').value
      }

      electron.ipcRenderer.invoke('save-title', titulo).then((res) => {})
      location.reload()
    } catch (err) {
      throw new Error(err)
    }
  }

  return (
    <form onSubmit={handleTitulo}>
      <div className="flex items-center justify-center p-10">
        <div className="mt-4 flex max-w-md w-full flex-col rounded-lg p-4 shadow-sm default-bg text-white container">
          <h2 className="font-bold text-lg mb-5 text-center">Adicionar Título</h2>

          <div className="flex flex-col space-y-4">
            <div className="flex flex-row items-center space-x-2">
              <label className="w-1/4" htmlFor="nome">
                Título
              </label>
              <input
                id="nome"
                maxLength={60}
                placeholder="Qual título deseja adicionar?"
                required
                className="w-full border rounded-md border-[#222] px-2 py-1 default-text"
                type="text"
              />
            </div>

            <div className="flex flex-row space-x-2">
              <label className="w-1/4" htmlFor="nota">
                Nota
              </label>
              <textarea
                name="nota"
                maxLength={255}
                className="w-full border rounded-md border-[#222] px-2 py-1 default-text h-[100px] resize-none"
                id="nota"
                placeholder="Escreva uma nota sobre o título"
                required
              ></textarea>
            </div>

            <div className="flex flex-row space-x-2">
              <div className="flex-1">
                <label className="w-1/2" htmlFor="stream">
                  Stream
                </label>
                <select
                  required
                  className="w-full border rounded-md border-black px-2 py-1 default-text input-background"
                  id="stream"
                >
                  {titleStreams.flatMap((stream, index) => {
                    return (
                      <option key={index} value={stream.value}>
                        {stream.name}
                      </option>
                    )
                  })}
                </select>
              </div>

              <div className="flex-1">
                <label className="w-1/2" htmlFor="classificacao">
                  Classificação
                </label>
                <select
                  required
                  className="w-full border rounded-md border-black px-2 py-1 default-text input-background"
                  id="classificacao"
                >
                  <option value="livre">Livre</option>
                  <option value="10">10 anos</option>
                  <option value="12">12 anos</option>
                  <option value="14">14 anos</option>
                  <option value="16">16 anos</option>
                  <option value="18">18 anos</option>
                  <option value="nao-sei">Não sei</option>
                </select>
              </div>
            </div>

            <div className="flex flex-row space-x-2">
              <div className="flex-1">
                <label className="w-1/2" htmlFor="genero">
                  Gênero
                </label>
                <select
                  required
                  className="w-full border rounded-md border-black px-2 py-1 default-text input-background"
                  id="genero"
                >
                  {titleGenders.flatMap((genero, index) => {
                    return (
                      <option key={index} value={genero.value}>
                        {genero.name}
                      </option>
                    )
                  })}
                </select>
              </div>

              <div className="flex-1">
                <label className="w-1/2" htmlFor="status">
                  Status
                </label>
                <select
                  required
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

            <div className="flex flex-row space-x-2">
              <div className="flex-1">
                <label className="w-1/2" htmlFor="tipo">
                  Tipo
                </label>
                <select
                  required
                  className="w-full border rounded-md border-black px-2 py-1 default-text input-background"
                  id="tipo"
                >
                  {titleTypes.flatMap((tipo, index) => {
                    return (
                      <option key={index} value={tipo.value}>
                        {tipo.name}
                      </option>
                    )
                  })}
                </select>
              </div>

              <div className="flex-1">
                <label className="w-1/2" htmlFor="">
                  Estrelas
                </label>
                <select
                  required
                  className="w-full border rounded-md border-black px-2 py-1 default-text input-background"
                  id="estrelas"
                >
                  <option value="1">1 Estrela</option>
                  <option value="2">2 Estrelas</option>
                  <option value="3">3 Estrelas</option>
                  <option value="4">4 Estrelas</option>
                  <option value="5">5 Estrelas</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <CustomButton
                props={{ content: 'Adicionar', variant: 'default', onClick: () => {} }}
              />
              {/* <button onclick="adicionar()" id="add-button"
                                className="bg-[#0e0018] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit">Adicionar</button> */}
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
