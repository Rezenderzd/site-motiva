import style from './header.module.css'
import { Links } from '../Links-Pagina'
import { Logo } from '../Logo-Motiva'
import { BtnLogin } from '../Btn-login'
import { useContext } from 'react'
import { MotivaContext } from '../MotivaContextProvider/Provider'

export const Header = () =>{

    const {isLogin} = useContext(MotivaContext)

    if(!isLogin){
        return null
    }

    return(
        
        <header className={style.container}>
            <Logo/>
            <Links/>
            <BtnLogin/>
        </header>
    )
}