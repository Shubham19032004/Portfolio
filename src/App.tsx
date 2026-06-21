import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { StarField } from './components/ui/StarField'
import { Home } from './pages/Home'
import { Blog } from './pages/Blog'
import { OpenSource } from './pages/OpenSource'
import { PongGame } from './game/PongGame'

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <StarField />
        <div className="relative min-h-screen text-zinc-100">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/open-source" element={<OpenSource />} />
            <Route path="/game" element={
              <main className="pt-14 min-h-screen flex flex-col items-center justify-center px-4 gap-6">
                <PongGame />
                <p className="text-xs text-zinc-600 font-mono">W / S — you &nbsp;|&nbsp; Right paddle — AI</p>
              </main>
            } />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
