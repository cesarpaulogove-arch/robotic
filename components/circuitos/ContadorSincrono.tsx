'use client';
import React from 'react';

interface ContadorProps {
  clk: number;
  q0: number;
  q1: number;
  q2: number;
  q3: number;
}

export function ContadorSincrono({ clk, q0, q1, q2, q3 }: ContadorProps) {
  // Sinais intermediários das portas AND para acendimento visual dos fios
  const and1 = q0 & q1;
  const and2 = and1 & q2;

  return (
    <svg className="w-full h-[190px]" viewBox="-15 0 230 170" fill="none" stroke="currentColor" strokeWidth="1.2">
      {/* Linha de Sinal de Nível ALTO (VCC constante para as entradas J0 e K0) */}
      <path d="M -5 20 L 25 20" className="stroke-amber-400 stroke-[1.2]" />
      <text x="-12" y="15" fill="#fbbf24" className="text-[7px] font-bold font-mono">1 (Alto)</text>

      {/* Barramento Inferior Síncrono de Clock (Alimenta as entradas C de todos os FFs) */}
      <path d="M -10 150 L 195 150" className={`transition-colors duration-300 ${clk ? 'stroke-cyan-400 stroke-[1.5]' : 'stroke-slate-600'}`} />
      <text x="-12" y="162" fill="#22d3ee" className="text-[9px] font-bold font-mono">CLK: {clk}</text>

      {/* ----------------- FLIP-FLOP 0 (FF0) ----------------- */}
      <rect x="25" y="25" width="25" height="45" rx="2" fill="#0f2d4a" className="stroke-cyan-500" />
      <text x="32" y="37" fill="#94a3b8" className="text-[8px] font-bold font-mono">FF0</text>
      {/* Conexões do Clock no FF0 */}
      <path d="M 15 150 L 15 48 L 25 48" className={`transition-colors duration-300 ${clk ? 'stroke-cyan-400' : 'stroke-slate-600'}`} />
      <circle cx="15" cy="150" r="1.2" fill={clk ? '#22d3ee' : '#475569'} />
      {/* Entradas J0 e K0 conectadas ao nível Alto */}
      <path d="M 20 20 L 20 35 L 25 35" className="stroke-amber-400" />
      <path d="M 20 35 L 20 60 L 25 60" className="stroke-amber-400" />
      <circle cx="20" cy="35" r="1.2" fill="#fbbf24" />
      {/* Saída Q0 */}
      <path d="M 50 35 L 75 35" className={`transition-colors duration-300 ${q0 ? 'stroke-emerald-400 stroke-[1.5]' : 'stroke-slate-600'}`} />

      {/* ----------------- FLIP-FLOP 1 (FF1) ----------------- */}
      <rect x="75" y="25" width="25" height="45" rx="2" fill="#0f2d4a" className="stroke-cyan-500" />
      <text x="82" y="37" fill="#94a3b8" className="text-[8px] font-bold font-mono">FF1</text>
      {/* Conexões do Clock no FF1 */}
      <path d="M 65 150 L 65 48 L 75 48" className={`transition-colors duration-300 ${clk ? 'stroke-cyan-400' : 'stroke-slate-600'}`} />
      <circle cx="65" cy="150" r="1.2" fill={clk ? '#22d3ee' : '#475569'} />
      {/* Entradas J1 e K1 recebem Q0 diretamente */}
      <path d="M 70 35 L 70 60 L 75 60" className={`transition-colors duration-300 ${q0 ? 'stroke-emerald-400' : 'stroke-slate-600'}`} />
      <circle cx="70" cy="35" r="1.2" fill={q0 ? '#34d399' : '#475569'} />
      {/* Saída Q1 */}
      <path d="M 100 35 L 110 35" className={`transition-colors duration-300 ${q1 ? 'stroke-emerald-400 stroke-[1.5]' : 'stroke-slate-600'}`} />

      {/* PORTA AND 1 (Multiplica Q0 e Q1) */}
      <path d="M 110 30 L 115 30 A 6 6 0 0 1 115 42 L 110 42 Z" fill="#0c2438" className="stroke-cyan-500" />
      <path d="M 68 35 L 68 12 L 107 12 L 107 33 L 110 33" className={`transition-colors duration-300 ${q0 ? 'stroke-emerald-400' : 'stroke-slate-600'}`} />
      <circle cx="68" cy="35" r="1.2" fill={q0 ? '#34d399' : '#475569'} />
      {/* Conexão de Q1 na AND 1 */}
      <path d="M 105 35 L 105 39 L 110 39" className={`transition-colors duration-300 ${q1 ? 'stroke-emerald-400' : 'stroke-slate-600'}`} />
      <circle cx="105" cy="35" r="1.2" fill={q1 ? '#34d399' : '#475569'} />
      {/* Saída da AND 1 */}
      <path d="M 121 36 L 135 36" className={`transition-colors duration-300 ${and1 ? 'stroke-cyan-400' : 'stroke-slate-600'}`} />

      {/* ----------------- FLIP-FLOP 2 (FF2) ----------------- */}
      <rect x="135" y="25" width="25" height="45" rx="2" fill="#0f2d4a" className="stroke-cyan-500" />
      <text x="142" y="37" fill="#94a3b8" className="text-[8px] font-bold font-mono">FF2</text>
      {/* Conexões do Clock no FF2 */}
      <path d="M 125 150 L 125 48 L 135 48" className={`transition-colors duration-300 ${clk ? 'stroke-cyan-400' : 'stroke-slate-600'}`} />
      <circle cx="125" cy="150" r="1.2" fill={clk ? '#22d3ee' : '#475569'} />
      {/* Entradas J2 e K2 recebem a saída da AND 1 */}
      <path d="M 130 36 L 130 60 L 135 60" className={`transition-colors duration-300 ${and1 ? 'stroke-cyan-400' : 'stroke-slate-600'}`} />
      <circle cx="130" cy="36" r="1.2" fill={and1 ? '#22d3ee' : '#475569'} />
      {/* Saída Q2 */}
      <path d="M 160 35 L 170 35" className={`transition-colors duration-300 ${q2 ? 'stroke-emerald-400 stroke-[1.5]' : 'stroke-slate-600'}`} />

      {/* PORTA AND 2 (Multiplica a saída da AND 1 e Q2) */}
      <path d="M 170 30 L 175 30 A 6 6 0 0 1 175 42 L 170 42 Z" fill="#0c2438" className="stroke-cyan-500" />
      <path d="M 128 36 L 128 8 L 167 8 L 167 33 L 170 33" className={`transition-colors duration-300 ${and1 ? 'stroke-cyan-400' : 'stroke-slate-600'}`} />
      <circle cx="128" cy="36" r="1.2" fill={and1 ? '#22d3ee' : '#475569'} />
      {/* Conexão de Q2 na AND 2 */}
      <path d="M 165 35 L 165 39 L 170 39" className={`transition-colors duration-300 ${q2 ? 'stroke-emerald-400 stroke-[1.5]' : 'stroke-slate-600'}`} />
      <circle cx="165" cy="35" r="1.2" fill={q2 ? '#34d399' : '#475569'} />
      {/* Saída da AND 2 */}
      <path d="M 181 36 L 195 36" className={`transition-colors duration-300 ${and2 ? 'stroke-cyan-400' : 'stroke-slate-600'}`} />

      {/* ----------------- FLIP-FLOP 3 (FF3) ----------------- */}
      <rect x="195" y="25" width="25" height="45" rx="2" fill="#0f2d4a" className="stroke-cyan-500" />
      <text x="202" y="37" fill="#94a3b8" className="text-[8px] font-bold font-mono">FF3</text>
      {/* Conexões do Clock no FF3 */}
      <path d="M 185 150 L 185 48 L 195 48" className={`transition-colors duration-300 ${clk ? 'stroke-cyan-400' : 'stroke-slate-600'}`} />
      <circle cx="185" cy="150" r="1.2" fill={clk ? '#22d3ee' : '#475569'} />
      {/* Entradas J3 e K3 recebem a saída da AND 2 */}
      <path d="M 190 36 L 190 60 L 195 60" className={`transition-colors duration-300 ${and2 ? 'stroke-cyan-400' : 'stroke-slate-600'}`} />
      <circle cx="190" cy="36" r="1.2" fill={and2 ? '#22d3ee' : '#475569'} />
      {/* Saída Fina Q3 */}
      <path d="M 220 35 L 230 35" className={`transition-colors duration-300 ${q3 ? 'stroke-emerald-400 stroke-[1.5]' : 'stroke-slate-600'}`} />

      {/* Rótulos superiores indicadores de estado de Barramento das Saídas */}
      <text x="44" y="93" fill="#22d3ee" className="text-[10px] font-bold font-mono">Q0: {q0}</text>
      <text x="94" y="93" fill="#22d3ee" className="text-[10px] font-bold font-mono">Q1: {q1}</text>
      <text x="149" y="93" fill="#22d3ee" className="text-[10px] font-bold font-mono">Q2: {q2}</text>
      <text x="204" y="93" fill="#22d3ee" className="text-[10px] font-bold font-mono">Q3: {q3}</text>
    </svg>
  );
}
