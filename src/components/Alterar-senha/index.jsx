import style from './alterarSenha.module.css'
import { useContext, useState } from 'react';
import { MotivaContext } from '../MotivaContextProvider/Provider';

export const AlterarSenha = () =>{

    const { setPaginaAtual} = useContext(MotivaContext)
    
        const [senhaMudou, setSenhaMudou] = useState(false)
        const [isPasswordVisibleActual, setIsPasswordVisibleActual] = useState(false);
        const [isPasswordVisibleNew, setIsPasswordVisibleNew] = useState(false);
        const [isPasswordVisibleConfirm, setIsPasswordVisibleConfirm] = useState(false)
        const [email, setEmail] = useState("")
        const [senhaAntiga, setSenhaAntiga] = useState("")
        const [senhaNova, setSenhaNova] = useState("")
        const [confirmarSenhaNova, setConfirmarSenhaNova] = useState("")
        const [erros, setErros] = useState({})
        const [erroAlterarSenha, setErroAlterarSenha] = useState(false)
    
        const togglePasswordVisibilityActual = () => {
            setIsPasswordVisibleActual(!isPasswordVisibleActual);
        };

        const togglePasswordVisibilityNew =()=>{
            setIsPasswordVisibleNew(!isPasswordVisibleNew)
        }

        const togglePasswordVisibilityConfirm = () =>{
            setIsPasswordVisibleConfirm(!isPasswordVisibleConfirm)
        }
    
        const redirectPage  = () =>{
            setPaginaAtual('login')
        }
    
        const verificar = () =>{
            const e = {};
            if(!email.includes('@')) e.email = 'Digite um email válido'
            if(!email.trim()) e.email = 'Digite um email'
            if(senhaAntiga.length<8) e.senhaAntiga = 'Sua senha deve conter ao menos 8 caracteres'
            if(!senhaAntiga.trim()) e.senhaAntiga = 'Digite uma senha'
            if(senhaNova.length<8) e.senhaNova = 'Sua senha deve conter ao menos 8 caracteres'
            if(!senhaNova.trim()) e.senhaNova = 'Digite uma senha'
            if(confirmarSenhaNova.length<8) e.confirmarSenhaNova = 'Sua senha deve conter ao menos 8 caracteres'
            if(!confirmarSenhaNova.trim()) e.confirmarSenhaNova = 'Digite uma senha'
            if(senhaNova!= confirmarSenhaNova){ 
                e.confirmarSenhaNova = 'Senhas não coincidem' 
                e.senhaNova = 'Senhas não coincidem'
            }
            if(senhaAntiga == senhaNova) e.senhaNova = 'Senha nova não pode ser igual a antiga'
            setErros(e);
            if(Object.keys(e).length === 0){
                return true
            }
            return false
        }
    
        const mudarSenha = async () =>{
            if(!verificar()) return
            const response = await fetch('http://127.0.0.1:5003/funcionarios/mudar-senha', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, senhaAntiga, senhaNova})
            })
            const isFuncionario = await response.json()
            if(!isFuncionario){
                setErroAlterarSenha(true)
                setSenhaMudou(false);
                return
            }
            setSenhaMudou(true)
            setErroAlterarSenha(false)
            setTimeout(()=>{
                setPaginaAtual('login')
                setSenhaMudou(false)
            }, 3000)
        }

    return(
            <section className={style.main}>
                <section className={style.container}>
                    <img src='../public/Motiva.svg.png' alt='Logo Motiva' className={style.logo}></img>
                    <h2>Altere a sua senha</h2>
                    {senhaMudou? <p style={{color: '#2ecc71', textAlign:'center', margin:0}}><i class="fa-regular fa-circle-check"></i> Senha alterada, retornando para aba de login</p>: null}
                    <div className={style.informacoes}>
                        <label>E-mail corporativo</label>
                        <input
                        placeholder='fulano@motiva.com'
                        type='email'
                        onChange={(e) => setEmail(e.target.value)}
                        className={style.input}
                        ></input>
                        {erros.email? (<p style={{color: 'red', margin:0}}>{erros.email}</p>): null}
                    </div>
                    <div className={style.informacoes}>
                        <label>Senha atual</label>
                        <div className={style.inputSenha}>
                            <input
                            placeholder='**********'
                            type={isPasswordVisibleActual ? 'text' : 'password'}
                            className={style.input}
                            onChange={(e) => setSenhaAntiga(e.target.value)}
                            ></input>
                            {isPasswordVisibleActual? (<i class="fa-solid fa-eye" onClick={togglePasswordVisibilityActual}></i>): (<i class="fa-solid fa-eye-slash" onClick={togglePasswordVisibilityActual}></i>)}
                        </div>
                        {erros.senhaAntiga? (<p style={{color: 'red', margin:0}}>{erros.senhaAntiga}</p>): null}
                    </div>
                    <div className={style.informacoes}>
                        <label>Senha nova</label>
                        <div className={style.inputSenha}>
                            <input
                            placeholder='**********'
                            type={isPasswordVisibleNew ? 'text' : 'password'}
                            className={style.input}
                            onChange={(e) => setSenhaNova(e.target.value)}
                            ></input>
                            {isPasswordVisibleNew? (<i class="fa-solid fa-eye" onClick={togglePasswordVisibilityNew}></i>): (<i class="fa-solid fa-eye-slash" onClick={togglePasswordVisibilityNew}></i>)}
                        </div>
                        {erros.senhaNova? (<p style={{color: 'red', margin:0}}>{erros.senhaNova}</p>): null}
                    </div>
                    <div className={style.informacoes}>
                        <label>Confirmar senha nova</label>
                        <div className={style.inputSenha}>
                            <input
                            placeholder='**********'
                            type={isPasswordVisibleConfirm ? 'text' : 'password'}
                            className={style.input}
                            onChange={(e) => setConfirmarSenhaNova(e.target.value)}
                            ></input>
                            {isPasswordVisibleConfirm? (<i class="fa-solid fa-eye" onClick={togglePasswordVisibilityConfirm}></i>): (<i class="fa-solid fa-eye-slash" onClick={togglePasswordVisibilityConfirm}></i>)}
                        </div>
                        {erros.confirmarSenhaNova? (<p style={{color: 'red', margin:0}}>{erros.confirmarSenhaNova}</p>): null}
                    </div>
                    <button onClick={mudarSenha} className={style.btn}>Alterar senha</button>
                    {erroAlterarSenha? <p style={{color: 'red', margin:0}}>Email ou senha inválidos</p>: null}
                    <p className={style.textoCadastro}><span onClick={redirectPage}>Retornar para a aba de login</span></p>
                </section>
            </section>
        )
}