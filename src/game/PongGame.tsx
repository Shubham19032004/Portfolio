import { useEffect, useRef, useState } from 'react'
import { useGameLoop } from './useGameLoop'
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  BALL_SIZE,
  PADDLE_SPEED,
} from './Contants'
import type { Ball, GameState } from './type'
import { personal } from '../data/resume'

const AI_SPEED = PADDLE_SPEED * 0.5
const AI_ERROR = 55        // px offset added to predicted target
const AI_REACT_FRAMES = 18 // recalculate target only every N frames
const WIN_SCORE = 10
const START_SPEED = 2
const MAX_SPEED = 9

function predictLandingY(ball: Ball, targetX: number): number {
  if (ball.dx <= 0) return CANVAS_HEIGHT / 2
  const dist = targetX - ball.x
  const totalY = ball.y + (dist / ball.dx) * ball.dy
  const range = CANVAS_HEIGHT - BALL_SIZE
  let y = totalY % (range * 2)
  if (y < 0) y += range * 2
  if (y > range) y = range * 2 - y
  return y
}

function makeBall(speed: number, direction: 1 | -1 = 1): Ball {
  return {
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2,
    dx: speed * direction,
    dy: speed * 0.75 * (Math.random() > 0.5 ? 1 : -1),
  }
}

function freshState(): GameState {
  return {
    ball: makeBall(START_SPEED),
    leftPaddle: {
      x: 20,
      y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2,
      width: PADDLE_WIDTH,
      height: PADDLE_HEIGHT,
    },
    rightPaddle: {
      x: CANVAS_WIDTH - 20 - PADDLE_WIDTH,
      y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2,
      width: PADDLE_WIDTH,
      height: PADDLE_HEIGHT,
    },
    leftScore: 0,
    rightScore: 0,
  }
}

export function PongGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef<GameState>(freshState())
  const keysRef = useRef<Set<string>>(new Set())
  const aiTargetRef = useRef(CANVAS_HEIGHT / 2)
  const aiErrorRef = useRef(0)
  const aiFrameRef = useRef(0)
  const gameOverRef = useRef(false)
  const roundRef = useRef(0)
  const [winner, setWinner] = useState<'player' | 'ai' | null>(null)

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key)
      if (['ArrowUp', 'ArrowDown'].includes(e.key)) e.preventDefault()
    }
    const onUp = (e: KeyboardEvent) => keysRef.current.delete(e.key)
    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)
    return () => {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
    }
  }, [])

  useGameLoop(() => {
    if (gameOverRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const s = stateRef.current
    const { ball, leftPaddle, rightPaddle } = s
    const keys = keysRef.current

    // player — left paddle
    if (keys.has('w') || keys.has('W')) leftPaddle.y -= PADDLE_SPEED
    if (keys.has('s') || keys.has('S')) leftPaddle.y += PADDLE_SPEED

    // AI — right paddle: only recalculate target every AI_REACT_FRAMES frames
    aiFrameRef.current += 1
    if (aiFrameRef.current >= AI_REACT_FRAMES) {
      aiFrameRef.current = 0
      aiErrorRef.current = (Math.random() - 0.5) * AI_ERROR * 2
      aiTargetRef.current = predictLandingY(ball, rightPaddle.x) + aiErrorRef.current
    }
    const aiCenter = rightPaddle.y + PADDLE_HEIGHT / 2
    if (aiCenter < aiTargetRef.current - 4) rightPaddle.y += AI_SPEED
    else if (aiCenter > aiTargetRef.current + 4) rightPaddle.y -= AI_SPEED

    // clamp paddles
    leftPaddle.y = Math.max(0, Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, leftPaddle.y))
    rightPaddle.y = Math.max(0, Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, rightPaddle.y))

    // move ball
    ball.x += ball.dx
    ball.y += ball.dy

    // wall collision
    if (ball.y <= 0) { ball.y = 0; ball.dy *= -1 }
    if (ball.y + BALL_SIZE >= CANVAS_HEIGHT) { ball.y = CANVAS_HEIGHT - BALL_SIZE; ball.dy *= -1 }

    // paddle collision — left
    if (
      ball.dx < 0 &&
      ball.x <= leftPaddle.x + leftPaddle.width &&
      ball.x >= leftPaddle.x &&
      ball.y + BALL_SIZE >= leftPaddle.y &&
      ball.y <= leftPaddle.y + leftPaddle.height
    ) {
      ball.x = leftPaddle.x + leftPaddle.width
      ball.dx = Math.min(Math.abs(ball.dx) * 1.05, MAX_SPEED)
      ball.dy = Math.sign(ball.dy) * Math.min(Math.abs(ball.dy) * 1.05, MAX_SPEED)
    }

    // paddle collision — right
    if (
      ball.dx > 0 &&
      ball.x + BALL_SIZE >= rightPaddle.x &&
      ball.x + BALL_SIZE <= rightPaddle.x + rightPaddle.width &&
      ball.y + BALL_SIZE >= rightPaddle.y &&
      ball.y <= rightPaddle.y + rightPaddle.height
    ) {
      ball.x = rightPaddle.x - BALL_SIZE
      ball.dx = -Math.min(Math.abs(ball.dx) * 1.05, MAX_SPEED)
      ball.dy = Math.sign(ball.dy) * Math.min(Math.abs(ball.dy) * 1.05, MAX_SPEED)
    }

    // scoring
    if (ball.x + BALL_SIZE < 0) {
      s.rightScore += 1
      if (s.rightScore >= WIN_SCORE) {
        gameOverRef.current = true
        setWinner('ai')
        return
      }
      roundRef.current += 1
      s.ball = makeBall(Math.min(START_SPEED + roundRef.current * 0.4, MAX_SPEED), 1)
    }

    if (ball.x > CANVAS_WIDTH) {
      s.leftScore += 1
      if (s.leftScore >= WIN_SCORE) {
        gameOverRef.current = true
        setWinner('player')
        return
      }
      roundRef.current += 1
      s.ball = makeBall(Math.min(START_SPEED + roundRef.current * 0.4, MAX_SPEED), -1)
    }

    // --- draw ---
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // background
    ctx.fillStyle = '#09090b'
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // center dashed line
    ctx.fillStyle = '#3f3f46'
    for (let i = 0; i < CANVAS_HEIGHT; i += 20) {
      ctx.fillRect(CANVAS_WIDTH / 2 - 1, i, 2, 12)
    }

    // scores
    ctx.fillStyle = '#e4e4e7'
    ctx.font = 'bold 36px JetBrains Mono, monospace'
    ctx.textAlign = 'center'
    ctx.fillText(String(s.leftScore), CANVAS_WIDTH / 4, 54)
    ctx.fillText(String(s.rightScore), (CANVAS_WIDTH * 3) / 4, 54)

    // score labels
    ctx.fillStyle = '#52525b'
    ctx.font = '11px JetBrains Mono, monospace'
    ctx.fillText('YOU', CANVAS_WIDTH / 4, 74)
    ctx.fillText('AI', (CANVAS_WIDTH * 3) / 4, 74)

    // ball
    ctx.fillStyle = '#38bdf8'
    ctx.fillRect(ball.x, ball.y, BALL_SIZE, BALL_SIZE)

    // paddles
    ctx.fillStyle = '#e4e4e7'
    ctx.beginPath()
    ctx.roundRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height, 4)
    ctx.fill()
    ctx.beginPath()
    ctx.roundRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height, 4)
    ctx.fill()
  })

  function playAgain() {
    roundRef.current = 0
    gameOverRef.current = false
    stateRef.current = freshState()
    setWinner(null)
  }

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="rounded-xl border border-zinc-800 max-w-full"
      />

      {winner !== null && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-black/85 rounded-xl backdrop-blur-sm">
          <p className="text-6xl font-bold text-zinc-100 tracking-tight">
            {winner === 'player' ? 'You Win' : 'You Lose'}
          </p>
          <p className="text-zinc-500 text-sm font-mono">
            {winner === 'player'
              ? 'You beat the AI. Not bad.'
              : 'The AI got you this time.'}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <a
              href={personal.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium transition-all duration-200 hover:shadow-[0_0_20px_rgba(14,165,233,0.4)]"
            >
              Visit Resume
            </a>
            <button
              onClick={playAgain}
              className="px-5 py-2.5 rounded-lg border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-zinc-100 text-sm font-medium transition-colors"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
