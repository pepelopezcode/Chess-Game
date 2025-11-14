import React, { useState, useContext } from 'react'
import { AppContext } from '../App'
import pieceImages from '../assets/Images.jsx'
 


function Graveyard(params) {
  
  const { graveyardList } = useContext(AppContext)
 


  console.log(typeof graveyardList)
  return (
  <div>
      {graveyardList.map((piece, index) => (
        <div className='piece' >
          {piece == "NA" ? <div>  </div> :<img alt='piece' src={ pieceImages[piece] } />}
        </div>
      ))}
  </div>
  )
}

export default Graveyard 
