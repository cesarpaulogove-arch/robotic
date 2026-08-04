'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// =========================================================================
// DEFINIÇÃO DE INTERFACES E CONSTANTES
// =========================================================================
interface VagaEstacionamento {
  id: number;
  ocupada: boolean;
  carroId: string | null; // Identificador único para rastreamento
}

const TOTAL_VAGAS = 4;

export default function ComponenteParque(): React.JSX.Element {
  // Controle de estados para a PORTA DE ENTRADA (Esquerda)
  const [cancelaEntrada, setCancelaEntrada] = useState<boolean>(false);
  const [semaforoEntrada, setSemaforoEntrada] = useState<'VERDE' | 'VERMELHO'>('VERMELHO');

  // Controle de estados para a PORTA DE SAÍDA (Direita)
  const [cancelaSaida, setCancelaSaida] = useState<boolean>(false);
  const [semaforoSaida, setSemaforoSaida] = useState<'VERDE' | 'VERMELHO'>('VERMELHO');

  // Estado das vagas simplificado e reordenado internamente
  const [vagas, setVagas] = useState<VagaEstacionamento[]>([
    { id: 1, ocupada: false, carroId: null },
    { id: 2, ocupada: false, carroId: null },
    { id: 3, ocupada: false, carroId: null },
    { id: 4, ocupada: false, carroId: null },
  ]);

  // Carros em trânsito (Animação de Entrada ou Saída)
  const [carrosAtivos, setCarrosAtivos] = useState<{ id: string; posicao: string; tipo: 'entrando' | 'saindo' }[]>([]);

  // Estados derivados para monitoramento inteligente
  const vagasOcupadas = vagas.filter((v) => v.ocupada).length;
  const parqueLotado = vagasOcupadas === TOTAL_VAGAS;
  const parqueVazio = vagasOcupadas === 0;

  // =========================================================================
  // 1. MOTOR DE ENTRADA: Preenchimento da direita para a esquerda (V4 -> V1)
  // =========================================================================
  useEffect(() => {
    if (parqueLotado) return;

    const proximoCiclo = Math.floor(Math.random() * 3000) + 3000; // Ciclos entre 3 e 6 segundos
    
    const timer = setTimeout(() => {
      // Procura a primeira vaga disponível invertendo a busca (V4 para V1)
      const vagaAlvo = [...vagas].reverse().find((v) => !v.ocupada);
      if (!vagaAlvo) return;

      const novoCarroId = `carro-${Date.now()}`;

      // Abre a cancela e sinaliza verde imediatamente
      setCancelaEntrada(true);
      setSemaforoEntrada('VERDE');

      // Coloca o veículo na linha de partida
      setCarrosAtivos(prev => [...prev, { id: novoCarroId, posicao: 'entrada', tipo: 'entrando' }]);

      // Fecha a cancela de entrada após a passagem inicial
      setTimeout(() => {
        setCancelaEntrada(false);
        setSemaforoEntrada('VERMELHO');
      }, 1200);

      // Desloca o carro até a vaga reservada
      setTimeout(() => {
        setCarrosAtivos(prev =>
          prev.map(c => c.id === novoCarroId ? { ...c, posicao: `vaga${vagaAlvo.id}` } : c)
        );
      }, 300);

      // Consolida o veículo na vaga física e encerra o modo dinâmico
      setTimeout(() => {
        setVagas(prev => prev.map(v => v.id === vagaAlvo.id ? { ...v, ocupada: true, carroId: novoCarroId } : v));
        setCarrosAtivos(prev => prev.filter(c => c.id !== novoCarroId));
      }, 1500);

    }, proximoCiclo);

    return () => clearTimeout(timer);
  }, [vagas, parqueLotado]);

  // =========================================================================
  // 2. MOTOR DE SAÍDA: Abertura antecipada e fluxo para a direita
  // =========================================================================
  useEffect(() => {
    if (parqueVazio) return;

    const proximoCiclo = Math.floor(Math.random() * 4000) + 4000; // Ciclos entre 4 e 8 segundos

    const timer = setTimeout(() => {
      const vagasDisponiveisParaSair = vagas.filter(v => v.ocupada);
      if (vagasDisponiveisParaSair.length === 0) return;
      
      const vagaSorteada = vagasDisponiveisParaSair[Math.floor(Math.random() * vagasDisponiveisParaSair.length)];
      const carroIdSaindo = vagaSorteada.carroId || `carro-out-${Date.now()}`;

      // ABRE A CANCELA IMEDIATAMENTE antes mesmo do arranque do carro
      setCancelaSaida(true);
      setSemaforoSaida('VERDE');

      // Desvincula da vaga e coloca o carro em movimento
      setVagas(prev => prev.map(v => v.id === vagaSorteada.id ? { ...v, ocupada: false, carroId: null } : v));
      setCarrosAtivos(prev => [...prev, { id: carroIdSaindo, posicao: `vaga${vagaSorteada.id}`, tipo: 'saindo' }]);

      // Executa o trajeto em direção à saída aberta
      setTimeout(() => {
        setCarrosAtivos(prev =>
          prev.map(c => c.id === carroIdSaindo ? { ...c, posicao: 'saida' } : c)
        );
      }, 100);

      // Desativa o carro ao cruzar a linha periférica externa
      setTimeout(() => {
        setCarrosAtivos(prev => prev.filter(c => c.id !== carroIdSaindo));
      }, 1100);

      // Restaura a cancela para a posição fechada
      setTimeout(() => {
        setCancelaSaida(false);
        setSemaforoSaida('VERMELHO');
      }, 1600);

    }, proximoCiclo);

    return () => clearTimeout(timer);
  }, [vagas, parqueVazio]);

  // Mapeamento horizontal preciso para as transições CSS
  const obterEstiloPosicao = (posicao: string) => {
    switch (posicao) {
      case 'entrada': return { left: '4%', bottom: '16px' };
      case 'vaga1':   return { left: '23%', bottom: '16px' };
      case 'vaga2':   return { left: '41%', bottom: '16px' };
      case 'vaga3':   return { left: '59%', bottom: '16px' };
      case 'vaga4':   return { left: '77%', bottom: '16px' };
      case 'saida':   return { left: '92%', bottom: '16px' };
      default:        return { left: '-10%', bottom: '16px' };
    }
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden p-5 bg-[#030e17] text-white min-h-[520px]">
      
      {/* SUBBLOCO DE CIMA: Imagem Real do Parque de Estacionamento */}
      <div className="flex-1 border-b-2 border-teal-400/60 shadow-[0_5px_15px_-5px_rgba(45,212,191,0.15)] relative overflow-hidden h-full w-full min-h-[180px] bg-[#0c2438]/10 rounded-lg">
        <Image src="/parque.png" alt="Visualização do Parque Real" fill className="object-cover" priority />
      </div>

      {/* SUBBLOCO DE BAIXO: Sistema de Gestão Industrial */}
      <div className="flex-1 p-5 flex flex-col justify-between overflow-hidden bg-[#0c2438]/20 rounded-xl border border-teal-500/5 min-h-[220px] relative mt-4">
        
        {/* TELA DE MONITORAMENTO INTELIGENTE */}
        <div className="w-full bg-[#061826]/90 border border-teal-500/20 p-3 rounded-lg flex-shrink-0 font-mono text-[10px] flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-lg backdrop-blur-sm">
          
          {/* Status de Operação Unificado */}
          <div className="flex items-center gap-3">
            <span className={`h-2.5 w-2.5 rounded-full animate-pulse ${
              parqueLotado ? 'bg-red-500' : parqueVazio ? 'bg-emerald-400' : 'bg-amber-400'
            }`}></span>
            <div className="flex flex-col">
              <span className="text-teal-500/60 text-[8px] uppercase tracking-widest font-bold">STATUS DO SISTEMA</span>
              <span className={`font-bold uppercase tracking-wider text-[11px] ${
                parqueLotado ? 'text-red-400' : parqueVazio ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {parqueLotado ? '🛑 SISTEMA LOTADO' : parqueVazio ? '🟢 OPERAÇÃO LIVRE' : '🟡 FLUXO MODERADO'}
              </span>
            </div>
          </div>

          {/* Telemetria e Barra Dinâmica de Capacidade */}
          <div className="flex items-center gap-4 border-l border-r border-teal-500/10 px-4 flex-1 justify-around">
            <div className="flex flex-col items-center">
              <span className="text-teal-500/60 text-[8px] uppercase tracking-widest font-bold">OCUPAÇÃO</span>
              <span className="text-teal-200 font-bold text-[12px]">
                {((vagasOcupadas / TOTAL_VAGAS) * 100).toFixed(0)}%
              </span>
            </div>
            <div className="w-full max-w-[80px] bg-teal-950/60 rounded-full h-1.5 border border-teal-500/10 overflow-hidden hidden sm:block">
              <div 
                className={`h-full transition-all duration-500 ${
                  parqueLotado ? 'bg-red-500' : 'bg-teal-400'
                }`}
                style={{ width: `${(vagasOcupadas / TOTAL_VAGAS) * 100}%` }}
              ></div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-teal-500/60 text-[8px] uppercase tracking-widest font-bold">VAGAS REAIS</span>
              <span className="text-teal-300 font-bold text-[11px]">
                {vagasOcupadas} / {TOTAL_VAGAS}
              </span>
            </div>
          </div>

          {/* Feed Informativo do Último Processo Operacional */}
          <div className="flex flex-col justify-center min-w-[140px] text-right bg-teal-950/20 px-2 py-0.5 border border-teal-500/5 rounded">
            <span className="text-teal-500/50 text-[7px] uppercase tracking-widest font-bold block">ÚLTIMO EVENTO TRATADO</span>
            <span className="text-teal-300 font-bold tracking-wide text-[9px] uppercase truncate animate-pulse">
              {parqueLotado 
                ? '⚠️ ENTRADA BLOQUEADA' 
                : carrosAtivos.length > 0 
                  ? `🔄 VEÍCULO EM TRÂNSITO` 
                  : '📡 MONITORANDO FLUXO...'}
            </span>
          </div>
        </div>

        {/* CENÁRIO INDUSTRIAL UNIFICADO DO PARQUE COMPLETO */}
        <div className="flex-1 w-full bg-[#061826]/30 rounded-xl border border-teal-500/10 flex items-end justify-between p-4 relative min-h-[140px] overflow-hidden mt-4">
                 {/* PORTA DE ENTRADA UNIFICADA (LADO ESQUERDO) */}
          <div className="flex flex-col items-center pb-1 z-10 pl-2">
            <div className="w-6 bg-[#081b29] border border-teal-500/30 rounded-xl p-1 flex flex-col gap-1 shadow-xl relative items-center">
              <div className={`w-3 h-3 rounded-full border border-red-500/20 transition-all duration-300 ${semaforoEntrada === 'VERMELHO' ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : 'bg-red-950/20'}`} />
              <div className={`w-3 h-3 rounded-full border border-emerald-500/20 transition-all duration-300 ${semaforoEntrada === 'VERDE' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-emerald-950/20'}`} />
            </div>
            <div className="w-0.5 h-6 bg-gradient-to-b from-teal-500/50 to-teal-600/20 border-l border-teal-500/30" />
            <div className="flex flex-col items-center relative w-16">
              <div 
                className="w-16 h-1 bg-gradient-to-r from-amber-500 to-red-500 origin-left border border-amber-600 transition-transform duration-700 ease-in-out shadow-[0_0_5px_#f59e0b] z-20 absolute left-8 top-1.5"
                style={{ transform: cancelaEntrada ? 'rotate(-75deg)' : 'rotate(0deg)' }}
              />
              <div className="w-4 h-5 bg-[#081b29] border border-teal-500/30 rounded-sm z-10 relative" />
              <div className="w-0.5 h-6 bg-gradient-to-b from-teal-600/30 to-teal-950 border-l border-teal-500/20 z-0" />
            </div>
            <span className="text-[7px] font-mono text-teal-400/60 mt-1 uppercase tracking-wider">Entrada</span>
          </div>

          {/* ZONA CENTRAL: VAGAS DE ESTACIONAMENTO */}
          <div className="flex-1 h-24 border-b-2 border-t-2 border-dashed border-teal-500/20 mx-2 flex flex-col items-center justify-start select-none relative bg-[#061826]/40 rounded-lg pt-1">
            <span className="text-[8px] font-mono text-teal-400/40 tracking-[0.2em] uppercase mb-1">
              Área Interna Guardada
            </span>
            
            {/* Grid estrutural das 4 vagas */}
            <div className="grid grid-cols-4 w-full h-14 border-t border-b border-teal-500/10 px-2 divide-x divide-dashed divide-teal-500/20">
              {vagas.map((vaga) => (
                <div key={vaga.id} className="flex flex-col justify-between items-center py-1 relative font-mono">
                  <span className="text-[8px] text-teal-500/40 absolute top-0.5 left-1">V{vaga.id}</span>
                  <div className="flex-1 flex items-center justify-center">
                    {vaga.ocupada ? (
                      /* Renderiza o carrinho se a vaga estiver consolidada e ocupada */
                      <CarrinhoSimulado />
                    ) : (
                      <span className="text-[8px] text-teal-500/20 uppercase font-bold tracking-wider">Livre</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PORTA DE SAÍDA UNIFICADA (LADO DIREITO) */}
          <div className="flex flex-col items-center pb-1 z-10 pr-2">
            <div className="w-6 bg-[#081b29] border border-teal-500/30 rounded-xl p-1 flex flex-col gap-1 shadow-xl relative items-center">
              <div className={`w-3 h-3 rounded-full border border-red-500/20 transition-all duration-300 ${semaforoSaida === 'VERMELHO' ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : 'bg-red-950/20'}`} />
              <div className={`w-3 h-3 rounded-full border border-emerald-500/20 transition-all duration-300 ${semaforoSaida === 'VERDE' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-emerald-950/20'}`} />
            </div>
            <div className="w-0.5 h-6 bg-gradient-to-b from-teal-500/50 to-teal-600/20 border-l border-teal-500/30" />
            <div className="flex flex-col items-center relative w-16">
              <div 
                className="w-16 h-1 bg-gradient-to-l from-amber-500 to-red-500 origin-right border border-amber-600 transition-transform duration-700 ease-in-out shadow-[0_0_5px_#f59e0b] z-20 absolute right-8 top-1.5"
                style={{ transform: cancelaSaida ? 'rotate(75deg)' : 'rotate(0deg)' }}
              />
              <div className="w-4 h-5 bg-[#081b29] border border-teal-500/30 rounded-sm z-10 relative" />
              <div className="w-0.5 h-6 bg-gradient-to-b from-teal-600/30 to-teal-950 border-l border-teal-500/20 z-0" />
            </div>
            <span className="text-[7px] font-mono text-teal-400/60 mt-1 uppercase tracking-wider">Saída</span>
          </div>

          {/* CAMADA FLUTUANTE DE ANIMAÇÃO DE MOVIMENTO DOS CARRINHOS */}
          {carrosAtivos.map((carro) => (
            <div
              key={carro.id}
              className="absolute z-30 transition-all duration-1000 ease-in-out pointer-events-none"
              style={obterEstiloPosicao(carro.posicao)}
            >
              <CarrinhoSimulado />
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

// Sub-componente visual com tamanho aumentado para text-3xl
function CarrinhoSimulado() {
  return (
    <div className="text-3xl select-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transform scale-x-[-1]">
      🚗
    </div>
  );
}
