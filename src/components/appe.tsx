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

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  const sendEvent = () => {
    socket.emit('web_head', 'Hello Unity Piotrulo')
  }

  return {
    isConnected,
    sendEvent
  }
}

function App() {
  const unity = useUnity()

  const { unityProvider } = unity

  return (
    <div className="relative">
      <Unity
        unityProvider={unityProvider}
        className="size-full"
        // style={{ width: 960, height: 600 }}
      />
      <Overlay />
    </div>
  )
}

export default App
