import { ObstacleProps } from '@/lib/consts'
import { atom } from 'jotai'

export const activeObstacleAtom = atom<ObstacleProps['id'] | null>(null)

