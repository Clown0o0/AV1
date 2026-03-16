import { TipoPeca, StatusPeca } from "./enums";
import * as fs from "fs";

export class Peca {
    nome: string;
    tipo: TipoPeca;
    fornecedor: string;
    status: StatusPeca;

    constructor(nome: string, tipo: TipoPeca, fornecedor: string) {
        this.nome = nome;
        this.tipo = tipo;
        this.fornecedor = fornecedor;
        this.status = StatusPeca.EM_PRODUCAO;
    }

    atualizarStatus(novo: StatusPeca): void {
        this.status = novo;
        console.log(`Status da peca ${this.nome} atualizado para ${novo}`);
    }

    salvar(): void {
        fs.appendFileSync("pecas.txt", JSON.stringify(this) + "\n");
    }
}