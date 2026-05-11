import { useContext } from 'react'
import style from './blocoTrecho.module.css'
import { MotivaContext } from '../MotivaContextProvider/Provider'

export const BlocoTrecho = ({trecho, kmInicial, kmFinal, tipoVegetacao, tamanho, status, latitudeInicial, longitudeInicial, latitudeFinal, longitudeFinal}) =>{

    const {setCoordenadas, setPaginaAtual} = useContext(MotivaContext)

    const verDetalhes = () =>{
        setCoordenadas({
            inicial: { lat: latitudeInicial, lng: longitudeInicial },
            final: { lat: latitudeFinal, lng: longitudeFinal }
        });
        setPaginaAtual('mapa')
    }

    return(
        <div className={style.container} style={{background: status === 'Em dia' ? 'rgba(40, 204, 113, 0.08)' : status === 'Atrasado' ? 'rgba(231, 76, 60, 0.05)' : 'rgba(186,142,35,0.1)'}}>
            <div className={style.statusTitle}>
                <h2>{trecho}</h2>
                <p style={{color: status === 'Em dia' ? '#2ecc71' : status === 'Atrasado' ? '#e74c3c' : '#ba8e23'}}>Status: {status}</p>
            </div>
            <p className={style.km}>Km {kmInicial} ao Km {kmFinal}</p>
            <div className={style.vegetacao}>
              <p>Tipo de Vegetação</p>
              <p>{tipoVegetacao}</p>
            </div>
            <div className={style.altura}>
                <p>Altura atual</p>
                <p style={{color: status === 'Em dia' ? '#2ecc71' : status === 'Atrasado' ? '#e74c3c' : '#ba8e23'}}>{tamanho} cm</p>
            </div>
            <div className={style.crescimento}>
                <p>Crescimento</p>
                <p>{parseInt((tamanho/50)*100)}%</p>
            </div>
            <div className={style.progressBar}>
                <div style={{background: status === 'Em dia' ? '#2ecc71' : status === 'Atrasado' ? '#e74c3c' : '#ba8e23', width: `${(tamanho/50)*100}%`}}></div>
            </div>
            <div className={style.col7}>
                {tamanho >= 30 ? <button className={style.btnGrama}>Grama cortada</button> : null}
                <button onClick={verDetalhes} className={style.btnDetalhes}>Ver detalhes</button>
            </div>
        </div>
    )
}