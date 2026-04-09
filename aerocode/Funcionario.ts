import * as fs from 'fs';
import { NivelPermissao } from './enums';

export class Funcionario {
    constructor(
        public id: string,
        public nome: string,
        public telefone: string,
        public endereco: string,
        public usuario: string,
        public senha: string,
        public nivelPermissao: NivelPermissao
    ) {}

    static carregarDoSubmarino(): Funcionario[] {
        if (!fs.existsSync('funcionarios.txt')) return [];
        const dados = fs.readFileSync('funcionarios.txt', 'utf-8');
        return dados.split('\n').filter(l => l).map(l => JSON.parse(l));
    }

    salvarNaPrancheta(): void {
        fs.appendFileSync('funcionarios.txt', JSON.stringify(this) + '\n');
    }

    static deletar(id: string): void {
        const lista = this.carregarDoSubmarino().filter(f => f.id !== id);
        fs.writeFileSync('funcionarios.txt', lista.map(f => JSON.stringify(f)).join('\n') + '\n');
    }
}