# FusionNote

FusionNote is a modern note-taking application built with Next.js, Tailwind CSS, and Supabase.

## Features

- User authentication with Supabase
- Create, read, update, and delete notes
- Responsive design for all devices
- Modern UI with shadcn/ui components

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Supabase (Authentication, Database)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/fusion-note.git
cd fusion-note
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Supabase Setup

1. Create a new Supabase project
2. Run the SQL script in `supabase/schema.sql` to set up the database tables and policies
3. Configure authentication providers in the Supabase dashboard

## Project Structure

```
fusion-note/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js app router pages
│   ├── components/      # React components
│   ├── contexts/        # React contexts
│   ├── lib/             # Utility functions and libraries
│   └── styles/          # Global styles
├── .env.local           # Environment variables
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Supabase](https://supabase.io/)
