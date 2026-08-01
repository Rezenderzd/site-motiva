import { useContext, useState } from 'react'
import style from './blocoTrecho.module.css'
import { MotivaContext } from '../MotivaContextProvider/Provider'

export const BlocoTrecho = ({id, trecho, kmInicial, kmFinal, tipoVegetacao, tamanho, status, latitudeInicial, longitudeInicial, latitudeFinal, longitudeFinal, sensorEncoberto, vistoriaSolicitada}) =>{

    const {setCoordenadas, setPaginaAtual, setTrechoSelecionado, getDashboardSolicitacao, getSolicitacoes, solicitacoes} = useContext(MotivaContext)
    const [exibirMensagem, setExibirMensagem] = useState(false)
    const [mensagem, setMensagem] = useState('')
    const [tipo, setTipo] = useState(false)

    const verDetalhes = () =>{
        setCoordenadas({
            inicial: { lat: latitudeInicial, lng: longitudeInicial },
            final: { lat: latitudeFinal, lng: longitudeFinal }
        });
        setPaginaAtual('mapa')
        setTrechoSelecionado(id)
    }

    const solicitarVistoria = async () =>{
        if(vistoriaSolicitada){
            setMensagem("Solicitação de vistoria já enviada")
            setTipo('erro')
            setExibirMensagem(true)
            setTimeout(() => {
                setExibirMensagem(false);
            }, 3000);
            return
        }
        const response = await fetch ('http://127.0.0.1:5000/solicitar-vistoria', {
            method: 'POST',
            headers:{"Content-Type": 'application/json'},
            body: JSON.stringify({id})
        })
        if(!response){
            setMensagem("Houve um erro ao enviar a solicitação de vistoria")
            setTipo('erro')
            setExibirMensagem(true)
            setTimeout(() => {
                setExibirMensagem(false);
            }, 3000);
            return
        }
        setMensagem('Solicitação de vistoria enviada com sucesso')
        setTipo('sucesso')
        setExibirMensagem(true)
        setTimeout(() => {
            setExibirMensagem(false);
        }, 3000);
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
                longitudeFinal: longitudeFinal,
                status: status
            }
            const solicitado = solicitacoes.find(solicitacao => solicitacao.id === id);
            if(solicitado){
                setMensagem("Uma solicitação já foi enviada para esse trecho")
                setTipo('erro')
                setExibirMensagem(true)
                setTimeout(() => {
                    setExibirMensagem(false);
                }, 3000);
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
            setMensagem('Solicitação de corte enviada com sucesso')
            setTipo('sucesso')
            setExibirMensagem(true)
        }
        catch(error){
            setMensagem("Houve um erro ao enviar a solicitação de vistoria")
            setTipo('erro')
            setExibirMensagem(true)
        }
        setTimeout(() => {
            setExibirMensagem(false);
        }, 3000);
    }

    const exibirAlerta = () =>{
        setMensagem(`O sensor do trecho ${trecho} do Km ${kmInicial} até o Km ${kmFinal} está encoberto`)
        setTipo('alerta')
        setExibirMensagem(true)
        setTimeout(() => {
            setExibirMensagem(false);
        }, 3000);
    }

    return(
        <>
            <div className={style.mensagemSucesso} style={{backgroundColor: tipo === 'sucesso'? '#1ea350': tipo === 'erro'? '#b91c1c': 'rgb(94, 34, 243)', display: exibirMensagem? 'flex': 'none'}}>
                <p>{tipo == 'sucesso'? <i class="fa-regular fa-circle-check"></i>: tipo === 'erro'? <i class="fa-solid fa-x"></i>: <i class="fa-solid fa-triangle-exclamation"></i>} {mensagem}</p>
            </div>
            <div className={style.container} style={{backgroundColor: status === 'Em dia' ? 'rgba(40, 204, 113, 0.08)' : status === 'Atrasado' ? 'rgba(231, 76, 60, 0.05)' : 'rgba(186,142,35,0.1)'}}>
                <div className={style.statusTitle}>
                    <h2>{trecho}</h2>
                    <p style={{color: status === 'Em dia' ? '#2ecc71' : status === 'Atrasado' ? '#e74c3c' : '#ba8e23'}}>Status: {status}</p>
                </div>
                <div className={style.kmEalerta}>
                    <p className={sensorEncoberto? style.kmEncoberto:style.km}>Km {kmInicial} ao Km {kmFinal}</p>
                    {sensorEncoberto? <i onClick={exibirAlerta} style={{color: ' rgb(94, 34, 243)', cursor:'pointer', fontSize:'22px'}} class="fa-solid fa-triangle-exclamation"></i>: null}
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
                    {tamanho >= 15 ? <button className={style.btnGrama}onClick={enviarSolicitacao}><i class="fa-solid fa-scissors"></i> Solicitar corte</button> : null}
                    <button onClick={verDetalhes} className={style.btnDetalhes}><i class="fa-solid fa-circle-info"></i> Ver detalhes</button>
                    {sensorEncoberto ? <button onClick={solicitarVistoria} className={style.btnSensor}><i class="fa-solid fa-user-plus"></i> Solicitar vistoria</button>: null}
                </div>
            </div>
        </>
    )
}