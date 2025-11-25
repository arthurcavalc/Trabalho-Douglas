
# Task Manager – Full Stack (Frontend + Backend + Database)

## Integrantes do Grupo
- Arthur Cavalcanti Mariz Cabral  
- João Victor da Cunha Santos  
- Ítalo Mendes da Silva  
- João da Costa Lima e Silva  
- Ruan Pedro de Queiroz Melo  

---

Este projeto foi desenvolvido para atender aos requisitos acadêmicos de desenvolvimento Full Stack,
incluindo frontend, backend e banco de dados com deploy em nuvem.

## Tecnologias utilizadas

### Frontend
- React + Vite  
- Typescript  
- Axios  
- Zod  

### Backend
- Node.js + Express  
- Typescript  
- Prisma ORM  
- Zod  
- PostgreSQL  

## Funcionalidades

- CRUD completo de tarefas  
- Filtro por status  
- Busca por título  
- Ordenação por data de criação  
- Contador de tarefas por status  
- Validação com Zod (frontend e backend)  
- Integração via Axios  
- Deploy em plataformas como Render, Railway, Vercel ou Netlify  

---

## Como rodar o projeto localmente

### 1. Backend

```
cd backend
npm install
cp .env.example .env
# Preencha o DATABASE_URL com o Postgres da nuvem
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Servidor em:
```
http://localhost:3333
```

---

### 2. Frontend

```
cd frontend
npm install
npm run dev
```

Acesse:
```
http://localhost:5173
```

---

## Como realizar o deploy

### Backend
- Subir repositório no GitHub  
- Criar serviço no Render/Railway  
- Configurar variável DATABASE_URL  
- Build: `npm install && npm run build`  
- Start: `npm start`  

### Frontend
- Subir repositório no GitHub  
- Deploy na Vercel/Netlify apontando para a pasta `frontend`  
- Atualizar `baseURL` do axios para a URL pública do backend  

---

## Requisitos atendidos

✔ Frontend e backend em Typescript  
✔ Banco PostgreSQL com Prisma  
✔ Axios para integração  
✔ Validação completa com Zod  
✔ CRUD funcional  
✔ Funcionalidades extras implementadas  
✔ Deploy em nuvem  
✔ Repositório público no GitHub  

---

## Observações finais
O projeto está estruturado para fácil avaliação, com separação clara de backend e frontend,
além de documentação completa para execução e manutenção.
