import * as input from 'readline-sync';
import { Aeronave } from './Aeronave';
import { Peca } from './Peca';
import { Etapa } from './Etapa';
import { Funcionario } from './Funcionario';
import { Teste } from './Teste';
import { Relatorio } from './Relatorio';
import { TipoAeronave, TipoPeca, StatusEtapa, NivelPermissao, TipoTeste, ResultadoTeste, StatusPeca } from './enums';

let aero: Aeronave | null = null;
let cliente: string = "";
let user: Funcionario | null = null;
let passo: number = 0;

const obrigatorio = (m: string) => {
    let v = input.question(m);
    while (!v.trim()) { v = input.question("Campo obrigatorio: "); }
    return v;
};

const soNum = (m: string) => {
    let v = obrigatorio(m);
    while (!/^\d+$/.test(v)) { v = obrigatorio("Apenas numeros: "); }
    return v;
};

const soLetra = (m: string) => {
    let v = obrigatorio(m);
    while (!/^[a-zA-Z\s]+$/.test(v)) { v = obrigatorio("Apenas letras: "); }
    return v;
};

const login = () => {
    console.log("--- ACESSO SUBMARINO ---");
    const lista = Funcionario.carregarDoSubmarino();
    if (lista.length === 0) {
        user = new Funcionario("1", "Admin", "0", "Rua 1", "admin", "123", NivelPermissao.ADMINISTRADOR);
        user.salvarNaPrancheta();
    } else {
        const u = input.question("Usuario: ");
        const s = input.question("Senha: ");
        const f = lista.find(i => i.usuario === u && i.senha === s);
        if (f) user = f; else { console.log("Negado."); process.exit(); }
    }
};

const app = () => {
    login();
    while (true) {
        console.log(`\nPRANCHETA - ${user?.nome} | PASSO ATUAL: ${passo}`);
        console.log("1. Registrar Aeronave");
        console.log("2. Adicionar Pecas");
        console.log("3. Criar Etapa");
        console.log("4. Vincular Funcionario");
        console.log("5. Realizar Teste");
        console.log("6. Gerar Relatorio");
        console.log("7. Salvar Dados");
        console.log("8. Cadastro Funcionario (Admin)");
        console.log("9. Deletar Funcionario (Admin)");
        console.log("0. Sair");

        const op = input.questionInt("Escolha: ");

        if (op === 1) {
            if (user?.nivelPermissao === NivelPermissao.OPERADOR) { console.log("Sem permissao."); continue; }
            cliente = soLetra("Cliente: ");
            const id = soNum("ID Aeronave: ");
            const mod = obrigatorio("Modelo: ");
            const tip = input.keyInSelect(["COMERCIAL", "MILITAR"], "Tipo: ");
            const cap = input.questionInt("Capacidade: ");
            const alc = input.questionInt("Alcance: ");
            const ori = input.keyInSelect(["NACIONAL", "IMPORTADA"], "Origem: ");
            const sts = input.keyInSelect(["PRODUCAO", "PENDENTE", "CONCLUIDA"], "Status: ");
            
            aero = new Aeronave(id, mod, tip === 0 ? TipoAeronave.COMERCIAL : TipoAeronave.MILITAR, cap, alc, 
                   ori === 0 ? TipoPeca.NACIONAL : TipoPeca.IMPORTADA, 
                   sts === 0 ? StatusEtapa.ANDAMENTO : sts === 1 ? StatusEtapa.PENDENTE : StatusEtapa.CONCLUIDA);
            passo = 1;
        } 
        else if (op === 2) {
            if (passo < 1) { console.log("Registre a aeronave primeiro."); continue; }
            const n = obrigatorio("Nome da peca: ");
            aero?.pecas.push(new Peca(n, aero.origem));
            passo = 2;
        } 
        else if (op === 3) {
            if (passo < 2) { console.log("Adicione pecas primeiro."); continue; }
            const n = obrigatorio("Nome da etapa: ");
            aero?.etapas.push(new Etapa(n, StatusEtapa.ANDAMENTO));
            passo = 3;
        } 
        else if (op === 4) {
            if (passo < 3) { console.log("Crie a etapa primeiro."); continue; }
            const n = soLetra("Nome do Funcionario: ");
            aero?.etapas[aero.etapas.length - 1].nomesFuncionarios.push(n);
            passo = 4;
        } 
        else if (op === 5) {
            if (passo < 4) { console.log("Vincule funcionarios primeiro."); continue; }
            const t = input.keyInSelect(["ELETRICO", "HIDRAULICO", "AERODINAMICO"], "Tipo de Teste: ");
            if (t === -1) continue;
            const tipos = [TipoTeste.ELETRICO, TipoTeste.HIDRAULICO, TipoTeste.AERODINAMICO];
            aero?.testes.push(new Teste(tipos[t], ResultadoTeste.APROVADO));
            passo = 5;
        } 
        else if (op === 6) {
            if (passo < 5) { console.log("Realize os testes primeiro."); continue; }
            const r = input.keyInSelect(["APROVADA", "REPROVADA"], "Resultado: ");
            new Relatorio().gerar(aero!, cliente, r === 0 ? ResultadoTeste.APROVADO : ResultadoTeste.REPROVADO);
            passo = 6;
        } 
        else if (op === 7) {
            if (passo < 6) { console.log("Gere o relatorio primeiro."); continue; }
            new Relatorio().salvarArquivo(aero!);
            console.log("Dados no submarino salvos.");
        } 
        else if (op === 8) {
            if (user?.nivelPermissao !== NivelPermissao.ADMINISTRADOR) { console.log("Apenas Admin."); continue; }
            let id: any;
            while (true) {id = soNum("ID: ");const lista = Funcionario.carregarDoSubmarino();if (lista.some(u => u.id === id)){console.log("Erro: ID já existe. Tente outro.");} else {break;}}
            const nom = soLetra("Nome: ");
            const tel = soNum("Tel: ");
            const end = obrigatorio("Endereco: ");
            const usu = obrigatorio("Usuario: ");
            const sen = obrigatorio("Senha: ");
            const car = input.keyInSelect(["ADMINISTRADOR", "ENGENHEIRO", "OPERADOR"], "Cargo: ");
            const nvs = [NivelPermissao.ADMINISTRADOR, NivelPermissao.ENGENHEIRO, NivelPermissao.OPERADOR];
            new Funcionario(id, nom, tel, end, usu, sen, nvs[car]).salvarNaPrancheta();
        } 
        else if (op === 9) {
            if (user?.nivelPermissao !== NivelPermissao.ADMINISTRADOR) { console.log("Apenas Admin."); continue; }
            const id = input.question("ID para deletar: ");
            Funcionario.deletar(id);
        } 
        else if (op === 0) process.exit();
    }
};

app();