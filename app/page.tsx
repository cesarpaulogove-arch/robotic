'use client';

import React, { useState } from 'react';
import CodeDashboard from '@/components/CodeDashboard';
import ComponenteRobo from '@/components/ComponenteRobo';
import ComponenteSemaforo from '@/components/ComponenteSemaforo';
import ComponenteParque from '@/components/ComponenteParque';
import ComponenteCircuitos from '@/components/ComponenteCircuitos';
import { ComponenteIrrigacao } from '@/components/ComponenteIrrigacao';
import { ComponenteElectricidade } from '@/components/ComponenteElectricidade';
import { ComponenteJogos } from '@/components/ComponenteJogos'; // 💡 Nova Importação

// Tipo expandido para aceitar todos os módulos integrados no sistema
export type TelaAtiva = 'robo' | 'semaforo' | 'parque' | 'circuitos' | 'irrigacao' | 'jogos' | 'electricidade';

export default function Page(): React.JSX.Element {
  const [moduloAtivo, setModuloAtivo] = useState<TelaAtiva>('semaforo');

  return (
    <div className="h-screen w-full bg-[#081b29] text-white font-sans antialiased p-4 md:p-6 flex items-center justify-center overflow-hidden">
      
      {/* MOLDURA PRINCIPAL DO SISTEMA: min-h e max-w travados para dar estabilidade */}
      <div className="w-full max-w-6xl min-h-[550px] max-h-[600px] h-[85vh] border-2 border-teal-400/60 bg-[#0c2438]/50 backdrop-blur-md grid grid-cols-1 lg:grid-cols-2 rounded-xl shadow-2xl shadow-teal-950/80 overflow-hidden">
        
        {/* COLUNA ESQUERDA: Fixa (Painel de Código) */}
        <div className="lg:border-r-2 border-teal-400/60 shadow-[5px_0_15px_-5px_rgba(45,212,191,0.15)] overflow-hidden h-full">
          <CodeDashboard setModuloAtivo={setModuloAtivo} moduloAtivo={moduloAtivo} />
        </div>

        {/* ========================================================================= */}
        {/* COLUNA DIREITA UNIFICADA: Trancada em tamanho fixo para TODOS os módulos   */}
        {/* ========================================================================= */}
        <div className="flex flex-col w-full h-full overflow-hidden max-h-full items-stretch justify-stretch">
          
          {moduloAtivo === 'robo' && <ComponenteRobo />}
          {moduloAtivo === 'semaforo' && <ComponenteSemaforo />}
          {moduloAtivo === 'parque' && <ComponenteParque />}
          {moduloAtivo === 'circuitos' && <ComponenteCircuitos />}
          {moduloAtivo === 'irrigacao' && <ComponenteIrrigacao />}
          {moduloAtivo === 'electricidade' && <ComponenteElectricidade />}
          {moduloAtivo === 'jogos' && <ComponenteJogos />} {/* 💡 Módulo Retro Gaming Ativado */}
          
        </div>

      </div>
    </div>
  );
}
