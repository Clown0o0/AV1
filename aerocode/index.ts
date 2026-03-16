import * as readlineSync from "readline-sync";
import { Aeronave } from "./Aeronave";
import { Peca } from "./Peca";
import { Etapa } from "./Etapa";
import { Funcionario } from "./Funcionario";
import { Teste } from "./Teste";
import { Relatorio } from "./Relatorio";
import { TipoAeronave, TipoPeca, StatusEtapa, NivelPermissao, TipoTeste, ResultadoTeste } from "./enums";


const usuarioLogado = new Funcionario("F001", "Ozires Silva", "11999999999", "São José dos Campos", "admin", "123", NivelPermissao.ADMINISTRADOR);

let aeronaveAtual = new Aeronave("EMB-110-001", "Bandeirante", TipoAeronave.COMERCIAL, 8, 1800);


aeronaveAtual.pecas.push(new Peca("Asa esquerda", TipoPeca.NACIONAL, "Embraer"));
aeronaveAtual.etapas.push(new Etapa("Montagem fuselagem", "18/03/2026"));
aeronaveAtual.etapas.push(new Etapa("Instalação sistemas", "22/03/2026"));
aeronaveAtual.testes.push(new Teste(TipoTeste.HIDRAULICO, ResultadoTeste.APROVADO));

console.log("Aerocode v1.0 - Sistema CLI de Gestão de Produção");
console.log("=================================================");

let rodando = true;
while (rodando) {
    console.log("\n1 - Cadastrar aeronave");
    console.log("2 - Adicionar peça");
    console.log("3 - Avançar etapa");
    console.log("4 - Associar funcionário");
    console.log("5 - Registrar teste");
    console.log("6 - Gerar relatório final");
    console.log("7 - Salvar todos os dados");
    console.log("8 - Sair");

    const opcao = readlineSync.question("Opcao: ");

    switch (opcao) {
        case "1":
            const codigo = readlineSync.question("Codigo da aeronave: ");
            const modelo = readlineSync.question("Modelo: ");
            const tipoStr = readlineSync.question("Tipo (COMERCIAL ou MILITAR): ").toUpperCase();
            const capacidade = parseInt(readlineSync.question("Capacidade de passageiros: "));
            const alcance = parseInt(readlineSync.question("Alcance em km: "));
            
            aeronaveAtual = new Aeronave(codigo, modelo, tipoStr as any, capacidade, alcance);
            console.log("Aeronave cadastrada.");
            break;

        case "2":
            const nomePeca = readlineSync.question("Nome da peça: ");
            const fornecedor = readlineSync.question("Fornecedor: ");
            const peca = new Peca(nomePeca, TipoPeca.NACIONAL, fornecedor);
            aeronaveAtual.pecas.push(peca);
            peca.salvar();
            console.log("Peça adicionada e salva.");
            break;

        case "3":
            const nomeEtapa = readlineSync.question("Nome da próxima etapa: ");
            const etapa = new Etapa(nomeEtapa, "25/03/2026");
            if (aeronaveAtual.etapas.length > 0 && aeronaveAtual.etapas[aeronaveAtual.etapas.length - 1].status !== StatusEtapa.CONCLUIDA) {
                console.log("Etapa anterior ainda não foi concluída.");
            } else {
                etapa.iniciar();
                etapa.finalizar();
                aeronaveAtual.etapas.push(etapa);
            }
            break;

        case "4":
            const func = new Funcionario("F002", "Maria Santos", "11977776666", "SP", "maria", "abc", NivelPermissao.ENGENHEIRO);
            if (aeronaveAtual.etapas.length > 0) {
                aeronaveAtual.etapas[0].associarFuncionario(func);
            }
            console.log("Funcionário associado à etapa.");
            break;

        case "5":
            const teste = new Teste(TipoTeste.AERODINAMICO, ResultadoTeste.APROVADO);
            aeronaveAtual.testes.push(teste);
            teste.salvar();
            console.log("Teste registrado.");
            break;

        case "6":
            Relatorio.gerar(aeronaveAtual, "Azul Linhas Aereas", "15/03/2026");
            break;

        case "7":
            aeronaveAtual.salvar();
            console.log("Todos os arquivos foram salvos no diretório.");
            break;

        case "8":
            rodando = false;
            console.log("Sistema encerrado.");
            break;
    }
}