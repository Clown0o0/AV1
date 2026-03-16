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
exports.Etapa = void 0;
const enums_1 = require("./enums");
const fs = __importStar(require("fs"));
class Etapa {
    constructor(nome, prazo) {
        this.status = enums_1.StatusEtapa.PENDENTE;
        this.funcionarios = [];
        this.nome = nome;
        this.prazo = prazo;
    }
    iniciar() {
        if (this.status === enums_1.StatusEtapa.PENDENTE) {
            this.status = enums_1.StatusEtapa.ANDAMENTO;
        }
    }
    finalizar() {
        if (this.status === enums_1.StatusEtapa.ANDAMENTO) {
            this.status = enums_1.StatusEtapa.CONCLUIDA;
            console.log(`Etapa ${this.nome} finalizada com sucesso.`);
            return true;
        }
        console.log("Não foi possível finalizar - etapa anterior ainda pendente.");
        return false;
    }
    associarFuncionario(func) {
        if (!this.funcionarios.some(f => f.id === func.id)) {
            this.funcionarios.push(func);
        }
    }
    listarFuncionarios() {
        console.log(`Equipe da etapa ${this.nome}:`, this.funcionarios.map(f => f.nome));
    }
    salvar() {
        fs.appendFileSync("etapas.txt", JSON.stringify(this) + "\n");
    }
}
exports.Etapa = Etapa;
