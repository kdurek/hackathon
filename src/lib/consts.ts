export type ObstacleProps = {
  id: string
  title: string
  description: string
}

export const obstacles: ObstacleProps[] = [
  {
    id: 'rock',
    title: 'Rock ahead',
    description: "There's a rock on the LEFT, try to avoid it!"
  },
  {
    id: 'liana',
    title: 'Liana ahead',
    description: 'Jump on the liana on the RIGHT!'
  }
]
