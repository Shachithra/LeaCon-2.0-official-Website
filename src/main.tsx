import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

/* Self-hosted text and display-fallback faces. */
import '@fontsource/raleway/400.css'
import '@fontsource/raleway/400-italic.css'
import '@fontsource/raleway/500.css'
import '@fontsource/raleway/600.css'
import '@fontsource/raleway/700.css'
import '@fontsource-variable/archivo/wght.css'

import './styles/tokens.css'
import './styles/base.css'
import './styles/chrome.css'
import './styles/home.css'
import './styles/pages.css'

/*
 * Licensed brand faces (Lemon Milk, AndYou) are not in this repository.
 * Read src/styles/licensed-fonts.css, drop the .woff2 files into public/fonts/
 * and uncomment the line below.
 */
// import './styles/licensed-fonts.css'

import App from './App'

document.documentElement.classList.add('js')

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
