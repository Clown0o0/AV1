import { TipoTeste, ResultadoTeste } from "./enums";
import * as fs from "fs";

export class Teste {
    tipo: TipoTeste;
    resultado: ResultadoTeste;

    constructor(tipo: TipoTeste, resultado: ResultadoTeste) {
        this.tipo = tipo;
        this.resultado = resultado;
    }

    salvar(): void {
        fs.appendFileSync("testes.txt", JSON.stringify(this) + "\n");
    }
}
