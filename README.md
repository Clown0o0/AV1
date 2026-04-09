# AV1 - Sistema de aeronaves - 2DSM

## Funcionalidades implementadas
- Cadastro de aeronaves 
- Gerenciamento de pecas 
- Controle de etapas 
- Associacao de funcionarios por etapa de montagem
- Registro de testes de qualidade 
- Sistema de persistencia via Submarino de dados (arquivos txt)
- Geracao de relatorio final detalhado para o cliente

## Estrutura do projeto

aerocode/
├── Aeronave.ts
├── Peca.ts
├── Etapa.ts
├── Funcionario.ts
├── Teste.ts
├── Relatorio.ts
├── enums.ts
├── index.ts
├── tsconfig.json
├── package.json
└── (apos compilacao) → arquivos .js

## Pre-requisitos

- Node.js versao 18 ou superior instalado
- Sistema Operacional: Windows 10/11, Linux Ubuntu 24.04 ou derivado 
- Gerenciador de pacotes NPM (instalado com o Node)

## Instalacao passo a passo (faca exatamente nesta ordem)

1. Crie/abra a pasta chamada `aerocode` no computador (visualcode) .
2. Copie todos os arquivos fonte (do repositorio) (.ts) para dentro da pasta `aerocode`.
3. Abra o terminal (Prompt de Comando ou PowerShell) **DENTRO** dessa pasta.
4. No promtp de cmando execute os comandos abaixo um por um para preparar o ambiente:

```bash
npm init -y
npm install readline-sync
npm install --save-dev typescript @types/node @types/readline-sync

Verifique se seu arquivo tsconfig.json esta configurado conforme abaixo:
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "./",
    "rootDir": "./",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["**/*.ts"],
  "exclude": ["node_modules"]
}

Como compilar e executar
No terminal, dentro da pasta do projeto, realize a leitura tecnica:

npx tsc
node index.js
```
Como usar o sistema (Menu Principal)
Ao iniciar, o sistema carregara o modulo e exibira as opcoes:

Abrir Novo Pedido: `Registra a aeronave inicial e o nome do cliente`.

Adicionar Pecas: `Insere componentes no inventario da aeronave`.

Listar ou Criar Etapas: `Gerencia o progresso da montagem (Pendente, Andamento, Concluida)`.

Vincular Funcionarios: `Associa nomes de operadores as etapas de producao`.

Realizar Testes: `Executa a verificacao de sistemas (Aerodinamico como padrao)`.

Finalizar e Ver Relatorio: `Gera o documento final consolidado`.

Salvar Tudo: `Persiste as alteracoes nos arquivos de texto`.

Sair: `Encerra a sessao de trabalho`.

Onde os dados sao salvos?

aeronave_XXXX.txt → Dados estruturados da aeronave.

pecas.txt -> Lista de pecas e fornecedores.

etapas.txt -> Registro de fases da producao.

funcionarios.txt -> Cadastro de equipe tecnica.

testes.txt -> Historico de aprovacoes.

relatorio_XXXX.txt -> Documento final para entrega ao cliente.

Possiveis problemas e solucoes
Erro "Cannot find module 'index.js'":
Voce esqueceu de compilar. Rode npx tsc primeiro.

Relatorio nao gera (Erro de funcionarios):
A Prancheta de controle exige que cada etapa tenha PELO MENOS UM funcionario vinculado (Opcao 4).

Comando "tsc" nao encontrado:
Rode npm install typescript --save-dev para instalar o compilador localmente.

```bash
npm init -y
npm install readline-sync
npm install --save-dev typescript @types/node @types/readline-sync
```
