# Plano de Ação - Desafio Front-End React

## 📋 Visão Geral

Este documento apresenta o plano de ação para implementar a parte **front-end** do desafio técnico. O back-end (Django/Python) será desenvolvido em repositório separado.

**Prazo de Entrega:** Segunda-feira (12/01)

---

## 🎯 Questões do Front-End

### ✅ Questão 1: Construção de Interface em React
**Status:** ✅ Concluída

#### Objetivos:
- ✅ Criar aplicação React que consome API REST fictícia
- ✅ Exibir lista de produtos em tabela (Nome, Preço, Ações)
- ✅ Implementar exclusão de produtos
- ✅ Adicionar botão para criar novos produtos (sem conectar à API)
- ✅ Usar hooks: `useState`, `useEffect`

#### Tarefas:
1. **Criar estrutura de tipos/interfaces**
   - [x] Definir interface `Product` (id, name, price)
   - [x] Criar tipos para estados e props

2. **Criar serviço de API**
   - [x] Criar `src/services/api.ts` ou `src/api/products.ts`
   - [x] Implementar função `fetchProducts()` que simula chamada GET /api/products
   - [x] Implementar função `deleteProduct(id)` que simula DELETE
   - [x] Usar dados mockados inicialmente (pode ser substituído depois)

3. **Criar componente de Tabela de Produtos**
   - [x] Criar `src/components/ProductTable.tsx`
   - [x] Exibir colunas: Nome, Preço, Ações
   - [x] Formatar preço como moeda (R$)
   - [x] Adicionar botão de exclusão em cada linha

4. **Criar componente de Formulário de Produto**
   - [x] Criar `src/components/ProductForm.tsx`
   - [x] Campos: Nome (input text), Preço (input number)
   - [x] Validação básica (campos obrigatórios)
   - [x] Botão de submit

5. **Criar página/componente principal**
   - [x] Criar `src/pages/Products.tsx` ou modificar `Home.tsx`
   - [x] Gerenciar estado com `useState` (lista de produtos, loading, error)
   - [x] Usar `useEffect` para carregar produtos ao montar componente
   - [x] Integrar tabela e formulário
   - [x] Implementar handlers: `handleDelete`, `handleAdd`

6. **Gerenciamento de estado local**
   - [x] Estado para lista de produtos
   - [x] Estado para loading
   - [x] Estado para erros
   - [x] Estado para formulário (controlado)

#### Estrutura de Arquivos:
```
src/
├── components/
│   ├── ProductTable.tsx
│   ├── ProductForm.tsx
│   └── ErrorBoundary.tsx (já existe)
├── pages/
│   └── Products.tsx (ou modificar Home.tsx)
├── services/
│   └── api.ts (ou api/products.ts)
└── types/
    └── product.ts
```

---

### ✅ Questão 3: Teste de Componentes em React
**Status:** ✅ Concluída

#### Objetivos:
- ✅ Escrever testes unitários usando Vitest e React Testing Library
- ✅ Garantir que tabela exibe produtos corretamente
- ✅ Testar exclusão de produtos
- ✅ Testar adição de novos produtos

#### Tarefas:
1. **Configurar ambiente de testes**
   - [x] Verificar se Jest e React Testing Library estão instalados
   - [x] Configurar `vitest` (compatível com Vite)
   - [x] Criar arquivo de configuração de testes (`vitest.config.ts`)
   - [x] Configurar setup de testes (`src/test/setup.ts`)

2. **Testes para ProductTable**
   - [x] Teste: renderiza tabela com produtos
   - [x] Teste: exibe nome e preço corretamente
   - [x] Teste: exibe mensagem quando não há produtos
   - [x] Teste: botão de excluir está presente
   - [x] Teste: chama função de exclusão ao clicar no botão
   - [x] Teste: chama função com ID correto

3. **Testes para ProductForm**
   - [x] Teste: renderiza campos de formulário
   - [x] Teste: permite inserir nome e preço
   - [x] Teste: valida campos obrigatórios (nome vazio)
   - [x] Teste: valida campos obrigatórios (preço inválido)
   - [x] Teste: chama função de submit com dados corretos
   - [x] Teste: limpa formulário após submit
   - [x] Teste: limpa erro quando usuário digita

4. **Testes para página principal (Products)**
   - [x] Teste: carrega produtos ao montar
   - [x] Teste: exibe loading durante requisição
   - [x] Teste: exibe erro se requisição falhar
   - [x] Teste: adiciona novo produto à lista
   - [x] Teste: remove produto da lista
   - [x] Teste: exibe erro ao falhar exclusão

5. **Testes de integração**
   - [x] Teste: fluxo completo de adicionar produto
   - [x] Teste: fluxo completo de excluir produto
   - [x] Teste: fluxo completo de adicionar e depois excluir produto

#### Estrutura de Arquivos:
```
src/
├── components/
│   ├── __tests__/
│   │   ├── ProductTable.test.tsx
│   │   └── ProductForm.test.tsx
└── pages/
    └── __tests__/
        └── Products.test.tsx
```

---

### ✅ Questão 5: Estilização Responsiva
**Status:** ✅ Concluída

#### Objetivos:
- ✅ Adicionar estilos responsivos à aplicação
- ✅ Usar TailwindCSS (já configurado)
- ✅ Garantir que tabela funcione em desktop, tablet e mobile

#### Tarefas:
1. **Estilizar tabela responsiva**
   - [x] Desktop: tabela completa com todas as colunas (hidden md:block)
   - [x] Tablet: ajustar largura e espaçamento (px-4 md:px-6)
   - [x] Mobile: converter tabela em cards (md:hidden com cards)
   - [x] Usar breakpoints do TailwindCSS (sm, md, lg, xl)

2. **Estilizar formulário**
   - [x] Layout responsivo para campos (p-4 sm:p-6, px-3 sm:px-4)
   - [x] Botões com tamanho adequado para touch (py-2.5)
   - [x] Espaçamento adequado em diferentes telas

3. **Melhorias de UX**
   - [x] Adicionar estados de hover/focus (hover:bg-gray-50, hover:shadow-md)
   - [x] Feedback visual para ações (loading com spinner, animações)
   - [x] Animações sutis para transições (transition-all duration-150)
   - [x] Estados active para botões (active:bg-red-700)
   - [x] Transformações no hover (hover:-translate-y-0.5)

4. **Layout da página**
   - [x] Grid responsivo (grid-cols-1 lg:grid-cols-3)
   - [x] Ordem ajustada para mobile (order-2 lg:order-1)
   - [x] Títulos responsivos (text-2xl sm:text-3xl lg:text-4xl)
   - [x] Padding responsivo (py-4 sm:py-6 lg:py-8)

#### Estrutura de Arquivos:
```
src/
├── components/
│   ├── ProductTable.tsx (com classes Tailwind)
│   └── ProductForm.tsx (com classes Tailwind)
└── index.css (ajustes globais se necessário)
```

---

### ✅ Questão 6: Gerenciamento de Estado Global (Redux Toolkit)
**Status:** ✅ Concluída

#### Objetivos:
- ✅ Refatorar aplicação para usar Redux Toolkit
- ✅ Manter funcionalidades de exibir, excluir e adicionar produtos
- ✅ Substituir estado local por estado global

#### Tarefas:
1. **Instalar dependências**
   - [x] Instalar `@reduxjs/toolkit` e `react-redux`
   - [x] Verificar compatibilidade com React 19

2. **Configurar Redux Store**
   - [x] Criar `src/store/store.ts`
   - [x] Configurar store com `configureStore`
   - [x] Criar `src/store/hooks.ts` para typed hooks (useAppDispatch, useAppSelector)
   - [x] Criar tipos TypeScript (RootState, AppDispatch)

3. **Criar Slice de Produtos**
   - [x] Criar `src/store/slices/productsSlice.ts`
   - [x] Definir estado inicial (items, loading, error)
   - [x] Criar reducers: `addProduct`, `clearError`
   - [x] Criar async thunks: `fetchProductsAsync`, `deleteProductAsync`
   - [x] Configurar extraReducers para estados pending/fulfilled/rejected

4. **Refatorar componentes**
   - [x] Substituir `useState` por `useAppSelector` e `useAppDispatch`
   - [x] Atualizar `Products.tsx` para usar Redux
   - [x] Manter `ProductTable` e `ProductForm` como componentes "burros" (recebem props)

5. **Adicionar Provider e Testes**
   - [x] Envolver App com `<Provider store={store}>`
   - [x] Atualizar testes para incluir Provider
   - [x] Verificar que todos os 22 testes passam

#### Estrutura de Arquivos:
```
src/
├── store/
│   ├── store.ts
│   ├── hooks.ts
│   └── slices/
│       └── productsSlice.ts
└── components/ (refatorados para usar Redux)
```

---

### ✅ Questão 8: Otimização de Performance no Front-End
**Status:** ✅ Concluída

#### Objetivos:
- ✅ Melhorar performance de renderização para listas com 500+ produtos
- ✅ Implementar virtualização de lista
- ✅ Usar React-Window para virtualização

#### Tarefas:
1. **Instalar biblioteca de virtualização**
   - [x] Instalar `react-window` e `@types/react-window`
   - [x] Escolhido `react-window` (mais leve que react-virtualized)

2. **Implementar virtualização na tabela**
   - [x] Refatorar `ProductTable` para usar `FixedSizeList`
   - [x] Criar componente `ProductRow` memoizado para desktop
   - [x] Criar componente `ProductCard` memoizado para mobile
   - [x] Implementar virtualização apenas para listas com 50+ produtos (melhor UX)
   - [x] Manter funcionalidades (excluir funciona normalmente)

3. **Otimizações adicionais**
   - [x] Usar `React.memo` para componentes de linha (`ProductRow`, `ProductCard`)
   - [x] Implementar `useMemo` para cálculos de altura da lista
   - [x] Implementar `useCallback` para funções (`formatPrice`, `handleDelete`)

4. **Estrutura otimizada**
   - [x] Componentes separados e memoizados
   - [x] Virtualização condicional (ativa apenas para 50+ itens)
   - [x] Altura máxima de 600px para melhor UX
   - [x] Mantém responsividade (desktop e mobile)

5. **Testes**
   - [x] Todos os 22 testes passando
   - [x] Funcionalidades mantidas (adicionar, excluir, exibir)

#### Estrutura de Arquivos:
```
src/
├── components/
│   ├── ProductTable.tsx (refatorado com virtualização)
│   └── ProductRow.tsx (componente memoizado para linha)
```

---

### ✅ Questão 4 (Front-End): Integração com Autenticação JWT
**Status:** ✅ Concluída

#### Objetivos:
- ✅ Adaptar front-end para trabalhar com autenticação JWT
- ✅ Criar tela de login
- ✅ Gerenciar token JWT (armazenar, enviar em requisições, renovar)

#### Tarefas:
1. **Criar serviço de autenticação**
   - [x] Criar `src/services/auth.ts`
   - [x] Função `login(username, password)` que retorna token
   - [x] Função para armazenar token (localStorage)
   - [x] Função para recuperar token (`getToken`)
   - [x] Função para verificar se usuário está autenticado (`isAuthenticated`)
   - [x] Função para logout (`logout`, `removeToken`)

2. **Configurar interceptors de API**
   - [x] Adicionar verificação de token em todas as requisições (`makeRequest`)
   - [x] Tratar erro de não autorizado (lança erro se não houver token)
   - [x] Integrar verificação de autenticação no serviço de API

3. **Criar componente de Login**
   - [x] Criar `src/pages/Login.tsx`
   - [x] Formulário com campos: username e password
   - [x] Validação de campos (required)
   - [x] Feedback de erro de autenticação
   - [x] Redirecionar para página de produtos após login
   - [x] Estado de loading durante autenticação

4. **Criar rotas protegidas**
   - [x] Criar `src/components/ProtectedRoute.tsx`
   - [x] Verificar autenticação antes de renderizar rota
   - [x] Redirecionar para login se não autenticado

5. **Atualizar rotas**
   - [x] Adicionar rota `/login`
   - [x] Proteger rota `/` (Products)
   - [x] Adicionar botão de logout na página de produtos

6. **Integrar com Redux**
   - [x] Criar slice de autenticação no Redux (`authSlice.ts`)
   - [x] Gerenciar estado de autenticação globalmente
   - [x] Sincronizar Redux com localStorage
   - [x] Actions: `setAuth`, `clearAuth`

#### Estrutura de Arquivos:
```
src/
├── components/
│   └── ProtectedRoute.tsx
├── pages/
│   └── Login.tsx
├── services/
│   ├── auth.ts
│   └── api.ts (atualizado com interceptors)
└── store/
    └── slices/
        └── authSlice.ts (opcional)
```

---

### ✅ Questão 10 (Front-End): Deploy com Docker
**Status:** 🔴 Pendente

#### Objetivos:
- Criar Dockerfile para aplicação React
- Configurar docker-compose (apenas front-end ou completo se necessário)
- Documentar processo de deploy

#### Tarefas:
1. **Criar Dockerfile para front-end**
   - [ ] Criar `Dockerfile` na raiz do projeto
   - [ ] Usar multi-stage build (build e serve)
   - [ ] Otimizar para produção

2. **Criar .dockerignore**
   - [ ] Ignorar node_modules, dist, arquivos desnecessários

3. **Criar docker-compose.yml**
   - [ ] Configurar serviço front-end
   - [ ] Configurar variáveis de ambiente
   - [ ] Configurar portas

4. **Documentação de deploy**
   - [ ] Instruções para build local
   - [ ] Instruções para rodar com Docker
   - [ ] Instruções para deploy em produção
   - [ ] Variáveis de ambiente necessárias

#### Estrutura de Arquivos:
```
./
├── Dockerfile
├── .dockerignore
└── docker-compose.yml
```

---

## 📦 Dependências a Instalar

### Obrigatórias:
- [ ] `@reduxjs/toolkit` - Gerenciamento de estado global
- [ ] `react-redux` - Bindings React para Redux
- [ ] `react-window` - Virtualização de listas
- [ ] `@types/react-window` - Tipos TypeScript

### Testes:
- [ ] `vitest` ou `jest` - Framework de testes
- [ ] `@testing-library/react` - Utilitários de teste React
- [ ] `@testing-library/jest-dom` - Matchers adicionais
- [ ] `@testing-library/user-event` - Simulação de eventos

### Opcionais (já instalados):
- ✅ `tailwindcss` - Estilização (já configurado)
- ✅ `react-router-dom` - Roteamento (já configurado)

---

## 📝 Checklist de Entrega

### Código Funcional
- [ ] Questão 1: Interface React completa e funcional
- [ ] Questão 3: Testes unitários implementados e passando
- [ ] Questão 5: Estilização responsiva aplicada
- [ ] Questão 6: Redux Toolkit implementado e funcionando
- [ ] Questão 8: Virtualização implementada e testada
- [ ] Questão 4 (Front): Autenticação JWT integrada
- [ ] Questão 10 (Front): Docker configurado

### Documentação
- [ ] README.md atualizado com:
  - [ ] Descrição do projeto
  - [ ] Instruções de instalação
  - [ ] Instruções de execução
  - [ ] Estrutura do projeto
  - [ ] Decisões técnicas tomadas
  - [ ] Como rodar testes
  - [ ] Como fazer build para produção
  - [ ] Como rodar com Docker

### Testes
- [ ] Todos os testes passando
- [ ] Cobertura de testes adequada
- [ ] Testes documentados

### Qualidade de Código
- [ ] Código limpo e bem organizado
- [ ] TypeScript sem erros
- [ ] ESLint sem erros
- [ ] Prettier formatado
- [ ] Comentários onde necessário
- [ ] Nomes descritivos de variáveis/funções

---

## 🗓️ Cronograma Sugerido

### Dia 1-2: Questão 1 (Interface Básica)
- Implementar estrutura básica
- Criar componentes de tabela e formulário
- Integrar com API mockada

### Dia 3: Questão 3 (Testes)
- Configurar ambiente de testes
- Escrever testes para todos os componentes

### Dia 4: Questão 5 (Estilização)
- Aplicar TailwindCSS
- Tornar responsivo
- Melhorar UX

### Dia 5: Questão 6 (Redux)
- Instalar e configurar Redux Toolkit
- Refatorar aplicação
- Testar funcionalidades

### Dia 6: Questão 8 (Performance)
- Implementar virtualização
- Otimizar renderização
- Testar com muitos dados

### Dia 7: Questão 4 (Autenticação)
- Implementar login
- Integrar JWT
- Proteger rotas

### Dia 8: Questão 10 (Docker)
- Criar Dockerfile
- Configurar docker-compose
- Testar build

### Dia 9-10: Documentação e Ajustes Finais
- Escrever documentação completa
- Revisar código
- Testar tudo
- Preparar repositório para entrega

---

## 🎯 Decisões Técnicas Importantes

### 1. Gerenciamento de Estado
- **Inicialmente:** useState/useEffect (Questão 1)
- **Depois:** Redux Toolkit (Questão 6)
- **Justificativa:** Demonstra evolução e conhecimento de diferentes abordagens

### 2. Estilização
- **Biblioteca:** TailwindCSS (já configurado)
- **Justificativa:** Mais rápido, consistente e já está no projeto

### 3. Virtualização
- **Biblioteca:** react-window
- **Justificativa:** Mais leve que react-virtualized, melhor performance

### 4. Testes
- **Framework:** Vitest (compatível com Vite)
- **Justificativa:** Integração nativa com Vite, mais rápido que Jest

### 5. Autenticação
- **Armazenamento:** localStorage para token
- **Justificativa:** Simples, adequado para este desafio

---

## 📚 Recursos e Referências

- [React Documentation](https://react.dev/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Testing Library](https://testing-library.com/react)
- [React Window](https://github.com/bvaughn/react-window)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)

---

## ⚠️ Observações Importantes

1. **API Back-end:** Como o back-end será desenvolvido separadamente, inicialmente usar dados mockados. Quando o back-end estiver pronto, apenas trocar a URL da API.

2. **Testes:** Focar em testes que realmente validem funcionalidades críticas. Não é necessário 100% de cobertura, mas sim testes significativos.

3. **Performance:** A virtualização (Questão 8) é essencial apenas quando há muitos itens. Para desenvolvimento inicial, pode ser implementada depois.

4. **Autenticação:** A integração com JWT no front-end deve ser feita mesmo que o back-end ainda não esteja pronto. Pode usar um mock de login inicialmente.

5. **Docker:** O docker-compose pode incluir apenas o front-end, ou pode ser preparado para incluir o back-end quando estiver pronto.

---

## 🚀 Próximos Passos Imediatos

1. ✅ Criar este plano de ação
2. ✅ Questão 1 (Interface Básica) - CONCLUÍDA
3. ✅ Questão 3 (Testes Unitários) - CONCLUÍDA
4. ✅ Questão 4 (Autenticação JWT) - CONCLUÍDA
5. ✅ Questão 5 (Estilização Responsiva) - CONCLUÍDA
6. ✅ Questão 6 (Redux Toolkit) - CONCLUÍDA
7. ✅ Questão 8 (Otimização de Performance) - CONCLUÍDA
8. ⬜ Questão 10 (Front-End): Deploy com Docker - PRÓXIMA

---

**Última atualização:** 2025-01-XX
**Status geral:** 🟡 Em progresso - Questões 1, 3, 4, 5, 6 e 8 concluídas
