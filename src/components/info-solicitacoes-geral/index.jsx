import { useContext } from 'react';
import style from './infoGeralSolicitacoes.module.css'
import { MotivaContext } from '../MotivaContextProvider/Provider';

export const InfoGeralSolicitacoes= () =>{

    const {porcentagemSolicitacoes} = useContext(MotivaContext)

    return(
        <section className={style.container}>
            <div className={style.totalSolicitacoes}>
                <h4>Total de solicitacoes</h4>
                <div className={style.divNumeroSolicitacoes}>
                    <p>{porcentagemSolicitacoes.total}</p>
                    <i class="fa-solid fa-table-list" style={{color: 'rgb(94, 34, 243)', fontSize:'26px'}}></i>
                </div>
            </div>
            <div className={style.divPorcentagem}>
                <h4>Distribuição por região</h4>
                <div className={style.divItens}>
                    {porcentagemSolicitacoes.distribuicao.map((item, index) => {
                        return(
                            <div className={style.item} key={index}>
                                <div className={style.dadosItem}>
                                    <p>{item.nome}</p>
                                    <p>{item.porcentagem}%</p>
                                </div>
                                <div className={style.progressBar}>
                                    <div
                                    className={style.progressoPreenchido} 
                                    style={{ width: `${item.porcentagem}%` }}
                                    >
                                </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}