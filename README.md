# 📝 FusionNote

**The collaborative, modern rich-text editor for the web — built for teams, creators, and everyday productivity.**

---

## 🚀 Overview

FusionNote is a real-time rich text editor built with a sleek, modern UI and robust backend — think of it as a powerful mix of Notion, Google Keep, and your favorite writing tool. Built on a full-stack Next.js setup, FusionNote offers seamless editing, collaboration, and organization.

> 🔧 *Currently under active development. Contributions, feedback, and stars are welcome!*

---

## ✨ Features

- ⚡ **Real-time Rich Text Editing** powered by [TipTap](https://tiptap.dev)
- 👥 **Authentication** via Supabase Auth
- 📦 **Database** integration with MongoDB + Prisma ORM
- 🧠 **Multi-space/Notebook Support** (personal + shared)
- 📑 **Custom Blocks**: headings, code, checklists, images, etc.
- 🔍 **Search, Filter, and Sort**
- 🧩 **Modular Design** for future extensibility (tags, templates, AI, etc.)
- 🌗 **Responsive UI** using TailwindCSS, Shadcn/UI, and Magic UI

---

## 🧱 Tech Stack

| Layer           | Tech                                                                 |
|----------------|----------------------------------------------------------------------|
| Frontend        | [Next.js (App Router)](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/) |
| UI              | [TailwindCSS](https://tailwindcss.com/), [Shadcn/UI](https://ui.shadcn.com/), [Magic UI](https://magicui.design/) |
| Editor Engine   | [TipTap](https://tiptap.dev/)                                        |
| Authentication  | [Supabase Auth](https://supabase.com/auth)                          |
| Database        | [MongoDB](https://www.mongodb.com/), [Prisma ORM](https://www.prisma.io/) |
| Hosting         | [Vercel](https://vercel.com/) (recommended)                         |

---

## 📁 Project Structure (WIP)

```bash
fusionnote/
├── app/                      # Next.js app directory
│   ├── dashboard/            # Main dashboard and editor UI
│   ├── auth/                 # Auth routes and logic
├── components/               # Reusable UI components
├── lib/                      # Utils, constants, helpers
├── context/                  # React context providers
├── prisma/                   # Prisma schema and migrations
├── styles/                   # Global styles
├── types/                    # TypeScript types
├── public/                   # Static assets
├── .env                      # Environment variables
```


---

## ⚙️ Getting Started

1. Clone the Repository


```bash
git clone https://github.com/therandomuser03/fusionnote.git
cd fusionnote
```

2. Install Dependencies


```
npm install
```
or
```
pnpm install
```

3. Setup Environment Variables



Create a .env.local file and add:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

DATABASE_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/fusionnote?retryWrites=true&w=majority
```

4. Generate Prisma Client


```bash
npx prisma generate
```

5. Run the Dev Server


```bash
npm run dev
```

<!-- 
---

## 🛣️ Roadmap

[x] Setup authentication (Supabase)

[x] Create responsive dashboard

[x] Implement basic rich text editing

[x] MongoDB + Prisma integration

[ ] Note sharing & collaboration

[ ] AI-powered suggestions (e.g., summarizer, title generator)

[ ] Realtime sync with Y.js / CRDT

[ ] Mobile-first UI

[ ] Offline support
-->


---

## 🧑‍💻 Contributing

Contributions are welcome! Please fork the repo and submit a pull request.

1. ⭐ Star this project


2. 🍴 Fork it


3. 🛠️ Create your feature branch: git checkout -b feature/your-feature


4. 📤 Commit and push: git commit -am 'Add your feature' && git push


5. 🔁 Open a Pull Request




---

## 📜 License

MIT


---

## 🙌 Acknowledgements

TipTap Editor

Supabase

Shadcn UI

Magic UI

MongoDB

Prisma ORM



---

## 📬 Contact

Feel free to connect with me:

GitHub: [@therandomuser03](https://github.com/therandomuser03)

Twitter: [@TheRandomUser03](https://x.com/TheRandomUser03)



---

> Built with ❤️ by Anubhab

