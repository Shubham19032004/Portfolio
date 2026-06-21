import { useMemo } from 'react'
import { motion } from 'framer-motion'

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  duration: number
  delay: number
  color: string
}

const starColors = [
  'rgba(255,255,255,0.9)',
  'rgba(186,230,253,0.9)',
  'rgba(196,181,253,0.8)',
  'rgba(255,255,255,0.7)',
]

export function StarField() {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 90 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.4,
      opacity: Math.random() * 0.5 + 0.15,
      duration: Math.random() * 4 + 2.5,
      delay: Math.random() * 5,
      color: starColors[Math.floor(Math.random() * starColors.length)],
    }))
  }, [])

  const glowStars = useMemo<Star[]>(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 60,
      size: Math.random() * 2.5 + 1.5,
      opacity: Math.random() * 0.6 + 0.3,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 4,
      color: starColors[Math.floor(Math.random() * starColors.length)],
    }))
  }, [])

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none hidden dark:block overflow-hidden">
      {/* Deep sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050714] via-[#09090b] to-[#09090b]" />

      {/* Nebula glows */}
      <div className="absolute top-[5%] left-[15%] w-[500px] h-[300px] rounded-full bg-sky-900/20 blur-[100px]" />
      <div className="absolute top-[10%] right-[10%] w-[400px] h-[250px] rounded-full bg-violet-900/15 blur-[120px]" />
      <div className="absolute top-[20%] left-[50%] w-[300px] h-[200px] rounded-full bg-indigo-900/10 blur-[80px]" />

      {/* Regular stars */}
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
          }}
          animate={{ opacity: [star.opacity, star.opacity * 0.15, star.opacity] }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Glowing stars */}
      {glowStars.map(star => (
        <motion.div
          key={`glow-${star.id}`}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            boxShadow: `0 0 ${star.size * 4}px ${star.size * 2}px ${star.color.replace('0.9', '0.4').replace('0.8', '0.3').replace('0.7', '0.3')}`,
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.2, star.opacity],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
