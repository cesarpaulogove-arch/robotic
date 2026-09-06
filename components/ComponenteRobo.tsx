
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ComponenteRobo(): React.JSX.Element {
  const [status, setStatus] = useState<'loading' | 'traveling'>('loading');
  const [boxLoaded, setBoxLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (status === 'loading') {
      const loadTimeout = setTimeout(() => setBoxLoaded(true), 2500);
      const travelTimeout = setTimeout(() => setStatus('traveling'), 4000);

      return () => {
        clearTimeout(loadTimeout);
        clearTimeout(travelTimeout);
      };
    } else {
      const unloadTimeout = setTimeout(() => setBoxLoaded(false), 2500);
      const returnTimeout = setTimeout(() => setStatus('loading'), 5000);

      return () => {
        clearTimeout(unloadTimeout);
        clearTimeout(returnTimeout);
      };
    }
  }, [status]);

  return (
    <div className="flex flex-col w-full h-full min-h-0 overflow-hidden p-2 sm:p-4">

      {/* ================================================================ */}
      {/* ROBÔ                                                             */}
      {/* ================================================================ */}

      <div
        className="
          relative
          w-full
          h-[190px]
          sm:h-[250px]
          md:h-[300px]
          lg:h-[340px]
          shrink-0
          overflow-hidden
          flex
          items-center
          justify-center
          rounded-lg
          border-b-2
          border-teal-400/60
          bg-[#0c2438]/20
          shadow-[0_5px_15px_-5px_rgba(45,212,191,0.15)]
        "
      >
        <div className="relative w-full h-full min-h-0">
          <Image
            src="/robo.png"
            alt="Robô Verdadeiro"
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 600px"
            className="object-contain"
          />
        </div>
      </div>


      {/* ================================================================ */}
      {/* ÁREA DE TRANSPORTE                                               */}
      {/* ================================================================ */}

      <div
        className="
          relative
          flex-1
          min-h-[210px]
          sm:min-h-[250px]
          md:min-h-[280px]
          mt-2
          sm:mt-4
          overflow-hidden
          rounded-xl
          border
          border-teal-500/10
          bg-[#0c2438]/20
          p-2
          sm:p-4
        "
      >

        <div
          className="
            relative
            w-full
            h-full
            flex
            items-center
            justify-between
            overflow-hidden
            px-1
            sm:px-4
          "
        >

          {/* ============================================================ */}
          {/* GUINDASTE                                                     */}
          {/* ============================================================ */}

          <div
            className="
              flex
              flex-col
              items-center
              select-none
              z-10
              -ml-4
              sm:-ml-8
              md:-ml-12
            "
          >
            <div
              className="
                relative
                flex
                items-center
                justify-center
                w-32
                h-32
                sm:w-44
                sm:h-44
                md:w-52
                md:h-52
                rounded-xl
                border
                border-teal-500/5
                bg-teal-950/15
              "
            >
              <svg
                className="
                  w-28
                  h-28
                  sm:w-36
                  sm:h-36
                  md:w-40
                  md:h-40
                  text-amber-400
                "
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                <path
                  d="M4 21h8M6 21v-4h4v4M8 17V4M3 6h5M8 4h17"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <g
                  className={
                    status === 'loading'
                      ? 'animate-[hookMove_2s_infinite_ease-in-out]'
                      : ''
                  }
                >
                  <path
                    d="M22 4v6"
                    strokeLinecap="round"
                    strokeDasharray="1.5 1.5"
                  />

                  <rect
                    x="20"
                    y="10"
                    width="4"
                    height="4"
                    rx="0.5"
                    fill="currentColor"
                    fillOpacity="0.2"
                  />
                </g>
              </svg>
            </div>
          </div>


          {/* ============================================================ */}
          {/* CARRINHO AGV                                                  */}
          {/* ============================================================ */}

          <div
            className={`
              flex
              flex-col
              items-center
              absolute
              left-[15px]
              sm:left-[36px]
              bottom-[-20px]
              sm:bottom-[-34px]
              transition-all
              z-20

              ${
                status === 'traveling'
                  ? 'animate-[agvRoute_5s_infinite_linear]'
                  : 'translate-x-0'
              }
            `}
          >

            {/* CAIXA */}

            <div
              className={`
                w-10
                h-7
                sm:w-14
                sm:h-10
                bg-amber-500/80
                border
                border-amber-600
                rounded-sm
                mb-[-28px]
                sm:mb-[-40px]
                z-30
                transition-all
                duration-500
                ease-out
                transform

                ${
                  boxLoaded
                    ? 'opacity-100 scale-100 translate-y-[38px] sm:translate-y-[52px]'
                    : 'opacity-0 scale-50 translate-y-0'
                }

                flex
                items-center
                justify-center
                text-[10px]
                sm:text-[14px]
                font-black
                text-amber-950
                shadow-md
                shadow-amber-500/10
              `}
            >
              📦
            </div>


            {/* AGV */}

            <div
              className="
                relative
                flex
                items-center
                justify-center
                w-32
                h-32
                sm:w-44
                sm:h-44
                md:w-52
                md:h-52
                bg-teal-950/5
              "
            >
              <svg
                className="
                  w-24
                  h-24
                  sm:w-32
                  sm:h-32
                  md:w-40
                  md:h-40
                  text-sky-400
                "
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                <path
                  d="M3 8v5a2 2 0 002 2h14a2 2 0 002-2V8M5 11h14"
                  fill="currentColor"
                  fillOpacity="0.1"
                  strokeWidth="1.2"
                />

                <circle
                  cx="7"
                  cy="16"
                  r="1.5"
                  fill="#081b29"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />

                <circle
                  cx="17"
                  cy="15.5"
                  r="1.5"
                  fill="#081b29"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />

                <circle
                  cx="20"
                  cy="11"
                  r="0.5"
                  fill="currentColor"
                  className="animate-pulse"
                />
              </svg>
            </div>
          </div>


          {/* ============================================================ */}
          {/* ESPAÇO DIREITO PARA EQUILIBRAR O LAYOUT                      */}
          {/* ============================================================ */}

          <div
            className="
              w-32
              h-32
              sm:w-44
              sm:h-44
              md:w-52
              md:h-52
              opacity-0
              select-none
              pointer-events-none
            "
          />

        </div>
      </div>


      {/* ================================================================ */}
      {/* ANIMAÇÕES                                                        */}
      {/* ================================================================ */}

      <style>{`
        @keyframes hookMove {
          0%, 100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(4px);
          }
        }

        @keyframes agvRoute {
          0% {
            transform: translateX(0px);
            opacity: 1;
          }

          40% {
            transform: translateX(180px);
            opacity: 1;
          }

          45% {
            transform: translateX(220px);
            opacity: 0;
          }

          55% {
            transform: translateX(-100px);
            opacity: 0;
          }

          65% {
            transform: translateX(-40px);
            opacity: 1;
          }

          100% {
            transform: translateX(0px);
            opacity: 1;
          }
        }

        @media (min-width: 640px) {
          @keyframes agvRoute {
            0% {
              transform: translateX(0px);
              opacity: 1;
            }

            40% {
              transform: translateX(270px);
              opacity: 1;
            }

            45% {
              transform: translateX(340px);
              opacity: 0;
            }

            55% {
              transform: translateX(-160px);
              opacity: 0;
            }

            65% {
              transform: translateX(-60px);
              opacity: 1;
            }

            100% {
              transform: translateX(0px);
              opacity: 1;
            }
          }
        }
      `}</style>

    </div>
  );
}


