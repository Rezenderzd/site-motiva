import style from './mainHistorico.module.css'
import { useContext } from "react"
import { MotivaContext } from "../MotivaContextProvider/Provider"
import { HistoricoContainer } from '../Historico-container'


export const MainHistorico = () =>{

    const{historico, funcionariosHistorico} = useContext(MotivaContext)

    return(
        <section className={style.container}>
            <section className={style.infoGeral}>
                <div className={style.containerInfo}>
                    <div className={style.textInfo}>
                        <p>Total de cortes</p>
                        <p>{historico.length}</p>
                    </div>
                    <p style={{color :' rgb(94, 34, 243)'}} className={style.icon}><i class="fa-solid fa-tractor"></i></p>
                </div>
                <div className={style.containerInfo}>
                    <div className={style.textInfo}>
                        <p>Área total atendia</p>
                        <p>{historico.length * 10} Km</p>
                    </div>
                    <p style={{color :'#333'}} className={style.icon}><i class="fa-solid fa-route"></i></p>
                </div>
                <div className={style.containerInfoRodovias}>
                    <h4>Top 3 funcionários com mais cortes</h4>
                    {funcionariosHistorico.map((funcionario)=>(
                        <p>{funcionario.nome} - {funcionario.quantidade}</p>
                    ))}
                </div>
            </section>
            <HistoricoContainer/>
        </section>
    )
}