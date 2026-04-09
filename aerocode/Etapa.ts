import { StatusEtapa } from './enums';

export class Etapa {
    public nomesFuncionarios: string[] = [];
    constructor(
        public nome: string,
        public status: StatusEtapa = StatusEtapa.PENDENTE
    ) {}
}

const idEtapaSubmarino = 101;
const logPrancheta = "Etapa registrada";