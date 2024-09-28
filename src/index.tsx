import { createRoot } from 'react-dom/client'
import App from '@/components/app'
import '@/tailwind.css'
import { UnityProvider } from '@/contexts/unity-context/unity-context'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <UnityProvider>
    <App />
  </UnityProvider>
)
