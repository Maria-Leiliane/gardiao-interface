# 🛡️ Go Guardião - Frontend (SPA)

Esta é a Single Page Application (SPA) do **Go Guardião**, desenvolvida em Angular. O projeto é uma plataforma de gerenciamento de hábitos que utiliza elementos de gamificação (sistema de Mana, desafios e placares) para incentivar o engajamento do usuário.

## 🚀 Tecnologias Utilizadas

* **Framework:** Angular (SPA)
* **Linguagem:** TypeScript
* **Estilização:** CSS / SCSS (Adicionar frameworks como Tailwind ou Material, se houver)
* **Comunicação HTTP:** RxJS e `HttpClient` padrão do Angular
* **Autenticação:** JWT (JSON Web Tokens) com HTTP Interceptors

---

## 🏗️ Arquitetura do Projeto

O projeto segue uma arquitetura modular baseada em **Core**, **Features** e **Shared**, garantindo separação de responsabilidades e facilitando a manutenção.

```text
src/
├── app/
│   ├── core/           # Serviços globais (Singleton), interceptors e guards
│   │   ├── services/   # Comunicação com a API (auth, user, habit, gamification)
│   │   ├── interceptors/# auth.interceptor.ts (Injeta o JWT nas requisições)
│   │   ├── guards/     # auth.guard.ts (Protege rotas não autenticadas)
│   │   └── models/     # Interfaces TypeScript (DTOs da API)
│   ├── features/       # Módulos isolados por funcionalidade (Lazy Loading recomendado)
│   │   ├── auth/       # Telas de Login e Registro
│   │   ├── dashboard/  # Tela principal do usuário logado
│   │   ├── habits/     # CRUD e visualização de hábitos
│   │   ├── profile/    # Gestão de dados do usuário e contatos de suporte
│   │   └── gamification/# Mana, Leaderboard e Desafios
│   └── shared/         # Componentes burros (UI), pipes e diretivas reutilizáveis
│       └── components/ # Botões, Modais, Cards, etc.

```

---

## 🔌 Integração com a API (Endpoints)

A aplicação consome a API RESTful do Go Guardião. Todas as requisições protegidas passam automaticamente pelo `auth.interceptor.ts`, que anexa o token JWT no cabeçalho (`Authorization: Bearer <token>`).

### 🔐 Autenticação (Públicos)

Gerenciado pelo `auth.service.ts`

* `POST /api/v1/auth/register` - Registro de novo usuário
* `POST /api/v1/auth/login` - Autenticação e resgate do token JWT

### 👤 Usuários (Protegidos)

Gerenciado pelo `user.service.ts`

* `GET    /api/v1/user/profile` - Retorna dados do perfil
* `PUT    /api/v1/user/profile` - Atualiza dados do perfil
* `PUT    /api/v1/user/email` - Atualiza e-mail
* `PUT    /api/v1/user/password` - Atualiza senha
* `POST   /api/v1/user/support-contact` - Adiciona contato de suporte
* `GET    /api/v1/user/support-contact` - Lista contatos de suporte
* `DELETE /api/v1/user/support-contact/{contactId}` - Remove contato de suporte

### 🎯 Hábitos (Protegidos)

Gerenciado pelo `habit.service.ts`

* `POST /api/v1/habits` - Cria um novo hábito
* `GET  /api/v1/habits` - Lista hábitos do usuário
* `POST /api/v1/habits/{habitId}/log` - Registra execução do hábito
* `GET  /api/v1/habits/{habitId}/logs` - Histórico de execuções

### 🎮 Gamificação (Protegidos)

Gerenciado pelo `gamification.service.ts`

* `GET  /api/v1/mana/balance` - Consulta saldo de Mana
* `POST /api/v1/mana/redeem` - Resgata/utiliza Mana
* `GET  /api/v1/challenges` - Lista desafios disponíveis
* `GET  /api/v1/leaderboard` - Placar de líderes (Ranking)

### ✅ Sistema

* `GET /health` - Verifica status do servidor backend

---

## ⚙️ Como executar o projeto localmente

### Pré-requisitos

* [Node.js](https://nodejs.org/) (versão LTS recomendada)
* [Angular CLI](https://angular.dev/tools/cli) instalado globalmente (`npm install -g @angular/cli`)

### Passos

1. Clone o repositório:
```bash
git clone <url-do-seu-repositorio>

```


2. Acesse a pasta do projeto:
```bash
cd nome-do-repositorio

```


3. Instale as dependências:
```bash
npm install

```


4. Configure as variáveis de ambiente (URL da API) no arquivo `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080' // Mude para a URL da sua API local
};

```


5. Inicie o servidor de desenvolvimento:
```bash
ng serve

```


6. Abra o navegador e acesse: `http://localhost:4200/`

---

## 🛠️ Scripts Úteis

* `ng serve`: Inicia o servidor local de desenvolvimento.
* `ng build`: Compila o projeto para produção na pasta `dist/`.
* `ng test`: Executa os testes unitários via Karma.
* `ng lint`: Verifica a qualidade do código.

```
