import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SupabaseContext } from '@/lib/supabase-context'
import { supabase } from '@/lib/supabase'
import App from './App.tsx'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
})

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <SupabaseContext.Provider value={supabase}>
      <App />
    </SupabaseContext.Provider>
  </QueryClientProvider>
);
