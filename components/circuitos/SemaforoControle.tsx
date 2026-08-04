'use client';
import React from 'react';

interface SemaforoProps {
  e1: number;
  e2: number;
  a1: number; // Vermelho A
  a2: number; // Amarelo A
  a3: number; // Verde A
  b1: number; // Vermelho B
  b2: number; // Amarelo B
  b3: number; // Verde B
}

export function SemaforoControle({ e1, e2, a1, a2, a3, b1, b2, b3 }: SemaforoProps) {
  // Lógica dos barramentos verticais baseada na imagem
  const l1 = e1;         // E1 direto
  const l2 = e1 ? 0 : 1; // E1 invertido
  const l3 = e2;         // E2 direto
  const l4 = e2 ? 0 : 1; // E2 invertido

  // Lógica das portas intermediárias
  const portaA = l2 && l4; // NOT E1 AND NOT E2
  const portaB = l2 && l3; // NOT E1 AND E2
  const portaC = l1 && l4; // E1 AND NOT E2
  const portaD = l1 && l3; // E1 AND E2

  return (
    <svg className="w-full h-[190px]" viewBox="-15 -10 240 180" fill="none" stroke="currentColor" strokeWidth="1.2">
      {/* Barramentos Horizontais de Entrada superiores */}
      <path d="M 15 0 L 25 0" className={`transition-colors duration-300 ${e1 ? 'stroke-amber-400 stroke-[1.5]' : 'stroke-slate-600'}`} />
      <path d="M 55 0 L 65 0" className={`transition-colors duration-300 ${e2 ? 'stroke-amber-400 stroke-[1.5]' : 'stroke-slate-600'}`} />

      {/* Inversores superiores (NOT) */}
      {/* Inversor E1 -> L2 */}
      <path d="M 25 -5 L 35 0 L 25 5 Z" fill="#0f2d4a" className="stroke-cyan-500" />
      <circle cx="37" cy="0" r="1.5" fill="#071624" className="stroke-cyan-500" />
      
      {/* Inversor E2 -> L4 */}
      <path d="M 65 -5 L 75 0 L 65 5 Z" fill="#0f2d4a" className="stroke-cyan-500" />
      <circle cx="77" cy="0" r="1.5" fill="#071624" className="stroke-cyan-500" />

      {/* 4 Linhas de Barramento Verticais (L1, L2, L3, L4) */}
      <path d="M 15 0 L 15 130" className={`transition-colors duration-300 ${l1 ? 'stroke-amber-400 stroke-[1.5]' : 'stroke-slate-600'}`} />
      <path d="M 38 0 L 38 130" className={`transition-colors duration-300 ${l2 ? 'stroke-amber-400 stroke-[1.5]' : 'stroke-slate-600'}`} />
      <path d="M 55 0 L 55 130" className={`transition-colors duration-300 ${l3 ? 'stroke-amber-400 stroke-[1.5]' : 'stroke-slate-600'}`} />
      <path d="M 78 0 L 78 130" className={`transition-colors duration-300 ${l4 ? 'stroke-amber-400 stroke-[1.5]' : 'stroke-slate-600'}`} />

      {/* Identificadores do Barramento Vertical inferior */}
      <text x="12" y="140" fill="#475569" className="text-[7px] font-bold font-mono">L1</text>
      <text x="35" y="140" fill="#475569" className="text-[7px] font-bold font-mono">L2</text>
      <text x="52" y="140" fill="#475569" className="text-[7px] font-bold font-mono">L3</text>
      <text x="75" y="140" fill="#475569" className="text-[7px] font-bold font-mono">L4</text>

      {/* ==========================================
          PORTAS LÓGICAS AND (a, b, c, d)
         ========================================== */}
      {/* Porta a (L2 AND L4) */}
      <path d="M 38 20 L 90 20" className={`transition-colors duration-300 ${l2 ? 'stroke-amber-400' : 'stroke-slate-600'}`} />
      <path d="M 78 30 L 90 30" className={`transition-colors duration-300 ${l4 ? 'stroke-amber-400' : 'stroke-slate-600'}`} />
      <circle cx="38" cy="20" r="1" fill={l2 ? '#fbbf24' : '#475569'} />
      <circle cx="78" cy="30" r="1" fill={l4 ? '#fbbf24' : '#475569'} />
      <path d="M 90 15 L 96 15 A 5 5 0 0 1 96 35 L 90 35 Z" fill="#0f2d4a" className="stroke-cyan-500" />
      <text x="92" y="27" fill="#22d3ee" className="text-[7px] font-bold font-mono">a</text>

      {/* Porta b (L2 AND L3) */}
      <path d="M 38 45 L 90 45" className={`transition-colors duration-300 ${l2 ? 'stroke-amber-400' : 'stroke-slate-600'}`} />
      <path d="M 55 55 L 90 55" className={`transition-colors duration-300 ${l3 ? 'stroke-amber-400' : 'stroke-slate-600'}`} />
      <circle cx="38" cy="45" r="1" fill={l2 ? '#fbbf24' : '#475569'} />
      <circle cx="55" cy="55" r="1" fill={l3 ? '#fbbf24' : '#475569'} />
      <path d="M 90 40 L 96 40 Scho A 5 5 0 0 1 96 60 L 90 60 Z" fill="#0f2d4a" className="stroke-cyan-500" />
      <text x="92" y="52" fill="#22d3ee" className="text-[7px] font-bold font-mono">b</text>

      {/* Porta c (L1 AND L4) */}
      <path d="M 15 95 L 90 95" className={`transition-colors duration-300 ${l1 ? 'stroke-amber-400' : 'stroke-slate-600'}`} />
      <path d="M 78 105 L 90 105" className={`transition-colors duration-300 ${l4 ? 'stroke-amber-400' : 'stroke-slate-600'}`} />
      <circle cx="15" cy="95" r="1" fill={l1 ? '#fbbf24' : '#475569'} />
      <circle cx="78" cy="105" r="1" fill={l4 ? '#fbbf24' : '#475569'} />
      <path d="M 90 90 L 96 90 A 5 5 0 0 1 96 110 L 90 110 Z" fill="#0f2d4a" className="stroke-cyan-500" />
      <text x="92" y="102" fill="#22d3ee" className="text-[7px] font-bold font-mono">c</text>

      {/* Porta d (L1 AND L3) */}
      <path d="M 15 120 L 90 120" className={`transition-colors duration-300 ${l1 ? 'stroke-amber-400' : 'stroke-slate-600'}`} />
      <path d="M 55 130 L 90 130" className={`transition-colors duration-300 ${l3 ? 'stroke-amber-400' : 'stroke-slate-600'}`} />
      <circle cx="15" cy="120" r="1" fill={l1 ? '#fbbf24' : '#475569'} />
      <circle cx="55" cy="130" r="1" fill={l3 ? '#fbbf24' : '#475569'} />
      <path d="M 90 115 L 96 115 A 5 5 0 0 1 96 135 L 90 135 Z" fill="#0f2d4a" className="stroke-cyan-500" />
      <text x="92" y="127" fill="#22d3ee" className="text-[7px] font-bold font-mono">d</text>

      {/* ==========================================
          PORTAS LÓGICAS OR (e, f) E CONEXÕES DE SAÍDA
         ========================================== */}
      {/* Porta e (b OR c) */}
      <path d="M 101 50 L 115 50 L 115 70 L 120 70" className={`transition-colors duration-300 ${portaB ? 'stroke-cyan-400' : 'stroke-slate-600'}`} />
      <path d="M 101 100 L 115 100 L 115 80 L 120 80" className={`transition-colors duration-300 ${portaC ? 'stroke-cyan-400' : 'stroke-slate-600'}`} />
      <path d="M 120 68 C 123 73 123 77 120 82 C 125 82 130 80 133 75 C 130 70 125 68 120 68 Z" fill="#0f2d4a" className="stroke-cyan-500" />
      <text x="122" y="77" fill="#22d3ee" className="text-[6px] font-bold font-mono">e</text>

      {/* Porta f (a OR d) */}
      <path d="M 101 25 L 140 25 L 140 45 L 145 45" className={`transition-colors duration-300 ${portaA ? 'stroke-cyan-400' : 'stroke-slate-600'}`} />
      <path d="M 101 125 L 140 125 L 140 55 L 145 55" className={`transition-colors duration-300 ${portaD ? 'stroke-cyan-400' : 'stroke-slate-600'}`} />
      <path d="M 145 43 C 148 48 148 52 145 57 C 150 57 155 55 158 50 C 155 45 150 43 145 43 Z" fill="#0f2d4a" className="stroke-cyan-500" />
      <text x="147" y="52" fill="#22d3ee" className="text-[6px] font-bold font-mono">f</text>

      {/* Rotas finais para os Semáforos */}
      {/* Grupo A */}
      <path d="M 133 75 L 165 75" className={`transition-colors duration-300 ${a1 ? 'stroke-rose-500 stroke-[1.2]' : 'stroke-slate-600'}`} />
      <path d="M 101 50 L 165 50" className={`transition-colors duration-300 ${a2 ? 'stroke-amber-400 stroke-[1.2]' : 'stroke-slate-600'}`} />
      <path d="M 101 25 L 110 25 L 110 10 L 165 10" className={`transition-colors duration-300 ${a3 ? 'stroke-emerald-400 stroke-[1.2]' : 'stroke-slate-600'}`} />

      {/* Grupo B */}
      <path d="M 158 50 L 165 50" className={`transition-colors duration-300 ${b1 ? 'stroke-rose-500 stroke-[1.2]' : 'stroke-slate-600'}`} />
      <path d="M 101 125 L 165 125" className={`transition-colors duration-300 ${b2 ? 'stroke-amber-400 stroke-[1.2]' : 'stroke-slate-600'}`} />
      <path d="M 101 100 L 165 100" className={`transition-colors duration-300 ${b3 ? 'stroke-emerald-400 stroke-[1.2]' : 'stroke-slate-600'}`} />

      {/* CAIXA SEMÁFORO A */}
      <rect x="165" y="5" width="22" height="75" rx="2" fill="#091d2f" className="stroke-slate-700" />
      <circle cx="176" cy="15" r="4" fill={a3 ? '#10b981' : '#1e293b'} className={a3 ? 'stroke-emerald-400 shadow-[0_0_6px_#10b981]' : 'stroke-slate-800'} />
      <circle cx="176" cy="42" r="4" fill={a2 ? '#f59e0b' : '#1e293b'} className={a2 ? 'stroke-amber-400 shadow-[0_0_6px_#f59e0b]' : 'stroke-slate-800'} />
      <circle cx="176" cy="68" r="4" fill={a1 ? '#ef4444' : '#1e293b'} className={a1 ? 'stroke-rose-500 shadow-[0_0_6px_#ef4444]' : 'stroke-slate-800'} />

      {/* CAIXA SEMÁFORO B */}
      <rect x="165" y="85" width="22" height="75" rx="2" fill="#091d2f" className="stroke-slate-700" />
      <circle cx="176" cy="95" r="4" fill={b3 ? '#10b981' : '#1e293b'} className={b3 ? 'stroke-emerald-400 shadow-[0_0_6px_#10b981]' : 'stroke-slate-800'} />
      <circle cx="176" cy="122" r="4" fill={b2 ? '#f59e0b' : '#1e293b'} className={b2 ? 'stroke-amber-400 shadow-[0_0_6px_#f59e0b]' : 'stroke-slate-800'} />
      <circle cx="176" cy="148" r="4" fill={b1 ? '#ef4444' : '#1e293b'} className={b1 ? 'stroke-rose-500 shadow-[0_0_6px_#ef4444]' : 'stroke-slate-800'} />

      {/* LABELS DE ENTRADA DO SISTEMA */}
      <text x="-12" y="4" fill="#94a3b8" className="text-[9px] font-bold font-mono">E1: {e1}</text>
      <text x="28" y="4" fill="#94a3b8" className="text-[9px] font-bold font-mono">E2: {e2}</text>

      {/* LABELS DE SAÍDA TEXTUAIS */}
      <text x="192" y="18" fill="#10b981" className="text-[7px] font-mono">A3-VD</text>
      <text x="192" y="45" fill="#f59e0b" className="text-[7px] font-mono">A2-AM</text>
      <text x="192" y="71" fill="#ef4444" className="text-[7px] font-mono">A1-VM</text>

      <text x="192" y="98" fill="#10b981" className="text-[7px] font-mono">B3-VD</text>
      <text x="192" y="125" fill="#f59e0b" className="text-[7px] font-mono">B2-AM</text>
      <text x="192" y="151" fill="#ef4444" className="text-[7px] font-mono">B1-VM</text>
    </svg>
  );
}
