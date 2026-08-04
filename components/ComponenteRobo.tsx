'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ComponenteRobo(): React.JSX.Element {
  const [status, setStatus] = useState<'loading' | 'traveling'>('loading');
  const [boxLoaded, setBoxLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (status === 'loading') {
      const loadTimeout = setTimeout(() => setBoxLoaded(true), 2500);
      const travelTimeout = setTimeout(() => setStatus('traveling'), 4000);
      return () => { clearTimeout(loadTimeout); clearTimeout(travelTimeout); };
    } else {
      const unloadTimeout = setTimeout(() => setBoxLoaded(false), 2500);
      const returnTimeout = setTimeout(() => setStatus('loading'), 5000);
      return () => { clearTimeout(unloadTimeout); clearTimeout(returnTimeout); };
    }
  }, [status]);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden p-5">
      
      {/* ========================================================================= */}
      {/* SUBBLOCO DE CIMA: Alinhado e dimensionado igual ao do semáforo            */}
      {/* ========================================================================= */}
      <div className="flex-1 border-b-2 border-teal-400/60 shadow-[0_5px_15px_-5px_rgba(45,212,191,0.15)] relative overflow-hidden h-full w-full min-h-[220px] flex items-center justify-center bg-[#0c2438]/10 rounded-lg">
        <div className="relative w-full h-full">
          <Image 
            src="/robo.webp" 
            alt="Robô Verdadeiro" 
            fill 
            className="object-contain" 
            priority 
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUBBLOCO DE BAIXO: Espaçamentos, margens e alturas idênticas ao semáforo   */}
      {/* ========================================================================= */}
      <div className="flex-1 p-4 flex flex-col justify-center overflow-hidden bg-[#0c2438]/20 rounded-xl border border-teal-500/5 min-h-[260px] relative mt-4">
        <div className="flex-1 w-full flex items-center justify-between relative px-6 py-2 overflow-hidden">
          
          {/* Guindaste Fixo */}
          <div className="flex flex-col items-center select-none z-10 -ml-16">
            <div className="w-56 h-56 relative flex items-center justify-center bg-teal-950/15 rounded-xl border border-teal-500/5">
              <svg className="w-44 h-44 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M4 21h8M6 21v-4h4v4M8 17V4M3 6h5M8 4h17" strokeLinecap="round" strokeLinejoin="round" />
                <g className={status === 'loading' ? 'animate-[hookMove_2s_infinite_ease-in-out]' : ''}>
                  <path d="M22 4v6" strokeLinecap="round" strokeDasharray="1.5 1.5" />
                  <rect x="20" y="10" width="4" height="4" rx="0.5" fill="currentColor" fillOpacity="0.2" />
                </g>
              </svg>
            </div>
          </div>

          {/* Carrinho de Transporte (AGV) */}
          <div className={`flex flex-col items-center absolute left-[36px] bottom-[-34px] transition-all z-20 ${status === 'traveling' ? 'animate-[agvRoute_5s_infinite_linear]' : 'translate-x-0'}`}>
            <div className={`w-14 h-10 bg-amber-500/80 border border-amber-600 rounded-sm mb-[-40px] z-30 transition-all duration-500 ease-out transform ${boxLoaded ? 'opacity-100 scale-100 translate-y-[52px]' : 'opacity-0 scale-50 translate-y-0'} flex items-center justify-center text-[14px] font-black text-amber-950 shadow-md shadow-amber-500/10`}>
              📦
            </div>
            <div className="w-52 h-52 relative flex items-center justify-center bg-teal-950/5">
              <svg className="w-40 h-40 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M3 8v5a2 2 0 002 2h14a2 2 0 002-2V8M5 11h14" fill="currentColor" fillOpacity="0.1" strokeWidth="1.2" />
                <circle cx="7" cy="16" r="1.5" fill="#081b29" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="17" cy="15.5" r="1.5" fill="#081b29" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="20" cy="11" r="0.5" fill="currentColor" className="animate-pulse" />
              </svg>
            </div>
          </div>
          <div className="w-56 h-56 opacity-0 select-none pointer-events-none pr-4"></div>
        </div>
      </div>

           {/* Definições das animações com descida do gancho reduzida e calibrada */}
      <style>{`
        /* Corrigido: Reduzido de 20px/8px para apenas 4px para o gancho não ultrapassar o robô */
        @keyframes hookMove {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(4px); }
        }

        @keyframes agvRoute {
          0% { transform: translateX(0px); opacity: 1; }
          40% { transform: translateX(270px); opacity: 1; }
          45% { transform: translateX(340px); opacity: 0; }
          55% { transform: translateX(-160px); opacity: 0; }
          65% { transform: translateX(-60px); opacity: 1; }
          100% { transform: translateX(0px); opacity: 1; }
        }
      `}</style>

    </div>
  );
}
