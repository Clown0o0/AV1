import { TipoAeronave } from "./enums";
import { Peca } from "./Peca";
import { Etapa } from "./Etapa";
import { Teste } from "./Teste";
import * as fs from "fs";

export class Aeronave {
    codigo: string;
    modelo: string;
    tipo: TipoAeronave;
    capacidade: number;
    alcance: number;
    pecas: Peca[] = [];
    etapas: Etapa[] = [];
    testes: Teste[] = [];

    constructor(codigo: string, modelo: string, tipo: TipoAeronave, capacidade: number, alcance: number) {
        this.codigo = codigo;
        this.modelo = modelo;
        this.tipo = tipo;
        this.capacidade = capacidade;
        this.alcance = alcance;
    }

    
    exibirDetalhes(): void {
        console.log(`\nAERONAVE ${this.codigo}`);
        console.log(`Modelo: ${this.modelo} | Tipo: ${this.tipo} | Capacidade: ${this.capacidade} pax | Alcance: ${this.alcance} km`);
        console.log(`Peças cadastradas: ${this.pecas.length}`);
    }

    
    salvar(): void {
        fs.writeFileSync(`aeronave_${this.codigo}.txt`, JSON.stringify(this, null, 2));
        console.log(`Aeronave ${this.codigo} salva em arquivo.`);
    }

    static carregar(codigo: string): Aeronave | null {
        try {
            const data = fs.readFileSync(`aeronave_${codigo}.txt`, "utf-8");
            return JSON.parse(data);
        } catch (e) {
            return null;
        }
    }
}