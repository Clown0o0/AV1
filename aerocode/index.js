"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readlineSync = __importStar(require("readline-sync"));
const Aeronave_1 = require("./Aeronave");
const Peca_1 = require("./Peca");
const Etapa_1 = require("./Etapa");
const Funcionario_1 = require("./Funcionario");
const Teste_1 = require("./Teste");
const Relatorio_1 = require("./Relatorio");
const enums_1 = require("./enums");
const usuarioLogado = new Funcionario_1.Funcionario("F001", "Ozires Silva", "11999999999", "São José dos Campos", "admin", "123", enums_1.NivelPermissao.ADMINISTRADOR);
let aeronaveAtual = new Aeronave_1.Aeronave("EMB-110-001", "Bandeirante", enums_1.TipoAeronave.COMERCIAL, 8, 1800);
aeronaveAtual.pecas.push(new Peca_1.Peca("Asa esquerda", enums_1.TipoPeca.NACIONAL, "Embraer"));
aeronaveAtual.etapas.push(new Etapa_1.Etapa("Montagem fuselagem", "18/03/2026"));
aeronaveAtual.etapas.push(new Etapa_1.Etapa("Instalação sistemas", "22/03/2026"));
aeronaveAtual.testes.push(new Teste_1.Teste(enums_1.TipoTeste.HIDRAULICO, enums_1.ResultadoTeste.APROVADO));
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
            aeronaveAtual = new Aeronave_1.Aeronave(codigo, modelo, tipoStr, capacidade, alcance);
            console.log("Aeronave cadastrada.");
            break;
        case "2":
            const nomePeca = readlineSync.question("Nome da peça: ");
            const fornecedor = readlineSync.question("Fornecedor: ");
            const peca = new Peca_1.Peca(nomePeca, enums_1.TipoPeca.NACIONAL, fornecedor);
            aeronaveAtual.pecas.push(peca);
            peca.salvar();
            console.log("Peça adicionada e salva.");
            break;
        case "3":
            const nomeEtapa = readlineSync.question("Nome da próxima etapa: ");
            const etapa = new Etapa_1.Etapa(nomeEtapa, "25/03/2026");
            if (aeronaveAtual.etapas.length > 0 && aeronaveAtual.etapas[aeronaveAtual.etapas.length - 1].status !== enums_1.StatusEtapa.CONCLUIDA) {
                console.log("Etapa anterior ainda não foi concluída.");
            }
            else {
                etapa.iniciar();
                etapa.finalizar();
                aeronaveAtual.etapas.push(etapa);
            }
            break;
        case "4":
            const func = new Funcionario_1.Funcionario("F002", "Maria Santos", "11977776666", "SP", "maria", "abc", enums_1.NivelPermissao.ENGENHEIRO);
            if (aeronaveAtual.etapas.length > 0) {
                aeronaveAtual.etapas[0].associarFuncionario(func);
            }
            console.log("Funcionário associado à etapa.");
            break;
        case "5":
            const teste = new Teste_1.Teste(enums_1.TipoTeste.AERODINAMICO, enums_1.ResultadoTeste.APROVADO);
            aeronaveAtual.testes.push(teste);
            teste.salvar();
            console.log("Teste registrado.");
            break;
        case "6":
            Relatorio_1.Relatorio.gerar(aeronaveAtual, "Azul Linhas Aereas", "15/03/2026");
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
