import style from './itemHistorico.module.css';

export const ItemHistorico = ({nome, kmInicial, kmFinal, dataServico, nomeFuncionario, id, tipoVegetacao}) =>{
     return(
            <section className={style.container} key={id}>
                <div className={style.nomeKm}>
                    <p>{nome}</p>
                    <p>Km {kmInicial} ao {kmFinal}</p>
                </div>
                <p>{dataServico}</p>
                <p>{nomeFuncionario}</p>
                <p>{tipoVegetacao}</p>
            </section>
        )
}