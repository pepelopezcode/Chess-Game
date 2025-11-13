import React, { useContext } from 'react'
import Board from '../components/Board'
import { AppContext } from '../App'

function HomePage() {

  const  { isWhiteTurn } = useContext(AppContext)
 
  return (
    <div>
      <div>
        {isWhiteTurn ? <div>white</div> : <div>black</div>}         
      </div>
      <Board />
    </div>
  )
}

export default HomePage
