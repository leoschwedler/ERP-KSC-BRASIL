# ERP System - Enterprise Resource Planning

Um sistema ERP moderno e completo, construído com **Java 21 + Spring Boot** no backend e **React + Vite** no frontend, seguindo boas práticas de arquitetura limpa e segurança.

## 🎯 Funcionalidades

### Autenticação
- ✅ Login com JWT
- ✅ Roles baseados em ADMIN e USER
- ✅ Proteção de rotas por role
- ✅ Token storage seguro

### Gestão de Produtos (ADMIN)
- ✅ Criar, ler, atualizar e deletar produtos
- ✅ Validação de dados
- ✅ Tabela interativa com dados em tempo real

### Gestão de Usuários (ADMIN)
- ✅ Criar, ler, atualizar e deletar usuários
- ✅ Atribuir roles (ADMIN/USER)
- ✅ Validação de email único
- ✅ Criptografia de senha com BCrypt

### Dashboard
- ✅ Visão geral do sistema
- ✅ Estatísticas por role
- ✅ Menu responsivo

## 🏗️ Arquitetura

### Backend

**Stack:**
- Java 21
- Spring Boot 3.3.0
- Spring Security + JWT
- Spring Data JPA
- H2 (dev) / PostgreSQL (prod)
- OpenAPI/Swagger

**Estrutura:**
```
backend/
├── src/main/java/com/erp/
│   ├── controller/      # REST Controllers
│   ├── service/         # Lógica de negócio
│   ├── repository/      # Acesso a dados
│   ├── entity/          # Modelos JPA
│   ├── dto/             # Objetos de transferência
│   ├── config/          # Configurações (JWT, Security)
│   ├── exception/       # Tratamento de erros
│   └── filter/          # JWT Filter
└── pom.xml             # Dependências Maven
```

### Frontend

**Stack:**
- React 18+
- Vite 5
- TypeScript
- Tailwind CSS
- React Router v6
- TanStack Query (React Query)
- React Hook Form + Zod
- Zustand
- Axios

**Estrutura:**
```
frontend/
├── src/
│   ├── api/            # Chamadas HTTP
│   ├── components/     # Componentes React
│   ├── pages/          # Páginas
│   ├── hooks/          # React Hooks customizados
│   ├── routes/         # Configuração de rotas
│   ├── layout/         # Layouts principais
│   ├── types/          # Tipos TypeScript
│   ├── store/          # Estado global (Zustand)
│   └── lib/            # Utilidades
└── package.json        # Dependências npm
```

## 🚀 Como Executar

### Pré-requisitos
- Java 21+
- Node.js 18+
- npm ou yarn

### Backend

#### 1. Navegue até a pasta backend
```bash
cd backend
```

#### 2. Compile e execute com Maven
```bash
mvn clean install
mvn spring-boot:run
```

O backend estará disponível em: **http://localhost:8080**

#### 3. Acesse o Swagger
```
http://localhost:8080/swagger-ui.html
```

#### 4. Dados de demonstração

O banco H2 é criado automaticamente com usuários de teste:

**Admin:**
- Email: `admin@erp.com`
- Senha: `admin123`

**User:**
- Email: `user@erp.com`
- Senha: `user123`

### Frontend

#### 1. Navegue até a pasta frontend
```bash
cd frontend
```

#### 2. Instale as dependências
```bash
npm install
```

#### 3. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

O frontend estará disponível em: **http://localhost:5173**

#### 4. Build para produção
```bash
npm run build
npm run preview
```

## 📖 Guia de Uso

### Login
1. Acesse `http://localhost:5173`
2. Use uma das credenciais de demonstração
3. Será redirecionado para o dashboard

### Dashboard
- Visão geral de produtos e usuários
- Menu lateral com navegação
- Informações do perfil logado

### Produtos (ADMIN)
- Criar novo produto com nome, descrição, preço e quantidade
- Editar produtos existentes
- Deletar produtos
- Visualizar todos os produtos (ADMIN e USER podem ver, apenas ADMIN pode gerenciar)

### Usuários (ADMIN)
- Criar novo usuário com nome, email, senha e role
- Editar dados do usuário
- Deletar usuários
- Atribuir roles (ADMIN ou USER)

### Logout
- Clique no botão "Logout" na navbar
- Será redirecionado para login

## 🔐 Segurança

### Backend
- ✅ JWT com assinatura HS512
- ✅ BCrypt para hashing de senhas
- ✅ CORS configurado
- ✅ Validação com Bean Validation
- ✅ Proteção de rotas por role
- ✅ Tratamento global de exceções
- ✅ H2 Console desabilitado em produção

### Frontend
- ✅ Token armazenado em localStorage
- ✅ Interceptor JWT automático
- ✅ Logout ao receber 401
- ✅ Validação Zod no frontend
- ✅ Rotas privadas protegidas

## 🔄 Fluxo de Requisições

```
Frontend (React)
    ↓
Axios + Interceptor JWT
    ↓
Backend (Spring Boot)
    ↓
JWT Filter Validation
    ↓
Spring Security
    ↓
Controller → Service → Repository → Database
    ↓
JSON Response
    ↓
Frontend (Armazena + Exibe)
```

## 📝 API Endpoints

### Autenticação
- `POST /api/auth/login` - Login do usuário

### Produtos
- `GET /api/products` - Listar todos os produtos
- `GET /api/products/{id}` - Obter produto por ID
- `POST /api/products` - Criar novo produto (ADMIN)
- `PUT /api/products/{id}` - Atualizar produto (ADMIN)
- `DELETE /api/products/{id}` - Deletar produto (ADMIN)

### Usuários
- `GET /api/users` - Listar todos os usuários (ADMIN)
- `GET /api/users/{id}` - Obter usuário por ID (ADMIN)
- `POST /api/users` - Criar novo usuário (ADMIN)
- `PUT /api/users/{id}` - Atualizar usuário (ADMIN)
- `DELETE /api/users/{id}` - Deletar usuário (ADMIN)

## 🛠️ Configuração de Ambiente

### Backend

**application.properties** (desenvolvimento):
```properties
server.port=8080
spring.datasource.url=jdbc:h2:mem:testdb
app.jwtSecret=mySecretKey...
app.jwtExpirationMs=86400000
```

Para produção com PostgreSQL:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/erp
spring.datasource.username=postgres
spring.datasource.password=password
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQL10Dialect
```

### Frontend

Crie um `.env.local`:
```
VITE_API_BASE_URL=http://localhost:8080/api
```

## 📦 Estrutura de Pastas Raiz

```
ERP/
├── backend/                    # Java Spring Boot
│   ├── src/
│   ├── pom.xml
│   └── .gitignore
├── frontend/                   # React Vite
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   └── .gitignore
└── README.md
```

## 🎨 UI/UX

- **Design:** Clean, moderno, estilo SaaS
- **Responsivo:** Mobile-first com Tailwind CSS
- **Componentes:** ShadCN + Tailwind CSS
- **Ícones:** Lucide React
- **Temas:** Light mode padrão (pronto para dark mode)

## 🚧 Próximas Funcionalidades

- [ ] Testes automatizados (Jest, JUnit)
- [ ] Mais módulos ERP (Vendas, Estoque, Nota Fiscal)
- [ ] Relatórios e dashboards avançados
- [ ] Auditoria e logs
- [ ] Dark mode
- [ ] Notificações em tempo real
- [ ] Docker e Docker Compose
- [ ] CI/CD pipeline (GitHub Actions)

## 📚 Documentação

- **Swagger/OpenAPI:** `http://localhost:8080/swagger-ui.html`
- **H2 Console:** `http://localhost:8080/h2-console`
- **Frontend:** `http://localhost:5173`

## 🤝 Contribuindo

Este é um projeto base. Sinta-se livre para:
- Adicionar novas funcionalidades
- Melhorar a UI/UX
- Otimizar performance
- Adicionar testes
- Corrigir bugs

## 📄 Licença

MIT License - Sinta-se livre para usar este projeto como base para seus próprios projetos.

## 💡 Dicas de Desenvolvimento

### Acessar H2 Console
```
http://localhost:8080/h2-console
```
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: (deixe em branco)

### Resetar banco de dados
Simplesmente reinicie o backend (H2 em memória é recriado)

### Debug no Frontend
- Abra DevTools (F12)
- Localstorage contém o token
- Network tab mostra requisições

## ⚡ Performance

- **Frontend:** Vite + React Query com cache automático
- **Backend:** Spring Data JPA com lazy loading
- **Database:** H2 em memória ou PostgreSQL em produção

## 🐛 Troubleshooting

### "Port 8080 already in use"
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :8080
kill -9 <PID>
```

### "Token expired / 401 Unauthorized"
- Faça logout e login novamente
- Verifique a data/hora do sistema
- Aumente `app.jwtExpirationMs` em `application.properties`

### Frontend não conecta no backend
- Verifique se o backend está rodando (`http://localhost:8080`)
- Confira CORS em `CorsConfig.java`
- Verifique o proxy em `vite.config.ts`

---

**Projeto criado com ❤️ usando boas práticas de desenvolvimento**
