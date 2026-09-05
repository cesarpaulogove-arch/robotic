"use client";

import { useState } from "react";
import {
  X,
  Send,
  Phone,
  Mail,
  MessageCircle,
  Loader2,
} from "lucide-react";

interface ContactFormProps {
  onClose: () => void;
}

export default function ContactForm({
  onClose,
}: ContactFormProps) {
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setErro("");
    setEnviando(true);

    const form = e.currentTarget;

    const formData = new FormData(form);

    const dados = {
      nome: formData.get("nome"),
      email: formData.get("email"),
      telefone: formData.get("telefone"),
      assunto: formData.get("assunto"),
      mensagem: formData.get("mensagem"),
    };

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(dados),
      });

      const resultado = await response.json();

      if (!response.ok || !resultado.success) {
        throw new Error(
          resultado.message ||
            "Não foi possível enviar a mensagem."
        );
      }

      setEnviado(true);

    } catch (error) {
      console.error(error);

      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar a mensagem."
      );

    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3">

      <div className="relative w-full max-w-lg bg-[#011a32] border border-cyan-500/40 rounded-2xl shadow-[0_0_40px_rgba(0,191,255,0.2)] overflow-hidden">

        {/* CABEÇALHO */}

        <div className="bg-[#001a31] border-b border-cyan-500/20 px-5 py-4">

          <div className="flex items-start justify-between">

            <div>

              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                Entre em contacto
              </h2>

              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Fale connosco e apresente a sua necessidade.
              </p>

            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar formulário"
              className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition"
            >
              <X className="w-6 h-6" />
            </button>

          </div>

        </div>

        {/* CONTEÚDO */}

        <div className="p-4 sm:p-5">

          {/* CONTACTOS */}

          <div className="grid grid-cols-2 gap-2.5 mb-4">

            {/* TELEFONE */}

            <a
              href="tel:+258847059112"
              className="flex items-center gap-2.5 bg-[#062f5d] border border-cyan-500/25 rounded-xl px-3 py-2.5 hover:border-cyan-400 transition"
            >

              <div className="w-9 h-9 shrink-0 rounded-lg bg-[#06427a] flex items-center justify-center">

                <Phone className="w-5 h-5 text-cyan-400" />

              </div>

              <div className="min-w-0">

                <p className="text-[9px] uppercase tracking-wider text-gray-400">
                  Telefone
                </p>

                <p className="text-xs sm:text-sm font-black text-white whitespace-nowrap">
                  +258 84 705 9112
                </p>

              </div>

            </a>

            {/* WHATSAPP */}

            <a
              href="https://wa.me/258847059112"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-[#062f5d] border border-cyan-500/25 rounded-xl px-3 py-2.5 hover:border-cyan-400 transition"
            >

              <div className="w-9 h-9 shrink-0 rounded-lg bg-[#06427a] flex items-center justify-center">

                <MessageCircle className="w-5 h-5 text-cyan-400" />

              </div>

              <div className="min-w-0">

                <p className="text-[9px] uppercase tracking-wider text-gray-400">
                  WhatsApp
                </p>

                <p className="text-xs sm:text-sm font-black text-white whitespace-nowrap">
                  +258 84 705 9112
                </p>

              </div>

            </a>

          </div>

          {/* FORMULÁRIO */}

          {!enviado ? (

            <form
              onSubmit={handleSubmit}
              className="space-y-3"
            >

              {/* NOME + EMAIL */}

              <div className="grid grid-cols-2 gap-3">

                <div>

                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    Nome{" "}
                    <span className="text-cyan-400">*</span>
                  </label>

                  <input
                    type="text"
                    name="nome"
                    required
                    autoComplete="name"
                    placeholder="Seu nome"
                    className="w-full h-11 bg-[#001124] border border-cyan-500/20 rounded-xl px-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-cyan-400 transition"
                  />

                </div>

                <div>

                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    Email{" "}
                    <span className="text-cyan-400">*</span>
                  </label>

                  <div className="relative">

                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />

                    <input
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      placeholder="seu@email.com"
                      className="w-full h-11 bg-[#001124] border border-cyan-500/20 rounded-xl pl-9 pr-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-cyan-400 transition"
                    />

                  </div>

                </div>

              </div>

              {/* TELEFONE + ASSUNTO */}

              <div className="grid grid-cols-2 gap-3">

                <div>

                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    Telefone{" "}
                    <span className="text-cyan-400">*</span>
                  </label>

                  <input
                    type="tel"
                    name="telefone"
                    required
                    autoComplete="tel"
                    placeholder="+258 84 000 0000"
                    className="w-full h-11 bg-[#001124] border border-cyan-500/20 rounded-xl px-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-cyan-400 transition"
                  />

                </div>

                <div>

                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    Assunto{" "}
                    <span className="text-cyan-400">*</span>
                  </label>

                  <select
                    name="assunto"
                    required
                    defaultValue=""
                    className="w-full h-11 bg-[#001124] border border-cyan-500/20 rounded-xl px-3 text-sm text-white outline-none focus:border-cyan-400 transition"
                  >

                    <option value="" disabled>
                      Selecione
                    </option>

                    <option value="Hardware & Automação">
                      Hardware & Automação
                    </option>

                    <option value="Software & IA">
                      Software & IA
                    </option>

                    <option value="Consultoria & Suporte">
                      Consultoria & Suporte
                    </option>

                    <option value="Desenvolvimento de Projeto">
                      Desenvolvimento de Projeto
                    </option>

                    <option value="Outro">
                      Outro
                    </option>

                  </select>

                </div>

              </div>

              {/* MENSAGEM */}

              <div>

                <label className="block text-xs font-bold text-gray-300 mb-1">
                  Mensagem{" "}
                  <span className="text-cyan-400">*</span>
                </label>

                <textarea
                  name="mensagem"
                  required
                  rows={3}
                  placeholder="Descreva o que precisa..."
                  className="w-full bg-[#001124] border border-cyan-500/20 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-cyan-400 transition resize-none"
                />

              </div>

              {/* ERRO */}

              {erro && (

                <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2">

                  <p className="text-xs text-red-300">
                    {erro}
                  </p>

                </div>

              )}

              {/* CAMPOS OBRIGATÓRIOS */}

              <p className="text-[10px] text-gray-500">
                <span className="text-cyan-400">*</span>{" "}
                Campos obrigatórios
              </p>

              {/* ENVIAR */}

              <button
                type="submit"
                disabled={enviando}
                className="w-full h-11 bg-gradient-to-r from-[#00bfff] to-[#4facfe] text-[#001124] font-black rounded-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition"
              >

                {enviando ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Enviar mensagem
                  </>
                )}

              </button>

            </form>

          ) : (

            /* SUCESSO */

            <div className="py-8 text-center">

              <div className="mx-auto w-14 h-14 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4">

                <Send className="w-6 h-6 text-cyan-400" />

              </div>

              <h3 className="text-xl font-black text-white">
                Mensagem enviada!
              </h3>

              <p className="text-sm text-gray-400 mt-2">
                Recebemos o seu contacto.
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Entraremos em contacto consigo brevemente.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="mt-5 px-6 py-2.5 rounded-xl bg-cyan-500 text-[#001124] font-black hover:bg-cyan-400 transition"
              >
                Fechar
              </button>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}