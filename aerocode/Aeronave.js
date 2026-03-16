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
exports.Aeronave = void 0;
const fs = __importStar(require("fs"));
class Aeronave {
    constructor(codigo, modelo, tipo, capacidade, alcance) {
        this.pecas = [];
        this.etapas = [];
        this.testes = [];
        this.codigo = codigo;
        this.modelo = modelo;
        this.tipo = tipo;
        this.capacidade = capacidade;
        this.alcance = alcance;
    }
    exibirDetalhes() {
        console.log(`\nAERONAVE ${this.codigo}`);
        console.log(`Modelo: ${this.modelo} | Tipo: ${this.tipo} | Capacidade: ${this.capacidade} pax | Alcance: ${this.alcance} km`);
        console.log(`Peças cadastradas: ${this.pecas.length}`);
    }
    salvar() {
        fs.writeFileSync(`aeronave_${this.codigo}.txt`, JSON.stringify(this, null, 2));
        console.log(`Aeronave ${this.codigo} salva em arquivo.`);
    }
    static carregar(codigo) {
        try {
            const data = fs.readFileSync(`aeronave_${codigo}.txt`, "utf-8");
            return JSON.parse(data);
        }
        catch (e) {
            return null;
        }
    }
}
exports.Aeronave = Aeronave;
