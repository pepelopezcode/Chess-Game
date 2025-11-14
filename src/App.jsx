import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import React, { useState, createContext } from 'react'

export const AppContext = createContext();

function App() {

  const [ boardState, setBoardState ] = useState([]);
  const [ currPiece, setCurrPiece ] = useState('');
  const [ touchedPiecesList, setTouchedPiecesList ] = useState([]);
  const [ availableCordToMoveTo, setAvailableCordToMoveTo ] = useState([]);
  const [ isWhiteTurn, setIsWhiteTurn ] = useState(true);
  const [ graveyardList, setGraveyardList ] = useState([]);
  return (
    <AppContext.Provider
      value={{
        isWhiteTurn,
        setIsWhiteTurn,
        boardState,
        setBoardState,
        currPiece,
        setCurrPiece,
        touchedPiecesList,
        setTouchedPiecesList,
        availableCordToMoveTo, 
        setAvailableCordToMoveTo,
        graveyardList,
        setGraveyardList
      }}>
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </AppContext.Provider>
    
  )
}

export default App
