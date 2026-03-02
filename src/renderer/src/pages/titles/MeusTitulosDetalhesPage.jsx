import React from 'react'
import { Link, useParams } from 'react-router-dom'
import titleStreams from '../../components/titleInfos/titleStreams.js'
import titleStatus from '../../components/titleInfos/titleStatus.js'
import titleGenders from '../../components/titleInfos/titleGenders.js'
import titleTypes from '../../components/titleInfos/titleTypes.js'
import CustomButton from '../../components/elements/CustomButton.jsx'
import Loading from '../../components/elements/Loading.jsx'
import titleClass from '../../components/titleInfos/titleClass.js'
import userData from '../../controllers/user/userData.js'
import shareTitle from '../../controllers/title/shareTitle.js'

export default function MeusTitulosDetalhesPage() {
  const [isLoaded, setLoaded] = React.useState(false)
  const [title, setTitle] = React.useState({})
  const { id } = useParams()

  async function loadTitle() {
    window.electron.ipcRenderer.invoke('get-title-by-id', id).then((res) => {
      setTitle(res)
      setLoaded(true)
    })
  }

  React.useEffect(() => {
    loadTitle()
  }, [])

  return (
    <Loading loaded={isLoaded}>
      <div className="flex flex-col items-center justify-start gap-5 text-white">
        <div className="w-full h-[340px] bg-[#222] relative flex items-center justify-center rounded-md">
          <img src={title?.background} alt={' '} className="w-full h-full object-fill rounded-md" />
        </div>
        <div className="flex items-start justify-between gap-5 w-full px-10">
          <div className="flex gap-5 justify- w-1/2">
            <img
              src={title?.image}
              alt={' '}
              className="w-[150px] h-[150px] object-fill rounded-md bg-[#222]"
            />
            <div className="">
              <h1 className="text-3xl font-bold uppercase wrap-anywhere" title={title?.titulo}>
                {String(title?.titulo).length > 24
                  ? `${title?.titulo.substring(0, 24)}...`
                  : title?.titulo}
              </h1>

              <h1 className="text-xl uppercase font-bold">
                Nota:{' '}
                <span
                  className={`
                                text-white font-bold text-sm px-1 border border-white rounded-md
                                ${title?.estrelas == 1 && 'bg-red-500'} ${title?.estrelas == 2 && 'bg-orange-500'} ${title?.estrelas == 3 && 'bg-yellow-500'} ${title?.estrelas == 4 && 'bg-emerald-500'} ${title?.estrelas == 5 && 'bg-green-500'}
                            `}
                >
                  {title?.estrelas * 2}/10
                </span>
              </h1>
            </div>
          </div>

          <div>
            <h1>
              <b>Stream:</b> {titleStreams.find((x) => x.value == title?.stream)?.name}
            </h1>
            <h1>
              <b>Status:</b> {titleStatus.find((x) => x.value == title?.status)?.name}
            </h1>
            <h1>
              <b>Genero:</b> {titleGenders.find((x) => x.value === title?.genero)?.name}
            </h1>
            <h1>
              <b>Tipo:</b> {titleTypes.find((x) => x.value === title?.tipo)?.name}
            </h1>
            <h1>
              <b>Classificação:</b> {titleClass.find((x) => x.value === title?.classificacao)?.name}
            </h1>
          </div>
        </div>

        <div className="w-full mt-10">
          <div className="text-start w-full px-10">
            <h1 className="text-2xl uppercase font-semibold">Nota:</h1>
            <p className="text-1xl w-3/4 mt-1 text-gray-400 italic break-words">
              {title?.nota || 'Nenhuma nota informada'}
            </p>
          </div>

          <div className="text-start w-full px-10 mt-10 text-gray-300">
            <h1 className="text-xl uppercase font-semibold">Sinopse:</h1>
            <p className="text-1xl w-3/4 mt-1 text-gray-400 italic break-words">
              {title?.sinopse || 'Nenhuma sinopse informada'}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-around mt-15 w-1/2">
          <Link to={'/meus-titulos'} draggable={false}>
            <CustomButton props={{
              content: 'Apagar Título',
              variant: 'default',
              onClick: () => { window.electron.ipcRenderer.invoke('remove-title', id); }
            }} />
          </Link>

          {userData?.token && (
            <CustomButton props={{
              content: 'Compartilhar',
              variant: 'default',
              onClick: () => {
                shareTitle({ title });
              }
            }} />
          )}

        </div>
      </div>
    </Loading>
  )
}
