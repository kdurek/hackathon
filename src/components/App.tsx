import { Unity, useUnityContext } from 'react-unity-webgl'

function App() {
  const { unityProvider } = useUnityContext({
    loaderUrl: 'Build/Experiment.loader.js',
    dataUrl: 'Build/Experiment.data.gz',
    frameworkUrl: 'Build/Experiment.framework.js.gz',
    codeUrl: 'Build/Experiment.wasm.gz'
  })

  return (
    <div className="relative">
      <Unity
        unityProvider={unityProvider}
        className="aspect-video size-full"
        // style={{ width: 960, height: 600 }}
      />
    </div>
  )
}

export default App
