import React from 'react'
import Loading from '../../components/elements/Loading'
import titleGenders from '../../components/titleInfos/titleGenders';

export default function MeuPerfilPage() {
  const [loaded, setLoaded] = React.useState(false);

  const [favoritoGender, setFavoritoGender] = React.useState('Carregando...');
  const [favoriteGenderCount, setFavoritoGenderCount] = React.useState(0);
  const [totalDeTitulos, setTotalDeTitulos] = React.useState('Carregando...');
  const [history, setHistory] = React.useState([]);

  const titulosNaNuvem = 0;

  async function loadProfile() {
    await window.electron.ipcRenderer.invoke('favorite-gender').then((res) => {
      const favorito = res.favorito;
      const maxCount = res.maxCount;

      setFavoritoGender(favorito);
      setFavoritoGenderCount(maxCount);
    });

    await window.electron.ipcRenderer.invoke('total-titles').then((res) => {
      setTotalDeTitulos(res);
    });

    await window.electron.ipcRenderer.invoke('load-history').then((res) => {
      setHistory(res);
    });

    setLoaded(true);
  };

  React.useEffect(() => {
    loadProfile();
  }, []);

  return (
    <Loading loaded={loaded}>
      <div className="flex w-full h-full">
        <div className="w-full h-full flex flex-col justify-evenly">

          {/* PERFIL */}
          <div className='w-[95%] h-1/2 flex rounded-md text-white mx-auto my-3'>
            {/* PERFIL */}
            <div className='w-1/2 mx-2 container rounded-md'>
              <span className='uppercase mt-1 text-[#777] font-semibold mx-auto w-full flex justify-center'>PERFIL</span>
              <hr className='mt-2 border border-[#222] w-[95%] mx-auto' />

              <div className='w-full h-full'>
                <div className="flex flex-col items-center justify-center mt-10">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#777]"></div>
                  <h1 className="text-[#777] mt-4">Carregando...</h1>
                </div>
              </div>

            </div>

            {/* TITULOS */}
            <div className='w-1/2 mx-2 container rounded-md'>
              <span className='uppercase mt-1 text-[#777] font-semibold mx-auto w-full flex justify-center'>SEUS TÍTULOS</span>
              <hr className='mt-2 border border-[#222] w-[95%] mx-auto' />

              <div className='w-full h-full ml-3'>
                <div className='w-full flex justify-between font-bold uppercase p-1 mt-2'>
                  <h1 className='text-start'>Total de Títulos: </h1>
                  <h1 className='text-center w-1/3'>{totalDeTitulos}</h1>
                </div>
                <hr className='my-2 border border-[#222] w-[95%]' />
                <div className='w-full flex justify-between font-bold uppercase p-1'>
                  <h1>Títulos Sincronizados: </h1>
                  <h1 className='text-center w-1/3'>{titulosNaNuvem}</h1>
                </div>
                <hr className='my-2 border border-[#222] w-[95%]' />
                <div className='w-full flex justify-between font-bold uppercase p-1'>
                  <h1>Gênero favorito: </h1>
                  <h1 className='flex text-center w-1/3'>{titleGenders.find(x => x.value == favoritoGender)?.name}<span className='text-[12px] text-[#777] ml-1'>({favoriteGenderCount})</span></h1>
                </div>
                <hr className='my-2 border border-[#222] w-[95%]' />
              </div>

            </div>

          </div>

          {/* ATIVIDADE */}
          <div className='w-[95%] h-1/2 container rounded-md text-white mx-auto my-3'>
            <span className='uppercase mt-1 text-[#777] font-semibold mx-auto w-full flex justify-center'>Atividade Recente</span>
            <hr className='mt-2 border border-[#222] w-[95%] mx-auto' />

            <div className='w-full mt-1'>
              <div className='w-full text-start ml-[2.5%] mt-5'>
                {history.length > 1 ? history.map((item, index) => {
                  return (
                    <>
                    </>
                  )
                }) : (
                  <span className='text-[#444]'>Nenhum atividade recente registrada...</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className='w-[320px] container h-full rounded-md flex flex-col'>
          <div className='w-full'>
            <span className='uppercase mt-1 text-[#777] font-semibold mx-auto w-full flex justify-center'>Amigos</span>
            <hr className='mt-2 border border-[#222] w-[95%] mx-auto' />
          </div>
          <div className='w-full h-full mt-2'>
            <div className='w-full text-center'>
              <span className='text-[#444]'>Nenhum amigo adicionado...</span>
            </div>
          </div>
        </div>
      </div>
    </Loading>
  )
}
