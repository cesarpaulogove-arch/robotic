'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export function ComponenteElectricidade(): React.JSX.Element {
  const [modoCiclo, setModoCiclo] = useState<'day' | 'night'>('day');
  const [geracaoSolar, setGeracaoSolar] = useState<number>(450); 
  const [cargaBateria, setCargaBateria] = useState<number>(40);  
  const [consumoCarga, setConsumoCarga] = useState<number>(20); 
  const [fluxoEletrico, setFluxoEletrico] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (modoCiclo === 'day') {
        setGeracaoSolar((prev) => Math.min(650, prev + Math.floor(Math.random() * 30) - 10));
        setConsumoCarga((prev) => Math.max(10, Math.min(25, prev + Math.floor(Math.random() * 4) - 2)));
        setCargaBateria((prev) => {
          if (prev >= 100) {
            setModoCiclo('night');
            return 100;
          }
          return prev + 4;
        });
        setFluxoEletrico(false);
      } else {
        setGeracaoSolar(0);
        setConsumoCarga((prev) => Math.max(180, Math.min(220, prev + Math.floor(Math.random() * 10) - 5))); 
        setCargaBateria((prev) => {
          if (prev <= 15) {
            setModoCiclo('day');
            return 15;
          }
          return prev - 3;
        });
        setFluxoEletrico(cargaBateria > 15); 
      }
    }, 400);

    return () => clearInterval(interval);
  }, [modoCiclo, geracaoSolar, cargaBateria]);

  const renderizarPosteRealistaSVG = (x: number, y: number) => {
    const aceso = modoCiclo === 'night' && fluxoEletrico;
    return (
      <g transform={`translate(${x}, ${y})`}>
        <rect x="-3" y="44" width="6" height="4" fill="#64748b" stroke="#475569" strokeWidth="0.5" />
        <line x1="0" y1="44" x2="0" y2="2" stroke="#94a3b8" strokeWidth="1.6" />
        <path d="M 0 4 Q 0 -3 10 -3 L 20 -3" fill="none" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M 14 -6 L 26 -6 C 30 -6 30 1 26 1 L 14 1 Z" fill="#334155" stroke="#1e293b" strokeWidth="0.6" />
        <path d="M 16 1 C 16 4 24 4 24 1 Z" fill="#fee2e2" opacity="0.8" />
        {aceso ? (
          <g>
            <path d="M 16 1 C 16 6 24 6 24 1 Z" fill="#facc15" />
            <circle cx="20" cy="1.5" r="2.5" fill="#fef08a" />
            <polygon points="20,1.5 -30,44 70,44" fill="url(#feixeLuzPoste)" opacity="0.25" stroke="none" />
            <circle cx="20" cy="1.5" r="5" fill="#fef08a" opacity="0.3" className="animate-ping" />
          </g>
        ) : (
          <g>
            <path d="M 16 1 C 16 4 24 4 24 1 Z" fill="#475569" />
          </g>
        )}
      </g>
    );
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden p-5">
      
      {/* SUBBLOCO DE CIMA: FIXO */}
      <div className="flex justify-center items-center w-full h-[200px] min-h-[200px] max-h-[220px] bg-slate-950/40 rounded-lg border border-cyan-500/30 overflow-hidden shadow-[0_4px_12px_-4px_rgba(34,211,238,0.15)] p-2">
        <img src="/solar.png" alt="Electronica Digital" className="w-full h-full object-contain" />
      </div>

      {/* SUBBLOCO DE BAIXO */}
      <div className="flex-1 p-4 flex gap-4 overflow-hidden bg-[#0c2438]/20 rounded-xl border border-teal-500/5 min-h-[260px] relative mt-4">
        
        <div className="flex-1 flex flex-col items-center justify-center p-1 bg-slate-950/20 rounded-lg border border-slate-800/50 relative">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Rede de Iluminação Ampliada</span>
          
          <svg className="w-full h-[180px]" viewBox="-5 -10 290 165" fill="none" stroke="currentColor" strokeWidth="1.2">
            <defs>
              <linearGradient id="feixeLuzPoste" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#facc15" stopOpacity="1"/>
                <stop offset="35%" stopColor="#eab308" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="#854d0e" stopOpacity="0"/>
              </linearGradient>
              <radialGradient id="raiosSol" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="1"/>
                <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0"/>
              </radialGradient>
            </defs>

            {/* Céu Atmosférico */}
            <rect x="-5" y="-5" width="300" height="35" fill={modoCiclo === 'day' ? '#0369a1/10' : '#0f172a/40'} stroke="none" />
            
            {modoCiclo === 'day' ? (
              <g transform="translate(15, 6)">
                <circle cx="0" cy="0" r="10" fill="url(#raiosSol)" stroke="none" />
                <circle cx="0" cy="0" r="5" fill="#ffffff" stroke="#f59e0b" strokeWidth="1" />
                <line x1="0" y1="-8" x2="0" y2="-12" stroke="#fbbf24" strokeWidth="1" />
                <line x1="0" y1="8" x2="0" y2="12" stroke="#fbbf24" strokeWidth="1" />
                <line x1="-8" y1="0" x2="-12" y2="0" stroke="#fbbf24" strokeWidth="1" />
                <line x1="8" y1="0" x2="12" y2="0" stroke="#fbbf24" strokeWidth="1" />
              </g>
            ) : (
              <g transform="translate(15, 6)">
                <path d="M -4 -4 A 6 6 0 1 0 4 4 A 4.5 4.5 0 1 1 -4 -4 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.5" />
              </g>
            )}

            {/* Estrada inferior */}
            <rect x="-5" y="145" width="300" height="15" fill="#1e293b/40" stroke="none" />
            <line x1="-5" y1="145" x2="290" y2="145" stroke="#334155" strokeWidth="0.8" />

            {/* ========================================================================= */}
            {/* CORREÇÃO: DUPLICAÇÃO DOS PAINÉIS SOLARES (Superior e Inferior)            */}
            {/* ========================================================================= */}
            {/* Painel Solar 1 (Superior) */}
            <g transform="translate(5, 42)">
              <rect x="0" y="0" width="45" height="25" rx="1" fill="#0f2d4a" className="stroke-cyan-500" />
              <line x1="15" y1="0" x2="15" y2="25" stroke="#22d3ee" strokeWidth="0.5" />
              <line x1="30" y1="0" x2="30" y2="25" stroke="#22d3ee" strokeWidth="0.5" />
              <line x1="0" y1="12.5" x2="45" y2="12.5" stroke="#22d3ee" strokeWidth="0.5" />
            </g>

            {/* Painel Solar 2 (Inferior) */}
            <g transform="translate(5, 75)">
              <rect x="0" y="0" width="45" height="25" rx="1" fill="#0f2d4a" className="stroke-cyan-500" />
              <line x1="15" y1="0" x2="15" y2="25" stroke="#22d3ee" strokeWidth="0.5" />
              <line x1="30" y1="0" x2="30" y2="25" stroke="#22d3ee" strokeWidth="0.5" />
              <line x1="0" y1="12.5" x2="45" y2="12.5" stroke="#22d3ee" strokeWidth="0.5" />
            </g>
            
            {/* Texto unificado abaixo dos dois painéis */}
            <text x="5" y="111" fill="#94a3b8" className="text-[7px] font-mono font-bold tracking-wide">PAINÉIS SOLARES</text>

            {/* Fios de saída individuais dos painéis se juntando em paralelo */}
            <path d="M 50 54.5 L 65 54.5 L 65 66" className={`transition-colors duration-300 ${modoCiclo === 'day' ? 'stroke-amber-400 stroke-dash' : 'stroke-slate-700'}`} strokeWidth="1.2" />
            <path d="M 50 87.5 L 65 87.5 L 65 66" className={`transition-colors duration-300 ${modoCiclo === 'day' ? 'stroke-amber-400 stroke-dash' : 'stroke-slate-700'}`} strokeWidth="1.2" />
            
            {/* Nó de junção paralela e fio mestre para o Inversor */}
            <circle cx="65" cy="66" r="1.2" fill={modoCiclo === 'day' ? '#fbbf24' : '#475569'} />
            <path d="M 65 66 L 95 66" className={`transition-colors duration-300 ${modoCiclo === 'day' ? 'stroke-amber-400 stroke-dash' : 'stroke-slate-700'}`} strokeWidth="1.2" />

            {/* 2. INVERSOR CENTRAL */}
            <rect x="95" y="50" width="34" height="34" rx="2" fill="#1e293b" className="stroke-cyan-500" />
            <path d="M 101 72 L 112 61 L 123 72" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <text x="96" y="94" fill="#e2e8f0" className="text-[7.5px] font-mono font-bold tracking-wide">INVERSOR</text>

            {/* Fio do Inversor para a Bateria */}
            <path d="M 112 84 L 112 112" className={`transition-colors duration-300 ${modoCiclo === 'day' ? 'stroke-sky-400 stroke-dash' : (fluxoEletrico ? 'stroke-sky-400 stroke-dash' : 'stroke-slate-700')}`} strokeWidth="1.2" />
            <circle cx="112" cy="66" r="1.5" fill="white" />

            {/* 3. BANCO DE BATERIAS */}
            <rect x="92" y="112" width="40" height="26" rx="1" fill="#0f2d4a" className="stroke-cyan-500" />
            <rect x="94" y={114 + (22 - (cargaBateria * 0.22))} width="36" height={cargaBateria * 0.22} className="fill-emerald-500/40 stroke-none transition-all duration-300" />
            <rect x="100" y="109" width="4" height="3" fill="#ef4444" stroke="none" />
            <rect x="120" y="109" width="4" height="3" fill="#3b82f6" stroke="none" />
            <text x="95" y="148" fill="#94a3b8" className="text-[7.5px] font-mono font-bold tracking-wide">BATERIAS</text>

            {/* Barramento mestre para a direita */}
            <path d="M 129 66 L 230 66 L 230 128" className={`transition-colors duration-300 ${modoCiclo === 'night' && fluxoEletrico ? 'stroke-sky-400 stroke-dash' : 'stroke-slate-700'}`} strokeWidth="1.2" />

            {/* Linhas de Alimentação Horizontais dos Postes */}
            <path d="M 230 50 L 245 50" className={`transition-colors duration-300 ${modoCiclo === 'night' && fluxoEletrico ? 'stroke-sky-400 stroke-dash' : 'stroke-slate-700'}`} strokeWidth="1.2" />
            <path d="M 230 89 L 245 89" className={`transition-colors duration-300 ${modoCiclo === 'night' && fluxoEletrico ? 'stroke-sky-400 stroke-dash' : 'stroke-slate-700'}`} strokeWidth="1.2" />
            <path d="M 230 128 L 245 128" className={`transition-colors duration-300 ${modoCiclo === 'night' && fluxoEletrico ? 'stroke-sky-400 stroke-dash' : 'stroke-slate-700'}`} strokeWidth="1.2" />

            {/* Nós de junção física */}
            <circle cx="230" cy="50" r="1.5" fill={modoCiclo === 'night' && fluxoEletrico ? '#38bdf8' : '#475569'} />
            <circle cx="230" cy="89" r="1.5" fill={modoCiclo === 'night' && fluxoEletrico ? '#38bdf8' : '#475569'} />
            <circle cx="230" cy="128" r="1.5" fill={modoCiclo === 'night' && fluxoEletrico ? '#38bdf8' : '#475569'} />
            <circle cx="129" cy="66" r="1.5" fill={modoCiclo === 'night' && fluxoEletrico ? '#38bdf8' : '#475569'} />

            {/* Postes */}
            {renderizarPosteRealistaSVG(245, 2)}
            {renderizarPosteRealistaSVG(245, 41)}
            {renderizarPosteRealistaSVG(245, 80)}
          </svg>
        </div>

        {/* LADO DIREITO: Painel de Telemetria */}
        <div className="w-[170px] min-w-[170px] flex flex-col p-2 bg-slate-950/30 rounded-lg border border-slate-800/50 justify-between font-mono">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center mb-1.5">Painel Digital</span>
          
          <div className="flex flex-col gap-2 text-[9.5px] flex-1 justify-center px-1">
            <div className="flex flex-col gap-0.5 border-b border-slate-800/60 pb-1">
              <div className="flex justify-between text-[9px]">
                <span className="text-slate-400 font-bold">SOLAR GEN:</span>
                <span className={modoCiclo === 'day' ? "text-amber-400 font-black" : "text-slate-500 font-black"}>{geracaoSolar} W</span>
              </div>
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 transition-all duration-300" style={{ width: `${(geracaoSolar / 650) * 100}%` }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-0.5 border-b border-slate-800/60 pb-1">
              <div className="flex justify-between text-[9px]">
                <span className="text-slate-400 font-bold">BATTERY SOC:</span>
                <span className={cargaBateria < 25 ? "text-rose-400 font-black animate-pulse" : "text-emerald-400 font-black"}>{cargaBateria}%</span>
              </div>
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${cargaBateria}%` }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-0.5 border-b border-slate-800/60 pb-1">
              <div className="flex justify-between text-[9px]">
                <span className="text-slate-400 font-bold">LOAD DEMAND:</span>
                <span className={modoCiclo === 'night' && fluxoEletrico ? "text-sky-400 font-black" : "text-slate-500 font-black"}>{consumoCarga} W</span>
              </div>
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-sky-400 transition-all duration-300" style={{ width: `${(consumoCarga / 250) * 100}%` }}></div>
              </div>
            </div>

            <div className="flex justify-between items-center text-[9px]">
              <span className="text-slate-400 font-bold">REGULADOR:</span>
              <span className={`px-1 rounded-[3px] text-[8px] font-black ${modoCiclo === 'day' ? 'bg-amber-400/20 text-amber-400' : 'bg-emerald-400/20 text-emerald-400'}`}>
                {modoCiclo === 'day' ? 'CHARGING' : 'DISCHARGING'}
              </span>
            </div>

            <div className="flex justify-between items-center text-[9px]">
              <span className="text-slate-400 font-bold">ILUM. PÚBLICA:</span>
              <span className={`px-1 rounded-[3px] text-[8px] font-black ${modoCiclo === 'night' && fluxoEletrico ? 'bg-emerald-400/20 text-emerald-400 animate-pulse' : 'bg-slate-800 text-slate-500'}`}>
                {modoCiclo === 'night' && fluxoEletrico ? 'ACTIVE_ON' : 'STANDBY_OFF'}
              </span>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .stroke-dash {
          stroke-dasharray: 5 3;
          animation: currentFlow 0.3s infinite linear; 
        }
        @keyframes currentFlow {
          to { stroke-dashoffset: -8; }
        }
      `}</style>
    </div>
  );
}
