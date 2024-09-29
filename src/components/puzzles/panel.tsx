import MemoryGame from './memory'
import { Card } from '../ui/card'
import { useEffect, useState } from 'react'

export const PuzzlePanel = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true)
    }, 4000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  const onWin = () => {
    console.log('🚀 ~ PuzzlePanel ~ onWin:')
    setTimeout(() => {
      setIsVisible(false)
    }, 2000)
  }

  return (
    <Card
      className={`transition-transform duration-500 ease-in-out ${
        isVisible ? 'translate-x-0' : 'translate-x-[400px]'
      }`}
    >
      <MemoryGame key={isVisible} onWin={onWin} />
    </Card>
  )
}
