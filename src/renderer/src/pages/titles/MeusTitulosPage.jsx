import React from 'react'
import TitleCard from '../../components/elements/TitleCard.jsx'
import Loading from '../../components/elements/Loading.jsx'
import TitlesSearchFilter from '../../components/elements/TitlesSearchFilter.jsx'

export default function MeusTitulosPage() {
  const [loaded, setLoaded] = React.useState(false)
  const [titles, setTitles] = React.useState([])

  const [notaFilter, setNotaFilter] = React.useState(3)
  const [statusFilter, setStatusFilter] = React.useState('nunca-assistido')
  const [useFilter, setUseFilter] = React.useState(false)

  const handleFind = () => {
    const search = document.getElementById('search')?.value;
    if (String(search).length < 1) window.location.reload();

    window.electron.ipcRenderer.invoke('find-title', {
      search: search,
      nota: notaFilter,
      status: statusFilter,
      useFilter: useFilter,
    }).then((res) => {
      console.log(res);
      setTitles(res)
    })
  };

  React.useEffect(() => {
    window.electron.ipcRenderer.invoke('get-titles').then(async (res) => {
      setTitles(res)
      setLoaded(true)
    })
  }, [])

  return (
    <Loading loaded={loaded}>
      <div className="flex w-full h-full">
        <div id="window" className="w-full">
          <div className="flex justify-center items-center">
            <div className="flex items-center container w-1/3 rounded-md">
              <input
                title="Pesquisar título"
                // onChange={handleFind}
                id="search"
                className="w-full text-white p-2 rounded-md"
                required
                minLength={1}
                maxLength={60}
                placeholder="Pesquisar título..."
                type="text"
              />
              <div onClick={handleFind} className="w-[35px] h-[35px] p-2 rounded-md mx-1 hover:bg-[#222] cursor-pointer hover:duration-300 duration-300 flex items-center justify-center">
                <span title="Pesquisar">🔎</span>
              </div>
            </div>
          </div>

          <div className="w-full mt-10 flex justify-center items-center">
            <div
              className="overflow-y-auto p-4 h-[75dvh] space-y-2 rounded-md"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#191924 #121214',
                scrollBehavior: 'smooth'
              }}
            >
              {titles.sort((a, b) => a.titulo.localeCompare(b.titulo)).map((title) => {
                return <TitleCard key={title.id} props={title} />
              })}
            </div>
          </div>
        </div>
        <div
          className=" text-white rounded-md min-w-45 w-65 h-full p-2 bg-[#121214] border-[#222] border"
          id="options"
        >
          <TitlesSearchFilter
            notaFilter={notaFilter}
            setNotaFilter={setNotaFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            useFilter={useFilter}
            setUseFilter={setUseFilter}
          />
        </div>
      </div>
    </Loading>
  )
}
