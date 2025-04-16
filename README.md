# FusionNote

FusionNote is a modern, feature-rich note-taking application built with Next.js, featuring a powerful rich text editor and seamless cloud synchronization.

## Features

- 📝 Rich Text Editor with Tiptap
  - Text formatting (bold, italic, strikethrough)
  - Headings (H1, H2, H3)
  - Lists (bullet, numbered, tasks)
  - Code blocks with syntax highlighting
  - Image embedding with drag & drop support
  - Link insertion
  - Text alignment options
  - Character count
  - Auto-saving

- 🎨 Modern UI/UX
  - Clean, minimal interface
  - Dark/Light theme support
  - Responsive design
  - Sidebar navigation
  - Breadcrumb navigation
  - Toast notifications
  - Loading states
  - Error handling

- 🔒 Authentication & Security
  - User authentication with Clerk
  - Protected routes
  - Secure data access
  - JWT token integration
  - Row Level Security (RLS)

- 💾 Data Management
  - Real-time saving
  - Supabase database integration
  - Note organization
  - Automatic timestamps
  - User-specific data isolation

## Tech Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **Authentication**: Clerk
- **Database**: Supabase
- **Editor**: Tiptap
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide Icons
- **State Management**: React Hooks
- **Date Formatting**: date-fns
- **Notifications**: Sonner
- **Type Safety**: TypeScript

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/therandomuser03/fusionnote.git
cd fusionnote
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with the following:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up Supabase:
   - Create a new Supabase project
   - Enable Row Level Security (RLS)
   - Create the notes table with the schema below
   - Configure RLS policies for secure data access

5. Run the development server:

```bash
npm run dev
```

## Project Structure

- `/app` - Next.js app router pages and layouts
  - `/dashboard` - Main application pages
  - `/dashboard/notes/[id]` - Individual note pages
- `/components` - Reusable React components
  - `/ui` - Base UI components
  - `tiptap-editor.tsx` - Rich text editor component
  - `notes-list.tsx` - Notes list component
  - `app-sidebar.tsx` - Application sidebar
- `/lib` - Utility functions and configurations
  - `supabase.ts` - Supabase client and database functions
- `/hooks` - Custom React hooks

## Key Components

### TiptapEditor
A feature-rich text editor component with:
- Formatting toolbar
- Image and link insertion
- Multiple content types support
- Auto-saving capability
- Character count
- Real-time updates
- Error handling with toast notifications

### NotesList
Displays and manages notes with:
- Real-time updates
- Delete confirmation
- Sort by last updated
- Quick navigation
- Loading states
- Error handling

### AppSidebar
Navigation component featuring:
- User profile
- Notes navigation
- Theme toggle
- Responsive design
- Authentication status

## Database Schema

### Notes Table

```sql
create table notes (
  id uuid default uuid_generate_v4() primary key,
  title text,
  content text,
  user_id text references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable Row Level Security
alter table notes enable row level security;

-- Create policies
create policy "Users can view their own notes"
  on notes for select
  using (auth.uid() = user_id);

create policy "Users can insert their own notes"
  on notes for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own notes"
  on notes for update
  using (auth.uid() = user_id);

create policy "Users can delete their own notes"
  on notes for delete
  using (auth.uid() = user_id);
```

## Authentication Flow

1. User signs in/up using Clerk
2. Clerk provides authentication token
3. Token is used for Supabase requests
4. Row Level Security ensures data privacy
5. User-specific data isolation is maintained

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Supabase](https://supabase.io/)
- [Clerk](https://clerk.com/)
- [Tiptap](https://tiptap.dev/)
