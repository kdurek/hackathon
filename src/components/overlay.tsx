import { ObstaclePanel } from '@/components/obstacles/panel'
import { Button } from '@/components/ui/button'
import { useUnity } from '@/contexts/unity-context/unity-context'
import { useSocket } from '@/hooks/useSocket'
import { socket } from '@/lib/socket'
import { useEffect } from 'react'
import { PuzzlePanel } from './puzzles/panel'

export function Overlay() {
  const { isLoaded, sendMessage } = useUnity()
  const { isConnected, connect, disconnect, createObstacle, removeObstacle } =
    useSocket()

  const onStart = () => {
    socket.emit('unity_start', '')
    setTimeout(() => {
      sendMessage('Platform', 'RestartGame')
    }, 500)
  }

  const onClickLeft = () => {
    sendMessage('Platform', 'Left')
    socket.emit('unity_left', '')
  }

  const onClickRight = () => {
    sendMessage('Platform', 'Right')
    socket.emit('unity_right', '')
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        onClickRight()
      }
      if (e.key === 'ArrowRight') {
        onClickLeft()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isLoaded])

  return (
    <>
      <div className="absolute inset-0 flex size-full flex-col items-center justify-center">
        <div
          className="absolute top-0 flex items-center justify-center p-4"
          style={{ color: isConnected ? 'green' : 'red' }}
        >
          {isConnected ? 'Connected' : 'Disconnected'}
        </div>

        <div className="absolute bottom-0 flex items-center justify-center gap-4 p-4">
          <Button onClick={onStart}>Restart</Button>
          <Button onClick={onClickRight}>Left</Button>
          <Button onClick={onClickLeft}>Right</Button>
          <Button onClick={createObstacle}>Create Obstacle</Button>
          <Button onClick={removeObstacle}>Remove Obstacle</Button>
          <Button onClick={connect}>Connect</Button>
          <Button onClick={disconnect}>Disconnect</Button>
        </div>
      </div>

      <div className="absolute inset-y-0 left-0 my-auto h-[90%] w-80 rounded-r-md">
        <ObstaclePanel />
      </div>

      <div className="absolute inset-y-0 right-0 my-auto h-[90%] w-80 rounded-l-md p-4">
        <PuzzlePanel />
      </div>
    </>
  )
}
