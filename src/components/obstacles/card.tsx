import { Card, CardTitle, CardDescription } from '@/components/ui/card'
import type { ObstacleProps } from '@/lib/consts'

export const ObstacleCard = ({ id, title, description }: ObstacleProps) => (
  <Card>
    <CardTitle>{title}</CardTitle>
    <CardDescription>{description}</CardDescription>
  </Card>
)
