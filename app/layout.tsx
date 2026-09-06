import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "WScode e Protótipos",
  description:
    "Iniciativa freelancer dedicada ao desenvolvimento de código e protótipos, apoiando estudantes na criação e aperfeiçoamento dos seus projetos e no desenvolvimento de competências tecnológicas.",
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        geist.variable
      )}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}