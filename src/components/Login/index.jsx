import { MotivaContext } from '../MotivaContextProvider/Provider';
import style from './login.module.css';
import { useContext, useState } from 'react';

export const Login = () =>{

    const { setPaginaAtual, setIsLogin} = useContext(MotivaContext)

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [check, setCheck] = useState(false)
    const [erros, setErros] = useState({})
    const [erroLogin, setErroLogin] = useState(false)

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const redirectPage  = () =>{
        setPaginaAtual('alterarSenha')
    }

    const verificar = () =>{
        const e = {};
        if(!email.includes('@')) e.email = 'Digite um email válido'
        if(!email.trim()) e.email = 'Digite um email'
        if(senha.length<8) e.senha = 'Sua senha deve conter ao menos 8 caracteres'
        if(!senha.trim()) e.senha = 'Digite uma senha'
        setErros(e);
        if(Object.keys(e).length === 0){
            return true
        }
        return false
    }

    const login = async () =>{
        if(!verificar()) return
        const response = await fetch('http://127.0.0.1:5003/funcionarios/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, senha})
        })
        const isFuncionario = await response.json()
        if(!isFuncionario){
            setErroLogin(true)
            return
        }
        setErroLogin(false)
        if(check){
            localStorage.setItem('email', email);
        }
        setIsLogin(true);
        setPaginaAtual('registro')
    }
    
    return(
        <section className={style.main}>
            <section className={style.container}>
                <img src='../public/Motiva.svg.png' alt='Logo Motiva' className={style.logo}></img>
                <h2>Bem vindo a Motiva!</h2>
                <p>Acesse sua plataforma de logística e monitoramento.</p>
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
                    <label>Senha</label>
                    <div className={style.inputSenha}>
                        <input
                        placeholder='**********'
                        type={isPasswordVisible ? 'text' : 'password'}
                        className={style.input}
                        onChange={(e) => setSenha(e.target.value)}
                        ></input>
                        {isPasswordVisible? (<i class="fa-solid fa-eye" onClick={togglePasswordVisibility}></i>): (<i class="fa-solid fa-eye-slash" onClick={togglePasswordVisibility}></i>)}
                    </div>
                    {erros.senha? (<p style={{color: 'red', margin:0}}>{erros.senha}</p>): null}
                </div>
                <div className={style.checkboxDiv}>
                    <input type='checkbox'
                    onChange={setCheck}></input>
                    <label>Lembrar-me neste dispositivo</label>
                </div>
                <button onClick={login} className={style.btn}>Entrar <i class="fa-solid fa-arrow-right"></i></button>
                {erroLogin? <p style={{color: 'red', margin:0}}>Email ou senha inválidos</p>: null}
                <p className={style.textoCadastro}>Deseja mudar de senha? <span onClick={redirectPage}>Clique aqui</span></p>
            </section>
        </section>
    )
}