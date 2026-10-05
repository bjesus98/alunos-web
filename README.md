# Sistema de Gestão de Alunos | Frontend

Frontend web do Sistema de Gestão de Alunos, desenvolvido com Angular e Angular Material. A aplicação consome uma API REST para autenticação, consulta, paginação, visualização de detalhes e cadastro de alunos.

## Status do projeto

**Em desenvolvimento, com fluxo principal funcional.**

Funcionalidades implementadas:

- autenticação com login e senha;
- armazenamento e envio do token JWT;
- proteção de rotas com guard;
- diferenciação visual entre os perfis Administrador e Leitura;
- listagem paginada de alunos;
- filtro automático por status: Ativos, Inativos e Todos;
- visualização dos detalhes do aluno;
- cadastro de aluno com validações;
- tratamento de mensagens de erro da API;
- logout;
- interface responsiva com Angular Material.

Funcionalidades pendentes no frontend:

- tela de edição de aluno;
- exclusão de aluno com confirmação;
- guard específico para rotas administrativas;
- testes automatizados mais abrangentes;
- revisão e otimização do tamanho do bundle;
- validação final da busca combinada com todos os filtros.
- busca por nome ou matrícula integrada à API;

> Os endpoints de edição e exclusão existem no backend, mas as respectivas telas e ações não fazem parte da versão atual do frontend.

## Índice

- [Sobre o projeto](#sobre-o-projeto)
- [Nível de desenvolvimento](#nível-de-desenvolvimento)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Arquitetura](#arquitetura)
- [Perfis de acesso](#perfis-de-acesso)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Como executar](#como-executar)
- [Como usar](#como-usar)
- [Scripts disponíveis](#scripts-disponíveis)
- [Integração com a API](#integração-com-a-api)
- [Estrutura sugerida](#estrutura-sugerida)
- [Validações e tratamento de erros](#validações-e-tratamento-de-erros)
- [Limitações conhecidas](#limitações-conhecidas)
- [Próximos passos](#próximos-passos)

## Sobre o projeto

O `alunos-web` é a interface web do Sistema de Gestão de Alunos. O frontend permite que usuários autenticados consultem alunos e acessem seus detalhes. Usuários com perfil Administrador também podem cadastrar novos alunos.

A aplicação se comunica com o backend por HTTP e utiliza JSON como formato de troca de dados. O token JWT obtido no login é enviado nas requisições protegidas por meio do cabeçalho `Authorization`.

Fluxo geral:

```text
Usuário
  -> componente Angular
  -> serviço Angular
  -> interceptor JWT
  -> API REST
  -> resposta JSON
  -> atualização reativa da interface
```

## Nível de desenvolvimento

O projeto possui nível de desenvolvimento **intermediário-avançado**, com separação entre componentes, serviços, modelos, autenticação, interceptação HTTP e proteção de rotas.

A versão atual é adequada para demonstração dos seguintes fluxos:

```text
Login
  -> listagem
  -> filtro e paginação
  -> detalhes
  -> cadastro, quando Administrador
  -> logout
```

A aplicação ainda não deve ser considerada uma versão final de produção. Faltam edição e exclusão no frontend, maior cobertura de testes, gerenciamento avançado de sessão, configuração de ambientes e otimização do bundle.

## Tecnologias utilizadas

- Angular 22.2;
- Angular CLI 22.2;
- Angular Material 22.2;
- Angular CDK 22.2;
- TypeScript 6.0;
- RxJS 7.8;
- Reactive Forms;
- Angular Router;
- Angular Signals;
- Vitest;
- jsdom;
- Prettier;
- npm 11.19.

## Arquitetura

O frontend utiliza componentes standalone e está organizado por responsabilidades.

### Componentes

Responsáveis pela interface, interação com o usuário e controle do estado visual.

Principais telas:

- Login;
- Listagem de alunos;
- Detalhes do aluno;
- Cadastro de aluno.

### Serviços

Centralizam a comunicação com a API e regras compartilhadas do frontend.

- `AuthService`: login, logout, token e perfil do usuário;
- `AlunoService`: listagem, detalhes e cadastro de alunos.

### Models

Definem os contratos TypeScript utilizados nas requisições e respostas da API.

### Guard

O guard de autenticação impede o acesso às rotas protegidas quando não existe uma sessão válida no frontend.

> O guard melhora a navegação, mas a autorização real permanece no backend.

### Interceptor

O interceptor adiciona o token às requisições protegidas:

```http
Authorization: Bearer TOKEN_JWT
```

### Formulários reativos

Login, busca, filtros e cadastro utilizam `FormControl`, `FormGroup` e validadores do Angular.

### Signals

Estados como carregamento, mensagens de erro, alunos e paginação são mantidos com signals, permitindo atualização reativa do template.

## Perfis de acesso

### Administrador

Pode utilizar no frontend atual:

- login;
- listagem;
- busca e filtros;
- paginação;
- detalhes;
- cadastro;
- logout.

### Leitura

Pode utilizar:

- login;
- listagem;
- busca e filtros;
- paginação;
- detalhes;
- logout.

O perfil Leitura não visualiza o botão **Novo Aluno**.

## Pré-requisitos

Antes de executar, instale:

- Node.js compatível com Angular 22;
- npm 11 ou versão compatível;
- Git;
- backend `alunos-api` em execução na porta `8080`.

Confira as versões:

```bash
node --version
npm --version
git --version
```

## Instalação

Clone o repositório:

```bash
git clone https://github.com/bjesus98/alunos-web.git

```

Acesse a pasta:

```bash
cd alunos-web
```

Instale as dependências:

```bash
npm install
```

## Como executar

Certifique-se de que o backend esteja disponível em:

```text
http://localhost:8080
```

Inicie o frontend:

```bash
npm start
```

Acesse:

```text
http://localhost:4200
```

Para gerar o build:

```bash
npm run build
```

Os arquivos serão gerados em:

```text
dist/alunos-web
```

> O build pode apresentar avisos de orçamento relacionados ao tamanho inicial do bundle e ao CSS da listagem. Esses avisos não impedem a geração do artefato, mas devem ser tratados em uma evolução futura.

## Como usar

1. Inicie o backend.
2. Inicie o frontend.
3. Acesse `http://localhost:4200`.
4. Faça login com um usuário disponível no backend.
5. Use a listagem para consultar alunos.
6. Selecione Ativos, Inativos ou Todos para atualizar a tabela.
7. Use o campo de busca para pesquisar por nome ou matrícula.
8. Clique no ícone de visualização para abrir os detalhes.
9. Se estiver autenticado como Administrador, use **Novo Aluno** para cadastrar.
10. Clique em **Sair** para encerrar a sessão.

### Usuários locais de demonstração

Quando os inicializadores do backend estiverem ativos:

```text
Administrador
Login: admin
Senha: Admin@123
```

```text
Leitura
Login: leitura
Senha: Leitura@123
```

> Essas credenciais são destinadas ao ambiente local de demonstração. Não devem ser usadas em produção.

## Scripts disponíveis

Executar o servidor de desenvolvimento:

```bash
npm start
```

Gerar o build:

```bash
npm run build
```

Executar build em modo de observação:

```bash
npm run watch
```

Executar testes:

```bash
npm test
```

Executar o Angular CLI:

```bash
npm run ng -- COMANDO
```

## Integração com a API

URL local padrão:

```text
http://localhost:8080
```

Operações consumidas pela versão atual:

```http
POST /auth/login
GET  /alunos
GET  /alunos/{id}
POST /alunos
```

Parâmetros utilizados na listagem:

```text
page
size
status
busca
```

Exemplo:

```text
GET /alunos?page=0&size=10&status=ATIVO&busca=Amanda
```

## Estrutura sugerida

```text
src/app/
├── core/
│   ├── guards/
│   ├── interceptors/
│   └── services/
├── features/
│   ├── alunos/
│   │   ├── cadastro/
│   │   ├── detalhes/
│   │   └── listagem/
│   └── autenticacao/
│       └── login/
├── shared/
│   └── models/
└── app.routes.ts
```

## Validações e tratamento de erros

O cadastro valida:

- nome obrigatório, entre 3 e 150 caracteres no frontend;
- CPF obrigatório, com 11 números;
- e-mail obrigatório e em formato válido;
- telefone obrigatório, com 10 ou 11 números.

A interface também trata respostas como:

- `400 Bad Request`;
- `401 Unauthorized`;
- `403 Forbidden`;
- `404 Not Found`;
- `409 Conflict`;
- indisponibilidade do backend.

O backend continua sendo responsável pela validação e autorização definitivas.

## Limitações conhecidas

- edição de aluno não implementada no frontend;
- exclusão de aluno não implementada no frontend;
- busca e filtros precisam de uma revisão final de integração em todos os cenários;
- ausência de guard específico para Administrador;
- token sem fluxo de renovação automática;
- mensagens de erro ainda podem ser centralizadas;
- avisos de budget no build;
- configuração da URL da API ainda pode ser movida para arquivos de ambiente;
- cobertura de testes ainda limitada.

## Próximos passos

- criar a tela de edição;
- criar a exclusão com confirmação Material;
- implementar guard de Administrador;
- validar busca parcial por nome e matrícula;
- implementar configuração por ambientes;
- criar tratamento centralizado de erros;
- ampliar os testes automatizados;
- otimizar o bundle e os imports do Angular Material;
- adicionar máscaras de CPF e telefone;
- melhorar acessibilidade e experiência responsiva.
