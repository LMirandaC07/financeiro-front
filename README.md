# 💰 FinanceApp — Front-end

Interface web moderna para gerenciamento de finanças pessoais, desenvolvida com **React** e integrada à [FinanceApp API](https://github.com/LMirandaC07/financeiro-api).

## 🚀 Tecnologias

- **React 18**
- **Vite** — bundler e servidor de desenvolvimento
- **React Router DOM** — navegação entre páginas
- **Axios** — requisições HTTP
- **CSS-in-JS** — estilização inline com design system próprio
- **Google Fonts** — tipografia (Syne + DM Sans)

## ✨ Funcionalidades

- ✅ Tela de cadastro de usuário
- ✅ Tela de login com autenticação JWT
- ✅ Dashboard com resumo financeiro (receitas, despesas, saldo)
- ✅ Listagem de transações com filtros por tipo
- ✅ Formulário para adicionar receitas e despesas
- ✅ Logout e proteção de rotas autenticadas
- ✅ Design responsivo dark premium

## 🎨 Design

Interface com tema **dark premium**, desenvolvida com foco em UX/UI:

- Layout dividido em duas colunas nas telas de auth
- Dashboard com cards de KPI e lista de transações
- Tipografia expressiva com Syne (display) e DM Sans (corpo)
- Paleta dourada `#c9a844` como cor de destaque
- Feedback visual em tempo real (loading, erros)

## 📁 Estrutura

```
src/
├── pages/
│   ├── Login.jsx       # Tela de login
│   ├── Register.jsx    # Tela de cadastro
│   └── Dashboard.jsx   # Painel principal
├── App.jsx             # Rotas da aplicação
└── main.jsx            # Ponto de entrada
```

## ⚙️ Como rodar localmente

### Pré-requisitos
- Node.js 18+
- A [FinanceApp API](https://github.com/LMirandaC07/financeiro-api) rodando localmente

### Passos

1. Clone o repositório:
```bash
git clone https://github.com/LMirandaC07/financeiro-front.git
cd financeiro-front
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 🌐 Deploy

O front-end está deployado na **Vercel**:
```
https://financeiro-front-azure.vercel.app
```

## 🔗 Back-end

O back-end desta aplicação está disponível em:
- Repositório: [financeiro-api](https://github.com/LMirandaC07/financeiro-api)
- Deploy: [financeiro-api-production-aa9b.up.railway.app](https://financeiro-api-production-aa9b.up.railway.app)

---

Desenvolvido por **Luis Miranda** · [LinkedIn](https://www.linkedin.com/in/gustavomirandac/)
