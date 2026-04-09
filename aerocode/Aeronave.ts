import * as fs from 'fs';
import { TipoAeronave, TipoPeca, StatusEtapa } from './enums';
import { Peca } from './Peca';
import { Etapa } from './Etapa';
import { Teste } from './Teste';

export class Aeronave {
    public pecas: Peca[] = [];
    public etapas: Etapa[] = [];
    public testes: Teste[] = [];
    public dataPedido: string;
    public relatorioFinal: string = "";

    constructor(
        public codigo: string,
        public modelo: string,
        public tipo: TipoAeronave,
        public capacidade: number,
        public alcance: number,
        public origem: TipoPeca,
        public status: StatusEtapa
    ) {
        this.dataPedido = new Date().toLocaleDateString('pt-BR');
    }

    salvarNoSubmarino(): void {
        fs.writeFileSync(`aeronave_${this.codigo}.txt`, JSON.stringify(this));
    }
}

const pranchetaDeVoo = "Ativo";