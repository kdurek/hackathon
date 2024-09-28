import React, { useState, useEffect } from 'react'
import { Shuffle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface CardItem {
  id: number
  content: string
  isFlipped: boolean
  isMatched: boolean
}

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<CardItem[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)

  const initializeCards = () => {
    const emojis = ['🐶', '🐱', '🐭']
    const shuffledEmojis = [...emojis, ...emojis].sort(
      () => Math.random() - 0.5
    )
    return shuffledEmojis.map((emoji, index) => ({
      id: index,
      content: emoji,
      isFlipped: false,
      isMatched: false
    }))
  }

  useEffect(() => {
    setCards(initializeCards())
  }, [])

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return

    setCards(
      cards.map((card) =>
        card.id === id ? { ...card, isFlipped: true } : card
      )
    )

    setFlippedCards([...flippedCards, id])

    if (flippedCards.length === 1) {
      setMoves(moves + 1)
      const [firstCardId] = flippedCards
      const firstCard = cards.find((card) => card.id === firstCardId)
      const secondCard = cards.find((card) => card.id === id)

      if (firstCard?.content === secondCard?.content) {
        setCards(
          cards.map((card) =>
            card.id === firstCardId || card.id === id
              ? { ...card, isMatched: true }
              : card
          )
        )
        setFlippedCards([])
      } else {
        setTimeout(() => {
          setCards(
            cards.map((card) =>
              card.id === firstCardId || card.id === id
                ? { ...card, isFlipped: false }
                : card
            )
          )
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  const resetGame = () => {
    setCards(initializeCards())
    setFlippedCards([])
    setMoves(0)
  }

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="mb-4 text-2xl font-bold">Memory Game</h1>
      <div className="mb-4">Moves: {moves}</div>
      <div className="mb-4 grid grid-cols-3 gap-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            className={`flex size-20 cursor-pointer items-center justify-center text-2xl ${
              card.isFlipped || card.isMatched ? 'bg-blue-200' : 'bg-gray-200'
            }`}
            onClick={() =>
              !card.isFlipped && !card.isMatched && handleCardClick(card.id)
            }
          >
            {(card.isFlipped || card.isMatched) && card.content}
          </Card>
        ))}
      </div>
      <Button onClick={resetGame}>
        <Shuffle className="mr-2 size-4" /> Reset Game
      </Button>
    </div>
  )
}

export default MemoryGame
