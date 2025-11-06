import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {BrowserRouter} from "react-router-dom"

import { ClerkProvider } from '@clerk/clerk-react'


     
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey="pk_test_d29uZHJvdXMtdGFoci00Mi5jbGVyay5hY2NvdW50cy5kZXYk">
        <App />
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>,
)
