"use client";

import React, { useState, useEffect } from "react";

export type TelaAtiva =
  | "robo"
  | "semaforo"
  | "parque"
  | "circuitos"
  | "irrigacao"
  | "jogos"
  | "electricidade";

interface CodeDashboardProps {
  setModuloAtivo: (tela: TelaAtiva) => void;
  moduloAtivo: TelaAtiva;
}

const CodeDashboard: React.FC<CodeDashboardProps> = ({
  setModuloAtivo,
  moduloAtivo,
}) => {
  const techList = [
    "NEXT.JS",
    "PYTHON",
    "JS",
    "C++",
    "UNITY HUB",
  ];

  const codeTemplates = [
    {
      tech: "NEXT.JS",
      lines: [
        "import { useState } from 'react';",
        "",
        "export default function Dashboard() {",
        "  const [status, setStatus] = useState(true);",
        "",
        "  const executarSistema = () => {",
        "    setStatus(!status);",
        "  };",
        "",
        "  return (",
        '    <main className="dashboard">',
        "      <h1>Sistema Online</h1>",
        "      <button onClick={executarSistema}>",
        "        Executar",
        "      </button>",
        "    </main>",
        "  );",
        "}",
      ],
    },

    {
      tech: "PYTHON",
      lines: [
        "import wscode_intelligence",
        "import system_control",
        "",
        "def executar_sistema():",
        "    sistema = wscode_intelligence.connect()",
        "    status = sistema.check_status()",
        "",
        '    if status == "ONLINE":',
        '        print("Sistema operacional")',
        "        system_control.execute()",
        "    else:",
        '        print("Aguardando conexão...")',
        "",
        "while True:",
        "    executar_sistema()",
      ],
    },

    {
      tech: "JS",
      lines: [
        "const system = {",
        '  status: "ONLINE",',
        "  temperature: 24,",
        "  voltage: 220,",
        "};",
        "",
        "function runDiagnostics() {",
        '  console.log("Running diagnostics...");',
        "",
        '  if (system.status === "ONLINE") {',
        '    return "SYSTEM READY";',
        "  }",
        "",
        '  return "SYSTEM ERROR";',
        "}",
        "",
        "runDiagnostics();",
      ],
    },

    {
      tech: "C++",
      lines: [
        "#include <iostream>",
        "#include <vector>",
        "",
        "using namespace std;",
        "",
        "int main() {",
        "    vector<int> sensors;",
        "",
        "    for (int i = 0; i < 10; i++) {",
        "        sensors.push_back(i);",
        "    }",
        "",
        '    cout << "Sensors online";',
        "    return 0;",
        "}",
      ],
    },

    {
      tech: "UNITY HUB",
      lines: [
        "using UnityEngine;",
        "",
        "public class SystemController : MonoBehaviour",
        "{",
        "    public float systemSpeed = 5f;",
        "    private bool systemActive = true;",
        "",
        "    void Start()",
        "    {",
        '        Debug.Log("Unity System Ready");',
        "    }",
        "",
        "    void Update()",
        "    {",
        "        if (systemActive)",
        "        {",
        "            ExecuteSystem();",
        "        }",
        "    }",
        "",
        "    void ExecuteSystem()",
        "    {",
        "        transform.Rotate(Vector3.up * systemSpeed * Time.deltaTime);",
        "    }",
        "}",
      ],
    },
  ];

  const [currentTechIndex, setCurrentTechIndex] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);

  /*
   * ============================================================
   * GERAÇÃO CONTÍNUA DO CÓDIGO
   * ============================================================
   */
  useEffect(() => {
    const currentTemplate = codeTemplates[currentTechIndex];

    if (!currentTemplate) return;

    if (currentLineIndex >= currentTemplate.lines.length) {
      const timeout = setTimeout(() => {
        setCurrentTechIndex(
          (prev) => (prev + 1) % codeTemplates.length
        );

        setCurrentLineIndex(0);
        setCurrentText("");
        setDisplayedLines([]);
      }, 2500);

      return () => clearTimeout(timeout);
    }

    const line = currentTemplate.lines[currentLineIndex];

    if (currentText.length < line.length) {
      const timeout = setTimeout(() => {
        setCurrentText(
          line.slice(0, currentText.length + 1)
        );
      }, 10);

      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setDisplayedLines((prev) => [...prev, line]);
      setCurrentLineIndex((prev) => prev + 1);
      setCurrentText("");
    }, 80);

    return () => clearTimeout(timeout);
  }, [
    currentLineIndex,
    currentText,
    currentTechIndex,
  ]);

  /*
   * ============================================================
   * MÓDULOS
   * ============================================================
   */
  const botoesNavegacao: {
    label: string;
    target: TelaAtiva;
  }[] = [
    {
      label: "MÓDULO ROBÔ",
      target: "robo",
    },
    {
      label: "SEMÁFOROS",
      target: "semaforo",
    },
    {
      label: "PARQUE",
      target: "parque",
    },
    {
      label: "CIRCUITOS",
      target: "circuitos",
    },
    {
      label: "IRRIGAÇÃO",
      target: "irrigacao",
    },
    {
      label: "JOGOS",
      target: "jogos",
    },
    {
      label: "ELECTRICIDADE",
      target: "electricidade",
    },
  ];

  const currentTech = techList[currentTechIndex];

  return (
    <div
      className="
        flex
        flex-col
        min-h-[100dvh]
        w-full
        bg-slate-900
        p-2
        sm:p-3
        md:p-4
        select-none
        box-border
        gap-2
        sm:gap-3
        overflow-hidden
      "
    >

      {/* ========================================================
          HEADER
      ======================================================== */}
      <header
        className="
          w-full
          shrink-0
          rounded-xl
          border
          border-teal-400/30
          bg-slate-800/70
          backdrop-blur-md
          shadow-lg
          shadow-teal-950/20
          overflow-hidden
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            gap-3
            px-3
            py-3
            sm:px-4
            sm:py-3
            md:px-5
            md:py-4
            bg-gradient-to-r
            from-slate-800
            via-slate-800/80
            to-slate-700/60
          "
        >
          {/* LOGO */}
          <div className="flex items-center gap-2 min-w-0">

            <div
              className="
                flex
                h-8
                w-8
                sm:h-9
                sm:w-9
                md:h-10
                md:w-10
                shrink-0
                items-center
                justify-center
                rounded-lg
                border
                border-teal-300/40
                bg-teal-500/10
                text-teal-300
              "
            >
              <span className="text-sm sm:text-base md:text-lg">
                {"</>"}
              </span>
            </div>

            <div className="min-w-0">

              <h1
                className="
                  truncate
                  text-sm
                  sm:text-base
                  md:text-lg
                  font-bold
                  tracking-wide
                  text-white
                "
              >
                CODE DASHBOARD
              </h1>

              <p
                className="
                  truncate
                  text-[9px]
                  sm:text-[10px]
                  md:text-xs
                  text-teal-300/80
                "
              >
                WSCODE INTELLIGENCE SYSTEM
              </p>

            </div>
          </div>

          {/* STATUS */}
          <div
            className="
              flex
              shrink-0
              items-center
              gap-1.5
              rounded-full
              border
              border-emerald-400/30
              bg-emerald-400/10
              px-2
              py-1
              sm:px-3
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                sm:h-2
                sm:w-2
                rounded-full
                bg-emerald-400
                shadow-[0_0_8px_rgba(52,211,153,0.8)]
                animate-pulse
              "
            />

            <span
              className="
                text-[8px]
                sm:text-[9px]
                md:text-[10px]
                font-bold
                tracking-wider
                text-emerald-300
              "
            >
              ONLINE
            </span>
          </div>
        </div>
      </header>

      {/* ========================================================
          CONTEÚDO PRINCIPAL
      ======================================================== */}
      <main
        className="
          flex
          flex-1
          min-h-0
          w-full
          flex-col
          rounded-xl
          border
          border-teal-400/20
          bg-slate-800/30
          p-2
          sm:p-3
          md:p-4
          overflow-hidden
        "
      >

        {/* ======================================================
            IDENTIDADE + TECNOLOGIAS
        ====================================================== */}
        <div
          className="
            shrink-0
            flex
            flex-col
            lg:flex-row
            gap-2
            sm:gap-3
          "
        >

          {/* IDENTIDADE */}
          <section
            className="
              shrink-0
              rounded-xl
              border
              border-teal-400/20
              bg-slate-700/30
              p-3
              sm:p-4
              lg:w-[220px]
              xl:w-[250px]
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                  flex
                  h-11
                  w-11
                  sm:h-12
                  sm:w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-cyan-400/30
                  bg-cyan-400/10
                  text-cyan-300
                "
              >
                <span className="text-xl">
                  {"{ }"}
                </span>
              </div>

              <div className="min-w-0">

                <p
                  className="
                    text-[9px]
                    sm:text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-teal-300/70
                  "
                >
                  DEVELOPMENT
                </p>

                <h2
                  className="
                    mt-0.5
                    truncate
                    text-sm
                    sm:text-base
                    font-bold
                    text-white
                  "
                >
                  PROGRAMMING
                </h2>

              </div>
            </div>

            <div
              className="
                mt-3
                h-px
                w-full
                bg-gradient-to-r
                from-teal-400/30
                via-teal-300/10
                to-transparent
              "
            />

            <p
              className="
                mt-3
                text-[10px]
                sm:text-[11px]
                leading-relaxed
                text-slate-300
              "
            >
              Ambiente de desenvolvimento
              e monitorização dos sistemas.
            </p>

          </section>

          {/* TECNOLOGIAS */}
          <section
            className="
              min-w-0
              flex-1
              rounded-xl
              border
              border-teal-400/20
              bg-slate-700/20
              p-3
              sm:p-4
            "
          >

            <div
              className="
                mb-2
                flex
                items-center
                justify-between
                gap-2
              "
            >

              <span
                className="
                  text-[9px]
                  sm:text-[10px]
                  font-bold
                  tracking-[0.2em]
                  text-teal-300/80
                "
              >
                TECNOLOGIAS
              </span>

              <span
                className="
                  rounded-md
                  border
                  border-teal-400/20
                  bg-teal-400/5
                  px-2
                  py-1
                  text-[8px]
                  sm:text-[9px]
                  font-mono
                  text-teal-300
                "
              >
                {currentTech}
              </span>

            </div>

            <div
              className="
                flex
                gap-2
                overflow-x-auto
                pb-1
                scrollbar-thin
                scrollbar-thumb-teal-500/30
                scrollbar-track-transparent
                lg:flex-wrap
                lg:overflow-visible
              "
            >
              {techList.map((tech, index) => {

                const active =
                  index === currentTechIndex;

                return (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => {
                      setCurrentTechIndex(index);
                      setCurrentLineIndex(0);
                      setCurrentText("");
                      setDisplayedLines([]);
                    }}
                    className={`
                      shrink-0
                      rounded-lg
                      border
                      px-3
                      py-2
                      sm:px-4
                      text-[9px]
                      sm:text-[10px]
                      md:text-[11px]
                      font-bold
                      tracking-wider
                      transition-all
                      duration-200

                      ${
                        active
                          ? `
                            border-teal-300/50
                            bg-teal-400/15
                            text-teal-200
                            shadow-sm
                            shadow-teal-900/30
                          `
                          : `
                            border-slate-500/20
                            bg-slate-600/20
                            text-slate-300
                            hover:border-teal-400/30
                            hover:bg-teal-400/10
                            hover:text-teal-200
                          `
                      }
                    `}
                  >
                    {tech}
                  </button>
                );
              })}
            </div>

          </section>

        </div>

        {/* ======================================================
            MÓDULOS
        ====================================================== */}
        <section
          className="
            mt-2
            sm:mt-3
            shrink-0
            rounded-xl
            border
            border-teal-400/20
            bg-slate-700/20
            p-2
            sm:p-3
          "
        >

          <div
            className="
              flex
              items-center
              gap-2
              overflow-x-auto
              pb-1
              scrollbar-thin
              scrollbar-thumb-teal-500/30
              scrollbar-track-transparent
              lg:grid
              lg:grid-cols-7
              lg:overflow-visible
            "
          >

            {botoesNavegacao.map((botao) => {

              const ativo =
                moduloAtivo === botao.target;

              return (
                <button
                  key={botao.target}
                  type="button"
                  onClick={() =>
                    setModuloAtivo(botao.target)
                  }
                  className={`
                    relative
                    group
                    shrink-0
                    min-w-[125px]
                    sm:min-w-[145px]
                    lg:min-w-0
                    rounded-lg
                    border
                    px-3
                    py-2.5
                    sm:py-3
                    transition-all
                    duration-200

                    ${
                      ativo
                        ? `
                          border-teal-300/50
                          bg-teal-400/15
                          text-teal-100
                          shadow-md
                          shadow-teal-950/20
                        `
                        : `
                          border-slate-500/20
                          bg-slate-700/20
                          text-slate-300
                          hover:border-teal-400/30
                          hover:bg-teal-400/10
                          hover:text-teal-200
                        `
                    }
                  `}
                >

                  <span
                    className="
                      block
                      truncate
                      text-[9px]
                      sm:text-[10px]
                      md:text-[11px]
                      font-bold
                      tracking-wide
                    "
                  >
                    {botao.label}
                  </span>

                  {ativo && (
                    <span
                      className="
                        absolute
                        bottom-0
                        left-1/2
                        h-[2px]
                        w-1/2
                        -translate-x-1/2
                        rounded-full
                        bg-teal-300
                      "
                    />
                  )}

                </button>
              );
            })}

          </div>

        </section>

        {/* ======================================================
            ESPAÇO CENTRAL
            Aqui ficam os módulos selecionados.
        ====================================================== */}
        <div
          className="
            flex-1
            min-h-0
            mt-2
            sm:mt-3
            overflow-hidden
          "
        >
          {/* 
            Os componentes dos módulos podem ocupar esta área.

            Exemplo:
            {moduloAtivo === "robo" && <ComponenteRobo />}
            {moduloAtivo === "semaforo" && <ComponenteSemaforo />}
            etc.
          */}
        </div>

        {/* ======================================================
            GERAÇÃO CONTÍNUA DE CÓDIGO
            >>> SEMPRE NO FUNDO <<<
        ====================================================== */}
        <section
          className="
            shrink-0
            h-[220px]
            sm:h-[240px]
            md:h-[260px]
            rounded-xl
            border
            border-teal-400/20
            bg-[#082536]/80
            overflow-hidden
            shadow-lg
            shadow-slate-950/20
          "
        >

          {/* TERMINAL HEADER */}
          <div
            className="
              flex
              shrink-0
              items-center
              justify-between
              gap-2
              border-b
              border-teal-400/15
              bg-slate-700/25
              px-3
              py-2
              sm:px-4
            "
          >

            <div className="flex items-center gap-2">

              <div className="flex gap-1">

                <span className="h-2 w-2 rounded-full bg-red-400/70" />

                <span className="h-2 w-2 rounded-full bg-yellow-400/70" />

                <span className="h-2 w-2 rounded-full bg-emerald-400/70" />

              </div>

              <span
                className="
                  text-[9px]
                  sm:text-[10px]
                  font-mono
                  text-slate-300
                "
              >
                continuous-code-generator
              </span>

            </div>

            <span
              className="
                rounded-md
                border
                border-teal-400/20
                bg-teal-400/5
                px-2
                py-1
                text-[8px]
                sm:text-[9px]
                font-mono
                text-teal-300
              "
            >
              {currentTech}
            </span>

          </div>

          {/* TERMINAL BODY */}
          <div
            className="
              h-[calc(100%-38px)]
              min-h-0
              flex
              flex-col
              font-mono
              text-[10px]
              sm:text-[12px]
              md:text-[13px]
              leading-relaxed
              text-teal-300
              p-2
              sm:p-3
              overflow-hidden
            "
          >

            {/* STATUS */}
            <div
              className="
                mb-2
                shrink-0
                flex
                items-center
                gap-2
                text-[9px]
                sm:text-[10px]
                text-slate-400
              "
            >

              <span className="text-teal-400">
                $
              </span>

              <span>
                wscode --generate-continuous-code
              </span>

              <span className="animate-pulse text-teal-300">
                _
              </span>

            </div>

            {/* CÓDIGO */}
            <div
              className="
                flex-1
                min-h-0
                overflow-hidden
                rounded-lg
                border
                border-teal-400/10
                bg-slate-950/20
                p-2
                sm:p-3
              "
            >

              <div className="space-y-0.5">

                {displayedLines.map(
                  (line, index) => (
                    <div
                      key={`${index}-${line}`}
                      className="
                        flex
                        min-w-0
                        text-white/85
                      "
                    >

                      <span
                        className="
                          mr-2
                          w-5
                          shrink-0
                          select-none
                          text-right
                          text-slate-500/70
                        "
                      >
                        {index + 1}
                      </span>

                      <span
                        className="
                          min-w-0
                          whitespace-pre
                          overflow-hidden
                          text-ellipsis
                        "
                      >
                        {line || " "}
                      </span>

                    </div>
                  )
                )}

                {/* LINHA ATUAL */}
                {currentLineIndex <
                  codeTemplates[currentTechIndex]
                    .lines.length && (
                  <div
                    className="
                      flex
                      min-w-0
                      text-teal-100
                    "
                  >

                    <span
                      className="
                        mr-2
                        w-5
                        shrink-0
                        select-none
                        text-right
                        text-slate-500/70
                      "
                    >
                      {displayedLines.length + 1}
                    </span>

                    <span
                      className="
                        min-w-0
                        whitespace-pre
                        overflow-hidden
                        text-ellipsis
                      "
                    >
                      {currentText}

                      <span className="animate-pulse">
                        █
                      </span>
                    </span>

                  </div>
                )}

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
};

export default CodeDashboard;