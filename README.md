# Let Me Ask

Aplicação fullstack para gerenciamento de salas de perguntas e respostas, desenvolvida durante o **NLW Agents** da Rocketseat.

## Stack Técnico

### Backend (API)
- **Runtime**: Node.js com suporte a TypeScript nativo
- **Framework**: Fastify
- **Banco de dados**: PostgreSQL com pgvector
- **ORM**: Drizzle ORM
- **Validação**: Zod
- **CORS**: Fastify CORS

### Frontend (Web)
- **Framework**: React 19
- **Bundler**: Vite
- **Roteamento**: React Router DOM
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + shadcn/ui
- **API Client**: TanStack React Query
- **Type Safety**: TypeScript

### Ferramentas Compartilhadas
- **Gerenciador de pacotes**: pnpm
- **Monorepo**: pnpm workspace
- **Formatação/Linting**: Biome

## Padrões de Projeto

- **Monorepo**: Estrutura workspace com `pnpm` para compartilhamento de dependências
- **Type Safety**: TypeScript em todo o projeto com validação runtime via Zod
- **Componentização**: Componentes reutilizáveis com Radix UI
- **API Client**: Separação entre API e consumidor com TanStack Query
- **Ambiente**: Variáveis de ambiente carregadas automaticamente

## Estrutura do Projeto

```
let-me-ask/
├── apps/
│   ├── api/              # Backend Fastify
│   │   ├── src/
│   │   │   ├── db/       # ORM, migrations, seed
│   │   │   ├── http/     # Rotas da API
│   │   │   └── server.ts # Entrada da aplicação
│   │   └── docker/       # Configuração SQL inicial
│   └── web/              # Frontend React + Vite
│       └── src/
│           ├── pages/    # Páginas
│           ├── components/ # UI Components
│           └── lib/      # Utilitários
└── biome.json            # Configuração de linting/formatting
```

## Setup e Configuração

### Pré-requisitos
- Node.js 18+
- pnpm
- Docker e Docker Compose

### 1. Instalar dependências
```bash
pnpm install
```

### 2. Configurar banco de dados
```bash
cd apps/api
docker-compose up -d
```

### 3. Configurar variáveis de ambiente
Criar arquivo `.env` em `apps/api/` baseado em `.env.example`:
```bash
PORT=3333
DATABASE_URL=postgresql://docker:docker@localhost:5432/let-me-ask
```

### 4. Executar migrações e seed
```bash
cd apps/api
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

## Scripts Disponíveis

### Backend (api)
```bash
pnpm dev          # Servidor em desenvolvimento com reload
pnpm start        # Servidor em produção
pnpm db:generate  # Gerar migrações do schema Drizzle
pnpm db:migrate   # Executar migrações pendentes
pnpm db:seed      # Popular banco com dados iniciais
pnpm db:studio    # Abrir Drizzle Studio
pnpm format       # Formatar código com Biome
```

### Frontend (web)
```bash
pnpm dev      # Servidor de desenvolvimento Vite
pnpm build    # Build para produção
pnpm preview  # Visualizar build de produção
pnpm format   # Formatar código com Biome
```

## Desenvolvido durante o NLW Agents 🚀

Este projeto foi desenvolvido como parte do evento **NLW Agents** organizado pela [Rocketseat](https://rocketseat.com.br), uma comunidade focada em educação em tecnologia.
