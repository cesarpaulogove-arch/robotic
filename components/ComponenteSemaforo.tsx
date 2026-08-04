'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

type EstadoLuz = 'VERDE' | 'AMARELO' | 'VERMELHO';

export default function ComponenteSemaforo(): React.JSX.Element {
  // Controle de estados sincronizados do cruzamento
  const [sinal1, setSinal1] = useState<EstadoLuz>('VERDE');
  const [peao1, setPeao1] = useState<EstadoLuz>('VERMELHO');
  const [tempo1, setTempo1] = useState<number>(6);

  const [sinal2, setSinal2] = useState<EstadoLuz>('VERMELHO');
  const [peao2, setPeao2] = useState<EstadoLuz>('VERDE');
  const [tempo2, setTempo2] = useState<number>(6);

  useEffect(() => {
    const timer = setInterval(() => {
      // Sincronização do Semáforo 1 (Via Principal)
      setTempo1(prev => {
        if (prev > 1) return prev - 1;
        
        if (sinal1 === 'VERDE') {
          setSinal1('AMARELO');
          return 2; 
        } else if (sinal1 === 'AMARELO') {
          setSinal1('VERMELHO');
          setPeao1('VERDE'); 

          setSinal2('VERDE'); 
          setPeao2('VERMELHO'); 
          setTempo2(6);
          return 8; 
        } else {
          setSinal1('VERDE');
          setPeao1('VERMELHO');
          return 6;
        }
      });

      // Sincronização do Semáforo 2 (Via Cruza)
      setTempo2(prev => {
        if (prev > 1) return prev - 1;

        if (sinal2 === 'VERDE') {
          setSinal2('AMARELO');
          return 2;
        } else if (sinal2 === 'AMARELO') {
          setSinal2('VERMELHO');
          setPeao2('VERDE');

          sinal1 === 'VERMELHO' && setSinal1('VERDE');
          setPeao1('VERMELHO');
          setTempo1(6);
          return 8;
        } else {
          return prev;
        }
      });

    }, 1000);

    return () => clearInterval(timer);
  }, [sinal1, sinal2]);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden p-5">
      
      {/* ========================================================================= */}
      {/* SUBBLOCO DE CIMA: Imagem do Semáforo Real (Object-Cover Completo)         */}
      {/* ========================================================================= */}
      <div className="flex-1 border-b-2 border-teal-400/60 shadow-[0_5px_15px_-5px_rgba(45,212,191,0.15)] relative overflow-hidden h-full w-full min-h-[220px] rounded-lg bg-[#081b29]">
        <Image
          src="/semaforo.jpg"
          alt="Visualização do Semáforo Real"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* ========================================================================= */}
      {/* SUBBLOCO DE BAIXO: Posições Originais com Postes de Sustentação            */}
      {/* ========================================================================= */}
      <div className="flex-1 grid grid-cols-2 gap-6 relative overflow-hidden h-full p-4 bg-[#0c2438]/20 rounded-xl border border-teal-500/5 min-h-[260px] items-center mt-4">
        
        {/* SEMÁFORO 1: VIA PRINCIPAL (NORTE-SUL) */}
        <div className="flex flex-col items-center justify-between bg-[#061826]/40 border border-teal-500/10 rounded-xl p-4 h-full relative">
          <div className="absolute top-2 left-3 font-mono text-[8px] text-teal-400/50 uppercase tracking-widest">VIA PRINCIPAL</div>
          
          {/* Estrutura Física com os Postes */}
          <div className="flex gap-8 items-start justify-center flex-1 pt-6 relative w-full">
            
            {/* Semáforo de Carros + Poste */}
            <div className="flex flex-col items-center relative">
              <div className="w-14 bg-[#081b29] border border-teal-500/30 rounded-2xl p-2.5 flex flex-col gap-2.5 shadow-xl z-10 relative">
                <div className={`w-8 h-8 rounded-full border border-red-500/20 transition-all duration-300 ${sinal1 === 'VERMELHO' ? 'bg-red-500 shadow-[0_0_12px_#ef4444]' : 'bg-red-950/20'}`} />
                <div className={`w-8 h-8 rounded-full border border-amber-500/20 transition-all duration-300 ${sinal1 === 'AMARELO' ? 'bg-amber-400 shadow-[0_0_12px_#fbbf24]' : 'bg-amber-950/20'}`} />
                <div className={`w-8 h-8 rounded-full border border-emerald-500/20 transition-all duration-300 ${sinal1 === 'VERDE' ? 'bg-emerald-500 shadow-[0_0_12px_#10b981]' : 'bg-emerald-950/20'}`} />
              </div>
              {/* Poste do Semáforo de Carros */}
              <div className="w-1.5 h-16 bg-gradient-to-b from-teal-600/40 to-teal-950 border-l border-teal-500/30 -mt-1 z-0" />
            </div>

            {/* Semáforo de Peões + Poste */}
            <div className="flex flex-col items-center relative pt-4">
              <div className="w-10 bg-[#081b29]/90 border border-teal-500/20 rounded-xl p-1.5 flex flex-col gap-2 shadow-md z-10 relative">
                <div className={`w-6 h-6 rounded-sm border border-red-500/20 transition-all duration-300 flex items-center justify-center text-[10px] ${peao1 === 'VERMELHO' ? 'bg-red-500 text-red-950 shadow-[0_0_8px_#ef4444]' : 'bg-red-950/10 text-red-500/20'}`}>✋</div>
                <div className={`w-6 h-6 rounded-sm border border-emerald-500/20 transition-all duration-300 flex items-center justify-center text-[10px] ${peao1 === 'VERDE' ? 'bg-emerald-500 text-emerald-950 shadow-[0_0_8px_#10b981]' : 'bg-emerald-950/10 text-emerald-500/20'}`}>🚶</div>
              </div>
              {/* Poste do Semáforo de Peões */}
              <div className="w-1 h-14 bg-gradient-to-b from-teal-600/30 to-teal-950 border-l border-teal-500/20 -mt-0.5 z-0" />
            </div>
          </div>

          {/* Contador Digital */}
          <div className="mt-2 font-mono text-xs border border-teal-500/20 bg-teal-950/40 text-teal-300 px-4 py-1 rounded shadow-inner flex-shrink-0">
            T-MIN: <span className="text-white font-bold">{tempo1}s</span>
          </div>
        </div>

        {/* SEMÁFORO 2: VIA CRUZA (ESTE-OESTE) */}
        <div className="flex flex-col items-center justify-between bg-[#061826]/40 border border-teal-500/10 rounded-xl p-4 h-full relative">
          <div className="absolute top-2 left-3 font-mono text-[8px] text-teal-400/50 uppercase tracking-widest">VIA CRUZA</div>
          
          {/* Estrutura Física com os Postes */}
          <div className="flex gap-8 items-start justify-center flex-1 pt-6 relative w-full">
            
            {/* Semáforo de Carros + Poste */}
            <div className="flex flex-col items-center relative">
              <div className="w-14 bg-[#081b29] border border-teal-500/30 rounded-2xl p-2.5 flex flex-col gap-2.5 shadow-xl z-10 relative">
                <div className={`w-8 h-8 rounded-full border border-red-500/20 transition-all duration-300 ${sinal2 === 'VERMELHO' ? 'bg-red-500 shadow-[0_0_12px_#ef4444]' : 'bg-red-950/20'}`} />
                <div className={`w-8 h-8 rounded-full border border-amber-500/20 transition-all duration-300 ${sinal2 === 'AMARELO' ? 'bg-amber-400 shadow-[0_0_12px_#fbbf24]' : 'bg-amber-950/20'}`} />
                <div className={`w-8 h-8 rounded-full border border-emerald-500/20 transition-all duration-300 ${sinal2 === 'VERDE' ? 'bg-emerald-500 shadow-[0_0_12px_#10b981]' : 'bg-emerald-950/20'}`} />
              </div>
              {/* Poste do Semáforo de Carros */}
              <div className="w-1.5 h-16 bg-gradient-to-b from-teal-600/40 to-teal-950 border-l border-teal-500/30 -mt-1 z-0" />
            </div>

            {/* Semáforo de Peões + Poste */}
            <div className="flex flex-col items-center relative pt-4">
              <div className="w-10 bg-[#081b29]/90 border border-teal-500/20 rounded-xl p-1.5 flex flex-col gap-2 shadow-md z-10 relative">
                <div className={`w-6 h-6 rounded-sm border border-red-500/20 transition-all duration-300 flex items-center justify-center text-[10px] ${peao2 === 'VERMELHO' ? 'bg-red-500 text-red-950 shadow-[0_0_8px_#ef4444]' : 'bg-red-950/10 text-red-500/20'}`}>✋</div>
                <div className={`w-6 h-6 rounded-sm border border-emerald-500/20 transition-all duration-300 flex items-center justify-center text-[10px] ${peao2 === 'VERDE' ? 'bg-emerald-500 text-emerald-950 shadow-[0_0_8px_#10b981]' : 'bg-emerald-950/10 text-emerald-500/20'}`}>🚶</div>
              </div>
              {/* Poste do Semáforo de Peões */}
              <div className="w-1 h-14 bg-gradient-to-b from-teal-600/30 to-teal-950 border-l border-teal-500/20 -mt-0.5 z-0" />
            </div>
          </div>

          {/* Contador Digital */}
          <div className="mt-2 font-mono text-sm border border-teal-500/20 bg-teal-950/40 text-teal-300 px-4 py-1 rounded shadow-inner flex-shrink-0">
            T-MIN: <span className="text-white font-bold">{tempo2}s</span>
          </div>
        </div>

      </div>

    </div>
  );
}
