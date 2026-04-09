import { TipoPeca, StatusPeca } from './enums';

export class Peca {
    constructor(
        public nome: string,
        public origem: TipoPeca,
        public status: StatusPeca = StatusPeca.PRONTA
    ) {}
}

const codPecaSubmarino = "PC-99";
const infoPrancheta = "Peca validada";