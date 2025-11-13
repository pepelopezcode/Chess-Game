import React, { useState, useContext } from 'react'
import { AppContext } from '../App'
import { createRoutesFromElements } from 'react-router-dom';



function Piece({piece, colNumber, rowNumber}) {

  const { isWhiteTurn, setIsWhiteTurn, setBoardState, boardState, currPiece, setCurrPiece, touchedPiecesList, setTouchedPiecesList, availableCordToMoveTo, setAvailableCordToMoveTo } = useContext(AppContext)

  const isWhite = piece[0] == "W" ? true : false;

  const checkIfLocInBoard = (locArray) => {
    if(locArray[0] >= 0 && locArray[0] < 8 && locArray[1] >= 0 && locArray[1] < 8){
      return locArray
    }
  }

  const pawnMovement = (pieceType, rowInfo, colInfo) => {
    
    const newMoves = []  
    const leftPieceLoc = [( isWhite ? rowInfo -1 : rowInfo +1 ), colInfo -1] 
    const rightPieceLoc = [( isWhite ? rowInfo -1 : rowInfo +1 ), colInfo +1]
    const frontPieceLoc = [( isWhite ? rowInfo -1 : rowInfo +1 ), colInfo ]
    const secondFrontPieceLoc = [( isWhite ? rowInfo -2 : rowInfo +2 ), colInfo ]
    if(canTake(leftPieceLoc)){
      newMoves.push(leftPieceLoc)
    }
    if(canTake(rightPieceLoc)){
      newMoves.push(rightPieceLoc)
    }
      
    if( boardState[frontPieceLoc[0]][frontPieceLoc[1]] == 'NA' ){
      if( isWhite && rowInfo == 6 ){
        newMoves.push(frontPieceLoc, secondFrontPieceLoc)
      }else if( !isWhite && rowInfo == 1){
          newMoves.push(frontPieceLoc, secondFrontPieceLoc)
      }else{ newMoves.push(frontPieceLoc)}
    }
      return(newMoves)  
    
  }
  

  const rookMovement = (pieceType, rowInfo, colInfo) => {
    
      
      const newMoves = []
      const directions = [
        [1, 0],
        [0, -1],
        [-1, 0],
        [0, 1]
      ]

      for (const [r, c] of directions){
        for (let i=1; i < 8; i++){
        const row = rowInfo + r * i 
        const col = colInfo + c * i 
          if(checkIfLocInBoard([row, col])){
            if(checkIfNotBlocked(row, col, pieceType[0])){
              if(canTake([row, col])){
                newMoves.push([row, col])
                break
              }else{newMoves.push([row, col])}
            }else break
          }
        }
      }
     return(newMoves)
  }


  const knightMovement = (pieceType, rowInfo, colInfo) => {
    if(pieceType[1] == 'N'){
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
        .map(([offsetRow, offsetCol]) => [rowInfo + offsetRow, colInfo + offsetCol])
        .filter(([row, col]) => row >= 0 && row < 8 && col >= 0 && col < 8);
      
      for(let i = 0; i < knightMoves.length; i++){
        if(checkIfNotBlocked(knightMoves[i][0], knightMoves[i][1], pieceType[0])){
          newMoves.push(knightMoves[i])
        }
      }
      return(newMoves)
    }
  }

  const bishopMovement = (pieceType, rowInfo, colInfo) => {

      const newMoves = []
      const directions = [
        [-1, 1],
        [1, 1],
        [1, -1],
        [-1, -1]
      ]
      for (const [r, c] of directions){
        for (let i = 1; i < 8; i++) {
          const row = rowInfo + r * i
          const col = colInfo + c * i
          if(checkIfLocInBoard([row, col])){
            if(checkIfNotBlocked(row, col, pieceType[0])){
              if(canTake([row, col])){
                newMoves.push([row, col])
                break
              }else{newMoves.push([row, col])}
              
            }else break
          }
        }
      }
      return(newMoves)

  }

  const kingMovement = (pieceType, rowInfo, colInfo) => {
 
      const directions = [
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
        [-1, -1],
        [-1, 0],
        [-1, 1]
      ]
      const newMoves = []
      for (const [r, c] of directions){
        const row = rowInfo + r
        const col = colInfo + c 
        if(checkIfLocInBoard([row, col])){
          if(checkIfNotBlocked(row, col, pieceType[0])){
            if(canTake([row, col])){
              newMoves.push([row, col])
            }else{newMoves.push([row, col])}
          }
        }
      }
      return newMoves
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
    
    for (let a = 0; a < availableCordToMoveTo.length; a++){
      if(availableCordToMoveTo[a]){
        for( let i = 0; i < availableCordToMoveTo[a].length; i++){

          const [ row, col ] = availableCordToMoveTo[a][i]
          if ( row === rowNumber && col === colNumber ){
            return true
          }  
        }
      }
    }
    return false
  }

  const getMovesForPiece = (pieceType, rowInfo, colInfo) => {
    switch (pieceType[1]) {
      case 'P': return pawnMovement(pieceType, rowInfo, colInfo);
      case 'R': return rookMovement(pieceType, rowInfo, colInfo);
      case 'B': return bishopMovement(pieceType, rowInfo, colInfo);
      case 'N': return knightMovement(pieceType, rowInfo, colInfo);
      case 'Q': return [
        ...rookMovement(pieceType, rowInfo, colInfo),
        ...bishopMovement(pieceType, rowInfo, colInfo)
      ]
      case 'K': return kingMovement(pieceType, rowInfo, colInfo)
    
      default: return []
    }
  }

  const getAllMovesForColor = (color) => {
    const listOfMovesForColor = []
    for (let r = 0; r < 8; r++){
      for (let c = 0; c < 8; c++){
        if(color == boardState[r][c][0]){
          listOfMovesForColor.push(getMovesForPiece(boardState[r][c], r, c))
        }
      }
    }
    return listOfMovesForColor
  }

  const movePiece = ( ) => {
  
    if(piece == 'NA' && currPiece == '') {return}
    if (currPiece == ''){
      if (isWhite != isWhiteTurn){return}
      setCurrPiece({piece, from: { row: rowNumber, col: colNumber}})
      const newList = []
      
      newList.push(getMovesForPiece(piece, rowNumber, colNumber))
      setAvailableCordToMoveTo(newList)
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
      setIsWhiteTurn(!isWhiteTurn) 
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
