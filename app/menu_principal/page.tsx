'use client';

import React from 'react';


import ComponenteRobo from '@/components/ComponenteRobo';
import ComponenteSemaforo from '@/components/ComponenteSemaforo';
import ComponenteParque from '@/components/ComponenteParque';
import ComponenteCircuitos from '@/components/ComponenteCircuitos';
import { ComponenteIrrigacao } from '@/components/ComponenteIrrigacao';
import { ComponenteElectricidade } from '@/components/ComponenteElectricidade';
import { ComponenteJogos } from '@/components/ComponenteJogos';
import CodeDashboard from '@/components/CodeDashboard';

export default function Page(): React.JSX.Element {
  return (
    <main
      className="
        min-h-screen
        w-full
        bg-[#081b29]
        text-white
        font-sans
        antialiased
        overflow-x-hidden
      "
    >

      {/* ===================================================== */}
      {/* PAINEL PRINCIPAL */}
      {/* ===================================================== */}

      <div
        className="
          w-full
          min-h-screen
          lg:max-w-7xl
          lg:mx-auto
          lg:my-6
          lg:rounded-2xl
          lg:border-2
          lg:border-teal-400/60
          bg-[#0c2438]/50
          backdrop-blur-md
          shadow-2xl
          shadow-teal-950/80
          overflow-hidden
        "
      >

        {/* ================================================= */}
        {/* DASHBOARD / NAVEGAÇÃO                             */}
        {/* ================================================= */}

        <section
          className="
            w-full
            border-b-2
            border-teal-400/40
            overflow-hidden
          "
        >
          <CodeDashboard />
        </section>


        {/* ================================================= */}
        {/* TODOS OS PROJECTOS                                */}
        {/* ================================================= */}

        <section
          className="
            w-full
            p-3
            sm:p-5
            lg:p-6
          "
        >

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-4
              lg:gap-6
            "
          >

            {/* ROBÔ */}
            <article
              className="
                w-full
                overflow-hidden
                rounded-2xl
                border
                border-teal-400/30
                bg-[#081b29]/70
              "
            >
              <ComponenteRobo />
            </article>


            {/* SEMÁFORO */}
            <article
              className="
                w-full
                overflow-hidden
                rounded-2xl
                border
                border-teal-400/30
                bg-[#081b29]/70
              "
            >
              <ComponenteSemaforo />
            </article>


            {/* PARQUE */}
            <article
              className="
                w-full
                overflow-hidden
                rounded-2xl
                border
                border-teal-400/30
                bg-[#081b29]/70
              "
            >
              <ComponenteParque />
            </article>


            {/* CIRCUITOS */}
            <article
              className="
                w-full
                overflow-hidden
                rounded-2xl
                border
                border-teal-400/30
                bg-[#081b29]/70
              "
            >
              <ComponenteCircuitos />
            </article>


            {/* IRRIGAÇÃO */}
            <article
              className="
                w-full
                overflow-hidden
                rounded-2xl
                border
                border-teal-400/30
                bg-[#081b29]/70
              "
            >
              <ComponenteIrrigacao />
            </article>


            {/* JOGOS */}
            <article
              className="
                w-full
                overflow-hidden
                rounded-2xl
                border
                border-teal-400/30
                bg-[#081b29]/70
              "
            >
              <ComponenteJogos />
            </article>


            {/* ELECTRICIDADE */}
            <article
              className="
                w-full
                overflow-hidden
                rounded-2xl
                border
                border-teal-400/30
                bg-[#081b29]/70
                md:col-span-2
              "
            >
              <ComponenteElectricidade />
            </article>

          </div>

        </section>

      </div>
    </main>
  );
}