
'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

type CorPeca = 'B' | 'P';
type TipoPeca = 'R' | 'N' | 'B' | 'Q' | 'K' | 'P';

interface PecaCorporativa {
  id: string;
  tipo: TipoPeca;
  cor: CorPeca;
  nome: string;
}

type TabuleiroCorporativo = (PecaCorporativa | null)[][];

interface MovimentoMercado {
  deLinha: number;
  deColuna: number;
  paraLinha: number;
  paraColuna: number;
  peso: number;
}

interface Adversario {
  nome: string;
  lider: string;
  cargo: string;
  corText: string;
}

/* =========================================================
   TABULEIRO INICIAL
========================================================= */

const criarTabuleiroCorporativo = (): TabuleiroCorporativo => {
  const grid: TabuleiroCorporativo = Array.from(
    { length: 8 },
    () => Array<PecaCorporativa | null>(8).fill(null)
  );

  // WSCode / pretas
  grid[0] = [
    { id: 'p1', tipo: 'R', cor: 'P', nome: 'Torre' },
    { id: 'p2', tipo: 'N', cor: 'P', nome: 'Cavalo' },
    { id: 'p3', tipo: 'B', cor: 'P', nome: 'Bispo' },
    { id: 'p4', tipo: 'Q', cor: 'P', nome: 'Rainha' },
    { id: 'p5', tipo: 'K', cor: 'P', nome: 'Rei' },
    { id: 'p6', tipo: 'B', cor: 'P', nome: 'Bispo' },
    { id: 'p7', tipo: 'N', cor: 'P', nome: 'Cavalo' },
    { id: 'p8', tipo: 'R', cor: 'P', nome: 'Torre' },
  ];

  for (let c = 0; c < 8; c++) {
    grid[1][c] = {
      id: `ps${c}`,
      tipo: 'P',
      cor: 'P',
      nome: 'Peão',
    };
  }

  // Aliados / brancas
  for (let c = 0; c < 8; c++) {
    grid[6][c] = {
      id: `bp${c}`,
      tipo: 'P',
      cor: 'B',
      nome: 'Peão',
    };
  }

  grid[7] = [
    { id: 'b1', tipo: 'R', cor: 'B', nome: 'Torre' },
    { id: 'b2', tipo: 'N', cor: 'B', nome: 'Cavalo' },
    { id: 'b3', tipo: 'B', cor: 'B', nome: 'Bispo' },
    { id: 'b4', tipo: 'Q', cor: 'B', nome: 'Rainha' },
    { id: 'b5', tipo: 'K', cor: 'B', nome: 'Rei' },
    { id: 'b6', tipo: 'B', cor: 'B', nome: 'Bispo' },
    { id: 'b7', tipo: 'N', cor: 'B', nome: 'Cavalo' },
    { id: 'b8', tipo: 'R', cor: 'B', nome: 'Torre' },
  ];

  return grid;
};

/* =========================================================
   COMPONENTE
========================================================= */

export function ComponenteJogos(): React.JSX.Element {
  const [tabuleiro, setTabuleiro] =
    useState<TabuleiroCorporativo>(() =>
      criarTabuleiroCorporativo()
    );

  const [turno, setTurno] = useState<CorPeca>('B');

  const [logsMercado, setLogsMercado] = useState<string[]>([
    'Sessão encerrada. Seleccione um novo líder executivo.',
  ]);

  const [casaDe, setCasaDe] =
    useState<[number, number] | null>(null);

  const [casaPara, setCasaPara] =
    useState<[number, number] | null>(null);

  const [kpisMarcas, setKpisMarcas] = useState(100);
  const [kpisWSCode, setKpisWSCode] = useState(100);

  const [adversarioSelecionado, setAdversarioSelecionado] =
    useState<string | null>(null);

  const [indiceSelecao, setIndiceSelecao] = useState(0);

  const [jogoEmExecucao, setJogoEmExecucao] = useState(false);

  /*
   * Refs usados pelo motor da simulação.
   */
  const tabuleiroRef = useRef(tabuleiro);
  const turnoRef = useRef(turno);
  const adversarioRef = useRef(adversarioSelecionado);
  const jogoAtivoRef = useRef(jogoEmExecucao);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );

  /* =========================================================
     ADVERSÁRIOS
  ========================================================= */

  const listaAdversariosDisponiveis: Adversario[] = useMemo(
    () => [
      {
        nome: 'Vodacom',
        lider: 'Simon Karikari',
        cargo: 'Director Geral',
        corText: 'text-[#e60000]',
      },
      {
        nome: 'Standard Bank',
        lider: 'Chuma Nwokocha',
        cargo: 'Director Executivo',
        corText: 'text-slate-300',
      },
      {
        nome: 'BCI',
        lider: 'Francisco Costa',
        cargo: 'Presidente Executivo',
        corText: 'text-[#ff6600]',
      },
      {
        nome: 'Tmcel',
        lider: 'Mahomed Rafique Jusob',
        cargo: 'Presidente do Conselho',
        corText: 'text-[#f2cc00]',
      },
      {
        nome: 'Movitel',
        lider: 'Victor Donato',
        cargo: 'Director Geral',
        corText: 'text-[#e85a12]',
      },
      {
        nome: 'Millennium bim',
        lider: 'Rui Barros',
        cargo: 'Presidente Executivo',
        corText: 'text-[#d11c5c]',
      },
    ],
    []
  );

  const adversarioAtual =
    listaAdversariosDisponiveis[indiceSelecao];

  /* =========================================================
     SINCRONIZAÇÃO DOS REFS
  ========================================================= */

  useEffect(() => {
    tabuleiroRef.current = tabuleiro;
  }, [tabuleiro]);

  useEffect(() => {
    turnoRef.current = turno;
  }, [turno]);

  useEffect(() => {
    adversarioRef.current = adversarioSelecionado;
  }, [adversarioSelecionado]);

  useEffect(() => {
    jogoAtivoRef.current = jogoEmExecucao;
  }, [jogoEmExecucao]);

  /* =========================================================
     MOVIMENTOS
  ========================================================= */

  const analisarMovimentosValidos = (
    grid: TabuleiroCorporativo,
    corTurno: CorPeca
  ): MovimentoMercado[] => {
    const lista: MovimentoMercado[] = [];

    const direcoesLineares = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    const direcoesDiagonais = [
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ];

    const adicionarMovimento = (
      deLinha: number,
      deColuna: number,
      paraLinha: number,
      paraColuna: number,
      peso: number
    ) => {
      if (
        paraLinha < 0 ||
        paraLinha >= 8 ||
        paraColuna < 0 ||
        paraColuna >= 8
      ) {
        return false;
      }

      const destino = grid[paraLinha][paraColuna];

      if (!destino) {
        lista.push({
          deLinha,
          deColuna,
          paraLinha,
          paraColuna,
          peso,
        });

        return true;
      }

      if (destino.cor !== corTurno) {
        lista.push({
          deLinha,
          deColuna,
          paraLinha,
          paraColuna,
          peso: peso + 20,
        });
      }

      return false;
    };

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const peca = grid[r][c];

        if (!peca || peca.cor !== corTurno) {
          continue;
        }

        /* =========================
           PEÃO
        ========================= */

        if (peca.tipo === 'P') {
          const sentido = corTurno === 'B' ? -1 : 1;
          const proximaLinha = r + sentido;

          if (
            proximaLinha >= 0 &&
            proximaLinha < 8 &&
            !grid[proximaLinha][c]
          ) {
            lista.push({
              deLinha: r,
              deColuna: c,
              paraLinha: proximaLinha,
              paraColuna: c,
              peso: 1,
            });
          }

          for (const dc of [-1, 1]) {
            const destinoColuna = c + dc;

            if (
              destinoColuna >= 0 &&
              destinoColuna < 8 &&
              proximaLinha >= 0 &&
              proximaLinha < 8
            ) {
              const alvo =
                grid[proximaLinha][destinoColuna];

              if (alvo && alvo.cor !== corTurno) {
                lista.push({
                  deLinha: r,
                  deColuna: c,
                  paraLinha: proximaLinha,
                  paraColuna: destinoColuna,
                  peso: 20,
                });
              }
            }
          }

          continue;
        }

        /* =========================
           CAVALO
        ========================= */

        if (peca.tipo === 'N') {
          const movimentosCavalo = [
            [-2, -1],
            [-2, 1],
            [-1, -2],
            [-1, 2],
            [1, -2],
            [1, 2],
            [2, -1],
            [2, 1],
          ];

          for (const [dr, dc] of movimentosCavalo) {
            adicionarMovimento(
              r,
              c,
              r + dr,
              c + dc,
              3
            );
          }

          continue;
        }

        /* =========================
           REI
        ========================= */

        if (peca.tipo === 'K') {
          const todasDirecoes = [
            ...direcoesLineares,
            ...direcoesDiagonais,
          ];

          for (const [dr, dc] of todasDirecoes) {
            adicionarMovimento(
              r,
              c,
              r + dr,
              c + dc,
              3
            );
          }

          continue;
        }

        /* =========================
           TORRE
        ========================= */

        if (peca.tipo === 'R') {
          for (const [dr, dc] of direcoesLineares) {
            for (let passo = 1; passo < 8; passo++) {
              const podeContinuar =
                adicionarMovimento(
                  r,
                  c,
                  r + dr * passo,
                  c + dc * passo,
                  2
                );

              if (!podeContinuar) {
                break;
              }
            }
          }

          continue;
        }

        /* =========================
           BISPO
        ========================= */

        if (peca.tipo === 'B') {
          for (const [dr, dc] of direcoesDiagonais) {
            for (let passo = 1; passo < 8; passo++) {
              const podeContinuar =
                adicionarMovimento(
                  r,
                  c,
                  r + dr * passo,
                  c + dc * passo,
                  2
                );

              if (!podeContinuar) {
                break;
              }
            }
          }

          continue;
        }

        /* =========================
           RAINHA
        ========================= */

        if (peca.tipo === 'Q') {
          const todasDirecoes = [
            ...direcoesLineares,
            ...direcoesDiagonais,
          ];

          for (const [dr, dc] of todasDirecoes) {
            for (let passo = 1; passo < 8; passo++) {
              const podeContinuar =
                adicionarMovimento(
                  r,
                  c,
                  r + dr * passo,
                  c + dc * passo,
                  3
                );

              if (!podeContinuar) {
                break;
              }
            }
          }
        }
      }
    }

    return lista;
  };

  /* =========================================================
     MOTOR DA SIMULAÇÃO
  ========================================================= */

  useEffect(() => {
    if (!adversarioSelecionado || !jogoEmExecucao) {
      return;
    }

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (!jogoAtivoRef.current) {
        return;
      }

      if (!adversarioRef.current) {
        return;
      }

      const gridAtual = tabuleiroRef.current;
      const corAtual = turnoRef.current;

      const movimentos = analisarMovimentosValidos(
        gridAtual,
        corAtual
      );

      /*
       * Sem movimentos: reinicia a partida.
       */
      if (movimentos.length === 0) {
        const novoTabuleiro =
          criarTabuleiroCorporativo();

        tabuleiroRef.current = novoTabuleiro;
        turnoRef.current = 'B';

        setTabuleiro(novoTabuleiro);
        setTurno('B');
        setJogoEmExecucao(false);

        jogoAtivoRef.current = false;

        setCasaDe(null);
        setCasaPara(null);

        setLogsMercado((prev) => [
          'Sistemas Reiniciados',
          ...prev.slice(0, 2),
        ]);

        return;
      }

      /*
       * Prioriza capturas.
       */
      const movimentosOrdenados = [...movimentos].sort(
        (a, b) =>
          b.peso - a.peso ||
          Math.random() - 0.5
      );

      const jogada = movimentosOrdenados[0];

      const {
        deLinha,
        deColuna,
        paraLinha,
        paraColuna,
      } = jogada;

      /*
       * Cria cópia completa das linhas.
       */
      const novoGrid = gridAtual.map((linha) => [
        ...linha,
      ]);

      const atacante =
        novoGrid[deLinha][deColuna];

      const alvo =
        novoGrid[paraLinha][paraColuna];

      if (!atacante) {
        return;
      }

      /*
       * Executa movimento.
       */
      novoGrid[paraLinha][paraColuna] = atacante;
      novoGrid[deLinha][deColuna] = null;

      /*
       * Atualiza casas destacadas.
       */
      setCasaDe([deLinha, deColuna]);
      setCasaPara([paraLinha, paraColuna]);

      /*
       * Log.
       */
      let logMsg =
        `Peça [${atacante.tipo}] avançou no mercado.`;

      /*
       * Captura.
       */
      if (alvo) {
        logMsg =
          `💥 [${atacante.tipo}] capturou [${alvo.tipo}]!`;

        if (corAtual === 'B') {
          setKpisWSCode((prev) =>
            Math.max(0, prev - 12)
          );
        } else {
          setKpisMarcas((prev) =>
            Math.max(0, prev - 12)
          );
        }
      }

      /*
       * Atualiza refs ANTES do estado React.
       */
      tabuleiroRef.current = novoGrid;

      const novoTurno: CorPeca =
        corAtual === 'B' ? 'P' : 'B';

      turnoRef.current = novoTurno;

      /*
       * Atualiza React.
       */
      setTabuleiro(novoGrid);
      setTurno(novoTurno);

      setLogsMercado((prev) => [
        logMsg,
        ...prev.slice(0, 3),
      ]);
    }, 600);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [
    adversarioSelecionado,
    jogoEmExecucao,
  ]);

  /* =========================================================
     INICIAR / PAUSAR
  ========================================================= */

  const alternarEstadoSimulacao = () => {
    const liderAtivo =
      listaAdversariosDisponiveis[indiceSelecao];

    /*
     * Primeira inicialização.
     */
    if (!adversarioSelecionado) {
      setAdversarioSelecionado(liderAtivo.nome);
      setJogoEmExecucao(true);

      adversarioRef.current = liderAtivo.nome;
      jogoAtivoRef.current = true;

      setLogsMercado([
        `🚀 Defesa iniciada com ${liderAtivo.nome.toUpperCase()}.`,
        'Combate em tempo real ativo.',
      ]);

      return;
    }

    /*
     * Pausar / continuar.
     */
    const novoEstado = !jogoEmExecucao;

    setJogoEmExecucao(novoEstado);
    jogoAtivoRef.current = novoEstado;

    setLogsMercado((prev) => [
      novoEstado
        ? '▶ Simulação Retomada.'
        : '⏸ Simulação Pausada.',
      ...prev.slice(0, 2),
    ]);
  };

  /* =========================================================
     RESET
  ========================================================= */

  const pararEResetarSessao = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const novoTabuleiro =
      criarTabuleiroCorporativo();

    tabuleiroRef.current = novoTabuleiro;
    turnoRef.current = 'B';
    adversarioRef.current = null;
    jogoAtivoRef.current = false;

    setAdversarioSelecionado(null);
    setJogoEmExecucao(false);

    setTabuleiro(novoTabuleiro);
    setTurno('B');

    setCasaDe(null);
    setCasaPara(null);

    setKpisMarcas(100);
    setKpisWSCode(100);

    setLogsMercado([
      'Sessão encerrada. Seleccione um novo líder executivo.',
    ]);
  };

  /* =========================================================
     LIMPEZA FINAL
  ========================================================= */

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  /* =========================================================
     COR DO ADVERSÁRIO
  ========================================================= */

  const obterClasseCorAdversario = () => {
    switch (adversarioAtual.nome) {
      case 'Vodacom':
        return 'bg-[#e60000] text-white border-[#ff3333] shadow-[0_0_8px_rgba(230,0,0,0.3)]';

      case 'BCI':
        return 'bg-[#ff6600] text-white border-[#ff8533] shadow-[0_0_8px_rgba(255,102,0,0.3)]';

      case 'Millennium bim':
        return 'bg-[#d11c5c] text-white border-[#e6226c] shadow-[0_0_8px_rgba(209,28,92,0.25)]';

      case 'Tmcel':
        return 'bg-[#f2cc00] text-[#00856a] border-[#d6b500] shadow-[0_0_8px_rgba(242,204,0,0.25)]';

      case 'Movitel':
        return 'bg-[#e85a12] text-white border-[#ff7324] shadow-[0_0_8px_rgba(232,90,18,0.25)]';

      default:
        return 'bg-teal-600 text-white border-teal-500';
    }
  };

  const obterSiglaAdversario = () => {
    if (adversarioAtual.nome === 'Millennium bim') {
      return 'm';
    }

    return adversarioAtual.nome
      .substring(0, 2)
      .toLowerCase();
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div
      className="
        flex flex-col
        min-h-screen
        md:h-screen
        w-full
        overflow-x-hidden
        bg-slate-900
        text-white
        gap-2
        p-2
        select-none
      "
    >

      {/* =====================================================
          PAINEL EXECUTIVO
      ===================================================== */}

      <div
        className="
          flex flex-col
          w-full
          bg-slate-950/90
          rounded-lg
          border border-teal-500/30
          p-2
          shadow-[0_2px_10px_rgba(45,212,191,0.15)]
          gap-2
          shrink-0
        "
      >

        {/* TÍTULO */}

        <span
          className="
            text-[10px]
            sm:text-[11px]
            font-black
            text-teal-400
            uppercase
            font-mono
            tracking-[0.12em]
            sm:tracking-[0.15em]
            text-center
            block
            py-0.5
          "
        >
          PAINEL EXECUTIVO
        </span>

        {/* =================================================
            EMBATE
        ================================================= */}

        <div
          className="
            flex
            items-center
            justify-between
            bg-slate-900/50
            border border-slate-800
            rounded-lg
            p-2
            min-h-[65px]
            gap-2
          "
        >

          {/* ADVERSÁRIO */}

          <div
            className="
              flex
              items-center
              gap-1.5
              sm:gap-2.5
              w-[43%]
              min-w-0
            "
          >

            <div
              className={`
                w-8
                h-8
                sm:w-10
                sm:h-10
                rounded-md
                flex
                items-center
                justify-center
                font-sans
                font-black
                text-xs
                sm:text-sm
                shrink-0
                border
                uppercase
                ${obterClasseCorAdversario()}
              `}
            >
              {obterSiglaAdversario()}
            </div>

            <div
              className="
                flex
                flex-col
                min-w-0
                leading-tight
                gap-0.5
              "
            >

              <span
                className={`
                  text-xs
                  sm:text-base
                  font-black
                  font-mono
                  tracking-wide
                  truncate
                  ${adversarioAtual.corText}
                `}
              >
                {adversarioAtual.nome}
              </span>

              <span
                className="
                  text-[9px]
                  sm:text-[11px]
                  text-slate-300
                  font-mono
                  font-medium
                  truncate
                "
              >
                {adversarioAtual.lider}
              </span>

            </div>
          </div>

          {/* VS */}

          <span
            className="
              text-[9px]
              sm:text-[10px]
              font-black
              font-mono
              text-amber-500
              bg-amber-500/10
              px-1.5
              py-0.5
              rounded
              border
              border-amber-500/20
              shrink-0
            "
          >
            vs
          </span>

          {/* WSCODE */}

          <div
            className="
              flex
              items-center
              gap-1.5
              sm:gap-2.5
              w-[43%]
              justify-end
              text-right
              min-w-0
            "
          >

            <div
              className="
                flex
                flex-col
                min-w-0
                leading-tight
                gap-0.5
              "
            >

              <span
                className="
                  text-xs
                  sm:text-base
                  font-black
                  font-mono
                  tracking-wide
                  text-lime-400
                  truncate
                "
              >
                WSCode
              </span>

              <span
                className="
                  text-[9px]
                  sm:text-[11px]
                  text-slate-400
                  font-mono
                  font-medium
                  truncate
                "
              >
                Invasor IA
              </span>

            </div>

            <div
              className="
                w-8
                h-8
                sm:w-10
                sm:h-10
                bg-[#ccff00]
                text-black
                font-sans
                font-black
                text-xs
                sm:text-sm
                rounded-md
                flex
                items-center
                justify-center
                shrink-0
                shadow-[0_0_10px_rgba(204,255,0,0.2)]
                lowercase
              "
            >
              ws
            </div>

          </div>
        </div>

        {/* =================================================
            CONTROLES
        ================================================= */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:justify-between
            sm:items-center
            gap-2
            border-t
            border-slate-900/60
            pt-2
            text-[9px]
            font-mono
          "
        >

          {/* NAVEGAÇÃO */}

          <div
            className="
              flex
              gap-1
              flex-wrap
              justify-center
              sm:justify-start
            "
          >

            <button
              type="button"
              disabled={!!adversarioSelecionado}
              onClick={() =>
                setIndiceSelecao((prev) =>
                  prev === 0
                    ? listaAdversariosDisponiveis.length - 1
                    : prev - 1
                )
              }
              className="
                px-2
                py-1
                sm:py-0.5
                bg-slate-900
                border border-slate-700
                hover:border-teal-500
                text-slate-300
                rounded
                transition-all
                disabled:opacity-20
                text-[8px]
                sm:text-[9px]
              "
            >
              ◀ RECUAR
            </button>

            <button
              type="button"
              disabled={!!adversarioSelecionado}
              onClick={() =>
                setIndiceSelecao((prev) =>
                  prev ===
                  listaAdversariosDisponiveis.length - 1
                    ? 0
                    : prev + 1
                )
              }
              className="
                px-2
                py-1
                sm:py-0.5
                bg-slate-900
                border border-slate-700
                hover:border-teal-500
                text-slate-300
                rounded
                transition-all
                disabled:opacity-20
                text-[8px]
                sm:text-[9px]
              "
            >
              AVANÇAR ▶
            </button>

          </div>

          {/* KPIS */}

          <div
            className="
              flex
              items-center
              justify-center
              gap-3
              flex-1
              order-first
              sm:order-none
            "
          >

            <span
              className="
                text-teal-400
                font-bold
                text-[8px]
                sm:text-[9px]
              "
            >
              Corp: {kpisMarcas}%
            </span>

            <span
              className="
                text-rose-500
                font-bold
                text-[8px]
                sm:text-[9px]
              "
            >
              WS: {kpisWSCode}%
            </span>

          </div>

          {/* AÇÕES */}

          <div
            className="
              flex
              gap-1
              flex-wrap
              justify-center
              sm:justify-end
            "
          >

            <button
              type="button"
              onClick={alternarEstadoSimulacao}
              className={`
                px-2
                sm:px-3
                py-1
                sm:py-0.5
                font-bold
                rounded
                text-[8px]
                sm:text-[9px]
                transition-all
                ${
                  adversarioSelecionado
                    ? jogoEmExecucao
                      ? 'bg-amber-600 text-white'
                      : 'bg-teal-500 text-slate-950'
                    : 'bg-teal-500 text-slate-950'
                }
              `}
            >
              {!adversarioSelecionado
                ? 'INICIAR (OK)'
                : jogoEmExecucao
                ? '⏸ PAUSAR'
                : '▶ PLAY'}
            </button>

            {adversarioSelecionado && (
              <button
                type="button"
                onClick={pararEResetarSessao}
                className="
                  px-2
                  py-1
                  sm:py-0.5
                  bg-rose-600
                  hover:bg-rose-500
                  text-white
                  font-bold
                  rounded
                  text-[8px]
                  sm:text-[9px]
                  transition-all
                "
              >
                ⏹ PARAR / MUDAR
              </button>
            )}

          </div>

        </div>
      </div>

      {/* =====================================================
          TABULEIRO + LOGS
      ===================================================== */}

      <div
        className="
          flex
          flex-col
          md:flex-row
          flex-1
          gap-2
          justify-start
          md:justify-center
          items-center
          overflow-y-auto
          md:overflow-hidden
          w-full
          min-h-0
          pb-2
        "
      >

        {/* ===================================================
            TABULEIRO
        =================================================== */}

        <div
          className="
            relative
            bg-slate-950
            p-1
            rounded-lg
            border border-slate-800
            aspect-square
            w-[92vw]
            max-w-[520px]
            md:w-auto
            md:h-[min(78vh,calc(100vh-150px))]
            md:max-w-none
            shrink-0
            flex
            items-center
            justify-center
            overflow-hidden
          "
        >

          {/* MARCA DE ÁGUA */}

          <div
            className="
              absolute
              inset-0
              flex
              pointer-events-none
              select-none
              z-0
              font-mono
              font-black
              text-[9vw]
              md:text-[5vw]
              opacity-[0.04]
              uppercase
            "
          >

            <div
              className="
                w-1/2
                flex
                items-center
                justify-center
                text-teal-400
                h-full
                border-r
                border-white/5
                overflow-hidden
              "
            >

              <span
                className="
                  transform
                  -rotate-90
                  whitespace-nowrap
                  tracking-widest
                "
              >
                {adversarioAtual.nome}
              </span>

            </div>

            <div
              className="
                w-1/2
                flex
                items-center
                justify-center
                text-yellow-500
                h-full
                overflow-hidden
              "
            >

              <span
                className="
                  transform
                  rotate-90
                  whitespace-nowrap
                  tracking-widest
                "
              >
                WSCODE
              </span>

            </div>

          </div>

          {/* MATRIZ */}

          <div
            className="
              grid
              grid-cols-8
              grid-rows-8
              gap-0.5
              w-full
              h-full
              relative
              z-10
            "
          >

            {tabuleiro.map((linha, indexLinha) =>
              linha.map((peca, indexColuna) => {

                const ehCasaDe =
                  casaDe !== null &&
                  casaDe[0] === indexLinha &&
                  casaDe[1] === indexColuna;

                const ehCasaPara =
                  casaPara !== null &&
                  casaPara[0] === indexLinha &&
                  casaPara[1] === indexColuna;

                const ehPar =
                  (indexLinha + indexColuna) % 2 === 0;

                return (
                  <div
                    key={`${indexLinha}-${indexColuna}`}
                    className={`
                      flex
                      flex-col
                      items-center
                      justify-center
                      relative
                      rounded
                      transition-all
                      duration-200
                      aspect-square
                      ${
                        ehCasaDe
                          ? 'bg-amber-500/20 border border-amber-500/40'
                          : ehCasaPara
                          ? 'bg-teal-500/30 border border-teal-500/40 animate-pulse'
                          : ehPar
                          ? 'bg-slate-800/40'
                          : 'bg-slate-900/40'
                      }
                    `}
                  >

                    {/* COORDENADAS */}

                    <span
                      className="
                        absolute
                        top-[1px]
                        left-[1px]
                        sm:top-0.5
                        sm:left-0.5
                        text-[4px]
                        sm:text-[5px]
                        text-slate-600
                        font-mono
                        leading-none
                      "
                    >
                      {String.fromCharCode(65 + indexColuna)}
                      {8 - indexLinha}
                    </span>

                    {/* PEÇA */}

                    {peca && (
                      <div
                        className={`
                          w-[78%]
                          h-[78%]
                          sm:w-[82%]
                          sm:h-[82%]
                          rounded-md
                          flex
                          items-center
                          justify-center
                          text-xl
                          sm:text-2xl
                          md:text-3xl
                          font-sans
                          font-black
                          shadow
                          transition-all
                          duration-200
                          ${
                            peca.cor === 'P'
                              ? 'bg-[#ccff00] text-black border border-[#bfff00] shadow-[0_0_8px_rgba(204,255,0,0.15)]'
                              : obterClasseCorAdversario()
                          }
                        `}
                      >

                        {peca.tipo === 'K' && '♔'}
                        {peca.tipo === 'Q' && '♕'}
                        {peca.tipo === 'R' && '♖'}
                        {peca.tipo === 'B' && '♗'}
                        {peca.tipo === 'N' && '♘'}
                        {peca.tipo === 'P' && '♙'}

                      </div>
                    )}

                  </div>
                );
              })
            )}

          </div>
        </div>

        {/* ===================================================
            LOGS OPERACIONAIS
        =================================================== */}

        <div
          className="
            flex
            flex-col
            w-full
            md:w-[240px]
            h-[180px]
            sm:h-[200px]
            md:h-full
            md:max-h-[78vh]
            bg-slate-950/90
            rounded-lg
            p-2
            sm:p-3
            border border-slate-800
            justify-between
            shrink-0
          "
        >

          {/* CABEÇALHO */}

          <div
            className="
              flex
              flex-col
              gap-1
              shrink-0
            "
          >

            <span
              className="
                text-[11px]
                sm:text-[14px]
                font-black
                font-mono
                text-teal-400
                tracking-wider
                flex
                items-center
                gap-1.5
                uppercase
              "
            >

              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-teal-400
                  animate-ping
                  shrink-0
                "
              />

              Logs Operacionais

            </span>

            <div
              className="
                h-[1px]
                w-full
                bg-slate-900
                mt-0.5
              "
            />

          </div>

          {/* LISTA DE LOGS */}

          <div
            className="
              flex-1
              flex
              flex-col
              gap-2
              mt-2
              overflow-y-auto
              min-h-0
              justify-start
              pr-1
            "
          >

            {logsMercado.map((log, index) => (
              <div
                key={`${log}-${index}`}
                className={`
                  text-[10px]
                  sm:text-[13px]
                  font-mono
                  font-medium
                  leading-normal
                  border-l-2
                  pl-2
                  py-0.5
                  shrink-0
                  ${
                    index === 0
                      ? 'text-teal-300 border-teal-400 bg-teal-950/10 font-bold'
                      : 'text-slate-500 border-slate-900'
                  }
                `}
              >
                {log}
              </div>
            ))}

          </div>

          {/* RODAPÉ */}

          <div
            className="
              text-[9px]
              sm:text-[11px]
              font-mono
              text-slate-500
              pt-1
              border-t
              border-slate-900
              text-right
              shrink-0
            "
          >

            Tráfego:{' '}

            <span
              className="
                font-bold
                text-teal-400
              "
            >
              {turno === 'B'
                ? 'Aliado'
                : 'WSCode'}
            </span>

          </div>

        </div>

      </div>
    </div>
  );
}

