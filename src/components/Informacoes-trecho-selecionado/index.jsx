import { useContext } from "react"
import { MotivaContext } from "../MotivaContextProvider/Provider"
import style from './informacoesTrechoSelecionado.module.css'
import { FaCircle } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import { LiaMapMarkerAltSolid } from "react-icons/lia";
import { FaArrowsLeftRight } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";

export const InformacoesTrechoSelecionado = () =>{
    
    const {trechoSelecionado, trechos} = useContext(MotivaContext)

    if(!trechoSelecionado){
        return null
    }

    const trechoExibido = trechos.find(t =>t.id === trechoSelecionado)

    return(
        <section className={style.container}>
            <h4>Informações do trecho</h4>
            <div className={style.status} style={{backgroundColor: trechoExibido.status === 'Em dia' ? 'rgba(40, 204, 113, 0.2)' : trechoExibido.status === 'Atrasado' ? 'rgba(231, 76, 60, 0.15)' : 'rgba(186,142,35,0.3)'}}>
                <p style={{color: trechoExibido.status === 'Em dia' ? '#2ecc71' : trechoExibido.status === 'Atrasado' ? '#e74c3c' : '#ba8e23'}}> <FaCircle /> {trechoExibido.status}</p>
            </div>
            <div className={style.infoRodovia}>
                <p className={style.rodoviaIcon}><FaBuilding /></p>
                <div className={style.rodoviaNome}>
                    <p>RODOVIA</p>
                    <p>{trechoExibido.trecho}</p>
                </div>
            </div>
            <div className={style.infoKm}>
                <div className={style.kmInicial}>
                    <p className={style.kmIcon}><LiaMapMarkerAltSolid /></p>
                    <div className={style.kmTexto}>
                        <p>KM INICIAL</p>
                        <p>{trechoExibido.kmInicial}</p>
                    </div>
                </div>
                <div className={style.kmFinal}>
                    <p className={style.kmIcon}><LiaMapMarkerAltSolid /></p>
                    <div className={style.kmTexto}>
                        <p>KM FINAL</p>
                        <p>{trechoExibido.kmFinal}</p>
                    </div>
                </div>
            </div>
            <div className={style.infoTamanho}>
                <div className={style.tamanhoLabel}>
                    <p><FaArrowsLeftRight /></p>
                    <p>Tamanho Atual</p>
                </div>
                <p>{trechoExibido.tamanho} cm</p>
            </div>
            <div className={style.infoCrescimento}>
                <div className={style.crescimentoLabel}>
                    <p><FaArrowTrendUp /></p>
                    <p>Crescimento diário</p>
                </div>
                <p>5 cm</p>
            </div>
            <div className={style.proximoCorte}>
                <div className={style.proximoCorteLabel}>
                    <p className={style.proximoCorteIcon}><CiCalendar /></p>
                    <p>Previsão próximo corte</p>
                </div>
                <p>2 dias</p>
            </div>
        </section>
        
    )
}