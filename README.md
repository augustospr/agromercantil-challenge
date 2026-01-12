# 🛒 Sistema de Gerenciamento de Produtos - Agromercantil

Sistema web moderno para gerenciamento de produtos desenvolvido com React, TypeScript e Redux Toolkit. Aplicação front-end completa com autenticação JWT, listagem virtualizada de produtos, testes unitários e de integração, e integração com API Django REST Framework.

## ✨ Funcionalidades

- 🔐 **Autenticação JWT**: Login seguro com tokens JWT
- 📦 **Gerenciamento de Produtos**: Criar, listar e excluir produtos
- 🎨 **Interface Moderna**: Design responsivo com TailwindCSS
- ⚡ **Performance Otimizada**: Lista virtualizada para grandes volumes de dados
- 🌐 **Internacionalização**: Suporte para Português, Inglês e Espanhol
- 🧪 **Testes Completos**: Cobertura de testes unitários e de integração
- 🔄 **Estado Global**: Gerenciamento de estado com Redux Toolkit
- 🛡️ **Rotas Protegidas**: Proteção de rotas autenticadas

## 🚀 Tecnologias

- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Redux Toolkit** - Gerenciamento de estado
- **React Router DOM** - Roteamento
- **TailwindCSS** - Estilização
- **Vitest** - Framework de testes
- **React Testing Library** - Testes de componentes
- **React Window** - Virtualização de listas
- **i18next** - Internacionalização

## 📋 Pré-requisitos

- Node.js 18+ e npm
- Backend Django rodando em `http://localhost:8000` (ou configurar via variável de ambiente)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd agromercantil-challenge
```

2. Instale as dependências:
```bash
npm install
```

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (opcional):

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

Se não configurar, o padrão será `http://localhost:8000/api`.

### Backend

Certifique-se de que o backend Django está rodando:

```bash
# No diretório do backend Django
python manage.py runserver
```

O backend deve estar acessível em `http://localhost:8000/api`.

## 🏃 Como Executar

### Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

Os arquivos otimizados estarão em `dist/`

### Preview da Build

```bash
npm run preview
```

## 🧪 Testes

### Executar todos os testes

```bash
npm run test:run
```

### Executar testes em modo watch

```bash
npm test
```

### Interface visual de testes

```bash
npm run test:ui
```

### Cobertura de Testes

- ✅ Testes unitários de componentes
- ✅ Testes de integração de fluxos completos
- ✅ Testes de formulários e validações
- ✅ Testes de autenticação e rotas protegidas

**Total: 22 testes passando** ✅

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── __tests__/      # Testes dos componentes
│   ├── ErrorBoundary.tsx
│   ├── ProductCard.tsx
│   ├── ProductForm.tsx
│   ├── ProductRow.tsx
│   ├── ProductTable.tsx
│   └── ProtectedRoute.tsx
├── config/             # Configurações
│   └── api.ts          # Configuração da API
├── i18n/               # Internacionalização
│   ├── config.ts
│   └── locales/        # Traduções (pt, en, es)
├── pages/              # Páginas da aplicação
│   ├── __tests__/      # Testes das páginas
│   ├── Home.tsx
│   ├── Login.tsx
│   └── Products.tsx
├── services/           # Serviços de API
│   ├── api.ts          # Serviços de produtos
│   └── auth.ts         # Serviços de autenticação
├── store/              # Redux store
│   ├── hooks.ts        # Hooks tipados do Redux
│   ├── slices/         # Redux slices
│   │   ├── authSlice.ts
│   │   └── productsSlice.ts
│   └── store.ts        # Configuração do store
├── types/              # Tipos TypeScript
│   └── product.ts
└── test/               # Configuração de testes
    └── setup.ts
```

## 🔌 Integração com Backend

A aplicação consome uma API Django REST Framework com os seguintes endpoints:

### Autenticação

- `POST /api/auth/login/` - Login e obtenção de token JWT
- `POST /api/auth/refresh/` - Refresh do token JWT

### Produtos

- `GET /api/products/` - Listar produtos (com paginação)
- `POST /api/products/` - Criar novo produto
- `DELETE /api/products/{id}/` - Excluir produto

### Autenticação

Todas as requisições de produtos requerem autenticação via header:

```
Authorization: Bearer <token>
```

O token é armazenado no `localStorage` e automaticamente incluído nas requisições.

## 🔑 Credenciais de Teste

Para fazer login no sistema, use:

- **Usuário**: `admin`
- **Senha**: `admin`

## 📜 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview da build de produção
- `npm test` - Executa testes em modo watch
- `npm run test:run` - Executa todos os testes uma vez
- `npm run test:ui` - Abre interface visual de testes
- `npm run lint` - Verifica erros de linting
- `npm run lint:fix` - Corrige erros de linting automaticamente

## 🎨 Características de UI/UX

- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Lista Virtualizada**: Performance otimizada para listas grandes
- **Feedback Visual**: Loading states, mensagens de erro e sucesso
- **Acessibilidade**: Labels, ARIA attributes e navegação por teclado
- **Animações Suaves**: Transições e estados de hover/focus

## 🛡️ Segurança

- Tokens JWT armazenados de forma segura
- Rotas protegidas com verificação de autenticação
- Validação de formulários no front-end
- Tratamento de erros de API
- Refresh automático de tokens expirados

## 📝 Licença

Este projeto foi desenvolvido como parte de um desafio técnico.

## 👨‍💻 Desenvolvido com

- Clean Code principles
- Best practices do React
- TypeScript para type safety
- Testes automatizados
- Código limpo e manutenível

---

**Status do Projeto**: ✅ Completo e funcional
