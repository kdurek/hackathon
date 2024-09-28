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
  const context = useUnityContext({
    loaderUrl: 'Build/HackBuild.loader.js',
    dataUrl: 'Build/HackBuild.data.gz',
    frameworkUrl: 'Build/HackBuild.framework.js.gz',
    codeUrl: 'Build/HackBuild.wasm.gz'
  })

  useEffect(() => {
    function onHead(data) {
      context.sendMessage('PlayerConnector', 'SetHead', data)
    }

    socket.on('web_head', (data) => onHead(data))

    return () => {
      socket.off('web_head', onHead)
    }
  }, [context])

  return (
    <UnityContext.Provider value={context}>{children}</UnityContext.Provider>
  )
}
