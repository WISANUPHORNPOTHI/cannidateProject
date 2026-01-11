# 🧩 Real-time Collaboration System
Next.js (Vercel) + WebSocket Service (Render)

This is a Next.js project bootstrapped with create-next-app.
The application is designed as a real-time collaborative system where the frontend and the WebSocket backend are deployed as separate services for scalability and production readiness.

---

## 🏗 System Architecture Overview

This project separates responsibilities into two services:

- Frontend: Next.js (deployed on Vercel)
- Realtime Backend: WebSocket Service (deployed on Render)

Architecture flow:

Browser (Patient / Staff)
  |
  | WebSocket (wss)
  v
WebSocket Service (Render)
  |
  | Real-time events
  v
Next.js Frontend (Vercel)

Why this architecture:
- Vercel is optimized for serverless frontend rendering
- Long-lived WebSocket connections are not suitable for serverless environments
- Render provides a persistent runtime for WebSocket connections
- This pattern is commonly used in production real-time systems

---

## 🚀 Getting Started (Frontend)

Install dependencies and start the development server:

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

Open your browser at:
http://localhost:3000

You can start editing the application by modifying:
app/page.tsx

The page will auto-update as you edit the file.

---

## 🔌 Real-time WebSocket Service (Render)

The WebSocket server is deployed as a separate service and acts as a realtime backend.

Responsibilities:
- Live form synchronization
- Typing indicators
- Multi-user collaboration (Patient / Staff)
- Preventing echo loops using clientId
- Role-based message broadcasting

Example structure:

ws-server/
  server.ts
  package.json
  tsconfig.json
  Dockerfile
  dist/

---

## 🐳 Dockerfile for WebSocket Service (Render)

FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN node node_modules/typescript/lib/tsc.js

CMD ["node", "dist/server.js"]

---

## 🚀 Deploy WebSocket Service on Render

1. Go to https://render.com
2. Create a new Web Service
3. Connect the repository containing the ws-server
4. Select Docker as the runtime
5. Deploy the service

After deployment, Render will provide a URL similar to:

wss://your-websocket-service.onrender.com

This URL will be used by the Next.js frontend.

---

## 🌐 Deploy Next.js Frontend on Vercel

The Next.js frontend is deployed on Vercel.

### Environment Variable Configuration

In Vercel Dashboard:
Project Settings → Environment Variables

Add:

NEXT_PUBLIC_WS_URL=wss://your-websocket-service.onrender.com

The NEXT_PUBLIC_ prefix is required so the variable is accessible on the client side.

---

## 🔁 WebSocket Integration in Next.js

The frontend connects to the WebSocket service using a custom hook:

useWebSocket(process.env.NEXT_PUBLIC_WS_URL!)

This enables:
- Live form updates
- Typing indicators
- Real-time collaboration
- Smooth input experience without cursor flickering

---

## 🧠 Real-time Design Principles

- WebSocket server is stateless
- Each client has a unique clientId
- Messages are not echoed back to the sender
- Updates are broadcast only to the opposite role (Patient ↔ Staff)
- Frontend avoids unnecessary setValue calls to prevent flickering

This ensures a smooth and predictable user experience similar to real-time collaborative editors.

---

## ⚠️ Production Notes

- Render Free Tier may sleep when idle
  → the first WebSocket connection may take a few seconds
- Enable Always On for production usage
- Always use secure WebSocket (wss://) in production
- Consider extending the system with:
  - Room or session separation
  - Field-level locking
  - Audit logs

---

## 📦 Tech Stack

Frontend:
- Next.js (App Router)
- React
- React Hook Form
- Tailwind CSS

Realtime Backend:
- WebSocket (ws)
- Node.js
- TypeScript

Deployment:
- Frontend: Vercel
- WebSocket Service: Render

---

## 📚 Learn More

Next.js Documentation:
https://nextjs.org/docs

Learn Next.js:
https://nextjs.org/learn

Next.js GitHub Repository:
https://github.com/vercel/next.js

---

## ✅ Summary

- Next.js frontend is deployed on Vercel
- WebSocket backend is deployed separately on Render
- Services communicate via NEXT_PUBLIC_WS_URL
- Architecture is scalable and production-ready
- Designed for real-time collaboration use cases
