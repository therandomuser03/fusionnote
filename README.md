> ⚠️ *Currently under active development. Contributions, feedback, and stars are always appreciated!*
---

# 📝 FusionNote

**The collaborative, modern rich-text editor for the web — built for teams, creators, and everyday productivity.**

---

## 🚀 Overview

FusionNote is a feature-rich note-taking and collaboration platform built with modern web technologies. It combines the power of rich text editing, real-time collaboration, and intelligent organization to create a seamless writing and productivity experience. Think of it as a powerful fusion of Notion's flexibility, Google Keep's simplicity, and your favorite writing tool's functionality.

---

## ✨ Features

### 📝 **Rich Text Editing**
- ⚡ **TipTap-powered Editor** with extensive formatting options
- 🎨 **Rich Formatting**: Bold, italic, underline, strikethrough, highlights
- 📑 **Block Elements**: Headings (H1-H6), code blocks, blockquotes, lists
- 🔗 **Links & Media**: Embed links, images, and videos
- ✅ **Task Lists**: Interactive checkboxes and to-do items
- 📄 **PDF Export**: Download notes as PDF documents
- 🎯 **Text Alignment**: Left, center, right, and justified alignment

### 🔐 **Authentication & User Management**
- 👤 **Secure Authentication**: JWT-based auth with bcrypt password hashing
- ✉️ **Email Verification**: Secure email verification system
- 👥 **User Profiles**: Customizable profiles with image uploads
- 🔒 **Password Security**: Secure password reset and management

### 📚 **Note Organization**
- 🏷️ **Smart Tagging System**: Organize notes with custom tags
- 📌 **Pinned Notes**: Quick access to important notes
- 🗂️ **Workspaces**: Collaborative spaces with role-based permissions
- 🗑️ **Trash & Recovery**: Soft delete with restore functionality
- 🔍 **Advanced Search**: Full-text search across all notes
- ⭐ **Favorites**: Mark and quickly access favorite notes

### 🤝 **Collaboration Features**
- 👥 **Workspace Collaboration**: Share workspaces with team members
- 🎭 **Role-based Permissions**: Owner, Admin, Editor, and Viewer roles
- 📝 **Note Sharing**: Granular permissions for individual notes
- 💬 **Comments System**: Threaded comments on notes (coming soon)
- 📜 **Version History**: Track changes and restore previous versions

### 🎨 **User Experience**
- 🌗 **Dark/Light Mode**: Beautiful themes for any preference
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- ⚡ **Real-time Updates**: Instant syncing across devices
- 🎯 **Command Palette**: Quick actions and navigation
- 🔄 **Auto-save**: Never lose your work with automatic saving
- 💫 **Smooth Animations**: Polished UI with Magic UI components

### 🚀 **Additional Features**
- 📊 **Feedback System**: Built-in user feedback and rating system
- 🤖 **AI Integration**: Note summarization capabilities
- 📤 **Export Options**: Multiple export formats
- 🔔 **Email Notifications**: Stay updated with email alerts
- 🖼️ **Media Support**: Image uploads with Cloudinary integration

---

## 🧱 Tech Stack

| Layer           | Technology                                                           |
|----------------|----------------------------------------------------------------------|
| **Frontend**    | [Next.js 15](https://nextjs.org/) (App Router), [TypeScript](https://www.typescriptlang.org/), [React 19](https://react.dev/) |
| **UI & Styling** | [TailwindCSS 4](https://tailwindcss.com/), [Shadcn/UI](https://ui.shadcn.com/), [Magic UI](https://magicui.design/), [Lucide Icons](https://lucide.dev/) |
| **Editor**      | [TipTap](https://tiptap.dev/) with custom extensions and toolbar    |
| **Authentication** | Custom JWT-based auth with [bcrypt](https://github.com/dcodeIO/bcrypt.js) |
| **Database**    | [MongoDB](https://www.mongodb.com/) with [Prisma ORM](https://www.prisma.io/), [Mongoose](https://mongoosejs.com/) |
| **File Storage** | [Cloudinary](https://cloudinary.com/) for image and media uploads  |
| **Email**       | [Nodemailer](https://nodemailer.com/) with [Resend](https://resend.com/) |
| **PDF Export**  | [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) for document export |
| **Deployment** | [Vercel](https://vercel.com/) (recommended)                         |

---

## 📁 Project Structure

```bash
fusionnote/
├── src/
│   ├── app/                  # Next.js 15 App Router
│   │   ├── (auth)/           # Authentication routes (login, signup, verify)
│   │   ├── (main)/           # Main application routes
│   │   │   ├── dashboard/    # Dashboard and overview
│   │   │   ├── notes/        # Note editing and management
│   │   │   ├── search/       # Search functionality
│   │   │   ├── tags/         # Tag management
│   │   │   ├── trash/        # Deleted notes management
│   │   │   └── settings/     # User settings
│   │   ├── api/              # API routes and endpoints
│   │   │   ├── notes/        # Note CRUD operations
│   │   │   ├── users/        # User management
│   │   │   └── feedback/     # Feedback system
│   │   └── globals.css       # Global styles
│   ├── components/           # Reusable UI components
│   │   ├── ui/               # Shadcn/UI components
│   │   ├── auth/             # Authentication components
│   │   ├── editor/           # TipTap editor components
│   │   ├── layout/           # Layout and navigation
│   │   ├── notes/            # Note-related components
│   │   ├── tiptap/           # TipTap extensions and customizations
│   │   └── magicui/          # Magic UI components
│   ├── lib/                  # Utilities and configurations
│   ├── context/              # React context providers
│   ├── hooks/                # Custom React hooks
│   ├── models/               # Data models and schemas
│   ├── types/                # TypeScript type definitions
│   ├── utils/                # Helper functions and utilities
│   └── styles/               # SCSS styles and variables
├── prisma/                   # Database schema and migrations
├── public/                   # Static assets (images, icons)
├── .env.example              # Environment variables template
└── package.json              # Dependencies and scripts
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

Create a `.env.local` file in the root directory and add the following variables:

```bash
# Database Configuration
MONGO_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/fusionnote?retryWrites=true&w=majority"
DATABASE_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/fusionnote?retryWrites=true&w=majority"

# Authentication
TOKEN_SECRET="your-super-secure-jwt-secret-key-here"

# Application Domain
DOMAIN="http://localhost:3000"
NEXT_PUBLIC_DOMAIN="http://localhost:3000"

# Email Configuration (Optional - for email verification)
NODEMAILER_EMAIL="your-email@gmail.com"
NODEMAILER_PASSWORD="your-app-password"

# Cloudinary Configuration (Optional - for image uploads)
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"

# Resend Configuration (Optional - alternative email service)
RESEND_API_KEY="your-resend-api-key"
```

> **Note**: You can find an example configuration in `.env.example`. Make sure to replace all placeholder values with your actual credentials.

4. Generate Prisma Client

```bash
npx prisma generate
```

5. Run the Development Server

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

6. Access the Application

Open [http://localhost:3000](http://localhost:3000) in your browser to see FusionNote in action!

### 🗄️ Database Setup

1. **MongoDB Atlas** (Recommended):
   - Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a new cluster and database
   - Get your connection string and add it to your `.env.local`

2. **Local MongoDB**:
   - Install MongoDB locally
   - Use connection string: `mongodb://localhost:27017/fusionnote`

### 📧 Email Configuration (Optional)

For email verification and notifications:

1. **Gmail Setup**:
   - Enable 2-factor authentication on your Gmail account
   - Generate an "App Password" for Nodemailer
   - Add credentials to your `.env.local`

2. **Resend Setup** (Alternative):
   - Sign up at [Resend](https://resend.com/)
   - Get your API key and add it to `.env.local`

---

## 🧑‍💻 Contributing

We welcome contributions from developers of all skill levels! Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated.

### 🚀 **How to Contribute**

1. **⭐ Star this repository** to show your support

2. **🍴 Fork the repository** to your GitHub account

3. **📥 Clone your fork**:
   ```bash
   git clone https://github.com/therandomuser03/fusionnote.git
   cd fusionnote
   ```

4. **🛠️ Create a feature branch**:
   ```bash
   git checkout -b feature/your-amazing-feature
   ```

5. **💻 Make your changes** and test thoroughly

6. **📝 Commit your changes**:
   ```bash
   git commit -m "feat: add your amazing feature"
   ```

7. **📤 Push to your fork**:
   ```bash
   git push origin feature/your-amazing-feature
   ```

8. **🔁 Open a Pull Request** with a clear description of your changes

### 📋 **Contribution Guidelines**

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Test your changes thoroughly before submitting
- Update documentation if necessary
- Be respectful and constructive in discussions

### 🐛 **Bug Reports**

Found a bug? Please open an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

### 💡 **Feature Requests**

Have an idea? Open an issue with:
- Clear description of the feature
- Use case and benefits
- Any relevant mockups or examples




---

## 📜 License

MIT


---

## 🙌 Acknowledgements

Special thanks to the amazing open-source projects and services that make FusionNote possible:

- **[TipTap](https://tiptap.dev/)** - The headless rich text editor framework
- **[Next.js](https://nextjs.org/)** - The React framework for production
- **[Shadcn/UI](https://ui.shadcn.com/)** - Beautiful and accessible component library
- **[Magic UI](https://magicui.design/)** - Stunning animated components
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[MongoDB](https://www.mongodb.com/)** - The document database
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM
- **[Cloudinary](https://cloudinary.com/)** - Image and video management
- **[Vercel](https://vercel.com/)** - Platform for frontend frameworks
- **[Lucide](https://lucide.dev/)** - Beautiful and consistent icon library

And many other fantastic libraries and tools that power this project! 🚀



---

## 📬 Contact & Support

Have questions, suggestions, or just want to say hello? We'd love to hear from you!

- **GitHub**: [@therandomuser03](https://github.com/therandomuser03)
- **Twitter**: [@TheRandomUser03](https://x.com/TheRandomUser03)
- **Issues**: [GitHub Issues](https://github.com/therandomuser03/fusionnote/issues)
- **Discussions**: [GitHub Discussions](https://github.com/therandomuser03/fusionnote/discussions)

### 🆘 **Getting Help**

- 📚 Check the documentation and README first
- 🔍 Search existing issues before creating new ones
- 💬 Join our community discussions for general questions
- 🐛 Create detailed bug reports for technical issues

### 💖 **Show Your Support**

If you find FusionNote helpful:
- ⭐ Star this repository
- 🐦 Share it on social media
- 📝 Write a blog post or review
- 💝 Consider sponsoring the project



---

> Built with ❤️ by Anubhab

