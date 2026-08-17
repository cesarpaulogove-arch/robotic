'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Jogador {
  x: number;
  vida: number;
  estado: 'idle' | 'andando' | 'socando' | 'bloqueando' | 'atingido';
  cooldownSoco: boolean;
}

interface ArenaBoxeProps {
  atualAdversario: { nome: string };
  onFimDeJogo?: (vencedor: string) => void;
}

export function ArenaBoxe({
  atualAdversario,
  onFimDeJogo,
}: ArenaBoxeProps): React.JSX.Element {
  const [playerVida, setPlayerVida] = useState(100);
  const [cpuVida, setCpuVida] = useState(100);
  const [playerX, setPlayerX] = useState(150);
  const [cpuX, setCpuX] = useState(450);
  const [playerEstado, setPlayerEstado] =
    useState<Jogador['estado']>('idle');
  const [cpuEstado, setCpuEstado] =
    useState<Jogador['estado']>('idle');
  const [mensagem, setMensagem] = useState('LUTE!');

  const stateRef = useRef({
    player: {
      x: 150,
      vida: 100,
      estado: 'idle' as Jogador['estado'],
      cooldownSoco: false,
    },
    cpu: {
      x: 450,
      vida: 100,
      estado: 'idle' as Jogador['estado'],
      cooldownSoco: false,
    },
    jogoAtivo: true,
    fimDeJogoDisparado: false,
  });

  const keysPressed = useRef<Record<string, boolean>>({});
  const gameLoopRef = useRef<number | null>(null);
  const mountedRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  /*
   * Limpa todos os timers criados pelo jogo.
   */
  const clearTimers = () => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];
  };

  /*
   * Cria um timeout que pode ser cancelado no unmount.
   */
  const safeTimeout = (
    callback: () => void,
    delay: number
  ) => {
    const timer = setTimeout(() => {
      if (!mountedRef.current) return;

      callback();

      timersRef.current = timersRef.current.filter(
        (item) => item !== timer
      );
    }, delay);

    timersRef.current.push(timer);

    return timer;
  };

  /*
   * Teclado
   */
  useEffect(() => {
    mountedRef.current = true;

    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      mountedRef.current = false;

      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);

      keysPressed.current = {};
    };
  }, []);

  /*
   * Motor principal do jogo
   */
  useEffect(() => {
    mountedRef.current = true;

    const data = stateRef.current;

    /*
     * Reinicia o jogo quando o adversário muda.
     */
    data.player = {
      x: 150,
      vida: 100,
      estado: 'idle',
      cooldownSoco: false,
    };

    data.cpu = {
      x: 450,
      vida: 100,
      estado: 'idle',
      cooldownSoco: false,
    };

    data.jogoAtivo = true;
    data.fimDeJogoDisparado = false;

    setPlayerVida(100);
    setCpuVida(100);
    setPlayerX(150);
    setCpuX(450);
    setPlayerEstado('idle');
    setCpuEstado('idle');
    setMensagem('LUTE!');

    clearTimers();

    const updateGame = () => {
      if (!mountedRef.current) return;

      const game = stateRef.current;

      if (!game.jogoAtivo) {
        gameLoopRef.current = null;
        return;
      }

      /*
       * ==========================================
       * 1. JOGADOR
       * ==========================================
       */

      let pX = game.player.x;
      let pEst: Jogador['estado'] = 'idle';

      if (game.player.estado === 'atingido') {
        pEst = 'atingido';
      } else if (keysPressed.current['k']) {
        pEst = 'bloqueando';
      } else {
        if (keysPressed.current['a'] && pX > 40) {
          pX -= 5;
          pEst = 'andando';
        }

        if (
          keysPressed.current['d'] &&
          pX < game.cpu.x - 50
        ) {
          pX += 5;
          pEst = 'andando';
        }

        /*
         * Soco
         */
        if (
          keysPressed.current['j'] &&
          !game.player.cooldownSoco &&
          pEst !== 'bloqueando'
        ) {
          pEst = 'socando';
          game.player.cooldownSoco = true;

          safeTimeout(() => {
            stateRef.current.player.cooldownSoco = false;
          }, 300);
        }
      }

      /*
       * Mantém a animação do soco durante o cooldown.
       */
      if (
        game.player.estado === 'socando' &&
        game.player.cooldownSoco
      ) {
        pEst = 'socando';
      }

      /*
       * ==========================================
       * 2. CPU
       * ==========================================
       */

      let cX = game.cpu.x;
      let cEst: Jogador['estado'] = 'idle';

      const distancia = cX - pX;

      if (game.cpu.estado === 'atingido') {
        cEst = 'atingido';
      } else {
        if (distancia > 90) {
          cX -= 3;
          cEst = 'andando';
        } else if (distancia < 55) {
          cX += 3;
          cEst = 'andando';
        } else {
          cEst = 'idle';

          /*
           * Chance da CPU atacar.
           */
          if (
            Math.random() < 0.04 &&
            !game.cpu.cooldownSoco
          ) {
            cEst = 'socando';
            game.cpu.cooldownSoco = true;

            safeTimeout(() => {
              stateRef.current.cpu.cooldownSoco = false;
            }, 300);
          }
        }
      }

      /*
       * ==========================================
       * 3. ATAQUE DO JOGADOR
       * ==========================================
       */

      if (
        pEst === 'socando' &&
        distancia <= 95 &&
        distancia >= 0 &&
        cEst !== 'bloqueando' &&
        game.cpu.estado !== 'atingido'
      ) {
        cEst = 'atingido';

        game.cpu.vida = Math.max(
          0,
          game.cpu.vida - 8
        );

        setCpuVida(game.cpu.vida);

        safeTimeout(() => {
          if (
            stateRef.current.jogoAtivo &&
            stateRef.current.cpu.estado === 'atingido'
          ) {
            stateRef.current.cpu.estado = 'idle';
          }
        }, 200);
      }

      /*
       * ==========================================
       * 4. ATAQUE DA CPU
       * ==========================================
       */

      if (
        cEst === 'socando' &&
        distancia <= 95 &&
        distancia >= 0 &&
        pEst !== 'bloqueando' &&
        game.player.estado !== 'atingido'
      ) {
        pEst = 'atingido';

        game.player.vida = Math.max(
          0,
          game.player.vida - 6
        );

        setPlayerVida(game.player.vida);

        safeTimeout(() => {
          if (
            stateRef.current.jogoAtivo &&
            stateRef.current.player.estado === 'atingido'
          ) {
            stateRef.current.player.estado = 'idle';
          }
        }, 200);
      }

      /*
       * ==========================================
       * 5. ATUALIZA ESTADO
       * ==========================================
       */

      game.player.x = pX;
      game.player.estado = pEst;

      game.cpu.x = cX;
      game.cpu.estado = cEst;

      setPlayerX(pX);
      setCpuX(cX);
      setPlayerEstado(pEst);
      setCpuEstado(cEst);

      /*
       * ==========================================
       * 6. FIM DE JOGO
       * ==========================================
       */

      if (
        game.player.vida <= 0 ||
        game.cpu.vida <= 0
      ) {
        game.jogoAtivo = false;

        if (!game.fimDeJogoDisparado) {
          game.fimDeJogoDisparado = true;

          const vencedor =
            game.player.vida <= 0
              ? atualAdversario.nome
              : 'SIDCODE';

          setMensagem(`${vencedor} VENCEU!`);

          if (onFimDeJogo) {
            onFimDeJogo(vencedor);
          }
        }

        gameLoopRef.current = null;
        return;
      }

      /*
       * Próximo frame.
       */
      gameLoopRef.current =
        requestAnimationFrame(updateGame);
    };

    /*
     * Inicia o jogo.
     */
    gameLoopRef.current =
      requestAnimationFrame(updateGame);

    /*
     * Cleanup completo.
     */
    return () => {
      mountedRef.current = false;

      if (gameLoopRef.current !== null) {
        cancelAnimationFrame(gameLoopRef.current);
        gameLoopRef.current = null;
      }

      clearTimers();

      keysPressed.current = {};
    };
  }, [atualAdversario.nome, onFimDeJogo]);

  return (
    <div className="relative bg-slate-950 p-6 rounded-lg border border-slate-800 w-full max-w-3xl aspect-[16/9] flex flex-col justify-between overflow-hidden select-none font-mono">

      {/* HUD */}
      <div className="flex justify-between items-center w-full z-20">

        {/* Jogador */}
        <div className="w-5/12">
          <div className="text-[#ccff00] font-black text-xs md:text-sm mb-1 uppercase tracking-wider">
            SIDCODE (TU)
          </div>

          <div className="w-full bg-slate-900 h-4 rounded border border-slate-800 overflow-hidden shadow-[0_0_12px_rgba(204,255,0,0.15)]">
            <div
              className="bg-[#ccff00] h-full transition-all duration-75"
              style={{ width: `${playerVida}%` }}
            />
          </div>
        </div>

        {/* Versus */}
        <div className="text-center px-4">
          <span className="text-[10px] text-slate-600 block font-bold">
            VERSUS
          </span>

          <span className="text-white text-xs font-black tracking-widest uppercase animate-pulse">
            {mensagem}
          </span>
        </div>

        {/* CPU */}
        <div className="w-5/12 text-right">
          <div className="text-teal-400 font-black text-xs md:text-sm mb-1 uppercase tracking-wider">
            {atualAdversario.nome}
          </div>

          <div className="w-full bg-slate-900 h-4 rounded border border-slate-800 overflow-hidden shadow-[0_0_12px_rgba(45,212,191,0.15)]">
            <div
              className="bg-teal-400 h-full transition-all duration-75 ml-auto"
              style={{ width: `${cpuVida}%` }}
            />
          </div>
        </div>
      </div>

      {/* Ringue */}
      <div className="relative w-full h-full border-b border-slate-800 mt-4 flex items-end">

        {/* JOGADOR */}
        <div
          className="absolute bottom-0 transition-transform duration-75"
          style={{
            transform: `translateX(${playerX}px)`,
          }}
        >
          <svg
            width="90"
            height="130"
            viewBox="0 0 80 120"
            className={
              playerEstado === 'atingido'
                ? 'animate-bounce'
                : ''
            }
          >
            <circle
              cx="40"
              cy="25"
              r="10"
              fill="#ccff00"
            />

            <line
              x1="40"
              y1="35"
              x2="40"
              y2="75"
              stroke="#ccff00"
              strokeWidth="5"
              strokeLinecap="round"
            />

            <line
              x1="40"
              y1="45"
              x2={
                playerEstado === 'socando'
                  ? '78'
                  : playerEstado === 'bloqueando'
                  ? '54'
                  : '58'
              }
              y2={
                playerEstado === 'bloqueando'
                  ? '22'
                  : '45'
              }
              stroke="#ccff00"
              strokeWidth="4.5"
              strokeLinecap="round"
            />

            <circle
              cx={
                playerEstado === 'socando'
                  ? '78'
                  : playerEstado === 'bloqueando'
                  ? '54'
                  : '58'
              }
              cy={
                playerEstado === 'bloqueando'
                  ? '22'
                  : '45'
              }
              r="3.5"
              fill="#ef4444"
            />

            <line
              x1="40"
              y1="75"
              x2="24"
              y2="115"
              stroke="#ccff00"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <line
              x1="40"
              y1="75"
              x2={
                playerEstado === 'andando'
                  ? '58'
                  : '50'
              }
              y2="115"
              stroke="#ccff00"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* CPU */}
        <div
          className="absolute bottom-0 transition-transform duration-75"
          style={{
            transform: `translateX(${cpuX}px)`,
          }}
        >
          <svg
            width="90"
            height="130"
            viewBox="0 0 80 120"
            className={
              cpuEstado === 'atingido'
                ? 'opacity-70 scale-95 duration-100'
                : ''
            }
          >
            <circle
              cx="40"
              cy="25"
              r="10"
              fill="#2dd4bf"
            />

            <circle
              cx="40"
              cy="25"
              r="2.5"
              fill="#ef4444"
            />

            <line
              x1="40"
              y1="35"
              x2="40"
              y2="75"
              stroke="#2dd4bf"
              strokeWidth="5"
              strokeLinecap="round"
            />

            <circle
              cx="40"
              cy="45"
              r="2"
              fill="#ef4444"
            />

            <circle
              cx="40"
              cy="75"
              r="2"
              fill="#ef4444"
            />

            <line
              x1="40"
              y1="45"
              x2={
                cpuEstado === 'socando'
                  ? '2'
                  : '22'
              }
              y2="45"
              stroke="#2dd4bf"
              strokeWidth="4.5"
              strokeLinecap="round"
            />

            <circle
              cx={
                cpuEstado === 'socando'
                  ? '2'
                  : '22'
              }
              cy="45"
              r="3.5"
              fill="#ef4444"
            />

            <line
              x1="40"
              y1="75"
              x2="24"
              y2="115"
              stroke="#2dd4bf"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <circle
              cx="32"
              cy="95"
              r="1.5"
              fill="#ef4444"
            />

            <line
              x1="40"
              y1="75"
              x2="56"
              y2="115"
              stroke="#2dd4bf"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <circle
              cx="48"
              cy="95"
              r="1.5"
              fill="#ef4444"
            />
          </svg>
        </div>
      </div>

      {/* Controles */}
      <div className="flex justify-between items-center text-[10px] text-slate-500 border-t border-slate-900/60 pt-2 z-20 font-sans tracking-wide">

        <div>
          MOVER:{' '}
          <kbd className="bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-white font-mono font-bold">
            A
          </kbd>{' '}
          /{' '}
          <kbd className="bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-white font-mono font-bold">
            D
          </kbd>
        </div>

        <div>
          SOCO:{' '}
          <kbd className="bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-white font-mono font-bold">
            J
          </kbd>
        </div>

        <div>
          BLOQUEIO:{' '}
          <kbd className="bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-white font-mono font-bold">
            K
          </kbd>
        </div>
      </div>
    </div>
  );
}