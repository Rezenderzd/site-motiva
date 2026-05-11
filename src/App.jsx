import {Header} from './components/Header'
import {Main} from './components/Main'
import { MainMapa } from './components/MainMapa'
import { InfoTrecho } from './components/Trecho-info'
import { useContext } from 'react'
import { MotivaContext } from './components/MotivaContextProvider/Provider'


function App() {

  const {paginaAtual} = useContext(MotivaContext)

  return (
    <>
      <Header/>
      <Main>
        {paginaAtual == 'registro' && <InfoTrecho/>}
        {paginaAtual == 'mapa' && <MainMapa/>}
      </Main>
    </>
  )
}

export default App
