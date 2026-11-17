# EchoMarket - Full-Stack Eco-Friendly Marketplace

Aplikasi full-stack marketplace barang daur ulang dengan integrasi **EchoBot AI (Google Gemini)**, komunitas **Echomunitas**, dan database **PostgreSQL (Neon)**. untuk ai yang di gunakan gemini API key

## Struktur Repository

- `frontend/` - React 18 + Vite + React Router DOM
- `backend/` - NestJS + Prisma ORM + PostgreSQL (Neon) + JWT + Swagger + Jest + Google Gemini AI

## Menjalankan Secara Lokal

### 1. Backend (`backend/`)
```bash
cd backend
cp .env.example .env
npm install
npx prisma migrate dev
npm run db:seed
npm run start:dev
```

### 2. Frontend (`frontend/`)
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
