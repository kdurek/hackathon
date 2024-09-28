import { Overlay } from '@/components/overlay'
import { useUnity } from '@/contexts/unity-context/unity-context'
import { Unity } from 'react-unity-webgl'

// import { create } from 'zustand'

// export const useBearStore = create((set) => ({
//   bears: 5,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 })
// }))

function App() {
  const { unityProvider } = useUnity()

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
