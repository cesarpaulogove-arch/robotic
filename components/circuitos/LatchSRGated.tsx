'use client';
import React from 'react';

interface LatchProps {
  s: number;
  t: number;
  r: number;
  q: number;
  qbar: number;
}

export function LatchSRGated({ s, t, r, q, qbar }: LatchProps) {
  return (
    <svg className="w-full h-[190px]" viewBox="-15 0 230 170" fill="none" stroke="currentColor" strokeWidth="1.2">
      {/* Linhas de Entrada */}
      <path d="M 15 30 L 50 30" className={`transition-colors duration-300 ${s ? 'stroke-amber-400 stroke-[1.5]' : 'stroke-slate-600'}`} />
      <path d="M 15 85 L 35 85 L 35 50 L 50 50" className={`transition-colors duration-300 ${t ? 'stroke-amber-400 stroke-[1.5]' : 'stroke-slate-600'}`} />
      <path d="M 35 85 L 35 120 L 50 120" className={`transition-colors duration-300 ${t ? 'stroke-amber-400 stroke-[1.5]' : 'stroke-slate-600'}`} />
      <path d="M 15 140 L 50 140" className={`transition-colors duration-300 ${r ? 'stroke-amber-400 stroke-[1.5]' : 'stroke-slate-600'}`} />
      
      {/* Nós de derivação do Clock (T) */}
      <circle cx="35" cy="85" r="1.5" fill={t ? '#fbbf24' : '#475569'} />

      {/* NAND 1 (Superior Esquerda) */}
      <path d="M 50 25 L 62 25 A 12 12 0 0 1 62 55 L 50 55 Z" fill="#0f2d4a" className="stroke-cyan-500" />
      <circle cx="76" cy="40" r="2.5" fill="#071624" className="stroke-cyan-500" />
      
      {/* NAND 2 (Inferior Esquerda) */}
      <path d="M 50 115 L 62 115 A 12 12 0 0 1 62 145 L 50 145 Z" fill="#0f2d4a" className="stroke-cyan-500" />
      <circle cx="76" cy="130" r="2.5" fill="#071624" className="stroke-cyan-500" />

      {/* Conexões intermediárias */}
      <path d="M 78.5 40 L 110 40" className="stroke-slate-500" />
      <path d="M 78.5 130 L 110 130" className="stroke-slate-500" />

      {/* NAND 3 (Superior Direita - Saída Q) */}
      <path d="M 110 35 L 122 35 A 12 12 0 0 1 122 65 L 110 65 Z" fill="#0f2d4a" className="stroke-cyan-500" />
      <circle cx="136" cy="50" r="2.5" fill="#071624" className="stroke-cyan-500" />

      {/* NAND 4 (Inferior Direita - Saída Q̄) */}
      <path d="M 110 105 L 122 105 A 12 12 0 0 1 122 135 L 110 135 Z" fill="#0f2d4a" className="stroke-cyan-500" />
      <circle cx="136" cy="120" r="2.5" fill="#071624" className="stroke-cyan-500" />

      {/* Feedback Cruzado (Latch) */}
      <path d="M 138.5 50 L 148 50 L 102 110 L 110 110" className={`transition-colors duration-300 ${q ? 'stroke-emerald-400' : 'stroke-rose-500/40'}`} />
      <path d="M 138.5 120 L 148 120 L 102 60 L 110 60" className={`transition-colors duration-300 ${qbar ? 'stroke-emerald-400' : 'stroke-rose-500/40'}`} />
      
      {/* Linhas finais de saída */}
      <path d="M 148 50 L 175 50" className={`transition-colors duration-300 ${q ? 'stroke-emerald-400 stroke-[1.5]' : 'stroke-rose-500/40'}`} />
      <path d="M 148 120 L 175 120" className={`transition-colors duration-300 ${qbar ? 'stroke-emerald-400 stroke-[1.5]' : 'stroke-rose-500/40'}`} />
      
      <circle cx="148" cy="50" r="1.5" fill={q ? '#34d399' : '#f43f5e'} />
      <circle cx="148" cy="120" r="1.5" fill={qbar ? '#34d399' : '#f43f5e'} />

      {/* Identificadores de Entrada */}
      <text x="-10" y="34" fill="#94a3b8" className="text-[10px] font-bold font-mono">S: {s}</text>
      <text x="-10" y="89" fill="#94a3b8" className="text-[10px] font-bold font-mono">T: {t}</text>
      <text x="-10" y="144" fill="#94a3b8" className="text-[10px] font-bold font-mono">R: {r}</text>

      {/* Identificadores de Saída */}
      <text x="180" y="54" fill="#22d3ee" className="text-[10px] font-bold font-mono">Q: {q}</text>
      <text x="180" y="124" fill="#22d3ee" className="text-[10px] font-bold font-mono">Q̄: {qbar}</text>
    </svg>
  );
}
