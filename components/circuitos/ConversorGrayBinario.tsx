'use client';

import React, { useState, useEffect } from 'react';

// =========================================================================
// INTERFACE DE TIPOS INTERNOS
// =========================================================================
interface LinhaConversor {
  a: number;
  b: number;
  c: number;
  d: number;
  qa: number;
  qb: number;
  qc: number;
  qd: number;
}

// =========================================================================
// BANCO DE DADOS DE CONVERSÃO (GRAY -> BINÁRIO)
// =========================================================================
const TABELA_CONVERSOR: LinhaConversor[] = (() => {
  const tabela: LinhaConversor[] = [];
  for (let i = 0; i < 16; i++) {
    // Entradas em código Gray decodificadas bit a bit
    const a = (i >> 3) & 1;
    const b = (i >> 2) & 1;
    const c = (i >> 1) & 1;
    const d = i & 1;

    // Lógica em cascata baseada nas portas XOR
    const qa = a;
    const qb = qa ^ b;
    const qc = qb ^ c;
    const qd = qc ^ d;

    tabela.push({ a, b, c, d, qa, qb, qc, qd });
  }
  return tabela;
})();

// =========================================================================
// EXPORTAÇÃO DO COMPONENTE NOMEDADO
// =========================================================================
export function ConversorGrayBinario(): React.JSX.Element {
  const [linhaIndex, setLinhaIndex] = useState<number>(0);

  // Ciclo automático de 2.5 segundos pelas 16 posições da tabela verdade
  useEffect(() => {
    const interval = setInterval(() => {
      setLinhaIndex((prev) => (prev + 1) % 16);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const { a, b, c, d, qa, qb, qc, qd } = TABELA_CONVERSOR[linhaIndex];

  return (
    <div className="flex gap-3 flex-1 overflow-hidden w-full h-full">
      
      {/* LADO ESQUERDO: Esquema Lógico SVG em Cascata Interativo */}
      <div className="flex-1 flex flex-col items-center justify-center p-2 bg-slate-950/20 rounded-lg border border-slate-800/50 relative">
        <svg className="w-full h-[190px]" viewBox="-15 0 230 170" fill="none" stroke="currentColor" strokeWidth="1.2">
          {/* Linha A -> QA */}
          <path d="M 30 20 L 165 20" className={`transition-colors duration-300 ${a ? 'stroke-amber-400 stroke-' : 'stroke-slate-600'}`} />
          <path d="M 45 20 L 45 42" className={`transition-colors duration-300 ${a ? 'stroke-amber-400 stroke-' : 'stroke-slate-600'}`} />
          <circle cx="45" cy="20" r="1.5" fill={a ? '#fbbf24' : '#475569'} />

          {/* Porta XOR 1 (B e QA) */}
          <path d="M 30 58 L 55 58" className={`transition-colors duration-300 ${b ? 'stroke-amber-400 stroke-' : 'stroke-slate-600'}`} />
          <path d="M 45 42 L 55 42" className={`transition-colors duration-300 ${qa ? 'stroke-amber-400 stroke-' : 'stroke-slate-600'}`} />
          {/* Desenho do Corpo XOR 1 */}
          <path d="M 50 38 C 54 46 54 54 50 62" className="stroke-cyan-500" strokeWidth="1.5" />
          <path d="M 53 35 C 62 35 73 42 80 50 C 73 58 62 65 53 65 C 58 57 58 43 53 35 Z" fill="#0f2d4a" className="stroke-cyan-500" strokeWidth="1.5" />
          {/* Saída QB */}
          <path d="M 80 50 L 165 50" className={`transition-colors duration-300 ${qb ? 'stroke-emerald-400 stroke-' : 'stroke-rose-500/40'}`} />
          <path d="M 95 50 L 95 82" className={`transition-colors duration-300 ${qb ? 'stroke-emerald-400 stroke-' : 'stroke-rose-500/40'}`} />
          <circle cx="95" cy="50" r="1.5" fill={qb ? '#34d399' : '#f43f5e'} />

          {/* Porta XOR 2 (C e QB) */}
          <path d="M 30 98 L 105 98" className={`transition-colors duration-300 ${c ? 'stroke-amber-400 stroke-' : 'stroke-slate-600'}`} />
          <path d="M 95 82 L 105 82" className={`transition-colors duration-300 ${qb ? 'stroke-emerald-400 stroke-' : 'stroke-rose-500/40'}`} />
          {/* Desenho do Corpo XOR 2 */}
          <path d="M 100 78 C 104 86 104 94 100 102" className="stroke-cyan-500" strokeWidth="1.5" />
          <path d="M 103 75 C 112 75 123 82 130 90 C 123 98 112 105 103 105 C 108 97 108 83 103 75 Z" fill="#0f2d4a" className="stroke-cyan-500" strokeWidth="1.5" />
          {/* Saída QC */}
          <path d="M 130 90 L 165 90" className={`transition-colors duration-300 ${qc ? 'stroke-emerald-400 stroke-' : 'stroke-rose-500/40'}`} />
          <path d="M 140 90 L 140 122" className={`transition-colors duration-300 ${qc ? 'stroke-emerald-400 stroke-' : 'stroke-rose-500/40'}`} />
          <circle cx="140" cy="90" r="1.5" fill={qc ? '#34d399' : '#f43f5e'} />

          {/* Porta XOR 3 (D e QC) */}
          <path d="M 30 138 L 150 138" className={`transition-colors duration-300 ${d ? 'stroke-amber-400 stroke-' : 'stroke-slate-600'}`} />
          <path d="M 140 122 L 150 122" className={`transition-colors duration-300 ${qc ? 'stroke-emerald-400 stroke-' : 'stroke-rose-500/40'}`} />
          {/* Desenho do Corpo XOR 3 */}
          <path d="M 145 118 C 149 126 149 134 145 142" className="stroke-cyan-500" strokeWidth="1.5" />
          <path d="M 148 115 C 157 115 168 122 175 130 C 168 138 157 145 148 145 C 153 137 153 123 148 115 Z" fill="#0f2d4a" className="stroke-cyan-500" strokeWidth="1.5" />
          {/* Saída QD */}
          <path d="M 175 130 L 165 130" className={`transition-colors duration-300 ${qd ? 'stroke-emerald-400 stroke-' : 'stroke-rose-500/40'}`} />

          {/* IDENTIFICADORES DE ENTRADA (Afastados e com espaço regulado após ':') */}
          <text x="-10" y="23" fill="#94a3b8" className="text-[10px] font-bold font-mono">A: {a}</text>
          <text x="-10" y="61" fill="#94a3b8" className="text-[10px] font-bold font-mono">B: {b}</text>
          <text x="-10" y="101" fill="#94a3b8" className="text-[10px] font-bold font-mono">C: {c}</text>
          <text x="-10" y="141" fill="#94a3b8" className="text-[10px] font-bold font-mono">D: {d}</text>

          {/* IDENTIFICADORES DE SAÍDA (Afastados e com espaço regulado após ':') */}
          <text x="175" y="23" fill="#22d3ee" className="text-[10px] font-bold font-mono">QA: {qa}</text>
          <text x="175" y="53" fill="#22d3ee" className="text-[10px] font-bold font-mono">QB: {qb}</text>
          <text x="175" y="93" fill="#22d3ee" className="text-[10px] font-bold font-mono">QC: {qc}</text>
          <text x="175" y="133" fill="#22d3ee" className="text-[10px] font-bold font-mono">QD: {qd}</text>
        </svg>
      </div>

      {/* LADO DIREITO: Matriz da Tabela Verdade Ampliada com Scroll Interno */}
      <div className="w-[170px] min-w-[170px] flex flex-col p-2 bg-slate-950/20 rounded-lg border border-slate-800/50 overflow-hidden h-[215px]">
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center mb-1">Tabela Verdade</span>
        
        <div className="flex flex-col gap-0.5 font-mono text-[9px] overflow-y-auto pr-1 flex-1 scrollbar-thin scrollbar-thumb-slate-800">
          <div className="flex justify-between border-b border-slate-800 pb-1 font-bold text-cyan-400 sticky top-0 bg-[#0c2438] z-10 px-2">
            <span>Gray</span>
            <span className="text-emerald-400">Binário</span>
          </div>
          
          {TABELA_CONVERSOR.map((linha, idx) => (
            <div 
              key={idx} 
              className={`flex justify-between px-2 py-0.5 rounded transition-colors duration-150 ${idx === linhaIndex ? 'bg-cyan-500/20 text-cyan-300 font-black' : 'text-slate-500'}`}
            >
              <span className="tracking-wider">{linha.a}{linha.b}{linha.c}{linha.d}</span>
              <span className="tracking-wider">{linha.qa}{linha.qb}{linha.qc}{linha.qd}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
