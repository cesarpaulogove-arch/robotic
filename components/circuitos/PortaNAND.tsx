'use client';
import React from 'react';

interface PortaProps { a: number; b: number; s: number; }

export  function PortaNAND({ a, b, s }: PortaProps) {
  return (
    <svg className="w-28 h-24" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M 5 20 L 40 20" className={`transition-colors duration-300 ${a ? 'stroke-amber-400 stroke-[2.5]' : 'stroke-slate-600'}`} />
      <path d="M 5 40 L 40 40" className={`transition-colors duration-300 ${b ? 'stroke-amber-400 stroke-[2.5]' : 'stroke-slate-600'}`} />
      <path d="M 40 10 L 55 10 A 20 20 0 0 1 55 50 L 40 50 Z" fill="#0f2d4a" className="stroke-cyan-500" />
      <circle cx="78" cy="30" r="3" fill="#071624" className="stroke-cyan-500" />
      <path d="M 81 30 L 95 30" className={`transition-colors duration-300 ${s ? 'stroke-emerald-400 stroke-[2.5]' : 'stroke-rose-500 stroke-[2.5]'}`} />
      <circle cx="40" cy="20" r="1.5" fill={a ? '#fbbf24' : '#475569'} />
      <circle cx="40" cy="40" r="1.5" fill={b ? '#fbbf24' : '#475569'} />
      <circle cx="81" cy="30" r="1.5" fill={s ? '#34d399' : '#f43f5e'} />
    </svg>
  );
}
