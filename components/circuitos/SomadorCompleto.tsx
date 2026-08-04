'use client';
import React from 'react';

interface SomadorProps {
  a: number;
  b: number;
  cin: number;
  soma: number;
  cout: number;
}

export function SomadorCompleto({ a, b, cin, soma, cout }: SomadorProps) {
  // Lógica de acendimento de conexões internas baseada nas operações booleanas
  const xor1 = a ^ b;
  const and1 = xor1 & cin;
  const and2 = a & b;

  return (
    <svg className="w-full h-[190px]" viewBox="-15 0 230 170" fill="none" stroke="currentColor" strokeWidth="1.2">
      
      {/* 1. Barramentos Horizontais de Entrada (Cin movido para o topo absoluto) */}
      <path d="M 15 15 L 105 15" className={`transition-colors duration-300 ${cin ? 'stroke-amber-400 stroke-[1.5]' : 'stroke-slate-600'}`} />
      <path d="M 15 32 L 50 32" className={`transition-colors duration-300 ${a ? 'stroke-amber-400 stroke-[1.5]' : 'stroke-slate-600'}`} />
      <path d="M 15 47 L 50 47" className={`transition-colors duration-300 ${b ? 'stroke-amber-400 stroke-[1.5]' : 'stroke-slate-600'}`} />

      {/* 2. Conexão de Cin descendo por cima diretamente para a XOR 2 e para a AND 1 */}
      {/* Desce de Cin (y=15) para a entrada da XOR 2 (y=47) */}
      <path d="M 100 15 L 100 47 L 105 47" className={`transition-colors duration-300 ${cin ? 'stroke-amber-400 stroke-[1.5]' : 'stroke-slate-600'}`} />
      {/* Continua descendo até a entrada da AND 1 (y=92) */}
      <path d="M 100 47 L 100 92 L 110 92" className={`transition-colors duration-300 ${cin ? 'stroke-amber-400 stroke-[1.5]' : 'stroke-slate-600'}`} />
      
      {/* Nós de derivação física */}
      <circle cx="100" cy="15" r="1.2" fill={cin ? '#fbbf24' : '#475569'} />
      <circle cx="100" cy="47" r="1.2" fill={cin ? '#fbbf24' : '#475569'} />

      {/* 3. Derivações Verticais de A e B para a porta AND inferior (AND 2) */}
      <path d="M 25 32 L 25 120 L 65 120" className={`transition-colors duration-300 ${a ? 'stroke-amber-400 stroke-[1.5]' : 'stroke-slate-600'}`} />
      <path d="M 35 47 L 35 132 L 65 132" className={`transition-colors duration-300 ${b ? 'stroke-amber-400 stroke-[1.5]' : 'stroke-slate-600'}`} />
      
      <circle cx="25" cy="32" r="1.2" fill={a ? '#fbbf24' : '#475569'} />
      <circle cx="35" cy="47" r="1.2" fill={b ? '#fbbf24' : '#475569'} />

      {/* 4. PORTA XOR 1 (Superior Esquerda) - Alimentada por A e B */}
      <path d="M 50 24 C 55 34 55 45 50 55" className="stroke-cyan-500" />
      <path d="M 53 22 C 62 22 72 28 78 39 C 72 50 62 56 53 56 C 59 47 59 32 53 22 Z" fill="#0f2d4a" className="stroke-cyan-500" />
      
      {/* Linhas de saída da XOR 1 entrando na XOR 2 (pino de cima y=31) e na AND 1 */}
      <path d="M 78 39 L 105 39" className={`transition-colors duration-300 ${xor1 ? 'stroke-cyan-400' : 'stroke-slate-600'}`} />
      <path d="M 88 39 L 88 80 L 110 80" className={`transition-colors duration-300 ${xor1 ? 'stroke-cyan-400' : 'stroke-slate-600'}`} />
      <circle cx="88" cy="39" r="1.2" fill={xor1 ? '#22d3ee' : '#475569'} />

      {/* 5. PORTA XOR 2 (Superior Direita - Saída SOMA / Σ) */}
      <path d="M 105 31 C 110 41 110 52 105 62" className="stroke-cyan-500" />
      <path d="M 108 29 C 116 29 126 35 132 46 C 126 57 116 63 108 63 C 114 54 114 39 108 29 Z" fill="#0f2d4a" className="stroke-cyan-500" />
      <path d="M 132 46 L 175 46" className={`transition-colors duration-300 ${soma ? 'stroke-emerald-400 stroke-[1.5]' : 'stroke-rose-500/40'}`} />

      {/* 6. PORTA AND 1 (Meio) */}
      <path d="M 110 75 L 118 75 A 10 10 0 0 1 118 97 L 110 97 Z" fill="#0f2d4a" className="stroke-cyan-500" />
      <path d="M 128 86 L 145 86 L 145 105 L 150 105" className={`transition-colors duration-300 ${and1 ? 'stroke-cyan-400' : 'stroke-slate-600'}`} />

      {/* 7. PORTA AND 2 (Inferior) */}
      <path d="M 65 115 L 73 115 A 10 10 0 0 1 73 135 L 65 135 Z" fill="#0f2d4a" className="stroke-cyan-500" />
      <path d="M 83 125 L 140 125 L 140 117 L 150 117" className={`transition-colors duration-300 ${and2 ? 'stroke-cyan-400' : 'stroke-slate-600'}`} />

      {/* 8. PORTA OR (Saída Cout) */}
      <path d="M 150 100 C 155 108 155 114 150 122" className="stroke-cyan-500" />
      <path d="M 150 100 C 159 100 169 104 175 111 C 169 118 159 122 150 122 Z" fill="#0f2d4a" className="stroke-cyan-500" />
      <path d="M 175 111 L 175 112" className={`transition-colors duration-300 ${cout ? 'stroke-emerald-400 stroke-[1.5]' : 'stroke-rose-500/40'}`} />

      {/* Textos Identificadores de Entrada */}
      <text x="-10" y="19" fill="#94a3b8" className="text-[10px] font-bold font-mono">Cin: {cin}</text>
      <text x="-10" y="36" fill="#94a3b8" className="text-[10px] font-bold font-mono">A: {a}</text>
      <text x="-10" y="51" fill="#94a3b8" className="text-[10px] font-bold font-mono">B: {b}</text>

      {/* Saídas */}
      <text x="180" y="50" fill="#22d3ee" className="text-[10px] font-bold font-mono">Σ: {soma}</text>
      <text x="180" y="116" fill="#22d3ee" className="text-[10px] font-bold font-mono">Cout: {cout}</text>
    </svg>
  );
}
