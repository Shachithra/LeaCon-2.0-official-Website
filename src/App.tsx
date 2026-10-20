import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { TeamPage } from './pages/TeamPage'
import { EventPage } from './pages/EventPage'
import { ShopPage } from './pages/ShopPage'
import { RegisterPage } from './pages/RegisterPage'
import { NotFoundPage } from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
