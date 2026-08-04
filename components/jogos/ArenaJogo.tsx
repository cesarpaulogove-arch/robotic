'use client';

import React from 'react';

interface PecaCorporativa {
  id: string;
  tipo: 'R' | 'N' | 'B' | 'Q' | 'K' | 'P';
  cor: 'B' | 'P';
  nome: string;
}

type TabuleiroCorporativo = (PecaCorporativa | null)[][];

interface ArenaXadrezProps {
  tabuleiro: TabuleiroCorporativo;
  atualAdversario: { nome: string };
  casaDe: [number, number] | null;
  casaPara: [number, number] | null;
}

export function ArenaXadrez({
  tabuleiro,
  atualAdversario,
  casaDe,
  casaPara,
}: ArenaXadrezProps): React.JSX.Element {
  return (
    <div className="relative bg-slate-950 p-1 rounded-lg border border-slate-800 aspect-square h-full max-h-[78vh] flex items-center justify-center overflow-hidden">
      {/* Camada de Marca d'Água Corporativa (Z-0) */}
      <div className="absolute inset-0 flex pointer-events-none select-none z-0 font-mono font-black text-[9vw] opacity-[0.04] uppercase">
        <div className="w-1/2 flex items-center justify-center text-teal-400 h-full border-r border-white/5 overflow-hidden">
          <span className="transform -rotate-90 whitespace-nowrap tracking-widest">{atualAdversario.nome}</span>
        </div>
        <div className="w-1/2 flex items-center justify-center text-yellow-500 h-full overflow-hidden">
          <span className="transform rotate-90 whitespace-nowrap tracking-widest">WSCODE</span>
        </div>
      </div>

      {/* Matriz 8x8 de Casas do Xadrez (Z-10) */}
      <div className="grid grid-cols-8 grid-rows-8 gap-0.5 w-full h-full relative z-10">
        {tabuleiro.map((linha, indexLinha) =>
          linha.map((peca, indexColuna) => {
            const ehCasaDe = casaDe && casaDe[0] === indexLinha && casaDe[1] === indexColuna;
            const ehCasaPara = casaPara && casaPara[0] === indexLinha && casaPara[1] === indexColuna;
            const ehPar = (indexLinha + indexColuna) % 2 === 0;

            return (
              <div 
                key={`${indexLinha}-${indexColuna}`} 
                className={`flex flex-col items-center justify-center relative rounded transition-all duration-200 aspect-square ${
                  ehCasaDe ? 'bg-amber-500/20 border border-amber-500/40' : 
                  ehCasaPara ? 'bg-teal-500/30 border border-teal-500/40 animate-pulse' : 
                  ehPar ? 'bg-slate-800/40' : 'bg-slate-900/40'
                }`}
              >
                {/* Coordenadas das Casas */}
                <span className="absolute top-0.5 left-0.5 text-[5px] text-slate-600 font-mono leading-none">
                  {String.fromCharCode(65 + indexColuna)}{8 - indexLinha}
                </span>
                
                {peca && (
                  <div className={`w-[82%] h-[82%] rounded-md flex items-center justify-center text-xl md:text-2xl font-sans font-black shadow transition-all duration-200 ${
                    peca.cor === 'P' 
                      ? 'bg-[#ccff00] text-black border border-[#bfff00] shadow-[0_0_8px_rgba(204,255,0,0.15)]' // WSCode Verde-Limão
                      : atualAdversario.nome === 'Vodacom'
                        ? 'bg-[#e60000] text-white border border-[#ff3333]' 
                        : atualAdversario.nome === 'BCI'
                          ? 'bg-[#ff6600] text-white border border-[#ff8533]' 
                          : atualAdversario.nome === 'Millennium bim'
                            ? 'bg-[#d11c5c] text-white border border-[#e6226c]' 
                            : atualAdversario.nome === 'Tmcel'
                              ? 'bg-[#f2cc00] text-[#00856a] border border-[#d6b500]' 
                              : 'bg-[#e85a12] text-white border border-[#ff7324]'
                  }`}>
                    {peca.tipo === 'K' && '♔'}
                    {peca.tipo === 'Q' && '♕'}
                    {peca.tipo === 'R' && '♖'}
                    {peca.tipo === 'B' && '♗'}
                    {peca.tipo === 'N' && '♘'}
                    {peca.tipo === 'P' && '♙'}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
