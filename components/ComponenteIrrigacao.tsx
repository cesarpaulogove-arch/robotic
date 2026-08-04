'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export function ComponenteIrrigacao(): React.JSX.Element {
  // Estados de telemetria e controle hidráulico/agrícola
  const [nivelTanque, setNivelTanque] = useState<number>(100);
  const [bombaAtiva, setBombaAtiva] = useState<boolean>(false);
  const [valvulaAberta, setValvulaAberta] = useState<boolean>(false);
  const [umidadeSolo, setUmidadeSolo] = useState<number>(30);
  const [estagioPlanta, setEstagioPlanta] = useState<number>(1); // 1: Broto, 2: Crescendo, 3: Madura

  // useRef para contar o tempo que a planta fica madura antes da colheita, sem forçar re-renderizações
  const contadorMaduraRef = useRef<number>(0);

  // Ciclo de vida rápido e frequente (400ms)
  useEffect(() => {
    const interval = setInterval(() => {
      if (nivelTanque < 30) setBombaAtiva(true);
      if (nivelTanque >= 100) setBombaAtiva(false);

      if (bombaAtiva) {
        setNivelTanque((prev) => Math.min(100, prev + 20));
      }

      if (umidadeSolo < 50 && nivelTanque > 10) {
        setValvulaAberta(true);
      }

      if (valvulaAberta) {
        setNivelTanque((prev) => Math.max(0, prev - 12));
        setUmidadeSolo((prev) => Math.min(100, prev + 15));
      }

      if (umidadeSolo >= 90 || nivelTanque <= 0) {
        setValvulaAberta(false);
      }

      // CORREÇÃO: Controle do Crescimento e Maturação Estável
      if (estagioPlanta >= 3) {
        // Se a planta já estiver grande, ela NÃO muda instantaneamente.
        // Ela fica travada no tamanho máximo acumulando tempo no contador.
        contadorMaduraRef.current += 1;

        // Aguarda 10 ciclos (cerca de 4 segundos) exibindo a planta madura com o fruto antes de colher
        if (contadorMaduraRef.current >= 10) {
          setEstagioPlanta(1); // Realiza a colheita e reinicia como broto
          contadorMaduraRef.current = 0; // Zera o cronômetro da colheita
        }
      } else if (valvulaAberta && umidadeSolo >= 40) {
        // Se ainda não cresceu totalmente, continua crescendo linearmente
        setEstagioPlanta((prev) => prev + 0.15); 
      }

      if (!valvulaAberta) {
        setUmidadeSolo((prev) => Math.max(20, prev - 8));
      }
    }, 400);

    return () => clearInterval(interval);
  }, [bombaAtiva, valvulaAberta, umidadeSolo, nivelTanque, estagioPlanta]);

  // Renderização das plantas em SVG com escala baseada no crescimento real
  const renderizarPlantaSVG = (x: number, y: number) => {
    const tamanho = Math.floor(estagioPlanta);
    const escala = 0.5 + (estagioPlanta * 0.25); 

    if (tamanho === 1) {
      return (
        <g transform={`translate(${x}, ${y}) scale(${escala})`} className="transition-all duration-300 ease-out">
          <path d="M 0 0 Q -3 -5 -5 -4 Q -3 -1 0 0" fill="#a3e635" stroke="#4d7c0f" strokeWidth="0.5" />
          <path d="M 0 0 Q 3 -5 5 -4 Q 3 -1 0 0" fill="#a3e635" stroke="#4d7c0f" strokeWidth="0.5" />
          <line x1="0" y1="0" x2="0" y2="4" stroke="#4d7c0f" strokeWidth="1.2" />
        </g>
      );
    } else if (tamanho === 2) {
      return (
        <g transform={`translate(${x}, ${y}) scale(${escala})`} className="transition-all duration-300 ease-out">
          <line x1="0" y1="2" x2="0" y2="-6" stroke="#15803d" strokeWidth="1.5" />
          <path d="M 0 -2 Q -6 -6 -8 -3 Q -5 0 0 -2" fill="#4ade80" stroke="#16a34a" strokeWidth="0.5" />
          <path d="M 0 -4 Q 6 -8 8 -5 Q 5 -1 0 -4" fill="#4ade80" stroke="#16a34a" strokeWidth="0.5" />
          <path d="M 0 -6 Q -4 -11 0 -12 Q 4 -11 0 -6" fill="#22c55e" />
        </g>
      );
    } else {
      return (
        <g transform={`translate(${x}, ${y}) scale(${escala})`} className="transition-all duration-300 ease-out">
          <line x1="0" y1="4" x2="0" y2="-10" stroke="#14532d" strokeWidth="1.8" />
          <path d="M 0 -2 Q -8 -5 -10 -1 Q -6 3 0 -2" fill="#16a34a" stroke="#14532d" strokeWidth="0.5" />
          <path d="M 0 -5 Q 8 -8 10 -4 Q 6 0 0 -5" fill="#16a34a" stroke="#14532d" strokeWidth="0.5" />
          <path d="M 0 -8 Q -7 -13 -8 -9 Q -4 -5 0 -8" fill="#15803d" />
          <path d="M 0 -10 Q 0 -17 3 -16 Q 3 -11 0 -10" fill="#22c55e" />
          <circle cx="5" cy="-5" r="2.5" fill="#f43f5e" />
          <circle cx="4.5" cy="-4.5" r="0.4" fill="#fbbf24" />
        </g>
      );
    }
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden p-5">
      
      {/* SUBBLOCO DE CIMA: FIXO */}
      <div className="flex-1 border-b-2 border-teal-400/60 shadow-[0_5px_15px_-5px_rgba(45,212,191,0.15)] relative overflow-hidden h-full w-full min-h-[220px] flex items-center justify-center bg-[#0c2438]/10 rounded-lg">
        <div className="relative w-full h-full">
          <Image 
            src="/irrigacao.png" 
            alt="Electronica Digital" 
            fill 
            className="object-contain" 
            priority 
          />
        </div>
      </div>

      {/* SUBBLOCO DE BAIXO */}
      <div className="flex-1 p-4 flex gap-4 overflow-hidden bg-[#0c2438]/20 rounded-xl border border-teal-500/5 min-h-[260px] relative mt-4">
        
        {/* LADO ESQUERDO: Circuito Hidráulico Expandido */}
        <div className="flex-1 flex flex-col items-center justify-center p-1 bg-slate-950/20 rounded-lg border border-slate-800/50 relative">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Circuito Hidráulico</span>
          
          <svg className="w-full h-[180px]" viewBox="-15 -10 250 170" fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="-15" y="90" width="260" height="80" fill="#451a03/30" stroke="none" />
            
            <line x1="-15" y1="100" x2="250" y2="100" stroke="#78350f" strokeWidth="1" />
            <line x1="-15" y1="118" x2="250" y2="118" stroke="#78350f" strokeWidth="0.8" opacity="0.7" />
            <line x1="-15" y1="136" x2="250" y2="136" stroke="#78350f" strokeWidth="0.8" opacity="0.5" />
            <line x1="-15" y1="154" x2="250" y2="154" stroke="#78350f" strokeWidth="0.8" opacity="0.3" />

            {/* WATER SOURCE & PUMP */}
            <path d="M 220 45 L 180 45" className={`transition-colors duration-300 ${bombaAtiva ? 'stroke-sky-400' : 'stroke-slate-600'}`} />
            <rect x="162" y="35" width="18" height="15" rx="1" fill="#1e293b" className="stroke-cyan-500" />
            <text x="165" y="45" fill="#22d3ee" className="text-[6px] font-mono font-bold">PUMP</text>
            <path d="M 171 35 L 171 10 L 140 10" className={`transition-colors duration-300 ${bombaAtiva ? 'stroke-sky-400 stroke-dash' : 'stroke-slate-600'}`} />

            {/* WATER TANK */}
            <rect x="105" y="10" width="35" height="50" rx="1" className="stroke-cyan-500" fill="#0f2d4a" />
            <rect x="107" y={12 + (46 - (nivelTanque * 0.46))} width="31" height={nivelTanque * 0.46} className="fill-sky-500/40 stroke-none transition-all duration-300" />
            <text x="110" y="38" fill="#94a3b8" className="text-[6px] font-bold font-mono">TANK</text>

            {/* VALVE */}
            <path d="M 105 50 L 75 50" className={`transition-colors duration-300 ${valvulaAberta ? 'stroke-sky-400' : 'stroke-slate-600'}`} />
            <polygon points="82,46 92,54 82,54 92,46" fill="#0f2d4a" className={valvulaAberta ? 'stroke-amber-400' : 'stroke-slate-500'} />
            <circle cx="87" cy="45" r="1" fill={valvulaAberta ? '#fbbf24' : '#475569'} />

            {/* FILTER SYSTEM */}
            <path d="M 75 50 L 35 50" className={`transition-colors duration-300 ${valvulaAberta ? 'stroke-sky-400 stroke-dash' : 'stroke-slate-600'}`} />
            <rect x="58" y="42" width="6" height="14" rx="1" fill="#1e293b" className="stroke-cyan-500" />
            <rect x="46" y="42" width="6" height="14" rx="1" fill="#1e293b" className="stroke-cyan-500" />

            {/* Tubo de Distribuição Principal */}
            <path d="M 35 50 L -5 50 L -5 154" strokeWidth="2" className={`transition-colors duration-300 ${valvulaAberta ? 'stroke-sky-400 stroke-dash' : 'stroke-slate-600'}`} />
            
            {/* Linhas Horizontais */}
            <path d="M -5 100 L 220 100" className={`transition-colors duration-300 ${valvulaAberta ? 'stroke-sky-400 stroke-dash' : 'stroke-slate-700/40'}`} />
            <path d="M -5 118 L 220 118" className={`transition-colors duration-300 ${valvulaAberta ? 'stroke-sky-400 stroke-dash' : 'stroke-slate-700/40'}`} />
            <path d="M -5 136 L 220 136" className={`transition-colors duration-300 ${valvulaAberta ? 'stroke-sky-400 stroke-dash' : 'stroke-slate-700/40'}`} />
            <path d="M -5 154 L 220 154" className={`transition-colors duration-300 ${valvulaAberta ? 'stroke-sky-400 stroke-dash' : 'stroke-slate-700/40'}`} />

            {/* Nós de junção */}
            <circle cx="-5" cy="100" r="2.5" fill="#071624" className={valvulaAberta ? 'stroke-sky-400' : 'stroke-slate-600'} strokeWidth="1.5" />
            <circle cx="-5" cy="100" r="0.8" fill="white" />
            <circle cx="-5" cy="118" r="2.5" fill="#071624" className={valvulaAberta ? 'stroke-sky-400' : 'stroke-slate-600'} strokeWidth="1.5" />
            <circle cx="-5" cy="118" r="0.8" fill="white" />
            <circle cx="-5" cy="136" r="2.5" fill="#071624" className={valvulaAberta ? 'stroke-sky-400' : 'stroke-slate-600'} strokeWidth="1.5" />
            <circle cx="-5" cy="136" r="0.8" fill="white" />
            <circle cx="-5" cy="154" r="2.5" fill="#071624" className={valvulaAberta ? 'stroke-sky-400' : 'stroke-slate-600'} strokeWidth="1.5" />
            <circle cx="-5" cy="154" r="0.8" fill="white" />

            <path d="M 40 100 L 25 160 M 80 100 L 65 160 M 120 100 L 105 160 M 160 100 L 145 160" className="stroke-slate-700/20" strokeDasharray="1 3" />

            {/* Gotas de água dinâmicas */}
            {valvulaAberta && (
              <g className="animate-pulse fill-sky-400">
                {/* Gotas Linha 1 */}
                <circle cx="37" cy="110" r="0.7" /><circle cx="67" cy="110" r="0.7" /><circle cx="97" cy="110" r="0.7" /><circle cx="127" cy="110" r="0.7" /><circle cx="157" cy="110" r="0.7" /><circle cx="187" cy="110" r="0.7" /><circle cx="217" cy="110" r="0.7" />
                {/* Gotas Linha 2 */}
                <circle cx="34" cy="126" r="0.7" /><circle cx="64" cy="126" r="0.7" /><circle cx="94" cy="126" r="0.7" /><circle cx="124" cy="126" r="0.7" /><circle cx="154" cy="126" r="0.7" /><circle cx="184" cy="126" r="0.7" /><circle cx="214" cy="126" r="0.7" />
                {/* Gotas Linha 3 */}
                <circle cx="31" cy="144" r="0.7" /><circle cx="61" cy="144" r="0.7" /><circle cx="91" cy="144" r="0.7" /><circle cx="121" cy="144" r="0.7" /><circle cx="151" cy="144" r="0.7" /><circle cx="181" cy="144" r="0.7" /><circle cx="211" cy="144" r="0.7" />
                {/* Gotas Linha 4 */}
                <circle cx="28" cy="160" r="0.7" /><circle cx="58" cy="160" r="0.7" /><circle cx="88" cy="160" r="0.7" /><circle cx="118" cy="160" r="0.7" /><circle cx="148" cy="160" r="0.7" /><circle cx="178" cy="160" r="0.7" /><circle cx="208" cy="160" r="0.7" />
              </g>
            )}

            {/* MATRIZ DE PLANTAS (7x4) */}
            {/* FILEIRA 1 */}
            {renderizarPlantaSVG(32, 100)}{renderizarPlantaSVG(62, 100)}{renderizarPlantaSVG(92, 100)}{renderizarPlantaSVG(122, 100)}{renderizarPlantaSVG(152, 100)}{renderizarPlantaSVG(182, 100)}{renderizarPlantaSVG(212, 100)}
            {/* FILEIRA 2 */}
            {renderizarPlantaSVG(29, 118)}{renderizarPlantaSVG(59, 118)}{renderizarPlantaSVG(89, 118)}{renderizarPlantaSVG(119, 118)}{renderizarPlantaSVG(149, 118)}{renderizarPlantaSVG(179, 118)}{renderizarPlantaSVG(209, 118)}
            {/* FILEIRA 3 */}
            {renderizarPlantaSVG(26, 136)}{renderizarPlantaSVG(56, 136)}{renderizarPlantaSVG(86, 136)}{renderizarPlantaSVG(116, 136)}{renderizarPlantaSVG(146, 136)}{renderizarPlantaSVG(176, 136)}{renderizarPlantaSVG(206, 136)}
            {/* FILEIRA 4 */}
            {renderizarPlantaSVG(23, 154)}{renderizarPlantaSVG(53, 154)}{renderizarPlantaSVG(83, 154)}{renderizarPlantaSVG(113, 154)}{renderizarPlantaSVG(143, 154)}{renderizarPlantaSVG(173, 154)}{renderizarPlantaSVG(203, 154)}
          </svg>
        </div>

        {/* LADO DIREITO: Painel de Telemetria */}
        <div className="w-[170px] min-w-[170px] flex flex-col p-2 bg-slate-950/30 rounded-lg border border-slate-800/50 justify-between font-mono">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center mb-1.5">Painel Digital</span>
          
          <div className="flex flex-col gap-2 text-[9.5px] flex-1 justify-center px-1">
            <div className="flex flex-col gap-0.5 border-b border-slate-800/60 pb-1">
              <div className="flex justify-between text-[9px]">
                <span className="text-slate-400 font-bold">WATER TANK:</span>
                <span className={nivelTanque < 25 ? "text-rose-400 font-black animate-pulse" : "text-sky-400 font-black"}>{nivelTanque}%</span>
              </div>
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500 transition-all duration-300" style={{ width: `${nivelTanque}%` }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-0.5 border-b border-slate-800/60 pb-1">
              <div className="flex justify-between text-[9px]">
                <span className="text-slate-400 font-bold">SOLO UMID.:</span>
                <span className={umidadeSolo < 40 ? "text-amber-400 font-black" : "text-emerald-400 font-black"}>{umidadeSolo}%</span>
              </div>
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${umidadeSolo}%` }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-0.5 border-b border-slate-800/60 pb-1">
              <div className="flex justify-between text-[9px]">
                <span className="text-slate-400 font-bold">HORTA STATUS:</span>
                <span className="text-lime-400 font-black uppercase">
                  {estagioPlanta < 1.8 ? 'BROTO' : (estagioPlanta < 2.7 ? 'CRESCENDO' : 'MADURA 🍓')}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center text-[9px]">
              <span className="text-slate-400 font-bold">BOMBA CAPT.:</span>
              <span className={`px-1 rounded-[3px] text-[8px] font-black ${bombaAtiva ? 'bg-amber-400/20 text-amber-400' : 'bg-slate-800 text-slate-500'}`}>
                {bombaAtiva ? 'RUNNING' : 'STOPPED'}
              </span>
            </div>

            <div className="flex justify-between items-center text-[9px]">
              <span className="text-slate-400 font-bold">VALV. REGA:</span>
              <span className={`px-1 rounded-[3px] text-[8px] font-black ${valvulaAberta ? 'bg-sky-400/20 text-sky-400' : 'bg-slate-800 text-slate-500'}`}>
                {valvulaAberta ? 'OPEN' : 'CLOSED'}
              </span>
            </div>

            <div className="flex justify-between items-center text-[9px]">
              <span className="text-slate-400 font-bold">FILTRAGEM:</span>
              <span className={`px-1 rounded-[3px] text-[8px] font-black ${valvulaAberta ? 'bg-emerald-400/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                {valvulaAberta ? 'ACTIVE' : 'IDLE'}
              </span>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .stroke-dash {
          stroke-dasharray: 4 2;
          animation: pipeFlow 0.3s infinite linear; 
        }
        @keyframes pipeFlow {
          to { stroke-dashoffset: -6; }
        }
      `}</style>
    </div>
  );
}
