'use client';
import React from 'react';

interface PortaProps { a: number; b: number; s: number; }

export  function PortaXOR({ a, b, s }: PortaProps) {
  return (
    <svg className="w-28 h-24" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M 5 20 L 32 20" className={`transition-colors duration-300 ${a ? 'stroke-amber-400 stroke-[2.5]' : 'stroke-slate-600'}`} />
      <path d="M 5 40 L 32 40" className={`transition-colors duration-300 ${b ? 'stroke-amber-400 stroke-[2.5]' : 'stroke-slate-600'}`} />
      <path d="M 22 12 C 28 24 28 36 22 48" fill="none" className="stroke-cyan-500" strokeWidth="1.5" />
      <path d="M 27 10 C 39 10 57 18 67 30 C 57 42 39 50 27 50 C 35 38 35 22 27 10 Z" fill="#0f2d4a" className="stroke-cyan-500" />
      <path d="M 67 30 L 95 30" className={`transition-colors duration-300 ${s ? 'stroke-emerald-400 stroke-[2.5]' : 'stroke-rose-500 stroke-[2.5]'}`} />
      <circle cx="31" cy="20" r="1.5" fill={a ? '#fbbf24' : '#475569'} />
      <circle cx="31" cy="40" r="1.5" fill={b ? '#fbbf24' : '#475569'} />
      <circle cx="67" cy="30" r="1.5" fill={s ? '#34d399' : '#f43f5e'} />
    </svg>
  );
}
