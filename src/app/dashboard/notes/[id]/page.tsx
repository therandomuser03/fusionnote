import { NoteContent } from "@/components/note-content"

// Define the correct type for Next.js 15 page props
type PageProps = {
  params: Promise<{ id: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function NotePage(props: PageProps) {
  const params = await props.params
  return <NoteContent id={params.id} />
} 