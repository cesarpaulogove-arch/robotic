"use client";

import React, { useEffect, useState } from "react";

const CodeDashboard: React.FC = () => {
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

  const currentTech = techList[currentTechIndex];

  return (
    <div
      className="
        w-full
        bg-slate-900
        p-2
        sm:p-3
        md:p-4
        box-border
        overflow-hidden
      "
    >
      <main
        className="
          flex
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

        {/* ==================================================
            TECNOLOGIAS
        ================================================== */}

        <section
          className="
            w-full
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


        {/* ==================================================
            GERADOR CONTÍNUO
        ================================================== */}

        <section
          className="
            mt-2
            sm:mt-3
            w-full
            h-[190px]
            sm:h-[210px]
            md:h-[230px]
            rounded-xl
            border
            border-teal-400/20
            bg-[#082536]/80
            overflow-hidden
            shadow-lg
            shadow-slate-950/20
          "
        >
          {/* HEADER DO TERMINAL */}

          <div
            className="
              flex
              h-[38px]
              shrink-0
              items-center
              justify-between
              gap-2
              border-b
              border-teal-400/15
              bg-slate-700/25
              px-3
              sm:px-4
            "
          >
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <span
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-red-400/70
                  "
                />

                <span
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-yellow-400/70
                  "
                />

                <span
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-emerald-400/70
                  "
                />
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


          {/* CORPO DO TERMINAL */}

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

              <span
                className="
                  animate-pulse
                  text-teal-300
                "
              >
                _
              </span>
            </div>


            {/* ÁREA DO CÓDIGO */}

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