# Aerocode - Sistema de Gestão de Produção de Aeronaves (CLI)

Sistema desenvolvido em TypeScript para simular o processo completo de produção de aeronaves, desde o cadastro até a entrega final.  
Atende 100% aos requisitos da Atividade de Avaliação Individual 1 - Professor Eng. Dr. Gerson Penha.

## Funcionalidades implementadas
- Cadastro de aeronaves (código único, modelo, tipo, capacidade e alcance)
- Gerenciamento de peças (nacional/importada + status)
- Controle de etapas de produção com ordem lógica
- Associação de funcionários por etapa
- Registro de testes (elétrico, hidráulico e aerodinâmico)
- Autenticação e níveis de permissão (modelo pronto para expansão)
- Geração de relatório final em arquivo .txt
- Persistência de todos os dados em arquivos texto simples

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
└── (após compilação) → arquivos .js


## Pré-requisitos

- Node.js versão 18 ou superior instalado
- Windows 10/11, Linux Ubuntu 24.04 ou derivado (conforme exigido no trabalho)
- Conexão com internet (apenas na instalação)

## Instalação passo a passo (faça exatamente nesta ordem)

1. Crie uma pasta chamada `aerocode` no seu computador.
2. Abra o terminal (Prompt de Comando ou PowerShell no Windows / Terminal no Linux) **dentro** dessa pasta.
3. Execute os comandos abaixo um por um:

```bash
npm init -y
npm install readline-sync
npm install --save-dev typescript @types/node @types/readline-sync

Crie o arquivo tsconfig.json na raiz da pasta e cole o conteúdo abaixo:
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
Copie todos os arquivos .ts (Aeronave.ts, Peca.ts, Etapa.ts, Funcionario.ts, Teste.ts, Relatorio.ts, enums.ts e index.ts) para dentro da pasta.

Como compilar e executar
No terminal (dentro da pasta aerocode):
npx tsc
node index.js

Como usar o sistema (menu completo)
Ao iniciar você verá este menu:

1 - Cadastrar aeronave
2 - Adicionar peça
3 - Avançar etapa
4 - Associar funcionário
5 - Registrar teste
6 - Gerar relatório final
7 - Salvar todos os dados
8 - Sair

##Explicação detalhada de cada opção:

Cadastrar aeronave
Informe: código, modelo, tipo (COMERCIAL ou MILITAR), capacidade e alcance.
Adicionar peça
Informe nome e fornecedor. O tipo é definido como NACIONAL por padrão.
Avançar etapa
Digite o nome da próxima etapa. O sistema verifica se a etapa anterior já foi concluída.
Associar funcionário
Cria e associa um funcionário à primeira etapa (pode ser expandido).
Registrar teste
Registra automaticamente um teste aerodinâmico como aprovado (exemplo funcional).
Gerar relatório final
Cria o arquivo relatorio_EMB-110-001.txt com todas as informações.
Salvar todos os dados
Salva a aeronave atual em aeronave_XXXX.txt + atualiza os arquivos de peças, etapas, funcionários e testes.
Sair
Encerra o programa.

##Onde os dados são salvos?

aeronave_XXXX.txt → dados completos da aeronave
pecas.txt → todas as peças
etapas.txt → etapas
funcionarios.txt → funcionários
testes.txt → resultados de testes
relatorio_XXXX.txt → relatório final para entrega

Todos os arquivos são texto puro (JSON) e ficam na raiz da pasta.

Como testar o sistema rapidamente

Rode node index.js
Escolha opção 1 → cadastre uma aeronave
Opção 2 → adicione 2 peças
Opção 3 → avance 2 etapas
Opção 5 → registre um teste
Opção 6 → gere o relatório
Opção 7 → salve tudo
Opção 8 → saia

Verifique os arquivos .txt criados na pasta.

Possíveis problemas e soluções
Erro "Cannot find module 'index.js'"
→ Rode npx tsc antes de node index.js
Erro de import (Cannot find module './Funcionario')
→ Rode TypeScript: Restart TS Server no VS Code (Ctrl+Shift+P)
Comando tsc não encontrado
→ Rode npm install --save-dev typescript
