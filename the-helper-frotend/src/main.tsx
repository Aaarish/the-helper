import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './components/custom/auth/AuthContext.tsx'
import { SignupProvider } from './components/custom/auth/SignupContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <AuthProvider>
        <SignupProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SignupProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
