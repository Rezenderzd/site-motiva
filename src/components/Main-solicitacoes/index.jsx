import { useContext, useEffect } from 'react'
import { InfoGeralSolicitacoes } from '../info-solicitacoes-geral'
import { SolicitacoesContainer } from '../Solicitacoes-container'
import style from './mainSolicitacoes.module.css'
import { MotivaContext } from '../MotivaContextProvider/Provider'

export const MainSolicitacoes = () =>{
    const {getSolicitacoes} = useContext(MotivaContext)

    useEffect(() => {
        getSolicitacoes()
    },[])

    return(
        <section className={style.section}>
            <div className={style.header}>
                <h2 className={style.h2}>Solicitações</h2>
                <p>Aqui estão as solicitações de manutenção das rodovias, onde será possível acompanhar os cortes necessários.</p>
            </div>
            <InfoGeralSolicitacoes/>
            <SolicitacoesContainer/>
        </section>
    )
}