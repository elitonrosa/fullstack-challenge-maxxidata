# Desafio Full Stack - Controle de Profissionais

<hr>

Este é um projeto de controle de profissionais desenvolvido como parte de um desafio Full Stack proposto pela Maxxidata. O objetivo deste projeto é criar uma aplicação que permite consultar, criar e editar informações sobre profissionais e suas profissões correspondentes.


## Tecnologias Utilizadas

### Backend:

- Node.js
- TypeScript
- Nest.js 
- PostgreSQL
- TypeORM
- Swagger (Documentação da API)

### Frontend:

- Next.js 
- TypeScript
- Tailwind CSS
- Shadcn/UI (Componentes reutilizáveis com Tailwind e Radix)
- Lucide Icons + Radix Icons (Ícones)
- React Hook Form (Formulários)
- React Table (Tabelas)
- Zod (Validação de dados)

## Funcionalidades

### Backend
API REST com endpoints para:
- Consultar tipos de profissionais
- Consultar profissionais
- Criar tipos de profissionais
- Criar profissionais
- Editar tipos de profissionais
- Editar profissionais
- Testes unitários para garantir a integridade das funcionalidades
- Documentação da API com Swagger

### Frontend
Aplicação React com:
- Tela inicial com menu de acesso às funcionalidades
- Tela de listagem de Profissionais
- Tela de listagem de Profissões (Tipos de profissionais)
- Tela de cadastro de Profissionais
- Tela de cadastro de Profiões (Tipos de profissionais)
- Tela de edição de Profissionais
- Tela de edição de Profissões (Tipos de profissionais)
- Next.js para SSR
- Cache de dados com Next.js (Aumentando a performance e reduzindo o número de requisições no backend/banco de dados)

## Instruções de Execução

Requisitos:
- Docker

Para executar a aplicação completa, siga os passos abaixo:
- Clone este repositório e acesse a pasta do projeto
- Crie uma cópia do arquivo .env.example e renomeie para .env (Já contém as variáveis de ambiente necessárias para o projeto)
- Execute o comando docker-compose up -d (Para criar os containers do banco de dados e da aplicação)
- Acesse a aplicação em http://localhost:3000
- A API estará disponível em http://localhost:9999
- Acesse a documentação da API em http://localhost:9999/api
- O banco de dados estará disponível em http://localhost:5432

## Decisões de Projeto

### Backend
- **Nest.js**: Foi escolhido por ser um framework que já possuo familiaridade e por ser um framework que permite a criação de aplicações backend robustas de forma rápida.
-  **TypeORM**: ORM que possui uma excelente integração com o Nest.js, permitindo a criação de entidades e repositórios de forma simples e rápida.
- **PostgreSQL**: Banco de dados relacional open source e excelente performance. Foi escolhido por ser open source e por ser um banco de dados que já possuo experiência.
- **Swagger**: Ferramenta para documentação de APIs REST, que permite a criação de documentação de forma simples e rápida, além de permitir a execução de testes diretamente na documentação.
- **Testes Unitários**: Foram criados testes unitários (na camada service) para garantir a integridade das funcionalidades da aplicação. (Testes de integração também são importantes, mas não foram criados neste projeto por questões de tempo). 

### Frontend
- **Next.js**: Foi escolhido por ser um framework que já possuo familiaridade e por ser um framework que permite a criação de aplicações frontend robustas e performáticas, além de permitir a criação de aplicações SSR e SSG.
- **Tailwind CSS**: Foi escolhido por proporcionar agilidade no desenvolvimento e funcionar perfeitamente com comoponentes renderizados no lado servidor.
- **Shadcn/UI**: Componentes reutilizáveis criados com Tailwind e Radix. Foi escolhido por ser possível utilizar em componenentes no lado servidor.
-  **React Hook Form**: Foi escolhido por ser uma biblioteca que permite a criação de formulários de forma simples e rápida.
- **React Table**: Foi escolhido por ser uma biblioteca que permite a criação de tabelas complexas de forma rápida.
- **Zod**: Foi escolhido por ser uma biblioteca que possui uma excelente integração com o React Hook Form.

<hr>

## Tipos de dados retornados pela API

### Todos os profissionais
```json
{
  "data": [
    {
      "id": 1,
      "name": "Maria da Silva Santos",
      "phone": "(22) 98765-4321",
      "email": "mariasilva@email.com",
      "status": true,
      "createdAt": "2023-09-10T02:35:01.075Z",
      "updatedAt": "2023-09-10T02:46:21.595Z",
      "professionalType": {
        "id": 2,
        "description": "Analista de Sistemas",
        "status": true,
        "createdAt": "2023-09-10T02:35:01.075Z",
        "updatedAt": "2023-09-10T02:35:01.075Z"
      }
    },
    {
      ...
    }
  ],
  "total": 20,
  "pageSize": 10,
  "page": 1,
  "totalPages": 2
}
```

### Todos os tipos de profissionais
```json
{
  "data": [
    {
      "id": 1,
      "description": "Desenvolvedor",
      "status": true,
      "createdAt": "2023-09-10T02:35:01.075Z",
      "updatedAt": "2023-09-10T02:35:01.075Z"
    },
    {
      ...
    }
  ],
  "total": 20,
  "pageSize": 10,
  "page": 1,
  "totalPages": 2
}
```

### Um profissional
```json
{
  "id": 1,
  "name": "Maria da Silva Santos",
  "phone": "(22) 98765-4321",
  "email": "mariasilva@email.com",
  "status": true,
  "createdAt": "2023-09-10T02:35:01.075Z",
  "updatedAt": "2023-09-10T02:46:21.595Z",
  "professionalType": {
    "id": 2,
    "description": "Analista de Sistemas",
    "status": true,
    "createdAt": "2023-09-10T02:35:01.075Z",
    "updatedAt": "2023-09-10T02:35:01.075Z"
  }
}
```

### Um tipo de profissional
```json
{
  "id": 1,
  "description": "Desenvolvedor",
  "status": true,
  "createdAt": "2023-09-10T02:35:01.075Z",
  "updatedAt": "2023-09-10T02:35:01.075Z"
}
```

### Documentação da API
![Docs API](https://github.com/elitonrosa/fullstack-challenge-maxxidata/assets/78574588/e93ae1f2-627d-4b7a-a4b3-be4527f0fc56)

<hr>

## Telas da aplicação

### Home
![Home](https://github.com/elitonrosa/fullstack-challenge-maxxidata/assets/78574588/3217b3ca-7244-45dd-9e30-3c06cd40127d)

### Listagem de Profissionais
![Tela Profissionais](https://github.com/elitonrosa/fullstack-challenge-maxxidata/assets/78574588/383ac51b-be8e-4006-af05-64d3bacfe531)

### Listagem de Profissões
![Tela Profissões](https://github.com/elitonrosa/fullstack-challenge-maxxidata/assets/78574588/9421ffed-3d3f-40f2-a021-892b09169753)

### Cadastro de Profissionais
![Tela Criar Profissional](https://github.com/elitonrosa/fullstack-challenge-maxxidata/assets/78574588/ceda9885-0125-4a5b-a70e-5e7d8d2a6735)

### Cadastro de Profissões
![Tela Criar Profissão](https://github.com/elitonrosa/fullstack-challenge-maxxidata/assets/78574588/6ef82afe-45d2-4dd3-892e-cf66746b97b9)

### Edição de Profissionais
![Tela Editar Profissional](https://github.com/elitonrosa/fullstack-challenge-maxxidata/assets/78574588/a1f6cab1-b87a-4f92-ad0e-cf54c69eadf6)

### Edição de Profissões
![tela Editar Profissão](https://github.com/elitonrosa/fullstack-challenge-maxxidata/assets/78574588/aec6fcdf-d70e-4883-9473-6b05f8d1cede)

### Deletando um registro
![Tela Deletar Registro](https://github.com/elitonrosa/fullstack-challenge-maxxidata/assets/78574588/ec904f33-9485-48f6-8d4b-93c45d65f6a7)

### Menu editar/deletar um registro
![Menu editar e deletar](https://github.com/elitonrosa/fullstack-challenge-maxxidata/assets/78574588/d13fd1b2-13b4-4768-81ad-749d7a913604)