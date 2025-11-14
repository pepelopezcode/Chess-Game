import React, { useContext } from 'react'
import Board from '../components/Board'
import Graveyard from '../components/Graveyard.jsx'
import { AppContext } from '../App'

function HomePage() {

  const  { isWhiteTurn } = useContext(AppContext)
 
  return (
    <div>
      <div>
        {isWhiteTurn ? <div>white</div> : <div>black</div>}
      </div>
      <Graveyard />
      <Board />
    </div>
  )
}

export default HomePage
