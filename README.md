# 🧠 FusionNote

FusionNote is a modern, AI-powered rich text editor app — built for users who want a clean, Notion-style note-taking experience, with smart features like summarization, search, and tagging.

Whether you're organizing thoughts, journaling, or writing documentation, FusionNote blends usability, AI, and design for the ultimate note workflow.

<br/>

![FusionNote Screenshot](public/og-image.png)

---

## ✨ Features

- ⚡ **Real-Time Rich Text Editing** (Tiptap-based)
- 🧠 **AI Summarization** powered by OpenAI
- 🔐 **Authentication** via Supabase or Clerk
- 🗂️ **Tagging & Filtering**
- 🔎 **Searchable Notes**
- 🌓 **Dark Mode Support**
- 🧩 **Responsive UI** with TailwindCSS + Shadcn UI
- 🚀 **Deployed on Vercel**

---

## 🛠 Tech Stack

| Area          | Tech                                     |
|---------------|------------------------------------------|
| Framework     | [Next.js (App Router)](https://nextjs.org/) |
| Styling       | [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/) |
| Auth          | [Supabase Auth](https://supabase.com/) or [Clerk](https://clerk.dev/) |
| Database      | [MongoDB Atlas](https://www.mongodb.com/) |
| ORM           | [Prisma](https://www.prisma.io/)         |
| Rich Editor   | [Tiptap](https://tiptap.dev/)            |
| AI            | [OpenAI API](https://platform.openai.com/) |
| Deployment    | [Vercel](https://vercel.com/)            |

---

## 🚧 Folder Structure (Simplified)

```
fusionnote/
├── app/              → Next.js routes
├── components/       → UI, Editor, Notes, Layout
├── context/          → Theme/Auth providers
├── hooks/            → useAuth, useNotes, etc.
├── lib/              → DB, AI, Auth server utils
├── prisma/           → Prisma schema + client
├── public/           → Static assets
├── utils/            → Client helpers (API, summarization)
└── types/            → TypeScript interfaces
```

---

## 🔐 Authentication

FusionNote supports authentication via:

- **Supabase Auth** – quick setup, free tier, email magic link
- **Clerk Auth** – advanced features like OAuth, user management, UI out of the box

Switchable depending on preference. Auth logic lives in `lib/auth.ts` and `context/AuthContext.tsx`.

---

## 🧠 AI Summarization

Notes can be summarized using OpenAI’s GPT-4 or GPT-3.5 via:

```ts
POST /api/notes/summarize
{
  "noteId": "abc123"
}
```

Uses serverless route handlers and OpenAI SDK.

---

## 🧪 Local Development

### 1. Clone repo & install deps

```bash
git clone https://github.com/your-username/fusionnote.git
cd fusionnote
pnpm install
```

### 2. Setup `.env.local`

```env
# MongoDB
MONGODB_URI=your_mongodb_connection

# OpenAI
OPENAI_API_KEY=your_openai_key

# Supabase (if used)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Clerk (if used instead)
CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
```

### 3. Start dev server

```bash
pnpm dev
```

---

## 📦 Deploy on Vercel

1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com/)
3. Add environment variables
4. Click **Deploy**

---

## 🤝 Contributing

This project is designed as a **personal showcase** and learning experience. Contributions are welcome via issues or PRs, especially around improving the editor, AI integration, or UX.

---

## 💼 Why I Built This

> FusionNote is my attempt at building a full-featured real-world SaaS-style application — complete with AI features, authentication, editor tools, and a professional UI. It’s a portfolio project that showcases my skills in full-stack development using modern tools like Next.js, MongoDB, Prisma, Tailwind, and more.

If you're a recruiter or company looking for someone who can build solid, scalable, and beautiful apps — let’s talk!