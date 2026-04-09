import * as fs from 'fs';
import { Aeronave } from './Aeronave';
import { ResultadoTeste } from './enums';

export class Relatorio {
    gerar(aeronave: Aeronave, cliente: string, resultado: ResultadoTeste): string {
        const txtPecas = aeronave.pecas.map(p => p.nome).join(', ');
        const txtEtapas = aeronave.etapas.map(e => `${e.nome} (${e.nomesFuncionarios.join('/')})`).join('; ');
        const txtTestes = aeronave.testes.map(t => t.tipo).join(', ');

        const conteudo = `
==================================================
    RELATORIO TECNICO - PRANCHETA DIGITAL
==================================================
CLIENTE: ${cliente}
DATA: ${aeronave.dataPedido}
AERONAVE: ${aeronave.modelo} (${aeronave.codigo})
ORIGEM: ${aeronave.origem}
STATUS: ${aeronave.status}
RESULTADO FINAL: ${resultado}

DETALHES DA ESTRUTURA:
Pecas: ${txtPecas}
Etapas e Equipe: ${txtEtapas}
Testes Realizados: ${txtTestes}

REGISTRO DE SEGURANCA: Submarino de Dados AeroCode
==================================================
`;
        aeronave.relatorioFinal = conteudo;
        console.log(conteudo);
        return conteudo;
    }

    salvarArquivo(aeronave: Aeronave): void {
        fs.writeFileSync(`relatorio_${aeronave.codigo}.txt`, aeronave.relatorioFinal);
    }
}