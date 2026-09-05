
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
} from "lucide-react";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#001124] text-white flex flex-col justify-between p-4 font-sans select-none overflow-x-hidden">

      {/* LOGOTIPO */}
      <section className="w-full flex flex-col items-center text-center pt-4 pb-2">
        <div className="relative flex items-center justify-center text-7xl font-black tracking-tighter bg-gradient-to-r from-[#00bfff] via-[#00f2fe] to-[#4facfe] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,191,255,0.3)]">
          WS

          <div className="absolute -right-7 top-1/2 -translate-y-1/2 flex flex-col items-center bg-[#012246] border border-cyan-400 rounded-md px-1 py-0.5 shadow-[0_0_8px_rgba(34,211,238,0.4)]">
            <span className="text-[9px] font-black tracking-widest text-cyan-400 leading-none">
              AI
            </span>
          </div>
        </div>

        <h1 className="text-3xl font-black tracking-widest text-white mt-0.5">
          WSCODE
        </h1>

        <p className="text-xs font-bold text-cyan-400 max-w-[280px] mt-2 uppercase tracking-wider leading-relaxed">
          Soluções Integradas:
          <br />
          <span className="text-gray-300 font-medium normal-case text-sm block mt-0.5">
            Do Circuito à Inteligência Artificial
          </span>
        </p>
      </section>

      {/* SERVIÇOS */}
      <section className="w-full flex flex-col gap-3.5 my-auto max-w-sm mx-auto">

        {/* HARDWARE */}
        <div className="relative overflow-hidden bg-gradient-to-b from-[#032247] to-[#011630] border-2 border-[#1361ab] rounded-xl p-4 flex gap-3.5 shadow-md">
          <div className="bg-[#042e5c] p-2.5 h-11 w-11 rounded-lg border border-cyan-500/30 text-cyan-400 shrink-0 flex items-center justify-center">
            <Cpu className="w-6 h-6" />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-base font-black tracking-wide text-white uppercase mb-1 truncate">
              Hardware & Automação
            </h2>

            <ul className="text-xs font-medium text-gray-300 space-y-1 list-disc list-inside">
              <li>Desenho e Montagem de Circuitos</li>
              <li>Protótipos e Sistemas de Automação</li>
            </ul>
          </div>
        </div>

        {/* SOFTWARE */}
        <div className="relative overflow-hidden bg-gradient-to-b from-[#032247] to-[#011630] border-2 border-[#1361ab] rounded-xl p-4 flex gap-3.5 shadow-md">
          <div className="bg-[#042e5c] p-2.5 h-11 w-11 rounded-lg border border-cyan-500/30 text-cyan-400 shrink-0 flex items-center justify-center">
            <Laptop className="w-6 h-6" />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-base font-black tracking-wide text-white uppercase mb-1 truncate">
              Software & IA
            </h2>

            <ul className="text-xs font-medium text-gray-300 space-y-1 list-disc list-inside">
              <li>Programação e Websites</li>
              <li>Integração de IA em Protótipos</li>
            </ul>
          </div>
        </div>

        {/* CONSULTORIA */}
        <div className="relative overflow-hidden bg-gradient-to-b from-[#032247] to-[#011630] border-2 border-[#1361ab] rounded-xl p-4 flex gap-3.5 shadow-md">
          <div className="bg-[#042e5c] p-2.5 h-11 w-11 rounded-lg border border-cyan-500/30 text-cyan-400 shrink-0 flex flex-col items-center justify-center gap-0.5">
            <Lightbulb className="w-4 h-4 text-yellow-400" />
            <Handshake className="w-4 h-4 text-cyan-400" />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-base font-black tracking-wide text-white uppercase mb-1 truncate">
              Consultoria & Suporte
            </h2>

            <ul className="text-xs font-medium text-gray-300 space-y-1 list-disc list-inside">
              <li>Consultoria Técnica</li>
              <li>Assistência Especializada</li>
            </ul>
          </div>
        </div>

      </section>

      {/* RODAPÉ */}
      <footer className="w-full max-w-sm mx-auto mt-4 pb-2 flex flex-col gap-3">

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mb-1" />

        {/* PROJETOS */}
        <Link
          href="/menu_principal"
          className="w-full bg-gradient-to-r from-[#00bfff] to-[#4facfe] text-[#001124] font-black py-3.5 px-5 flex items-center justify-between rounded-xl shadow-[0_4px_15px_rgba(6,182,212,0.25)] active:scale-[0.97] transition"
        >
          <div className="flex items-center gap-3">
            <FolderGit2 className="w-5 h-5 stroke-[2.5]" />

            <span className="text-base tracking-wide">
              Ver nossos projetos
            </span>
          </div>

          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </Link>

        {/* CONTACTO */}
        <button
          type="button"
          onClick={() => setContactOpen(true)}
          className="w-full bg-[#001833]/60 hover:bg-[#00224a] text-cyan-400 border-2 border-cyan-500/40 font-bold py-3.5 px-5 flex items-center justify-center gap-3 rounded-xl active:scale-[0.97] transition-all"
        >
          <MessageSquareCode className="w-5 h-5 text-cyan-400" />

          <span className="text-base tracking-wide">
            Entrar em contacto
          </span>
        </button>

        {/* CONTACTOS VISÍVEIS */}
        <div className="grid grid-cols-2 gap-2 pt-1">

          <a
            href="tel:+258847059112"
            className="flex items-center justify-center gap-2 bg-[#011a32] border border-cyan-500/20 rounded-xl py-3 text-xs font-bold text-gray-300 hover:text-cyan-400 transition"
          >
            <Phone className="w-4 h-4 text-cyan-400" />
            <span>+258 84 705 9112</span>
          </a>

          <a
            href="https://wa.me/258847059112"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#011a32] border border-cyan-500/20 rounded-xl py-3 text-xs font-bold text-gray-300 hover:text-cyan-400 transition"
          >
            <MessageCircle className="w-4 h-4 text-cyan-400" />
            <span>WhatsApp</span>
          </a>

        </div>

      </footer>

      {/* MODAL DE CONTACTO */}
      {contactOpen && (
        <ContactForm
          onClose={() => setContactOpen(false)}
        />
      )}

    </main>
  );
}

