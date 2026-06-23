import {Header} from './components/Header'
import {Main} from './components/Main'
import { MainMapa } from './components/Main-mapa'
import { InfoTrecho } from './components/Trecho-info'
import { useContext } from 'react'
import { MotivaContext } from './components/MotivaContextProvider/Provider'
import { MainSolicitacoes } from './components/Main-solicitacoes'
import { MainHistorico } from './components/Main-historico'
import { Login } from './components/Login'
import { AlterarSenha } from './components/Alterar-senha'


function App() {

  const {paginaAtual} = useContext(MotivaContext)

  return (
    <>
      <Header/>
      <Main>
        {paginaAtual == 'alterarSenha' && <AlterarSenha/>}
        {paginaAtual == 'login' && <Login/>}
        {paginaAtual == 'registro' && <InfoTrecho/>}
        {paginaAtual == 'mapa' && <MainMapa/>}
        {paginaAtual == 'solicitacoes' && <MainSolicitacoes/>}
        {paginaAtual == 'historico' &&  <MainHistorico/>}
      </Main>
    </>
  )
}

export default App
