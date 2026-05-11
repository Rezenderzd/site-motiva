import { BlocoTrecho } from '../Bloco-trecho'
import style from './infoTrecho.module.css'
import { useContext, useEffect, useState } from 'react'
import { MotivaContext } from '../MotivaContextProvider/Provider'
import { InformacoesGeraisTrechos } from '../Informacoes-gerais'

export const InfoTrecho  = () =>{
    const {trechos} = useContext(MotivaContext)



    return(
        <section className={style.container}>
            <InformacoesGeraisTrechos/>
            <h3>Monitoramento de trechos</h3>
            <div className={style.trechos}>
                {trechos.map((trecho, index) =>{
                    return(
                        <BlocoTrecho
                            key={index}
                            trecho={trecho.trecho}
                            kmInicial={trecho.kmInicial}
                            kmFinal={trecho.kmFinal}
                            tipoVegetacao={trecho.tipoVegetacao}
                            tamanho={trecho.tamanho}
                            status={trecho.status}
                            latitudeInicial = {trecho.latitudeInicial}
                            longitudeInicial = {trecho.longitudeInicial}
                            latitudeFinal = {trecho.latitudeFinal}
                            longitudeFinal = {trecho.longitudeFinal}
                        />
                    )
                })}
            </div>
        </section>
    )
}