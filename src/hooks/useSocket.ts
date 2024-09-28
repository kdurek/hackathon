import { activeObstacleAtom } from '@/lib/atoms'
import { obstacles } from '@/lib/consts'
import { socket } from '@/lib/socket'
import { useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'

const getRandomObstacle = () => {
  const randomIndex = Math.floor(Math.random() * obstacles.length)
  return obstacles[randomIndex].id
}

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const setActiveObstacle = useSetAtom(activeObstacleAtom)

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    // function onCreateObstacle(data) {
    //   setActiveObstacle(data)
    // }

    // function onRemoveObstacle(data) {
    //   setActiveObstacle(null)
    // }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    // socket.on('web_create_obstacle', onCreateObstacle)
    // socket.on('web_remove_obstacle', onRemoveObstacle)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      // socket.off('web_create_obstacle', onCreateObstacle)
      // socket.off('web_remove_obstacle', onRemoveObstacle)
    }
  }, [])

  const createObstacle = () => {
    // socket.emit('web_create_obstacle', 'liana')
    setActiveObstacle(getRandomObstacle())
  }

  const removeObstacle = () => {
    // socket.emit('web_remove_obstacle', '')
    setActiveObstacle(null)
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
    createObstacle,
    removeObstacle
  }
}
