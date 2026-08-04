'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Jogador {
  x: number;
  vida: number;
  estado: 'idle' | 'andando' | 'socando' | 'bloqueando' | 'atingido';
}

interface ArenaBoxeProps {
  atualAdversario: { nome: string };
  onFimDeJogo?: (vencedor: string) => void;
}

export function ArenaBoxe({ atualAdversario, onFimDeJogo }: ArenaBoxeProps): React.JSX.Element {
  // Estados para renderização visual da UI e Barras de Vida
  const [playerVida, setPlayerVida] = useState(100);
  const [cpuVida, setCpuVida] = useState(100);
  const [playerX, setPlayerX] = useState(150);
  const [cpuX, setCpuX] = useState(450);
  const [playerEstado, setPlayerEstado] = useState<Jogador['estado']>('idle');
  const [cpuEstado, setCpuEstado] = useState<Jogador['estado']>('idle');
  const [mensagem, setMensagem] = useState<string>('LUTE!');

  // Refs de Controle Físico (Evitam re-renderizações e loops infinitos no requestAnimationFrame)
  const stateRef = useRef({
    player: { x: 150, vida: 100, estado: 'idle' as Jogador['estado'], cooldownSoco: false },
    cpu: { x: 450, vida: 100, estado: 'idle' as Jogador['estado'], cooldownSoco: false },
    jogoAtivo: true,
  });

  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const gameLoopRef = useRef<number | null>(null);

  // Escuta de Teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { keysPressed.current[e.key.toLowerCase()] = true; };
    const handleKeyUp = (e: KeyboardEvent) => { keysPressed.current[e.key.toLowerCase()] = false; };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Motor de Jogo Principal (60 FPS)
  useEffect(() => {
    const updateGame = () => {
      const data = stateRef.current;
      if (!data.jogoAtivo) return;

      // ---- 1. FÍSICA E COMANDOS DO JOGADOR ----
      let pX = data.player.x;
      let pEst: Jogador['estado'] = 'idle'; // Alterado para let para evitar erros de atribuição

      // Bloqueio impede movimentação
      if (keysPressed.current['k']) {
        pEst = 'bloqueando';
      } else {
        if (keysPressed.current['a'] && pX > 40) {
          pX -= 5;
          pEst = 'andando';
        }
        if (keysPressed.current['d'] && pX < data.cpu.x - 50) {
          pX += 5;
          pEst = 'andando';
        }
      }

      // Sistema de Ataque (Garante cooldown estável)
      if (keysPressed.current['j'] && !data.player.cooldownSoco && pEst !== 'bloqueando') {
        pEst = 'socando';
        data.player.cooldownSoco = true;
        setTimeout(() => {
          stateRef.current.player.cooldownSoco = false;
        }, 300);
      }

      // Preserva o estado de Soco ou Dano enquanto durar a animação física
      if (data.player.estado === 'socando' && data.player.cooldownSoco) pEst = 'socando';
      if (data.player.estado === 'atingido') pEst = 'atingido';


      // ---- 2. INTELIGÊNCIA ARTIFICIAL (IA) DA CPU ----
      let cX = data.cpu.x;
      let cEst: Jogador['estado'] = 'idle'; // Alterado para let para corrigir o erro da imagem
      const distancia = cX - pX;

      if (data.cpu.estado !== 'atingido') {
        if (distancia > 90) {
          cX -= 3; // Caminha na direção do jogador
          cEst = 'andando';
        } else if (distancia < 55) {
          cX += 3; // Afasta-se ligeiramente se colado
          cEst = 'andando';
        } else {
          cEst = 'idle';
          // Chance controlada por frame de desferir soco na distância ideal
          if (Math.random() < 0.04 && !data.cpu.cooldownSoco) {
            cEst = 'socando';
            data.cpu.cooldownSoco = true;
            setTimeout(() => {
              stateRef.current.cpu.cooldownSoco = false;
            }, 300);
          }
        }
      } else {
        cEst = 'atingido';
      }

      // ---- 3. DETECÇÃO DE IMPACTOS (HITBOXES CORRIGIDAS) ----
      // Jogador acerta a CPU
      if (pEst === 'socando' && distancia <= 95 && cEst !== 'bloqueando' && data.cpu.estado !== 'atingido') {
        cEst = 'atingido';
        data.cpu.vida = Math.max(0, data.cpu.vida - 8);
        setCpuVida(data.cpu.vida);
        
        setTimeout(() => {
          if (stateRef.current.cpu.estado === 'atingido') stateRef.current.cpu.estado = 'idle';
        }, 200);
      }

      // CPU acerta o Jogador
      if (cEst === 'socando' && distancia <= 95 && pEst !== 'bloqueando' && data.player.estado !== 'atingido') {
        pEst = 'atingido';
        data.player.vida = Math.max(0, data.player.vida - 6);
        setPlayerVida(data.player.vida);
        
        setTimeout(() => {
          if (stateRef.current.player.estado === 'atingido') stateRef.current.player.estado = 'idle';
        }, 200);
      }


      // ---- 4. ATUALIZAÇÃO SINCRO-VISUAL DE DADOS ----
      data.player.x = pX;
      data.player.estado = pEst;
      data.cpu.x = cX;
      data.cpu.estado = cEst;

      setPlayerX(pX);
      setCpuX(cX);
      setPlayerEstado(pEst);
      setCpuEstado(cEst);

      // ---- 5. VERIFICAÇÃO DE FINAL DE PARTIDA ----
      if (data.player.vida <= 0 || data.cpu.vida <= 0) {
        data.jogoAtivo = false;
        const vencedor = data.player.vida <= 0 ? atualAdversario.nome : 'SIDCODE';
        setMensagem(`${vencedor} VENCEU!`);
        if (onFimDeJogo) onFimDeJogo(vencedor);
        return;
      }

      gameLoopRef.current = requestAnimationFrame(updateGame);
    };

    gameLoopRef.current = requestAnimationFrame(updateGame);
    
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [atualAdversario.nome, onFimDeJogo]);

  return (
    <div className="relative bg-slate-950 p-6 rounded-lg border border-slate-800 w-full max-w-3xl aspect-[16/9] flex flex-col justify-between overflow-hidden select-none font-mono">
      
      {/* HUD: Placar de Vida Arcade */}
      <div className="flex justify-between items-center w-full z-20">
        {/* Jogador - SIDCODE */}
        <div className="w-5/12">
          <div className="text-[#ccff00] font-black text-xs md:text-sm mb-1 uppercase tracking-wider">SIDCODE (TU)</div>
          <div className="w-full bg-slate-900 h-4 rounded border border-slate-800 overflow-hidden shadow-[0_0_12px_rgba(204,255,0,0.15)]">
            <div className="bg-[#ccff00] h-full transition-all duration-75" style={{ width: `${playerVida}%` }} />
          </div>
        </div>

        {/* Centro Versus */}
        <div className="text-center px-4">
          <span className="text-[10px] text-slate-600 block font-bold">VERSUS</span>
          <span className="text-white text-xs font-black tracking-widest uppercase animate-pulse">{mensagem}</span>
        </div>

        {/* CPU Corporativa */}
        <div className="w-5/12 text-right">
          <div className="text-teal-400 font-black text-xs md:text-sm mb-1 uppercase tracking-wider">{atualAdversario.nome}</div>
          <div className="w-full bg-slate-900 h-4 rounded border border-slate-800 overflow-hidden shadow-[0_0_12px_rgba(45,212,191,0.15)]">
            <div className="bg-teal-400 h-full transition-all duration-75 ml-auto" style={{ width: `${cpuVida}%` }} />
          </div>
        </div>
      </div>

      {/* Ringue / Solo de Luta */}
      <div className="relative w-full h-full border-b border-slate-800 mt-4 flex items-end">
        
        {/* BONECO PALITO: JOGADOR (SIDCODE) */}
        <div 
          className="absolute bottom-0 transition-transform duration-75"
          style={{ transform: `translateX(${playerX}px)` }}
        >
          <svg width="90" height="130" viewBox="0 0 80 120" className={playerEstado === 'atingido' ? 'animate-bounce' : ''}>
            {/* Cabeça */}
            <circle cx="40" cy="25" r="10" fill="#ccff00" />
            {/* Tronco */}
            <line x1="40" y1="35" x2="40" y2="75" stroke="#ccff00" strokeWidth="5" strokeLinecap="round" />
            
            {/* Braço de Ataque / Guarda */}
            <line 
              x1="40" y1="45" 
              x2={playerEstado === 'socando' ? '78' : playerEstado === 'bloqueando' ? '54' : '58'} 
              y2={playerEstado === 'bloqueando' ? '22' : '45'} 
              stroke="#ccff00" strokeWidth="4.5" strokeLinecap="round" 
            />
            {/* Luva */}
            <circle 
              cx={playerEstado === 'socando' ? '78' : playerEstado === 'bloqueando' ? '54' : '58'} 
              cy={playerEstado === 'bloqueando' ? '22' : '45'} 
              r="3.5" fill="#ef4444" 
            />

            {/* Pernas em Pose de Luta */}
            <line x1="40" y1="75" x2="24" y2="115" stroke="#ccff00" strokeWidth="4" strokeLinecap="round" />
            <line 
              x1="40" y1="75" 
              x2={playerEstado === 'andando' ? '58' : '50'} 
              y2="115" stroke="#ccff00" strokeWidth="4" strokeLinecap="round" 
            />
          </svg>
        </div>

        {/* BONECO PALITO: CPU (ADVERSÁRIO) */}
        <div 
          className="absolute bottom-0 transition-transform duration-75"
          style={{ transform: `translateX(${cpuX}px)` }}
        >
          <svg width="90" height="130" viewBox="0 0 80 120" className={cpuEstado === 'atingido' ? 'opacity-70 scale-95 duration-100' : ''}>
            {/* Cabeça + Nó Pivot */}
            <circle cx="40" cy="25" r="10" fill="#2dd4bf" />
            <circle cx="40" cy="25" r="2.5" fill="#ef4444" />
            
            {/* Tronco e Nós Articulados */}
            <line x1="40" y1="35" x2="40" y2="75" stroke="#2dd4bf" strokeWidth="5" strokeLinecap="round" />
            <circle cx="40" cy="45" r="2" fill="#ef4444" />
            <circle cx="40" cy="75" r="2" fill="#ef4444" />

            {/* Braço IA (Invertido em espelho) */}
            <line 
              x1="40" y1="45" 
              x2={cpuEstado === 'socando' ? '2' : '22'} 
              y2="45" 
              stroke="#2dd4bf" strokeWidth="4.5" strokeLinecap="round" 
            />
            {/* Luva CPU */}
            <circle cx={cpuEstado === 'socando' ? '2' : '22'} cy="45" r="3.5" fill="#ef4444" />

            {/* Pernas e Articulações nos Joelhos */}
            <line x1="40" y1="75" x2="24" y2="115" stroke="#2dd4bf" strokeWidth="4" strokeLinecap="round" />
            <circle cx="32" cy="95" r="1.5" fill="#ef4444" />
            
            <line x1="40" y1="75" x2="56" y2="115" stroke="#2dd4bf" strokeWidth="4" strokeLinecap="round" />
            <circle cx="48" cy="95" r="1.5" fill="#ef4444" />
          </svg>
        </div>

      </div>

      {/* Painel de Controles Rodapé */}
      <div className="flex justify-between items-center text-[10px] text-slate-500 border-t border-slate-900/60 pt-2 z-20 font-sans tracking-wide">
        <div>MOVER: <kbd className="bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-white font-mono font-bold">A</kbd> / <kbd className="bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-white font-mono font-bold">D</kbd></div>
        <div>SOCO: <kbd className="bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-white font-mono font-bold">J</kbd></div>
        <div>BLOQUEIO: <kbd className="bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-white font-mono font-bold">K</kbd></div>
      </div>
    </div>
  );
}
