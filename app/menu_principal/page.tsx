
'use client';
import React, { useState } from 'react';
import CodeDashboard from '@/components/CodeDashboard';
import ComponenteRobo from '@/components/ComponenteRobo';
import ComponenteSemaforo from '@/components/ComponenteSemaforo';
import ComponenteParque from '@/components/ComponenteParque';
import ComponenteCircuitos from '@/components/ComponenteCircuitos';
import { ComponenteIrrigacao } from '@/components/ComponenteIrrigacao';
import { ComponenteElectricidade } from '@/components/ComponenteElectricidade';
import { ComponenteJogos } from '@/components/ComponenteJogos';

export type TelaAtiva =
  | 'robo'
  | 'semaforo'
  | 'parque'
  | 'circuitos'
  | 'irrigacao'
  | 'jogos'
  | 'electricidade';

export default function Page(): React.JSX.Element {
  const [moduloAtivo, setModuloAtivo] =
    useState<TelaAtiva>('semaforo');

  return (
    <main className="min-h-screen w-full bg-[#081b29] text-white font-sans antialiased overflow-x-hidden">

      {/* SISTEMA PRINCIPAL */}
      <div
        className="
          w-full
          min-h-screen
          lg:min-h-0
          lg:h-[85vh]
          lg:max-h-[600px]
          lg:max-w-6xl
          lg:mx-auto
          lg:my-auto
          lg:rounded-xl
          lg:border-2
          lg:border-teal-400/60
          bg-[#0c2438]/50
          backdrop-blur-md
          shadow-2xl
          shadow-teal-950/80
          overflow-hidden

          flex
          flex-col
          lg:grid
          lg:grid-cols-2
        "
      >

        {/* ===================================================== */}
        {/* PAINEL DE NAVEGAÇÃO / CÓDIGO                         */}
        {/* ===================================================== */}

        <section
          className="
            w-full
            shrink-0
            lg:h-full
            lg:border-r-2
            lg:border-teal-400/60
            overflow-hidden
          "
        >
          <CodeDashboard
            setModuloAtivo={setModuloAtivo}
            moduloAtivo={moduloAtivo}
          />
        </section>


        {/* ===================================================== */}
        {/* ÁREA DO MÓDULO                                         */}
        {/* ===================================================== */}

        <section
          className="
            relative
            w-full
            flex-1
            min-h-[calc(100vh-180px)]
            lg:min-h-0
            overflow-hidden
            flex
            flex-col
          "
        >

          {moduloAtivo === 'robo' && (
            <ComponenteRobo />
          )}

          {moduloAtivo === 'semaforo' && (
            <ComponenteSemaforo />
          )}

          {moduloAtivo === 'parque' && (
            <ComponenteParque />
          )}

          {moduloAtivo === 'circuitos' && (
            <ComponenteCircuitos />
          )}

          {moduloAtivo === 'irrigacao' && (
            <ComponenteIrrigacao />
          )}

          {moduloAtivo === 'electricidade' && (
            <ComponenteElectricidade />
          )}

          {moduloAtivo === 'jogos' && (
            <ComponenteJogos />
          )}

        </section>

      </div>
    </main>
  );
}

