import style from './header.module.css'
import { Links } from '../Links-Pagina'
import { Logo } from '../Logo-Motiva'
import { BtnLogin } from '../Btn-login'


export const Header = () =>{
    return(
        <header className={style.container}>
            <Logo/>
            <Links/>
            <BtnLogin/>
        </header>
    )
}