import { socket } from '@/lib/socket'
import { useEffect, useState } from 'react'

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

  const sendTestEvent = () => {
    console.log("Sending web_event: 'Test Event'")
    // socket.emit('web_test', 'Test Event')
  }

  const connect = () => {
    socket.connect()
  }

  const disconnect = () => {
    socket.disconnect()
  }

  return {
    isConnected,
    connect,
    disconnect,
    sendTestEvent
  }
}
