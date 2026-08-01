import { BlocoTrecho } from '../Bloco-trecho'
import style from './infoTrecho.module.css'
import { useContext, useEffect, useState } from 'react'
import { MotivaContext } from '../MotivaContextProvider/Provider'
import { InformacoesGeraisTrechos } from '../Informacoes-gerais'

export const InfoTrecho  = () =>{
    const {trechos, trechoExibir, setTrechoExibir} = useContext(MotivaContext)

    const [kmPesquisado, setKmPesquisado] = useState('')
    const [trechoPesquisado, setTrechoPesquisado] = useState('')

    useEffect(() => {

        const trechoFiltrado = trechos.filter(trecho => {
            const kmInicialStr = String(trecho.kmInicial)
            const kmFinalStr = String(trecho.kmFinal)
            const kmBuscaStr = String(kmPesquisado)
    
            const matchesTexto = trecho.trecho.toLowerCase().includes(trechoPesquisado.toLowerCase())
            const matchesKm = kmPesquisado === '' || kmInicialStr.includes(kmBuscaStr) || kmFinalStr.includes(kmBuscaStr)
            return matchesTexto && matchesKm
        })

        setTrechoExibir(trechoFiltrado);

    }, [kmPesquisado, trechoPesquisado]);


    return(
        <section className={style.container}>
            <InformacoesGeraisTrechos/>
            <h3>Monitoramento de trechos</h3>
            <div className={style.divInputs}>
                <input className={style.inputComIcon} placeholder='Buscar rodovia' value={trechoPesquisado} onChange={(e) => setTrechoPesquisado(e.target.value)}></input>
                <input className={style.inputComIcon} placeholder='Buscar Km' type='number' value={kmPesquisado} onChange={(e) => setKmPesquisado(e.target.value)}></input>
            </div>
            <div className={style.trechos}>
                {trechoExibir.map((trecho) =>{
                    return(
                        <BlocoTrecho
                            key={trecho.id}
                            id={trecho.id}
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
                            sensorEncoberto={trecho.sensorEncoberto}
                            vistoriaSolicitada = {trecho.vistoriaSolicitada}
                        />
                    )
                })}
            </div>
        </section>
    )
}