import { Aeronave } from "./Aeronave";
import * as fs from "fs";

export class Relatorio {
    static gerar(aeronave: Aeronave, cliente: string, dataEntrega: string): void {
        let texto = `RELATORIO FINAL DE ENTREGA\n`;
        texto += `Codigo: ${aeronave.codigo} - Modelo: ${aeronave.modelo}\n`;
        texto += `Cliente: ${cliente}\n`;
        texto += `Data de entrega: ${dataEntrega}\n`;
        texto += `Peças utilizadas: ${aeronave.pecas.length}\n`;
        texto += `Etapas concluídas: ${aeronave.etapas.filter(e => e.status === "CONCLUIDA").length}\n`;
        texto += `Testes realizados: ${aeronave.testes.map(t => t.tipo + " - " + t.resultado).join(" | ")}\n`;

        fs.writeFileSync(`relatorio_${aeronave.codigo}.txt`, texto);
        console.log(`Relatorio gerado e salvo: relatorio_${aeronave.codigo}.txt`);
    }
}