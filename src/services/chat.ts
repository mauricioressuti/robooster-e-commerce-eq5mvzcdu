import { supabase } from '@/lib/supabase/client'

export async function sendMessage(messages: { role: string; content: string }[]) {
  const { data, error } = await supabase.functions.invoke('chat', {
    body: { messages },
  })
  if (error) throw error
  return data
}
