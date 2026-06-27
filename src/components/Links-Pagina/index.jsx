//import { Link } from 'react-router-dom'
import { useContext, Link } from 'react'
import style from './links.module.css'
import { MotivaContext } from '../MotivaContextProvider/Provider'

export const Links = () =>{

    const {paginaAtual, setPaginaAtual, getHistorico, getDashboardHistorico, getInfo, getSolicitacoes, getDashboardSolicitacao} = useContext(MotivaContext)

    const alterarPagina = async (paginaNova, funcaoPegarDados, funcaoPegarDashboard) =>{
        setPaginaAtual(paginaNova)
        if(funcaoPegarDados) await funcaoPegarDados()
        if(funcaoPegarDashboard) await funcaoPegarDashboard()
    }
    
    return(
        <ul className={style.container}>
            <li className={`${style.link} ${paginaAtual=='registro'? style.active:''}`} onClick={()=> alterarPagina('registro', getInfo)}>Registro crescimento</li>
            <li className={`${style.link} ${paginaAtual=='mapa'? style.active:''}`} onClick={()=> alterarPagina('mapa')}>Mapa</li>
            <li className ={`${style.link} ${paginaAtual=='solicitacoes'? style.active:''}`} onClick={()=> alterarPagina('solicitacoes', getSolicitacoes, getDashboardSolicitacao)}>Solicitações Pendentes</li>
            <li className ={`${style.link} ${paginaAtual=='historico'? style.active:''}`} onClick = {()=> alterarPagina('historico', getHistorico, getDashboardHistorico)}>Historico</li>
        </ul>
    )
}