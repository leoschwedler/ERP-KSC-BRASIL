# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack ERP system: Java 21 + Spring Boot 3.3.0 backend with JWT auth, React 18 + Vite + TypeScript frontend. Language: Portuguese (Brazilian).

## Running the Project

### Prerequisites
- Java 21 (Eclipse Adoptium at `C:\Program Files\Eclipse Adoptium\jdk-21.0.9.10-hotspot`)
- MySQL running on `localhost:3306` with database `erp_db` and user `root` / no password
- Node.js 18+ and npm

### Backend

No Maven wrapper — requires Maven on PATH, or set JAVA_HOME explicitly:

```bash
export JAVA_HOME="/c/Program Files/Eclipse Adoptium/jdk-21.0.9.10-hotspot"
export PATH="$JAVA_HOME/bin:$PATH"
cd backend
mvn spring-boot:run
```

Or run the pre-built JAR:
```bash
java -jar backend/target/erp-system-1.0.0.jar > backend/backend.log 2>&1 &
```

Rebuild after code changes:
```bash
cd backend && mvn clean package -DskipTests
```

Backend starts on **http://localhost:8080** with context path `/api`.  
Swagger UI: **http://localhost:8080/swagger-ui.html** (maps to `/api/swagger-ui.html`)

### Frontend

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
npm run build
npm run lint
```

Vite proxies all `/api` requests to `http://localhost:8080`, rewriting the path prefix.

## Architecture

### Backend (`backend/src/main/java/com/erp/`)

```
config/      — SecurityConfig, JwtTokenProvider, DataInitializer, CorsConfig, CustomUserDetailsService
controller/  — AuthController (/auth), ProductController (/products), UserController (/users)
service/     — AuthService, ProductService, UserService
repository/  — JPA repos for User and Product
entity/      — User, Product, Role (enum: ADMIN, USER)
dto/         — Request/response DTOs
exception/   — GlobalExceptionHandler + custom exception classes
filter/      — JwtAuthenticationFilter (OncePerRequestFilter)
```

**Request flow:** HTTP → JwtAuthenticationFilter → SecurityConfig rules → Controller → Service → Repository

**Auth flow:** `POST /auth/login` → `AuthService.login()` → Spring's `AuthenticationManager` → `CustomUserDetailsService.loadUserByUsername()` → BCrypt verify → `JwtTokenProvider.generateToken()` → JWT response

### Frontend (`frontend/src/`)

```
api/         — axiosInstance (with JWT + 401 interceptor), authApi, productApi, userApi
store/       — authStore.ts (Zustand: token, user, setAuth, logout)
hooks/       — useLogin, useRegister, useProducts, useUsers (TanStack Query mutations/queries)
routes/      — PrivateRoute (checks Zustand token), RoleRoute (checks role), router config
layout/      — MainLayout (wraps protected pages with DashboardSidebar), AuthLayout
pages/       — LoginPage, RegisterPage, DashboardPage, ProductsPage, UsersPage, NotFoundPage
components/  — DashboardSidebar, StatCard, QuickActionCard, ProductForm, UserForm, ui/Button, ui/Input
types/       — auth.ts, product.ts, user.ts
```

**State flow:** Login → `setAuth(data)` in Zustand → token persisted in localStorage → Axios interceptor reads token → `PrivateRoute` reads token to allow/deny access

## Critical Non-Obvious Details

### Spring Security

`DaoAuthenticationProvider` must **not** be declared as a `@Bean`. If it is, Spring Boot auto-configuration intercepts it and logs `"UserDetailsService beans will not be used for username/password login"`, breaking auth entirely. It must be created inline inside `filterChain()`.

### Database Initialization

`spring.jpa.hibernate.ddl-auto=create` drops and recreates all tables on every backend restart. `DataInitializer` (CommandLineRunner) seeds demo users only when `userRepository.count() == 0`. If demo users stop working (wrong passwords), delete their rows in MySQL then restart — DataInitializer will recreate them with correct BCrypt hashes.

Demo credentials seeded by DataInitializer:
- `admin@erp.com` / `admin123` (role: ADMIN)
- `user@erp.com` / `user123` (role: USER)

### Axios 401 Interceptor

The interceptor in `axiosInstance.ts` only redirects to `/login` when **both** conditions are true: the request is NOT to an `/auth/` route AND the user currently has a token. This prevents the login page from reloading before errors can display when credentials are wrong.

### Role-Based Access

- ADMIN: sees Dashboard, Products (full CRUD), Users (full CRUD)
- USER: sees Dashboard, Products (read-only view)
- `RoleRoute` wraps `/users` in the router; `DashboardSidebar` hides the Users nav item for non-admins

### JWT Configuration

Secret and expiration are in `application.properties`:
```
app.jwt.secret=mySecretKeyForJWTTokenProviderWithAtLeast32CharactersLongToBeValidAndSecure
app.jwt.expiration=86400000
```
Algorithm: HS512. The secret must be ≥ 32 characters for HS512.
