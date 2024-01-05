import { useState } from 'react'
import './App.css'
import Join from './components/join/Join'
import Chat from './components/chat/Chat'

function App() {

  const [chatVisibity, setChatVisibility] = useState(false);
  const [socket, setSocket] = useState(null);

  return (
    <div className="App">
      {
        chatVisibity ? <Chat socket={socket} /> : <Join setSocket={setSocket} setChatVisibility={setChatVisibility} /> //passando prop
      }

    </div>
  )
}

export default App
