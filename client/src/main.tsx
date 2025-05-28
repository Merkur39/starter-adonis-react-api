import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import './styles/index.css'

const root = document.getElementById('root')
if (!root) {
  throw new Error('Root element not found')
}

// Race condition problem due to StrictMode.
// When the page is reloaded in the time it takes for the token to refresh
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
