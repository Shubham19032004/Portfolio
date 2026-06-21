import { useEffect, useRef } from 'react'

export function useGameLoop(callback: () => void) {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    let animationId: number

    function loop() {
      savedCallback.current()
      animationId = requestAnimationFrame(loop)
    }

    animationId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animationId)
  }, [])
}
