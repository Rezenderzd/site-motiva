import { useContext } from 'react'
import style from './blocoTrecho.module.css'
import { MotivaContext } from '../MotivaContextProvider/Provider'

export const BlocoTrecho = ({id, trecho, kmInicial, kmFinal, tipoVegetacao, tamanho, status, latitudeInicial, longitudeInicial, latitudeFinal, longitudeFinal}) =>{

    const {setCoordenadas, setPaginaAtual, setTrechoSelecionado, getDashboardSolicitacao, getSolicitacoes, solicitacoes} = useContext(MotivaContext)

    const verDetalhes = () =>{
        setCoordenadas({
            inicial: { lat: latitudeInicial, lng: longitudeInicial },
            final: { lat: latitudeFinal, lng: longitudeFinal }
        });
        setPaginaAtual('mapa')
        setTrechoSelecionado(id)
    }

    const enviarSolicitacao = async ()=>{
        try {
            const dados =  {
                id:id,
                nomeTrecho:trecho,
                kmInicial: kmInicial,
                kmFinal: kmFinal,
                tipoVegetacao: tipoVegetacao,
                latitudeInicial: latitudeInicial,
                longitudeInicial: longitudeInicial,
                latitudeFinal: latitudeFinal,
                longitudeFinal: longitudeFinal
            }
            const solicitado = solicitacoes.find(solicitacao => solicitacao.id === id);
            if(solicitado){
                alert('Solicitação já enviada para este trecho.')
                return
            }
            await fetch('http://127.0.0.1:5001/solicitacoes/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados)
            })
            getDashboardSolicitacao()
            getSolicitacoes()
        }
        catch(error){
            console.error('Erro ao enviar solicitação:', error);
        }
    }

    return(
        <div className={style.container} style={{backgroundColor: status === 'Em dia' ? 'rgba(40, 204, 113, 0.08)' : status === 'Atrasado' ? 'rgba(231, 76, 60, 0.05)' : 'rgba(186,142,35,0.1)'}}>
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
                <p>{parseInt((tamanho/30)*100)}%</p>
            </div>
            <div className={style.progressBar}>
                <div style={{background: status === 'Em dia' ? '#2ecc71' : status === 'Atrasado' ? '#e74c3c' : '#ba8e23', width: `${(tamanho/30)*100}%`}}></div>
            </div>
            <div className={style.col7}>
                {tamanho >= 15 ? <button className={style.btnGrama}onClick={enviarSolicitacao}>Solicitar corte</button> : null}
                <button onClick={verDetalhes} className={style.btnDetalhes}>Ver detalhes</button>
            </div>
        </div>
    )
}