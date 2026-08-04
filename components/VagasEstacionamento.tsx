'use client';

import React from 'react';

interface Vaga {
  id: number;
  ocupada: boolean;
}

interface VagasEstacionamentoProps {
  vagas: Vaga[];
}

export default function VagasEstacionamento({ vagas }: VagasEstacionamentoProps): React.JSX.Element {
  return (
    <div className="flex-1 h-20 border-b-2 border-t-2 border-dashed border-teal-500/20 mx-2 flex flex-col items-center justify-center select-none relative bg-[#061826]/40 rounded-lg">
      <span className="text-[8px] font-mono text-teal-400/40 tracking-[0.2em] uppercase mb-2">
        Área Interna Guardada
      </span>
      
      <div className="flex gap-4 items-center justify-center w-full px-2">
        {vagas.map((vaga) => (
          <div 
            key={vaga.id} 
            className="w-10 h-10 border-l border-r border-dashed border-teal-500/30 flex items-center justify-center relative bg-[#0c2438]/30 rounded-sm"
          >
            <span className="absolute top-0.5 left-0.5 text-[6px] font-mono text-teal-500/40">
              V{vaga.id}
            </span>
            {vaga.ocupada ? (
              <span className="text-xl transition-all duration-300 transform scale-110">🚗</span>
            ) : (
              <span className="text-[7px] font-mono text-teal-500/20 uppercase">Livre</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
