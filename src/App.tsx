import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { useTheme } from './hooks/useTheme'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { StarField } from './components/ui/StarField'
import { Home } from './pages/Home'
import { Blog } from './pages/Blog'
import { OpenSource } from './pages/OpenSource'

function App() {
  const { theme, toggle } = useTheme()

  return (
    <HelmetProvider>
      <BrowserRouter>
        <StarField />
        <div className="relative min-h-screen bg-white dark:bg-transparent text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
          <Header theme={theme} toggleTheme={toggle} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/open-source" element={<OpenSource />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
