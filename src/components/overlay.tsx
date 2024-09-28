import { Button } from '@/components/ui/button'
import { useUnity } from '@/contexts/unity-context/unity-context'

export function Overlay() {
  const { sendMessage } = useUnity()

  const onClickLeft = () => {
    sendMessage('NetworkBridge', 'Left')
  }

  const onClickRight = () => {
    sendMessage('NetworkBridge', 'Right')
  }

  return (
    <>
      <div className="absolute inset-0 flex size-full flex-col items-center justify-center">
        Overlay
        <div className="absolute bottom-0 flex items-center justify-center gap-4 p-4">
          <Button onClick={onClickLeft}>Left</Button>
          <Button onClick={onClickRight}>Right</Button>
        </div>
      </div>

      <div className="absolute inset-y-0 left-0 my-auto h-[90%] w-80 rounded-r-md bg-red-500 p-4">
        Left
      </div>

      <div className="absolute inset-y-0 right-0 my-auto h-[90%] w-80 rounded-l-md bg-green-500 p-4">
        Right
      </div>
    </>
  )
}
