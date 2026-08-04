'use client';

import React, { useState, useEffect } from 'react';

// =========================================================================
// DEFINIÇÃO DE TIPOS E INTERFACES (TypeScript)
// =========================================================================
export interface LinhaTabela {
  a: number;
  b?: number; // Opcional por conta da porta NOT que só tem uma entrada
  s: number;
}

export interface CircuitoConfig {
  id: string;
  nome: string;
  subtitulo: string;
  tabelaVerdade: LinhaTabela[];
  renderPortaSvg: (a: number, b: number, s: number) => React.JSX.Element;
}

// =========================================================================
// BANCO DE DADOS COMPLETO DE CIRCUITOS CONFIGURADOS (7 PORTAS)
// =========================================================================
export const LISTA_CIRCUITOS: CircuitoConfig[] = [
  {
    id: 'and',
    nome: 'Porta AND (E)',
    subtitulo: 'Saída alta apenas se ambas entradas forem 1',
    tabelaVerdade: [
      { a: 0, b: 0, s: 0 },
      { a: 0, b: 1, s: 0 },
      { a: 1, b: 0, s: 0 },
      { a: 1, b: 1, s: 1 },
    ],
    renderPortaSvg: (a, b, s) => (
      <svg className="w-28 h-24" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M 5 20 L 40 20" className={`transition-colors duration-300 ${a ? 'stroke-amber-400 stroke-[2.5]' : 'stroke-slate-600'}`} />
        <path d="M 5 40 L 40 40" className={`transition-colors duration-300 ${b ? 'stroke-amber-400 stroke-[2.5]' : 'stroke-slate-600'}`} />
        <path d="M 40 10 L 55 10 A 20 20 0 0 1 55 50 L 40 50 Z" fill="#0f2d4a" className="stroke-cyan-500" />
        <path d="M 75 30 L 95 30" className={`transition-colors duration-300 ${s ? 'stroke-emerald-400 stroke-[2.5]' : 'stroke-rose-500 stroke-[2.5]'}`} />
        <circle cx="40" cy="20" r="1.5" fill={a ? '#fbbf24' : '#475569'} />
        <circle cx="40" cy="40" r="1.5" fill={b ? '#fbbf24' : '#475569'} />
        <circle cx="75" cy="30" r="1.5" fill={s ? '#34d399' : '#f43f5e'} />
      </svg>
    )
  },
  {
    id: 'nand',
    nome: 'Porta NAND (E-NÃO)',
    subtitulo: 'Inverte o resultado da operação E',
    tabelaVerdade: [
      { a: 0, b: 0, s: 1 },
      { a: 0, b: 1, s: 1 },
      { a: 1, b: 0, s: 1 },
      { a: 1, b: 1, s: 0 },
    ],
    renderPortaSvg: (a, b, s) => (
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
    )
  },
  {
    id: 'or',
    nome: 'Porta OR (OU)',
    subtitulo: 'Saída alta se pelo menos uma entrada for 1',
    tabelaVerdade: [
      { a: 0, b: 0, s: 0 },
      { a: 0, b: 1, s: 1 },
      { a: 1, b: 0, s: 1 },
      { a: 1, b: 1, s: 1 },
    ],
    renderPortaSvg: (a, b, s) => (
      <svg className="w-28 h-24" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M 5 20 L 37 20" className={`transition-colors duration-300 ${a ? 'stroke-amber-400 stroke-[2.5]' : 'stroke-slate-600'}`} />
        <path d="M 5 40 L 37 40" className={`transition-colors duration-300 ${b ? 'stroke-amber-400 stroke-[2.5]' : 'stroke-slate-600'}`} />
        <path d="M 30 10 C 42 10 60 18 70 30 C 60 42 42 50 30 50 C 38 38 38 22 30 10 Z" fill="#0f2d4a" className="stroke-cyan-500" />
        <path d="M 70 30 L 95 30" className={`transition-colors duration-300 ${s ? 'stroke-emerald-400 stroke-[2.5]' : 'stroke-rose-500 stroke-[2.5]'}`} />
        <circle cx="36" cy="20" r="1.5" fill={a ? '#fbbf24' : '#475569'} />
        <circle cx="36" cy="40" r="1.5" fill={b ? '#fbbf24' : '#475569'} />
        <circle cx="70" cy="30" r="1.5" fill={s ? '#34d399' : '#f43f5e'} />
      </svg>
    )
  },
  {
    id: 'nor',
    nome: 'Porta NOR (OU-NÃO)',
    subtitulo: 'Inverte o resultado da operação OU',
    tabelaVerdade: [
      { a: 0, b: 0, s: 1 },
      { a: 0, b: 1, s: 0 },
      { a: 1, b: 0, s: 0 },
      { a: 1, b: 1, s: 0 },
    ],
    renderPortaSvg: (a, b, s) => (
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
    )
  },
  {
    id: 'not',
    nome: 'Porta NOT (INVERSORA)',
    subtitulo: 'Inverte o estado lógico da entrada',
    tabelaVerdade: [
      { a: 0, s: 1 },
      { a: 1, s: 0 },
    ],
    renderPortaSvg: (a, b, s) => (
      <svg className="w-28 h-24" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M 5 30 L 40 30" className={`transition-colors duration-300 ${a ? 'stroke-amber-400 stroke-[2.5]' : 'stroke-slate-600'}`} />
        <path d="M 40 15 L 65 30 L 40 45 Z" fill="#0f2d4a" className="stroke-cyan-500" />
        <circle cx="68" cy="30" r="3" fill="#071624" className="stroke-cyan-500" />
        <path d="M 71 30 L 95 30" className={`transition-colors duration-300 ${s ? 'stroke-emerald-400 stroke-[2.5]' : 'stroke-rose-500 stroke-[2.5]'}`} />
        <circle cx="40" cy="30" r="1.5" fill={a ? '#fbbf24' : '#475569'} />
        <circle cx="71" cy="30" r="1.5" fill={s ? '#34d399' : '#f43f5e'} />
      </svg>
    )
  },
  {
    id: 'xor',
    nome: 'Porta EX-OR (OU EXCLUSIVO)',
    subtitulo: 'Saída alta se as entradas forem diferentes',
    tabelaVerdade: [
      { a: 0, b: 0, s: 0 },
      { a: 0, b: 1, s: 1 },
      { a: 1, b: 0, s: 1 },
      { a: 1, b: 1, s: 0 },
    ],
    renderPortaSvg: (a, b, s) => (
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
    )
  },
  {
    id: 'xnor',
    nome: 'Porta EX-NOR (OU NÃO EXCLUSIVO)',
    subtitulo: 'Saída alta se as entradas forem iguais',
    tabelaVerdade: [
      { a: 0, b: 0, s: 1 },
      { a: 0, b: 1, s: 0 },
      { a: 1, b: 0, s: 0 },
      { a: 1, b: 1, s: 1 },
    ],
    renderPortaSvg: (a, b, s) => (
      <svg className="w-28 h-24" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M 5 20 L 32 20" className={`transition-colors duration-300 ${a ? 'stroke-amber-400 stroke-[2.5]' : 'stroke-slate-600'}`} />
        <path d="M 5 40 L 32 40" className={`transition-colors duration-300 ${b ? 'stroke-amber-400 stroke-[2.5]' : 'stroke-slate-600'}`} />
        <path d="M 22 12 C 28 24 28 36 22 48" fill="none" className="stroke-cyan-500" strokeWidth="1.5" />
        <path d="M 27 10 C 39 10 57 18 67 30 C 57 42 39 50 27 50 C 35 38 35 22 27 10 Z" fill="#0f2d4a" className="stroke-cyan-500" />
        <circle cx="70" cy="30" r="3" fill="#071624" className="stroke-cyan-500" />
        <path d="M 73 30 L 95 30" className={`transition-colors duration-300 ${s ? 'stroke-emerald-400 stroke-[2.5]' : 'stroke-rose-500 stroke-[2.5]'}`} />
        <circle cx="31" cy="20" r="1.5" fill={a ? '#fbbf24' : '#475569'} />
        <circle cx="31" cy="40" r="1.5" fill={b ? '#fbbf24' : '#475569'} />
        <circle cx="73" cy="30" r="1.5" fill={s ? '#34d399' : '#f43f5e'} />
      </svg>
    )
  }
];

// =========================================================================
// COMPONENTE PRINCIPAL
// =========================================================================
export default function ComponenteCircuitoLogico(): React.JSX.Element {
  const [circuitoIndex, setCircuitoIndex] = useState<number>(0);
  const [linhaIndex, setLinhaIndex] = useState<number>(0);

  const circuitoAtivo = LISTA_CIRCUITOS[circuitoIndex];
  const dadosLinhaAtual = circuitoAtivo.tabelaVerdade[linhaIndex];
  const totalLinhas = circuitoAtivo.tabelaVerdade.length;

  // Alterna dinamicamente conforme o número de linhas da porta ativa (2 ou 4)
  useEffect(() => {
    const interval = setInterval(() => {
      setLinhaIndex((prev) => (prev + 1) % totalLinhas);
    }, 3000);
    return () => clearInterval(interval);
  }, [circuitoIndex, totalLinhas]);

  // Executado ao clicar no botão de trocar circuito
  const lidarTrocaCircuito = () => {
    setLinhaIndex(0);
    setCircuitoIndex((prev) => (prev + 1) % LISTA_CIRCUITOS.length);
  };

  const a = dadosLinhaAtual.a;
  const b = dadosLinhaAtual.b ?? 0; // Fallback se 'b' for undefined (caso da porta NOT)
  const s = dadosLinhaAtual.s;

  const ehPortaNot = circuitoAtivo.id === 'not';

  return (
    <div className="flex flex-col h-full w-full overflow-hidden p-4 bg-[#071624] text-slate-100 max-w-2xl mx-auto gap-4">
      
      {/* SUBBLOCO DE CIMA: FIXO - Imagem estática e intocável do Osciloscópio */}
      <div className="flex justify-center items-center w-full h-[200px] min-h-[200px] max-h-[220px] bg-slate-950/40 rounded-lg border border-cyan-500/30 overflow-hidden shadow-[0_4px_12px_-4px_rgba(34,211,238,0.15)] p-2">
        <img 
          src="/formas-de-onda-and.webp" 
          alt="Formas de Onda Estáticas" 
          className="w-full h-full object-contain"
        />
      </div>

      {/* SUBBLOCO DE BAIXO: Agrupa Painel de Controle, Esquema e Tabela */}
      <div className="flex flex-col p-3 gap-3 overflow-hidden bg-[#0c2438]/20 rounded-xl border border-cyan-500/5 min-h-[240px] relative">
        
        {/* SEÇÃO HEADER: Título do Circuito Ativo e Controle de Ciclo */}
        <div className="flex items-center justify-between bg-slate-950/40 p-2.5 rounded-lg border border-cyan-500/20">
          <div>
            <h2 className="text-sm font-black text-cyan-400 uppercase tracking-wider">{circuitoAtivo.nome}</h2>
            <p className="text-[10px] text-slate-400">{circuitoAtivo.subtitulo}</p>
          </div>
          
          <button 
            onClick={lidarTrocaCircuito}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 active:scale-95 text-cyan-95 text-[11px] font-black uppercase rounded shadow-lg shadow-cyan-600/20 transition-all border border-cyan-400/30"
          >
            <span>Próxima Porta</span>
            <span className="text-[12px]">🔄</span>
          </button>
        </div>

        {/* Distribuição Horizontal: Diagrama à esquerda e Matriz à direita */}
        <div className="flex gap-3 flex-1 overflow-hidden w-full">
          
          {/* Painel Esquerdo: Representação Gráfica com os Nós de Tensão */}
          <div className="flex-1 flex flex-col items-center justify-center p-2 bg-slate-950/20 rounded-lg border border-slate-800/50 relative">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Esquema Lógico</span>
            
            <div className="flex items-center justify-center w-full gap-2 font-mono text-[11px] relative py-2">
              {/* Entradas Dinâmicas */}
              <div className="flex flex-col gap-5 select-none z-10">
                <div className="flex items-center gap-1">
                  <span className="text-slate-400 font-bold text-[10px]">A:</span>
                  <span className={`w-5 h-5 flex items-center justify-center rounded font-black transition-all ${a ? 'bg-amber-400 text-amber-950 shadow-[0_0_8px_#fbbf24]' : 'bg-slate-800 text-slate-500'}`}>{a}</span>
                </div>
                
                {/* Renderiza a entrada B somente se NÃO for a porta NOT */}
                {!ehPortaNot && (
                  <div className="flex items-center gap-1">
                    <span className="text-slate-400 font-bold text-[10px]">B:</span>
                    <span className={`w-5 h-5 flex items-center justify-center rounded font-black transition-all ${b ? 'bg-amber-400 text-amber-950 shadow-[0_0_8px_#fbbf24]' : 'bg-slate-800 text-slate-500'}`}>{b}</span>
                  </div>
                )}
              </div>

              {/* Injeção Vetorial do Componente Ativo */}
              {circuitoAtivo.renderPortaSvg(a, b, s)}

              {/* Saída Dinâmica */}
              <div className="flex items-center gap-1 select-none z-10">
                <span className="text-slate-400 font-bold text-[10px]">S:</span>
                <span className={`w-5 h-5 flex items-center justify-center rounded font-black transition-all ${s ? 'bg-emerald-400 text-emerald-950 shadow-[0_0_8px_#34d399]' : 'bg-rose-950 text-rose-400 border border-rose-500/30'}`}>{s}</span>
              </div>
            </div>

          </div>

          {/* Painel Direito: Exibição da Tabela da Verdade */}
          <div className="w-[140px] flex flex-col p-2 bg-slate-950/20 rounded-lg border border-slate-800/50 justify-between">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center mb-1">Tabela Verdade</span>
            
            <div className="flex flex-col gap-1 font-mono text-[10px] h-full justify-center">
              <div className="flex justify-between border-b border-slate-800 pb-1 font-bold text-cyan-400 px-1">
                <span>A</span>
                {!ehPortaNot && <span>B</span>}
                <span>S</span>
              </div>
              
              {circuitoAtivo.tabelaVerdade.map((linha, idx) => (
                <div 
                  key={idx} 
                  className={`flex justify-between px-1 py-0.5 rounded transition-colors duration-200 ${idx === linhaIndex ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-500'}`}
                >
                  <span>{linha.a}</span>
                  {!ehPortaNot && <span>{linha.b}</span>}
                  <span>{linha.s}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
