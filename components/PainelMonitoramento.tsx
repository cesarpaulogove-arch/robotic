'use client';

import React from 'react';

interface PainelMonitoramentoProps {
  cancelaEntrada: boolean;
  cancelaSaida: boolean;
  historicoEntradas: number;
  historicoSaidas: number;
  vagasOcupadas: number;
  totalVagas: number;
}

export default function PainelMonitoramento({
  cancelaEntrada,
  cancelaSaida,
  historicoEntradas,
  historicoSaidas,
  vagasOcupadas,
  totalVagas,
}: PainelMonitoramentoProps): React.JSX.Element {
  const porcentagemOcupacao = (vagasOcupadas / totalVagas) * 100;

  return (
    <div className="grid grid-cols-4 gap-3 mt-4 bg-[#061826]/80 border border-teal-500/10 p-3 rounded-xl font-mono text-xs">
      
      <div className="bg-[#0c2438]/40 border border-teal-500/5 p-2 rounded-lg flex flex-col justify-between">
        <span className="text-[9px] text-teal-400/60 uppercase tracking-wider">Fluxo de Entrada</span>
        <div className="flex items-center justify-between mt-1">
          <span className={`text-[10px] font-bold ${cancelaEntrada ? 'text-emerald-400 animate-pulse' : 'text-amber-500'}`}>
            {cancelaEntrada ? 'LIBERADO' : 'BLOQUEADO'}
          </span>
          <span className="text-[10px] text-teal-300">{historicoEntradas} ACESSOS</span>
        </div>
      </div>

      <div className="bg-[#0c2438]/40 border border-teal-500/5 p-2 rounded-lg flex flex-col justify-between">
        <span className="text-[9px] text-teal-400/60 uppercase tracking-wider">Fluxo de Saída</span>
        <div className="flex items-center justify-between mt-1">
          <span className={`text-[10px] font-bold ${cancelaSaida ? 'text-emerald-400 animate-pulse' : 'text-amber-500'}`}>
            {cancelaSaida ? 'LIBERADO' : 'BLOQUEADO'}
          </span>
          <span className="text-[10px] text-teal-300">{historicoSaidas} SAÍDAS</span>
        </div>
      </div>

      <div className="bg-[#0c2438]/40 border border-teal-500/5 p-2 rounded-lg flex flex-col justify-between">
        <span className="text-[9px] text-teal-400/60 uppercase tracking-wider">Ocupação Atual</span>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-lg font-bold text-teal-400">{vagasOcupadas}</span>
          <span className="text-[10px] text-teal-500/60">/ {totalVagas} VEÍCULOS</span>
        </div>
      </div>

      <div className="bg-[#0c2438]/40 border border-teal-500/5 p-2 rounded-lg flex flex-col justify-between">
        <span className="text-[9px] text-teal-400/60 uppercase tracking-wider">Status das Vagas</span>
        <div className="w-full bg-teal-950/40 rounded-full h-1.5 mt-2 overflow-hidden border border-teal-500/10">
          <div 
            className="bg-gradient-to-r from-teal-500 to-emerald-400 h-1.5 transition-all duration-500" 
            style={{ width: `${porcentagemOcupacao}%` }}
          />
        </div>
      </div>

    </div>
  );
}
