import { Mapa } from '../Mapa'
import style from './main-mapa.module.css'

export const MainMapa = ()  =>{
    return(
        <section className={style.container}>
            <h3>Mapa</h3>
            <Mapa/>
        </section>
    )
}