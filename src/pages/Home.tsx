import { SEO } from '../components/ui/SEO'
import { Hero } from '../components/sections/Hero'
import { About } from '../components/sections/About'
import { Experience } from '../components/sections/Experience'
import { Projects } from '../components/sections/Projects'
import { Skills } from '../components/sections/Skills'
import { GitActivity } from '../components/sections/GitActivity'
import { Education } from '../components/sections/Education'

export function Home() {
  return (
    <main>
      <SEO path="/" />
      <Hero />
      <div className="border-t border-zinc-100 dark:border-zinc-900">
        <About />
        <Experience />
        <Projects />
        <Skills />
        <GitActivity />
        <Education />
      </div>
    </main>
  )
}
