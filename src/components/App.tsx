import { Unity, useUnityContext } from 'react-unity-webgl'

function App() {
  const { unityProvider, sendMessage } = useUnityContext({
    loaderUrl: 'Build/HackBuild.loader.js',
    dataUrl: 'Build/HackBuild.data.gz',
    frameworkUrl: 'Build/HackBuild.framework.js.gz',
    codeUrl: 'Build/HackBuild.wasm.gz'
  })

  const onClickLeft = () => {
    sendMessage('NetworkBridge', 'Left')
  }

  const onClickRight = () => {
    sendMessage('NetworkBridge', 'Right')
  }

  return (
    <div className="relative">
      <Unity
        unityProvider={unityProvider}
        className="aspect-video size-full"
        // style={{ width: 960, height: 600 }}
      />
      <div className="absolute inset-0 flex size-full flex-col items-center justify-center p-3">
        Overlay
        <div className="flex content-between items-center p-4">
          <button onClick={onClickLeft}>Left</button>
          <button onClick={onClickRight}>Right</button>
        </div>
      </div>
    </div>
  )
}

export default App
