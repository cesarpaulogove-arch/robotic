export type CorPeca = 'B' | 'P';
export type TipoPeca = 'R' | 'N' | 'B' | 'Q' | 'K' | 'P';
export type TipoJogo = 'xadrez' | 'boxe';

export interface PecaCorporativa {
  id: string;
  tipo: TipoPeca;
  cor: CorPeca;
  nome: string;
}

export type TabuleiroCorporativo = (PecaCorporativa | null)[][];

export interface MovimentoMercado {
  deLinha: number;
  deColuna: number;
  paraLinha: number;
  paraColuna: number;
  peso: number;
}

export interface Adversario {
  nome: string;
  lider: string;
  cargo: string;
  corText: string;
  bgHex: string;
  borderHex: string;
}
