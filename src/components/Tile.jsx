import React from 'react'
import Piece from './Piece'


function Tile({piece, boardState, colNumber, rowNumber}) {


  
  
  return (
    <div className='tile' ><Piece piece={piece} boardState={boardState} colNumber={colNumber} rowNumber={rowNumber} /></div>
  )
}

export default Tile;