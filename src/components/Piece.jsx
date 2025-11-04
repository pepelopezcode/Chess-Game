import React, { useState, useContext } from 'react'
import { AppContext } from '../App'
import { createRoutesFromElements } from 'react-router-dom';



function Piece({piece, colNumber, rowNumber}) {

  const { setBoardState, boardState, currPiece, setCurrPiece, touchedPiecesList, setTouchedPiecesList, availableCordToMoveTo, setAvailableCordToMoveTo } = useContext(AppContext)

  const isWhite = piece[0] == "W" ? true : false;

  const checkIfLocInBoard = (locArray) => {
    if(locArray[0] >= 0 && locArray[0] < 8 && locArray[1] >= 0 && locArray[1] < 8){
      return locArray
    }
  }

  const pawnMovement = () => {
    
 
    if(piece[1] == 'P'){

    const newMoves = []  
    const leftPieceLoc = [( isWhite ? rowNumber -1 : rowNumber +1 ), colNumber -1] 
    const rightPieceLoc = [( isWhite ? rowNumber -1 : rowNumber +1 ), colNumber +1]
    const frontPieceLoc = [( isWhite ? rowNumber -1 : rowNumber +1 ), colNumber ]
    const secondFrontPieceLoc = [( isWhite ? rowNumber -2 : rowNumber +2 ), colNumber ]
    if(canTake(leftPieceLoc)){
      newMoves.push(leftPieceLoc)
    }
    if(canTake(rightPieceLoc)){
      newMoves.push(rightPieceLoc)
    }
      
    if( boardState[frontPieceLoc[0]][frontPieceLoc[1]] == 'NA' ){
      if( isWhite && rowNumber == 6 ){
        newMoves.push(frontPieceLoc, secondFrontPieceLoc)
      }else if( !isWhite && rowNumber == 1){
          newMoves.push(frontPieceLoc, secondFrontPieceLoc)
      }else{ newMoves.push(frontPieceLoc)}
    }
    setAvailableCordToMoveTo(newMoves)  
    
    }
   
    
  }

  const rookMovement = () => {
    
    if(piece[1] == 'R' || piece[1] == 'Q'){
      
      const newMoves = []
      for (let i = colNumber; i < 7; i++) {
        if(checkIfNotBlocked(rowNumber, i+1, piece[0])){
          if(canTake([rowNumber, i+1])){
            newMoves.push([rowNumber, i+1])
            break
          }else{newMoves.push([rowNumber, i+1])}
        }else{break}
        
      
      }
      for (let i = colNumber; i > 0; i--) {
        if(checkIfNotBlocked(rowNumber, i-1, piece[0])){
          if(canTake([rowNumber, i-1])){
            newMoves.push([rowNumber, i-1])
            break
          }else{newMoves.push([rowNumber, i-1])}
          
        }else{break}
        
        
      }
      for (let i = rowNumber; i < 7; i++){
        if(checkIfNotBlocked(i+1, colNumber, piece[0])){
          if(canTake([i+1, colNumber])){
            newMoves.push([i+1, colNumber])
            break
          }else{newMoves.push([i+1, colNumber])}
          
        }else{break}
        
      }
      for (let i = rowNumber; i > 0; i--){
        if(checkIfNotBlocked(i-1, colNumber, piece[0])){
          if(canTake([i-1, colNumber])){
            newMoves.push([i-1, colNumber])
            break
          }else{newMoves.push([i-1, colNumber])}
          
        }else{break}
        
      }

      setAvailableCordToMoveTo(newMoves)
    }
    


  }

  const knightMovement = () => {
    if(piece[1] == 'N'){
      const newMoves = []
      const knightOffsets = [
        [1,2],
        [-1,2],
        [2,1],
        [2,-1],
        [1,-2],
        [-1,-2],
        [-2,1],
        [-2,-1]
      ]
      const knightMoves = knightOffsets
        .map(([offsetRow, offsetCol]) => [rowNumber + offsetRow, colNumber + offsetCol])
        .filter(([row, col]) => row >= 0 && row < 8 && col >= 0 && col < 8);
      
      for(let i = 0; i < knightMoves.length; i++){
        if(checkIfNotBlocked(knightMoves[i][0], knightMoves[i][1], piece[0])){
          newMoves.push(knightMoves[i])
        }
      }

      setAvailableCordToMoveTo(newMoves)
    }
  }

  const bishopMovement = () => {

    if(piece[1] == 'B' || piece[1] == 'Q'){
      const newMoves = []
      const directions = [
        [-1, 1],
        [1, 1],
        [1, -1],
        [-1, -1]
      ]

      for (const [r, c] of directions){
        for (let i = 1; i < 8; i++) {
          const row = rowNumber + r * i
          const col = colNumber + c * i
          if(checkIfLocInBoard([row, col])){
            if(checkIfNotBlocked(row, col, piece[0])){
              if(canTake([row, col])){
                newMoves.push([row, col])
                break
              }else{newMoves.push([row, col])}
              
            }
          }
        }
      }
      //old way but might need for later
      // for (let i = 1; i < 8; i++) {
      //   if(checkIfLocInBoard([rowNumber -i, colNumber +i])){
      //     newMoves.push([rowNumber -i, colNumber +i])
      //   }else{break}
      // }
      // for (let i = 1; i < 8; i++){
      //   if(checkIfLocInBoard([rowNumber +i, colNumber +i])){
      //     newMoves.push([rowNumber +i, colNumber +i])
      //   }else{break}
      // }
      // for (let i = 1; i < 8; i++){
      //   if(checkIfLocInBoard([rowNumber +i, colNumber -i])){
      //     newMoves.push([rowNumber +i, colNumber -i])
      //   }else{break}
      // }
      // for (let i = 1; i < 8; i++){
      //   if(checkIfLocInBoard([rowNumber -i, colNumber -i])){
      //     newMoves.push([rowNumber -i, colNumber -i])
      //   }else{break}
      // }

      setAvailableCordToMoveTo(newMoves)
    }




  }

  const checkIfNotBlocked = ( row, col, pieceColor ) => {
    if( boardState[row][col][0] !== pieceColor){
      return true
    }else{ return false }
  }
  
  const canTake = ( pieceLoc ) => { 
    
    const rowCheck = (-1 < pieceLoc[0] && pieceLoc[0] < 8);
    const colCheck = (-1 < pieceLoc[1] && pieceLoc[1] < 8);
    if( rowCheck && colCheck ){
      if( boardState[pieceLoc[0]][pieceLoc[1]] !== 'NA'){
        if( boardState[pieceLoc[0]][pieceLoc[1]][0] !== piece[0] ){
          return(true)
        }else {return(false) }
      }else {return(false) }
    }
    

  }

  const checkIfPieceIsPartOfAvailableLocs = () => {
    
    for( let i = 0; i < availableCordToMoveTo.length; i++){
      
      const [ row, col ] = availableCordToMoveTo[i]
      if ( row === rowNumber && col === colNumber ){
        return true
      }  
    }
    return false
  }

  const movePiece = ( ) => {
  
    
    if(piece == 'NA' && currPiece == '') {return}
    if (currPiece == ''){
      setCurrPiece({piece, from: { row: rowNumber, col: colNumber}})
      pawnMovement()
      rookMovement()
      knightMovement()
      bishopMovement()
      return
    }
    if(!checkIfPieceIsPartOfAvailableLocs()){
      setCurrPiece('')
      setAvailableCordToMoveTo([])
    }
    if(checkIfPieceIsPartOfAvailableLocs()){
      setBoardState(prevBoard => {
        const newBoard = prevBoard.map(boardRow => [...boardRow])
        newBoard[currPiece.from.row][currPiece.from.col] = 'NA'
        newBoard[rowNumber][colNumber] = currPiece.piece      
        return newBoard
    })
      setCurrPiece('')
      setAvailableCordToMoveTo([])
      
    }
  }

  
  

  const pieceImages = {
    BR: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png",
    BN: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png",
    BB: "https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png",
    BQ: "https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png",
    BK: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Chess_kdt60.png",
    BP: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png",

    WR: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png",
    WN: "https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png",
    WB: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png",
    WQ: "https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png",
    WK: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png",
    WP: "https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png",
    NA: null
  }

  

  return (
    <div className='piece' onClick={movePiece} >
      {piece == "NA" ? <div>  </div> :<img alt='piece' src={ pieceImages[piece] } />}
    </div>
  )
}

export default Piece