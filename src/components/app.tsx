import { Overlay } from '@/components/overlay'
import { useUnity } from '@/contexts/unity-context/unity-context'
import { socket } from '@/lib/socket'
import { useEffect, useState } from 'react'
import { Unity } from 'react-unity-webgl'

// import { create } from 'zustand'

// export const useBearStore = create((set) => ({
//   bears: 5,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 })
// }))

function App() {
  const unity = useUnity()

  const { unityProvider } = unity

  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    function onWeb(data) {
      console.log('🚀 > onWeb > data:', data)
    }

    function onUnity(data) {
      console.log('🚀 > onUnity > data:', data)
    }

    function onConnect(data) {
      console.log('🚀 > onConnect > data:', data)

      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    socket.on('web_event', (data) => onWeb(data))
    socket.on('unity_event', (data) => onUnity(data))
    socket.on('connect', (data) => onConnect(data))
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('web_event', onWeb)
      socket.off('unity_event', onUnity)
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  const sendEvent = () => {
    socket.emit('web_event', 'Hello Unity Piotrulo')
  }

  return (
    <div className="relative">
      <Unity
        unityProvider={unityProvider}
        className="size-full"
        // style={{ width: 960, height: 600 }}
      />
      <Overlay isConnected={isConnected} onSendEvent={sendEvent} />
    </div>
  )
}

export default App
