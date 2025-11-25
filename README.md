
## Integrantes do Grupo
- Arthur Cavalcanti Mariz Cabral  
- João Victor da Cunha Santos  
- Ítalo Mendes da Silva  
- João da Costa Lima e Silva  
- Ruan Pedro de Queiroz Melo  

---

Este projeto foi desenvolvido como parte da disciplina de desenvolvimento web, com o objetivo de criar uma aplicação completa utilizando frontend, backend e banco de dados, todos escritos em Typescript.

A ideia escolhida pelo grupo foi um sistema simples de gerenciamento de tarefas, permitindo criar, editar, listar e excluir tarefas, além de oferecer alguns recursos extras como filtros e busca.

---

## Sobre o Projeto

O sistema possui duas partes principais:

### Backend
Desenvolvido com Node.js, Express e Prisma, utilizando PostgreSQL como banco de dados.  
O backend é responsável por gerenciar as tarefas (CRUD) e aplicar regras de validação antes de salvar qualquer informação no banco.

### Frontend
Desenvolvido com React + Vite.  
A interface permite cadastrar novas tarefas, listar as já existentes, editar e excluir.  
Também foram adicionados filtros por status, campo de busca por título e um pequeno resumo com a quantidade de tarefas em cada categoria.

---

## Tecnologias Utilizadas

### Frontend
- React  
- Typescript  
- Vite  
- Axios  
- Zod  

### Backend
- Node.js  
- Express  
- Typescript  
- Prisma ORM  
- PostgreSQL  
- Zod  

---

## Funcionalidades

- Cadastro de tarefas  
- Listagem geral  
- Edição  
- Exclusão  
- Filtro por status  
- Busca por título  
- Contador de tarefas por categoria  
- Validação de dados tanto no frontend quanto no backend

---

## Estrutura das Pastas

```
backend/
  src/
  prisma/
  package.json

frontend/
  src/
  package.json
```

---

## Como executar localmente 

### Backend
- Instalar dependências com `npm install`  
- Configurar a variável de ambiente para o banco  
- Rodar o servidor com `npm run dev`  

### Frontend
- Instalar dependências com `npm install`  
- Rodar com `npm run dev`  

---
