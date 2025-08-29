import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// This import is now correct
import { SupabaseContext } from "./lib/supabase-context.tsx";
import { supabase } from './lib/supabase';
import App from './App.tsx'
import './index.css'
import './App.css'

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
    {/* This usage is now correct */}
    <SupabaseContext.Provider value={supabase}>
      <App />
    </SupabaseContext.Provider>
  </QueryClientProvider>
);