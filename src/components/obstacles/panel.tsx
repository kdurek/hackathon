import { ObstacleCard } from '@/components/obstacles/card'
import { activeObstacleAtom } from '@/lib/atoms'
import { obstacles } from '@/lib/consts'
import { useAtomValue } from 'jotai'

export const ObstaclePanel = () => {
  const activeObstacle = useAtomValue(activeObstacleAtom)

  return (
    <div className="relative h-screen overflow-hidden">
      {obstacles.map((obstacle) => (
        <div
          key={obstacle.id}
          className={`absolute left-0 top-0 h-full pl-4 transition-transform duration-500 ease-in-out ${
            obstacle.id === activeObstacle
              ? 'translate-x-0'
              : '-translate-x-full'
          }`}
        >
          <ObstacleCard {...obstacle} />
        </div>
      ))}
    </div>
  )
}
