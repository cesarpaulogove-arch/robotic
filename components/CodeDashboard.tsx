'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// =========================================================================
// DEFINIÇÃO EXPANDIDA DO TIPO TELAATIVA (TypeScript)
// =========================================================================
export type TelaAtiva = 'robo' | 'semaforo' | 'parque' | 'circuitos' | 'irrigacao' | 'jogos' | 'electricidade';

interface CodeDashboardProps {
  setModuloAtivo: (tela: TelaAtiva) => void;
  moduloAtivo: TelaAtiva;
}

export default function CodeDashboard({ setModuloAtivo, moduloAtivo }: CodeDashboardProps): React.JSX.Element {
  const techList = ["NEXT.JS", "PYTHON", "JS", "C++", "UNITY HUB"];

  // Códigos curtos e lógicos estruturados de forma compacta para não estourarem a tela para baixo
  const codeTemplates = [
    { 
      tech: "NEXT.JS", 
      lines: [
        'import { useState, useEffect } from "react";',
        'export default function NextApp() {',
        '  const [status, setStatus] = useState("ONLINE");',
        '  if (performance.now() > 500) setStatus("STABLE");',
        '  return <WSCode status={status} />;',
        '}'
      ] 
    },
    { 
      tech: "PYTHON", 
      lines: [
        'import time, random',
        'def wscode_intelligence(node_id):',
        '    while True:',
        '        weight = random.uniform(0.1, 1.0)',
        '        if weight >= 0.75:',
        '            print(f"🔥 Threat: Score {weight:.2f}")',
        '        time.sleep(0.1)'
      ] 
    },
    { 
      tech: "JS", 
      lines: [
        'const runDiagnostics = async (size) => {',
        '  for (let i = 0; i < size; i++) {',
        '    const node = await pingNode(i);',
        '    if (node.code === 200) console.log("✔ OK");',
        '    else console.error("❌ Fail");',
        '  }',
        '};'
      ] 
    },
    { 
      tech: "C++", 
      lines: [
        '#include <iostream>',
        '#include <vector>',
        'int main() {',
        '    std::vector<int> mem(1024, 0);',
        '    for (int i = 0; i < 128; ++i) {',
        '        if (mem[i] == 0) std::cout << "OK";',
        '    }',
        '    return 0;',
        '}'
      ] 
    },
    { 
      tech: "UNITY HUB", 
      lines: [
        'using UnityEngine;',
        'public class WSCodeEngine : MonoBehaviour {',
        '    void Start() {',
        '        Debug.Log("[UNITY] Ready.");',
        '        while(isProcessing) { ExecuteNext(); }',
        '    }',
        '}'
      ] 
    }
  ];

  const [currentTechIndex, setCurrentTechIndex] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);

  useEffect(() => {
    const currentTechBlock = codeTemplates[currentTechIndex];
    const currentLineTarget = currentTechBlock.lines[currentLineIndex];

    // Digitação ultrarrápida: delay de 10ms por caractere
    if (currentText.length < currentLineTarget.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + currentLineTarget[prev.length]);
      }, 10);
      return () => clearTimeout(timeout);
    } 
    // Transição de linha veloz: delay de 80ms entre linhas
    else if (currentLineIndex < currentTechBlock.lines.length - 1) {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => [...prev, currentText]);
        setCurrentLineIndex(prev => prev + 1);
        setCurrentText("");
      }, 80);
      return () => clearTimeout(timeout);
    } 
    else {
      const timeout = setTimeout(() => {
        setDisplayedLines([]);
        setCurrentLineIndex(0);
        setCurrentText("");
        setCurrentTechIndex(prev => (prev + 1) % codeTemplates.length);
      }, 2500);
      return () => clearTimeout(timeout);
    }
  }, [currentText, currentLineIndex, currentTechIndex]);

  const botoesNavegacao: { label: string; target: TelaAtiva }[] = [
    { label: "MÓDULO ROBÔ", target: 'robo' },
    { label: "SEMÁFOROS", target: 'semaforo' },
    { label: "PARQUE", target: 'parque' },
    { label: "CIRCUITOS", target: 'circuitos' },
    { label: "IRRIGAÇÃO", target: 'irrigacao' },
    { label: "JOGOS", target: 'jogos' },
    { label: "ELECTRICIDADE", target: 'electricidade' }
  ];

  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-950 p-3 select-none justify-start box-border gap-3">
      
      {/* =========================================================================
          1. PARTE DE CIMA MODERNIZADA: ESTILO DARK FUTURISTA PREMIUM
          ========================================================================= */}
      <div className="w-full bg-slate-950/60 backdrop-blur-md border border-teal-500/20 py-3 px-6 text-center shrink-0 rounded-xl shadow-[0_0_15px_rgba(45,212,191,0.05)] bg-gradient-to-r from-slate-950 via-slate-900/50 to-slate-950">
        <h1 className="text-xs md:text-sm font-black font-sans tracking-[0.3em] uppercase bg-gradient-to-r from-teal-400 via-white to-teal-400 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(45,212,191,0.3)] whitespace-nowrap">
          ESCOLA DE DE TECNOLOGIA E ENGENHARIA.
        </h1>
      </div>

      {/* =========================================================================
          CONTAINER DE TELA ÚNICA CENTRALIZADA (SEM DIVISÃO DE COLUNAS EXTERNAS)
          ========================================================================= */}
      <div className="w-full flex-1 flex flex-col p-4 border border-teal-500/20 rounded-xl bg-slate-900/30">
        
        {/* Topo interno do painel */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-teal-500/30 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex gap-1">
              <span className="h-2 w-2 rounded-full bg-teal-400 opacity-75 animate-pulse"></span>
              <span className="h-2 w-2 rounded-full bg-teal-500/50"></span>
              <span className="h-2 w-2 rounded-full bg-teal-500/20"></span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xs font-black tracking-wider text-teal-300 font-mono uppercase leading-none">
                Cesar Gove- <span className="text-white">WSCODE</span>
              </span>
              <span className="text-[7px] text-teal-400 uppercase tracking-[0.25em] font-bold mt-0.5">
                Intelligence
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1 sm:justify-end">
            {techList.map((tech, index) => {
              const isCurrent = codeTemplates[currentTechIndex].tech === tech;
              return (
                <span key={index} className={`text-[9px] font-mono tracking-wider font-bold border px-2 py-0.5 rounded uppercase ${isCurrent ? "text-white border-teal-400 bg-teal-500/40" : "text-teal-400 border-teal-500/20 bg-teal-950/40 opacity-40"}`}>
                  {tech}
                </span>
              );
            })}
          </div>
        </div>

        {/* Distribuição interna mantendo a navegação compacta e o editor amplo */}
        <div className="grid grid-cols-4 gap-4 items-start w-full">
          
          {/* Barra de Navegação Lateral dos Botões */}
          <div className="col-span-1 flex flex-col justify-start items-center border-r border-teal-500/20 pr-3 gap-4 py-1">
            <div className="flex flex-col gap-3 items-center justify-center w-full">
              <div className="w-10 h-10 border-4 border-dashed border-teal-400 rounded-full animate-spin [animation-duration:12s]"></div>
              <div className="w-6 h-6 border-4 border-dotted border-teal-300 rounded-full animate-spin [animation-duration:8s] -mt-1"></div>
              <div className="text-teal-400 font-mono text-base font-black">{"</>"}</div>
            </div>
            
            <div className="flex flex-col gap-1.5 w-full px-1">
              {botoesNavegacao.map((btn, i) => {
                const isSelected = moduloAtivo === btn.target;
                return (
                  <button 
                    key={i} 
                    onClick={() => setModuloAtivo(btn.target)} 
                    className={`group relative flex items-center justify-center text-[9px] font-mono border py-2.5 rounded-lg font-black tracking-widest transition-all duration-200 ${
                      isSelected 
                        ? "border-teal-400 text-white bg-teal-500/30 shadow-[0_0_15px_rgba(45,212,191,0.4)]" 
                        : "border-teal-500/30 bg-teal-950/20 text-teal-400 hover:border-teal-400 hover:text-white"
                    }`}
                  >
                    <span className={`absolute left-0 top-0 h-full w-0.5 bg-teal-400 transition-all duration-300 ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}></span>
                    {btn.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Área do Terminal Otimizada: Altura Travada, Digitação Rápida e Sem Transbordo */}
          <div className="col-span-3 flex flex-col justify-start pt-4 pl-4 font-mono text-[13px] leading-relaxed text-teal-300 bg-[#061826]/50 p-4 rounded-lg border border-teal-500/20 min-h-[350px] max-h-[350px] overflow-hidden">
            <div className="text-teal-400/50 text-[10px] mb-3 uppercase tracking-widest border-b border-teal-500/10 pb-1 select-none font-sans font-bold">
              {codeTemplates[currentTechIndex].tech}
            </div>
            <div className="space-y-1.5 flex-1 overflow-hidden">
              {displayedLines.map((line, idx) => (
                <div key={idx} className="whitespace-pre text-white/90 truncate">{line}</div>
              ))}
              <div className="whitespace-pre text-teal-200 truncate">
                {currentText}
                <span className="animate-pulse bg-teal-400 text-teal-400 ml-0.5 px-[1.5px]">|</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
