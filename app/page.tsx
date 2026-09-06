
"use client";

import { useState } from "react";
import {
  Cpu,
  Laptop,
  Lightbulb,
  Handshake,
  FolderGit2,
  ArrowRight,
  MessageSquareCode,
  Phone,
  MessageCircle,
  MapPin,
} from "lucide-react";


import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main className="min-h-[100dvh] bg-black px-3 py-3 sm:px-4 sm:py-4 font-sans overflow-x-hidden">

      {/* =====================================================
          ANIMAÇÃO DOS PONTOS CIRCULARES NAS BORDAS
      ===================================================== */}
      <style jsx>{`
        @keyframes borderDotTravel {
          0% {
            left: 2%;
            top: 2%;
          }

          25% {
            left: 98%;
            top: 2%;
          }

          50% {
            left: 98%;
            top: 98%;
          }

          75% {
            left: 2%;
            top: 98%;
          }

          100% {
            left: 2%;
            top: 2%;
          }
        }

        .border-travel-dot {
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 9999px;
          background: #22d3ee;

          box-shadow:
            0 0 5px #22d3ee,
            0 0 12px rgba(34, 211, 238, 0.95),
            0 0 22px rgba(34, 211, 238, 0.65);

          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 30;

          animation: borderDotTravel 5s linear infinite;
        }

        .border-travel-dot.second {
          animation-delay: -2.5s;
        }
      `}</style>

      {/* =====================================================
          MOLDURA EXTERNA
      ===================================================== */}
      <div className="mx-auto w-full max-w-md border-[5px] border-[#10243b] p-[6px]">

        {/* =====================================================
            MOLDURA INTERNA
        ===================================================== */}
        <div className="min-h-[calc(100dvh-38px)] border-[3px] border-gray-200 bg-[#001124] px-3 py-3 flex flex-col">

          {/* =================================================
              LOGOTIPO
          ================================================= */}
          <section className="w-full flex flex-col items-center text-center pt-0 pb-3 shrink-0">

            {/* WS + AI + CODE */}
            <div className="relative flex items-center justify-center">

              {/* WS */}
              <span className="text-[60px] sm:text-[68px] font-black tracking-[-0.08em] leading-none bg-gradient-to-r from-[#00bfff] via-[#00f2fe] to-[#4facfe] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(0,191,255,0.25)]">
                WS
              </span>

              {/* AI + CODE */}
              <div className="flex flex-col items-start ml-1">

                {/* AI */}
                <div className="self-start ml-1 bg-[#012246] border border-cyan-400 rounded-full px-1.5 py-[1px] shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                  <span className="text-[7px] font-black tracking-widest text-cyan-300 leading-none">
                    AI
                  </span>
                </div>

                {/* CODE */}
                <span className="text-[27px] sm:text-[31px] font-black tracking-[0.13em] text-white leading-none">
                  CODE
                </span>

              </div>
            </div>

            {/* SLOGAN */}
            <p className="text-[10px] sm:text-[11px] font-black text-cyan-400 uppercase tracking-wider leading-tight">
              Soluções Integradas:
            </p>

            <p className="text-xs sm:text-sm text-gray-200 mt-1 leading-tight">
              Do Circuito à Inteligência Artificial
            </p>

          </section>


          {/* =================================================
              SERVIÇOS
          ================================================= */}
          <section className="w-full max-w-sm mx-auto flex flex-col gap-2.5 my-auto">

            {/* =================================================
                HARDWARE
            ================================================= */}
            <div className="relative overflow-hidden bg-gradient-to-b from-[#032247] to-[#011630] border border-[#1361ab] rounded-xl p-3 flex gap-3 shadow-md">

              <span
                className="border-travel-dot"
                aria-hidden="true"
              />

              <span
                className="border-travel-dot second"
                aria-hidden="true"
              />

              {/* ÍCONE */}
              <div className="bg-[#042e5c] h-11 w-11 rounded-lg border border-cyan-500/30 text-cyan-400 shrink-0 flex items-center justify-center">
                <Cpu className="w-6 h-6" />
              </div>

              {/* CONTEÚDO */}
              <div className="flex-1 min-w-0">

                <h2 className="text-sm sm:text-base font-black tracking-wide text-white uppercase mb-1 leading-tight">
                  Hardware & Automação
                </h2>

                <ul className="text-[11px] sm:text-xs font-medium text-gray-300 space-y-0.5 leading-relaxed list-disc list-inside">
                  <li>Desenho e Montagem de Circuitos</li>
                  <li>Protótipos e Sistemas de Automação</li>
                </ul>

              </div>
            </div>


            {/* =================================================
                SOFTWARE
            ================================================= */}
            <div className="relative overflow-hidden bg-gradient-to-b from-[#032247] to-[#011630] border border-[#1361ab] rounded-xl p-3 flex gap-3 shadow-md">

              <span
                className="border-travel-dot"
                aria-hidden="true"
              />

              <span
                className="border-travel-dot second"
                aria-hidden="true"
              />

              {/* ÍCONE */}
              <div className="bg-[#042e5c] h-11 w-11 rounded-lg border border-cyan-500/30 text-cyan-400 shrink-0 flex items-center justify-center">
                <Laptop className="w-6 h-6" />
              </div>

              {/* CONTEÚDO */}
              <div className="flex-1 min-w-0">

                <h2 className="text-sm sm:text-base font-black tracking-wide text-white uppercase mb-1 leading-tight">
                  Software & IA
                </h2>

                <ul className="text-[11px] sm:text-xs font-medium text-gray-300 space-y-0.5 leading-relaxed list-disc list-inside">
                  <li>Programação e Websites</li>
                  <li>Integração de IA em Protótipos</li>
                </ul>

              </div>
            </div>


            {/* =================================================
                CONSULTORIA
            ================================================= */}
            <div className="relative overflow-hidden bg-gradient-to-b from-[#032247] to-[#011630] border border-[#1361ab] rounded-xl p-3 flex gap-3 shadow-md">

              <span
                className="border-travel-dot"
                aria-hidden="true"
              />

              <span
                className="border-travel-dot second"
                aria-hidden="true"
              />

              {/* ÍCONE */}
              <div className="bg-[#042e5c] h-11 w-11 rounded-lg border border-cyan-500/30 shrink-0 flex flex-col items-center justify-center">

                <Lightbulb className="w-4 h-4 text-yellow-400" />

                <Handshake className="w-4 h-4 text-cyan-400" />

              </div>

              {/* CONTEÚDO */}
              <div className="flex-1 min-w-0">

                <h2 className="text-sm sm:text-base font-black tracking-wide text-white uppercase mb-1 leading-tight">
                  Consultoria & Suporte
                </h2>

                <ul className="text-[11px] sm:text-xs font-medium text-gray-300 space-y-0.5 leading-relaxed list-disc list-inside">
                  <li>Consultoria Técnica</li>
                  <li>Assistência Especializada</li>
                </ul>

              </div>
            </div>

          </section>


          {/* =================================================
              RODAPÉ
          ================================================= */}
          <footer className="w-full max-w-sm mx-auto mt-3 pb-0 flex flex-col gap-2.5 shrink-0">

            {/* LINHA SEPARADORA */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />


            {/* =================================================
                VER PROJETOS
            ================================================= */}
            <Link
              href="/menu_principal"
              className="w-full bg-gradient-to-r from-[#00bfff] to-[#4facfe] text-[#001124] font-black py-3 px-4 flex items-center justify-between rounded-xl shadow-[0_4px_15px_rgba(6,182,212,0.25)] active:scale-[0.97] transition"
            >

              <div className="flex items-center gap-2.5 min-w-0">

                <FolderGit2 className="w-5 h-5 shrink-0 stroke-[2.5]" />

                <span className="text-sm sm:text-base tracking-wide">
                  Ver nossos projetos
                </span>

              </div>

              <ArrowRight className="w-5 h-5 shrink-0 stroke-[2.5]" />

            </Link>
                   <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="w-full bg-[#001833] hover:bg-[#00224a] text-cyan-400 border border-cyan-500/40 font-bold py-3 px-4 flex items-center justify-center gap-2.5 rounded-xl active:scale-[0.97] transition-all"
            >

              <MessageSquareCode className="w-5 h-5 shrink-0 text-cyan-400" />

              <span className="text-sm sm:text-base tracking-wide">
                Entrar em contacto
              </span>

            </button>


            {/* =================================================
                SOBRE NÓS
            ================================================= */}
            <section className="relative overflow-hidden bg-gradient-to-b from-[#032247] to-[#011630] border border-[#1361ab] rounded-xl p-4 shadow-md">

              {/* PONTOS CIRCULARES */}
              <span
                className="border-travel-dot"
                aria-hidden="true"
              />

              <span
                className="border-travel-dot second"
                aria-hidden="true"
              />


              <div className="relative z-10">

                {/* =================================================
                    PERFIL
                ================================================= */}
                <div className="flex flex-col items-start mb-4">

                  {/* FOTO */}
                  <div className="relative">

                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.35)] bg-[#011a32]">

                      <img
                        src="/cesar.jpeg"
                        alt="Cesar Paulo Gove"
                        className="w-full h-full object-cover"
                      />

                    </div>

                    {/* PONTO DE STATUS */}
                    <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-cyan-400 border-2 border-[#032247] shadow-[0_0_8px_rgba(34,211,238,0.8)]" />

                  </div>


                  {/* NOME */}
                  <h2 className="mt-2 text-base sm:text-lg font-black text-white tracking-wide">
                    César Paulo Gove
                  </h2>

                  {/* FUNÇÃO */}
                  <p className="text-[10px] sm:text-xs font-bold text-cyan-400 uppercase tracking-wider mt-0.5">
                    Tecnologia • Eletrónica • Programação
                  </p>

                </div>


                {/* TÍTULO */}
                <h3 className="text-sm sm:text-base font-black tracking-wide text-cyan-400 uppercase mb-2 leading-tight">
                  Sobre Nós
                </h3>


                {/* =================================================
                    DESCRIÇÃO
                ================================================= */}
                <p className="text-[11px] sm:text-xs font-medium text-gray-300 leading-relaxed">

                  Somos uma iniciativa tecnológica independente, formada
                  por profissionais freelancers apaixonados por eletrónica,
                  programação, automação e desenvolvimento de soluções
                  inteligentes.

                  <br />
                  <br />

                  Atuamos desde o desenho e montagem de circuitos
                  eletrónicos, soldagem e montagem de protótipos físicos,
                  até ao desenvolvimento de firmware para microcontroladores
                  e sistemas embarcados.

                  <br />
                  <br />

                  Trabalhamos com plataformas como Arduino, ESP8266, ESP32
                  e outras famílias de ESP, além de circuitos integrados e
                  diferentes componentes eletrónicos, desenvolvendo soluções
                  personalizadas de acordo com cada projeto.

                  <br />
                  <br />

                  Também desenvolvemos aplicações web integradas a
                  microcontroladores, permitindo criar sistemas capazes de
                  comunicar, monitorizar e controlar dispositivos
                  remotamente.

                  <br />
                  <br />

                  Atualmente, temos trabalhado principalmente com estudantes,
                  apoiando projetos académicos, protótipos, trabalhos de
                  conclusão e experiências práticas na área de eletrónica,
                  programação e tecnologia.

                  <br />
                  <br />

                  A nossa proposta é aproximar a teoria da prática, ajudando
                  a transformar uma ideia, um circuito ou um código em um
                  protótipo funcional e uma solução real.

                </p>


                {/* =================================================
                    LOCALIZAÇÃO
                ================================================= */}
                ```tsx
                {/* =================================================
    LOCALIZAÇÃO
================================================= */}
                <div className="mt-4 rounded-xl border border-cyan-500/20 bg-[#011a32] px-3 py-2.5">

                  <div className="flex items-center gap-2">

                    {/* ÍCONE DE LOCALIZAÇÃO */}
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-[#042e5c] border border-cyan-500/30 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                    </div>

                    {/* INFORMAÇÃO */}
                    <div className="min-w-0 text-left">

                      <span className="block text-[9px] sm:text-[10px] font-black text-cyan-400 uppercase tracking-wider leading-tight">
                        Localização
                      </span>

                      <span className="block text-[10px] sm:text-xs font-medium text-gray-300 leading-tight mt-0.5">
                        Matola, Malhampsene — Q2, Rua de Quartel
                      </span>

                    </div>

                  </div>

                </div>


              </div>

            </section>


            {/* =================================================
                CONTACTO
            ================================================= */}
     


            {/* =================================================
                CONTACTOS
            ================================================= */}
            <div className="grid grid-cols-2 gap-2">

              {/* TELEFONE */}
              <a
                href="tel:+258847059112"
                className="min-w-0 flex items-center justify-center gap-1.5 bg-[#011a32] border border-cyan-500/20 rounded-xl py-2.5 px-2 text-[10px] sm:text-xs font-bold text-gray-300 hover:text-cyan-400 transition"
              >

                <Phone className="w-4 h-4 shrink-0 text-cyan-400" />

                <span className="truncate">
                  +258 84 705 9112
                </span>

              </a>


              {/* WHATSAPP */}
              <a
                href="https://wa.me/258847059112"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 bg-[#011a32] border border-cyan-500/20 rounded-xl py-2.5 px-2 text-[10px] sm:text-xs font-bold text-gray-300 hover:text-cyan-400 transition"
              >

                <MessageCircle className="w-4 h-4 shrink-0 text-cyan-400" />

                <span>
                  WhatsApp
                </span>

              </a>

            </div>

          </footer>

        </div>
      </div>


      {/* =====================================================
          MODAL DE CONTACTO
      ===================================================== */}
      {contactOpen && (
        <ContactForm
          onClose={() => setContactOpen(false)}
        />
      )}

    </main>
  );
}

