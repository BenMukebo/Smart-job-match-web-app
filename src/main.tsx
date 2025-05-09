import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import GeminiContextProvider from './contexts/useGemininContext.tsx'

createRoot(document.getElementById('root')!).render(
  <GeminiContextProvider>
    <App />
  </GeminiContextProvider>,
)
