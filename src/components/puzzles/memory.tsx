import React, { useState, useEffect } from 'react'
import { Shuffle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'

interface CardItem {
  id: number
  content: string
  isFlipped: boolean
  isMatched: boolean
}

const MemoryGame: React.FC<{ onWin: () => void }> = ({ onWin }) => {
  const [cards, setCards] = useState<CardItem[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [isGameWon, setIsGameWon] = useState(false)

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

  const checkWinCondition = (): boolean => {
    const numOfMatchedCards = cards.reduce((acc, curr) => {
      return acc + +curr.isMatched
    }, 0)

    const isAllMatched = numOfMatchedCards === 6

    return isAllMatched
  }

  useEffect(() => {
    if (isGameWon) return

    if (checkWinCondition()) {
      onWin()
      setIsGameWon(true)
    }
  }, [cards, isGameWon])

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
    <Card className="relative flex flex-col items-center p-4">
      {isGameWon && (
        <div className="absolute inset-0 flex justify-center items-center z-10 bg-gray-800 rounded-3xl">
          <h1 className="text-2xl text-gray-100">Hooray!</h1>
        </div>
      )}
      <CardTitle className="mb-4 text-2xl font-bold">Memory Game</CardTitle>
      <CardDescription className="mb-4">Moves: {moves}</CardDescription>
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
        <Shuffle className="mr-2 size-4" />
        Reset Game
      </Button>
    </Card>
  )
}

export default MemoryGame
