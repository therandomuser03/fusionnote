import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export type Note = {
  id: string
  title: string
  content: string
  created_at: string
  updated_at: string
  user_id: string
}

// Create a Supabase client with the user's JWT token
export const getSupabaseClient = async (token: string | null) => {
  return createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    }
  })
}

export async function getNotes(token: string | null, userId: string | null) {
  try {
    if (!token || !userId) return null

    const supabase = await getSupabaseClient(token)
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('Supabase returned an error:', error.message || error)
      return null
    }
    return data
  } catch (error) {
    console.error('Error fetching notes:', JSON.stringify(error, null, 2))
    return null
  }
}

export async function getNoteById(id: string, token: string | null, userId: string | null) {
  try {
    if (!token || !userId) return null

    const supabase = await getSupabaseClient(token)
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching note:', error)
    return null
  }
}

export async function createNote(title: string, content: string, token: string | null, userId: string | null) {
  try {
    if (!token || !userId) return null

    const supabase = await getSupabaseClient(token)
    const { data, error } = await supabase
      .from('notes')
      .insert([
        {
          title,
          content,
          user_id: userId,
        },
      ])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creating note:', error)
    return null
  }
}

export async function updateNote(id: string, title: string, content: string, token: string | null, userId: string | null) {
  try {
    if (!token || !userId) return null

    const supabase = await getSupabaseClient(token)
    const { data, error } = await supabase
      .from('notes')
      .update({ title, content, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating note:', error)
    return null
  }
}

export async function deleteNote(id: string, token: string | null, userId: string | null) {
  try {
    if (!token || !userId) return null

    const supabase = await getSupabaseClient(token)
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id)
      .eq('user_id', userId)

    if (error) throw error
    return true
  } catch (error) {
    console.error('Error deleting note:', error)
    return null
  }
} 