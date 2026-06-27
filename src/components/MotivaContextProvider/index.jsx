import { useState, useEffect } from "react"
import { MotivaContext } from "./Provider"  

export const MotivaProvider = ({children})=>{

    const [paginaAtual, setPaginaAtual] = useState('login')
    
    const [trechos, setTrechos] = useState([])

    const [isLogin, setIsLogin] = useState(false)

    const [trechoSelecionado, setTrechoSelecionado]  = useState('')

    const [trechoExibir, setTrechoExibir] = useState([])

    const [coordenadas, setCoordenadas] = useState({
        inicial: { lat: -23.5617, lng: -46.6560 },
        final: { lat: -23.5660, lng: -46.6510 }
    });

    const [porcentagemSolicitacoes, setPorcentagemSolicitacoes] = useState({ total: 0, distribuicao: [] })

    const [solicitacoes, setSolicitacoes] = useState([])

    const [historico, setHistorico] = useState([])

    const [funcionariosHistorico, setFuncionariosHistorico]  = useState([])


    const getInfo = async()=>{
        try{
            const response = await fetch('http://127.0.0.1:5000/info-trecho', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            const data = await response.json()
            setTrechos(data)
            setTrechoExibir(data)
        }catch(error){
            console.error('Erro ao receber dados do backend(trechos):', error)
        }
    }

    const getDashboardSolicitacao = async()=>{
        try{
            const response = await fetch('http://127.0.0.1:5001/solicitacoes/porcentagem',{
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            const data = await response.json()
            setPorcentagemSolicitacoes(data)
        }catch(error){
            console.error('Erro ao receber dados do backend (solicitacoes/porcentagem):', error)
        }
    }

    const getSolicitacoes = async()=>{
        try{
            const response = await fetch('http://127.0.0.1:5001/solicitacoes/geral',{
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            const data = await response.json()
            setSolicitacoes(data)
        }catch(error){
            console.error('Erro ao receber dados do backend (solicitacoes/geral):', error)
        }
    }

    const getHistorico = async() =>{
        try{
            const response =  await fetch('http://127.0.0.1:5002/historico/pegar',{
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            })
            const historico = await response.json()
            const historicoOrdenado = historico.sort((a, b) => {
                if (!a.dataCorte) return 1;
                if (!b.dataCorte) return -1;
                
                return new Date(b.dataCorte) - new Date(a.dataCorte);
              });
            setHistorico(historicoOrdenado)
        }catch(error){
            console.log(`Erro ao pegar o historico: ${error}`)
        }
    }

    const getDashboardHistorico = async() =>{
        try{
            const response =  await fetch('http://127.0.0.1:5002/historico/dashboard',{
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            })
            const data = await response.json()
            setFuncionariosHistorico(data)
        }catch(error){
            console.log(`Erro ao pegar dashboard historico ${error}`)
        }
    }

    useEffect(() => {
        const emailSalvo = localStorage.getItem('email');
        if(emailSalvo !== null){
            setIsLogin(true)
            setPaginaAtual('registro')
        } else {
            setIsLogin(false)
            setPaginaAtual('login')
        }

        getInfo()
    }, [])

    return(
    <MotivaContext.Provider value={{trechos, paginaAtual, setPaginaAtual, coordenadas, 
    setCoordenadas, trechoExibir, setTrechoExibir, setTrechoSelecionado,trechoSelecionado,
    solicitacoes, setSolicitacoes, porcentagemSolicitacoes, setPorcentagemSolicitacoes,getHistorico, getDashboardHistorico, getInfo, getSolicitacoes, getDashboardSolicitacao,
    setHistorico, historico, funcionariosHistorico, isLogin, setIsLogin
    }}>
        {children}
    </MotivaContext.Provider>)
}