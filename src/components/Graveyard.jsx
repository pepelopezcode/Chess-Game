import React, { useState, useContext } from 'react'
import { AppContext } from '../App'
import pieceImages from '../assets/Images.jsx'
 


function Graveyard(params) {
  
  const { graveyardList } = useContext(AppContext)
 

  const seperateGraveyardList = (color) => {
    let newList = []
    for (let i = 0; i < graveyardList.length; i++){
      if(graveyardList[i][0] === color){
        newList.push(graveyardList[i])
      }
    }
    return newList
  }


  return (
  <div className='graveyard-constainer' >
      <div className='graveyard-row' >
        {seperateGraveyardList('W').map((piece, i) => (
          <img key={i} src={ pieceImages[piece] } />
        ))}
      </div>
      <div className='graveyard-row' >
        {seperateGraveyardList('B').map((piece, i) => (
          <img key={i} src={ pieceImages[piece] } />
        ))}
      </div>

        </div>
  )
}

export default Graveyard 
