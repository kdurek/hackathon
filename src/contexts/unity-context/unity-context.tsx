import { socket } from '@/lib/socket'
import { createContext, useContext, useEffect } from 'react'
import { useUnityContext } from 'react-unity-webgl'

export const UnityContext = createContext<ReturnType<
  typeof useUnityContext
> | null>(null)

export const useUnity = () => {
  const context = useContext(UnityContext)
  if (!context) {
    throw new Error('useUnity must be used within a UnityProvider')
  }
  return context
}

type UnityProviderProps = {
  children: React.ReactNode
}

export function UnityProvider({ children }: UnityProviderProps) {
  const unityInstance = useUnityContext({
    loaderUrl: 'Build/HackBuild.loader.js',
    dataUrl: 'Build/HackBuild.data.gz',
    frameworkUrl: 'Build/HackBuild.framework.js.gz',
    codeUrl: 'Build/HackBuild.wasm.gz'
  })

  useEffect(() => {
    function onHead(data) {
      console.log('onHead: ', data)
      unityInstance.sendMessage('PlayerConnector', 'SetHead', data)
    }
    function onLeftHand(data) {
      console.log('onLeftHand: ', data)
      unityInstance.sendMessage('PlayerConnector', 'SetLeftHand', data)
    }
    function onRightHand(data) {
      console.log('onRightHand: ', data)
      unityInstance.sendMessage('PlayerConnector', 'SetRightHand', data)
    }

    if (unityInstance.isLoaded) {
      socket.on('web_head', onHead)
      socket.on('web_left_hand', onLeftHand)
      socket.on('web_right_hand', onRightHand)
    }

    return () => {
      socket.off('web_head', onHead)
      socket.off('web_left_hand', onLeftHand)
      socket.off('web_right_hand', onRightHand)
    }
  }, [unityInstance.isLoaded])

  return (
    <UnityContext.Provider value={unityInstance}>
      {children}
    </UnityContext.Provider>
  )
}
