# 🤖 QuickGPT — Intelligent AI Assistant

QuickGPT is an **AI-powered assistant** built with the **MERN stack** and **Google Gemini API** integration.  
It allows users to chat intelligently, generate content, and manage usage through a **credit-based system** powered by **Stripe payments**.
---

## 🚀 Features

- 💬 Chat with AI using **Gemini API** integration  
- 💳 Secure **Stripe payments** for credit purchases  
- 🔐 User authentication and protected routes  
- 📊 Dashboard to track credit usage and history  
- ⚡ Real-time AI responses with smooth UI  
- 🌙 Responsive design using Tailwind CSS  

---

## 🧰 Tech Stack

**Frontend:** React, Tailwind CSS, Axios, React Router  
**Backend:** Node.js, Express.js, MongoDB  
**AI Integration:** Google Gemini API  
**Payments:** Stripe API  
**State Management:** Context API 

---

## ⚙️ Installation

### 1. Clone the repository
```bash
https://github.com/Mnprt1324/quickGpt.git


⚡Getting Started
🔧 Backend Setup
cd server
npm install
Create a .env file in /server:
PORT=PORT
PORT=5001
MONGO_URL=
JWT_SECRET=
GEMINI_API_KEY=
IMG_KIT_publicKey=
IMG_KIT_privateKey=
IMG_KIT_urlEndpoint=
FRONT_URL='
#stripe keys
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
CLIP_DROP_API=
Run the server:
npm run dev
🎨 Frontend Setup
cd client
npm install
Update the frontend .env to point to your backend:

VITE_BASE_URL=BACKEND_URL=BACKEND_URL
Run the frontend server:
npm run dev
🚀 Deployment
Frontend: Deployed on Vercel

Backend: Deployed on Vercel

🧩 Folder Structure
/client => React frontend
/Server => Node.js + Express backend
