import { useState, useEffect } from "react"
import { MotivaContext } from "./Provider"  

export const MotivaProvider = ({children})=>{

    const [paginaAtual, setPaginaAtual] = useState('registro')
    
    const [trechos, setTrechos] = useState([])

    const getInfo = async()=>{
        try{
            const response = await fetch('http://127.0.0.1:5000/info-trecho', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            const data = await response.json()
            setTrechos(data)
        }catch(error){
            console.error('Erro ao enviar dados para o backend:', error)
        }
    }

    useEffect(() => {
        getInfo()
    }, [])

    const [coordenadas, setCoordenadas] = useState({
        inicial: { lat: -23.5617, lng: -46.6560 },
        final: { lat: -23.5660, lng: -46.6510 }
    });

    return(
    <MotivaContext.Provider value={{trechos, paginaAtual, setPaginaAtual, coordenadas, setCoordenadas}}>
        {children}
    </MotivaContext.Provider>)
}