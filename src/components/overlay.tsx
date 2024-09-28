import { useSocket } from '@/components/appe'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useUnity } from '@/contexts/unity-context/unity-context'

export function Overlay() {
  const { sendMessage } = useUnity()
  const { isConnected, sendEvent } = useSocket()

  const onClickLeft = () => {
    sendMessage('Platform', 'Left')
  }

  const onClickRight = () => {
    sendMessage('Platform', 'Right')
  }

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
          <Button onClick={onClickLeft}>Left</Button>
          <Button onClick={onClickRight}>Right</Button>
          <Button onClick={sendEvent}>Send Event</Button>
        </div>
      </div>

      <div className="absolute inset-y-0 left-0 my-auto h-[90%] w-80 rounded-r-md  p-4">
        {/* <div className="h-[504px] w-[287px] rounded border border-[#e8e8e8] bg-[#d9d9d9]/60 backdrop-blur-[23px]">
          card
        </div> */}
        <Card>card</Card>
      </div>

      <div className="absolute inset-y-0 right-0 my-auto h-[90%] w-80 rounded-l-md bg-green-500 p-4">
        Right
      </div>
    </>
  )
}
