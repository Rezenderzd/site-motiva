import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MotivaProvider } from './components/MotivaContextProvider/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MotivaProvider>
      <App />
    </MotivaProvider>
  </StrictMode>,
)
