import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../App'
import Tile from './Tile'

function Board() {
  const { setBoardState, boardState } = useContext(AppContext)

  useEffect(() => {
    setBoardState([
    [ 'BR', 'BN', 'BB', 'BQ', 'BK', 'BB', 'BN', 'BR'],
    [ 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP' ],
    [ 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA' ],
    [ 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA' ],
    [ 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA' ],
    [ 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA' ],
    [ 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP' ],
    [ 'WR', 'WN', 'WB', 'WQ', 'WK', 'WB', 'WN', 'WR']])

  },[setBoardState])
   

  
  return (
    <div className='board'>
      {boardState.map((row, rowIndex) => (
        row.map((piece, colIndex) => (
          <Tile key={colIndex} piece={piece} boardState={boardState} rowNumber={rowIndex} colNumber={colIndex} />))
      ))}
    </div>
  )
}

export default Board