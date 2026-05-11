//import { Link } from 'react-router-dom'
import { useContext, Link } from 'react'
import style from './links.module.css'
import { MotivaContext } from '../MotivaContextProvider/Provider'

export const Links = () =>{

    const {paginaAtual, setPaginaAtual} = useContext(MotivaContext)
    
    return(
        <ul className={style.container}>
            <li className={`${style.link} ${paginaAtual=='registro'? style.active:''}`} onClick={()=> setPaginaAtual('registro')}>Registro crescimento</li>
            <li className={`${style.link} ${paginaAtual=='mapa'? style.active:''}`} onClick={()=> setPaginaAtual('mapa')}>Mapa</li>
            <li className ={`${style.link} ${paginaAtual=='menu3'? style.active:''}`}>Menu 3</li>
        </ul>
    )
}