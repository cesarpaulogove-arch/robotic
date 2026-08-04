'use client';

import React, { useState, useEffect } from 'react';

// =========================================================================
// IMPORTAÇÃO DOS COMPONENTES VISUAIS (SVGS) DAS PORTAS E CIRCUITOS
// =========================================================================
import { PortaAND } from './circuitos/PortaAND';
import { PortaNAND } from './circuitos/PortaNAND';
import { PortaOR } from './circuitos/PortaOR';
import { PortaNOR } from './circuitos/PortaNOR';
import { PortaNOT } from './circuitos/PortaNOT';
import { PortaXOR } from './circuitos/PortaXOR';
import { PortaXNOR } from './circuitos/PortaXNOR';
import { ConversorGrayBinario } from './circuitos/ConversorGrayBinario';
import { LatchSRGated } from './circuitos/LatchSRGated';
import { SomadorCompleto } from './circuitos/SomadorCompleto';
import { SemaforoControle } from './circuitos/SemaforoControle';

// Tipagem de todos os identificadores de blocos lógicos disponíveis
type CircuitosDisponiveis = 'AND' | 'NAND' | 'OR' | 'NOR' | 'NOT' | 'XOR' | 'XNOR' | 'GRAY' | 'LATCH_SR' | 'SOMADOR' | 'SEMAFORO';

// Interface de dados estendida para suportar todas as matrizes de tabelas verdade
interface LinhaTabela {
  a: number;
  b?: number;
  c?: number;  // Usado como T no Latch e Cin no Somador Completo
  s: number;   // Saída principal / SOMA (Σ)
  s2?: number; // Usado para QBAR no Latch e Cout no Somador
  // Extensão de canais para o painel de semáforo
  a1?: number; a2?: number; a3?: number;
  b1?: number; b2?: number; b3?: number;
}

// =========================================================================
// DICIONÁRIO CENTRALIZADO DE TABELAS VERDADE (EXCETO GRAY QUE POSSUI SEU PRÓPRIO CICLO)
// =========================================================================
const MAPA_TABELAS: Record<Exclude<CircuitosDisponiveis, 'GRAY'>, LinhaTabela[]> = {
  AND:  [{ a: 0, b: 0, s: 0 }, { a: 0, b: 1, s: 0 }, { a: 1, b: 0, s: 0 }, { a: 1, b: 1, s: 1 }],
  NAND: [{ a: 0, b: 0, s: 1 }, { a: 0, b: 1, s: 1 }, { a: 1, b: 0, s: 1 }, { a: 1, b: 1, s: 0 }],
  OR:   [{ a: 0, b: 0, s: 0 }, { a: 0, b: 1, s: 1 }, { a: 1, b: 0, s: 1 }, { a: 1, b: 1, s: 1 }],
  NOR:  [{ a: 0, b: 0, s: 1 }, { a: 0, b: 1, s: 0 }, { a: 1, b: 0, s: 0 }, { a: 1, b: 1, s: 0 }],
  NOT:  [{ a: 0, s: 1 }, { a: 1, s: 0 }],
  XOR:  [{ a: 0, b: 0, s: 0 }, { a: 0, b: 1, s: 1 }, { a: 1, b: 0, s: 1 }, { a: 1, b: 1, s: 0 }],
  XNOR: [{ a: 0, b: 0, s: 1 }, { a: 0, b: 1, s: 0 }, { a: 1, b: 0, s: 0 }, { a: 1, b: 1, s: 1 }],
  
  LATCH_SR: [
    { a: 0, b: 0, c: 0, s: 0, s2: 1 },
    { a: 1, b: 1, c: 0, s: 1, s2: 0 },
    { a: 0, b: 0, c: 0, s: 1, s2: 0 },
    { a: 0, b: 1, c: 1, s: 0, s2: 1 },
    { a: 0, b: 0, c: 0, s: 0, s2: 1 }
  ],
  
  SOMADOR: [
    { a: 0, b: 0, c: 0, s2: 0, s: 0 }, { a: 0, b: 0, c: 1, s2: 0, s: 1 },
    { a: 0, b: 1, c: 0, s2: 0, s: 1 }, { a: 0, b: 1, c: 1, s2: 1, s: 0 },
    { a: 1, b: 0, c: 0, s2: 0, s: 1 }, { a: 1, b: 0, c: 1, s2: 1, s: 0 },
    { a: 1, b: 1, c: 0, s2: 1, s: 0 }, { a: 1, b: 1, c: 1, s2: 1, s: 1 }
  ],

  SEMAFORO: [
    { a: 0, b: 0, s: 0, a1: 0, a2: 0, a3: 1, b1: 1, b2: 0, b3: 0 },
    { a: 0, b: 1, s: 0, a1: 0, a2: 1, a3: 0, b1: 1, b2: 0, b3: 0 },
    { a: 1, b: 0, s: 0, a1: 1, a2: 0, a3: 0, b1: 0, b2: 0, b3: 1 },
    { a: 1, b: 1, s: 0, a1: 1, a2: 0, a3: 0, b1: 0, b2: 1, b3: 0 }
  ]
};

// Ordem cíclica de navegação do carrossel ao clicar em 'Next'
const ORDEM_CIRCUITOS: CircuitosDisponiveis[] = ['AND', 'NAND', 'OR', 'NOR', 'NOT', 'XOR', 'XNOR', 'GRAY', 'LATCH_SR', 'SOMADOR', 'SEMAFORO'];

export default function ComponenteCircuitos(): React.JSX.Element {
  const [circuitoAtivo, setCircuitoAtivo] = useState<CircuitosDisponiveis>('AND');
  const [linhaIndex, setLinhaIndex] = useState<number>(0);

  const ehConversorGray = circuitoAtivo === 'GRAY';
  const ehLatchSR = circuitoAtivo === 'LATCH_SR';
  const ehSomador = circuitoAtivo === 'SOMADOR';
  const ehSemaforo = circuitoAtivo === 'SEMAFORO';
  const ehPortaNot = circuitoAtivo === 'NOT';

  // Resgate dinâmico do bloco de dados atual
  const tabelaVerdadeAtual = !ehConversorGray ? MAPA_TABELAS[circuitoAtivo] : [];
  const dadosLinhaAtual = tabelaVerdadeAtual[linhaIndex] || { a: 0, b: 0, s: 0 };

  const a = dadosLinhaAtual.a;
  const b = dadosLinhaAtual.b ?? 0;
  const c = dadosLinhaAtual.c ?? 0;
  const s = dadosLinhaAtual.s;
  const s2 = dadosLinhaAtual.s2 ?? 0;

  // Temporizador interno estável que gerencia a varredura automática dos estados lógicos
  useEffect(() => {
    if (ehConversorGray) return;

    const interval = setInterval(() => {
      setLinhaIndex((prev) => {
        const total = tabelaVerdadeAtual.length || 4; 
        return (prev + 1) % total;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [circuitoAtivo, tabelaVerdadeAtual.length, ehConversorGray]);

  // Função disparada no evento de clique para saltar de circuito zerando a varredura com segurança
  const avancarProximoCircuito = () => {
    const indiceAtual = ORDEM_CIRCUITOS.indexOf(circuitoAtivo);
    const proximoIndice = (indiceAtual + 1) % ORDEM_CIRCUITOS.length;
    
    setLinhaIndex(0); 
    setCircuitoAtivo(ORDEM_CIRCUITOS[proximoIndice]);
  };

  // Sub-renderizador inteligente do painel inferior baseado no chaveamento de estados
  const renderizarDesignInferior = (): React.JSX.Element => {
    if (ehConversorGray) {
      const ComponenteGray = ConversorGrayBinario as React.ComponentType;
      return <ComponenteGray />;
    }

    if (ehLatchSR) {
      return (
        <div className="flex gap-3 flex-1 overflow-hidden w-full h-full">
          <div className="flex-1 flex flex-col items-center justify-center p-2 bg-slate-950/20 rounded-lg border border-slate-800/50 relative">
            <LatchSRGated s={a} t={b} r={c} q={s} qbar={s2} />
          </div>

          <div className="w-[170px] min-w-[170px] flex flex-col p-2 bg-slate-950/20 rounded-lg border border-slate-800/50 justify-between">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center mb-1">Tabela Verdade</span>
            <div className="flex flex-col gap-1 font-mono text-[9px] h-full justify-center">
              <div className="flex justify-between border-b border-slate-800 pb-1 font-bold text-cyan-400 px-1">
                <span className="flex gap-1"><span>S</span><span>T</span><span>R</span></span>
                <span className="flex gap-1 text-emerald-400"><span>Q</span><span>Q̄</span></span>
              </div>
              {tabelaVerdadeAtual.map((linha, idx) => (
                <div key={idx} className={`flex justify-between px-1 py-0.5 rounded transition-colors duration-200 ${idx === linhaIndex ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-500'}`}>
                  <span className="flex gap-2"><span>{linha.a}</span><span>{linha.b}</span><span>{linha.c}</span></span>
                  <span className="flex gap-2.5 px-1"><span>{linha.s}</span><span>{linha.s2}</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (ehSomador) {
      return (
        <div className="flex gap-3 flex-1 overflow-hidden w-full h-full">
          <div className="flex-1 flex flex-col items-center justify-center p-2 bg-slate-950/20 rounded-lg border border-slate-800/50 relative">
            <SomadorCompleto a={a} b={b} cin={c} soma={s} cout={s2} />
          </div>

          <div className="w-[170px] min-w-[170px] flex flex-col p-2 bg-slate-950/20 rounded-lg border border-slate-800/50 h-[215px]">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center mb-1">Tabela Verdade</span>
            <div className="flex flex-col gap-0.5 font-mono text-[9px] overflow-y-auto pr-1 flex-1 scrollbar-thin scrollbar-thumb-slate-800">
              <div className="flex justify-between border-b border-slate-800 pb-1 font-bold text-cyan-400 sticky top-0 bg-[#0c2438] z-10 px-1">
                <span className="flex gap-1"><span>Cn</span><span>A</span><span>B</span></span>
                <span className="flex gap-1 text-emerald-400"><span>Co</span><span>Σ</span></span>
              </div>
              {tabelaVerdadeAtual.map((linha, idx) => (
                <div key={idx} className={`flex justify-between px-1 py-0.5 rounded transition-colors duration-150 ${idx === linhaIndex ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-500'}`}>
                  <span className="flex gap-2"><span>{linha.c}</span><span>{linha.a}</span><span>{linha.b}</span></span>
                  <span className="flex gap-3.5 px-1.5 text-right"><span>{linha.s2}</span><span>{linha.s}</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (ehSemaforo) {
      return (
        <div className="flex gap-3 flex-1 overflow-hidden w-full h-full">
          <div className="flex-1 flex flex-col items-center justify-center p-2 bg-slate-950/20 rounded-lg border border-slate-800/50 relative">
      
            <SemaforoControle 
              e1={a} e2={b} 
              a1={dadosLinhaAtual.a1 || 0} a2={dadosLinhaAtual.a2 || 0} a3={dadosLinhaAtual.a3 || 0} 
              b1={dadosLinhaAtual.b1 || 0} b2={dadosLinhaAtual.b2 || 0} b3={dadosLinhaAtual.b3 || 0} 
            />
          </div>

          <div className="w-[185px] min-w-[185px] flex flex-col p-2 bg-slate-950/20 rounded-lg border border-slate-800/50 justify-between">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center mb-1">Tabela Verdade</span>
            <div className="flex flex-col gap-1 font-mono text-[8.5px] h-full justify-center">
              <div className="flex justify-between border-b border-slate-800 pb-1 font-bold text-cyan-400 px-1">
                <span className="flex gap-1.5"><span>E1</span><span>E2</span></span>
                <span className="flex gap-1 text-emerald-400"><span>A1</span><span>A2</span><span>A3</span></span>
                <span className="flex gap-1 text-rose-400"><span>B1</span><span>B2</span><span>B3</span></span>
              </div>
              {MAPA_TABELAS.SEMAFORO.map((row, idx) => (
                <div key={idx} className={`flex justify-between px-1 py-0.5 rounded transition-colors duration-150 ${idx === linhaIndex ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-500'}`}>
                  <span className="flex gap-3"><span>{row.a}</span><span>{row.b}</span></span>
                  <span className="flex gap-3 px-1 text-emerald-500"><span>{row.a1}</span><span>{row.a2}</span><span>{row.a3}</span></span>
                  <span className="flex gap-3 px-1 text-rose-500"><span>{row.b1}</span><span>{row.b2}</span><span>{row.b3}</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex gap-3 flex-1 overflow-hidden w-full h-full">
        {/* Painel Esquerdo Padrão das Portas Simples */}
        <div className="flex-1 flex flex-col items-center justify-center p-2 bg-slate-950/20 rounded-lg border border-slate-800/50 relative">

          <div className="flex items-center justify-center w-full gap-2 font-mono text-[11px] relative py-2">
            <div className="flex flex-col gap-5 select-none z-10">
              <div className="flex items-center gap-1">
                <span className="text-slate-400 font-bold text-[10px]">A:</span>
                <span className={`w-5 h-5 flex items-center justify-center rounded font-black transition-all ${a ? 'bg-amber-400 text-amber-950 shadow-[0_0_8px_#fbbf24]' : 'bg-slate-800 text-slate-500'}`}>{a}</span>
              </div>
              {!ehPortaNot && (
                <div className="flex items-center gap-1">
                  <span className="text-slate-400 font-bold text-[10px]">B:</span>
                  <span className={`w-5 h-5 flex items-center justify-center rounded font-black transition-all ${b ? 'bg-amber-400 text-amber-950 shadow-[0_0_8px_#fbbf24]' : 'bg-slate-800 text-slate-500'}`}>{b}</span>
                </div>
              )}
            </div>

            {circuitoAtivo === 'AND' && <PortaAND a={a} b={b} s={s} />}
            {circuitoAtivo === 'NAND' && <PortaNAND a={a} b={b} s={s} />}
            {circuitoAtivo === 'OR' && <PortaOR a={a} b={b} s={s} />}
            {circuitoAtivo === 'NOR' && <PortaNOR a={a} b={b} s={s} />}
            {circuitoAtivo === 'NOT' && <PortaNOT a={a} s={s} />}
            {circuitoAtivo === 'XOR' && <PortaXOR a={a} b={b} s={s} />}
            {circuitoAtivo === 'XNOR' && <PortaXNOR a={a} b={b} s={s} />}

            <div className="flex items-center gap-1 select-none z-10">
              <span className="text-slate-400 font-bold text-[10px]">S:</span>
              <span className={`w-5 h-5 flex items-center justify-center rounded font-black transition-all ${s ? 'bg-emerald-400 text-emerald-950 shadow-[0_0_8px_#34d399]' : 'bg-rose-950 text-rose-400 border border-rose-500/30'}`}>{s}</span>
            </div>
          </div>
        </div>

        {/* Tabela Verdade Lateral das Portas Simples */}
        <div className="w-[140px] flex flex-col p-2 bg-slate-950/20 rounded-lg border border-slate-800/50 justify-between">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center mb-1">Tabela Verdade</span>
          <div className="flex flex-col gap-1 font-mono text-[10px] h-full justify-center">
            <div className="flex justify-between border-b border-slate-800 pb-1 font-bold text-cyan-400 px-1">
              <span>A</span>
              {!ehPortaNot && <span>B</span>}
              <span>S</span>
            </div>
            {tabelaVerdadeAtual.map((linha, idx) => (
              <div key={idx} className={`flex justify-between px-1 py-0.5 rounded transition-colors duration-200 ${idx === linhaIndex ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-500'}`}>
                <span>{linha.a}</span>
                {!ehPortaNot && <span>{linha.b}</span>}
                <span>{linha.s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full min-h-screen w-full p-4 bg-[#071624] text-slate-100 max-w-2xl mx-auto gap-4">
      
      {/* SUBBLOCO DE CIMA: IMAGEM TOTALMENTE FIXA */}
      <div className="flex justify-center items-center w-full h-[200px] min-h-[200px] max-h-[220px] bg-slate-950/40 rounded-lg border border-cyan-500/30 overflow-hidden shadow-[0_4px_12px_-4px_rgba(34,211,238,0.15)] p-2">
        <img 
          src="/circuito.png" 
          alt="Electronica Digital" 
          className="w-full h-full object-contain"
        />
      </div>

      {/* PAINEL COMPACTO DE CONTROLE CENTRAL */}
      <div className="flex items-center justify-between bg-slate-950/60 px-3 py-1.5 rounded-xl border border-cyan-500/10 select-none">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Circuito Ativo:</span>
          <span className="text-xs font-black text-cyan-400 tracking-wide uppercase">
            {circuitoAtivo === 'GRAY' ? 'Gray → Binário' : 
             circuitoAtivo === 'LATCH_SR' ? 'Latch SR Controlado' : 
             circuitoAtivo === 'SOMADOR' ? 'Somador Completo 1-Bit' : 
             circuitoAtivo === 'SEMAFORO' ? 'Controle de Semáforo' : 
             `Porta ${circuitoAtivo}`}
          </span>
        </div>
        
        <button
          onClick={avancarProximoCircuito}
          className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 active:scale-95 text-cyan-95 text-[10px] font-black uppercase rounded-md shadow-md shadow-cyan-600/10 border border-cyan-400/20 transition-all flex items-center gap-1"
        >
          <span>Next</span>
          <span className="text-[11px]">➡️</span>
        </button>
      </div>

      {/* SUBBLOCO DE BAIXO */}
      <div className="flex flex-col p-3 gap-3 overflow-hidden bg-[#0c2438]/20 rounded-xl border border-cyan-500/5 min-h-[240px] relative flex-1">
        {renderizarDesignInferior()}
      </div>

    </div>
  );
}
