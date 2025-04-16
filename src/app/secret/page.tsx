import { redirect } from 'next/navigation'

export default function SecretPage() {
  // Redirect to dashboard since this is a protected route
  redirect('/dashboard')
}
