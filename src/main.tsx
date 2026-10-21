import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

/* Self-hosted text faces and the recorded display fallback. */
import '@fontsource/raleway/500.css'
import '@fontsource/raleway/600.css'
import '@fontsource/raleway/700.css'
import '@fontsource/raleway/800.css'
import '@fontsource-variable/archivo/wght.css'

import './styles/tokens.css'
import './styles/base.css'
import './styles/chrome.css'
import './styles/home.css'
import './styles/pages.css'

/*
 * Licensed brand faces (Lemon Milk, AndYou) are NOT in this repository and
 * are not loaded — the site never claims they are. Drop the woff2 files into
 * public/fonts/ (see src/styles/licensed-fonts.css) and uncomment the line
 * below to use them.
 */
// import './styles/licensed-fonts.css'

import App from './App'
import { MotionProvider } from './motion/MotionProvider'

document.documentElement.classList.add('js')

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <MotionProvider>
      <App />
    </MotionProvider>
  </StrictMode>,
)
