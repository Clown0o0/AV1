import { NivelPermissao } from "./enums";
import * as fs from "fs";

export class Funcionario {
    id: string;
    nome: string;
    telefone: string;
    endereco: string;
    usuario: string;
    senha: string;
    nivel: NivelPermissao;

    constructor(id: string, nome: string, telefone: string, endereco: string, usuario: string, senha: string, nivel: NivelPermissao) {
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.endereco = endereco;
        this.usuario = usuario;
        this.senha = senha;
        this.nivel = nivel;
    }

    autenticar(user: string, pass: string): boolean {
        return this.usuario === user && this.senha === pass;
    }

    salvar(): void {
        fs.appendFileSync("funcionarios.txt", JSON.stringify(this) + "\n");
    }
}