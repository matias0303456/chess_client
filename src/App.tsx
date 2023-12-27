import { Toaster } from 'react-hot-toast'
import './App.css'
import { Board } from './components/Board'
import { MoveProvider } from './providers/MoveProvider'

function App() {
  return (
    <MoveProvider>
      <h1>Web Chess</h1>
      <Board />
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </MoveProvider>
  )
}

export default App
