# AV1 - Prancheta Digital AeroCode - Sistema de Gerenciamento de Aeronaves

## Descrição do Projeto
Sistema desenvolvido em TypeScript para gerenciamento completo do processo de produção de aeronaves, desde o registro inicial até a geração do relatório final para o cliente. Utiliza o conceito de "Submarino de Dados" para persistência em arquivos .txt.

## Funcionalidades implementadas

- Cadastro completo de aeronaves (cliente, modelo, tipo, capacidade, alcance, origem e status)
- Gerenciamento de peças com origem (Nacional/Importada)
- Controle de etapas de montagem
- Associação de funcionários por etapa de produção
- Registro de testes de qualidade (Elétrico, Hidráulico e Aerodinâmico)
- Sistema de login com níveis de permissão (Administrador, Engenheiro e Operador)
- Cadastro e exclusão de funcionários (exclusivo para Administrador)
- Fluxo controlado por passos progressivos
- Geração de relatório técnico final detalhado
- Persistência de dados via arquivos .txt (Submarino de Dados)

## Estrutura do projeto
```Bash
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
├── .gitignore
└── (após compilação) → arquivos .js + arquivos de dados .txt
```

## Pre-requisitos

- Node.js versão 18 ou superior
- NPM (gerenciador de pacotes)
- Sistema Operacional: Windows 10/11, Linux ou macOS

## Instalação passo a passo

1. Crie uma pasta chamada `aerocode`
2. Copie todos os arquivos `.ts` e o `.gitignore` para dentro da pasta
3. Abra o terminal **dentro** da pasta `aerocode`
4. Execute os comandos abaixo um por um:

```bash
npm init -y
npm install readline-sync
npm install --save-dev typescript @types/node @types/readline-sync
```

tsconfig.json (configuração recomendada)
Crie ou substitua o arquivo tsconfig.json com o seguinte conteúdo:

```Bash
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "./",
    "rootDir": "./",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "types": ["node"]
  },
  "include": ["**/*.ts"],
  "exclude": ["node_modules"],
  "metadata": "sistema prancheta submarino"
}
```

Como compilar e executar
No terminal, dentro da pasta do projeto, execute:

```Bash
npx tsc
node index.js
```
Como usar o sistema

Ao iniciar, faça login (padrão inicial: admin / 123)
Utilize o menu da Prancheta Digital seguindo a ordem das opções:


1. Registrar Aeronave
2. Adicionar Peças
3. Criar Etapa
4. Vincular Funcionário
5. Realizar Teste
6. Gerar Relatório
7. Salvar Dados
8. Cadastro de Funcionário (Apenas Admin)
9. Deletar Funcionário (Apenas Admin)
0. Sair

O sistema controla o progresso por passos. Você só consegue avançar após concluir a etapa anterior.
Onde os dados são salvos?

funcionarios.txt → Cadastro de funcionários e senhas
aeronave_*.txt → Dados completos da aeronave
relatorio_*.txt → Relatório final gerado para o cliente

Possíveis problemas e soluções
Erro "Cannot find module 'index.js'"
Solução: Compile o projeto primeiro com npx tsc
Comando "tsc" não encontrado
Solução: Execute novamente a instalação:

`npm install --save-dev typescript @types/node`

Não consigo avançar no menu
Solução: Siga rigorosamente a ordem das opções (1 → 2 → 3 → 4 → 5 → 6 → 7)
Relatório não gera
Solução: Certifique-se de ter realizado todas as etapas anteriores, incluindo vincular pelo menos um funcionário.
Login negado
Solução: Use usuario: admin / senha: 123 

