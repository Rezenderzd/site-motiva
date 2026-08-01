import { useContext } from "react";
import { MotivaContext } from "../MotivaContextProvider/Provider";
import style from './informacoesGerais.module.css'

export const InformacoesGeraisTrechos = () =>{

    const {trechos} = useContext(MotivaContext)
    
    const emDia = trechos.filter(t => t.status === 'Em dia').length;
    const emAtraso = trechos.filter(t => t.status === 'Atrasado').length;
    const emAlerta = trechos.filter(t => t.status === 'Alerta').length;
    const sensoresEncobertos = trechos.filter(t => t.sensorEncoberto === true).length

    return(
        <div className={style.infos}>
            <div className={style.total}>
                <h3>Total Rodovias</h3>
                <p>{trechos.length}</p>
            </div>
            <div className={style.total}>
                <h3 style={{color:'#2ecc71'}}>Em dia  <i class="fa-regular fa-circle-check"></i></h3>
                <p>{emDia}</p>
            </div>
            <div className={style.total}>
                <h3 style={{color:'#ba8e23'}}>Alerta <i class="fa-solid fa-triangle-exclamation"></i></h3>
                <p>{emAlerta}</p>
            </div>
            <div className={style.total}>
                <h3 style={{color:'#e74c3c'}}>Em atraso <i class="fa-solid fa-x"></i></h3>
                <p>{emAtraso}</p>
            </div>
            <div className={style.total}>
                <h3 style={{color:' rgb(94, 34, 243)'}}>Sensores encobertos <i class="fa-solid fa-triangle-exclamation"></i></h3>
                <p>{sensoresEncobertos}</p>
            </div>
        </div>
    )
}