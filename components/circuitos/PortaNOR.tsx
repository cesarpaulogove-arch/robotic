'use client';
import React from 'react';

interface PortaProps { a: number; b: number; s: number; }

export  function PortaNOR({ a, b, s }: PortaProps) {
  return (
    <svg className="w-28 h-24" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M 5 20 L 37 20" className={`transition-colors duration-300 ${a ? 'stroke-amber-400 stroke-[2.5]' : 'stroke-slate-600'}`} />
      <path d="M 5 40 L 37 40" className={`transition-colors duration-300 ${b ? 'stroke-amber-400 stroke-[2.5]' : 'stroke-slate-600'}`} />
      <path d="M 30 10 C 42 10 60 18 70 30 C 60 42 42 50 30 50 C 38 38 38 22 30 10 Z" fill="#0f2d4a" className="stroke-cyan-500" />
      <circle cx="73" cy="30" r="3" fill="#071624" className="stroke-cyan-500" />
      <path d="M 76 30 L 95 30" className={`transition-colors duration-300 ${s ? 'stroke-emerald-400 stroke-[2.5]' : 'stroke-rose-500 stroke-[2.5]'}`} />
      <circle cx="36" cy="20" r="1.5" fill={a ? '#fbbf24' : '#475569'} />
      <circle cx="36" cy="40" r="1.5" fill={b ? '#fbbf24' : '#475569'} />
      <circle cx="76" cy="30" r="1.5" fill={s ? '#34d399' : '#f43f5e'} />
    </svg>
  );
}
