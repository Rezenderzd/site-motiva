import { useContext } from 'react'
import style from './btn-login.module.css'
import { MotivaContext } from '../MotivaContextProvider/Provider'

export const BtnLogin = () =>{

    const {setIsLogin, setPaginaAtual}  = useContext(MotivaContext)

    const logout = () =>{
        localStorage.clear()
        setIsLogin(false)
        setPaginaAtual('login')
    }

    return (
        <button className={style.btn} onClick={logout}>Logout</button>
    )
}