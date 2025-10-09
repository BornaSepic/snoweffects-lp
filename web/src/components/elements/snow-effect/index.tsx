'use client'

import { FC, useEffect, useRef } from 'react'
import style from './style.module.scss'

export type Props = {
  color?: 'white' | 'black'
}

export const SnowEffect: FC<Props> = ({ color = 'white' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId = 0

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const snowflakes = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.4,
      speedY: Math.random() * 1 + 0.5,
      speedX: (Math.random() - 0.5) * 0.5,
      drift: Math.sin(Math.random() * Math.PI * 2) * 0.5
    }))

    const rgb = color === 'white' ? '255, 255, 255' : '0, 0, 0'

    const animate = () => {
      if (!ctx) {
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      snowflakes.forEach((flake) => {
        flake.y += flake.speedY
        flake.x += flake.speedX + Math.sin(flake.y / 50) * flake.drift

        if (flake.y > canvas.height) {
          flake.y = -10
          flake.x = Math.random() * canvas.width
        }
        if (flake.x > canvas.width) {
          flake.x = 0
        } else if (flake.x < 0) {
          flake.x = canvas.width
        }

        ctx.beginPath()
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb}, ${flake.opacity})`
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [color])

  return <canvas ref={canvasRef} className={style.SnowEffect} />
}
