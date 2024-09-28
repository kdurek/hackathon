import { createContext, useContext } from 'react'
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

  return (
    <UnityContext.Provider value={context}>{children}</UnityContext.Provider>
  )
}
