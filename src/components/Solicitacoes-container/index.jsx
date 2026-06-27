import style from "./solicitacoesContainer.module.css";
import { useContext, useState, useEffect } from "react";
import { MotivaContext } from "../MotivaContextProvider/Provider";
import { ItemSolicitacao } from "../Item-solicitacao";

export const SolicitacoesContainer = () => {
  const { solicitacoes, setTrechoExibir, trechoExibir } = useContext(MotivaContext);
  const [kmPesquisado, setKmPesquisado] = useState("");
  const [trechoPesquisado, setTrechoPesquisado] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 3;
  const indiceFinal = paginaAtual * itensPorPagina;
  const indiceInicial = indiceFinal - itensPorPagina;
  const itensPaginados = trechoExibir.slice(indiceInicial, indiceFinal);
  const totalPaginas = Math.ceil(trechoExibir.length / itensPorPagina);

  useEffect(() => {
    const listaSolicitacoes = solicitacoes || [];

    const trechoFiltrado = listaSolicitacoes.filter((trecho) => {
      const kmInicialStr = String(trecho.kmInicial || "");
      const kmFinalStr = String(trecho.kmFinal || "");
      const kmBuscaStr = String(kmPesquisado);

      const nomeTrecho = trecho.nomeTrecho || "";
      const matchesTexto = nomeTrecho
        .toLowerCase()
        .includes(trechoPesquisado.toLowerCase());

      const matchesKm =
        kmPesquisado === "" ||
        kmInicialStr.includes(kmBuscaStr) ||
        kmFinalStr.includes(kmBuscaStr);

      return matchesTexto && matchesKm;
    });

    setTrechoExibir(trechoFiltrado);
  }, [kmPesquisado, trechoPesquisado, solicitacoes]);

  const irParaProximaPagina = () => {
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  const irParaPaginaAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  const formatarData = (dataBruta) => {
    if (!dataBruta) return "";

    const separador = dataBruta.includes("-") ? "-" : "/";
    const partes = dataBruta.split(separador);

    const ano = partes[0];
    const mes = partes[1];
    const dia = partes[2].split("T")[0];

    return `${dia}/${mes}/${ano}`;
  };
  

  return (
    <section className={style.container}>
      <div className={style.divHeader}>
        <h3>Lista solicitações</h3>
        <div className={style.divInputs}>
          <input
            className={style.inputComIcon}
            placeholder="Buscar rodovia"
            value={trechoPesquisado}
            onChange={(e) => setTrechoPesquisado(e.target.value)}
          ></input>
          <input
            className={style.inputComIcon}
            placeholder="Buscar Km"
            type="number"
            value={kmPesquisado}
            onChange={(e) => setKmPesquisado(e.target.value)}
          ></input>
        </div>
      </div>

      <div>
        {itensPaginados.length === 0 ? (
          <p className={style.aviso}>Não há solicitações no momento.</p>
        ) : (
          <>
            <div className={style.headerSolicitacoes}>
              <p>TRECHO</p>
              <p>DATA SOLICITAÇÃO</p>
              <p>DATA LIMITE</p>
              <p>VER DETALHES</p>
            </div>

            {itensPaginados.map((solicitacao) => (
              <ItemSolicitacao
                key={solicitacao.id}
                id={solicitacao.id}
                nome={solicitacao.nomeTrecho}
                kmInicial={solicitacao.kmInicial}
                kmFinal={solicitacao.kmFinal}
                dataSolicitcacao={formatarData(solicitacao.dataSolicitacao)}
                dataLimite={formatarData(solicitacao.dataLimite)}
              />
            ))}
            <div className={style.paginacaoContainer}>
              <span className={style.textoRegistros}>
                Exibindo {itensPaginados.length} de {trechoExibir.length}{" "}
                registros
              </span>

              <div className={style.botoesPaginacao}>
                <button
                  onClick={irParaPaginaAnterior}
                  disabled={paginaAtual === 1}
                  className={style.botaoSeta}
                >
                  <i class="fa-solid fa-angle-left"></i>
                </button>
                <button
                  onClick={irParaProximaPagina}
                  disabled={paginaAtual === totalPaginas || totalPaginas === 0}
                  className={style.botaoSeta}
                >
                  <i class="fa-solid fa-angle-right"></i>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
