import { useContext } from 'react';
import style from './itemSolicitacao.module.css'
import { MotivaContext } from '../MotivaContextProvider/Provider';

export const ItemSolicitacao = ({nome, kmInicial, kmFinal, dataSolicitcacao, dataLimite, id})=>{
    
    const{solicitacoes, setCoordenadas, setPaginaAtual, setTrechoSelecionado} = useContext(MotivaContext)
    
    const verDetalhes = (id) =>{
        const solicitacaoSelecionada = solicitacoes.find(solicitacao => solicitacao.id === id);
        setCoordenadas({
            inicial: { lat: solicitacaoSelecionada.latitudeInicial, lng: solicitacaoSelecionada.longitudeInicial },
            final: { lat: solicitacaoSelecionada.latitudeFinal, lng: solicitacaoSelecionada.longitudeFinal }
        });
        setPaginaAtual('mapa')
        setTrechoSelecionado(id)
    }
    
    return(
        <section className={style.container} key={id}>
            <div className={style.nomeKm}>
                <p>{nome}</p>
                <p>Km {kmInicial} ao {kmFinal}</p>
            </div>
            <p>{dataSolicitcacao}</p>
            <p>{dataLimite}</p>
            <button onClick={()=> verDetalhes(id)}>Ver detalhes</button>
        </section>
    )
}