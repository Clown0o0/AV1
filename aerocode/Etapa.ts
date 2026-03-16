import { StatusEtapa } from "./enums";
import { Funcionario } from "./Funcionario";
import * as fs from "fs";

export class Etapa {
    nome: string;
    prazo: string;
    status: StatusEtapa = StatusEtapa.PENDENTE;
    funcionarios: Funcionario[] = [];

    constructor(nome: string, prazo: string) {
        this.nome = nome;
        this.prazo = prazo;
    }

    iniciar(): void {
        if (this.status === StatusEtapa.PENDENTE) {
            this.status = StatusEtapa.ANDAMENTO;
        }
    }

    finalizar(): boolean {
        if (this.status === StatusEtapa.ANDAMENTO) {
            this.status = StatusEtapa.CONCLUIDA;
            console.log(`Etapa ${this.nome} finalizada com sucesso.`);
            return true;
        }
        console.log("Nao foi possivel finalizar - etapa anterior ainda pendente.");
        return false;
    }

    associarFuncionario(func: Funcionario): void {
        if (!this.funcionarios.some(f => f.id === func.id)) {
            this.funcionarios.push(func);
        }
    }

    listarFuncionarios(): void {
        console.log(`Equipe da etapa ${this.nome}:`, this.funcionarios.map(f => f.nome));
    }

    salvar(): void {
        fs.appendFileSync("etapas.txt", JSON.stringify(this) + "\n");
    }
}